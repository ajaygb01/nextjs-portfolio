import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { firebaseConfig } from '@/app/state/initialState'
import {
    Avatar,
    Box,
    Button,
    Container,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    IconButton,
    Typography,
} from '@mui/material'
import ChatBuilder from '@/app/project/resumeBuilder/components/chatBuilder'
import InboxIcon from '@mui/icons-material/Inbox'
import MenuIcon from '@mui/icons-material/Menu'

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const ResumeChat: React.FC = () => {
    const router = useRouter()
    const [user, setUser] = useState<firebase.User | null>(null)
    const [drawerOpen, setDrawerOpen] = useState(false)

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            setUser(user)
        })
        // Cleanup subscription on unmount
        return () => unsubscribe()
    }, [])

    useEffect(() => {
        if (!firebase.auth().currentUser) {
            handleLogin()
        }
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

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen)
    }

    return (
        <Box sx={{ bgcolor: '#f5f5f5', height: '100vh' }}>
            <Drawer open={drawerOpen} onClose={toggleDrawer}>
                <List>
                    {['Template 1', 'Template 2', 'Template 3'].map(
                        (text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        )
                    )}
                </List>
            </Drawer>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleDrawer}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Resume Chat
                </Typography>
                {user && (
                    <Avatar onClick={handleLogout}>
                        {user.displayName?.charAt(0)}
                    </Avatar>
                )}
            </Toolbar>
            <Container>
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
            </Container>
        </Box>
    )
}

export default ResumeChat
