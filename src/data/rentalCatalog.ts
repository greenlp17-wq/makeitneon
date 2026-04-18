// ═══════════════════════════════════════════════
// Make It Neon — Rental Catalog Data
// ═══════════════════════════════════════════════

export interface RentalSign {
  id: string;
  slug: string;
  name: string;
  name_de: string;
  name_uk?: string;
  category: 'wedding' | 'birthday' | 'business';
  widthCm: number;
  price: number; // CHF per weekend rental
  deposit: number;
  image?: string;
  colorHex: string;
  glowColor: string;
  popular?: boolean;
}

export const rentalSigns: RentalSign[] = [
  // ─── Wedding (most popular) ───
  {
    id: 'rental-better-together',
    slug: 'better-together',
    name: 'Better Together',
    name_de: 'Better Together',
    category: 'wedding',
    widthCm: 80,
    price: 120,
    deposit: 150,
    image: '/images/rental/better-together.webp',
    colorHex: '#FF2D78',
    glowColor: '#FF2D7860',
    popular: true,
  },
  {
    id: 'rental-mr-mrs',
    slug: 'mr-and-mrs',
    name: 'Mr & Mrs',
    name_de: 'Mr & Mrs',
    category: 'wedding',
    widthCm: 70,
    price: 110,
    deposit: 150,
    image: '/images/rental/mr-and-mrs.webp',
    colorHex: '#FFB6C1',
    glowColor: '#FFB6C160',
    popular: true,
  },
  {
    id: 'rental-love',
    slug: 'love-rental',
    name: 'Love',
    name_de: 'Love',
    category: 'wedding',
    widthCm: 50,
    price: 90,
    deposit: 150,
    image: '/images/rental/love.webp',
    colorHex: '#FF2D78',
    glowColor: '#FF2D7860',
  },
  {
    id: 'rental-just-married',
    slug: 'just-married',
    name: 'Just Married',
    name_de: 'Just Married',
    category: 'wedding',
    widthCm: 90,
    price: 130,
    deposit: 150,
    image: '/images/rental/just-married.webp',
    colorHex: '#FFFFFF',
    glowColor: '#FFFFFF40',
    popular: true,
  },
  {
    id: 'rental-forever-always',
    slug: 'forever-and-always',
    name: 'Forever & Always',
    name_de: 'Forever & Always',
    category: 'wedding',
    widthCm: 100,
    price: 140,
    deposit: 150,
    image: '/images/rental/forever-and-always.webp',
    colorHex: '#E8C4FF',
    glowColor: '#E8C4FF50',
  },
  {
    id: 'rental-happily-ever-after',
    slug: 'happily-ever-after',
    name: 'Happily Ever After',
    name_de: 'Happily Ever After',
    category: 'wedding',
    widthCm: 110,
    price: 150,
    deposit: 200,
    image: '/images/rental/happily-ever-after.webp',
    colorHex: '#FFD700',
    glowColor: '#FFD70050',
  },
  // ─── Birthday / Events ───
  {
    id: 'rental-happy-birthday',
    slug: 'happy-birthday',
    name: 'Happy Birthday',
    name_de: 'Happy Birthday',
    category: 'birthday',
    widthCm: 80,
    price: 110,
    deposit: 150,
    image: '/images/rental/happy-birthday.webp',
    colorHex: '#FF2D78',
    glowColor: '#FF2D7860',
    popular: true,
  },
  {
    id: 'rental-lets-party',
    slug: 'lets-party',
    name: "Let's Party",
    name_de: "Let's Party",
    category: 'birthday',
    widthCm: 70,
    price: 100,
    deposit: 150,
    image: '/images/rental/lets-party.webp',
    colorHex: '#00D4FF',
    glowColor: '#00D4FF50',
  },
  {
    id: 'rental-cheers',
    slug: 'cheers-rental',
    name: 'Cheers',
    name_de: 'Cheers',
    category: 'birthday',
    widthCm: 50,
    price: 90,
    deposit: 150,
    image: '/images/rental/cheers.webp',
    colorHex: '#FFD700',
    glowColor: '#FFD70050',
  },
  {
    id: 'rental-oh-baby',
    slug: 'oh-baby',
    name: 'Oh Baby',
    name_de: 'Oh Baby',
    category: 'birthday',
    widthCm: 60,
    price: 100,
    deposit: 150,
    image: '/images/rental/oh-baby.webp',
    colorHex: '#FFB6C1',
    glowColor: '#FFB6C160',
    popular: true,
  },
  // ─── Business / Pop-up ───
  {
    id: 'rental-welcome',
    slug: 'welcome-rental',
    name: 'Welcome',
    name_de: 'Welcome',
    category: 'business',
    widthCm: 60,
    price: 100,
    deposit: 150,
    image: '/images/rental/welcome.webp',
    colorHex: '#FFFFFF',
    glowColor: '#FFFFFF40',
  },
  {
    id: 'rental-open',
    slug: 'open-rental',
    name: 'Open',
    name_de: 'Open',
    category: 'business',
    widthCm: 50,
    price: 90,
    deposit: 150,
    image: '/images/rental/open.webp',
    colorHex: '#FF2D78',
    glowColor: '#FF2D7860',
  },
  {
    id: 'rental-bar',
    slug: 'bar-rental',
    name: 'Bar',
    name_de: 'Bar',
    category: 'business',
    widthCm: 40,
    price: 80,
    deposit: 150,
    image: '/images/rental/bar.webp',
    colorHex: '#00D4FF',
    glowColor: '#00D4FF50',
  },
  {
    id: 'rental-good-vibes',
    slug: 'good-vibes-rental',
    name: 'Good Vibes Only',
    name_de: 'Good Vibes Only',
    category: 'business',
    widthCm: 90,
    price: 130,
    deposit: 150,
    image: '/images/rental/good-vibes-only.webp',
    colorHex: '#39FF14',
    glowColor: '#39FF1450',
  },
];

export interface RentalPackage {
  id: string;
  tier: 'basic' | 'standard' | 'premium';
  icon: string;
  priceFrom: number;
  deposit: number;
  features: string[];
  features_de: string[];
  features_uk?: string[];
  badge?: string;
  badge_de?: string;
  badge_uk?: string;
}

export const rentalPackages: RentalPackage[] = [
  {
    id: 'basic',
    tier: 'basic',
    icon: '🥉',
    priceFrom: 90,
    deposit: 150,
    badge: undefined,
    features: [
      'Weekend rental (Fri–Mon)',
      'Floor/table stand included',
      'Self-pickup in Zurich or postal shipping (+CHF 30)',
      'Dimmer & remote included',
    ],
    features_de: [
      'Wochenend-Miete (Fr–Mo)',
      'Boden-/Tischständer inklusive',
      'Selbstabholung in Zürich oder Postversand (+CHF 30)',
      'Dimmer & Fernbedienung inklusive',
    ],
    features_uk: [
      'Оренда на вихідні (пт–пн)',
      'Підставка в комплекті',
      'Самовивіз у Цюриху або пошта (+CHF 30)',
      'Димер та пульт в комплекті',
    ],
  },
  {
    id: 'standard',
    tier: 'standard',
    icon: '🥈',
    priceFrom: 150,
    deposit: 150,
    badge: 'Most Popular',
    badge_de: 'Am beliebtesten',
    badge_uk: 'Найпопулярніший',
    features: [
      'Weekend rental (Fri–Mon)',
      'Delivery & pickup within Zurich (30km)',
      'Floor/table stand included',
      'Dimmer & remote included',
      'Setup instructions & support',
    ],
    features_de: [
      'Wochenend-Miete (Fr–Mo)',
      'Lieferung & Abholung in Zürich (30km)',
      'Boden-/Tischständer inklusive',
      'Dimmer & Fernbedienung inklusive',
      'Aufbauanleitung & Support',
    ],
    features_uk: [
      'Оренда на вихідні (пт–пн)',
      'Доставка та підбір у Цюриху (30км)',
      'Підставка в комплекті',
      'Димер та пульт в комплекті',
      'Інструкція з монтажу та підтримка',
    ],
  },
  {
    id: 'premium',
    tier: 'premium',
    icon: '🥇',
    priceFrom: 250,
    deposit: 200,
    badge: 'All Inclusive',
    badge_de: 'All Inclusive',
    badge_uk: 'Все включено',
    features: [
      'Weekend rental (Fri–Mon)',
      'Delivery, professional setup & teardown',
      'Floor/table stand + hanging hardware',
      'Photo consultation (best placement)',
      'Dimmer & remote included',
      'Priority support line',
    ],
    features_de: [
      'Wochenend-Miete (Fr–Mo)',
      'Lieferung, professioneller Auf- & Abbau',
      'Boden-/Tischständer + Aufhänge-Hardware',
      'Foto-Beratung (beste Platzierung)',
      'Dimmer & Fernbedienung inklusive',
      'Prioritäts-Support',
    ],
    features_uk: [
      'Оренда на вихідні (пт–пн)',
      'Доставка, професійний монтаж та демонтаж',
      'Підставка + кріплення для підвісу',
      'Консультація з розміщення',
      'Димер та пульт в комплекті',
      'Пріоритетна підтримка',
    ],
  },
];
