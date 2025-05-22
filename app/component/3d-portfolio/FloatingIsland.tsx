import React, { useRef } from 'react';
import { Cylinder, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingIslandProps {
  name: string;
  bio: string;
  position?: [number, number, number];
}

const FloatingIsland: React.FC<FloatingIslandProps> = ({
  name,
  bio,
  position = [0, -2, 0], // Default position slightly below origin
}) => {
  const islandRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    // Gentle floating animation
    if (islandRef.current) {
      islandRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <group ref={islandRef} position={position}>
      {/* Island Base */}
      <Cylinder args={[1.5, 2, 0.5, 16]} castShadow receiveShadow>
        <meshStandardMaterial color="#8B4513" /> {/* Brown */}
      </Cylinder>
      <Cylinder args={[1.4, 1.4, 0.3, 16]} position={[0, 0.25, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="green" /> {/* Grass */}
      </Cylinder>

      {/* User Name */}
      <Text
        color="white"
        anchorX="center"
        anchorY="middle"
        fontSize={0.3}
        position={[0, 0.8, 0]}
        outlineWidth={0.02}
        outlineColor="black"
      >
        {name}
      </Text>

      {/* User Bio - Simple text for now, could be enhanced with Html */}
      <Text
        color="white"
        anchorX="center"
        anchorY="top"
        fontSize={0.12}
        position={[0, 0.6, 0]}
        maxWidth={2.5}
        textAlign="center"
        lineHeight={1.3}
        outlineWidth={0.01}
        outlineColor="black"
      >
        {bio}
      </Text>
    </group>
  );
};

export default FloatingIsland;
