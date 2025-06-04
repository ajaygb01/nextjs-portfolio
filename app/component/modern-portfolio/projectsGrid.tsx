// @ts-nocheck
'use client'
import React from 'react'
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    Chip,
    Link as MuiLink, // Renaming to avoid conflict with Next.js Link if used elsewhere
} from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'; // For the link button

interface ProjectItem {
    name: string
    description: string
    link: string
    public: boolean
}

interface ProjectsGridProps {
    projects: ProjectItem[]
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects }) => {
    return (
        <Box sx={{ paddingY: 4, paddingX: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', marginBottom: 4 }}>
                Projects
            </Typography>
            <Grid container spacing={3}>
                {projects.map((project, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}> {/* Responsive grid settings */}
                        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" component="div" gutterBottom>
                                    {project.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {project.description}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ padding: 2, justifyContent: 'space-between' }}>
                                {project.link && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        startIcon={<OpenInNewIcon />}
                                        size="small"
                                    >
                                        View Project
                                    </Button>
                                )}
                                {project.public && (
                                    <Chip label="Live" color="success" size="small" />
                                )}
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default ProjectsGrid
