import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { Box, AppBar, Toolbar, Button, Typography } from '@mui/material'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Portfolio',
    description: 'Next Js Portfolio App',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AppBar position="static" sx={{ marginBottom: 2 }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link href="/" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                                My Portfolio
                            </Link>
                        </Typography>
                        <Link href="/" passHref>
                            <Button color="inherit">Original Design</Button>
                        </Link>
                        <Link href="/modern-portfolio" passHref>
                            <Button color="inherit">Modern Portfolio</Button>
                        </Link>
                    </Toolbar>
                </AppBar>
                <Box component="main"> {/* Add a main Box wrapper for children for better layout control if needed */}
                    {children}
                </Box>
            </body>
        </html>
    )
}
