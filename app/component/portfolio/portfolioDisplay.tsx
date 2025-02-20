'use client'
import React, { useState, ReactElement } from 'react'
import {
    Box,
    Typography,
    Avatar,
    Link,
    Container,
    Chip,
    IconButton,
    Card,
    CardContent,
    Tooltip,
    Switch
} from '@mui/material'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import EmailIcon from '@mui/icons-material/Email'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { FormValues } from '@/app/state/initialState'

// Theme Configuration
const themes = {
    light: createTheme({
        palette: {
            primary: { main: '#1976d2' },
            background: { default: '#f5f5f5', paper: '#ffffff' },
            text: { primary: '#333' },
        },
    }),
    dark: createTheme({
        palette: {
            primary: { main: '#ff9800' },
            background: { default: '#121212', paper: '#1e1e1e' },
            text: { primary: '#ffffff' },
        },
    }),
}

const PortfolioDisplay: React.FC<{ formProps: FormValues }> = ({ formProps }) => {
    const [darkMode, setDarkMode] = useState(false)
    const [expandedSection, setExpandedSection] = useState<string | null>(null)

    const toggleTheme = () => setDarkMode(!darkMode)
    const currentTheme = darkMode ? themes.dark : themes.light

    const totalExperienceYears = formProps.experience.reduce((acc, exp) => {
        const fromYear = new Date(exp.from).getFullYear()
        const toYear = exp.to ? new Date(exp.to).getFullYear() : new Date().getFullYear()
        return acc + (toYear - fromYear)
    }, 0)

    const toggleSection = (section: string) => {
        setExpandedSection(expandedSection === section ? null : section)
    }

    return (
        <ThemeProvider theme={currentTheme}>
            <Box sx={{
                minHeight: '100vh',
                backgroundColor: currentTheme.palette.background.default,
                color: currentTheme.palette.text.primary,
                padding: 4,
            }}>
                {/* Theme Toggle Button */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <Tooltip title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
                        <IconButton onClick={toggleTheme} color="primary">
                            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                    </Tooltip>
                </Box>

                {/* Profile Section */}
<Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
    <Avatar
        alt={formProps.userInfo.name}
        src={typeof formProps.profileImage === 'string' ? formProps.profileImage : formProps.profileImage.src}
        sx={{ width: 120, height: 120, margin: 'auto', mb: 2 }}
    />
    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
        {formProps.userInfo.name}
    </Typography>
    <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 2, color: 'text.secondary' }}>
        {formProps.userInfo.title}
    </Typography>
    <Box sx={{ textAlign: 'left', display: 'inline-block', mt: 2 }}>
        {formProps.userInfo.bio.split('\n').map((line, index) => (
            <Typography key={index} variant="body1" sx={{ lineHeight: 1.75, mb: 1 }}>
                 {line}
            </Typography>
        ))}
    </Box>
</Container>

{/* Stats with Clickable Expandable Sections */}
<Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 4 }}>
    {[
        { label: 'Years of Experience', value: `${totalExperienceYears}+` },
        { label: 'Skills', value: formProps.techStack.length },
        { label: 'Projects', value: `${formProps.projects.length}+` }
    ].map(({ label, value }) => (
        <Card 
            key={label} 
            sx={{
                width: 150, 
                textAlign: 'center', 
                backgroundColor: currentTheme.palette.background.paper, 
                cursor: 'pointer',
                padding: 2,
                borderRadius: '16px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'scale(1.05)',
                },
            }}
            onClick={() => toggleSection(label)}
        >
            <CardContent>
                <Typography variant="h5" color="primary">{value}</Typography>
                <Typography variant="body2">{label}</Typography>
            </CardContent>
        </Card>
    ))}
</Box>

                {/* Expanded Sections */}
{/* Expanded Sections */}
{expandedSection === 'Years of Experience' && (
    <Card sx={{ mt: 2, p: 3, backgroundColor: currentTheme.palette.background.paper, borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
            <Typography variant="h5" gutterBottom>Experience</Typography>
            {formProps.experience.map((exp, i) => (
                <Box key={i} sx={{ mb: 3, p: 2, backgroundColor: '#f8f8f8', borderRadius: '10px' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {exp.position}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        🏢 {exp.company}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#888888', mb: 1 }}>
                        📅 {exp.from} - {exp.to || 'Present'}
                    </Typography>
                    
                    <Box component="ul" sx={{ pl: 2 }}>
                        {exp.keySkills.map((skill, index) => (
                            <Chip key={index} label={skill} sx={{ m: 0.5 }} />
                        ))}
                    </Box>
                </Box>
            ))}
        </CardContent>
    </Card>
)}

                {expandedSection === 'Skills' && (
                    <Card sx={{ mt: 2, p: 3, backgroundColor: currentTheme.palette.background.paper }}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>Skills</Typography>
                            {formProps.techStack.map((tech, i) => (
                                <Chip key={i} label={`${tech.language} (${tech.year} yrs)`} sx={{ m: 1 }} />
                            ))}
                        </CardContent>
                    </Card>
                )}

                {expandedSection === 'Projects' && (
                    <Card sx={{ mt: 2, p: 3, backgroundColor: currentTheme.palette.background.paper }}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>Projects</Typography>
                            {formProps.projects.map((project, i) => (
                                <Typography key={i} variant="body1">
                                    <Link href={project.link} target="_blank">{project.name}</Link>
                                </Typography>
                            ))}
                        </CardContent>
                    </Card>
                )}

                {/* Contact */}
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="h5">Contact</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2 }}>
                        {formProps.contact.map((contact, i) => (
                            <Tooltip key={i} title={contact.link}>
                                <IconButton component={Link} href={contact.link} target="_blank" color="primary">
                                    {contact.icon}
                                </IconButton>
                            </Tooltip>
                        ))}
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default PortfolioDisplay