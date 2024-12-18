// pages/api/restaurants.ts

function getRandomCoordinates(
    center: { lat: number; lng: number },
    radius: number
) {
    const y0 = center.lat
    const x0 = center.lng
    const rd = radius / 111300 // about 111300 meters in one degree

    const u = Math.random()
    const v = Math.random()

    const w = rd * Math.sqrt(u)
    const t = 2 * Math.PI * v
    const x = w * Math.cos(t)
    const y = w * Math.sin(t)

    const newLat = y + y0
    const newLng = x + x0

    return { lat: newLat, lng: newLng }
}

export default function handler(req: any, res: any) {
    const { lat, lng } = req.query
    const center = { lat: parseFloat(lat), lng: parseFloat(lng) }
    const radius = 10000 // 10 km

    const restaurants = [
        {
            name: 'Pizza Palace',
            address: '123 Main St',
            postalCode: 'H1K 1A1',
            cuisineType: 'Italian',
            rating: 4.5,
            imageUrl: `https://placehold.co/140/EEE/31343C?font=pt-sans&text=Pizza%20Palace`,
            distance: 5, // in km
            deliveryTime: 30, // in minutes
            location: getRandomCoordinates(center, radius),
            menu: [
                { id: 1, name: 'Margherita Pizza', price: 10.99 },
                { id: 2, name: 'Pepperoni Pizza', price: 12.99 },
                { id: 3, name: 'Veggie Pizza', price: 11.99 },
            ],
        },
        {
            name: 'Sushi World',
            address: '456 Elm St',
            postalCode: 'H1K 1B2',
            cuisineType: 'Japanese',
            rating: 4.7,
            imageUrl: `https://placehold.co/140/EEE/31343C?font=pt-sans&text=Sushi%20World`,
            distance: 3, // in km
            deliveryTime: 25, // in minutes
            location: getRandomCoordinates(center, radius),
            menu: [
                { id: 1, name: 'California Roll', price: 8.99 },
                { id: 2, name: 'Spicy Tuna Roll', price: 9.99 },
                { id: 3, name: 'Salmon Sashimi', price: 12.99 },
            ],
        },
        {
            name: 'Burger Bonanza',
            address: '789 Oak St',
            postalCode: 'H1K 1C3',
            cuisineType: 'American',
            rating: 4.2,
            imageUrl: `https://placehold.co/140/EEE/31343C?font=pt-sans&text=Burger%20Bonanza`,
            distance: 4, // in km
            deliveryTime: 20, // in minutes
            location: getRandomCoordinates(center, radius),
            menu: [
                { id: 1, name: 'Classic Burger', price: 9.99 },
                { id: 2, name: 'Cheeseburger', price: 10.99 },
                { id: 3, name: 'Bacon Burger', price: 11.99 },
            ],
        },
        {
            name: 'Taco Fiesta',
            address: '101 Pine St',
            postalCode: 'H1K 1D4',
            cuisineType: 'Mexican',
            rating: 4.3,
            imageUrl: `https://placehold.co/140/EEE/31343C?font=pt-sans&text=Taco%20Fiesta`,
            distance: 2, // in km
            deliveryTime: 15, // in minutes
            location: getRandomCoordinates(center, radius),
            menu: [
                { id: 1, name: 'Chicken Taco', price: 3.99 },
                { id: 2, name: 'Beef Taco', price: 4.99 },
                { id: 3, name: 'Veggie Taco', price: 3.49 },
            ],
        },
        {
            name: 'Pasta Paradise',
            address: '202 Maple St',
            postalCode: 'H1K 1E5',
            cuisineType: 'Italian',
            rating: 4.6,
            imageUrl: `https://placehold.co/140/EEE/31343C?font=pt-sans&text=Pasta%20Paradise`,
            distance: 6, // in km
            deliveryTime: 35, // in minutes
            location: getRandomCoordinates(center, radius),
            menu: [
                { id: 1, name: 'Spaghetti Carbonara', price: 13.99 },
                { id: 2, name: 'Fettuccine Alfredo', price: 14.99 },
                { id: 3, name: 'Penne Arrabbiata', price: 12.99 },
            ],
        },
        {
            name: 'Curry Corner',
            address: '303 Birch St',
            postalCode: 'H1K 1F6',
            cuisineType: 'Indian',
            rating: 4.8,
            imageUrl: `https://placehold.co/140/EEE/31343C?font=pt-sans&text=Curry%20Corner`,
            distance: 7, // in km
            deliveryTime: 40, // in minutes
            location: getRandomCoordinates(center, radius),
            menu: [
                { id: 1, name: 'Butter Chicken', price: 15.99 },
                { id: 2, name: 'Paneer Tikka Masala', price: 14.99 },
                { id: 3, name: 'Lamb Rogan Josh', price: 16.99 },
            ],
        },
    ]

    // Simulate API response
    res.status(200).json(restaurants)
}
