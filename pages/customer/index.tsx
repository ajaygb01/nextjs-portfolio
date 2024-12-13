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

const firebaseCustomerApp = !firebase.apps.some((app) => app.name === 'foodie')
    ? firebase.initializeApp(firebaseConfigCustomer, 'foodie')
    : firebase.app('foodie')

const CustomerApp: React.FC = () => {
    const [user, setUser] = useState<firebase.User | null>(null)
    const [restaurants, setRestaurants] = useState<any[]>([])
    const [filteredRestaurants, setFilteredRestaurants] = useState<any[]>([])
    const [postalCode, setPostalCode] = useState<string>('') // User postal code input
    const [open, setOpen] = useState(true)

    useEffect(() => {
        const unsubscribe = firebaseCustomerApp
            .auth()
            .onAuthStateChanged((user) => {
                //console.log('Auth state changed user:', user) // Debugging line
                setUser(user)
            })

        // Fetch restaurant data from the local API when the component mounts
        const fetchRestaurants = async () => {
            const response = await fetch('/api/restaurants')
            const data = await response.json()
            setRestaurants(data)
        }

        fetchRestaurants()

        return () => {
            unsubscribe()
        }
    }, [])

    const handleLogin = () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        firebaseCustomerApp
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                //console.log('Popup result user:', result.user) // Debugging line
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

    const handlePostalCodeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPostalCode(event.target.value)
    }

    // Mock distance function (in km) - Replace with real distance calculation
    const calculateDistance = (postalCode1: string, postalCode2: string) => {
        // Simulate some distance logic based on postal codes
        return (
            Math.abs(postalCode1.charCodeAt(0) - postalCode2.charCodeAt(0)) * 2
        )
    }

    const filterRestaurantsByPostalCode = () => {
        const nearbyRestaurants = restaurants.filter((restaurant) => {
            const distance = calculateDistance(
                postalCode,
                restaurant.postalCode
            )
            return distance >= 0 && distance <= 20
        })
        setFilteredRestaurants(nearbyRestaurants)
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
                postalCode={postalCode}
                onPostalCodeChange={handlePostalCodeChange}
                onSearch={filterRestaurantsByPostalCode}
            />

            <Box sx={{ padding: 2 }}>
                <Typography variant="h5" sx={{ my: 2 }} gutterBottom>
                    Available Restaurants
                </Typography>
                <Box>
                    {filteredRestaurants.length === 0 && (
                        <Typography variant="body1" sx={{ my: 2 }}>
                            No restaurants found. Try searching with a different
                            postal code.
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
