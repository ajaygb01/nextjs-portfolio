import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = process.env.MAPBOX_ACCESS_TOKEN
    if (!token) {
        return res.status(500).json({ error: 'Mapbox access token not found' })
    }
    res.status(200).json({ token })
}
