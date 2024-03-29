'use client'
import React, { useState } from 'react'
import {
    Button,
    Toolbar,
    Modal,
    TextField,
    FormControlLabel,
    Checkbox,
    Typography,
    Box,
    Grid,
    IconButton,
    Autocomplete,
    Container,
} from '@mui/material'
import {
    Contact,
    Experience,
    FormValues,
    Project,
    TechStack,
    initialFormValues,
} from '@/app/state/initialState'
import TechStackForm from '@/app/component/techStack/techStackForm'
import ExperienceForm from '@/app/component/experience/experienceForm'
import UserInfoForm from '@/app/component/userInfo/userInfoForm'
import PortfolioDisplay from '@/app/component/portfolio/portfolioDisplay'

interface UserInfo {
    name: string
    email: string
    phone: string
    // Add other fields as needed
}

const styles = {
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    header: {
        width: '100%',
        alignItems: 'center',
    },
    outerform: {
        maxWidth: 1200,
        margin: 'auto',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    formStack: {
        margin: '10px 0',
        padding: '10px',
        border: '1px solid #ccc',
    },
    displayBlock: {
        overflow: 'auto',
        margin: '0 auto',
        border: '1px solid #000',
        borderRadius: 2,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    },
}

const Portfilo: React.FC = () => {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

    const [formValues, setFormValues] = useState<FormValues>(initialFormValues)

    const handleOpenModal = () => {
        setFormValues(initialFormValues)
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setOpenModal(false)
    }

    const fetchRandomUserInfo = async () => {
        try {
            const response = await fetch('https://randomuser.me/api/')
            const data = await response.json()
            const user = data.results[0]

            const updatedFormValues = {
                ...formValues,
                userInfo: {
                    ...formValues.userInfo,
                    name: `${user.name.first} ${user.name.last}`,
                    title: 'Software Developer',
                    bio: `Random text for bio ${user.email} 
                  ${user.phone} ${user.cell}
                  ${user.location.city} ${user.location.country}
                  ${user.location.postcode} ${user.location.state}
                  ${user.location.street.name} ${user.location.street.number} 
                  ${user.location.timezone.description}`,
                },
            }

            setFormValues(updatedFormValues)
        } catch (error) {
            console.error('Error fetching user info:', error)
        }
    }

    const handleProjectChange = (
        index: number,
        key: keyof Project,
        value: any
    ) => {
        const updatedArray = [...formValues.projects]
        updatedArray[index] = { ...updatedArray[index], [key]: value }
        handleChange('projects', updatedArray)
    }

    const handleCheckboxChange =
        (key: keyof FormValues) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(key, event.target.checked)
        }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log('Form values:', formValues)
        // Perform form submission or further processing here
    }

    const handleChange = (key: keyof FormValues, value: any) => {
        setFormValues((prevState) => ({
            ...prevState,
            [key]: value,
        }))
    }

    const handleExperienceChange = (
        index: number,
        key: keyof Experience,
        value: any
    ) => {
        const updatedArray = [...formValues.experience]
        updatedArray[index] = { ...updatedArray[index], [key]: value }
        handleChange('experience', updatedArray)
    }

    return (
        <Box>
            <Toolbar sx={styles.toolbar}>
                <Button variant="contained" onClick={handleOpenModal}>
                    Enter Portfolio Info
                </Button>
                <Button variant="contained" onClick={fetchRandomUserInfo}>
                    Fetch Random User Info
                </Button>
            </Toolbar>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Box>
                        <Box sx={[styles.header, styles.toolbar]}>
                            <Typography variant="h6" gutterBottom>
                                Portfolio Writer
                            </Typography>
                        </Box>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            sx={styles.outerform}
                        >
                            <UserInfoForm
                                formValues={formValues}
                                setFormValues={setFormValues}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formValues.isTechStack}
                                        onChange={(e) =>
                                            handleChange(
                                                'isTechStack',
                                                e.target.checked
                                            )
                                        }
                                    />
                                }
                                label="Tech Stack"
                            />

                            {formValues.isTechStack && (
                                <Box sx={styles.formStack}>
                                    <TechStackForm
                                        formValues={formValues}
                                        setFormValues={setFormValues}
                                    />
                                </Box>
                            )}

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formValues.isExperience}
                                        onChange={(e) =>
                                            handleChange(
                                                'isExperience',
                                                e.target.checked
                                            )
                                        }
                                    />
                                }
                                label="Experience"
                            />
                            {formValues.isExperience && (
                                <Box sx={styles.formStack}>
                                    <ExperienceForm
                                        onExperienceChange={
                                            handleExperienceChange
                                        }
                                        handleChange={handleChange}
                                        handleExperienceChange={
                                            handleExperienceChange
                                        }
                                    />
                                </Box>
                            )}
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={styles.displayBlock}>
                        <PortfolioDisplay formProps={formValues} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Portfilo
