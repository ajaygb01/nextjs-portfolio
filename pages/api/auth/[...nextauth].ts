import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    scope: 'openid https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
                },
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token

                // Fetch the user's profile information
                const response = await fetch(
                    'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
                    {
                        headers: {
                            Authorization: `Bearer ${account.access_token}`,
                        },
                    }
                )
                const profile = await response.json()

                token.name = profile.name
                token.email = profile.email
                token.picture = profile.picture
            }
            return token
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken as string
            session.user = {
                name: token.name as string,
                email: token.email as string,
                picture: token.picture as string,
            }
            return session
        },
    },
})
