import React, { useRef, useState, useEffect } from 'react'; // Added useEffect here
import { useFrame, ThreeEvent } from '@react-three/fiber'; // MeshProps can be inferred
import * as THREE from 'three';

interface OrbitingPlanetProps extends Omit<React.JSX.IntrinsicElements['mesh'], 'args'> { // Changed to React.JSX
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
  const [clicked, setClicked] = useState(false); // For click feedback
  const baseScale = useRef(new THREE.Vector3(1, 1, 1)); // Use baseScale to store the initial scale from props

  // Initialize baseScale from meshProps.scale
  useEffect(() => {
    let initialScale = new THREE.Vector3(1, 1, 1);
    if (meshProps.scale) {
      if (typeof meshProps.scale === 'number') {
        initialScale.set(meshProps.scale, meshProps.scale, meshProps.scale);
      } else if (meshProps.scale instanceof THREE.Vector3) {
        initialScale.copy(meshProps.scale);
      } else if (Array.isArray(meshProps.scale) && meshProps.scale.length === 3) {
        initialScale.set(meshProps.scale[0], meshProps.scale[1], meshProps.scale[2]);
      }
    }
    baseScale.current.copy(initialScale);
    // Also apply this initial scale to the mesh directly if not relying on useFrame for the very first frame
    if (meshRef.current) {
        meshRef.current.scale.copy(baseScale.current);
    }
  }, [meshProps.scale]);


  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Orbiting logic
      const angle = initialAngle + clock.getElapsedTime() * orbitSpeed;
      const x = orbitRadius * Math.cos(angle);
      const z = orbitRadius * Math.sin(angle);
      meshRef.current.position.set(x, 0, z);

      // Determine target scale for hover and click effects
      let targetScaleVec = baseScale.current.clone();
      if (clicked) {
        targetScaleVec = baseScale.current.clone().multiplyScalar(0.85); // Shrink more noticeably
      } else if (hovered) {
        targetScaleVec = baseScale.current.clone().multiplyScalar(1.2); // Enlarge on hover
      }
      meshRef.current.scale.lerp(targetScaleVec, 0.1);

      // Reset clicked state after a short duration
      if (clicked) {
        setTimeout(() => setClicked(false), 100); // Duration of the shrink effect
      }
    }
  });
  
  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
    if (onPointerOver) onPointerOver(event);
  };

  const handlePointerOut = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHovered(false);
    document.body.style.cursor = 'auto';
    if (onPointerOut) onPointerOut(event);
  };

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    setClicked(true); // Trigger click visual feedback
    // If an external onClick is provided, call it after a short delay for visual feedback
    if (onClick) {
      setTimeout(() => onClick(event), 50); // Small delay for visual feedback
    }
  };

  return (
    <mesh
      ref={meshRef}
      {...meshProps} // Spread other mesh props
      onClick={handleClick} // Use internal handler to add feedback
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      // Initial scale is set by useEffect or within useFrame if meshRef is ready
    >
      <sphereGeometry args={[size, 32, 32]} />
      {/* Emissive color for hover, potentially add a brief flash on click if desired */}
      <meshStandardMaterial 
        color={color} 
        emissive={hovered || clicked ? new THREE.Color(color).multiplyScalar(0.4) : new THREE.Color(0x000000)} 
        emissiveIntensity={hovered || clicked ? 1.5 : 0} // Slightly boost emissive intensity on hover/click
      />
    </mesh>
  );
};

export default OrbitingPlanet;
