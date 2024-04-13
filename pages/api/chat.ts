// pages/api/chat.ts

import { NextApiRequest, NextApiResponse } from 'next'
import { createApiHandler } from '../../app/project/resumeBuilder/utils/createApiHandler'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            let { messages } = req.body
            messages.unshift({
                role: 'system',
                content:
                    'You are an assistant, who can help me with my resume.',
            })

            // Call OpenAI's completion endpoint
            const completion = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages,
                stream: false, // Set stream to false for single completion
            })

            // Extract the response and send it back
            const response = completion.choices[0].message.content
            res.status(200).json({ message: response })
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' })
    }
}

export default createApiHandler(handler)
