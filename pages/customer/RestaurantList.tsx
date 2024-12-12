import React from 'react'
import {
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
} from '@mui/material'

interface RestaurantListProps {
    restaurants: any[]
}

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurants }) => {
    if (!restaurants || restaurants.length === 0) {
        return <></>
    }
    return (
        <>
            <Grid container spacing={3}>
                {restaurants.map((restaurant, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={
                                    restaurant.imageUrl ||
                                    'https://via.placeholder.com/140'
                                }
                                alt={restaurant.name}
                            />
                            <CardContent>
                                <Typography variant="h6">
                                    {restaurant.name}
                                </Typography>
                                <Typography variant="body2">
                                    {restaurant.cuisineType}
                                </Typography>
                                <Typography variant="body2">
                                    {restaurant.address}
                                </Typography>
                                <Typography variant="body2">
                                    Rating: {restaurant.rating}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default RestaurantList
