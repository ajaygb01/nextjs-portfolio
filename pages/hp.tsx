import { useState } from 'react'
import { PredictionRequest, PredictionResponse } from '@/utils/types'
import Form from './components/Form'
import Results from './components/Results'
import { Container, Typography, Grid } from '@mui/material'

// Mock implementation of predictHealth function
const predictHealth = async (
    data: PredictionRequest
): Promise<PredictionResponse> => {
    // Simulate a network request
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                highBloodPressureProbability: '0.8',
                kidneyStonesProbability: '0.6',
                predictionConfidence: '0.9',
                highBloodPressure: true,
                kidneyStones: true,
                diabetes: false,
                recommendations: ['Drink more water', 'Exercise regularly'],
                modelInfo: { type: 'Random Forest', featuresUsed: ['a', 'n'] },
            })
        }, 2000)
    })
}

export default function Home() {
    const [prediction, setPrediction] = useState<PredictionResponse | null>(
        null
    )
    const [formData, setFormData] = useState<PredictionRequest | null>(null)

    const handleFormSubmit = async (data: PredictionRequest) => {
        setPrediction(null) // Reset prediction to show loading in Results
        setFormData(data) // Save form data
        const result = await predictHealth(data)
        setPrediction(result)
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
            <Grid container spacing={4} sx={{ width: '100%' }}>
                <Grid item xs={12} md={6}>
                    <Form onSubmit={handleFormSubmit} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Results data={prediction} formData={formData} />
                </Grid>
            </Grid>
        </Container>
    )
}
