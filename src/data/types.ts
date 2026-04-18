// ═══════════════════════════════════════════════
// Make It Neon — Catalog Types
// ═══════════════════════════════════════════════

export type ProductCategory = 'business' | 'wedding' | 'motivation' | 'home-decor';

export interface ProductSize {
  id: string;
  label: string;
  widthCm: number;
  heightCm: number;
  price: number;        // CHF base price for this size
}

export interface Product {
  id: string;
  slug: string;
  name_en: string;
  name_uk?: string;
  name_de: string;
  category: ProductCategory;
  description_en: string;
  description_uk?: string;
  description_de: string;
  availableColors: string[];   // IDs from neonColors
  availableSizes: ProductSize[];
  defaultColorId: string;
  defaultFontId: string;       // ID from neonFonts — for preview rendering
  image?: string;              // Optional real photograph path (e.g. /images/catalog/open.webp)
  bestSeller?: boolean;
  isNew?: boolean;
  rating: number;              // 4.0 – 5.0
  reviewCount: number;
}

export interface CartItem {
  cartId: string;              // unique cart line ID (product.id + color + size + timestamp)
  product: Product;
  selectedColorId: string;
  selectedSizeId: string;
  quantity: number;
  isOutdoor: boolean;
}

export const CATEGORY_LABELS: Record<ProductCategory, { en: string; de: string; uk: string }> = {
  'business':    { en: 'Business',    de: 'Business', uk: 'Бізнес' },
  'wedding':     { en: 'Wedding',     de: 'Hochzeit', uk: 'Весілля' },
  'motivation':  { en: 'Motivation',  de: 'Motivation', uk: 'Мотивація' },
  'home-decor':  { en: 'Home Decor',  de: 'Wohndeko', uk: 'Декор для дому' },
};
