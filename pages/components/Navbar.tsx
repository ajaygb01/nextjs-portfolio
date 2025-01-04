import { AppBar, Toolbar, Button, Typography } from '@mui/material'
import { useSession, signIn, signOut } from 'next-auth/react'

const Navbar: React.FC = () => {
    const { data: session } = useSession()

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    TaxEase
                </Typography>
                {session ? (
                    <>
                        <Typography variant="body1" sx={{ marginRight: 2 }}>
                            Welcome, {session.user?.name}
                        </Typography>
                        <Button color="inherit" onClick={() => signOut()}>
                            Logout
                        </Button>
                    </>
                ) : (
                    <Button color="inherit" onClick={() => signIn('google')}>
                        Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
