import '../styles/styles.css' // Adjust the path if needed
import React from 'react'
import { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from '@mui/material/styles'

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}

export default MyApp
