import { NextApiRequest, NextApiResponse } from 'next'
import { decryptEmail } from '@/utils/decryptEmail'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const { accessToken, fileId } = req.body

        try {
            const email = decryptEmail(
                process.env.HASHED_SHARED_EMAIL!,
                process.env.EMAIL_DECRYPTION_KEY!
            )

            const response = await fetch(
                `https://www.googleapis.com/drive/v3/files/${fileId}/permissions`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        role: 'writer',
                        type: 'user',
                        emailAddress: email,
                    }),
                }
            )
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.error)
            }
            res.status(200).json({ message: 'Permission set successfully' })
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' })
    }
}
