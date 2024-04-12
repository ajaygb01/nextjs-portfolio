// utils/createApiHandler.ts

import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

export const createApiHandler =
    (handler: NextApiHandler) =>
    async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            await handler(req, res)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }
