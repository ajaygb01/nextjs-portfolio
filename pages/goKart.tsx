"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import * as CANNON from 'cannon-es'

const TRACK_IMG = './public/track.webp'

const pathNodes = [
    new THREE.Vector3(4, 0, 0),
    new THREE.Vector3(0, 0, 4),
    new THREE.Vector3(-4, 0, 0),
    new THREE.Vector3(0, 0, -4),
]

const world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.82, 0) })

function Ground({ size = 10 }: { size?: number }) {
    const texture = useLoader(THREE.TextureLoader, TRACK_IMG)
    useEffect(() => {
        const shape = new CANNON.Plane()
        const body = new CANNON.Body({ mass: 0 })
        body.addShape(shape)
        body.quaternion.setFromEuler(-Math.PI / 2, 0, 0)
        world.addBody(body)
    }, [])
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[size, size]} />
            <meshStandardMaterial map={texture} />
        </mesh>
    )
}

interface KartProps {
    color: string
    start: CANNON.Vec3
    name: string
}

function Kart({ color, start, name }: KartProps) {
    const meshRef = useRef<THREE.Mesh>(null)
    const bodyRef = useRef<CANNON.Body>()
    const [nodeIndex, setNodeIndex] = useState(0)

    useEffect(() => {
        const shape = new CANNON.Box(new CANNON.Vec3(0.25, 0.1, 0.4))
        const body = new CANNON.Body({ mass: 1 })
        body.addShape(shape)
        body.position.copy(start)
        world.addBody(body)
        bodyRef.current = body
    }, [start])

    useFrame(() => {
        const body = bodyRef.current
        if (!body) return
        const target = pathNodes[nodeIndex]
        const dir = new CANNON.Vec3(target.x - body.position.x, 0, target.z - body.position.z)
        if (dir.length() < 0.3) {
            setNodeIndex((nodeIndex + 1) % pathNodes.length)
        } else {
            dir.normalize()
            body.velocity.x += dir.x * 2
            body.velocity.z += dir.z * 2
            body.velocity.scale(0.98, body.velocity)
        }
        if (meshRef.current) {
            meshRef.current.position.copy(body.position as unknown as THREE.Vector3)
            meshRef.current.quaternion.copy(body.quaternion as unknown as THREE.Quaternion)
        }
    })

    return (
        <mesh ref={meshRef} castShadow>
            <boxGeometry args={[0.5, 0.2, 0.8]} />
            <meshStandardMaterial color={color} />
        </mesh>
    )
}

function Scene() {
    useFrame((_, delta) => {
        world.step(1 / 60, delta)
    })

    const colors = [
        'red',
        'blue',
        'green',
        'orange',
        'purple',
        'yellow',
        'pink',
        'cyan',
        'lime',
        'magenta',
    ]

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[4, 10, 4]} intensity={0.8} castShadow />
            <Ground />
            {colors.map((c, i) => (
                <Kart key={i} color={c} start={new CANNON.Vec3(i * 0.5 - 2, 0.2, 0)} name={`User${i + 1}`} />
            ))}
        </>
    )
}

export default function GoKartPage() {
    return (
        <div className="h-screen w-screen bg-black text-white">
            <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
                <Scene />
                <OrbitControls />
            </Canvas>
        </div>
    )
}
