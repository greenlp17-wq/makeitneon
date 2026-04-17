import { useLocation } from 'react-router-dom';

/**
 * Page transition using pure CSS keyframe animation.
 *
 * WHY NOT Framer Motion AnimatePresence:
 * Framer Motion's AnimatePresence (mode="wait") delays mounting of the new
 * page, which combined with React StrictMode's double-invocation breaks
 * GSAP useGSAP on first load (cleanup fires before GSAP can measure the DOM).
 *
 * This approach uses a plain div with a CSS keyframe animation.
 * Changing the `key` causes React to unmount the old div and mount a new one,
 * which triggers the CSS animation automatically — no JS timers, no stacking
 * context, no transform side effects.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div key={location.pathname} className="page-transition-wrapper">
      {children}
    </div>
  );
}
