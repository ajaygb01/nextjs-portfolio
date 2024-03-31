import { createTheme, ThemeProvider } from '@mui/material/styles'
import TechStackIcon from '@mui/icons-material/Code' // Import the icons you want to use
import ExperienceIcon from '@mui/icons-material/BusinessCenter'
import ContactIcon from '@mui/icons-material/Contacts'
import AboutIcon from '@mui/icons-material/Info'
import ProjectsIcon from '@mui/icons-material/Work'
import { FormValues } from './initialState'

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#f1daff', // purple
        },
        secondary: { main: '#ffe8a3' },
        text: {
            primary: '#000000', // black text for light theme
        },
        success: {
            main: '#bdf6ce', // green
        },
        info: {
            main: '#c87fff', // purple
        },
        // Add your light theme colors here
    },
})

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#000000', // dark grey for dark theme
        },
        secondary: {
            main: '#121212', // white for dark theme
        },
        text: {
            primary: '#ffffff', // white text for dark theme
        },
        success: {
            main: '#3c3c3c', // green
        },
        info: {
            main: '#121212', // blue
        },
        // Add your dark theme colors here
    },
})

export const icons = {
    techstack: <TechStackIcon />,
    experience: <ExperienceIcon />,
    contact: <ContactIcon />,
    // about: <AboutIcon />,
    projects: <ProjectsIcon />,
}

export const getIcons = (formProps: FormValues) => {
    const iconsObj = {
        techstack: formProps.isTechStack ? icons.techstack : null,
        experience: formProps.isExperience ? icons.experience : null,
        contact: formProps.isContact ? icons.contact : null,
        // about: formProps.isAbout ? icons.about : null,
        projects: formProps.isProject ? icons.projects : null,
    }
    return Object.entries(iconsObj)
        .filter(([key, value]) => value !== null)
        .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})
}
