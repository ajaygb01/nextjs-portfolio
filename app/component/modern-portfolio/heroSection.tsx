'use client'

import React from 'react'
import { Box, Typography, Avatar, Button, Grid } from '@mui/material'

interface HeroSectionProps {
    name: string
    title: string
    bio: string
    profileImage: string
    onSeeProjectsClick: () => void
    onContactMeClick: () => void
}

const HeroSection: React.FC<HeroSectionProps> = ({
    name,
    title,
    bio,
    profileImage,
    onSeeProjectsClick,
    onContactMeClick,
}) => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: 3, // Add some padding
            }}
        >
            <Grid container spacing={4} direction="column" alignItems="center">
                <Grid item>
                    <Avatar
                        alt={name}
                        src={profileImage}
                        sx={{
                            width: 150,
                            height: 150,
                            margin: '0 auto 20px auto', // Center avatar and add bottom margin
                        }}
                    />
                </Grid>
                <Grid item>
                    <Typography variant="h2" component="h1" gutterBottom>
                        {name}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h5" color="textSecondary" gutterBottom>
                        {title}
                    </Typography>
                </Grid>
                <Grid item sx={{ maxWidth: '600px' }}> 
                    <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-line' }}>
                        {bio}
                    </Typography>
                </Grid>
                <Grid item container spacing={2} justifyContent="center">
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={onSeeProjectsClick}
                        >
                            See Projects
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="outlined"
                            color="primary"
                            size="large"
                            onClick={onContactMeClick}
                        >
                            Contact Me
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default HeroSection
