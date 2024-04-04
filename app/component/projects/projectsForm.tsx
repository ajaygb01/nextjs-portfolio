import React, { useState, useEffect } from 'react'
import { TextField, Box, Button } from '@mui/material'
import {
    Project,
    FormValues,
    initialFormValues,
} from '@/app/state/initialState'

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

    return (
        <Box sx={{ margin: '10px 0' }}>
            {projects.map((item, index) => (
                <>
                    <TextField
                        key={`${index}-name`}
                        label="Project Name"
                        value={item.name}
                        sx={{ margin: 1 }}
                        onChange={(e) =>
                            handleProjectChange(index, 'name', e.target.value)
                        }
                    />
                    <TextField
                        key={`${index}-description`}
                        label="Project Description"
                        value={item.description}
                        sx={{ margin: 1 }}
                        onChange={(e) =>
                            handleProjectChange(
                                index,
                                'description',
                                e.target.value
                            )
                        }
                    />
                    <TextField
                        key={`${index}-link`}
                        label="Project Link"
                        value={item.link}
                        sx={{ margin: 1 }}
                        onChange={(e) =>
                            handleProjectChange(index, 'link', e.target.value)
                        }
                    />
                </>
            ))}
            <Button onClick={handleClear}>Clear</Button>
        </Box>
    )
}

export default ProjectForm
