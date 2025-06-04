'use client'

import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Float } from '@react-three/drei'
import * as THREE from 'three'
import { formValues } from './index'
import type { Project, Contact } from '@/app/state/initialState'

interface ProjectCardProps {
    project: Project
    index: number
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
    const ref = useRef<THREE.Mesh>(null!)
    useFrame(({ clock }) => {
        if (ref.current) {
            ref.current.rotation.y = clock.getElapsedTime() / 2 + index * 0.2
        }
    })

    const spacing = 1.5
    return (
        <group position={[index * spacing - (spacing * (formValues.projects.length - 1)) / 2, 0, -2]}>
            <mesh ref={ref} castShadow receiveShadow>
                <boxGeometry args={[1, 0.6, 0.2]} />
                <meshStandardMaterial color={'#2196f3'} />
            </mesh>
            <Text position={[0, 0, 0.15]} fontSize={0.15} color="white" anchorX="center" anchorY="middle">
                {project.name}
            </Text>
        </group>
    )
}

interface SocialItemProps {
    contact: Contact
    index: number
}

const SocialItem: React.FC<SocialItemProps> = ({ contact, index }) => {
    const ref = useRef<THREE.Mesh>(null!)
    const radius = 3
    const angle = (index / formValues.contact.length) * Math.PI * 2
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius

    useFrame(({ clock }) => {
        if (ref.current) {
            ref.current.rotation.y += 0.01
        }
    })

    return (
        <group position={[x, -1.2, z]}>
            <mesh ref={ref} castShadow>
                <sphereGeometry args={[0.2, 32, 32]} />
                <meshStandardMaterial color={'#ff9800'} />
            </mesh>
            <Text position={[0, 0.35, 0]} fontSize={0.1} color="white" anchorX="center" anchorY="middle">
                {contact.app}
            </Text>
        </group>
    )
}

const HeroText = () => (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5} position={[0, 1.5, 0]}>
        <Text fontSize={0.6} color="#90caf9" anchorX="center" anchorY="middle">
            {formValues.userInfo.name}
        </Text>
        <Text position={[0, -0.7, 0]} fontSize={0.3} color="white" anchorX="center" anchorY="middle">
            {formValues.userInfo.title}
        </Text>
    </Float>
)

const Portfolio3DP: React.FC = () => {
    const projects = formValues.projects
    const contacts = formValues.contact

    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <Canvas shadows camera={{ position: [0, 2, 5], fov: 60 }}>
                <color attach="background" args={['#111']} />
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 8, 5]} intensity={1} castShadow />

                <HeroText />
                {projects.map((project, idx) => (
                    <ProjectCard key={idx} project={project} index={idx} />
                ))}
                {contacts.map((c, idx) => (
                    <SocialItem key={idx} contact={c} index={idx} />
                ))}

                <OrbitControls />
            </Canvas>
        </div>
    )
}

export default Portfolio3DP
