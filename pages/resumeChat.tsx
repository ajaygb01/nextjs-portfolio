import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { firebaseConfig } from '@/app/state/initialState'
import { Box, Button, Container, Typography } from '@mui/material'
import ChatBuilder from '@/app/project/resumeBuilder/components/chatBuilder'

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const ResumeChat: React.FC = () => {
    const router = useRouter()
    const [user, setUser] = useState<firebase.User | null>(null)

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            setUser(user)
        })
        // Cleanup subscription on unmount
        return () => unsubscribe()
    }, [])

    const handleLogin = async () => {
        try {
            const provider = new firebase.auth.GoogleAuthProvider()
            await firebase.auth().signInWithPopup(provider)
            router.push('/resumeChat')
        } catch (error) {
            console.error('Error logging in:', error)
        }
    }

    const handleLogout = () => {
        firebase.auth().signOut()
    }

    return (
        <Container>
            <Typography variant="h1">Resume Chat</Typography>
            {user ? (
                <Box>
                    <ChatBuilder />
                </Box>
            ) : (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                >
                    Login with Google
                </Button>
            )}
            {user && (
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            )}
        </Container>
    )
}

export default ResumeChat
