import React, { useEffect, useState } from 'react'
import {
    AppBar,
    Toolbar,
    Typography,
    Dialog,
    DialogTitle,
    Box,
} from '@mui/material'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { firebaseConfigCustomer } from '@/app/state/initialState'
import Authentication from './Authentication'
import PostalCodeInput from './PostalCodeInput'
import RestaurantList from './RestaurantList'
import { useRouter } from 'next/router'

const firebaseCustomerApp = !firebase.apps.some((app) => app.name === 'foodie')
    ? firebase.initializeApp(firebaseConfigCustomer, 'foodie')
    : firebase.app('foodie')

const CustomerApp: React.FC = () => {
    const [user, setUser] = useState<firebase.User | null>(null)
    const [restaurants, setRestaurants] = useState<any[]>([])
    const [filteredRestaurants, setFilteredRestaurants] = useState<any[]>([])
    const [open, setOpen] = useState(true)
    const [userLocation, setUserLocation] = useState<{
        lat: number
        lng: number
    } | null>(null)
    const [locationFetched, setLocationFetched] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const unsubscribe = firebaseCustomerApp
            .auth()
            .onAuthStateChanged((user) => {
                console.log('Auth state changed user:', user) // Debugging line
                setUser(user)
            })

        // Fetch user's current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords
                    setUserLocation({ lat: latitude, lng: longitude })
                },
                (error) => {
                    console.error('Error fetching location:', error)
                }
            )
        }

        return () => {
            unsubscribe()
        }
    }, [])

    useEffect(() => {
        if (userLocation && !locationFetched) {
            // Fetch restaurant data from the local API with dynamic center
            const fetchRestaurants = async () => {
                const response = await fetch(
                    `/api/restaurants?lat=${userLocation.lat}&lng=${userLocation.lng}`
                )
                const data = await response.json()
                setRestaurants(data)
                setLocationFetched(true)
            }

            fetchRestaurants()
        }
    }, [userLocation, locationFetched])

    const handleLogin = () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        firebaseCustomerApp
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                console.log('Popup result user:', result.user) // Debugging line
                setUser(result.user)
            })
            .catch((error) => {
                console.error('Error during popup login:', error)
            })
    }

    const handleLogout = () => {
        firebaseCustomerApp.auth().signOut()
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSearch = (location: { lat: number; lng: number }) => {
        const nearbyRestaurants = restaurants.filter((restaurant) => {
            const distance = calculateDistance(location, restaurant.location)
            return distance >= 0 && distance <= 10
        })
        setFilteredRestaurants(nearbyRestaurants)
    }

    // Calculate distance between two locations in km
    const calculateDistance = (
        location1: { lat: number; lng: number },
        location2: { lat: number; lng: number }
    ) => {
        const R = 6371 // Radius of the Earth in km
        const dLat = (location2.lat - location1.lat) * (Math.PI / 180)
        const dLng = (location2.lng - location1.lng) * (Math.PI / 180)
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(location1.lat * (Math.PI / 180)) *
                Math.cos(location2.lat * (Math.PI / 180)) *
                Math.sin(dLng / 2) *
                Math.sin(dLng / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        return R * c
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Foodie
                    </Typography>
                    <Authentication
                        user={user}
                        onLogin={handleLogin}
                        onLogout={handleLogout}
                    />
                </Toolbar>
            </AppBar>

            <PostalCodeInput
                onSearch={handleSearch}
                restaurants={restaurants}
            />

            <Box sx={{ padding: 2 }}>
                <Typography variant="h5" sx={{ my: 2 }} gutterBottom>
                    Available Restaurants
                </Typography>
                <Box>
                    {filteredRestaurants.length === 0 && (
                        <Typography variant="body1" sx={{ my: 2 }}>
                            No restaurants found. Try searching with a different
                            location.
                        </Typography>
                    )}
                </Box>
                <RestaurantList restaurants={filteredRestaurants} />
            </Box>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Food Delivery App: Still under construction, only login
                    works
                </DialogTitle>
            </Dialog>
        </>
    )
}

export default CustomerApp
