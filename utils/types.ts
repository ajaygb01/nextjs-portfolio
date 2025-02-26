export interface PredictionRequest {
    age: number
    gender: string
    sugarLevel: number
    bmi: number
    waterIntake: number
    physicalActivity: number
    familyHistoryHypertension: string
    familyHistoryKidneyStones: string
    previousKidneyStone: string
    bloodPressure: number
    sodiumIntake: number
    proteinIntake: number
    smoking: string
    alcoholConsumption: string
}

export interface PredictionResponse {
    highBloodPressure: boolean
    kidneyStones: boolean
    diabetes: boolean
    highBloodPressureProbability: string
    kidneyStonesProbability: string
    predictionConfidence: string
    recommendations: string[]
    modelInfo: {
        type: string
        featuresUsed: string[]
    }
}
