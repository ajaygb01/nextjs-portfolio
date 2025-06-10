"use client"

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Plane, Box } from '@react-three/drei' // Will add more imports later
import React, { useMemo, useRef } from 'react'
import * as THREE from 'three'

// Monaco track shape - simplified and approximated
// Scaled to fit roughly within a 4-unit radius circle
const monacoTrackShape = [
  new THREE.Vector2(0, 3.5), // Start/Finish straight (approx)
  new THREE.Vector2(-1, 4), // Sainte Devote
  new THREE.Vector2(-2.5, 3.5), // Beau Rivage
  new THREE.Vector2(-3.5, 2), // Massenet
  new THREE.Vector2(-3, 0.5), // Casino Square
  new THREE.Vector2(-3.5, -1), // Mirabeau Haute
  new THREE.Vector2(-2.5, -2.2), // Fairmont Hairpin (Loews)
  new THREE.Vector2(-1.5, -1.5), // Mirabeau Bas
  new THREE.Vector2(-2, -3.5), // Portier
  new THREE.Vector2(0, -4), // Tunnel entrance (approx)
  new THREE.Vector2(2.5, -3.5), // Nouvelle Chicane (exit)
  new THREE.Vector2(3.5, -2), // Tabac
  new THREE.Vector2(3, 0), // Swimming Pool complex (entry)
  new THREE.Vector2(2, 1.5), // Swimming Pool complex (exit)
  new THREE.Vector2(3, 3), // La Rascasse
  new THREE.Vector2(1.5, 3.8), // Anthony Noghes
  new THREE.Vector2(0, 3.5) // Close the loop
];

// Placeholder for Track component
// const Track = () => { ... }

const Track = () => {
  const trackGeometry = useMemo(() => {
    const points = monacoTrackShape.map(p => new THREE.Vector3(p.x, p.y, 0));
    // Using 'centripetal' for CatmullRomCurve3 is often better for uniform speed and avoiding cusps.
    // Tension parameter (0.15) is for 'catmullrom' type, not typically used with 'centripetal'.
    const extrudePath = new THREE.CatmullRomCurve3(points, true, 'centripetal');

    const rectWidth = 0.4; // Width of the track surface
    const rectHeight = 0.2; // Thickness of the track slab

    const rectShape = new THREE.Shape();
    // Define the rectangle centered at (0,0).
    // Its local Y axis will align with world Y for thickness, after mesh rotation.
    // Its local X axis will be the width across the track.
    rectShape.moveTo(-rectWidth / 2, -rectHeight / 2);
    rectShape.lineTo(rectWidth / 2, -rectHeight / 2);
    rectShape.lineTo(rectWidth / 2, rectHeight / 2);
    rectShape.lineTo(-rectWidth / 2, rectHeight / 2);
    rectShape.closePath();

    const extrudeSettings = {
        steps: 200, // Number of points on the extruded path
        bevelEnabled: false,
        extrudePath: extrudePath
    };

    return new THREE.ExtrudeGeometry(rectShape, extrudeSettings);
  }, []); // monacoTrackShape is a global const, so dependency array is empty.

  const asphaltMaterial = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.3, roughness: 0.8 }); // Dark asphalt with some texture

  // The mesh containing the track geometry is rotated.
  // The original path was in the XY plane (Vector3(p.x, p.y, 0)).
  // Rotation by [-Math.PI / 2, 0, 0] transforms: X -> X, Y -> Z, Z -> -Y.
  // So the path now lies on the XZ plane in world coordinates.
  // The rectShape was defined in its own XY plane (width along X, height along Y).
  // After this rotation, the shape's Y-axis (rectHeight, thickness) aligns with the world's Y-axis.
  // The shape's X-axis (rectWidth) is perpendicular to the path, forming the track width.
  return (
    <mesh geometry={trackGeometry} material={asphaltMaterial} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow />
  );
};

// Placeholder for MovingBox component
// const MovingBox = ({ color, angleOffset }) => { ... }

interface MovingBoxProps {
  boxColor: THREE.ColorRepresentation;
  angleOffset: number; // Initial angle in radians
  orbitRadius: number; // Radius of the orbit, should match track's effective radius for visual centering
}

const MovingBox = ({ boxColor, angleOffset, orbitRadius }: MovingBoxProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const fixedYPosition = 1.5; // Fixed height above the ground plane

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    // Adjust speed by changing the multiplier for elapsedTime
    const currentAngle = elapsedTime * 0.5 + angleOffset;

    // Calculate position on a circle in the XZ plane
    const x = orbitRadius * Math.cos(currentAngle);
    const z = orbitRadius * Math.sin(currentAngle);

    if (meshRef.current) {
      meshRef.current.position.set(x, fixedYPosition, z);
      // Orient the box to be tangent to the circular path
      // The tangent direction is (-sin(angle), 0, cos(angle)) for XZ plane orbit
      // We want the box's local Z-axis (or X-axis depending on model) to point along tangent
      meshRef.current.rotation.y = -currentAngle + Math.PI / 2; // Add PI/2 if box's forward is along its Z axis
    }
  });

  return (
    <Box ref={meshRef} args={[0.3, 0.3, 0.3]} castShadow>
      <meshStandardMaterial color={boxColor} />
    </Box>
  );
};

export default function F1MonacoScene() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Canvas shadows camera={{ position: [0, 3, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={0.8} castShadow />
        <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
          <meshStandardMaterial color="black" />
        </Plane>
        <group position={[0, 0.05, 0]}> {/* This group elevates the track to y=0.05 */}
          <Track />
        </group>
        {/* Orbiting Boxes */}
        <MovingBox boxColor="red" angleOffset={0} orbitRadius={3.5} />
        <MovingBox boxColor="green" angleOffset={Math.PI * 2 / 3} orbitRadius={3.5} />
        <MovingBox boxColor="blue" angleOffset={Math.PI * 4 / 3} orbitRadius={3.5} />
        <OrbitControls />
      </Canvas>
    </div>
  )
}
