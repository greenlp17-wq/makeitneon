// ═══════════════════════════════════════════════
// Make It Neon — Product Card (Shop Grid)
// ═══════════════════════════════════════════════

import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { neonFonts } from '@/data/fonts';
import { neonColors } from '@/data/neonColors';
import type { Product } from '@/data/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { lang } = useParams();
  const { i18n } = useTranslation();
  const currentLang = lang || 'en';
  const isDE = i18n.language === 'de';
  const isUK = i18n.language === 'uk';

  const name = isUK ? product.name_uk || product.name_en : isDE ? product.name_de : product.name_en;
  const fromPrice = Math.min(...product.availableSizes.map(s => s.price));
  const font = neonFonts.find(f => f.id === product.defaultFontId);
  const color = neonColors.find(c => c.id === product.defaultColorId);
  const glowHex = color?.glowColor || color?.hex || '#FF2D78';

  return (
    <Link
      to={`/${currentLang}/shop/${product.slug}`}
      className="group block"
      id={`product-card-${product.slug}`}
    >
      <article className="rounded-2xl overflow-hidden transition-all duration-500 
                          hover:shadow-2xl hover:scale-[1.03]
                          bg-white border border-black/[0.04]
                          hover:border-transparent"
        style={{
          boxShadow: 'none',
          transition: 'box-shadow 0.5s ease, transform 0.5s ease, border-color 0.5s ease',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = 
            `0 0 20px ${glowHex}30, 0 10px 40px rgba(0,0,0,0.1)`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        }}
      >
        {/* Preview Area — real photo or dark background with neon text */}
        <div className="relative aspect-[4/3] bg-[#0A0A12] flex items-center justify-center overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 z-[2]" />

          {product.image ? (
            /* Real photograph */
            <img
              src={product.image}
              alt={name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            /* Neon text preview fallback */
            <span
              className="relative z-10 text-center px-6 leading-tight select-none 
                         transition-all duration-500 group-hover:scale-105"
              style={{
                fontFamily: font ? `'${font.googleName}', cursive` : 'cursive',
                fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                color: color?.hex || '#FF2D78',
                textShadow: `
                  0 0 7px ${glowHex},
                  0 0 12px ${glowHex},
                  0 0 25px ${glowHex}90,
                  0 0 50px ${glowHex}50
                `,
                filter: 'brightness(1.1)',
              }}
            >
              {name}
            </span>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2 z-20">
            {product.bestSeller && (
              <Badge className="bg-neon-warm text-black text-[10px] font-bold uppercase tracking-wider 
                                border-none shadow-md">
                {isUK ? 'Хіт' : 'Best Seller'}
              </Badge>
            )}
            {product.isNew && (
              <Badge className="bg-neon-green text-black text-[10px] font-bold uppercase tracking-wider 
                                border-none shadow-md">
                {isUK ? 'Новинка' : 'New'}
              </Badge>
            )}
          </div>
        </div>

        {/* Info Area */}
        <div className="p-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-semibold leading-tight group-hover:text-neon-pink transition-colors">
              {name}
            </h3>
            <div className="flex items-center gap-1 shrink-0 text-xs text-muted-foreground">
              <Star className="w-3.5 h-3.5 fill-neon-warm text-neon-warm" />
              <span className="font-medium">{product.rating.toFixed(1)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {isUK ? 'від' : isDE ? 'ab' : 'from'} <span className="text-foreground font-semibold">{fromPrice} CHF</span>
            </p>
            <span className="text-xs font-medium text-neon-pink opacity-0 group-hover:opacity-100 
                             transition-opacity duration-300">
              {isUK ? 'Дивитись →' : isDE ? 'Ansehen →' : 'View →'}
            </span>
          </div>

          {/* Color dots preview */}
          <div className="flex gap-1 pt-1">
            {product.availableColors.slice(0, 6).map(colorId => {
              const c = neonColors.find(nc => nc.id === colorId);
              return (
                <div
                  key={colorId}
                  className="w-3 h-3 rounded-full border border-black/10"
                  style={{ backgroundColor: c?.hex || '#888' }}
                  title={c?.name}
                />
              );
            })}
            {product.availableColors.length > 6 && (
              <div className="w-3 h-3 rounded-full bg-gray-200 flex items-center justify-center text-[6px] text-gray-500">
                +{product.availableColors.length - 6}
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
