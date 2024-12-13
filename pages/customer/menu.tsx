import React from 'react'
import { useRouter } from 'next/router'
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
} from '@mui/material'

interface MenuItem {
    id: number
    name: string
    price: number
}

interface Restaurant {
    name: string
    address: string
    postalCode: string
    cuisineType: string
    rating: number
    imageUrl: string
    distance: number
    deliveryTime: number
    menu: MenuItem[]
}

const MenuView: React.FC = () => {
    const router = useRouter()
    const { restaurant } = router.query
    const restaurantData: Restaurant = restaurant
        ? JSON.parse(restaurant as string)
        : null

    if (!restaurantData) {
        return (
            <Typography variant="h6">No restaurant data available</Typography>
        )
    }

    return (
        <Box sx={{ padding: 2 }}>
            <Card>
                <CardMedia
                    component="img"
                    height="140"
                    image={restaurantData.imageUrl}
                    alt={restaurantData.name}
                />
                <CardContent>
                    <Typography variant="h4">{restaurantData.name}</Typography>
                    <Typography variant="body1">
                        {restaurantData.address}
                    </Typography>
                    <Typography variant="body1">
                        Cuisine: {restaurantData.cuisineType}
                    </Typography>
                    <Typography variant="body1">
                        Rating: {restaurantData.rating}
                    </Typography>
                    <Typography variant="body1">
                        Distance: {restaurantData.distance} km
                    </Typography>
                    <Typography variant="body1">
                        Delivery Time: {restaurantData.deliveryTime} minutes
                    </Typography>
                </CardContent>
            </Card>

            <Typography variant="h5" sx={{ marginTop: 2 }}>
                Menu
            </Typography>
            <List>
                {restaurantData.menu.map((item) => (
                    <ListItem key={item.id}>
                        <ListItemText
                            primary={item.name}
                            secondary={`$${item.price.toFixed(2)}`}
                        />
                        <Button variant="contained">Add to Cart</Button>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}

export default MenuView
