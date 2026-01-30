'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { Float, Text, Environment, PerspectiveCamera, Line } from '@react-three/drei';
import * as THREE from 'three';

// Process Steps Data
const STEPS = [
  { label: '01. DISCOVER', desc: 'Understanding\nGoals' },
  { label: '02. PLAN', desc: 'Strategy &\nRoadmap' },
  { label: '03. CREATE', desc: 'Content &\nDesign' },
  { label: '04. LAUNCH', desc: 'Go Live &\nOptimize' },
  { label: '05. GROW', desc: 'Scale &\nResults' },
];

// Fix Ref Type
type ScrollRef = React.MutableRefObject<number>;

function GlassNode({
  index,
  total,
  scrollRef,
  label,
  desc,
}: {
  index: number;
  total: number;
  scrollRef: ScrollRef;
  label: string;
  desc: string;
}) {
  const meshRef = useRef<THREE.Group>(null);
  // Spread nodes horizontally/diagonally for visual interest
  const x = (index - (total - 1) / 2) * 2.5;
  const y = Math.sin(index * 1.5) * 0.5;

  useFrame((state) => {
    if (!meshRef.current) return;
    const p = scrollRef.current;

    // Calculate active state
    // p goes 0 to 1. Map index to a range.
    const stepProgress = index / (total - 1);
    const active = p >= stepProgress - 0.15 && p <= stepProgress + 0.15;

    // Smooth animation
    const targetScale = 1.3; // active ? 1.3 : 0.8; // Removed conditional scaling for now
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

    // Rotate slightly
    meshRef.current.rotation.y += 0.002;
    meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime + index) * 0.1;
  });

  return (
    <Float speed={2} floatIntensity={0.5} rotationIntensity={0.2}>
      <group ref={meshRef} position={[x, y, 0]}>
        {/* Central Crystal Node */}
        <mesh>
          <octahedronGeometry args={[0.3, 0]} />
          <meshPhysicalMaterial
            roughness={0.1}
            metalness={0.1}
            transmission={0.95} // Glass
            thickness={1} // Refraction
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* 3D Label */}
        <group position={[0, -0.6, 0]}>
          <Text
            color="white"
            fontSize={0.25}
            anchorX="center"
            anchorY="middle"
            // font="/fonts/Inter-Bold.ttf" // Removed to use default fallback
            outlineWidth={0.01}
            outlineColor="#000000"
          >
            {label}
          </Text>
          <Text
            position={[0, -0.25, 0]}
            color="#a1a1aa" // Muted
            fontSize={0.12}
            anchorX="center"
            anchorY="top"
            textAlign="center"
          >
            {desc}
          </Text>
        </group>
      </group>
    </Float>
  );
}

function GlowingLine({ total }: { total: number }) {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i < total; i++) {
      const x = (i - (total - 1) / 2) * 2.5;
      const y = Math.sin(i * 1.5) * 0.5;
      pts.push(new THREE.Vector3(x, y, 0));
    }
    return pts;
  }, [total]);

  return (
    <Line
      points={points}
      color="#333"
      lineWidth={1}
      transparent
      opacity={0.5}
    />
  );
}

export default function Process3DScene({ scrollProgressRef }: { scrollProgressRef: React.MutableRefObject<number> }) {
  // Use a default ref if none provided to avoid null checks
  const fallbackRef = useRef(0);
  const scrollRef = scrollProgressRef || fallbackRef;

  return (
    <div className="w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden glass-panel">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={40} />

        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#fff" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4f46e5" />
        <Environment preset="city" />

        <group position={[0, 0, 0]}>
          <GlowingLine total={STEPS.length} />
          {STEPS.map((step, i) => (
            <GlassNode
              key={step.label}
              index={i}
              total={STEPS.length}
              scrollRef={scrollRef}
              label={step.label}
              desc={step.desc}
            />
          ))}
        </group>
      </Canvas>
    </div>
  );
}

export { STEPS as PROCESS_STEPS };
