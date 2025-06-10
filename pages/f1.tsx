"use client"

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Box, Plane } from '@react-three/drei'
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

const monacoPath = [
  new THREE.Vector2(4, 0),
  new THREE.Vector2(3, 1),
  new THREE.Vector2(2.5, 1.2),
  new THREE.Vector2(1.5, 2),
  new THREE.Vector2(1, 3),
  new THREE.Vector2(0, 3.5),
  new THREE.Vector2(-1, 3.4),
  new THREE.Vector2(-2, 3),
  new THREE.Vector2(-3, 2),
  new THREE.Vector2(-3.8, 1),
  new THREE.Vector2(-4, 0),
  new THREE.Vector2(-3.8, -1),
  new THREE.Vector2(-3, -2),
  new THREE.Vector2(-2, -2.8),
  new THREE.Vector2(-1, -3.4),
  new THREE.Vector2(0, -3.5),
  new THREE.Vector2(1, -3.2),
  new THREE.Vector2(2, -2.5),
  new THREE.Vector2(3, -1.5),
  new THREE.Vector2(3.8, -0.5),
]

const Track = () => {
  const shape = React.useMemo(() => {
    const outer = new THREE.Shape()
    outer.moveTo(monacoPath[0].x, monacoPath[0].y)
    monacoPath.slice(1).forEach(p => outer.lineTo(p.x, p.y))
    outer.lineTo(monacoPath[0].x, monacoPath[0].y)

    const inner = new THREE.Path()
    const shrink = 0.9
    inner.moveTo(monacoPath[0].x * shrink, monacoPath[0].y * shrink)
    monacoPath.slice(1).forEach(p => inner.lineTo(p.x * shrink, p.y * shrink))
    inner.lineTo(monacoPath[0].x * shrink, monacoPath[0].y * shrink)
    outer.holes.push(inner)
    return outer
  }, [])

  const geometry = React.useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.2,
      bevelEnabled: false,
    })
    geo.rotateX(-Math.PI / 2)
    geo.computeVertexNormals()
    return geo
  }, [shape])

  const stripeTexture = React.useMemo(() => {
    const size = 64
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = '#ff0000'
    ctx.fillRect(0, 0, size / 2, size)
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(size / 2, 0, size / 2, size)
    const tex = new THREE.CanvasTexture(canvas)
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(40, 1)
    return tex
  }, [])

  const materials = React.useMemo(
    () => [
      new THREE.MeshStandardMaterial({ color: '#333333' }),
      new THREE.MeshStandardMaterial({ color: '#333333' }),
      new THREE.MeshStandardMaterial({ map: stripeTexture }),
    ],
    [stripeTexture]
  )

  return (
    <mesh geometry={geometry} material={materials} position={[0, 0.05, 0]} castShadow receiveShadow />
  )
}

const OrbitingBox = ({ color, offset }: { color: string; offset: number }) => {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.3 + offset
    const radius = 4
    const x = radius * Math.cos(t)
    const z = radius * Math.sin(t)
    if (ref.current) {
      ref.current.position.set(x, 1.5, z)
      ref.current.rotation.y = -t + Math.PI / 2
    }
  })
  return (
    <Box ref={ref} args={[0.3, 0.3, 0.3]} castShadow>
      <meshStandardMaterial color={color} />
    </Box>
  )
}

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
        {[
          { color: 'orange', offset: 0 },
          { color: 'green', offset: (2 * Math.PI) / 3 },
          { color: 'blue', offset: (4 * Math.PI) / 3 },
        ].map((b, i) => (
          <OrbitingBox key={i} color={b.color} offset={b.offset} />
        ))}
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

