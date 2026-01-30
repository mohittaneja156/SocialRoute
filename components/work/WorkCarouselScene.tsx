'use client';

/**
 * WorkCarouselScene: Three.js scroll-driven image carousel.
 * Planes with image textures; scroll progress (0–1) drives horizontal offset.
 * Inspired by [AdMark](https://admarkdigitalmedia.com/) Our Work and [iplix](https://www.iplix.in/) portfolio.
 */

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type ScrollRef = React.MutableRefObject<number>;

const PROJECT_IMAGES = [
  'https://placehold.co/800x500/1a1a1a/fafafa?text=Project+1',
  'https://placehold.co/800x500/252525/fafafa?text=Project+2',
  'https://placehold.co/800x500/1a1a1a/fafafa?text=Project+3',
  'https://placehold.co/800x500/252525/fafafa?text=Project+4',
  'https://placehold.co/800x500/1a1a1a/fafafa?text=Project+5',
  'https://placehold.co/800x500/252525/fafafa?text=Project+6',
];

const CARD_WIDTH = 2.2;
const CARD_GAP = 0.4;
const TOTAL_WIDTH = PROJECT_IMAGES.length * (CARD_WIDTH + CARD_GAP) - CARD_GAP;

function CarouselStrip({ scrollRef }: { scrollRef: ScrollRef }) {
  const groupRef = useRef<THREE.Group>(null);
  const [textures, setTextures] = useState<THREE.Texture[]>([]);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');
    const loaded: THREE.Texture[] = [];
    PROJECT_IMAGES.forEach((src, i) => {
      loader.load(
        src,
        (tex) => {
          tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
          tex.colorSpace = THREE.SRGBColorSpace;
          loaded[i] = tex;
          if (loaded.filter(Boolean).length === PROJECT_IMAGES.length) {
            setTextures(loaded);
          }
        },
        undefined,
        () => { loaded[i] = new THREE.Texture(); }
      );
    });
    return () => loaded.forEach((t) => t?.dispose());
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    const p = scrollRef.current;
    const offset = -p * (TOTAL_WIDTH * 0.85);
    groupRef.current.position.x = offset;
  });

  if (textures.length === 0) {
    return (
      <group ref={groupRef}>
        {PROJECT_IMAGES.map((_, i) => (
          <mesh key={i} position={[i * (CARD_WIDTH + CARD_GAP), 0, 0]}>
            <planeGeometry args={[CARD_WIDTH * (800 / 500), CARD_WIDTH]} />
            <meshBasicMaterial color="#1a1a1a" />
          </mesh>
        ))}
      </group>
    );
  }

  return (
    <group ref={groupRef}>
      {textures.map((tex, i) => (
        <mesh key={i} position={[i * (CARD_WIDTH + CARD_GAP), 0, 0]}>
          <planeGeometry args={[CARD_WIDTH * (800 / 500), CARD_WIDTH]} />
          <meshBasicMaterial map={tex} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function Scene({ scrollRef }: { scrollRef: ScrollRef }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 2, 2]} intensity={0.8} />
      <CarouselStrip scrollRef={scrollRef} />
    </>
  );
}

type WorkCarouselSceneProps = {
  scrollProgressRef: React.MutableRefObject<number>;
};

export default function WorkCarouselScene({ scrollProgressRef }: WorkCarouselSceneProps) {
  const fallbackRef = useRef(0);
  const scrollRef = scrollProgressRef || fallbackRef;
  return (
    <div className="absolute inset-0 z-0 w-full h-full min-h-[420px] md:min-h-[520px]" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
}
