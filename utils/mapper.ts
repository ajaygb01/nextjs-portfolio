import { PredictionRequest } from '@/utils/types'

export const mapPredictionRequest = (data: PredictionRequest) => ({
    features: {
        Age: data.age,
        Gender: data.gender,
        'Blood Sugar Level': data.sugarLevel,
        'Blood Pressure': data.bloodPressure,
        'Sodium Intake': data.sodiumIntake,
        BMI: data.bmi,
        'Water Intake': data.waterIntake,
        'Physical Activity': data.physicalActivity,
        'Family History Hypertension': data.familyHistoryHypertension,
        'Family History Kidney Stones': data.familyHistoryKidneyStones,
        'Previous Kidney Stone': data.previousKidneyStone,
        'Protein Intake': data.proteinIntake,
        Smoking: data.smoking,
        'Alcohol Consumption': data.alcoholConsumption,
    },
})
