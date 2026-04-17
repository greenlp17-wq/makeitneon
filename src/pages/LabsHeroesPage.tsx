import { useState, useEffect } from 'react';
import { HeroVariantMarquee } from '@/components/labs/heroes/HeroVariantMarquee';
import { HeroVariantPlasma } from '@/components/labs/heroes/HeroVariantPlasma';
import { HeroVariantBento } from '@/components/labs/heroes/HeroVariantBento';
import { HeroVariantScrollMask } from '@/components/labs/heroes/HeroVariantScrollMask';
import { HeroVariantHoverCards } from '@/components/labs/heroes/HeroVariantHoverCards';
import { LayoutDashboard, MousePointerClick, Maximize, AppWindow, Type } from 'lucide-react';

const VARIANTS = [
  { id: 'marquee', title: 'Kinetic Text', icon: Type, component: HeroVariantMarquee },
  { id: 'plasma', title: 'Fluid Plasma', icon: MousePointerClick, component: HeroVariantPlasma },
  { id: 'bento', title: 'Bento Grid', icon: LayoutDashboard, component: HeroVariantBento },
  { id: 'mask', title: 'Scroll Mask', icon: Maximize, component: HeroVariantScrollMask },
  { id: 'cards', title: 'Hover Cards', icon: AppWindow, component: HeroVariantHoverCards },
];

export default function LabsHeroesPage() {
  const [activeId, setActiveId] = useState(VARIANTS[0].id);

  // Auto-scroll to top when variant changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeId]);

  const ActiveComponent = VARIANTS.find(v => v.id === activeId)?.component || HeroVariantMarquee;

  return (
    <div className="relative min-h-screen bg-background">
      
      {/* ── ALERTS / EXPERIMENTAL BADGE ── */}
      <div className="fixed top-28 right-4 z-50 pointer-events-none">
        <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-2xl">
          Experimental Lab
        </div>
      </div>

      {/* ── RENDER ACTIVE HERO ── */}
      <div key={activeId} className="animate-in fade-in duration-700">
        <ActiveComponent />
      </div>

      {/* ── DUMMY SCROLL CONTEXT ── */}
      <div className="h-screen bg-background border-t border-border/20 flex flex-col items-center justify-center p-8">
        <h2 className="text-3xl font-heading font-bold mb-4 opacity-30">Scroll Content Context</h2>
        <p className="text-muted-foreground max-w-lg text-center opacity-50">
          This empty section exists solely so you can test the scrolling transitions of the active hero.
        </p>
      </div>

      {/* ── CONTROLLER (FIXED BOTTOM) ── */}
      <div className="fixed bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] sm:w-auto">
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-2 rounded-2xl shadow-2xl overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 min-w-max">
            {VARIANTS.map(variant => {
              const Icon = variant.icon;
              const isActive = activeId === variant.id;
              
              return (
                <button
                  key={variant.id}
                  onClick={() => setActiveId(variant.id)}
                  className={`flex items-center justify-center gap-2 px-4 h-10 rounded-xl font-heading text-sm font-semibold transition-all duration-300 whitespace-nowrap
                    ${isActive 
                      ? 'bg-neon-pink text-white shadow-[0_0_20px_rgba(255,45,120,0.3)]' 
                      : 'text-white/60 hover:bg-white/10 hover:text-white'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {variant.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
