/* eslint-disable react-refresh/only-export-components */

// ═══════════════════════════════════════════════
// Background Selector — Wall presets for neon preview
// Uses CSS patterns instead of images for speed
// ═══════════════════════════════════════════════

export interface WallBackground {
  id: string;
  label: string;
  style: React.CSSProperties;
  thumbnailBg: string; // CSS for the small thumbnail swatch
}

export const wallBackgrounds: WallBackground[] = [
  {
    id: 'dark-wall',
    label: 'Dark Wall',
    style: {
      backgroundColor: '#0a0a0f',
      backgroundImage: 'url(/images/calculator/bg_dark.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    thumbnailBg: 'url(/images/calculator/bg_dark.png) center/cover no-repeat',
  },
  {
    id: 'brick',
    label: 'Brick Wall',
    style: {
      backgroundColor: '#2a1810',
      backgroundImage: 'url(/images/calculator/bg_brick.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    thumbnailBg: 'url(/images/calculator/bg_brick.png) center/cover no-repeat',
  },
  {
    id: 'office',
    label: 'Modern Office',
    style: {
      backgroundColor: '#2a2a30',
      backgroundImage: 'url(/images/calculator/bg_office.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    thumbnailBg: 'url(/images/calculator/bg_office.png) center/cover no-repeat',
  },
  {
    id: 'apartment',
    label: 'Apartment',
    style: {
      backgroundColor: '#e8e6e3',
      backgroundImage: 'url(/images/calculator/bg_apartment.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    thumbnailBg: 'url(/images/calculator/bg_apartment.png) center/cover no-repeat',
  },
  {
    id: 'bar',
    label: 'Bar / Speakeasy',
    style: {
      backgroundColor: '#1a1a22',
      backgroundImage: 'url(/images/calculator/bg_bar.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    thumbnailBg: 'url(/images/calculator/bg_bar.png) center/cover no-repeat',
  },
];

interface BackgroundSelectorProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export function BackgroundSelector({ selectedId, onSelect }: BackgroundSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      {wallBackgrounds.map(bg => (
        <button
          key={bg.id}
          onClick={() => onSelect(bg.id)}
          title={bg.label}
          className={`w-10 h-10 rounded-lg border-2 transition-all shrink-0 ${
            selectedId === bg.id
              ? 'border-white/80 ring-2 ring-white/30 scale-110'
              : 'border-white/20 hover:border-white/40 hover:scale-105'
          }`}
          style={{ background: bg.thumbnailBg }}
        />
      ))}
    </div>
  );
}
