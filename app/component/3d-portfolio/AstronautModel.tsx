import React, { useRef, useState } from 'react';
import { Text } from '@react-three/drei';
import { Modal, Paper, Typography, Button } from '@mui/material';
import NameGlowEffect from './NameGlowEffect'; // Import the glow effect
import { useFrame, ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';

interface AstronautModelProps {
  name: string;
  onToggleBio: (position: THREE.Vector3) => void;
}

const AstronautModel: React.FC<AstronautModelProps> = ({ name, onToggleBio }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [clickCount, setClickCount] = useState(0);
  const [showEasterEggModal, setShowEasterEggModal] = useState(false);
  const [hovered, setHovered] = useState(false);
  const initialColor = useRef(new THREE.Color('red')); // Store initial color

  // Waving Animation & Hover Effect
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 2) * 0.3;

      // Lerp scale for smooth hover effect
      const targetScale = hovered ? 1.1 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      
      // Lerp emissive color for glow effect
      const targetEmissive = hovered ? initialColor.current.clone().multiplyScalar(0.3) : new THREE.Color(0x000000);
      if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
        (meshRef.current.material as THREE.MeshStandardMaterial).emissive.lerp(targetEmissive, 0.1);
      }
    }
  });

  const handleAstronautClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    const position = new THREE.Vector3();
    meshRef.current.getWorldPosition(position);
    position.y += 1.2;
    onToggleBio(position);

    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);
    if (newClickCount === 3) {
      setShowEasterEggModal(true);
      setClickCount(0);
    }
  };
  
  const handleCloseEasterEggModal = () => {
    setShowEasterEggModal(false);
  };

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

  return (
    <group> {/* Main group for astronaut and related elements */}
      <mesh 
        ref={meshRef} 
        onClick={handleAstronautClick} 
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        castShadow 
        receiveShadow
        // Astronaut mesh is at the origin of this main group
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        {/* Ensure material is MeshStandardMaterial for emissive property */}
        <meshStandardMaterial color={initialColor.current} /> 
      </mesh>
      
      {/* Group for Text and Glow Effect, positioned together above the astronaut */}
      <group position={[0, 0.8, 0]}> 
        <Text
          color="white"
          anchorX="center"
          anchorY="middle"
          fontSize={0.2}
          position={[0, 0, 0]} // Positioned at the origin of this parent group
        >
          {name}
        </Text>
        {/* Glow effect positioned slightly behind the text within this group */}
        <group position={[0, 0, -0.05]}>
          <NameGlowEffect />
        </group>
      </group>

      <Modal
        open={showEasterEggModal}
        onClose={handleCloseEasterEggModal}
        aria-labelledby="easter-egg-modal-title"
        aria-describedby="easter-egg-modal-description"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}
        onClick={(e) => e.stopPropagation()}
      >
        <Paper sx={{ padding: 4, textAlign: 'center' }}>
          <Typography variant="h5" id="easter-egg-modal-title">
            Productivity Lost in Space 🛸
          </Typography>
          <Button onClick={handleCloseEasterEggModal} sx={{ marginTop: 2 }} variant="contained">
            Close
          </Button>
        </Paper>
      </Modal>
    </group>
  );
};

export default AstronautModel;
