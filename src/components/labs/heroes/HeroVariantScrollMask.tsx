import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function HeroVariantScrollMask() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Scale the mask up massively so the user flies "through" the letter O
  const maskScale = useTransform(scrollYProgress, [0, 0.8], [1, 100]);
  const opacity = useTransform(scrollYProgress, [0.6, 0.9], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-[200vh] bg-background">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-white">
        
        {/* Background Image that will be revealed through the mask */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/catalog/business-1.jpg" 
            alt="Neon BG"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* The Mask Layer */}
        <motion.div 
          style={{ 
            scale: maskScale,
            opacity: opacity,
            WebkitMaskImage: 'url(/images/assets/mask-text.svg)',
            WebkitMaskPosition: 'center',
            WebkitMaskSize: '40vw',
            WebkitMaskRepeat: 'no-repeat',
            maskImage: 'url(/images/assets/mask-text.svg)',
            maskPosition: 'center',
            maskSize: '40vw',
            maskRepeat: 'no-repeat',
          }}
          className="absolute inset-0 z-10 bg-black flex items-center justify-center"
        >
          {/* We use CSS masking, but if no SVG we can fallback to mix-blend-mode trick */}
          <div className="absolute inset-0 bg-black mix-blend-normal" />
        </motion.div>

        {/* Fallback Pure CSS implementation since we don't have the SVG mask dynamically */}
        <motion.div 
          style={{ scale: maskScale, opacity }}
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none mix-blend-multiply bg-white"
        >
          <h1 className="text-[25vw] font-heading font-black text-black select-none tracking-tighter">
            NEON
          </h1>
        </motion.div>

        {/* Floating text over the whole thing */}
        <div className="absolute z-30 flex flex-col items-center pointer-events-none text-white text-center">
          <p className="text-sm tracking-[0.3em] uppercase mb-4 opacity-70">Scroll Down</p>
          <div className="w-px h-12 bg-white/30 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
