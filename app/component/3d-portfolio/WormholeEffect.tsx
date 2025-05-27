import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Cylinder } from '@react-three/drei';

interface WormholeEffectProps {
  onAnimationComplete: () => void;
  isSoundEffectsEnabled: boolean;
  playSound: (soundFile: string, volume?: number) => void;
}

const WORMHOLE_DURATION = 5000; // 5 seconds for the effect
const WORMHOLE_LENGTH = 100; // Length of the tunnel
const CAMERA_START_Z = WORMHOLE_LENGTH / 2 - 5; // Start inside the tunnel
const CAMERA_END_Z = -WORMHOLE_LENGTH / 2 + 5; // End towards the other side

const WormholeEffect: React.FC<WormholeEffectProps> = ({ 
  onAnimationComplete, 
  isSoundEffectsEnabled, 
  playSound 
}) => {
  const { camera } = useThree();
  const tubeRef = useRef<THREE.Mesh>(null!);
  const clockRef = useRef(new THREE.Clock());
  const travelAudioRef = useRef<HTMLAudioElement | null>(null);

  const originalCameraPosition = useRef(camera.position.clone());
  const originalCameraQuaternion = useRef(camera.quaternion.clone());
  const originalCameraFov = useRef(camera.fov);

  // Setup camera for wormhole & audio
  useEffect(() => {
    camera.position.set(0, 0, CAMERA_START_Z);
    camera.lookAt(0, 0, -WORMHOLE_LENGTH); 
    camera.fov = 90; 
    camera.updateProjectionMatrix();

    clockRef.current.start();
    document.body.style.overflow = 'hidden';

    if (isSoundEffectsEnabled) {
      travelAudioRef.current = new Audio('/sounds/wormhole_travel.mp3');
      travelAudioRef.current.loop = true;
      travelAudioRef.current.volume = 0.3; // Softer, ambient
      travelAudioRef.current.play().catch(e => console.warn("Wormhole travel sound failed to play:", e));
    }

    return () => {
      // Restore original camera settings
      camera.position.copy(originalCameraPosition.current);
      camera.quaternion.copy(originalCameraQuaternion.current);
      camera.fov = originalCameraFov.current;
      camera.updateProjectionMatrix();
      document.body.style.overflow = 'auto';

      if (travelAudioRef.current) {
        travelAudioRef.current.pause();
        travelAudioRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [camera, isSoundEffectsEnabled]); // isSoundEffectsEnabled dependency added

  // Shader for the tunnel material
  const tunnelMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color(0x003366) }, // Dark blue
      uColor2: { value: new THREE.Color(0x66ccff) }, // Light blue
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
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      varying vec2 vUv;

      void main() {
        float speed = 2.0;
        float pattern = fract((vUv.x + vUv.y * 0.5 + uTime * speed) * 2.0); // Diagonal scrolling lines
        float glow = pow(0.5 - abs(pattern - 0.5), 2.0) * 2.0; // Create a glowing effect for lines
        
        vec3 color = mix(uColor1, uColor2, pattern);
        gl_FragColor = vec4(color + glow * 0.3, 1.0);
      }
    `,
    side: THREE.BackSide, // Render the inside of the cylinder
    transparent: true,
  });

  useFrame((state, delta) => {
    const elapsedTime = clockRef.current.getElapsedTime();
    
    // Animate the shader time
    tunnelMaterial.uniforms.uTime.value = elapsedTime;

    // Move camera through the tunnel
    const progress = Math.min(elapsedTime * 0.2, 1); // Adjust speed of travel
    camera.position.z = THREE.MathUtils.lerp(CAMERA_START_Z, CAMERA_END_Z, progress);
    camera.lookAt(0, 0, camera.position.z - WORMHOLE_LENGTH); // Keep looking forward

    if (elapsedTime * 1000 > WORMHOLE_DURATION) {
      if (travelAudioRef.current && !travelAudioRef.current.paused) { // Ensure sound plays before stopping
           playSound('wormhole_exit.mp3', 0.5);
      } else if (!travelAudioRef.current) { // If sound was never started (e.g. disabled)
           playSound('wormhole_exit.mp3', 0.5);
      }
      onAnimationComplete();
    }
  });

  return (
    <group>
      <Cylinder ref={tubeRef} args={[5, 5, WORMHOLE_LENGTH, 32, 1, true]} material={tunnelMaterial} rotation={[Math.PI / 2, 0, 0]}>
        {/* Using Cylinder from drei which applies a MeshBasicMaterial by default if no material prop.
            Here we pass our custom shader material. Ensure this works as expected with drei's Cylinder.
            If not, fallback to <mesh><cylinderGeometry .../></mesh> 
        */}
      </Cylinder>
      {/* Optional: Add particles or other effects here */}
    </group>
  );
};

export default WormholeEffect;
