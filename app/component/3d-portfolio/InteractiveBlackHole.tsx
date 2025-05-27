import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Sphere, Torus } from '@react-three/drei';

interface InteractiveBlackHoleProps {
  position: [number, number, number];
  isActive: boolean; 
  onActivate: () => void; 
  onAnimationComplete: () => void;
  isSoundEffectsEnabled: boolean;
  playSound: (soundFile: string, volume?: number) => void;
}

const ANIMATION_DURATION = 6000; // ms
const CAMERA_PULL_DURATION = 2500; // ms
const PASSAGE_DURATION = 1000; // ms

const InteractiveBlackHole: React.FC<InteractiveBlackHoleProps> = ({
  position,
  isActive,
  onActivate,
  onAnimationComplete,
  isSoundEffectsEnabled, // Destructure new props
  playSound,             // Destructure new props
}) => {
  const { camera, scene } = useThree();
  const blackHoleRef = useRef<THREE.Mesh>(null!);
  const accretionDiskRef = useRef<THREE.Mesh>(null!);
  const animationClock = useRef(new THREE.Clock());

  const originalCameraPosition = useRef(new THREE.Vector3());
  const originalCameraQuaternion = useRef(new THREE.Quaternion());
  const [animationStep, setAnimationStep] = useState<'idle' | 'pulling' | 'passage' | 'completing'>('idle');

  // Black hole shader material
  const blackHoleMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('black') },
      uSwirlIntensity: { value: 0.3 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor;
      uniform float uSwirlIntensity;
      varying vec2 vUv;

      void main() {
        vec2 centeredUv = vUv - 0.5;
        float dist = length(centeredUv);
        float angle = atan(centeredUv.y, centeredUv.x) + uTime * 0.5 + dist * uSwirlIntensity * 2.0;
        float swirl = cos(angle * 10.0) * 0.5 + 0.5; // Create swirling pattern
        
        float intensity = smoothstep(0.5, 0.1, dist); // Dark center, fades out
        vec3 color = uColor * intensity * (0.5 + swirl * 0.5);

        // Add a subtle edge glow
        float edgeGlow = smoothstep(0.4, 0.5, dist) * (1.0 - smoothstep(0.5, 0.51, dist));
        color += vec3(0.1, 0.1, 0.2) * edgeGlow * 2.0; // Bluish edge

        gl_FragColor = vec4(color, intensity + edgeGlow);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
  });

  // Accretion disk material
  const accretionDiskMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xffaa00), // Orange/Yellow
    emissive: new THREE.Color(0xffcc44),
    emissiveIntensity: 1.5,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.7,
  });
  
  useEffect(() => {
    if (isActive && animationStep === 'idle') {
      console.log("Black Hole: Animation sequence started.");
      originalCameraPosition.current.copy(camera.position);
      originalCameraQuaternion.current.copy(camera.quaternion);
      animationClock.current.start();
      setAnimationStep('pulling');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, camera]); // Don't add animationStep here

  useFrame((state, delta) => {
    if (blackHoleRef.current) {
      blackHoleRef.current.rotation.y += 0.005; // Slow rotation
    }
    if (accretionDiskRef.current) {
      accretionDiskRef.current.rotation.z += 0.02;
    }
    blackHoleMaterial.uniforms.uTime.value += delta;

    if (!isActive || animationStep === 'idle') return;

    const elapsedTime = animationClock.current.getElapsedTime() * 1000; // ms

    if (animationStep === 'pulling') {
      const progress = Math.min(elapsedTime / CAMERA_PULL_DURATION, 1);
      camera.position.lerp(new THREE.Vector3(position[0], position[1], position[2] + 1.5), progress); // Move towards just in front of BH
      camera.quaternion.slerp(
        new THREE.Quaternion().setFromEuler(new THREE.Euler(0,0,0)), // Look directly at BH center (adjust if needed)
        progress
      );
      
      // Intensify effects
      if (blackHoleMaterial.uniforms.uSwirlIntensity) {
        blackHoleMaterial.uniforms.uSwirlIntensity.value = THREE.MathUtils.lerp(0.3, 2.5, progress);
      }
      accretionDiskMaterial.emissiveIntensity = THREE.MathUtils.lerp(1.5, 5.0, progress);
      accretionDiskMaterial.opacity = THREE.MathUtils.lerp(0.7, 1.0, progress);


      if (progress >= 1) {
        console.log("Black Hole: Camera pull complete, starting passage.");
        setAnimationStep('passage');
        // Optional: Could add a quick flash/fade here using a full-screen quad
        scene.background = new THREE.Color('white'); // Flash white
      }
    } else if (animationStep === 'passage') {
      const passageProgress = (elapsedTime - CAMERA_PULL_DURATION) / PASSAGE_DURATION;
      if (passageProgress >= 0.5 && scene.background instanceof THREE.Color && scene.background.getHexString() === 'ffffff') {
          scene.background = new THREE.Color('black'); // Then fade to black
          playSound('blackhole_passage.mp3', 0.7); // Play passage sound as it goes dark
      }

      if (passageProgress >= 1) {
        console.log("Black Hole: Passage complete, starting completion phase.");
        scene.background = null; // Restore original background (or set explicitly if known)
        setAnimationStep('completing');
      }
    } else if (animationStep === 'completing') {
      // Restore camera (could be a smooth transition or instant)
      // For now, the parent will handle camera reset via clearAllSelections
      console.log("Black Hole: Animation sequence finished.");
      animationClock.current.stop();
      setAnimationStep('idle');
      onAnimationComplete(); // Notify parent
    }
  });

  const handleClick = (event: THREE.Event) => {
    event.stopPropagation();
    if (!isActive) {
      console.log("Black Hole: Clicked, activating sequence via onActivate.");
      onActivate();
    }
  };

  return (
    <group position={position}>
      <Sphere ref={blackHoleRef} args={[1, 32, 32]} material={blackHoleMaterial} onClick={handleClick}>
        {/* Event Horizon */}
      </Sphere>
      <Torus
        ref={accretionDiskRef}
        args={[1.5, 0.2, 16, 64]} // radius, tubeRadius, radialSegments, tubularSegments
        rotation={[Math.PI / 2, 0, 0]}
        material={accretionDiskMaterial}
      >
        {/* Accretion Disk */}
      </Torus>
      {/* TODO: Add particles */}
    </group>
  );
};

export default InteractiveBlackHole;
