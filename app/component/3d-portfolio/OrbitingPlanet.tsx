import React, { useRef, useState } from 'react';
import { useFrame, ThreeEvent } from '@react-three/fiber'; // MeshProps can be inferred
import * as THREE from 'three';

interface OrbitingPlanetProps extends Omit<JSX.IntrinsicElements['mesh'], 'args'> { // More precise props
  size?: number;
  color?: string;
  orbitRadius?: number;
  orbitSpeed?: number;
  initialAngle?: number;
  onClick?: (event: ThreeEvent<MouseEvent>) => void;
  onPointerOver?: (event: ThreeEvent<PointerEvent>) => void; // Ensure these are accepted
  onPointerOut?: (event: ThreeEvent<PointerEvent>) => void;
}

const OrbitingPlanet: React.FC<OrbitingPlanetProps> = ({
  size = 1,
  color = 'blue',
  orbitRadius = 5,
  orbitSpeed = 0.01,
  initialAngle = 0,
  onClick,
  onPointerOver, // Capture from props
  onPointerOut,  // Capture from props
  ...meshProps
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const originalScale = useRef(new THREE.Vector3(1, 1, 1)); // Store original scale

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const angle = initialAngle + clock.getElapsedTime() * orbitSpeed;
      const x = orbitRadius * Math.cos(angle);
      const z = orbitRadius * Math.sin(angle);
      meshRef.current.position.set(x, 0, z);

      // Lerp scale for smooth hover effect
      const targetScale = hovered ? 1.2 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });
  
  // Store initial scale when the component mounts or props change
  useEffect(() => {
    if (meshRef.current && meshProps.scale) {
        if (typeof meshProps.scale === 'number') {
            originalScale.current.set(meshProps.scale, meshProps.scale, meshProps.scale);
        } else if (meshProps.scale instanceof THREE.Vector3) {
            originalScale.current.copy(meshProps.scale);
        } else if (Array.isArray(meshProps.scale) && meshProps.scale.length === 3) {
             originalScale.current.set(meshProps.scale[0],meshProps.scale[1],meshProps.scale[2]);
        }
    } else {
        originalScale.current.set(1,1,1);
    }
  }, [meshProps.scale]);


  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
    if (onPointerOver) onPointerOver(event); // Call prop's handler if it exists
  };

  const handlePointerOut = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHovered(false);
    document.body.style.cursor = 'auto';
    if (onPointerOut) onPointerOut(event); // Call prop's handler
  };

  return (
    <mesh
      ref={meshRef}
      {...meshProps} // Spread other mesh props (like onClick from parent)
      onClick={onClick} // Ensure onClick from parent is passed
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      scale={originalScale.current} // Set initial scale
    >
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} emissive={hovered ? new THREE.Color(color).multiplyScalar(0.3) : new THREE.Color(0x000000)} />
    </mesh>
  );
};

export default OrbitingPlanet;
// useEffect import from React
import { useEffect } from 'react';
