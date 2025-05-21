'use client'

import React from 'react'
import { Box, Typography } from '@mui/material'

interface FooterProps {
    footer: {
        year: number
        companyName: string
    }
}

const Footer: React.FC<FooterProps> = ({ footer }) => {
    return (
        <Box
            component="footer" // Semantic HTML element
            sx={{
                py: 3, // Vertical padding
                px: 2, // Horizontal padding
                mt: 'auto', // Push footer to the bottom if content is short
                backgroundColor: (theme) =>
                    theme.palette.mode === 'dark'
                        ? theme.palette.grey[800]
                        : theme.palette.grey[200],
                textAlign: 'center',
            }}
        >
            <Typography variant="body2" color="text.secondary">
                © {footer.year} {footer.companyName}. All Rights Reserved.
            </Typography>
        </Box>
    )
}

export default Footer
