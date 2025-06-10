import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef, useState, useEffect } from 'react'; // Added React, useState, useEffect
import * as THREE from 'three';

interface MovingCarProps {
  modelUrl: string;
  initialT: number;
  trackPathCurve: THREE.CatmullRomCurve3;
  speed?: number;
}

export function MovingCar({
  modelUrl,
  initialT,
  trackPathCurve,
  speed = 0.1
}: MovingCarProps) {
  const [loadError, setLoadError] = useState(false);
  // ref can hold either the loaded GLTF scene (Group) or the fallback Mesh
  const ref = useRef<THREE.Object3D>(null!);

  // useGLTF must be called unconditionally.
  // It will suspend while loading. If the model is not found (e.g., 404 error),
  // it will throw an error. This error should ideally be caught by a React ErrorBoundary
  // higher up in the component tree, or it will be handled by Suspense's fallback.
  // Our goal here is to provide a specific fallback visual within this component if loading fails.
  const gltf = useGLTF(modelUrl);

  useEffect(() => {
    // This effect runs after useGLTF has attempted its operation.
    // If gltf.scene is not populated, it implies loading failed or the model is invalid.
    // This is a way to react to a failed load and set our custom fallback,
    // especially if we want a behavior different from a generic Suspense fallback or ErrorBoundary.
    if (!gltf || !gltf.scene) {
      if (!loadError) { // Avoid potential re-renders if loadError is already true
        console.warn(`MovingCar: Failed to load GLTF model from ${modelUrl}. Rendering fallback box.`);
        setLoadError(true);
      }
    } else {
      // If gltf.scene is available, it means the model has been loaded (or attempted to).
      // If there was a previous error (e.g., modelUrl changed from bad to good), reset error state.
      if (loadError) {
        setLoadError(false);
      }
    }
  }, [gltf, modelUrl, loadError]); // Dependencies for the effect

  // The fixed Y position for the car on the track.
  // Original comments: The track's top surface is at y = 0.05 (group elevation) + 0.2 (track thickness) = 0.25.
  // The car is scaled by 0.2.
  // fixedY = 0.3 implies the car's center is 0.05 units above the track surface.
  const fixedY = 0.15 + 0.3 / 2; // This equals 0.3

  useFrame(({ clock }) => {
    if (!trackPathCurve || !ref.current) return; // Ensure ref.current and trackPathCurve are available

    const t = (clock.getElapsedTime() * speed + initialT) % 1; // Calculate progress along the curve
    const p = trackPathCurve.getPointAt(t); // Get position on the curve
    const tan = trackPathCurve.getTangentAt(t); // Get tangent for orientation

    // Update the object's position and orientation
    ref.current.position.set(p.x, fixedY, p.y); // p.y from 2D curve maps to Z in 3D world
    ref.current.lookAt(p.x + tan.x, fixedY, p.y + tan.y);
  });

  // Conditional rendering based on loadError or gltf availability
  if (loadError || !gltf || !gltf.scene) {
    // Render fallback box if there's a load error or gltf data is incomplete/missing
    return (
      <mesh ref={ref as React.Ref<THREE.Mesh>} scale={0.2} castShadow receiveShadow>
        {/* Dimensions (Width X, Height Y, Depth Z) before 0.2 scaling: [2, 0.5, 5] */}
        {/* Results in world-scaled dimensions: [0.4, 0.1, 1] */}
        <boxGeometry args={[2, 0.5, 5]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    );
  }

  // Render the GLTF model if successfully loaded
  return (
    <primitive
      ref={ref as React.Ref<THREE.Group>} // GLTF scene is typically a THREE.Group
      object={gltf.scene}
      scale={0.2}
      castShadow
      receiveShadow
    />
  );
}

// Preloading is not explicitly handled here but useGLTF.preload can be used
// in parent components or contexts where the modelUrl is known statically.
// For example: useGLTF.preload('/models/pixel_f1_car.glb');
// Calling it here directly with a dynamic modelUrl prop might be redundant
// as useGLTF itself handles loading.
