import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroVariantMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const m1X = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const m2X = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <div ref={containerRef} className="relative h-screen min-h-[700px] bg-[#0A0A12] overflow-hidden flex flex-col justify-center">
      {/* Background Marquee Text */}
      <div className="absolute inset-0 flex flex-col justify-center space-y-4 opacity-20 pointer-events-none select-none z-0">
        <motion.div style={{ x: m1X }} className="flex whitespace-nowrap">
          {Array(10).fill("MAKE IT NEON ").map((t, i) => (
            <span key={i} className="text-[15vw] font-heading font-black text-transparent hover:text-white transition-colors duration-500" style={{ WebkitTextStroke: '2px rgba(255,45,120,0.5)' }}>
              {t}
            </span>
          ))}
        </motion.div>
        <motion.div style={{ x: m2X }} className="flex whitespace-nowrap">
          {Array(10).fill("SWISS CRAFTED ").map((t, i) => (
            <span key={i} className="text-[15vw] font-heading font-black text-transparent" style={{ WebkitTextStroke: '2px rgba(0,212,255,0.5)' }}>
              {t}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Foreground Hero Image & CTA */}
      <motion.div style={{ scale }} className="relative z-10 container-tight flex flex-col items-center text-center">
        <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-[500px] lg:h-[500px] relative rounded-full overflow-hidden border-2 border-white/10 shadow-[0_0_80px_rgba(255,45,120,0.2)] mb-10 group">
          <img src="/images/catalog/business-1.jpg" alt="Neon Sign" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-heading font-bold text-white mb-6 uppercase tracking-tighter">
          Brutal <span className="text-neon-pink">Aesthetics</span>
        </h1>
        <p className="text-lg text-white/50 max-w-xl mx-auto mb-10 mix-blend-difference">
          Exploring kinetic typography and highly visceral modern layouts. Scroll down to see the mask displacement.
        </p>

        <Button className="bg-white text-black hover:bg-neon-pink hover:text-white font-heading px-8 h-14 text-lg rounded-full transition-all duration-300">
          Explore Style 01 <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}
