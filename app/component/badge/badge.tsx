import React from 'react'
import { FormValues } from '@/app/state/initialState'
import { Box, Typography, Avatar, Button } from '@mui/material'
import { Experience, Project, TechStack } from '@/app/state/initialState'
import ResumeComponent from '../resume/resume'

interface BadgeProps {
    formProps: FormValues
}

const Badge: React.FC<BadgeProps> = ({ formProps }) => {
    const {
        userInfo,
        techStack,
        experience,
        projects,
        contact,
        isBadge,
        profileImage,
    } = formProps

    return (
        <div>
            {' '}
            {/* Wrap the conditional rendering in a div */}
            {isBadge ? (
                <Box
                    sx={{
                        width: 400,
                        padding: 2,
                        border: '2px solid #ccc',
                        borderRadius: 1,
                        bgcolor: '#f9f9f9',
                        fontFamily: 'Arial, sans-serif',
                        color: '#333',
                    }}
                >
                    <Typography variant="h4">{userInfo.name}</Typography>
                    <Typography variant="subtitle1">
                        {userInfo.title}
                    </Typography>
                    <Avatar
                        src={profileImage} // Use profileImage directly
                        sx={{
                            width: 100,
                            height: 100,
                            borderRadius: '50%',
                            marginBottom: 2,
                        }}
                    />
                    <Box sx={{ marginBottom: 2 }}>
                        {techStack.map((tech: TechStack, index: number) => (
                            <img
                                key={index}
                                src={tech.language}
                                alt={tech.language}
                            />
                        ))}
                    </Box>
                    <Typography variant="h5">Experience</Typography>
                    <ul>
                        {experience.map(
                            (experience: Experience, index: number) => (
                                <li key={index}>{experience.company}</li>
                            )
                        )}
                    </ul>
                    <Typography variant="h5">Projects</Typography>
                    <ul>
                        {projects.map((project: Project, index: number) => (
                            <li key={index}>{project.name}</li>
                        ))}
                    </ul>
                    <Typography variant="body1">
                        Contact:{' '}
                        {contact.map((contactInfo, index) => {
                            if (contactInfo.app === 'email') {
                                return (
                                    <span key={index}>
                                        Email: {contactInfo.link}
                                    </span>
                                )
                            }
                            return null
                        })}
                    </Typography>
                    <Button id="shareButton">Share as Image</Button>
                </Box>
            ) : (
                <ResumeComponent formProps={formProps} />
            )}
        </div>
    )
}

export default Badge
