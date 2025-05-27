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
  const [clicked, setClicked] = useState(false); // For click feedback
  const initialColor = useRef(new THREE.Color('lightgray'));
  const baseScale = useRef(new THREE.Vector3(1, 1, 1)); // Base scale

  useFrame(() => {
    if (meshRef.current) {
      // Determine target scale for hover and click effects
      let targetScaleVec = baseScale.current.clone();
      if (clicked) {
        targetScaleVec = baseScale.current.clone().multiplyScalar(0.8); // Shrink on click
      } else if (hovered) {
        targetScaleVec = baseScale.current.clone().multiplyScalar(1.25); // Enlarge slightly more on hover
      }
      meshRef.current.scale.lerp(targetScaleVec, 0.1);
      
      // Emissive effect
      if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
        const material = meshRef.current.material as THREE.MeshStandardMaterial;
        let targetEmissive = new THREE.Color(0x000000);
        if (clicked) {
          targetEmissive = initialColor.current.clone().multiplyScalar(0.8); // Bright flash on click
        } else if (hovered) {
          targetEmissive = initialColor.current.clone().multiplyScalar(0.5); // More noticeable glow on hover
        }
        material.emissive.lerp(targetEmissive, 0.15); // Slightly faster lerp for emissive
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
    if (onClick) {
      setTimeout(() => onClick(event), 60); // Delay for visual feedback
    }
  };

  return (
    <DreiSphere 
      ref={meshRef}
      args={[0.3, 32, 32]} // Moon size
      position={position}
      onClick={handleClick} // Use internal handler
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      scale={baseScale.current} // Set initial scale
    >
      <meshStandardMaterial color={initialColor.current} />
    </DreiSphere>
  );
};

export default MoonSphere;
