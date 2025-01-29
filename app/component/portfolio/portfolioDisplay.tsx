'use client'
import React, { useState } from 'react'
import {
    Box,
    Typography,
    Grid,
    Card,
    ThemeProvider,
    Avatar,
    Link,
    Paper,
    Divider,
    Container,
    Chip,
    useMediaQuery,
    useTheme,
} from '@mui/material'
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
    const muiTheme = useTheme()
    const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'))

    const getFormattedDate = (date: string, forDisplay = true) => {
        if (date === 'Present' || date === '') {
            if (forDisplay) {
                return 'Present'
            } else {
                const currentDate = new Date()
                const currentMonth = currentDate.toLocaleString('default', {
                    month: 'short',
                })
                const currentYear = currentDate.getFullYear().toString()
                return `${currentYear}-${currentMonth}`
            }
        }

        const [year, month] = date.split('-')
        return `${month} ${year}`
    }

    const calculateYears = (from: string, to: string) => {
        const fromDate = new Date(from)
        const toDate = to === 'Present' ? new Date() : new Date(to)
        const years = toDate.getFullYear() - fromDate.getFullYear()
        const months = toDate.getMonth() - fromDate.getMonth()
        return years + months / 12
    }

    const sortExperience = (a: { to: string }, b: { to: string }) => {
        const dateA =
            a.to === 'Present' || a.to === '' ? new Date() : new Date(a.to)
        const dateB =
            b.to === 'Present' || b.to === '' ? new Date() : new Date(b.to)
        return dateB.getTime() - dateA.getTime()
    }

    return (
        <ThemeProvider theme={theme}>
            <Box
                component={'div'}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: height + 'vh',
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.text.primary,
                    padding: 4,
                }}
            >
                {isMobile ? (
                    <Box sx={{ mt: 4 }}>
                        <Box
                            sx={{
                                padding: 4,
                                borderRadius: 2,
                                backgroundColor:
                                    theme.palette.background.default,
                            }}
                        >
                            <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
                                <Avatar
                                    alt={formProps.userInfo.name}
                                    src={formProps.profileImage}
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        margin: '0 auto',
                                    }}
                                />
                                <Typography variant="h4" gutterBottom>
                                    {formProps.userInfo.name}
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    {formProps.userInfo.title}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {formProps.userInfo.bio}
                                </Typography>
                            </Box>

                            <Divider sx={{ marginBottom: 4 }} />

                            {formProps.isTechStack && (
                                <Box sx={{ marginBottom: 4 }}>
                                    <Typography variant="h5" gutterBottom>
                                        Tech Stack
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: 1,
                                        }}
                                    >
                                        {formProps.techStack.map(
                                            (tech, index) => (
                                                <Chip
                                                    key={index}
                                                    label={`${tech.language} (${tech.year} years)`}
                                                    sx={{
                                                        backgroundColor:
                                                            theme.palette
                                                                .background
                                                                .paper,
                                                    }}
                                                />
                                            )
                                        )}
                                    </Box>
                                </Box>
                            )}

                            {formProps.isExperience && (
                                <Box sx={{ marginBottom: 4 }}>
                                    <Typography variant="h5" gutterBottom>
                                        Experience
                                    </Typography>
                                    {formProps.experience
                                        .slice()
                                        .sort(sortExperience)
                                        .map((exp, index) => (
                                            <Card
                                                key={index}
                                                sx={{
                                                    padding: 2,
                                                    marginBottom: 2,
                                                    backgroundColor:
                                                        theme.palette.background
                                                            .paper,
                                                }}
                                            >
                                                <Typography variant="h6">
                                                    {exp.position}
                                                </Typography>
                                                <Typography variant="body2">
                                                    {exp.company} -{' '}
                                                    {exp.location}
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1,
                                                    }}
                                                >
                                                    <Typography variant="body2">
                                                        {getFormattedDate(
                                                            exp.from
                                                        )}{' '}
                                                        to{' '}
                                                        {getFormattedDate(
                                                            exp.to
                                                        )}
                                                    </Typography>
                                                    <Chip
                                                        label={`${calculateYears(
                                                            exp.from,
                                                            getFormattedDate(
                                                                exp.to,
                                                                false
                                                            )
                                                        ).toFixed(1)} years`}
                                                        size="small"
                                                        sx={{
                                                            backgroundColor:
                                                                theme.palette
                                                                    .background
                                                                    .paper,
                                                        }}
                                                    />
                                                </Box>
                                                <Typography variant="body2">
                                                    Key Skills:{' '}
                                                    {exp.keySkills.join(', ')}
                                                </Typography>
                                            </Card>
                                        ))}
                                </Box>
                            )}

                            {formProps.isContact && (
                                <Box sx={{ marginBottom: 4 }}>
                                    <Typography variant="h5" gutterBottom>
                                        Contact
                                    </Typography>
                                    <Grid container spacing={2}>
                                        {formProps.contact.map(
                                            (contact, index) => (
                                                <Grid item xs={4} key={index}>
                                                    <Link
                                                        href={contact.link}
                                                        target="_blank"
                                                        rel="noopener"
                                                    >
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems:
                                                                    'center',
                                                                gap: 1,
                                                            }}
                                                        >
                                                            {contact.icon}
                                                            <Typography variant="body2">
                                                                {contact.app}
                                                            </Typography>
                                                        </Box>
                                                    </Link>
                                                </Grid>
                                            )
                                        )}
                                    </Grid>
                                </Box>
                            )}

                            {formProps.isProject && (
                                <Box sx={{ marginBottom: 4 }}>
                                    <Typography variant="h5" gutterBottom>
                                        Projects
                                    </Typography>
                                    {formProps.projects.map(
                                        (project, index) => (
                                            <Card
                                                key={index}
                                                sx={{
                                                    padding: 2,
                                                    marginBottom: 2,
                                                    backgroundColor:
                                                        theme.palette.background
                                                            .paper,
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
                                        )
                                    )}
                                </Box>
                            )}

                            <Box sx={{ textAlign: 'center', marginTop: 4 }}>
                                <Typography variant="body2">
                                    &copy; {formProps.footer.year}{' '}
                                    {formProps.footer.companyName}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                ) : (
                    <Container maxWidth="md" sx={{ mt: 4 }}>
                        <Paper
                            elevation={3}
                            sx={{
                                padding: 4,
                                borderRadius: 2,
                                backgroundColor: theme.palette.background.paper,
                            }}
                        >
                            <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
                                <Avatar
                                    alt={formProps.userInfo.name}
                                    src={formProps.profileImage}
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        margin: '0 auto',
                                    }}
                                />
                                <Typography variant="h4" gutterBottom>
                                    {formProps.userInfo.name}
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    {formProps.userInfo.title}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {formProps.userInfo.bio}
                                </Typography>
                            </Box>

                            <Divider sx={{ marginBottom: 4 }} />

                            {formProps.isTechStack && (
                                <Box sx={{ marginBottom: 4 }}>
                                    <Typography variant="h5" gutterBottom>
                                        Tech Stack
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: 1,
                                        }}
                                    >
                                        {formProps.techStack.map(
                                            (tech, index) => (
                                                <Chip
                                                    key={index}
                                                    label={`${tech.language} (${tech.year} years)`}
                                                    sx={{
                                                        backgroundColor:
                                                            theme.palette
                                                                .background
                                                                .paper,
                                                    }}
                                                />
                                            )
                                        )}
                                    </Box>
                                </Box>
                            )}

                            {formProps.isExperience && (
                                <Box sx={{ marginBottom: 4 }}>
                                    <Typography variant="h5" gutterBottom>
                                        Experience
                                    </Typography>
                                    {formProps.experience
                                        .slice()
                                        .sort(sortExperience)
                                        .map((exp, index) => (
                                            <Card
                                                key={index}
                                                sx={{
                                                    padding: 2,
                                                    marginBottom: 2,
                                                    backgroundColor:
                                                        theme.palette.background
                                                            .paper,
                                                }}
                                            >
                                                <Typography variant="h6">
                                                    {exp.position}
                                                </Typography>
                                                <Typography variant="body2">
                                                    {exp.company} -{' '}
                                                    {exp.location}
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1,
                                                    }}
                                                >
                                                    <Typography variant="body2">
                                                        {getFormattedDate(
                                                            exp.from
                                                        )}{' '}
                                                        to{' '}
                                                        {getFormattedDate(
                                                            exp.to
                                                        )}
                                                    </Typography>
                                                    <Chip
                                                        label={`${calculateYears(
                                                            exp.from,
                                                            getFormattedDate(
                                                                exp.to,
                                                                false
                                                            )
                                                        ).toFixed(1)} years`}
                                                        size="small"
                                                        sx={{
                                                            backgroundColor:
                                                                theme.palette
                                                                    .background
                                                                    .paper,
                                                        }}
                                                    />
                                                </Box>
                                                <Typography variant="body2">
                                                    Key Skills:{' '}
                                                    {exp.keySkills.join(', ')}
                                                </Typography>
                                            </Card>
                                        ))}
                                </Box>
                            )}

                            {formProps.isContact && (
                                <Box sx={{ marginBottom: 4 }}>
                                    <Typography variant="h5" gutterBottom>
                                        Contact
                                    </Typography>
                                    <Grid container spacing={2}>
                                        {formProps.contact.map(
                                            (contact, index) => (
                                                <Grid item xs={4} key={index}>
                                                    <Link
                                                        href={contact.link}
                                                        target="_blank"
                                                        rel="noopener"
                                                    >
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems:
                                                                    'center',
                                                                gap: 1,
                                                            }}
                                                        >
                                                            {contact.icon}
                                                            <Typography variant="body2">
                                                                {contact.app}
                                                            </Typography>
                                                        </Box>
                                                    </Link>
                                                </Grid>
                                            )
                                        )}
                                    </Grid>
                                </Box>
                            )}

                            {formProps.isProject && (
                                <Box sx={{ marginBottom: 4 }}>
                                    <Typography variant="h5" gutterBottom>
                                        Projects
                                    </Typography>
                                    {formProps.projects.map(
                                        (project, index) => (
                                            <Card
                                                key={index}
                                                sx={{
                                                    padding: 2,
                                                    marginBottom: 2,
                                                    backgroundColor:
                                                        theme.palette.background
                                                            .paper,
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
                                        )
                                    )}
                                </Box>
                            )}

                            <Box sx={{ textAlign: 'center', marginTop: 4 }}>
                                <Typography variant="body2">
                                    &copy; {formProps.footer.year}{' '}
                                    {formProps.footer.companyName}
                                </Typography>
                            </Box>
                        </Paper>
                    </Container>
                )}
            </Box>
        </ThemeProvider>
    )
}

export default PortfolioDisplay
