import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowUpRight, Star, ShoppingBag, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 }
  }
};

export function HeroVariantBento() {
  return (
    <div className="min-h-screen bg-[#0A0A12] pt-28 pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-[200px]"
      >
        {/* Main large CTA block */}
        <motion.div variants={item} className="md:col-span-2 lg:col-span-2 row-span-2 rounded-3xl bg-white/5 border border-white/10 p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white leading-[1.1] mb-6">
              Create Your <br/> Space with <span className="text-neon-pink">Neon</span>.
            </h1>
            <p className="text-white/60 text-lg max-w-sm mb-8">
              Handcrafted in Switzerland. Design your own bespoke sign or shop our trending collection.
            </p>
          </div>
          <div className="relative z-10 flex gap-4">
            <Button className="bg-neon-pink hover:bg-neon-pink/90 text-white font-heading h-12 px-6 rounded-xl">
              Design Now
            </Button>
            <Button variant="outline" className="border-white/20 hover:bg-white/10 h-12 px-6 rounded-xl">
              Shop Collection
            </Button>
          </div>
        </motion.div>

        {/* Featured Image Block */}
        <motion.div variants={item} className="md:col-span-1 lg:col-span-2 row-span-1 rounded-3xl relative overflow-hidden group">
          <img src="/images/catalog/living-1.jpg" alt="Living Room Neon" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <span className="text-white font-heading font-bold text-xl">Top Rated</span>
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
              <ArrowUpRight className="w-5 h-5 text-white" />
            </div>
          </div>
        </motion.div>

        {/* Stats Block */}
        <motion.div variants={item} className="rounded-3xl bg-neon-blue/10 border border-neon-blue/20 p-6 flex flex-col justify-center items-center text-center hover:bg-neon-blue/20 transition-colors">
          <Star className="w-8 h-8 text-neon-blue mb-4" />
          <h3 className="text-4xl font-heading font-black text-white mb-1">5.0</h3>
          <p className="text-neon-blue text-sm uppercase tracking-wider font-bold">150+ Reviews</p>
        </motion.div>

        {/* Categories Block */}
        <motion.div variants={item} className="rounded-3xl bg-white/5 border border-white/10 p-6 flex flex-col justify-between hover:bg-white/10 transition-colors cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-heading font-bold text-white mb-1">Our Catalog</h3>
            <p className="text-white/50 text-sm">Browse 50+ designs</p>
          </div>
        </motion.div>

        {/* Full row image bottom */}
        <motion.div variants={item} className="md:col-span-3 lg:col-span-4 row-span-1 rounded-3xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-pink to-neon-purple opacity-20" />
          <img src="/images/catalog/business-2.jpg" alt="Business Neon" className="w-full h-full object-cover mix-blend-overlay transition-transform duration-1000 group-hover:scale-105" />
          <div className="absolute inset-0 flex items-center px-8 sm:px-12">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-xl">
                <Palette className="w-8 h-8 text-black" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-1">Upload Your Logo</h3>
                <p className="text-white/80">Get a free mockup in 24 hours.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
