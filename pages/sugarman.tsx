import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@mui/material'
import { Button } from '@mui/material'
import { TextField } from '@mui/material'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

const API_URL = process.env.NEXT_PUBLIC_API_URL

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

    return (
        <div className="p-6 max-w-lg mx-auto">
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
                                index === 5 || index === 6 ? 'number' : 'number'
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
                        onClick={predict}
                        variant="contained"
                        color="secondary"
                        fullWidth
                    >
                        Predict
                    </Button>
                </CardContent>
            </Card>
            {prediction && (
                <Card className="p-4">
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
                <Card className="p-4 mt-4">
                    <CardHeader title="Prediction Trends" />
                    <CardContent>
                        <LineChart width={400} height={200} data={dataPoints}>
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
        </div>
    )
}
