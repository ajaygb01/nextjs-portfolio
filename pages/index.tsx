'use client'
import React from 'react'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import ChatIcon from '@mui/icons-material/WhatsApp'
import EmailIcon from '@mui/icons-material/Email'
import PortfolioDisplay from '@/app/component/portfolio/portfolioDisplay'
import profileImage from '@/public/static/me.jpg'

import { FormValues } from '@/app/state/initialState'

const formValues: FormValues = {
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
            to: '',
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
            app: 'Whatsapp',
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
        },
        {
            name: 'Portfolio Website',
            description:
                'Built using Next.js and Material-UI / Randomize user info',
            link: '/portfolio',
        },
        {
            name: 'Loan Calculator App',
            description:
                'Built using Next.js, Material-UI, Chart.js / Calculate loan amortization',
            link: '/snow',
        },
    ],
    isUseUserInfo: true,
    isBadge: false,
    profileImage: profileImage.src, // Convert to string URL
    footer: { year: new Date().getFullYear(), companyName: 'Ajay GB' },
}

export default function Index() {
    return <PortfolioDisplay formProps={formValues} />
}
