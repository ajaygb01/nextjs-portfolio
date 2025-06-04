"use client"

import React, { Suspense } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const Model = ({ url }: { url: string }) => {
    const gltf = useLoader(GLTFLoader, url)
    return <primitive object={gltf.scene} />
}

const ModelViewer = ({ url }: { url: string }) => {
    return (
        <div className="glass-card w-full h-64 md:h-96">
            <Canvas camera={{ position: [0, 0, 3] }} className="rounded-xl">
                <ambientLight intensity={0.5} />
                <Suspense fallback={null}>
                    <Model url={url} />
                </Suspense>
                <OrbitControls />
            </Canvas>
        </div>
    )
}

export default ModelViewer
