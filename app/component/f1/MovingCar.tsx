import { useFrame } from '@react-three/fiber';
import React, { useRef, useMemo } from 'react'; // Removed useState, useEffect
import * as THREE from 'three';

interface MovingCarProps {
  // modelUrl: string; // Removed
  initialT: number;
  trackPathCurve: THREE.CatmullRomCurve3;
  speed?: number;
}

export function MovingCar({
  // modelUrl, // Removed
  initialT,
  trackPathCurve,
  speed = 0.1
}: MovingCarProps) {
  // const [loadError, setLoadError] = useState(false); // Removed
  const ref = useRef<THREE.Mesh>(null!); // Changed ref type to THREE.Mesh

  // const gltf = useGLTF(modelUrl); // Removed

  // useEffect(() => { ... }); // Removed GLTF error handling effect

  const fixedY = useMemo(() => 0.15 + 0.3 / 2, []);

  useFrame(({ clock }) => {
    if (!trackPathCurve || !ref.current) {
      // Optional: Log if we are returning early
      // console.log("MovingCar useFrame: Returning early", { hasTrackCurve: !!trackPathCurve, hasRefCurrent: !!ref.current });
      return;
    }

    const t = (clock.getElapsedTime() * speed + initialT) % 1;
    const p = trackPathCurve.getPointAt(t);
    const tan = trackPathCurve.getTangentAt(t);

    ref.current.position.set(p.x, fixedY, p.y);
    ref.current.lookAt(p.x + tan.x, fixedY, p.y + tan.y);
  });

  // Always render the fallback box
  return (
    <mesh ref={ref} scale={0.2} castShadow receiveShadow>
      <boxGeometry args={[0.5, 0.2, 1.0]} /> {/* Changed dimensions */}
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}
