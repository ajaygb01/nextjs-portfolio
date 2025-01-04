import { getToken } from 'next-auth/jwt'

const secret = process.env.NEXTAUTH_SECRET

import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const token = await getToken({ req, secret })

    if (!token) {
        return res.status(401).json({ error: 'User not authenticated' })
    }

    res.status(200).json({ message: 'Authorized', token })
}
