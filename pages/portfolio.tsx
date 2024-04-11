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
    Dialog,
    DialogTitle,
    DialogContent,
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
import ContactForm from '@/app/component/contact/contactForm'
import ProjectForm from '@/app/component/projects/projectsForm'
import Badge from '@/app/component/badge/badge'
import Avatar from '@mui/material/Avatar'

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
    const [isModal, setIsModal] = useState(true)
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

    const [formValues, setFormValues] = useState<FormValues>(initialFormValues)

    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setIsModal(false)
        setOpen(false)
    }

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

    const handleFileChange = (event: any) => {
        const file = event.target.files[0]
        const reader = new FileReader()
        reader.onloadend = () => {
            setFormValues((prevState) => ({
                ...prevState,
                profileImage: reader.result ? reader.result.toString() : '',
            }))
        }
        reader.readAsDataURL(file)
    }

    return (
        <Box>
            <Toolbar sx={styles.toolbar}>
                <Button variant="contained" onClick={handleOpenModal}>
                    Clear Form
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
                                        handleChange={handleChange}
                                    />
                                </Box>
                            )}

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formValues.isContact}
                                        onChange={(e) =>
                                            handleChange(
                                                'isContact',
                                                e.target.checked
                                            )
                                        }
                                    />
                                }
                                label="Contact"
                            />

                            {formValues.isContact && (
                                <Box sx={styles.formStack}>
                                    <ContactForm handleChange={handleChange} />
                                </Box>
                            )}

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formValues.isProject}
                                        onChange={(e) =>
                                            handleChange(
                                                'isProject',
                                                e.target.checked
                                            )
                                        }
                                    />
                                }
                                label="Projects"
                            />

                            {formValues.isProject && (
                                <Box sx={styles.formStack}>
                                    <ProjectForm handleChange={handleChange} />
                                </Box>
                            )}

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formValues.isBadge}
                                        onChange={(e) =>
                                            setFormValues((prevState) => ({
                                                ...prevState,
                                                isBadge: e.target.checked,
                                                profileImage: e.target.checked
                                                    ? prevState.profileImage
                                                    : '',
                                            }))
                                        }
                                    />
                                }
                                label="View Badge"
                            />
                            {formValues.isBadge && (
                                <>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                    />
                                    <Avatar src={formValues.profileImage} />
                                </>
                            )}

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={handleClickOpen}
                            >
                                {formValues.isBadge
                                    ? 'View Badge'
                                    : 'View Resume'}
                            </Button>

                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>
                                    {formValues.isBadge
                                        ? 'Your Badge'
                                        : 'Your Resume'}
                                </DialogTitle>
                                <DialogContent>
                                    <Badge formProps={formValues} />
                                </DialogContent>
                            </Dialog>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={styles.displayBlock}>
                        <PortfolioDisplay
                            formProps={formValues}
                            height={90}
                            isModal={isModal}
                            handleClose={handleClose}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Portfilo
