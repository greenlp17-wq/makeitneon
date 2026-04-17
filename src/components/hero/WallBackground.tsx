import { useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Dark brick-wall backdrop behind the neon sign.
 * Uses the hero-bg.webp image mapped onto a large plane.
 * Sits behind everything in the scene to give depth and context.
 */
export function WallBackground() {
  const { viewport } = useThree();

  // Load the brick wall texture
  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load('/images/hero/hero-bg.webp');
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  }, []);

  // Scale to fill viewport with some overflow
  const planeWidth = Math.max(viewport.width * 1.3, 10);
  const planeHeight = Math.max(viewport.height * 1.3, 8);

  return (
    <mesh position={[0, 0, -2.5]}>
      <planeGeometry args={[planeWidth, planeHeight]} />
      <meshBasicMaterial
        map={texture}
        color="#888888"
        toneMapped={false}
      />
    </mesh>
  );
}
