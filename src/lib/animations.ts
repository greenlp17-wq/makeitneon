import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register plugins once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  
  // Clean up configs across the app
  ScrollTrigger.config({
    ignoreMobileResize: true,
  });
}

/**
 * Common easings used across the site.
 * Using custom cubic-bezier equivalents in GSAP string format.
 */
export const EASING = {
  // Awwwards standard smooth ease-out
  smooth: 'power3.out',
  // Subtle bouncy spring
  spring: 'back.out(1.2)',
  // Slow start, fast end
  in: 'power2.in',
  // Slow start, slow end, fast middle
  inOut: 'power3.inOut',
};

/**
 * Pre-defined animation settings to maintain consistency
 */
export const TIMING = {
  fast: 0.3,
  base: 0.6,
  slow: 1.2,
  epic: 2.0,
};

export { gsap, ScrollTrigger, useGSAP };
