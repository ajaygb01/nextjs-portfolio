import React from 'react'
import Image from 'next/image' // Import next/image
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
                        src={typeof profileImage === 'string' ? profileImage : profileImage.src} // Ensure profileImage is a string
                        sx={{
                            width: 100,
                            height: 100,
                            borderRadius: '50%',
                            marginBottom: 2,
                        }}
                    />
                    <Box sx={{ marginBottom: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}> {/* Added flex for layout */}
                        {techStack.map((tech: TechStack, index: number) => (
                            // Assuming tech.language was intended to be part of an image path or a placeholder
                            // For next/image, 'src' MUST be a valid image path or a remote URL.
                            // If tech.language is just "Java", "Python", this will still not render a real image
                            // unless those paths resolve to images (e.g., public/Java, public/Python).
                            // Using a placeholder size as none was specified.
                            <Image
                                key={index}
                                src={`/icons/${tech.language.toLowerCase()}.svg`} // Placeholder: Assumes SVG icons exist at this path
                                alt={`${tech.language} icon`}
                                width={24} // Placeholder width
                                height={24} // Placeholder height
                                style={{ marginRight: '4px' }} // Maintain some spacing if they were inline
                                onError={(e) => { 
                                  // Fallback or hide if image fails to load, to prevent broken image icons
                                  // For now, just log it. In a real app, you might set a default icon or hide it.
                                  console.warn(`Failed to load icon for ${tech.language}`);
                                  (e.target as HTMLImageElement).style.display = 'none'; 
                                }}
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
