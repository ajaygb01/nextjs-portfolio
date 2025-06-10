"use client"

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Plane, Box } from '@react-three/drei' // Will add more imports later
import React, { useMemo, useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';

// Monaco track shape - simplified and approximated
// Scaled to fit roughly within a 4-unit radius circle
// const monacoTrackShape = [ // This will be replaced by SVG data
//   new THREE.Vector2(0, 3.5),
//   // ... (rest of the points)
//   new THREE.Vector2(0, 3.5)
// ];

// Placeholder for Track component
// const Track = () => { ... }

interface TrackProps {
  trackPathCurve: THREE.CatmullRomCurve3 | null; // Can be null if SVG not loaded
}

const Track = ({ trackPathCurve }: TrackProps) => {
  // Hooks must be called unconditionally at the top
  const trackGeometry = useMemo(() => {
    if (!trackPathCurve) return null; // Handle null curve inside useMemo if it affects geometry creation

    // Using 'centripetal' for CatmullRomCurve3 is often better for uniform speed and avoiding cusps.
    // Tension parameter (0.15) is for 'catmullrom' type, not typically used with 'centripetal'.
    // const extrudePath = new THREE.CatmullRomCurve3(points, true, 'centripetal'); // Path now passed as prop

    const rectWidth = 0.8; // Width of the track surface
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
        extrudePath: trackPathCurve // Use the passed curve
    };

    return new THREE.ExtrudeGeometry(rectShape, extrudeSettings);
  }, [trackPathCurve]);

  const asphaltMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: 0x808080, metalness: 0.3, roughness: 0.8 }), []);

  if (!trackPathCurve || !trackGeometry) return null; // Early return after all hooks

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
  initialT: number; // Initial progress along the track (0 to 1)
  trackPathCurve: THREE.CatmullRomCurve3 | null; // Can be null
  speed?: number; // Speed multiplier for movement along the track
}

const MovingBox = ({ boxColor, initialT, trackPathCurve, speed = 0.1 }: MovingBoxProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  // Elevated slightly more than track's potential rectHeight/2 + group elevation, to ensure it's visibly above.
  // Track is at y=0.05, rectHeight = 0.2 (from Track component), so track surface top is at 0.05 + 0.1 = 0.15.
  // Box height is 0.3, so its center should be at 0.15 + 0.3/2 = 0.3 for it to sit on the track.
  const fixedYPosition = 0.15 + 0.3 / 2;


  useFrame(({ clock }) => {
    if (!trackPathCurve || !meshRef.current) return; // Check inside useFrame

    const elapsedTime = clock.getElapsedTime();
    const t = (elapsedTime * speed + initialT) % 1; // Loop from 0 to 1

    // if (meshRef.current && trackPathCurve) { // trackPathCurve is already checked
      const positionOnCurve = trackPathCurve.getPointAt(t); // This is in XY plane of curve definition
      const tangentToCurve = trackPathCurve.getTangentAt(t); // Also in XY plane

      // Transform position and tangent from curve's XY plane to world's XZ plane
      // Original curve point (x, y, 0) maps to world (x, fixedYPosition, y)
      // due to track's rotation [-Math.PI / 2, 0, 0] which maps Y_curve -> Z_world, X_curve -> X_world.
      meshRef.current.position.set(positionOnCurve.x, fixedYPosition, positionOnCurve.y);

      // Orient the box
      const lookAtPosition = new THREE.Vector3(
        positionOnCurve.x + tangentToCurve.x,
        fixedYPosition, // Keep Y level for lookAt to avoid tilting up/down
        positionOnCurve.y + tangentToCurve.y
      );
      meshRef.current.lookAt(lookAtPosition);
    // }
  });

  if (!trackPathCurve) return null; // Early return after all hooks

  return (
    <Box ref={meshRef} args={[0.3, 0.3, 0.3]} castShadow>
      <meshStandardMaterial color={boxColor} />
    </Box>
  );
};

interface StartFinishLineProps {
  trackPathCurve: THREE.CatmullRomCurve3 | null; // Can be null
}

const StartFinishLine = ({ trackPathCurve }: StartFinishLineProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  const geometry = useMemo(() => {
    // Width across track: 0.8 (Box X)
    // Thickness: 0.01 (Box Y)
    // Length along track: 0.2 (Box Z)
    return new THREE.BoxGeometry(0.8, 0.01, 0.2);
  }, []);

  const material = useMemo(() => {
    const width = 2; // Texture width
    const height = 2; // Texture height
    const size = width * height;
    const data = new Uint8Array(3 * size); // 3 for RGB

    // Simple 2x2 checkerboard
    // P0 (0,0) Black
    data[0] = 0; data[1] = 0; data[2] = 0;
    // P1 (1,0) White
    data[3] = 255; data[4] = 255; data[5] = 255;
    // P2 (0,1) White
    data[6] = 255; data[7] = 255; data[8] = 255;
    // P3 (1,1) Black
    data[9] = 0; data[10] = 0; data[11] = 0;

    const texture = new THREE.DataTexture(data, width, height, THREE.RGBFormat);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    // Repeat 8 times across track width (0.8 / (texture_pixel_width_on_surface))
    // Assuming each texture pixel (0.5 of texture) covers 0.1 units of track width
    // So 0.8 / 0.1 = 8 repeats. Or simply, repeat N times for N checkers. Let's try 8 checkers wide.
    // For length, 0.2. If one texture pixel covers 0.1, then 2 repeats.
    texture.repeat.set(8, 2); // 8 checkers across X (width), 2 checkers across Z (length)
    texture.needsUpdate = true;
    texture.magFilter = THREE.NearestFilter; // Optional: For crisp pixels

    return new THREE.MeshBasicMaterial({ map: texture });
  }, []);

  const { position, lookAtPoint } = useMemo(() => {
    if (!trackPathCurve) {
      // Return default/dummy values that won't cause errors if used before early return
      return { position: new THREE.Vector3(), lookAtPoint: new THREE.Vector3(0,0,1) };
    }

    const curveStartPoint = trackPathCurve.getPointAt(0);
    const curveTangent = trackPathCurve.getTangentAt(0);

    const yPosition = 0.05 + 0.1 + 0.01 / 2; // track group y + track slab height/2 + line thickness/2 = 0.15 + 0.005 = 0.155

    const pos = new THREE.Vector3(curveStartPoint.x, yPosition, curveStartPoint.y); // Curve Y maps to World Z
    const lookAt = new THREE.Vector3(
      curveStartPoint.x + curveTangent.x,
      yPosition, // Keep lookAt Y the same as position Y to ensure line is flat
      curveStartPoint.y + curveTangent.y  // Curve Y maps to World Z
    );
    return { position: pos, lookAtPoint: lookAt };
  }, [trackPathCurve]);

  React.useLayoutEffect(() => {
    // trackPathCurve check is now done before returning the component
    if (meshRef.current && trackPathCurve) {
      meshRef.current.position.copy(position);
      meshRef.current.up.set(0, 1, 0); // Ensure world Y is up
      meshRef.current.lookAt(lookAtPoint);
    }
  }, [position, lookAtPoint, trackPathCurve]); // Added trackPathCurve to dependencies

  if (!trackPathCurve) return null; // Early return after all hooks

  // No explicit rotation prop needed as lookAt handles it.
  return <mesh ref={meshRef} geometry={geometry} material={material} />;
};


export default function F1MonacoScene() {
  const [svgTrackPoints, setSvgTrackPoints] = useState<THREE.Vector2[] | null>(null);

  useEffect(() => {
    const loader = new SVGLoader();
    fetch('/data/monaco_track.svg')
      .then(res => res.text())
      .then(svgText => {
        const data = loader.parse(svgText);
        const allPoints: THREE.Vector2[] = [];
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

        data.paths.forEach(path => {
          const shapes = path.toShapes(true, false); // isCCW = true, noHoles = false
          shapes.forEach(shape => {
            const points = shape.getPoints(100); // 100 divisions per shape
            points.forEach(p => {
              allPoints.push(p);
              if (p.x < minX) minX = p.x;
              if (p.y < minY) minY = p.y;
              if (p.x > maxX) maxX = p.x;
              if (p.y > maxY) maxY = p.y;
            });
          });
        });

        if (allPoints.length > 0) {
          const centerX = (minX + maxX) / 2;
          const centerY = (minY + maxY) / 2;
          const pathWidth = maxX - minX;
          const pathHeight = maxY - minY;

          const targetSceneWidth = 7.0;
          const scale = targetSceneWidth / Math.max(pathWidth, pathHeight);

          const processedPoints = allPoints.map(p => {
            return new THREE.Vector2(
              (p.x - centerX) * scale,
              (p.y - centerY) * scale * -1 // Flip Y and scale
            );
          });
          setSvgTrackPoints(processedPoints);
        }
      })
      .catch(err => console.error("Error loading or parsing SVG:", err));
  }, []);

  const trackPathCurve = useMemo(() => {
    if (svgTrackPoints && svgTrackPoints.length > 0) {
      const points = svgTrackPoints.map(p => new THREE.Vector3(p.x, p.y, 0));
      if (points.length > 1 && !points[0].equals(points[points.length - 1])) {
          points.push(points[0].clone());
      }
      if (points.length < 2) return null;
      return new THREE.CatmullRomCurve3(points, true, 'centripetal'); // Loop is true
    }
    return null;
  }, [svgTrackPoints]);

  // Define initial offsets for boxes along the track (0 to 1)
  const boxInitialProgress = [0, 0.33, 0.66];

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Canvas shadows camera={{ position: [0, 8, 12], fov: 50 }}> {/* Adjusted camera for better view */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={0.8} castShadow />
        <Plane args={[30, 30]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow> {/* Larger plane */}
          <meshStandardMaterial color="green" /> {/* Changed plane color for contrast */}
        </Plane>
        <group position={[0, 0.05, 0]}> {/* This group elevates the track to y=0.05 */}
          {trackPathCurve && <Track trackPathCurve={trackPathCurve} />}
          {trackPathCurve && <StartFinishLine trackPathCurve={trackPathCurve} />}
        </group>
        {/* Moving Boxes along the track */}
        {trackPathCurve && <MovingBox boxColor="red" initialT={boxInitialProgress[0]} trackPathCurve={trackPathCurve} speed={0.05} />}
        {trackPathCurve && <MovingBox boxColor="green" initialT={boxInitialProgress[1]} trackPathCurve={trackPathCurve} speed={0.05} />}
        {trackPathCurve && <MovingBox boxColor="blue" initialT={boxInitialProgress[2]} trackPathCurve={trackPathCurve} speed={0.05} />}
        <OrbitControls />
      </Canvas>
    </div>
  )
}
