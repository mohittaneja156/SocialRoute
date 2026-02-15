'use client';

/**
 * FooterMap3D: Stylized 3D map with address pin. Click opens Google Maps.
 * Rajouri Garden, New Delhi. Minimal B&W, low-poly.
 */

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function MapPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const gridSize = 12;
  const gridSegments = 24;

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = -0.1 + Math.sin(state.clock.elapsedTime * 0.15) * 0.02;
  });

  return (
    <mesh ref={meshRef} rotation={[-0.1, 0, 0]} position={[0, 0, -0.5]}>
      <planeGeometry args={[4, 2.5, gridSegments, gridSegments]} />
      <meshStandardMaterial
        color="#0f0f0f"
        wireframe={false}
        transparent
        opacity={0.9}
        metalness={0.2}
        roughness={0.8}
      />
    </mesh>
  );
}

function GridLines() {
  const linesRef = useRef<THREE.LineSegments>(null);
  const { positions } = useMemo(() => {
    const pos: number[] = [];
    const step = 0.2;
    for (let i = -2; i <= 2; i += step) {
      pos.push(i, -1.25, 0, i, 1.25, 0);
      pos.push(-2, i * 0.5, 0, 2, i * 0.5, 0);
    }
    return { positions: new Float32Array(pos) };
  }, []);

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#2a2a2a" transparent opacity={0.6} />
    </lineSegments>
  );
}

function LocationPin() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.04;
  });

  return (
    <Float speed={1.5} floatIntensity={0.3} rotationIntensity={0.1}>
      <group ref={groupRef} position={[-0.5, 0.05, 0.2]}>
        <mesh position={[0, 0.12, 0]}>
          <cylinderGeometry args={[0.04, 0.06, 0.08, 8]} />
          <meshStandardMaterial color="#fafafa" metalness={0.3} roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <coneGeometry args={[0.08, 0.12, 8]} />
          <meshStandardMaterial color="#fafafa" metalness={0.3} roughness={0.5} />
        </mesh>
      </group>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 2, 2]} intensity={0.8} />
      <pointLight position={[0, 0, 1]} intensity={0.3} color="#fafafa" />
      <MapPlane />
      <GridLines />
      <LocationPin />
    </>
  );
}

export default function FooterMap3D() {
  return (
    <div className="relative w-full h-[240px] md:h-[320px] rounded-lg overflow-hidden border border-light/10 bg-primary">
      <Canvas
        camera={{ position: [0, 0, 2.2], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
