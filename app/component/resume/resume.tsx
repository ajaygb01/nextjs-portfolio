import React from 'react'
import { FormValues } from '../../state/initialState'
import { Box, Typography } from '@mui/material'

interface ResumeProps {
    formProps: FormValues
}

class ResumeComponent extends React.Component<ResumeProps> {
    constructor(props: ResumeProps) {
        super(props)
    }

    render() {
        const {
            userInfo,
            isTechStack,
            isProject,
            isExperience,
            techStack,
            experience,
            projects,
            contact,
        } = this.props.formProps

        return (
            <div>
                <h1>{userInfo.name}</h1>
                <h2>{userInfo.title}</h2>
                {isTechStack ? (
                    <>
                        <h3>Tech Stack</h3>
                        {techStack.map((tech, index) => (
                            <p key={index}>{tech.language}</p>
                        ))}
                    </>
                ) : null}
                <h3>Experience</h3>
                {experience.map((exp, index) => (
                    <Box key={index} sx={{ marginBottom: 2 }}>
                        <Typography variant="h6">{exp.position}</Typography>
                        <Typography variant="subtitle1">
                            {exp.company}
                        </Typography>
                        <Typography variant="body2">
                            {exp.from} - {exp.to}
                        </Typography>
                        <Typography variant="body1">
                            {exp.keySkills.join(', ')}
                        </Typography>
                    </Box>
                ))}
                <h3>Projects</h3>
                {projects.map((project, index) => (
                    <Box key={index} sx={{ marginBottom: 2 }}>
                        <Typography variant="h6">{project.name}</Typography>
                        <Typography variant="subtitle1">
                            {project.description}
                        </Typography>
                    </Box>
                ))}
                {contact.map((contactInfo, index) => {
                    if (contactInfo.app === 'email') {
                        return (
                            <Typography key={index} variant="body1">
                                Email: {contactInfo.link}
                            </Typography>
                        )
                    }
                    return null
                })}
            </div>
        )
    }
}

export default ResumeComponent
