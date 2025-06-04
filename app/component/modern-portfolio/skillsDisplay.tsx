// @ts-nocheck
'use client'
import React from 'react'
import { Box, Typography, Chip, LinearProgress, Paper } from '@mui/material'

interface SkillItem {
    language: string
    year: number
}

interface SkillsDisplayProps {
    techStack: SkillItem[]
}

const MAX_EXPERIENCE_YEARS = 10 // Assuming 10 years is the max for 100% progress

const SkillsDisplay: React.FC<SkillsDisplayProps> = ({ techStack }) => {
    return (
        <Box sx={{ paddingY: 4, paddingX: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', marginBottom: 4 }}>
                Tech Stack
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    overflowX: 'auto',
                    paddingY: 2,
                    '&::-webkit-scrollbar': {
                        height: '8px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        borderRadius: '4px',
                    },
                }}
            >
                {techStack.map((skill, index) => (
                    <Paper
                        key={index}
                        elevation={3}
                        sx={{
                            minWidth: 200, // Ensure items have a minimum width so they don't get too squeezed
                            padding: 2,
                            marginRight: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            backgroundColor: (theme) => theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[100],
                        }}
                    >
                        <Chip
                            label={skill.language}
                            color="primary"
                            sx={{ marginBottom: 1, fontWeight: 'bold' }}
                        />
                        <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
                            {skill.year} {skill.year === 1 ? 'year' : 'years'}
                        </Typography>
                        <Box sx={{ width: '80%', marginTop: 1 }}>
                            <LinearProgress
                                variant="determinate"
                                value={(skill.year / MAX_EXPERIENCE_YEARS) * 100}
                                sx={{ height: 8, borderRadius: 4 }}
                            />
                        </Box>
                    </Paper>
                ))}
            </Box>
        </Box>
    )
}

export default SkillsDisplay
