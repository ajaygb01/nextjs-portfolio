// Authentication.tsx
import React from 'react'
import { Button, Typography } from '@mui/material'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

interface AuthenticationProps {
    user: firebase.User | null
    onLogin: () => void
    onLogout: () => void
}

const Authentication: React.FC<AuthenticationProps> = ({
    user,
    onLogin,
    onLogout,
}) => {
    return (
        <>
            {!user ? (
                <Button color="inherit" onClick={onLogin}>
                    Login
                </Button>
            ) : (
                <>
                    <Typography variant="h6" component="div">
                        Hello, {user.displayName}
                    </Typography>
                    <Button color="inherit" onClick={onLogout}>
                        Logout
                    </Button>
                </>
            )}
        </>
    )
}

export default Authentication
