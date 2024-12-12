// PostalCodeInput.tsx
import React from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'

interface PostalCodeInputProps {
    postalCode: string
    onPostalCodeChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onSearch: () => void
}

const PostalCodeInput: React.FC<PostalCodeInputProps> = ({
    postalCode,
    onPostalCodeChange,
    onSearch,
}) => {
    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom>
                Enter Your Postal Code
            </Typography>
            <TextField
                label="Postal Code"
                variant="outlined"
                fullWidth
                value={postalCode}
                onChange={onPostalCodeChange}
            />
            <Button
                variant="contained"
                sx={{ marginTop: 2 }}
                onClick={onSearch}
            >
                Search Restaurants
            </Button>
        </Box>
    )
}

export default PostalCodeInput
