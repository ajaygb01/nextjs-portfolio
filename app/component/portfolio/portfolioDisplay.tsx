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
    CardContent,
    ThemeProvider,
    useMediaQuery,
    useTheme,
} from '@mui/material'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import { darkTheme, icons, lightTheme } from '@/app/state/initialTheme'
import { FormValues } from '@/app/state/initialState'
import { get } from 'http'
import { getSectionContent } from '../sectionGenerator/section'

interface PortfolioDisplayProps {
    formProps: FormValues
}

const PortfolioDisplay: React.FC<PortfolioDisplayProps> = ({ formProps }) => {
    const [darkMode, setDarkMode] = useState(false)
    const [prevMode, setPrevMode] = useState(true)

    const [open, setOpen] = useState<{ [key: string]: boolean }>({
        techstack: false,
        experience: false,
        contact: false,
        about: false,
        projects: false,
    })

    const handleToggle = (section: string) => {
        setOpen((prevOpen) => ({ ...prevOpen, [section]: !prevOpen[section] }))
    }

    const theme = darkMode ? darkTheme : lightTheme

    const sectionContent = getSectionContent(formProps, theme)

    return (
        <ThemeProvider theme={theme}>
            <Box
                component={'div'}
                sx={{
                    display: 'flex',
                    padding: 2,
                    flexDirection: 'column',
                    minHeight: '100vh',
                    justifyContent: 'space-between',
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.text.primary,
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
                            <Typography variant="h6" component="div" sx={{}}>
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
                            onClick={() => {
                                const newPrevMode =
                                    theme.palette.mode === 'light'
                                        ? true
                                        : false
                                setPrevMode(newPrevMode)
                                setDarkMode(newPrevMode)
                            }}
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
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box
                        sx={{
                            p: 2,
                            textAlign: 'center',
                            width: { xs: '100%', md: '50%' },
                        }}
                    >
                        <Typography variant="body1" component="div">
                            {formProps.userInfo.bio}
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        marginBottom: '5px',
                    }}
                >
                    {formProps.isTechStack ||
                    formProps.isExperience ||
                    formProps.isContact ||
                    formProps.isProject ? (
                        <Grid container spacing={1}>
                            {Object.keys(icons).map((section) => (
                                <Grid item xs={12} sm={6} md={3} key={section}>
                                    <Card
                                        sx={{
                                            backgroundColor:
                                                theme.palette.secondary.main,
                                        }}
                                    >
                                        <CardContent>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                }}
                                                onClick={() =>
                                                    handleToggle(section)
                                                }
                                            >
                                                <IconButton
                                                    sx={{
                                                        color: theme.palette
                                                            .text.primary,
                                                    }}
                                                >
                                                    {
                                                        icons[
                                                            section as keyof typeof icons
                                                        ]
                                                    }
                                                </IconButton>
                                                <Typography
                                                    variant="h6"
                                                    component="div"
                                                >
                                                    {section
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        section.slice(1)}
                                                </Typography>
                                            </Box>
                                            {open[section] && (
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    component="div"
                                                >
                                                    {
                                                        sectionContent[
                                                            section as keyof typeof sectionContent
                                                        ]
                                                    }
                                                </Typography>
                                            )}
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <></>
                    )}
                </Box>
                <Box
                    component={'footer'}
                    sx={{
                        mt: 2,
                        py: 2,
                        borderRadius: 3,
                        textAlign: 'center',
                        position: 'relative',
                    }}
                >
                    <Typography variant="body2" color="text.secondary">
                        © {formProps.footer.year}{' '}
                        {formProps.footer.companyName}
                    </Typography>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default PortfolioDisplay
