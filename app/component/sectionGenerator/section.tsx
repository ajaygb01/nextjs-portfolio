import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import {
    Contact,
    Experience,
    FormValues,
    Project,
    TechStack,
} from '@/app/state/initialState'

const renderTechStack = (techStack: TechStack[], theme: any) => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
        }}
    >
        {techStack.map((tech, index) => (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderSpacing: 3,
                    color: theme.palette.text.primary,
                    borderBottom:
                        index !== techStack.length - 1
                            ? '0.01px solid grey'
                            : 'none',
                }}
                key={tech.language}
            >
                <Typography component="div">{tech.language}</Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: 'auto',
                        minWidth: '50px',
                    }}
                >
                    <Typography component="div">{tech.year}</Typography>
                    <Typography component="div">-Years</Typography>
                </Box>
            </Box>
        ))}
    </Box>
)

const renderExperience = (experience: Experience[], theme: any) => (
    <>
        {experience.map((exp) => {
            const fromDate = new Date(exp.from)
            const toDate = exp.to === 'Present' ? new Date() : new Date(exp.to)

            const diffInMonths =
                toDate.getMonth() -
                fromDate.getMonth() +
                12 * (toDate.getFullYear() - fromDate.getFullYear())

            const years = Math.floor(diffInMonths / 12)
            const months = diffInMonths % 12

            return (
                <Card
                    key={exp.from}
                    sx={{
                        borderRadius: 1,
                        boxShadow: 'none',
                        marginBottom: 2,
                        backgroundColor: theme.palette.success.main,
                    }}
                >
                    <CardContent>
                        <Typography variant="h6" component="div">
                            {exp.position}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            component="div"
                            color="textSecondary"
                        >
                            {exp.company}
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="div"
                            >
                                {exp.from} to {exp.to}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="div"
                            >
                                {years} years {months} months
                            </Typography>
                        </Box>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="div"
                        >
                            {exp.location}
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                marginTop: 2,
                                '& > :not(style)': {
                                    margin: '4px',
                                },
                            }}
                        >
                            {exp.keySkills.map((skill) => (
                                <Chip
                                    sx={{
                                        backgroundColor:
                                            theme.palette.info.main,
                                    }}
                                    key={skill}
                                    label={skill}
                                />
                            ))}
                        </Box>
                    </CardContent>
                </Card>
            )
        })}
    </>
)

const renderContact = (contact: Contact[], theme: any) => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'space-around',
        }}
    >
        {contact.map((item, index) => (
            <IconButton
                key={index}
                href={item.link}
                sx={{
                    backgroundColor: theme.palette.success.main,
                    color: theme.palette.text.primary,
                }}
                target="_blank"
                rel="noopener noreferrer"
            >
                {item.icon}
            </IconButton>
        ))}
    </Box>
)

const renderProjects = (projects: Project[], theme: any) => (
    <Box>
        {projects.map((project, index) => (
            <Box
                key={index}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography variant="h6" component="div">
                        {project.name}
                    </Typography>
                    <Typography variant="body1" component="div">
                        {project.description}
                    </Typography>
                </Box>
                <Button
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                        alignItems: 'center',
                        backgroundColor: theme.palette.info.main,
                        '&:hover': {
                            backgroundColor: theme.palette.info.dark,
                        },
                    }}
                >
                    View Project
                </Button>
            </Box>
        ))}
    </Box>
)

export const getSectionContent = (formValues: FormValues, theme: any) => {
    return {
        techstack: formValues.isTechStack ? (
            renderTechStack(formValues.techStack, theme)
        ) : (
            <></>
        ),
        experience: formValues.isExperience ? (
            renderExperience(formValues.experience, theme)
        ) : (
            <></>
        ),
        contact: formValues.isContact ? (
            renderContact(formValues.contact, theme)
        ) : (
            <></>
        ),
        projects: formValues.isProject ? (
            renderProjects(formValues.projects, theme)
        ) : (
            <></>
        ),
    }
}
