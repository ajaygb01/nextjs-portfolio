'use client'

import React from 'react'
import { Box, Typography, IconButton, Tooltip } from '@mui/material'
import { SvgIconProps } from '@mui/material/SvgIcon'; // Import SvgIconProps

interface ContactItem {
    app: string
    link: string
    icon?: React.ReactNode // The icon is expected to be a ReactNode (e.g., an MUI icon component)
}

interface ContactBarProps {
    contact: ContactItem[]
}

const ContactBar: React.FC<ContactBarProps> = ({ contact }) => {
    return (
        <Box sx={{ paddingY: 4, paddingX: 2, textAlign: 'center' }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ marginBottom: 3 }}>
                Get in Touch
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                {contact.map((item, index) => (
                    <Tooltip title={item.app} key={index}>
                        <IconButton
                            aria-label={item.app}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                margin: 1, // Add some margin for spacing
                                color: 'primary.main', // Use primary color for the icon
                                '&:hover': {
                                    backgroundColor: 'primary.light', // Optional: subtle background on hover
                                },
                                // Increase icon size if they appear too small
                                // fontSize: '2rem', // Uncomment and adjust if needed
                            }}
                        >
                            {/* Ensure the icon itself has appropriate sizing if it's an SVG component */}
                            {React.isValidElement(item.icon) ? React.cloneElement(item.icon as React.ReactElement<SvgIconProps>, { sx: { fontSize: '2rem' }}) : null}
                        </IconButton>
                    </Tooltip>
                ))}
            </Box>
        </Box>
    )
}

export default ContactBar
