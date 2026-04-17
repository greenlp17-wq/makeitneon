import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, EASING, TIMING } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  delay?: number;
  duration?: number;
  scale?: boolean;
  once?: boolean;
}

/**
 * Wrapper component that animates its children into view when scrolled into the viewport.
 */
export function ScrollReveal({
  children,
  className,
  direction = 'up',
  distance = 50,
  delay = 0,
  duration = TIMING.base,
  scale = false,
  once = true,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Check for users who prefer reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        gsap.set(containerRef.current, { opacity: 1, x: 0, y: 0, scale: 1 });
        return;
      }

      const x = direction === 'left' ? distance : direction === 'right' ? -distance : 0;
      const y = direction === 'up' ? distance : direction === 'down' ? -distance : 0;

      // Initial state
      gsap.set(containerRef.current, {
        opacity: 0,
        x,
        y,
        scale: scale ? 0.9 : 1,
      });

      // Animate in
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 85%', // Trigger when element is 15% up from bottom of viewport
        once,
        animation: gsap.to(containerRef.current, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration,
          delay,
          ease: scale ? EASING.spring : EASING.smooth,
        }),
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={cn('will-change-transform opacity-0', className)}>
      {children}
    </div>
  );
}
