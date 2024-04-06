import React from 'react'
import { Box, TextField, Checkbox, FormControlLabel } from '@mui/material'
import { FormValues, UserInfo } from '@/app/state/initialState'

interface UserInfoFormProps {
    formValues: FormValues
    setFormValues: React.Dispatch<React.SetStateAction<FormValues>>
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({
    formValues,
    setFormValues,
}) => {
    const handleUserInfoChange = (key: keyof UserInfo, value: any) => {
        setFormValues((prevState) => ({
            ...prevState,
            userInfo: {
                ...prevState.userInfo,
                [key]: value,
            },
        }))
    }
    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormValues((prevState) => ({
            ...prevState,
            isUseUserInfo: event.target.checked,
        }))
    }

    return (
        <Box
            sx={{ margin: '10px 0', padding: '10px', border: '1px solid #ccc' }}
        >
            <Box sx={{ margin: '10px 0' }}>
                <TextField
                    label="Name"
                    name="name"
                    value={formValues.userInfo.name}
                    fullWidth
                    onChange={(e) =>
                        handleUserInfoChange('name', e.target.value)
                    }
                />
            </Box>
            <Box sx={{ margin: '10px 0' }}>
                <TextField
                    label="Title"
                    name="title"
                    value={formValues.userInfo.title}
                    fullWidth
                    onChange={(e) =>
                        handleUserInfoChange('title', e.target.value)
                    }
                />
            </Box>
            <Box sx={{ margin: '10px 0' }}>
                <TextField
                    label="Bio"
                    name="bio"
                    value={formValues.userInfo.bio}
                    fullWidth
                    multiline
                    rows={4} // Set the number of rows
                    onChange={(e) =>
                        handleUserInfoChange('bio', e.target.value)
                    }
                />
            </Box>
            <Box sx={{ margin: '10px 0' }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={formValues.isUseUserInfo}
                            onChange={handleCheckboxChange}
                        />
                    }
                    label="Apply this information to the footer"
                />
            </Box>
        </Box>
    )
}

export default UserInfoForm
