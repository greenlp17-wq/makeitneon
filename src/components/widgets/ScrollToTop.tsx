import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * Scroll-to-top button with glassmorphism styling.
 * Appears after scrolling 300px down. Smooth-scrolls to top on click.
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      id="scroll-to-top"
      className={`
        fixed bottom-6 right-24 z-50 w-11 h-11 rounded-full
        glass border border-border/50
        flex items-center justify-center
        text-foreground/70 hover:text-foreground
        shadow-lg hover:shadow-xl
        transition-all duration-500
        ${visible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
        }
      `}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
