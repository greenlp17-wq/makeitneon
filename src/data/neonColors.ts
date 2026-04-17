// ═══════════════════════════════════════════════
// Make It Neon — Neon LED Colors
// ═══════════════════════════════════════════════

export interface NeonColor {
  id: string;
  name: string;
  hex: string;
  isRGB?: boolean;        // Whether this is RGB color-changing option
  glowColor?: string;     // Custom glow color (defaults to hex)
}

export const neonColors: NeonColor[] = [
  { id: 'white',      name: 'White',       hex: '#FFFFFF',  glowColor: '#E8E8FF' },
  { id: 'warm-white', name: 'Warm White',  hex: '#FFF4E6',  glowColor: '#FFE8C8' },
  { id: 'ice-blue',   name: 'Ice Blue',    hex: '#00D4FF' },
  { id: 'blue',       name: 'Blue',        hex: '#0066FF' },
  { id: 'deep-blue',  name: 'Deep Blue',   hex: '#0022FF' },
  { id: 'red',        name: 'Red',         hex: '#FF0000' },
  { id: 'pink',       name: 'Pink',        hex: '#FF69B4' },
  { id: 'hot-pink',   name: 'Hot Pink',    hex: '#FF2D78' },
  { id: 'purple',     name: 'Purple',      hex: '#9D00FF' },
  { id: 'green',      name: 'Green',       hex: '#00FF00' },
  { id: 'yellow',     name: 'Yellow',      hex: '#FFF200' },
  { id: 'orange',     name: 'Orange',      hex: '#FF6A00' },
  { id: 'lemon',      name: 'Lemon Yellow', hex: '#CCFF00' },
];

// RGB option is separate — handled differently in pricing (multiplier instead of color swap)
export const RGB_OPTION: NeonColor = {
  id: 'rgb',
  name: 'RGB Color Changing',
  hex: '#FF2D78',  // Display color (will use gradient in UI)
  isRGB: true,
};
