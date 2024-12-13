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
            distance: 5, // in km
            deliveryTime: 30, // in minutes
            menu: [
                { id: 1, name: 'Margherita Pizza', price: 10.99 },
                { id: 2, name: 'Pepperoni Pizza', price: 12.99 },
                { id: 3, name: 'Veggie Pizza', price: 11.99 },
            ],
        },
        {
            name: 'Sushi World',
            address: '456 Elm St',
            postalCode: 'M5A 1B2',
            cuisineType: 'Japanese',
            rating: 4.7,
            imageUrl: `https://placehold.co/140/EEE/31343C?font=pt-sans&text=Sushi%20World`,
            distance: 3, // in km
            deliveryTime: 25, // in minutes
            menu: [
                { id: 1, name: 'California Roll', price: 8.99 },
                { id: 2, name: 'Spicy Tuna Roll', price: 9.99 },
                { id: 3, name: 'Salmon Sashimi', price: 12.99 },
            ],
        },
        {
            name: 'Burger Bonanza',
            address: '789 Oak St',
            postalCode: 'M5A 1C3',
            cuisineType: 'American',
            rating: 4.2,
            imageUrl: `https://placehold.co/140/EEE/31343C?font=pt-sans&text=Burger%20Bonanza`,
            distance: 4, // in km
            deliveryTime: 20, // in minutes
            menu: [
                { id: 1, name: 'Classic Burger', price: 9.99 },
                { id: 2, name: 'Cheeseburger', price: 10.99 },
                { id: 3, name: 'Bacon Burger', price: 11.99 },
            ],
        },
        {
            name: 'Taco Fiesta',
            address: '101 Pine St',
            postalCode: 'M5A 1D4',
            cuisineType: 'Mexican',
            rating: 4.3,
            imageUrl: `https://placehold.co/140/EEE/31343C?font=pt-sans&text=Taco%20Fiesta`,
            distance: 2, // in km
            deliveryTime: 15, // in minutes
            menu: [
                { id: 1, name: 'Chicken Taco', price: 3.99 },
                { id: 2, name: 'Beef Taco', price: 4.99 },
                { id: 3, name: 'Veggie Taco', price: 3.49 },
            ],
        },
        {
            name: 'Taco Fiesta1',
            address: '101 Pine St',
            postalCode: 'M5A 1D6',
            cuisineType: 'Mexican',
            rating: 4.3,
            imageUrl: `https://placehold.co/140/EEE/31343C?font=pt-sans&text=Taco%20Fiesta1`,
            distance: 2, // in km
            deliveryTime: 15, // in minutes
            menu: [
                { id: 1, name: 'Chicken Taco', price: 3.99 },
                { id: 2, name: 'Beef Taco', price: 4.99 },
                { id: 3, name: 'Veggie Taco', price: 3.49 },
            ],
        },
    ]

    // Simulate API response
    res.status(200).json(restaurants)
}
