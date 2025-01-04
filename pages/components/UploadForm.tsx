import React, { useState } from 'react'
import { Button, Typography, Box } from '@mui/material'

const UploadForm: React.FC = () => {
    const [file, setFile] = useState<File | null>(null)
    const [message, setMessage] = useState<string>('')

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!file) {
            setMessage('Please select a file.')
            return
        }

        const formData = new FormData()
        formData.append('file', file)

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })

            if (response.ok) {
                setMessage('File uploaded successfully!')
            } else {
                setMessage('Failed to upload the file.')
            }
        } catch (error) {
            setMessage('An error occurred.')
        }
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ marginTop: '30px' }}
        >
            <Typography variant="subtitle1" gutterBottom>
                Select your tax file to upload:
            </Typography>
            <input type="file" onChange={handleFileChange} />
            <Button
                variant="contained"
                type="submit"
                sx={{ marginLeft: '10px' }}
            >
                Upload
            </Button>
            {message && (
                <Typography variant="body2" sx={{ marginTop: '20px' }}>
                    {message}
                </Typography>
            )}
        </Box>
    )
}

export default UploadForm
