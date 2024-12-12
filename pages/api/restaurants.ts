// pages/api/restaurants.ts

export default function handler(req: any, res: any) {
    const restaurants = [
        {
            name: 'Pizza Palace',
            address: '123 Main St',
            postalCode: 'M5A 1A1',
            cuisineType: 'Italian',
            rating: 4.5,
            imageUrl: `https://placehold.co/140/EEE/31343C?font=pt-sans&text=Pizza%20Palace`,
        },
        {
            name: 'Sushi World',
            address: '456 Elm St',
            postalCode: 'M5A 1B2',
            cuisineType: 'Japanese',
            rating: 4.7,
            imageUrl: `https://placehold.co/140/EEE/31343C?font=pt-sans&text=Sushi%20World`,
        },
        {
            name: 'Burger Bonanza',
            address: '789 Oak St',
            postalCode: 'M5A 1C3',
            cuisineType: 'American',
            rating: 4.2,
            imageUrl: `https://placehold.co/140/EEE/31343C?font=pt-sans&text=Burger%20Bonanza`,
        },
        {
            name: 'Taco Fiesta',
            address: '101 Pine St',
            postalCode: 'M5A 1D4',
            cuisineType: 'Mexican',
            rating: 4.3,
            imageUrl: `https://placehold.co/140/EEE/31343C?font=pt-sans&text=Taco%20Fiesta`,
        },
        {
            name: 'Taco Fiesta1',
            address: '101 Pine St',
            postalCode: 'M5A 1D6',
            cuisineType: 'Mexican',
            rating: 4.3,
            imageUrl: `https://placehold.co/140/EEE/31343C?font=pt-sans&text=Taco%20Fiesta1`,
        },
    ]

    // Simulate API response
    res.status(200).json(restaurants)
}
