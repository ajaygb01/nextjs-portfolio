import React, { useState } from 'react'
import { Box, TextField, IconButton, Autocomplete } from '@mui/material'
import { Delete, Add } from '@mui/icons-material'
import {
    Experience,
    FormValues,
    initialFormValues,
} from '@/app/state/initialState'
import { DatePicker } from '@mui/lab'

interface ExperienceFormProps {
    onExperienceChange: (
        index: number,
        key: keyof Experience,
        value: any
    ) => void
    handleChange: (key: keyof FormValues, value: any) => void
    handleExperienceChange: (
        index: number,
        key: keyof Experience,
        value: any
    ) => void
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({
    onExperienceChange,
    handleChange,
    handleExperienceChange,
}) => {
    const [experiences, setExperiences] = useState<Experience[]>([
        initialFormValues.experience[0],
    ])
    const [formValues, setFormValues] = useState<FormValues>(initialFormValues)

    const handleAddExperience = () => {
        setExperiences([...experiences, initialFormValues.experience[0]])
    }

    const handleRemoveExperience = (index: number) => {
        const newExperiences = [...experiences]
        newExperiences.splice(index, 1)
        setExperiences(newExperiences)
    }

    return (
        <form>
            {experiences.map((experience, index) => (
                <Box key={index} sx={{ margin: '10px 0' }}>
                    <DatePicker
                        sx={{ margin: 1 }}
                        views={['year', 'month']}
                        label="From"
                        value={experience.from}
                        onChange={(newValue: any) =>
                            handleExperienceChange(index, 'from', newValue)
                        }
                        renderInput={(params: any) => <TextField {...params} />}
                    />
                    <DatePicker
                        sx={{ margin: 1 }}
                        views={['year', 'month']}
                        label="To"
                        value={experience.to}
                        onChange={(newValue: any) =>
                            handleExperienceChange(index, 'to', newValue)
                        }
                        renderInput={(params: any) => <TextField {...params} />}
                    />
                    <TextField
                        sx={{ margin: 1 }}
                        label="Company"
                        value={experience.company}
                        onChange={(e) =>
                            handleExperienceChange(
                                index,
                                'company',
                                e.target.value
                            )
                        }
                    />
                    <TextField
                        sx={{ margin: 1 }}
                        label="Location"
                        value={experience.location}
                        onChange={(e) =>
                            handleExperienceChange(
                                index,
                                'location',
                                e.target.value
                            )
                        }
                    />
                    <TextField
                        sx={{ margin: 1 }}
                        label="Position"
                        value={experience.position}
                        onChange={(e) =>
                            handleExperienceChange(
                                index,
                                'position',
                                e.target.value
                            )
                        }
                    />
                    <Autocomplete
                        multiple
                        options={['Html', 'Java']}
                        value={experience.keySkills}
                        onChange={(event, newValue) =>
                            handleExperienceChange(index, 'keySkills', newValue)
                        }
                        renderInput={(params) => (
                            <TextField {...params} label="Key Skills" />
                        )}
                    />
                    <IconButton onClick={() => handleRemoveExperience(index)}>
                        <Delete />
                    </IconButton>
                </Box>
            ))}
            <IconButton onClick={handleAddExperience}>
                <Add />
            </IconButton>
        </form>
    )
}

export default ExperienceForm
