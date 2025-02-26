import { PredictionResponse } from '@/utils/types'
import {
    Box,
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemText,
} from '@mui/material'
import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface Props {
    data: PredictionResponse | null
}

const Results: React.FC<Props> = ({ data }) => {
    if (!data) return null

    const chartData = {
        labels: [
            'High Blood Pressure',
            'Kidney Stones',
            'Prediction Confidence',
        ],
        datasets: [
            {
                label: 'Probability',
                data: [
                    parseFloat(data.highBloodPressureProbability),
                    parseFloat(data.kidneyStonesProbability),
                    parseFloat(data.predictionConfidence),
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Prediction Probabilities',
            },
        },
    }

    return (
        <Card elevation={3} sx={{ mt: 4, p: 2 }}>
            <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                    Prediction Results
                </Typography>

                <Typography
                    variant="body1"
                    color={
                        data.highBloodPressure ? 'error.main' : 'success.main'
                    }
                >
                    High Blood Pressure:{' '}
                    {data.highBloodPressure ? 'Risk' : 'Safe'}
                </Typography>
                <Typography
                    variant="body1"
                    color={data.kidneyStones ? 'error.main' : 'success.main'}
                >
                    Kidney Stones: {data.kidneyStones ? 'Risk' : 'Safe'}
                </Typography>
                <Typography
                    variant="body1"
                    color={data.diabetes ? 'error.main' : 'success.main'}
                >
                    Diabetes: {data.diabetes ? 'Risk' : 'Safe'}
                </Typography>

                <Box sx={{ mt: 4 }}>
                    <Bar data={chartData} options={chartOptions} />
                </Box>

                <Typography variant="h6" component="h3" sx={{ mt: 4 }}>
                    Recommendations:
                </Typography>
                <List>
                    {data.recommendations.map((rec, idx) => (
                        <ListItem key={idx}>
                            <ListItemText primary={rec} />
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    )
}

export default Results
