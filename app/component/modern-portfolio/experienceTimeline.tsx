'use client'

import React from 'react'
import { Box, Typography, Chip, Paper } from '@mui/material'
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineDot,
    TimelineContent,
    timelineItemClasses, // Used for removing default styling on the last item
} from '@mui/lab' // Attempting to import from @mui/lab

interface ExperienceItemProps {
    from: string
    to: string
    company: string
    location: string
    position: string
    keySkills: string[]
}

interface ExperienceTimelineProps {
    experience: ExperienceItemProps[]
}

const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ experience }) => {
    const formatDateRange = (from: string, to: string): string => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' }
        const fromDate = new Date(from.includes('-') ? from : parseInt(from)) // Handle YYYY-Mon and YYYY formats
        const formattedFrom = fromDate.toLocaleDateString('en-US', options)

        if (!to || to.toLowerCase() === 'present' || to === '') {
            return `${formattedFrom} - Present`
        }
        const toDate = new Date(to.includes('-') ? to : parseInt(to))
        const formattedTo = toDate.toLocaleDateString('en-US', options)
        return `${formattedFrom} - ${formattedTo}`
    }

    return (
        <Box sx={{ paddingY: 4, paddingX: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', marginBottom: 4 }}>
                Professional Experience
            </Typography>
            <Timeline 
                position="alternate" // Alternating timeline items left and right
                sx={{
                    [`& .${timelineItemClasses.root}:before`]: {
                        flex: 0, // Remove the default line before the item for alternating timeline
                        padding: 0,
                    },
                }}
            >
                {experience.map((item, index) => (
                    <TimelineItem key={index}>
                        <TimelineSeparator>
                            <TimelineDot color="primary" />
                            {index < experience.length - 1 && <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                            <Paper elevation={3} sx={{ p: 2 }}>
                                <Typography variant="h6" component="span">
                                    {item.position}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {item.company}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" sx={{ my: 0.5 }}>
                                    {formatDateRange(item.from, item.to)}
                                </Typography>
                                <Typography variant="caption" display="block" color="textSecondary" sx={{ mb: 1 }}>
                                    {item.location}
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {item.keySkills.map((skill, skillIndex) => (
                                        <Chip key={skillIndex} label={skill} size="small" />
                                    ))}
                                </Box>
                            </Paper>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        </Box>
    )
}

export default ExperienceTimeline
