// types/next-auth.d.ts
import NextAuth from 'next-auth'

declare module 'next-auth' {
    interface Session {
        accessToken: string // Declare accessToken as a string
        user: {
            name: string
            email: string
            picture: string
        }
    }
}
