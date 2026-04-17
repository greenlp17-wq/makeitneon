/* eslint-disable react-hooks/purity */
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingParticlesProps {
  count?: number;
  color?: string;
  spread?: [number, number, number];
}

/**
 * Atmospheric floating particles with additive blending.
 * Creates depth and visual interest around the neon sign.
 * Particles drift upward with sinusoidal horizontal wobble.
 */
export function FloatingParticles({
  count = 80,
  color = '#FF2D78',
  spread = [12, 6, 4],
}: FloatingParticlesProps) {
  const meshRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  const { positions, speeds, offsets, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const offsets = new Float32Array(count);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread[0];
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread[1];
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread[2] - 1;
      speeds[i] = 0.08 + Math.random() * 0.25;
      offsets[i] = Math.random() * Math.PI * 2;
      sizes[i] = 0.5 + Math.random() * 2;
    }

    return { positions, speeds, offsets, sizes };
  }, [count, spread[0], spread[1], spread[2]]); // eslint-disable-line react-hooks/exhaustive-deps

  useFrame((_state, delta) => {
    timeRef.current += delta;

    if (meshRef.current) {
      const posArray = meshRef.current.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        // Gentle floating motion
        posArray[i3 + 1] += Math.sin(timeRef.current * speeds[i] + offsets[i]) * 0.0008;
        posArray[i3] += Math.cos(timeRef.current * speeds[i] * 0.7 + offsets[i]) * 0.0004;

        // Slow upward drift
        posArray[i3 + 1] += 0.0008;

        // Reset if too high
        if (posArray[i3 + 1] > spread[1] / 2) {
          posArray[i3 + 1] = -spread[1] / 2;
          posArray[i3] = (Math.random() - 0.5) * spread[0];
        }
      }

      meshRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  // Soft circular particle texture
  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.4)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={color}
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        map={particleTexture}
        sizeAttenuation
      />
    </points>
  );
}
