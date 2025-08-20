// pages/_app.tsx
import { AppProps } from 'next/app'
import '../styles/tokens.css';
import '../app/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}

export default MyApp
