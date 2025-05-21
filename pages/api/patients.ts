import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';

type Patient = {
  id: string;
  name: string;
  age: number;
  diagnosis: string;
  vitals: {
    heartRate: number;
    bloodPressure: string;
    temperature: number;
  };
  bloodSugar: Array<{ timestamp: string; value: number }>;
  status: string;
  appointmentHistory: Array<{ date: string; reason: string; notes: string }>;
  notes: string;
};

type ErrorResponse = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Patient[] | ErrorResponse>
) {
  const filePath = path.join(process.cwd(), 'public', 'data', 'patients.json');

  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents) as Patient[];
    res.status(200).json(data);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      res.status(404).json({ error: 'Patient data not found' });
    } else {
      console.error(error); // Log the error for debugging
      res.status(500).json({ error: 'Failed to load patient data' });
    }
  }
}
