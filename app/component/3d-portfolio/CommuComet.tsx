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
  const [clicked, setClicked] = useState(false); // For click feedback
  const initialEmissiveIntensity = 0.7;
  const baseScale = useRef(new THREE.Vector3(1, 1, 1)); // Base scale for the comet

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Bobbing animation
      meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 2) * 0.2; 
      
      // Determine target scale for hover and click effects
      let targetScaleVec = baseScale.current.clone();
      if (clicked) {
        targetScaleVec = baseScale.current.clone().multiplyScalar(0.8); // Shrink on click
      } else if (hovered) {
        targetScaleVec = baseScale.current.clone().multiplyScalar(1.2); // Enlarge on hover
      }
      meshRef.current.scale.lerp(targetScaleVec, 0.1);
      
      // Emissive intensity logic
      if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
        const material = meshRef.current.material as THREE.MeshStandardMaterial;
        let targetIntensity = initialEmissiveIntensity;
        if (clicked) {
          targetIntensity = initialEmissiveIntensity * 2.5; // Brighter flash on click
        } else if (hovered) {
          targetIntensity = initialEmissiveIntensity * 1.8; // Glow on hover
        }
        material.emissiveIntensity = THREE.MathUtils.lerp(material.emissiveIntensity, targetIntensity, 0.15);
      }

      // Reset clicked state after a short duration
      if (clicked) {
        setTimeout(() => setClicked(false), 120); // Duration of the click effect
      }
    }
  });

  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHovered(false);
    document.body.style.cursor = 'auto';
  };

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    setClicked(true); 
    // If an external onClick is provided, call it after a short delay
    if (onClick) {
      setTimeout(() => onClick(event), 60); 
    }
  };

  return (
    <DreiSphere 
      ref={meshRef} 
      args={[0.4, 32, 32]} 
      position={position} 
      onClick={handleClick} // Use internal handler
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      scale={baseScale.current} // Set initial scale
    >
      <meshStandardMaterial color="yellow" emissive="yellow" emissiveIntensity={initialEmissiveIntensity} />
    </DreiSphere>
  );
};

export default CommuComet;
