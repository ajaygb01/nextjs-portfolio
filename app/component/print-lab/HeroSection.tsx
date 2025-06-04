"use client"

import React, { useEffect, useState } from 'react'

interface HeroSectionProps {
    lines: string[]
}

const HeroSection: React.FC<HeroSectionProps> = ({ lines }) => {
    const [display, setDisplay] = useState('')
    const [lineIndex, setLineIndex] = useState(0)
    const [charIndex, setCharIndex] = useState(0)

    useEffect(() => {
        const current = lines[lineIndex]
        let timeout: NodeJS.Timeout

        if (charIndex <= current.length) {
            timeout = setTimeout(() => {
                setDisplay(current.slice(0, charIndex))
                setCharIndex((c) => c + 1)
            }, 120)
        } else {
            timeout = setTimeout(() => {
                setCharIndex(0)
                setLineIndex((l) => (l + 1) % lines.length)
            }, 1500)
        }
        return () => clearTimeout(timeout)
    }, [charIndex, lineIndex, lines])

    return (
        <div className="py-20 text-center">
            <h1 className="text-3xl md:text-5xl font-bold neon-text inline-block">
                {display}
                <span className="blinking-cursor">█</span>
            </h1>
        </div>
    )
}

export default HeroSection
