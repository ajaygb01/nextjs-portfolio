import React, { useRef, useState } from 'react';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import { Sphere as DreiSphere } from '@react-three/drei';
import * as THREE from 'three';

interface MoonSphereProps {
  onClick: (event: ThreeEvent<MouseEvent>) => void;
  position: [number, number, number];
}

const MoonSphere: React.FC<MoonSphereProps> = ({ onClick, position }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const initialColor = useRef(new THREE.Color('lightgray'));

  useFrame(() => {
    if (meshRef.current) {
      const targetScale = hovered ? 1.2 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      
      if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
        const material = meshRef.current.material as THREE.MeshStandardMaterial;
        const targetEmissive = hovered ? initialColor.current.clone().multiplyScalar(0.2) : new THREE.Color(0x000000);
        material.emissive.lerp(targetEmissive, 0.1);
      }
    }
  });

  return (
    <DreiSphere 
      ref={meshRef}
      args={[0.3, 32, 32]}
      position={position}
      onClick={onClick}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto'; }}
    >
      <meshStandardMaterial color={initialColor.current} />
    </DreiSphere>
  );
};

export default MoonSphere;
