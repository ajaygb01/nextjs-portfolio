import {
    AppBar,
    Avatar,
    Box,
    Button,
    Grid,
    Toolbar,
    Typography,
} from '@mui/material'
import React from 'react'

const styles = {
    background: {
        backgroundColor: '#c8c200',
        color: 'black',
        height: '100vh',
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
    },
    appBar: {
        boxShadow: 'none',
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
    },
    toolbar: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        borderRadius: '15px',
        margin: '20px',
        padding: '10px 20px',
        width: 'auto',
    },
    content: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        position: 'relative',
        zIndex: 1,
    },
    section: {
        marginBottom: '20px',
        position: 'relative',
        zIndex: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(10px)',
        borderRadius: '15px',
        padding: '20px',
    },
    boldText: {
        fontWeight: 'bold',
    },
    avatar: {
        width: 300,
        height: 300,
        position: 'absolute',
        top: '50px',
        right: '50px',
        zIndex: 0,
        opacity: 0.3,
    },
    whoIAmSection: {
        marginTop: '50px',
    },
}

const Portfolio1: React.FC = () => {
    return (
        <Box sx={styles.background}>
            <AppBar position="static" sx={styles.appBar}>
                <Toolbar sx={styles.toolbar}>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        My Portfolio
                    </Typography>
                    <Button color="inherit">About</Button>
                    <Button color="inherit">Contact</Button>
                    <Button color="inherit">Projects</Button>
                </Toolbar>
            </AppBar>
            <Box sx={styles.content}>
                <Avatar
                    alt="Ajay Vigneshwar GB"
                    src="static/home.png" // Replace with the path to your profile picture
                    sx={styles.avatar}
                />
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={8}>
                        <Box sx={styles.section}>
                            <Typography variant="h4" sx={styles.boldText}>
                                What I Do
                            </Typography>
                            <Typography variant="body1">
                                I develop web applications using modern
                                technologies and create responsive,
                                user-friendly interfaces.
                            </Typography>
                        </Box>
                        <Box
                            sx={{ ...styles.section, ...styles.whoIAmSection }}
                        >
                            <Typography variant="h4" sx={styles.boldText}>
                                Who I Am
                            </Typography>
                            <Typography variant="body1">
                                I&apos;m Ajay Vigneshwar GB, a passionate
                                Software Developer with a Master of Engineering
                                in Computer Engineering.
                            </Typography>
                        </Box>
                        <Box sx={styles.section}>
                            <Typography variant="h4" sx={styles.boldText}>
                                My Experience
                            </Typography>
                            <Typography variant="body1">
                                I have extensive experience in backend
                                development, serverless architecture, and full
                                stack engineering.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default Portfolio1
