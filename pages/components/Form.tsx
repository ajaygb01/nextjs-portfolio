import { useForm, Controller } from 'react-hook-form'
import { PredictionRequest } from '@/utils/types'
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    Paper,
} from '@mui/material'

interface Props {
    onSubmit: (data: PredictionRequest) => void
}

const Form: React.FC<Props> = ({ onSubmit }) => {
    const { control, handleSubmit, setValue } = useForm<PredictionRequest>({
        defaultValues: {
            age: 65,
            gender: 'Male',
            sugarLevel: 110,
            bmi: 31,
            waterIntake: 1,
            physicalActivity: 3,
            bloodPressure: 130,
            familyHistoryHypertension: 'Yes',
            familyHistoryKidneyStones: 'Yes',
            previousKidneyStone: 'No',
            sodiumIntake: 2.5,
            proteinIntake: 1.5,
            smoking: 'No',
            alcoholConsumption: 'Yes',
        },
    })

    const randomizeValues = () => {
        setValue('age', Math.floor(Math.random() * 60) + 20)
        setValue('gender', Math.random() > 0.5 ? 'Male' : 'Female')
        setValue('sugarLevel', Math.floor(Math.random() * 100) + 70)
        setValue('bmi', Math.floor(Math.random() * 15) + 18)
        setValue('waterIntake', Math.floor(Math.random() * 4) + 1)
        setValue('physicalActivity', Math.floor(Math.random() * 10) + 1)
        setValue('bloodPressure', Math.floor(Math.random() * 80) + 90)
        setValue(
            'familyHistoryHypertension',
            Math.random() > 0.5 ? 'Yes' : 'No'
        )
        setValue(
            'familyHistoryKidneyStones',
            Math.random() > 0.5 ? 'Yes' : 'No'
        )
        setValue('previousKidneyStone', Math.random() > 0.5 ? 'Yes' : 'No')
        setValue('sodiumIntake', Math.floor(Math.random() * 4) + 1)
        setValue('proteinIntake', Math.floor(Math.random() * 3) + 1)
        setValue('smoking', Math.random() > 0.5 ? 'Yes' : 'No')
        setValue('alcoholConsumption', Math.random() > 0.5 ? 'Yes' : 'No')
    }

    return (
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Enter Your Health Details
                </Typography>

                <Controller
                    name="age"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Age"
                            type="number"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                    )}
                />

                <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel>Gender</InputLabel>
                    <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                            <Select {...field} label="Gender">
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                            </Select>
                        )}
                    />
                </FormControl>

                <Controller
                    name="sugarLevel"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Blood Sugar Level"
                            type="number"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                    )}
                />

                <Controller
                    name="bloodPressure"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Blood Pressure"
                            type="number"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                    )}
                />

                <Controller
                    name="bmi"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="BMI"
                            type="number"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                    )}
                />

                <Controller
                    name="waterIntake"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Water Intake (liters)"
                            type="number"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                    )}
                />

                <Controller
                    name="physicalActivity"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Physical Activity (hours/week)"
                            type="number"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                    )}
                />

                <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel>Family History of Hypertension</InputLabel>
                    <Controller
                        name="familyHistoryHypertension"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                label="Family History of Hypertension"
                            >
                                <MenuItem value="No">No</MenuItem>
                                <MenuItem value="Yes">Yes</MenuItem>
                            </Select>
                        )}
                    />
                </FormControl>

                <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel>Family History of Kidney Stones</InputLabel>
                    <Controller
                        name="familyHistoryKidneyStones"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                label="Family History of Kidney Stones"
                            >
                                <MenuItem value="No">No</MenuItem>
                                <MenuItem value="Yes">Yes</MenuItem>
                            </Select>
                        )}
                    />
                </FormControl>

                <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel>Previous Kidney Stone</InputLabel>
                    <Controller
                        name="previousKidneyStone"
                        control={control}
                        render={({ field }) => (
                            <Select {...field} label="Previous Kidney Stone">
                                <MenuItem value="No">No</MenuItem>
                                <MenuItem value="Yes">Yes</MenuItem>
                            </Select>
                        )}
                    />
                </FormControl>

                <Controller
                    name="sodiumIntake"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Sodium Intake (g/day)"
                            type="number"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                    )}
                />

                <Controller
                    name="proteinIntake"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Protein Intake (g/day)"
                            type="number"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                    )}
                />

                <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel>Smoking</InputLabel>
                    <Controller
                        name="smoking"
                        control={control}
                        render={({ field }) => (
                            <Select {...field} label="Smoking">
                                <MenuItem value="No">No</MenuItem>
                                <MenuItem value="Yes">Yes</MenuItem>
                            </Select>
                        )}
                    />
                </FormControl>

                <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel>Alcohol Consumption</InputLabel>
                    <Controller
                        name="alcoholConsumption"
                        control={control}
                        render={({ field }) => (
                            <Select {...field} label="Alcohol Consumption">
                                <MenuItem value="No">No</MenuItem>
                                <MenuItem value="Yes">Yes</MenuItem>
                            </Select>
                        )}
                    />
                </FormControl>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mt: 2,
                    }}
                >
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ flex: 1, mr: 1 }}
                    >
                        Predict
                    </Button>
                    <Button
                        type="button"
                        variant="outlined"
                        color="secondary"
                        onClick={randomizeValues}
                        sx={{ flex: 1, ml: 1 }}
                    >
                        Randomize
                    </Button>
                </Box>
            </form>
        </Paper>
    )
}

export default Form
