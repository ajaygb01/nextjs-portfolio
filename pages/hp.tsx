import { useState } from 'react'
import { predictHealth } from '@/utils/hp'
import { PredictionRequest, PredictionResponse } from '@/utils/types'
import Form from './components/Form'
import Results from './components/Results'
import {
    Box,
    Container,
    Typography,
    Button,
    useMediaQuery,
    useTheme,
} from '@mui/material'

export default function Home() {
    const [prediction, setPrediction] = useState<PredictionResponse | null>(
        null
    )
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const handleFormSubmit = async (data: PredictionRequest) => {
        const result = await predictHealth(data)
        setPrediction(result)
    }

    const handleBack = () => {
        setPrediction(null)
    }

    return (
        <Container
            maxWidth="lg"
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: 'background.default',
                p: 4,
            }}
        >
            <Typography
                variant="h3"
                component="h1"
                gutterBottom
                color="primary"
                sx={{ mb: 4 }}
            >
                HealthPredict
            </Typography>
            {prediction ? (
                <Box sx={{ width: '100%' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleBack}
                        sx={{ mb: 2 }}
                    >
                        Back
                    </Button>
                    <Results data={prediction} />
                </Box>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        width: '100%',
                        gap: 4,
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <Form onSubmit={handleFormSubmit} />
                    </Box>
                </Box>
            )}
        </Container>
    )
}
