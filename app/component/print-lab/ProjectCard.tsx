"use client"

import Image from 'next/image'
import React from 'react'

interface Project {
    title: string
    description: string
    image: string
}

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const btn = e.currentTarget
        const ripple = document.createElement('span')
        ripple.className = 'ripple'
        ripple.style.left = `${e.nativeEvent.offsetX}px`
        ripple.style.top = `${e.nativeEvent.offsetY}px`
        btn.appendChild(ripple)
        setTimeout(() => ripple.remove(), 600)
        // stub for sound
    }
    return (
        <div className="glass-card p-4 flex flex-col hover:shadow-neon transition transform hover:scale-105">
            <div className="relative w-full h-40 mb-4">
                <Image src={project.image} alt={project.title} fill className="object-cover rounded-md" />
            </div>
            <h3 className="text-lg font-semibold neon-text mb-1">{project.title}</h3>
            <p className="text-sm text-gray-300 flex-1">{project.description}</p>
            <button
                onClick={handleClick}
                className="launch-btn mt-4 px-3 py-2 bg-cyan-600 text-white rounded-md"
            >
                Launch Print
            </button>
        </div>
    )
}

export default ProjectCard
