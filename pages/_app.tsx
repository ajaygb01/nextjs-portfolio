// pages/_app.tsx
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import { CssBaseline } from '@mui/material'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SessionProvider session={pageProps.session}>
            <CssBaseline />
            <Component {...pageProps} />
        </SessionProvider>
    )
}

export default MyApp
