import { useState } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    Modal,
    Box,
    Typography,
} from '@mui/material'
import { Button } from '@mui/material'
import { TextField } from '@mui/material'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

const API_URL = process.env.NEXT_PUBLIC_MODEL_API_URL

interface PredictionData {
    prediction: number
    probability: number
}

export default function DiabetesPrediction() {
    const [features, setFeatures] = useState<string[]>(new Array(8).fill(''))
    const [prediction, setPrediction] = useState<PredictionData | null>(null)
    const [training, setTraining] = useState(false)
    const [dataPoints, setDataPoints] = useState<
        { name: string; probability: number }[]
    >([])
    const [open, setOpen] = useState(false)

    const handleChange = (index: number, value: string) => {
        const newFeatures = [...features]
        newFeatures[index] = value
        setFeatures(newFeatures)
    }

    const trainModel = async () => {
        setTraining(true)
        const response = await fetch(`${API_URL}/train`, { method: 'POST' })
        const data = await response.json()
        alert(data.message)
        setTraining(false)
        setOpen(true)
    }

    const predict = async () => {
        const response = await fetch(`${API_URL}/predict`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ features: features.map(Number) }),
        })
        const data: PredictionData = await response.json()
        setPrediction(data)
        setDataPoints([
            ...dataPoints,
            {
                name: `Attempt ${dataPoints.length + 1}`,
                probability: data.probability,
            },
        ])
    }

    const handleClose = () => setOpen(false)

    const randomizeFeatures = () => {
        const randomFeatures = [
            Math.floor(Math.random() * 10), // Pregnancies
            Math.floor(Math.random() * (200 - 70 + 1)) + 70, // Glucose
            Math.floor(Math.random() * (122 - 40 + 1)) + 40, // BloodPressure
            Math.floor(Math.random() * (99 - 10 + 1)) + 10, // SkinThickness
            Math.floor(Math.random() * (846 - 15 + 1)) + 15, // Insulin
            (Math.random() * (67.1 - 18.2) + 18.2).toFixed(1), // BMI
            (Math.random() * (2.42 - 0.078) + 0.078).toFixed(3), // DiabetesPedigreeFunction
            Math.floor(Math.random() * (81 - 21 + 1)) + 21, // Age
        ]
        setFeatures(randomFeatures.map(String))
    }

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <Box sx={{ flex: 1, p: 6 }}>
                <h1 className="text-2xl font-bold text-center mb-4">
                    Diabetes Prediction
                </h1>
                <Card className="mb-4 p-4">
                    <CardHeader title="Train the Model" />
                    <CardContent>
                        <Button
                            onClick={trainModel}
                            disabled={training}
                            variant="contained"
                            color="primary"
                        >
                            {training ? 'Training...' : 'Train Model'}
                        </Button>
                    </CardContent>
                </Card>
                <Card className="mb-4 p-4">
                    <CardHeader title="Enter Features" />
                    <CardContent>
                        {[
                            'Pregnancies',
                            'Glucose',
                            'BloodPressure',
                            'SkinThickness',
                            'Insulin',
                            'BMI',
                            'DiabetesPedigreeFunction',
                            'Age',
                        ].map((label, index) => (
                            <TextField
                                key={index}
                                type={
                                    index === 5 || index === 6
                                        ? 'number'
                                        : 'number'
                                }
                                label={label}
                                value={features[index]}
                                onChange={(e) =>
                                    handleChange(index, e.target.value)
                                }
                                fullWidth
                                margin="normal"
                            />
                        ))}
                        <Button
                            onClick={randomizeFeatures}
                            variant="contained"
                            color="secondary"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Randomize
                        </Button>
                        <Button
                            onClick={predict}
                            variant="contained"
                            color="secondary"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Predict
                        </Button>
                    </CardContent>
                </Card>
            </Box>
            <Box
                sx={{
                    flex: 1,
                    p: 6,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                {prediction && (
                    <Card className="p-4 mb-4">
                        <CardHeader title="Prediction Result" />
                        <CardContent>
                            <p>
                                Prediction:{' '}
                                {prediction.prediction === 1
                                    ? 'Diabetic'
                                    : 'Non-Diabetic'}
                            </p>
                            <p>
                                Probability:{' '}
                                {(prediction.probability * 100).toFixed(2)}%
                            </p>
                        </CardContent>
                    </Card>
                )}
                {dataPoints.length > 0 && (
                    <Card className="p-4">
                        <CardHeader title="Prediction Trends" />
                        <CardContent>
                            <LineChart
                                width={400}
                                height={200}
                                data={dataPoints}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="probability"
                                    stroke="#8884d8"
                                />
                            </LineChart>
                        </CardContent>
                    </Card>
                )}
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography id="modal-title" variant="h6" component="h2">
                        Model Training
                    </Typography>
                    <Typography id="modal-description" sx={{ mt: 2 }}>
                        The model has been trained successfully!
                    </Typography>
                    <Button
                        onClick={handleClose}
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                    >
                        Close
                    </Button>
                </Box>
            </Modal>
        </Box>
    )
}
