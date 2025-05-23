import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const STAR_COUNT = 200; // Number of stars
const STAR_SIZE = 0.05; // Base size of stars
const STAR_SPEED_MIN = 0.02;
const STAR_SPEED_MAX = 0.05;
const BOUNDS_X = 20;
const BOUNDS_Y = 15;
const BOUNDS_Z_START = -10; // Start further back
const BOUNDS_Z_END = 10;   // End closer to the camera, but still likely behind content

interface Star {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  size: number;
}

const ShootingStars: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null!);

  const stars = useMemo<Star[]>(() => {
    const starArray: Star[] = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      const x = THREE.MathUtils.randFloatSpread(BOUNDS_X); // Spread across X
      const y = THREE.MathUtils.randFloat(BOUNDS_Y * 0.2, BOUNDS_Y); // Start higher up
      const z = THREE.MathUtils.randFloat(BOUNDS_Z_START, BOUNDS_Z_START + (BOUNDS_Z_END - BOUNDS_Z_START) / 2); // Start in the back half

      starArray.push({
        position: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(
          THREE.MathUtils.randFloat(-0.01, 0.01), // Slight horizontal drift
          THREE.MathUtils.randFloat(STAR_SPEED_MIN, STAR_SPEED_MAX) * -1, // Move downwards
          THREE.MathUtils.randFloat(STAR_SPEED_MIN / 2, STAR_SPEED_MAX / 2) // Move towards camera
        ),
        size: THREE.MathUtils.randFloat(STAR_SIZE * 0.5, STAR_SIZE * 1.5),
      });
    }
    return starArray;
  }, []);

  const positions = useMemo(() => {
    const posArray = new Float32Array(STAR_COUNT * 3);
    stars.forEach((star, i) => {
      star.position.toArray(posArray, i * 3);
    });
    return posArray;
  }, [stars]);

  const sizes = useMemo(() => {
    const sizeArray = new Float32Array(STAR_COUNT);
    stars.forEach((star, i) => {
      sizeArray[i] = star.size;
    });
    return sizeArray;
  }, [stars]);


  useFrame((state, delta) => {
    if (pointsRef.current) {
      const currentPositions = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      
      for (let i = 0; i < STAR_COUNT; i++) {
        const star = stars[i];
        star.position.addScaledVector(star.velocity, delta * 60); // Multiply by delta for frame rate independence, 60 is a factor to keep speeds reasonable

        // Reset logic
        if (star.position.y < -BOUNDS_Y / 2 || star.position.z > BOUNDS_Z_END) {
          star.position.x = THREE.MathUtils.randFloatSpread(BOUNDS_X);
          star.position.y = BOUNDS_Y; // Reset to top
          star.position.z = THREE.MathUtils.randFloat(BOUNDS_Z_START, BOUNDS_Z_START + (BOUNDS_Z_END - BOUNDS_Z_START) / 2); // Reset to back
          
          // Randomize velocity and size slightly on reset for variety
          star.velocity.set(
            THREE.MathUtils.randFloat(-0.01, 0.01),
            THREE.MathUtils.randFloat(STAR_SPEED_MIN, STAR_SPEED_MAX) * -1,
            THREE.MathUtils.randFloat(STAR_SPEED_MIN/2, STAR_SPEED_MAX/2) 
          );
          star.size = THREE.MathUtils.randFloat(STAR_SIZE * 0.5, STAR_SIZE * 1.5);
          // Update size attribute if dynamic sizing is used (requires shader modification or per-point size in material if available)
          // For now, size is static per star after init for this PointsMaterial.
        }
        currentPositions.setXYZ(i, star.position.x, star.position.y, star.position.z);
      }
      currentPositions.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={STAR_COUNT}
          array={positions}
          itemSize={3}
          usage={THREE.DynamicDrawUsage}
        />
        {/* For individual star sizes, you'd typically use a custom shader or specific features of PointsMaterial if available */}
        {/* <bufferAttribute attach="attributes-size" count={STAR_COUNT} array={sizes} itemSize={1} /> */}
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        size={STAR_SIZE} // This is a global size for all points if attributes-size is not used by shader
        color="white"
        transparent
        opacity={0.8}
        sizeAttenuation // Points get smaller further away
        blending={THREE.AdditiveBlending} // Brighter where stars overlap
      />
    </points>
  );
};

export default ShootingStars;
