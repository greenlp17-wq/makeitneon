import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls the window to (0,0) on every route change.
 *
 * Must be placed INSIDE <BrowserRouter> but OUTSIDE <Routes>
 * so it fires on every navigation regardless of layout nesting.
 *
 * Uses useLayoutEffect for synchronous scroll before paint,
 * plus deferred resets to counter any GSAP ScrollTrigger.refresh()
 * or lazy-image reflows that run after the initial paint.
 */
export function ScrollRestoration() {
  const { pathname } = useLocation();
  const prevPathname = useRef(pathname);
  const cleanupRef = useRef<(() => void) | null>(null);

  useLayoutEffect(() => {
    // Clean up any pending deferred resets from previous navigation
    cleanupRef.current?.();

    // Skip the initial mount — only act on actual navigation
    if (prevPathname.current === pathname) return;
    prevPathname.current = pathname;

    // Disable smooth scroll so it's instant
    document.documentElement.style.scrollBehavior = 'auto';

    // Force scroll to absolute top — immediate (synchronous, before paint)
    const forceTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    forceTop();

    // Setup an interval to enforce top scroll for the first 500ms
    // This catches React Router Suspens/lazy loading chunk resolution,
    // GSAP refreshes, and lazy image reflows that might try to shift scroll.
    const intervalId = setInterval(() => {
      forceTop();
    }, 50);

    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      document.documentElement.style.scrollBehavior = '';
    }, 500);

    // Store cleanup function for this cycle
    cleanupRef.current = () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      document.documentElement.style.scrollBehavior = '';
    };

    return () => {
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [pathname]);

  return null;
}
