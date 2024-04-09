import React, { useEffect, useState } from 'react'
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    Box,
} from '@mui/material'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import MbHome from '@/app/project/movieBooking/components/mbHome'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

// Initialize Firebase
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const MovieBooking: React.FC = () => {
    const [user, setUser] = useState<firebase.User | null>(null)
    const [open, setOpen] = useState(true)

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            setUser(user)
        })
        // Cleanup subscription on unmount
        return () => unsubscribe()
    }, [])

    const handleLogin = () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider)
    }

    const handleLogout = () => {
        firebase.auth().signOut()
    }

    const handleClose = () => {
        setOpen(false)
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
                        Ajay Cinemas
                    </Typography>
                    {!user ? (
                        <Button color="inherit" onClick={handleLogin}>
                            Login
                        </Button>
                    ) : (
                        <>
                            <Typography variant="h6" component="div">
                                Hello, {user.displayName}
                            </Typography>
                            <Button color="inherit" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            {user && (
                <Box>
                    <MbHome />
                </Box>
            )}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Still under construction, only login works
                </DialogTitle>
            </Dialog>
        </>
    )
}

export default MovieBooking
