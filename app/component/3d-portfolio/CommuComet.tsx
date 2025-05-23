import React, { useRef, useState } from 'react';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import { Sphere as DreiSphere } from '@react-three/drei';
import * as THREE from 'three';

interface CommuCometProps {
  onClick: (event: ThreeEvent<MouseEvent>) => void;
  position: [number, number, number];
}

const CommuComet: React.FC<CommuCometProps> = ({ onClick, position }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const initialEmissiveIntensity = 0.7;

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 2) * 0.2; // Bobbing
      
      const targetScale = hovered ? 1.2 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      
      if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
        const material = meshRef.current.material as THREE.MeshStandardMaterial;
        const targetIntensity = hovered ? initialEmissiveIntensity * 2 : initialEmissiveIntensity;
        material.emissiveIntensity = THREE.MathUtils.lerp(material.emissiveIntensity, targetIntensity, 0.1);
      }
    }
  });

  return (
    <DreiSphere 
      ref={meshRef} 
      args={[0.4, 32, 32]} 
      position={position} 
      onClick={onClick}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto'; }}
    >
      <meshStandardMaterial color="yellow" emissive="yellow" emissiveIntensity={initialEmissiveIntensity} />
    </DreiSphere>
  );
};

export default CommuComet;
