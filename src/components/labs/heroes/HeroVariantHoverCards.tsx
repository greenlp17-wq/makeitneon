import { useRef } from 'react';
import type { MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

function TiltCard({ children, bgImage }: { children: React.ReactNode, bgImage: string }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full aspect-[3/4] sm:w-[300px] rounded-3xl glass border border-white/10 overflow-hidden group cursor-pointer"
    >
      <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
        <img src={bgImage} alt="Card BG" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />
      
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="relative z-20 h-full flex flex-col justify-end p-6"
      >
        {children}
      </div>
    </motion.div>
  );
}

export function HeroVariantHoverCards() {
  return (
    <div className="relative min-h-[900px] h-screen bg-[#050508] overflow-hidden flex items-center justify-center perspective-[2000px]">
      
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-neon-pink/10 rounded-full blur-[100px] mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-neon-blue/10 rounded-full blur-[120px] mix-blend-screen" />

      <div className="relative z-10 container-tight flex flex-col items-center">
        
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6">
            Spatial <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-purple">Elegance</span>
          </h1>
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            Hover over the glass cards below to experience physics-based CSS 3D transformations simulating a futuristic spatial UI.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-5xl">
          
          <TiltCard bgImage="/images/catalog/living-1.jpg">
            <h3 className="font-heading text-2xl font-bold text-white mb-2">Home Decor</h3>
            <p className="text-sm text-white/60 mb-4">Warm lighting for cozy interiors.</p>
            <div className="flex items-center text-neon-pink text-sm font-bold uppercase tracking-wider">
              Explore <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </TiltCard>

          <TiltCard bgImage="/images/catalog/business-1.jpg">
            <h3 className="font-heading text-2xl font-bold text-white mb-2">Custom Logos</h3>
            <p className="text-sm text-white/60 mb-4">Professional signs for your business.</p>
            <div className="flex items-center text-neon-blue text-sm font-bold uppercase tracking-wider">
              Create <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </TiltCard>

          <TiltCard bgImage="/images/catalog/wedding-1.jpg">
            <h3 className="font-heading text-2xl font-bold text-white mb-2">Events</h3>
            <p className="text-sm text-white/60 mb-4">Make your special day unforgettable.</p>
            <div className="flex items-center text-white text-sm font-bold uppercase tracking-wider">
              View Gallery <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </TiltCard>

        </div>
      </div>
    </div>
  );
}
