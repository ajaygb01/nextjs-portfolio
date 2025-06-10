import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react' // Added React import
import * as THREE from 'three'

interface MovingCarProps {
  modelUrl: string
  initialT: number
  trackPathCurve: THREE.CatmullRomCurve3
  speed?: number
}

export function MovingCar({
  modelUrl,
  initialT,
  trackPathCurve,
  speed = 0.1
}: MovingCarProps) {
  const gltf = useGLTF(modelUrl) as any
  const ref = useRef<THREE.Group>(null!)
  // The track's top surface is at y = 0.05 (group elevation) + 0.2 (track thickness) = 0.25.
  // The car is scaled by 0.2.
  // fixedY = 0.3 implies the car's center is 0.05 units above the track surface.
  // This means the car's scaled height from its pivot point to its top + bottom is 0.1.
  const fixedY = 0.15 + 0.3 / 2 // This equals 0.3

  useFrame(({ clock }) => {
    if (!trackPathCurve || !ref.current) return; // Added check for ref.current

    const t = (clock.getElapsedTime() * speed + initialT) % 1
    const p = trackPathCurve.getPointAt(t)
    const tan = trackPathCurve.getTangentAt(t)

    // world-space mapping
    // p.x and p.y are from the track curve (originally 2D, mapped to XZ plane by track rotation)
    // fixedY is the world Y coordinate
    ref.current.position.set(p.x, fixedY, p.y)
    ref.current.lookAt(p.x + tan.x, fixedY, p.y + tan.y)
  })

  return (
    <primitive
      ref={ref}
      object={gltf.scene}
      scale={0.2}            // tweak so car sits nicely on 0.8-wide track
      castShadow
      receiveShadow
    />
  )
}

// Preload the model (optional, but good practice)
// useGLTF.preload(modelUrl) // This line would cause an error here because modelUrl is a prop
// If preloading is desired for specific models, it should be done where modelUrl is static,
// e.g., in the parent component or by passing a statically known URL here if appropriate.
