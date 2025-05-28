import React, { useEffect, useRef, useState } from 'react'
import { Box, Typography } from '@mui/material'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

interface PostalCodeInputProps {
    onSearch: (location: { lat: number; lng: number }) => void
    restaurants: any[]
}

const PostalCodeInput: React.FC<PostalCodeInputProps> = ({
    onSearch,
    restaurants,
}) => {
    const mapContainer = useRef<HTMLDivElement | null>(null)
    const map = useRef<mapboxgl.Map | null>(null)
    const userMarker = useRef<mapboxgl.Marker | null>(null)
    const restaurantMarkers = useRef<mapboxgl.Marker[]>([])
    const [mapboxToken, setMapboxToken] = useState<string | null>(null)

    useEffect(() => {
        const fetchMapboxToken = async () => {
            const response = await fetch('/api/mapbox-token')
            const data = await response.json()
            setMapboxToken(data.token)
        }

        fetchMapboxToken()
    }, [])

    useEffect(() => {
        if (
            mapboxToken &&
            typeof window !== 'undefined' &&
            mapContainer.current
        ) {
            if (map.current === null) {
                mapboxgl.accessToken = mapboxToken
                map.current = new mapboxgl.Map({
                    container: mapContainer.current,
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center: [0, 0],
                    zoom: 2,
                })

                map.current.addControl(new mapboxgl.FullscreenControl())
                map.current.addControl(new mapboxgl.NavigationControl())

                // Fetch user's current location
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const { latitude, longitude } = position.coords
                            if (map.current) {
                                map.current.setCenter([longitude, latitude])
                                map.current.setZoom(12)

                                // Create a custom marker with a food icon for the user's location
                                const userLocationEl =
                                    document.createElement('div')
                                userLocationEl.className = 'marker'
                                userLocationEl.style.backgroundImage =
                                    'url(/static/burger.png)' // Replace with the path to your food icon
                                userLocationEl.style.width = '32px'
                                userLocationEl.style.height = '32px'
                                userLocationEl.style.backgroundSize = '100%'

                                // Add the marker to the map
                                if (userMarker.current) {
                                    userMarker.current.remove()
                                }
                                userMarker.current = new mapboxgl.Marker(
                                    userLocationEl
                                )
                                    .setLngLat([longitude, latitude])
                                    .addTo(map.current!)

                                // Call the onSearch function with the user's location
                                onSearch({ lat: latitude, lng: longitude })
                            }
                        },
                        (error) => {
                            console.error('Error fetching location:', error)
                        }
                    )
                }
            }
        }

        return () => {
            if (map.current) {
                map.current.remove()
                map.current = null
            }
        }
    }, [mapboxToken, onSearch]) // Added onSearch to dependency array

    useEffect(() => {
        if (map.current) {
            // Remove existing restaurant markers
            restaurantMarkers.current.forEach((marker) => marker.remove())
            restaurantMarkers.current = []

            // Display restaurants on the map
            restaurants.forEach((restaurant) => {
                const restaurantEl = document.createElement('div')
                restaurantEl.className = 'marker'
                restaurantEl.style.backgroundImage =
                    'url(/static/restaurant-icon.png)' // Replace with the path to your restaurant icon
                restaurantEl.style.width = '32px'
                restaurantEl.style.height = '32px'
                restaurantEl.style.backgroundSize = '100%'

                const marker = new mapboxgl.Marker(restaurantEl)
                    .setLngLat([
                        restaurant.location.lng,
                        restaurant.location.lat,
                    ])
                    .addTo(map.current!)

                restaurantMarkers.current.push(marker)
            })
        }
    }, [restaurants])

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom>
                Your Location and Nearby Restaurants
            </Typography>
            <div
                ref={mapContainer}
                style={{ height: '400px', width: '100%' }}
            />
        </Box>
    )
}

export default PostalCodeInput
