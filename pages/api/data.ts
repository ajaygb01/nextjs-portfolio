import { NextApiRequest, NextApiResponse } from 'next'

// Sample patient database
const patients = [
    { id: '12345XYZ', name: 'John Doe', age: 45 },
    { id: '67890ABC', name: 'Jane Smith', age: 52 },
    { id: '11122DEF', name: 'Robert Brown', age: 60 },
]

// Medical records for each patient
const medicalData: Record<string, any> = {
    '12345XYZ': {
        records: [
            {
                date: '2025-02-10',
                diagnosis: 'Hypertension',
                prescription: 'Amlodipine',
            },
            {
                date: '2025-01-25',
                diagnosis: 'Diabetes',
                prescription: 'Metformin',
            },
        ],
        labResults: [
            { test: 'Blood Sugar', date: '2025-02-05', result: 'Normal' },
            { test: 'Cholesterol', date: '2025-01-20', result: 'High' },
        ],
        appointments: [
            { date: '2025-03-01', doctor: 'Dr. Smith', type: 'Cardiology' },
        ],
    },
    '67890ABC': {
        records: [
            {
                date: '2025-01-15',
                diagnosis: 'Asthma',
                prescription: 'Albuterol',
            },
        ],
        labResults: [
            {
                test: 'Pulmonary Function',
                date: '2025-01-10',
                result: 'Mild Restriction',
            },
        ],
        appointments: [
            { date: '2025-03-10', doctor: 'Dr. Green', type: 'Pulmonology' },
        ],
    },
    '11122DEF': {
        records: [
            {
                date: '2025-02-01',
                diagnosis: 'Arthritis',
                prescription: 'Ibuprofen',
            },
        ],
        labResults: [
            {
                test: 'X-ray',
                date: '2025-01-30',
                result: 'Mild Osteoarthritis',
            },
        ],
        appointments: [
            { date: '2025-03-05', doctor: 'Dr. White', type: 'Orthopedics' },
        ],
    },
}

// API Handler
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { query } = req

    if (query.endpoint === 'patients') {
        return res.status(200).json(patients)
    }

    if (query.endpoint === 'patient' && query.id) {
        const patient = patients.find((p) => p.id === (query.id as string))
        if (!patient)
            return res.status(404).json({ error: 'Patient not found' })

        return res.status(200).json({
            patient,
            ...medicalData[query.id as string],
        })
    }

    return res.status(400).json({ error: 'Invalid request' })
}
