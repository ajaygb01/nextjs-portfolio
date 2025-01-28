'use client'
import React, { useState } from 'react'
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Grid,
    Card,
    ThemeProvider,
    Avatar,
    Link,
    Slide,
    Grow,
    Zoom,
} from '@mui/material'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import { darkTheme, lightTheme } from '@/app/state/initialTheme'
import { FormValues } from '@/app/state/initialState'

interface PortfolioDisplayProps {
    formProps: FormValues
    height?: number
    isModal?: boolean
    handleClose?: () => void
}

const PortfolioDisplay: React.FC<PortfolioDisplayProps> = ({
    formProps,
    height = 100,
    isModal,
    handleClose,
}) => {
    const [darkMode, setDarkMode] = useState(false)

    const theme = darkMode ? darkTheme : lightTheme

    return (
        <ThemeProvider theme={theme}>
            <Box
                component={'div'}
                sx={{
                    display: 'flex',
                    padding: 2,
                    flexDirection: 'column',
                    minHeight: height + 'vh',
                    justifyContent: 'space-between',
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.text.primary,
                    animation: 'backgroundAnimation 10s infinite alternate',
                    '@keyframes backgroundAnimation': {
                        '0%': { backgroundColor: '#ffeb3b' },
                        '50%': { backgroundColor: '#ff5722' },
                        '100%': { backgroundColor: '#4caf50' },
                    },
                }}
            >
                <AppBar
                    position="static"
                    sx={{
                        boxShadow: 'none',
                        borderRadius: 3,
                        backgroundColor: theme.palette.secondary.main,
                    }}
                >
                    <Toolbar>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography variant="h6" component="div">
                                {formProps.userInfo.name}
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                component="div"
                                sx={{
                                    fontSize: '0.8rem',
                                    opacity: 0.6,
                                }}
                            >
                                {formProps.userInfo.title}
                            </Typography>
                        </Box>
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={() => setDarkMode(!darkMode)}
                            aria-label="mode"
                        >
                            {theme.palette.mode === 'light' ? (
                                <Brightness7Icon />
                            ) : (
                                <Brightness4Icon />
                            )}
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
                    <Zoom in={true} style={{ transitionDelay: '500ms' }}>
                        <Avatar
                            alt={formProps.userInfo.name}
                            src={formProps.profileImage}
                            sx={{ width: 100, height: 100, margin: '0 auto' }}
                        />
                    </Zoom>
                    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                        <Typography variant="h4" gutterBottom>
                            {formProps.userInfo.name}
                        </Typography>
                    </Slide>
                    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                        <Typography variant="h6" gutterBottom>
                            {formProps.userInfo.title}
                        </Typography>
                    </Slide>
                    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                        <Typography variant="body1" gutterBottom>
                            {formProps.userInfo.bio}
                        </Typography>
                    </Slide>
                </Box>

                {formProps.isTechStack && (
                    <Box sx={{ marginBottom: '20px' }}>
                        <Typography variant="h5" gutterBottom>
                            Tech Stack
                        </Typography>
                        <Grid container spacing={2}>
                            {formProps.techStack.map((tech, index) => (
                                <Grid item xs={6} sm={4} md={3} key={index}>
                                    <Grow
                                        in={true}
                                        style={{
                                            transitionDelay: `${index * 100}ms`,
                                        }}
                                    >
                                        <Card
                                            sx={{
                                                padding: '10px',
                                                textAlign: 'center',
                                                backgroundColor: '#e0f7fa',
                                                animation:
                                                    'cardAnimation 5s infinite alternate',
                                                '@keyframes cardAnimation': {
                                                    '0%': {
                                                        transform:
                                                            'rotate(0deg)',
                                                    },
                                                    '100%': {
                                                        transform:
                                                            'rotate(360deg)',
                                                    },
                                                },
                                            }}
                                        >
                                            <Typography variant="h6">
                                                {tech.language}
                                            </Typography>
                                            <Typography variant="body2">
                                                {tech.year} years
                                            </Typography>
                                        </Card>
                                    </Grow>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}

                {formProps.isExperience && (
                    <Box sx={{ marginBottom: '20px' }}>
                        <Typography variant="h5" gutterBottom>
                            Experience
                        </Typography>
                        {formProps.experience.map((exp, index) => (
                            <Grow
                                in={true}
                                style={{ transitionDelay: `${index * 100}ms` }}
                                key={index}
                            >
                                <Card
                                    sx={{
                                        padding: '10px',
                                        marginBottom: '10px',
                                        backgroundColor: '#fff3e0',
                                        animation:
                                            'cardAnimation 5s infinite alternate',
                                        '@keyframes cardAnimation': {
                                            '0%': { transform: 'rotate(0deg)' },
                                            '100%': {
                                                transform: 'rotate(360deg)',
                                            },
                                        },
                                    }}
                                >
                                    <Typography variant="h6">
                                        {exp.position}
                                    </Typography>
                                    <Typography variant="body2">
                                        {exp.company} - {exp.location}
                                    </Typography>
                                    <Typography variant="body2">
                                        {exp.from} to {exp.to}
                                    </Typography>
                                    <Typography variant="body2">
                                        Key Skills: {exp.keySkills.join(', ')}
                                    </Typography>
                                </Card>
                            </Grow>
                        ))}
                    </Box>
                )}

                {formProps.isContact && (
                    <Box sx={{ marginBottom: '20px' }}>
                        <Typography variant="h5" gutterBottom>
                            Contact
                        </Typography>
                        <Grid container spacing={2}>
                            {formProps.contact.map((contact, index) => (
                                <Grid item xs={4} key={index}>
                                    <Link
                                        href={contact.link}
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        <IconButton>{contact.icon}</IconButton>
                                        <Typography variant="body2">
                                            {contact.app}
                                        </Typography>
                                    </Link>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}

                {formProps.isProject && (
                    <Box sx={{ marginBottom: '20px' }}>
                        <Typography variant="h5" gutterBottom>
                            Projects
                        </Typography>
                        {formProps.projects.map((project, index) => (
                            <Grow
                                in={true}
                                style={{ transitionDelay: `${index * 100}ms` }}
                                key={index}
                            >
                                <Card
                                    sx={{
                                        padding: '10px',
                                        marginBottom: '10px',
                                        backgroundColor: '#e8f5e9',
                                        animation:
                                            'cardAnimation 5s infinite alternate',
                                        '@keyframes cardAnimation': {
                                            '0%': { transform: 'rotate(0deg)' },
                                            '100%': {
                                                transform: 'rotate(360deg)',
                                            },
                                        },
                                    }}
                                >
                                    <Typography variant="h6">
                                        {project.name}
                                    </Typography>
                                    <Typography variant="body2">
                                        {project.description}
                                    </Typography>
                                    <Link
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        <Typography
                                            variant="body2"
                                            color="primary"
                                        >
                                            View Project
                                        </Typography>
                                    </Link>
                                </Card>
                            </Grow>
                        ))}
                    </Box>
                )}

                <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
                    <Typography variant="body2">
                        &copy; {formProps.footer.year}{' '}
                        {formProps.footer.companyName}
                    </Typography>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default PortfolioDisplay
