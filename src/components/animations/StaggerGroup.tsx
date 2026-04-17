import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, EASING, TIMING } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface StaggerGroupProps {
  children: React.ReactNode;
  className?: string;
  childSelector?: string;
  staggerAmount?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  scale?: boolean;
}

/**
 * Wrapper component that naturally staggers the entrance of its children when scrolled into view.
 */
export function StaggerGroup({
  children,
  className,
  childSelector = '.stagger-item',
  staggerAmount = 0.1,
  direction = 'up',
  distance = 30,
  scale = false,
}: StaggerGroupProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const items = gsap.utils.toArray(childSelector, containerRef.current) as HTMLElement[];
      
      if (items.length === 0) {
        console.warn(`StaggerGroup: No items found with selector "${childSelector}"`);
        return;
      }

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        gsap.set(items, { opacity: 1, x: 0, y: 0, scale: 1 });
        return;
      }

      const x = direction === 'left' ? distance : direction === 'right' ? -distance : 0;
      const y = direction === 'up' ? distance : direction === 'down' ? -distance : 0;

      // Set initial states for all children
      gsap.set(items, {
        opacity: 0,
        x,
        y,
        scale: scale ? 0.9 : 1,
      });

      // Stagger animate in
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 85%',
        once: true,
        animation: gsap.to(items, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: TIMING.base,
          ease: scale ? EASING.spring : EASING.smooth,
          stagger: staggerAmount,
        }),
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={cn(className)}>
      {children}
    </div>
  );
}
