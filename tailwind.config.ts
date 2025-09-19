import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: '#0B0B10',
                surface: '#111319',
                accent: {
                    DEFAULT: '#7C5CFF',
                    secondary: '#31D0AA',
                },
                text: '#E9EDF1',
            },
            fontFamily: {
                sans: ['var(--font-inter)'],
                heading: ['var(--font-sora)'],
                mono: ['var(--font-jetbrains-mono)'],
            },
        },
    },
    plugins: [],
}
export default config
