import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

const Navbar: React.FC = () => {
    const { data: session } = useSession();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ marginRight: 2 }}> {/* Removed flexGrow to allow link to be next to title */}
                    TaxEase
                </Typography>
                <Link href="/medidash" passHref>
                    <Button color="inherit">MediDash</Button>
                </Link>
                <div style={{ flexGrow: 1 }} /> {/* Add a spacer to push subsequent items to the right */}
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
    );
};

export default Navbar;
