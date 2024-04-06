import React, { useState, useEffect } from 'react'
import { TextField, Box, Button } from '@mui/material'
import {
    Project,
    FormValues,
    initialFormValues,
} from '@/app/state/initialState'

import IconButton from '@mui/material/IconButton'
import { Delete, Add } from '@mui/icons-material'

interface ProjectFormProps {
    handleChange: (key: keyof FormValues, value: any) => void
}

const ProjectForm: React.FC<ProjectFormProps> = ({ handleChange }) => {
    const [projects, setProjects] = useState<Project[]>([
        initialFormValues.projects[0],
    ])
    const data = [
        {
            name: '',
            description: '',
            link: '',
        },
    ]
    useEffect(() => {
        setProjects(data)
    }, [])

    const handleProjectChange = (
        index: number,
        key: keyof Project,
        value: string
    ) => {
        const newProjects = [...projects]
        newProjects[index][key] = value
        setProjects(newProjects)
        handleChange('projects', newProjects)
    }

    const handleClear = () => {
        const clearedProjects = projects.map((project) => ({
            ...project,
            name: '',
            description: '',
            link: '',
        }))
        setProjects(clearedProjects)
        handleChange('projects', clearedProjects)
    }
    const handleAddProject = () => {
        setProjects([
            ...projects,
            {
                name: '',
                description: '',
                link: '',
            },
        ])
    }

    return (
        <Box sx={{ margin: '10px 0' }}>
            {projects.map((item, index) => (
                <React.Fragment key={index}>
                    <TextField
                        label="Project Name"
                        value={item.name}
                        sx={{ mt: 1 }}
                        fullWidth
                        onChange={(e) =>
                            handleProjectChange(index, 'name', e.target.value)
                        }
                    />
                    <TextField
                        label="Project Description"
                        value={item.description}
                        sx={{ mt: 1 }}
                        fullWidth
                        onChange={(e) =>
                            handleProjectChange(
                                index,
                                'description',
                                e.target.value
                            )
                        }
                    />
                    <TextField
                        label="Project Link"
                        value={item.link}
                        sx={{ mt: 1 }}
                        fullWidth
                        onChange={(e) =>
                            handleProjectChange(index, 'link', e.target.value)
                        }
                    />
                </React.Fragment>
            ))}
            <IconButton onClick={handleAddProject}>
                <Add />
            </IconButton>
            <IconButton onClick={handleClear}>
                <Delete />
            </IconButton>
        </Box>
    )
}

export default ProjectForm
