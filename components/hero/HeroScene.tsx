'use client';

/**
 * HeroScene: Sr-inspired geometric shapes (rounded rectangles, extruded lines, soft bevels).
 * Shapes float slowly on idle; rotation.y, position.z, scale react to scroll (GSAP/ref).
 * Low-poly, simple materials, soft lighting. Scroll-driven, not time-driven.
 */

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Environment } from '@react-three/drei';
import * as THREE from 'three';

type ScrollRef = React.MutableRefObject<number>;

/** Rounded rectangle (S-like block) – slow idle float, scroll-driven rotation/scale/z */
function SrBlock({
  position,
  args,
  scrollRef,
  scrollRotationY = 0.4,
  scrollZ = -0.5,
  scrollScale = 0.85,
}: {
  position: [number, number, number];
  args: [number, number, number];
  scrollRef: ScrollRef;
  scrollRotationY?: number;
  scrollZ?: number;
  scrollScale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const basePosition = useMemo(() => [...position], [position[0], position[1], position[2]]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const p = scrollRef.current;
    meshRef.current.rotation.y = p * scrollRotationY * Math.PI + Math.sin(t * 0.15) * 0.08;
    meshRef.current.position.z = basePosition[2] + p * scrollZ;
    const scale = 1 - (1 - scrollScale) * p;
    meshRef.current.scale.setScalar(scale);
    meshRef.current.position.y = basePosition[1] + Math.sin(t * 0.2) * 0.04;
  });

  return (
    <RoundedBox ref={meshRef} position={position} args={args} radius={0.08} smoothness={4}>
      <meshPhysicalMaterial
        color="#ffffff"
        metalness={0.1}
        roughness={0.1}
        transmission={0.95}
        thickness={1.5}
      />
    </RoundedBox>
  );
}

/** Extruded line (r-like stroke) – thin rounded box */
function SrLine({
  position,
  scrollRef,
  scrollRotationY = 0.3,
}: {
  position: [number, number, number];
  scrollRef: ScrollRef;
  scrollRotationY?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const p = scrollRef.current;
    meshRef.current.rotation.y = p * scrollRotationY * Math.PI + Math.sin(t * 0.12) * 0.06;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.18) * 0.03;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.12, 0.5, 0.06]} />
      <meshPhysicalMaterial
        color="#ffffff"
        metalness={0.1}
        roughness={0.1}
        transmission={0.9}
        thickness={1}
      />
    </mesh>
  );
}

/** Soft bevel block – small accent */
function SrBevel({ position, scrollRef }: { position: [number, number, number]; scrollRef: ScrollRef }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const p = scrollRef.current;
    meshRef.current.rotation.y = p * 0.5 * Math.PI + Math.sin(t * 0.1) * 0.05;
    meshRef.current.position.z = position[2] - p * 0.3;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.25) * 0.02;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.2, 0.2, 0.08]} />
      <meshPhysicalMaterial
        color="#ffffff"
        metalness={0.2}
        roughness={0.2}
        transmission={0.9}
        thickness={1}
        emissive="#ffffff"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

function Scene({ scrollRef }: { scrollRef: ScrollRef }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 4, 4]} intensity={2} color="#ffffff" />
      <directionalLight position={[-2, 2, 2]} intensity={1} color="#4f46e5" />
      <pointLight position={[0, 0, 2]} intensity={0.5} color="#fafafa" />
      <Environment preset="city" />
      <SrBlock scrollRef={scrollRef} position={[-0.5, 0.1, -0.8]} args={[0.35, 0.5, 0.12]} scrollRotationY={0.35} scrollZ={-0.4} scrollScale={0.9} />
      <SrBlock scrollRef={scrollRef} position={[0.45, -0.15, -0.7]} args={[0.28, 0.4, 0.1]} scrollRotationY={-0.3} scrollZ={-0.35} scrollScale={0.88} />
      <SrLine scrollRef={scrollRef} position={[0.6, 0.2, -0.6]} scrollRotationY={0.25} />
      <SrLine scrollRef={scrollRef} position={[-0.65, -0.1, -0.65]} scrollRotationY={-0.2} />
      <SrBevel scrollRef={scrollRef} position={[0, 0.5, -0.5]} />
    </>
  );
}

type HeroSceneProps = {
  scrollProgressRef: React.MutableRefObject<number>;
};

export default function HeroScene({ scrollProgressRef }: HeroSceneProps) {
  // Use fallback if ref is missing (though it shouldn't be with proper usage)
  const fallbackRef = useRef(0);
  const scrollRef = scrollProgressRef || fallbackRef;
  return (
    <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 2.2], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
}
