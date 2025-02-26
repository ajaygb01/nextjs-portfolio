import axios from 'axios'
import { PredictionRequest, PredictionResponse } from '@/utils/types'
import { mapPredictionRequest } from '@/utils/mapper'

const API_URL = process.env.NEXT_PUBLIC_MODEL_API_URL

export const predictHealth = async (
    data: PredictionRequest
): Promise<PredictionResponse> => {
    const response = await axios.post(
        `${API_URL}/predict`,
        mapPredictionRequest(data)
    )
    return response.data
}
