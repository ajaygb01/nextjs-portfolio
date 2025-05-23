import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 75;
const PARTICLE_SIZE = 0.025; // Slightly larger for more noticeable glow
const GLOW_AREA_WIDTH = 0.8; // Approximate width for an average name
const GLOW_AREA_HEIGHT = 0.25; // Approximate height based on fontSize 0.2
const GLOW_AREA_DEPTH = 0.1;

interface Particle {
  initialPosition: THREE.Vector3;
  offset: number; // For animation variation
}

const NameGlowEffect: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null!);
  const materialRef = useRef<THREE.PointsMaterial>(null!);

  const particles = useMemo<Particle[]>(() => {
    const particleArray: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particleArray.push({
        initialPosition: new THREE.Vector3(
          THREE.MathUtils.randFloatSpread(GLOW_AREA_WIDTH),
          THREE.MathUtils.randFloatSpread(GLOW_AREA_HEIGHT),
          THREE.MathUtils.randFloatSpread(GLOW_AREA_DEPTH)
        ),
        offset: Math.random() * Math.PI * 2, // Random offset for animation
      });
    }
    return particleArray;
  }, []);

  const positions = useMemo(() => {
    const posArray = new Float32Array(PARTICLE_COUNT * 3);
    particles.forEach((particle, i) => {
      particle.initialPosition.toArray(posArray, i * 3);
    });
    return posArray;
  }, [particles]);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      // Pulsating opacity for all particles together
      const time = clock.getElapsedTime();
      materialRef.current.opacity = (Math.sin(time * 2 + particles[0].offset) + 1) / 2 * 0.5 + 0.3; // Varies between 0.3 and 0.8
    }
    // Optional: Add individual particle movement if desired
    // if (pointsRef.current) {
    //   const currentPositions = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    //   particles.forEach((particle, i) => {
    //     const x = particle.initialPosition.x + Math.sin(clock.elapsedTime + particle.offset) * 0.01;
    //     const y = particle.initialPosition.y + Math.cos(clock.elapsedTime + particle.offset) * 0.01;
    //     currentPositions.setXYZ(i, x, y, particle.initialPosition.z);
    //   });
    //   currentPositions.needsUpdate = true;
    // }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        attach="material"
        size={PARTICLE_SIZE}
        color="white" // Light cyan or a soft blue could also work
        transparent
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        depthWrite={false} // Important for blending, and often for transparent effects
      />
    </points>
  );
};

export default NameGlowEffect;
