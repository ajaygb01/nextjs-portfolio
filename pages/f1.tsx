"use client"

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Box, Plane, Torus } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import f1Data from '@/public/data/f1.json'

interface CarProps {
  color: string
  number: string
  name: string
  trackRadius: number
  angleOffset: number
}

const Car = ({ color, number, name, trackRadius, angleOffset }: CarProps) => {
  const group = useRef<THREE.Group>(null!)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.3 + angleOffset
    const x = trackRadius * Math.cos(t)
    const z = trackRadius * Math.sin(t)
    group.current.position.set(x, 0.05, z)
    group.current.rotation.y = -t + Math.PI / 2
  })
  return (
    <group ref={group}>
      <Box args={[0.4, 0.1, 1]} castShadow>
        <meshStandardMaterial color={color} />
      </Box>
      <Text
        position={[0, 0.25, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {number}
      </Text>
    </group>
  )
}

const Track = () => (
  <Torus args={[4, 0.2, 16, 100]} rotation={[-Math.PI / 2, 0, 0]}>
    <meshStandardMaterial color="gray" />
  </Torus>
)

export default function F1Scene() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Canvas shadows camera={{ position: [0, 3, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={0.8} castShadow />
        <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
          <meshStandardMaterial color="black" />
        </Plane>
        <Track />
        {f1Data.map((driver, idx) => (
          <Car
            key={idx}
            color={driver.color}
            number={driver.number}
            name={driver.driver}
            trackRadius={4}
            angleOffset={(idx / f1Data.length) * Math.PI * 2}
          />
        ))}
        <OrbitControls />
      </Canvas>
    </div>
  )
}

