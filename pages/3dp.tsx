"use client"

import Head from 'next/head'
import HeroSection from '@/app/component/print-lab/HeroSection'
import ModelViewer from '@/app/component/print-lab/ModelViewer'
import ProjectCard from '@/app/component/print-lab/ProjectCard'

const projects = [
    {
        title: 'Prototype A',
        description: 'High precision gear ready for printing.',
        image: 'https://placehold.co/400x200/png',
    },
    {
        title: 'Prototype B',
        description: 'Lightweight frame structure.',
        image: 'https://placehold.co/400x200/png',
    },
    {
        title: 'Prototype C',
        description: 'Mechanical part showcase.',
        image: 'https://placehold.co/400x200/png',
    },
]

export default function PrintLabPage() {
    return (
        <div className="font-orbitron min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
            <Head>
                <title>3D Printing Control Lab</title>
            </Head>
            <div className="absolute inset-0 -z-10 animate-pulse opacity-30 bg-[radial-gradient(#0ff_1px,transparent_1px)] [background-size:12px_12px]"></div>
            <HeroSection lines={['> Booting 3D Print Lab...', '> Calibrating Extruder...', '> Ready.']} />
            <div className="container mx-auto px-4 space-y-8 pb-20">
                <div className="flex justify-center">
                    <ModelViewer url="/dummy-model.glb" />
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((p, i) => (
                        <ProjectCard key={i} project={p} />
                    ))}
                </div>
            </div>
        </div>
    )
}
