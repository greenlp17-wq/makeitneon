import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';

export function HeroVariantPlasma() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    // Convert to relative coordinate mapping (-0.5 to 0.5)
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX / innerWidth - 0.5) * 100,
      y: (clientY / innerHeight - 0.5) * 100
    });
  };

  return (
    <div 
      className="relative h-screen min-h-[700px] overflow-hidden bg-black flex items-center justify-center cursor-crosshair"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Plasma Background Elements */}
      <motion.div 
        animate={{ x: mousePos.x * 2, y: mousePos.y * 2 }}
        className="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-neon-pink/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"
      />
      <motion.div 
        animate={{ x: -mousePos.x * 3, y: -mousePos.y * 3 }}
        className="absolute bottom-1/4 right-1/4 w-[70vw] h-[70vw] max-w-[1000px] max-h-[1000px] bg-neon-blue/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none"
      />
      <motion.div 
        animate={{ x: mousePos.x, y: -mousePos.y }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-purple-500/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none"
      />

      {/* Grid overlay for texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none mask-image-radial-center opacity-50" />

      {/* Central Glassmorphism Card */}
      <div className="relative z-10 p-12 lg:p-20 rounded-[2.5rem] glass border border-white/10 text-center max-w-4xl mx-auto backdrop-blur-md shadow-2xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-neon-blue text-xs font-bold uppercase tracking-widest mb-8">
          <Sparkles className="w-4 h-4" />
          Interactive Lighting
        </div>
        
        <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 leading-tight">
          Breathe Life Into <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-blue">
            Your Space
          </span>
        </h1>
        
        <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
          Fluid dynamic blur layers tracking your cursor to create a deeply immersive cyberpunk aesthetic. Minimal CSS heavy WebGL feel.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 h-14 px-8 rounded-full font-heading w-full sm:w-auto">
            Design Custom Sign
          </Button>
          <Button size="lg" className="bg-gradient-to-r from-neon-pink to-neon-blue text-white hover:opacity-90 h-14 px-8 rounded-full font-heading w-full sm:w-auto border-0 shadow-[0_0_30px_rgba(255,45,120,0.3)]">
            Explore Collection <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
