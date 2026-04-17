import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface NeonSignProps {
  text?: string;
  color?: string;
  position?: [number, number, number];
  mouseX?: number;
  mouseY?: number;
}

/* ─────────────────────────────────────────────────
 * Single-canvas neon texture — renders full text at once.
 * Fast creation (~2ms) vs per-letter (~200ms+ in Chrome).
 * ─────────────────────────────────────────────────*/

function createNeonTexture(
  text: string,
  color: string,
  width = 1024,
  height = 256,
): { texture: THREE.CanvasTexture; aspect: number } {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, width, height);

  const fontFamily = "'Unbounded', 'Inter', system-ui, sans-serif";
  const fontSize = Math.floor(height * 0.38);
  ctx.font = `800 ${fontSize}px ${fontFamily}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const centerX = width / 2;
  const centerY = height / 2;

  const metrics = ctx.measureText(text);
  const textWidth = metrics.width;

  // Pass 1: Wide atmospheric halo
  ctx.shadowColor = color;
  ctx.shadowBlur = 60;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.2;
  ctx.fillText(text, centerX, centerY);

  // Pass 2: Medium glow
  ctx.shadowBlur = 30;
  ctx.globalAlpha = 0.4;
  ctx.fillText(text, centerX, centerY);

  // Pass 3: Tight tube glow
  ctx.shadowBlur = 10;
  ctx.globalAlpha = 0.8;
  ctx.fillText(text, centerX, centerY);

  // Pass 4: White-hot core
  ctx.shadowColor = '#ffffff';
  ctx.shadowBlur = 6;
  ctx.fillStyle = '#ffffff';
  ctx.globalAlpha = 0.6;
  ctx.fillText(text, centerX, centerY);
  ctx.globalAlpha = 1.0;

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  const aspect = (textWidth + 120) / height;
  return { texture, aspect };
}

/* ─────────────────────────────────────────────────
 * NeonSign — single mesh, zero re-renders.
 * 
 * Uses a single canvas texture for the full text.
 * Animates opacity + emissiveIntensity via refs.
 * Flicker effect simulated with random intensity drops.
 * ─────────────────────────────────────────────────*/
export function NeonSign({
  text = 'Make It Neon',
  color = '#FF2D78',
  position = [0, 0, 0],
  mouseX = 0,
  mouseY = 0,
}: NeonSignProps) {
  const groupRef = useRef<THREE.Group>(null);
  const mainMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const glowMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const timeRef = useRef(0);
  const { viewport } = useThree();

  // Scale sign to fit viewport
  const scaleFactor = useMemo(() => {
    const baseWidth = 5.5;
    return Math.min(viewport.width / baseWidth, 1.0) * 0.55;
  }, [viewport.width]);

  const neonColor = useMemo(() => new THREE.Color(color), [color]);

  // Create texture once — very fast (~2ms)
  const { texture, aspect } = useMemo(
    () => createNeonTexture(text, color),
    [text, color],
  );

  const planeWidth = 4.5;
  const planeHeight = planeWidth / aspect;

  // Animation state — all in refs, zero re-renders
  const opacityRef = useRef(0);
  const flickerRef = useRef(0);
  const turnOnCompleteRef = useRef(false);

  // Turn-on animation schedule
  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const steps = [
      { delay: 300, opacity: 0.3, flicker: 0.2 },   // First flicker
      { delay: 400, opacity: 0.05, flicker: 0.5 },   // Dim
      { delay: 500, opacity: 0.5, flicker: 0.1 },    // Stronger
      { delay: 600, opacity: 0.1, flicker: 0.4 },    // Another dim
      { delay: 700, opacity: 0.7, flicker: 0 },      // Almost on
      { delay: 800, opacity: 0.15, flicker: 0.3 },   // Quick flicker off
      { delay: 880, opacity: 0.9, flicker: 0 },      // Strong
      { delay: 1000, opacity: 1.0, flicker: 0 },     // Full on
    ];

    steps.forEach(({ delay, opacity, flicker }) => {
      timeouts.push(setTimeout(() => {
        opacityRef.current = opacity;
        flickerRef.current = flicker;
        if (opacity >= 1.0) turnOnCompleteRef.current = true;
      }, delay));
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  // Mouse ref to avoid re-renders
  const mouseRef = useRef({ x: 0, y: 0 });
  mouseRef.current.x = mouseX;
  mouseRef.current.y = mouseY;

  // Animation loop — updates materials directly
  useFrame((_state, delta) => {
    timeRef.current += delta;

    // Group transform (parallax + float)
    if (groupRef.current) {
      const targetRotY = mouseRef.current.x * 0.06;
      const targetRotX = -mouseRef.current.y * 0.04;
      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.04;
      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.04;
      groupRef.current.position.y = position[1] + Math.sin(timeRef.current * 0.4) * 0.03;
    }

    // Random micro-flicker after turn-on is complete (~1 per 5 seconds)
    if (turnOnCompleteRef.current && Math.random() > 0.997) {
      flickerRef.current = 0.08 + Math.random() * 0.07;
      setTimeout(() => {
        flickerRef.current = 0;
      }, 40 + Math.random() * 40);
    }

    // Update materials directly
    const opacity = opacityRef.current;
    const flickerValue = 1 - flickerRef.current;
    const emissiveIntensity = opacity * flickerValue * 3.0;

    if (mainMatRef.current) {
      mainMatRef.current.opacity = opacity;
      mainMatRef.current.emissiveIntensity = emissiveIntensity;
    }
    if (glowMatRef.current) {
      glowMatRef.current.opacity = opacity * flickerValue * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={[scaleFactor, scaleFactor, 1]}>
      {/* Main neon text */}
      <mesh>
        <planeGeometry args={[planeWidth, planeHeight]} />
        <meshStandardMaterial
          ref={mainMatRef}
          map={texture}
          emissiveMap={texture}
          emissive={neonColor}
          emissiveIntensity={0}
          transparent
          opacity={0}
          toneMapped={false}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Backing glow plane */}
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[planeWidth * 1.2, planeHeight * 1.4]} />
        <meshBasicMaterial
          ref={glowMatRef}
          map={texture}
          color={neonColor}
          transparent
          opacity={0}
          toneMapped={false}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
