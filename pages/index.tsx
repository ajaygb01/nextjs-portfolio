'use client'

import React, { useState } from 'react'
import { Box, IconButton, CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { motion } from 'framer-motion'
import { Analytics } from '@vercel/analytics/next'

// Import newly created components
import HeroSection from '@/app/component/modern-portfolio/heroSection'
import SkillsDisplay from '@/app/component/modern-portfolio/skillsDisplay'
import ExperienceTimeline from '@/app/component/modern-portfolio/experienceTimeline'
import ProjectsGrid from '@/app/component/modern-portfolio/projectsGrid'
import LocalBusinessWebAppSection from '@/app/component/modern-portfolio/LocalBusinessWebAppSection'
import ContactBar from '@/app/component/modern-portfolio/contactBar'
import Footer from '@/app/component/modern-portfolio/footer'

// Imports for formValues data (icons, profileImage, FormValues type)
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import ChatIcon from '@mui/icons-material/WhatsApp' // Already imported as ChatIcon
import EmailIcon from '@mui/icons-material/Email'
import profileImage from '@/public/static/me.jpg'
import { FormValues } from '@/app/state/initialState'

// Copied formValues object
export const formValues: FormValues = {
    userInfo: {
        name: 'Ajay GB',
        title: 'Software Engineer',
        bio: `> MERN stack & full-stack development
> CI/CD pipelines & Microsoft Azure Cloud deployments
> Passionate about microservices architecture / distributed architecture
> Committed to continuous learning & collaboration `,
    },
    isTechStack: true,
    techStack: [
        { language: 'Java', year: 3 },
        { language: 'Python', year: 4 },
        { language: 'Angular', year: 2 },
        { language: 'TypeScript', year: 2 },
        { language: 'React', year: 3 },
        { language: 'Node.js', year: 3 },
        { language: 'CI/CD Pipelines', year: 3 },
        { language: 'Azure Cloud', year: 3 },
        { language: 'SpringBoot', year: 2 },
        { language: 'Unix', year: 5 },
        { language: 'Aws Cloud', year: 2 },
    ],
    isExperience: true,
    experience: [
        {
            from: '2021-Feb',
            to: '', // Present
            company: 'Lithia / Pfaff Motors Inc',
            location: 'Toronto',
            position: 'Software Developer',
            keySkills: [
                'Python',
                'React',
                'CI/CD',
                'ExpressJs',
                'MySql',
                'Azure Cloud/Devops',
            ],
        },
        {
            from: '2019-May',
            to: '2021-Feb',
            company: 'Insyght AI',
            location: 'Toronto, ON',
            position: 'Intern + Full Stack Developer',
            keySkills: ['Python', '.Net', 'Angular', 'Springboot', 'REST APIs'],
        },
        {
            from: '2016-Jan',
            to: '2018-Feb',
            company: 'Infosys Limited',
            location: 'Chennai, India',
            position: 'Intern + Systems Engineer',
            keySkills: ['Java', 'Spring Boot', 'Microservices', 'Unix'],
        },
    ],
    isContact: true,
    contact: [
        {
            app: 'LinkedIn',
            icon: <LinkedInIcon />,
            link: 'https://www.linkedin.com/in/ajay-vigneshwar-gb-b3b665179/',
        },
        {
            app: 'Whatsapp', // Corrected to 'Whatsapp' to match find condition
            icon: <ChatIcon />,
            link: 'https://wa.me/+12269758056',
        },
        { app: 'Email', icon: <EmailIcon />, link: 'mailto:ajaygb7@gmail.com' },
    ],
    isProject: true,
    projects: [
        {
            name: 'MediDash',
            description:
                'A comprehensive medical dashboard built using Next.js and Material-UI, featuring patient management, medical records, lab results, and appointment scheduling.',
            link: '/medical',
            public: false,
        },
        {
            name: 'Portfolio Website',
            description:
                'Built using Next.js and Material-UI / Randomize user info',
            link: '/portfolio',
            public: false,
        },
        {
            name: 'Loan Calculator App',
            description:
                'Built using Next.js, Material-UI, Chart.js / Calculate loan amortization',
            link: '/snow',
            public: false,
        },
        {
            name: 'Pdf Tool',
            description:
                'Built using Next.js, Material-UI, pdf-lib / Merge, split, and edit PDF files',
            link: 'https://pdflab.app',
            public: true,
        },
    ],
    isUseUserInfo: true,
    isBadge: false,
    profileImage: profileImage?.src || '/static/default-avatar.png',
    footer: { year: new Date().getFullYear(), companyName: 'Ajay GB' },
}

// Define light and dark themes
const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: { main: '#1976d2' },
        secondary: { main: '#dc004e' },
        background: { default: '#f4f6f8', paper: '#ffffff' },
        text: { primary: '#333333' },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontWeight: 700 },
        h2: { fontWeight: 600 },
        h3: { fontWeight: 600 },
        h4: { fontWeight: 500 },
    },
})

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: { main: '#90caf9' },
        secondary: { main: '#f48fb1' },
        background: { default: '#121212', paper: '#1e1e1e' },
        text: { primary: '#ffffff' },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontWeight: 700 },
        h2: { fontWeight: 600 },
        h3: { fontWeight: 600 },
        h4: { fontWeight: 500 },
    },
})

const sectionAnimation = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: 'easeOut' },
}

export default function IndexPage() { // Renamed component to IndexPage
    const [darkMode, setDarkMode] = useState(true)

    const toggleTheme = () => {
        setDarkMode(!darkMode)
    }

    const currentTheme = darkMode ? darkTheme : lightTheme

    const handleScrollTo = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const onSeeProjectsClick = () => handleScrollTo('projects-section')
    
    const whatsappEntry = formValues.contact.find(c => c.app === 'Whatsapp');
    const whatsappLink = whatsappEntry?.link;

    const handleGetStartedClick = () => {
        if (whatsappLink) {
            window.open(whatsappLink, '_blank');
        } else {
            console.warn('WhatsApp contact link not found. Fallback: scrolling to contact section.');
            handleScrollTo('contact-section'); 
        }
    };
    
    const onContactMeClickHero = () => handleScrollTo('contact-section');


    return (
        <ThemeProvider theme={currentTheme}>
            <Analytics />
            <CssBaseline />
            <Box
                sx={{
                    minHeight: '100vh',
                    backgroundColor: currentTheme.palette.background.default,
                    color: currentTheme.palette.text.primary,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <IconButton
                    onClick={toggleTheme}
                    color="inherit"
                    sx={{
                        position: 'fixed',
                        top: 16,
                        right: 16,
                        zIndex: 1300,
                        backgroundColor: currentTheme.palette.background.paper,
                        '&:hover': {
                            backgroundColor: currentTheme.palette.action.hover,
                        },
                    }}
                >
                    {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>

                <motion.div {...sectionAnimation}>
                    <HeroSection
                        name={formValues.userInfo.name}
                        title={formValues.userInfo.title}
                        bio={formValues.userInfo.bio}
                        profileImage={formValues.profileImage as string}
                        onSeeProjectsClick={onSeeProjectsClick}
                        onContactMeClick={onContactMeClickHero} 
                    />
                </motion.div>

                {formValues.isTechStack && formValues.techStack.length > 0 && (
                    <motion.div {...sectionAnimation}>
                        <SkillsDisplay techStack={formValues.techStack} />
                    </motion.div>
                )}

                {formValues.isExperience &&
                    formValues.experience.length > 0 && (
                        <motion.div {...sectionAnimation}>
                            <ExperienceTimeline
                                experience={formValues.experience}
                            />
                        </motion.div>
                    )}

                {formValues.isProject && formValues.projects.length > 0 && (
                    <motion.div {...sectionAnimation} id="projects-section">
                        <ProjectsGrid projects={formValues.projects} />
                    </motion.div>
                )}

                <motion.div {...sectionAnimation}>
                    <LocalBusinessWebAppSection
                        currentTheme={currentTheme}
                        onGetStartedClick={handleGetStartedClick} 
                    />
                </motion.div>

                {formValues.isContact && formValues.contact.length > 0 && (
                    <motion.div {...sectionAnimation} id="contact-section">
                        <ContactBar contact={formValues.contact} />
                    </motion.div>
                )}
                <Footer footer={formValues.footer} />
            </Box>
        </ThemeProvider>
    )
}
