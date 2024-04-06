import React from 'react'
import { TextField, Box, IconButton } from '@mui/material'
import { Add, Delete } from '@mui/icons-material'
import { TechStack, FormValues } from '@/app/state/initialState'

interface TechStackFormProps {
    formValues: FormValues
    setFormValues: React.Dispatch<React.SetStateAction<FormValues>>
}

const TechStackForm: React.FC<TechStackFormProps> = ({
    formValues,
    setFormValues,
}) => {
    const handleTechStackChange = (
        index: number,
        key: keyof TechStack,
        value: any
    ) => {
        const updatedArray = [...formValues.techStack]
        updatedArray[index] = { ...updatedArray[index], [key]: value }
        setFormValues((prevState) => ({
            ...prevState,
            techStack: updatedArray,
        }))
    }

    const handleAddTechStack = () => {
        setFormValues({
            ...formValues,
            techStack: [...formValues.techStack, { language: '', year: 0 }],
        })
    }

    const handleRemoveTechStack = (index: number) => {
        const newTechStack = [...formValues.techStack]
        newTechStack.splice(index, 1)
        setFormValues({
            ...formValues,
            techStack: newTechStack,
        })
    }

    return (
        <>
            {formValues.techStack.map((stack, index) => (
                <Box key={index} sx={{ margin: '10px 0' }}>
                    <TextField
                        label="Language"
                        value={stack.language}
                        fullWidth
                        onChange={(e) =>
                            handleTechStackChange(
                                index,
                                'language',
                                e.target.value
                            )
                        }
                    />
                    <TextField
                        label="Year"
                        type="number"
                        value={stack.year}
                        sx={{ mt: 1 }}
                        fullWidth
                        onChange={(e) =>
                            handleTechStackChange(
                                index,
                                'year',
                                parseInt(e.target.value)
                            )
                        }
                    />
                    <IconButton onClick={() => handleRemoveTechStack(index)}>
                        <Delete />
                    </IconButton>
                </Box>
            ))}
            <IconButton onClick={handleAddTechStack}>
                <Add />
            </IconButton>
        </>
    )
}

export default TechStackForm
