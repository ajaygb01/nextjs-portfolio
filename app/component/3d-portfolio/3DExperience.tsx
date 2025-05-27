import React, { useMemo, useRef, useState, ComponentProps } from 'react'; // Added ComponentProps here
import { Line } from '@react-three/drei'; // SphereProps removed
import * as THREE from 'three';
import { Experience } from '../../state/initialState'; // TODO: This path might need alias update later
import { ThreeEvent, useFrame } from '@react-three/fiber'; // Removed ComponentProps from here

interface ExperienceNodeProps extends ComponentProps<'mesh'> { // Changed SphereProps to ComponentProps<'mesh'>
  experience: Experience;
  nodePosition: THREE.Vector3;
  // onClick prop removed from here to avoid conflict with MeshProps' onClick
  // The actual click handling logic will be passed via a differently named prop
  // or handled by a wrapper if direct mesh onClick is needed.
  // For this specific case, the parent `ThreeDExperience` passes `handleNodeClick`
  // which will be assigned to a prop like `onNodeClick` in this component.
}

// Renamed the incoming 'onClick' prop to 'onNodeClick' to avoid conflict and make its purpose clearer
const ExperienceNode: React.FC<ExperienceNodeProps & { onNodeClick: (event: ThreeEvent<MouseEvent>, experience: Experience, position: THREE.Vector3) => void }> = 
  ({ experience, nodePosition, onNodeClick, ...sphereProps }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false); // For click feedback
  const initialColor = useRef(new THREE.Color('purple'));
  const baseScale = useRef(new THREE.Vector3(1, 1, 1)); // Base scale

  useFrame(() => {
    if (meshRef.current) {
      // Determine target scale for hover and click effects
      let targetScaleVec = baseScale.current.clone();
      if (clicked) {
        targetScaleVec = baseScale.current.clone().multiplyScalar(0.75); // Shrink on click
      } else if (hovered) {
        targetScaleVec = baseScale.current.clone().multiplyScalar(1.3); // Enlarge on hover
      }
      meshRef.current.scale.lerp(targetScaleVec, 0.1);

      // Emissive effect
      if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
        const material = meshRef.current.material as THREE.MeshStandardMaterial;
        let targetEmissive = new THREE.Color(0x000000);
        if (clicked) {
          targetEmissive = initialColor.current.clone().multiplyScalar(0.9); // Bright flash on click
        } else if (hovered) {
          targetEmissive = initialColor.current.clone().multiplyScalar(0.5); // More noticeable glow on hover
        }
        material.emissive.lerp(targetEmissive, 0.15);
      }

      // Reset clicked state after a short duration
      if (clicked) {
        setTimeout(() => setClicked(false), 120); // Duration of the click effect
      }
    }
  });
  
  const handleLocalClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    setClicked(true);
    // Call the passed onNodeClick after a short delay for visual feedback
    setTimeout(() => onNodeClick(event, experience, nodePosition), 60);
  };

  return (
    <mesh
      ref={meshRef}
      position={nodePosition}
      onClick={handleLocalClick} // Use internal handler
      onPointerOver={(event) => { event.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer';}}
      onPointerOut={(event) => { event.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto';}}
      {...sphereProps} 
      scale={baseScale.current} // Set initial scale
      castShadow
      receiveShadow
    >
      <sphereGeometry args={[0.2, 16, 16]} /> 
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
          onNodeClick={handleNodeClick} // Prop renamed from onClick to onNodeClick
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
