import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { StaggerGroup } from '@/components/animations/StaggerGroup';
import { ArrowRight, Star, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { neonColors } from '@/data/neonColors';
import { catalog } from '@/data/catalog';

export function FeaturedProductsSection() {
  const { i18n } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || 'en';
  const isDE = i18n.language === 'de';
  const isUK = i18n.language === 'uk';

  // Get best sellers
  const featured = catalog.filter(p => p.bestSeller).slice(0, 6);

  return (
    <section className="section-padding bg-background" id="featured-products">
      <div className="container-tight">
        <ScrollReveal direction="up" className="text-center mb-12">
          <h2 className="mb-4">
            {isUK ? 'Наші Бестселери' : isDE ? 'Unsere Bestseller' : 'Our Bestsellers'}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {isUK
              ? 'Найпопулярніші неонові вивіски ручної роботи, які обирають наші клієнти.'
              : isDE
              ? 'Die beliebtesten handgefertigten LED-Neonschilder unserer Kunden.'
              : 'The most popular handcrafted LED neon signs loved by our customers.'}
          </p>
        </ScrollReveal>

        <StaggerGroup
          childSelector=".featured-card"
          staggerAmount={0.08}
          direction="up"
          distance={30}
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {featured.map(product => {
            const name = isUK ? product.name_uk || product.name_en : isDE ? product.name_de : product.name_en;
            const basePrice = product.availableSizes[0]?.price ?? 0;
            const color = neonColors.find(c => c.id === product.defaultColorId);

            return (
              <Link
                key={product.id}
                to={`/${currentLang}/shop/${product.slug}`}
                className="featured-card group relative rounded-2xl overflow-hidden bg-[#0A0A12] aspect-[4/3] block"
                id={`featured-${product.id}`}
              >
                {/* Image or neon text */}
                {product.image ? (
                  <img
                    src={product.image}
                    alt={name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <span
                      className="font-heading text-2xl sm:text-3xl font-bold text-center select-none"
                      style={{
                        color: color?.hex || '#FF2D78',
                        textShadow: `0 0 10px ${color?.glowColor || color?.hex || '#FF2D78'}60, 0 0 30px ${color?.glowColor || color?.hex || '#FF2D78'}30`,
                      }}
                    >
                      {name}
                    </span>
                  </div>
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Best Seller badge */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-neon-warm/90 text-black text-[10px] font-bold uppercase tracking-wider">
                    <Star className="w-3 h-3" />
                    {isUK ? 'Хіт' : 'Best Seller'}
                  </span>
                </div>

                {/* Info */}
                <div className="absolute bottom-0 inset-x-0 p-4">
                  <h3 className="text-white font-heading font-bold text-sm sm:text-base mb-1">{name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm font-medium">
                      {isUK ? 'від' : isDE ? 'ab' : 'from'} {basePrice} CHF
                    </span>
                    <span className="text-white/60 text-xs flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ShoppingBag className="w-3 h-3" />
                      {isUK ? 'Дивитись' : isDE ? 'Ansehen' : 'View'}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </StaggerGroup>

        <ScrollReveal className="text-center mt-10">
          <Button
            render={<Link to={`/${currentLang}/shop`} />}
            variant="outline"
            size="lg"
            className="font-heading text-sm font-semibold group"
            id="featured-see-all"
          >
            {isUK ? 'Дивитись все' : isDE ? 'Alle Schilder ansehen' : 'Browse All Signs'}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
