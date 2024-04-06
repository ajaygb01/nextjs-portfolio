import React, { useState, useEffect } from 'react'
import { Box, TextField, IconButton, Autocomplete } from '@mui/material'
import { Delete, Add } from '@mui/icons-material'
import {
    Experience,
    FormValues,
    initialFormValues,
    techChips,
} from '@/app/state/initialState'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

interface ExperienceFormProps {
    handleChange: (key: keyof FormValues, value: any) => void
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ handleChange }) => {
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

    const handleExperienceChange = (
        index: number,
        key: keyof Experience,
        value: any
    ) => {
        setExperiences((prevExperiences) => {
            const newExperiences = [...prevExperiences]
            newExperiences[index] = { ...newExperiences[index], [key]: value }
            return newExperiences
        })
    }

    useEffect(() => {
        handleChange('experience', experiences)
    }, [experiences])

    return (
        <>
            {experiences.map((experience, index) => (
                <Box key={index} sx={{ margin: '10px 0' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            sx={{ mt: 1, width: '100%' }}
                            views={['year', 'month']}
                            label="From"
                            value={dayjs(experience.from || '2000-JAN')}
                            onChange={(newValue: any) =>
                                handleExperienceChange(
                                    index,
                                    'from',
                                    newValue
                                        ? dayjs(newValue).format('YYYY-MMM')
                                        : ''
                                )
                            }
                        />
                        <DatePicker
                            sx={{ mt: 1, width: '100%' }}
                            views={['year', 'month']}
                            label="To"
                            value={dayjs(experience.to || '2000-JAN')}
                            onChange={(newValue: any) =>
                                handleExperienceChange(
                                    index,
                                    'to',
                                    newValue
                                        ? dayjs(newValue).format('YYYY-MMM')
                                        : ''
                                )
                            }
                        />
                    </LocalizationProvider>
                    <TextField
                        sx={{ mt: 1 }}
                        label="Company"
                        value={experience.company}
                        onChange={(e) =>
                            handleExperienceChange(
                                index,
                                'company',
                                e.target.value
                            )
                        }
                        fullWidth
                    />
                    <TextField
                        sx={{ mt: 1 }}
                        label="Location"
                        value={experience.location}
                        onChange={(e) =>
                            handleExperienceChange(
                                index,
                                'location',
                                e.target.value
                            )
                        }
                        fullWidth
                    />
                    <TextField
                        sx={{ mt: 1 }}
                        label="Position"
                        value={experience.position}
                        onChange={(e) =>
                            handleExperienceChange(
                                index,
                                'position',
                                e.target.value
                            )
                        }
                        fullWidth
                    />

                    <Autocomplete
                        multiple
                        options={techChips}
                        value={experience.keySkills || []}
                        onChange={(event, newValue) =>
                            handleExperienceChange(index, 'keySkills', newValue)
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Key Skills"
                                sx={{ mt: 1 }}
                                fullWidth
                            />
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
        </>
    )
}

export default ExperienceForm
