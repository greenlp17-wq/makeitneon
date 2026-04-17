import { useState, useEffect } from 'react';

/**
 * CSS-only fallback for when Three.js/WebGL is unavailable or fails.
 * Renders a visually rich neon sign effect using pure CSS:
 *  - Brick wall background image
 *  - Neon glow text with multi-layer text-shadow
 *  - Per-letter turn-on animation
 *  - Floating ambient particles
 * 
 * Also used on mobile devices where Three.js is too heavy.
 */
export function HeroFallback() {
  const [litLetters, setLitLetters] = useState(0);
  const text = 'Make It Neon';

  // Staggered per-letter turn-on (same timing as 3D version)
  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const baseDelay = 400;
    const stagger = 90;

    for (let i = 0; i <= text.replace(/ /g, '').length; i++) {
      timeouts.push(
        setTimeout(() => setLitLetters(i), baseDelay + i * stagger)
      );
    }

    return () => timeouts.forEach(clearTimeout);
  }, []);

  const [particles] = useState(() =>
    Array.from({ length: 25 }).map(() => ({
      width: `${2 + Math.random() * 3}px`,
      height: `${2 + Math.random() * 3}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animation: `float-particle ${6 + Math.random() * 12}s linear infinite`,
      animationDelay: `${Math.random() * 6}s`,
      opacity: 0.15 + Math.random() * 0.3,
    }))
  );

  // Split text into individual characters for per-letter animation
  let charIndex = 0;

  return (
    <div className="absolute inset-0 z-0">
      {/* Neon text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold
                     select-none text-center px-4 mb-[20vh] sm:mb-[25vh]"
          aria-label={text}
        >
          {text.split('').map((char, i) => {
            if (char === ' ') {
              return <span key={i}>&nbsp;</span>;
            }
            const thisCharIndex = charIndex++;
            const isLit = thisCharIndex < litLetters;

            return (
              <span
                key={i}
                className="inline-block transition-all duration-300 ease-out"
                style={{
                  color: isLit ? '#ffffff' : 'rgba(255,255,255,0.08)',
                  textShadow: isLit
                    ? '0 0 7px #FF2D78, 0 0 10px #FF2D78, 0 0 21px #FF2D78, 0 0 42px #FF2D78, 0 0 82px #FF2D78, 0 0 92px #FF2D78'
                    : 'none',
                  transform: isLit ? 'translateY(0)' : 'translateY(4px)',
                  opacity: isLit ? 1 : 0.08,
                }}
              >
                {char}
              </span>
            );
          })}
        </h1>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((style, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-neon-pink/30"
            style={style}
          />
        ))}
      </div>
    </div>
  );
}
