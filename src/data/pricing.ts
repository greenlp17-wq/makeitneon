// ═══════════════════════════════════════════════
// Make It Neon — Pricing Configuration
// All prices in CHF (Swiss Francs)
// ═══════════════════════════════════════════════

// Core pricing (meter-based calculation)
export const PRICE_PER_METER_NEON = 45;   // CHF per meter neon flex tape (milling groove length)
export const PRICE_PER_METER_LASER = 12;  // CHF per meter acrylic cut (perimeter)
export const BASE_COST = 60;              // CHF base cost per sign (electronics, assembly, packaging)
export const PADDING_CM = 3;              // cm — acrylic padding around text on each side

// ─── Addon Multipliers (applied to base price) ───
export const ADDON_OUTDOOR_MULTIPLIER = 1.25;   // +25% for IP65 waterproof coating
export const ADDON_RGB_MULTIPLIER = 1.50;        // +50% for RGB controller + LED strip

// ─── Addon Fixed Costs ───
export const ADDON_DIMMER_COST = 0;               // CHF — dimmer + remote included FREE with every sign
export const ADDON_HANGING_COST = 20;             // CHF — hanging wire kit
export const ADDON_STAND_COST = 45;               // CHF — acrylic desk stand

// ─── Backboard Options ───
export const ADDON_ARAKAL_COST = 30;              // CHF — vinyl color fill on clear backboard
export const ADDON_GLOSSY_BACKBOARD = 15;         // CHF — glossy white or black backboard
export const ADDON_METALLIC_BACKBOARD = 25;       // CHF — gold or silver mirror backboard

// ─── Backboard Shape Config ───
export type BackboardShape = 'rectangle' | 'cut-to-shape' | 'cut-to-letter';

export const ADDON_CUT_TO_SHAPE_COST = 15;     // CHF — contour-cut following text outline
export const ADDON_CUT_TO_LETTER_COST = 35;    // CHF — individual letter backing (invisible mount)

export const BACKBOARD_SHAPES: { id: BackboardShape; label: string; description: string; cost: number }[] = [
  { id: 'rectangle',     label: 'Rectangle',     description: 'Standard rectangular backing',              cost: 0 },
  { id: 'cut-to-shape',  label: 'Cut to Shape',   description: 'Contour follows your text outline',         cost: ADDON_CUT_TO_SHAPE_COST },
  { id: 'cut-to-letter', label: 'Cut to Letter',  description: 'Individual backing per letter (invisible)',  cost: ADDON_CUT_TO_LETTER_COST },
];

// ─── Backboard Color Config ───
export type BackboardStyle = 'cut-around' | 'rectangle';
export type BackboardColor = 'clear' | 'glossy-white' | 'glossy-black' | 'gold-mirror' | 'silver-mirror' | 'arakal';

export const BACKBOARD_COLORS: { id: BackboardColor; label: string; cost: number; hex: string }[] = [
  { id: 'clear',         label: 'Clear Acrylic',    cost: 0,  hex: 'transparent' },
  { id: 'glossy-white',  label: 'Glossy White',     cost: ADDON_GLOSSY_BACKBOARD,   hex: '#FFFFFF' },
  { id: 'glossy-black',  label: 'Glossy Black',     cost: ADDON_GLOSSY_BACKBOARD,   hex: '#1a1a1a' },
  { id: 'gold-mirror',   label: 'Gold Mirror',      cost: ADDON_METALLIC_BACKBOARD, hex: '#D4AF37' },
  { id: 'silver-mirror', label: 'Silver Mirror',    cost: ADDON_METALLIC_BACKBOARD, hex: '#C0C0C0' },
  { id: 'arakal',        label: 'Custom Color Fill', cost: ADDON_ARAKAL_COST,       hex: '#FF2D78' },
];

// ─── Mount Types ───
export type MountType = 'wall' | 'hanging' | 'stand';

export const MOUNT_OPTIONS: { id: MountType; label: string; description: string; cost: number }[] = [
  { id: 'wall',    label: 'Wall Mount Kit',  description: 'Included with every sign', cost: 0 },
  { id: 'hanging', label: 'Hanging Kit',     description: 'Ceiling/overhead mounting', cost: ADDON_HANGING_COST },
  { id: 'stand',   label: 'Acrylic Stand',   description: 'Desk or table display',    cost: ADDON_STAND_COST },
];

// ─── Size Presets (for UI quick selection) ───
export const SIZE_PRESETS = [
  { id: 'mini',       label: 'Mini',       widthCm: 40,  description: '~4 characters' },
  { id: 'small',      label: 'Small',      widthCm: 50,  description: '~6 characters' },
  { id: 'medium',     label: 'Medium',     widthCm: 66,  description: '~9 characters' },
  { id: 'large',      label: 'Large',      widthCm: 80,  description: '~16 characters' },
  { id: 'xl',         label: 'X-Large',    widthCm: 107, description: '~24 characters' },
  { id: 'xxl',        label: 'XX-Large',   widthCm: 140, description: '~30 characters' },
] as const;

// ─── Reference price table (for internal calibration, NOT used in calculator) ───
// 1-line: 40cm=148, 50=168, 60=188, 66=198, 71=208, 76=218, 80=223, 89=228, 100=288, 107=308, 114=308, 120=318, 127=338, 140=368
// 2-line: 40=178, 50=188, 60=198, 66=208, 71=228, 76=248, 80=268, 89=278, 100=348, 107=358, 114=358, 127=418, 140=448
