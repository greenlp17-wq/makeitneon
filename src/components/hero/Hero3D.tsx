import { useRef, useState, useEffect, useCallback, Component } from 'react';
import type { ReactNode } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { NeonSign } from './NeonSign';
import { FloatingParticles } from './FloatingParticles';
import { HeroFallback } from './HeroFallback';

/* ─────────────────────────────────────────────────
 * Error Boundary — catches WebGL/Three.js crashes
 * and gracefully falls back to the CSS neon hero.
 * ─────────────────────────────────────────────────*/
interface ErrorBoundaryState {
  hasError: boolean;
}

class Hero3DErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('[Hero3D] Canvas crashed, falling back to CSS hero:', error.message);
  }

  render() {
    if (this.state.hasError) {
      return <HeroFallback />;
    }
    return this.props.children;
  }
}

/* ─────────────────────────────────────────────────
 * WebGL context cleanup on unmount (SPA routing)
 * ─────────────────────────────────────────────────*/
function WebGLCleanup() {
  const gl = useThree((state) => state.gl);
  useEffect(() => {
    return () => {
      try {
        const ctx = gl.getContext();
        const ext = ctx.getExtension('WEBGL_lose_context');
        if (ext) ext.loseContext();
      } catch { /* already lost */ }
      try {
        gl.dispose();
      } catch { /* already disposed */ }
    };
  }, [gl]);
  return null;
}

/* ─────────────────────────────────────────────────
 * Hero3D — Main 3D hero canvas
 *
 * Architecture:
 * - WallBackground: brick wall texture behind everything
 * - NeonSign: per-letter glow with staggered turn-on
 * - FloatingParticles: atmospheric depth
 * - Bloom: post-processing neon glow
 * - Mouse parallax on the sign group
 * - Error boundary → CSS fallback
 * ─────────────────────────────────────────────────*/
export function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      setMouse({ x, y });
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0">
      <Hero3DErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
            failIfMajorPerformanceCaveat: false,
          }}
          onError={() => {
            // Handled by error boundary
          }}
        >
          {/* Scene background color (deep dark) */}
          <color attach="background" args={['#060609']} />

          {/* Ambient lighting — very dim, let neon be the hero */}
          <ambientLight intensity={0.06} />

          {/* Point light from neon position — casts colored light on the wall */}
          <pointLight
            position={[0, 0.7, 1.5]}
            intensity={0.8}
            color="#FF2D78"
            distance={8}
            decay={2}
          />
          {/* Subtle secondary side-fill */}
          <pointLight
            position={[-3, 1, 2]}
            intensity={0.15}
            color="#00D4FF"
            distance={6}
            decay={2}
          />
          <pointLight
            position={[3, -0.5, 2]}
            intensity={0.1}
            color="#BF40FF"
            distance={5}
            decay={2}
          />

          {/* Main neon sign */}
          <NeonSign
            text="Make It Neon"
            color="#FF2D78"
            position={[0, 0.6, 0]}
            mouseX={mouse.x}
            mouseY={mouse.y}
          />

          {/* Atmospheric particles — three layers for depth */}
          <FloatingParticles count={50} color="#FF2D78" spread={[10, 6, 3]} />
          <FloatingParticles count={25} color="#00D4FF" spread={[12, 5, 4]} />
          <FloatingParticles count={15} color="#BF40FF" spread={[8, 4, 3]} />

          {/* Bloom post-processing for neon glow */}
          <EffectComposer>
            <Bloom
              intensity={1.0}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.8}
              mipmapBlur
            />
          </EffectComposer>

          <WebGLCleanup />
          <Preload all />
        </Canvas>
      </Hero3DErrorBoundary>
    </div>
  );
}
