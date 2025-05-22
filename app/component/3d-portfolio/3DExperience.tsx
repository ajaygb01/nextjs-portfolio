import React, { useMemo, useRef, useState, ComponentProps } from 'react'; // Added ComponentProps here
import { Line } from '@react-three/drei'; // SphereProps removed
import * as THREE from 'three';
import { Experience } from '../../state/initialState'; // TODO: This path might need alias update later
import { ThreeEvent, useFrame } from '@react-three/fiber'; // Removed ComponentProps from here

interface ExperienceNodeProps extends ComponentProps<'mesh'> { // Changed SphereProps to ComponentProps<'mesh'>
  experience: Experience;
  nodePosition: THREE.Vector3;
  onClick: (event: ThreeEvent<MouseEvent>, experience: Experience, position: THREE.Vector3) => void;
}

const ExperienceNode: React.FC<ExperienceNodeProps> = ({ experience, nodePosition, onClick, ...sphereProps }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const initialColor = useRef(new THREE.Color('purple'));

  useFrame(() => {
    if (meshRef.current) {
      const targetScale = hovered ? 1.3 : 1; // Slightly larger hover scale for nodes
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

      if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
        const material = meshRef.current.material as THREE.MeshStandardMaterial;
        const targetEmissive = hovered ? initialColor.current.clone().multiplyScalar(0.4) : new THREE.Color(0x000000);
        material.emissive.lerp(targetEmissive, 0.1);
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      // args prop removed as sphereGeometry child is present
      position={nodePosition}
      onClick={(event) => onClick(event, experience, nodePosition)}
      onPointerOver={(event) => { event.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer';}}
      onPointerOut={(event) => { event.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto';}}
      {...sphereProps} // Spread other sphere props
      castShadow
      receiveShadow
    >
      <sphereGeometry args={[0.2, 16, 16]} /> {/* Ensure geometry is defined */}
      <meshStandardMaterial color={initialColor.current} />
    </mesh>
  );
};


interface ThreeDExperienceProps {
  experiences: Experience[];
  onExperienceNodeClick: (experience: Experience, position: THREE.Vector3) => void;
}

const TIMELINE_Z_DEPTH = -2; 
const NODE_SPACING_X = 2.5;
const NODE_BASE_Y = -1; 

const ThreeDExperience: React.FC<ThreeDExperienceProps> = ({
  experiences,
  onExperienceNodeClick,
}) => {
  const nodePositions = useMemo(() => {
    return experiences.map((exp, i) => new THREE.Vector3(i * NODE_SPACING_X - ((experiences.length -1) * NODE_SPACING_X / 2) , NODE_BASE_Y, TIMELINE_Z_DEPTH));
  }, [experiences]);

  const linePoints = useMemo(() => {
    const points = [];
    for (let i = 0; i < nodePositions.length - 1; i++) {
      points.push([nodePositions[i], nodePositions[i + 1]] as [THREE.Vector3, THREE.Vector3]);
    }
    return points;
  }, [nodePositions]);

  const handleNodeClick = (event: ThreeEvent<MouseEvent>, experience: Experience, position: THREE.Vector3) => {
    event.stopPropagation();
    onExperienceNodeClick(experience, position.clone()); 
  };

  return (
    <group>
      {experiences.map((exp, i) => (
        <ExperienceNode
          key={`exp-node-${i}`}
          experience={exp}
          nodePosition={nodePositions[i]}
          onClick={handleNodeClick}
          // No explicit args here, as they are defined within ExperienceNode
        />
      ))}
      {linePoints.map((segment, i) => (
         <Line
           key={`exp-line-${i}`}
           points={segment}
           color="white"
           lineWidth={1.5}
         />
      ))}
    </group>
  );
};

export default ThreeDExperience;
