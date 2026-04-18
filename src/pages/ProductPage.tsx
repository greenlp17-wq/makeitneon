// ═══════════════════════════════════════════════
// Make It Neon — Product Page
// ═══════════════════════════════════════════════

import { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Star, ShoppingCart, Shield, Zap, Package, Ruler, Check, Sparkles, Sun, CloudRain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ProductCard } from '@/components/shop/ProductCard';
import { getProductBySlug, getRelatedProducts } from '@/data/catalog';
import { neonColors } from '@/data/neonColors';
import { neonFonts } from '@/data/fonts';
import { ADDON_OUTDOOR_MULTIPLIER } from '@/data/pricing';
import { useCart } from '@/hooks/useCart';
import { SEO, createProductSchema, createBreadcrumbSchema } from '@/components/seo/SEO';
export default function ProductPage() {
  const {
    lang,
    slug
  } = useParams();
  const navigate = useNavigate();
  const {
    i18n
  } = useTranslation();
  const currentLang = lang || 'en';
  const isDE = i18n.language === 'de';
  const isUK = i18n.language === 'uk';
  const {
    addToCart
  } = useCart();
  const product = useMemo(() => getProductBySlug(slug || ''), [slug]);

  // If product not found, redirect to shop
  useEffect(() => {
    if (!product) {
      navigate(`/${currentLang}/shop`, {
        replace: true
      });
    }
  }, [product, navigate, currentLang]);

  // State — use lazy initializers to avoid cascading setState in useEffect
  const [selectedColorId, setSelectedColorId] = useState(() => product?.defaultColorId ?? '');
  const [selectedSizeId, setSelectedSizeId] = useState(() => product?.availableSizes[1]?.id || product?.availableSizes[0]?.id || '');
  const [isOutdoor, setIsOutdoor] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [prevProductId, setPrevProductId] = useState(product?.id);

  // Reset defaults when product changes (e.g. navigating between products)
  if (product && product.id !== prevProductId) {
    setPrevProductId(product.id);
    setSelectedColorId(product.defaultColorId);
    setSelectedSizeId(product.availableSizes[1]?.id || product.availableSizes[0]?.id || '');
  }
  if (!product) return null;
  const name = isUK ? product.name_uk || product.name_en : isDE ? product.name_de : product.name_en;
  const description = isUK ? product.description_uk || product.description_en : isDE ? product.description_de : product.description_en;
  const font = neonFonts.find(f => f.id === product.defaultFontId);
  const selectedColor = neonColors.find(c => c.id === selectedColorId);
  const glowHex = selectedColor?.glowColor || selectedColor?.hex || '#FF2D78';
  const selectedSize = product.availableSizes.find(s => s.id === selectedSizeId);
  const relatedProducts = getRelatedProducts(product);

  // Price calculation
  const basePrice = selectedSize?.price || 0;
  const outdoorMultiplier = isOutdoor ? ADDON_OUTDOOR_MULTIPLIER : 1;
  const unitPrice = Math.round(basePrice * outdoorMultiplier);
  const totalPrice = unitPrice * quantity;
  const handleAddToCart = () => {
    addToCart(product, selectedColorId, selectedSizeId, quantity, isOutdoor);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };
  const detailsContent = <>
      {/* Includes */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold">{isUK ? 'У комплекті' : isDE ? 'Im Lieferumfang' : 'Includes'}</h4>
        <div className="grid grid-cols-2 gap-2">
          {[{
          icon: Zap,
          text: isUK ? 'Блок живлення' : isDE ? 'Netzteil' : 'Power adapter'
        }, {
          icon: Package,
          text: isUK ? 'Комплект кріплень' : isDE ? 'Wandmontage-Set' : 'Wall mounting kit'
        }, {
          icon: Shield,
          text: isUK ? 'Гарантія 2 роки' : isDE ? '2 Jahre Garantie' : '2 year warranty'
        }, {
          icon: Sparkles,
          text: isUK ? 'Димер та пульт' : isDE ? 'Dimmer & Fernbedienung' : 'Dimmer & remote'
        }].map(({
          icon: Icon,
          text
        }) => <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon className="w-4 h-4 text-neon-green shrink-0" />
              {text}
            </div>)}
        </div>
      </div>

      {/* Specifications */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold">{isUK ? 'Специфікації' : isDE ? 'Spezifikationen' : 'Specifications'}</h4>
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          {[[isUK ? 'Матеріал' : isDE ? 'Material' : 'Material', isUK ? 'Гнучкий LED неон на акрилі' : isDE ? 'LED Neon Flex auf Acryl' : 'LED Neon Flex on Acrylic'], [isUK ? 'Потужність' : isDE ? 'Leistung' : 'Wattage', '12V DC, 5-15W'], [isUK ? 'Термін служби' : isDE ? 'Lebensdauer' : 'Lifespan', '50,000+ hours'], ['IP', isOutdoor ? 'IP65 (Waterproof)' : 'IP20 (Indoor)'], [isUK ? 'Гарантія' : isDE ? 'Garantie' : 'Warranty', isUK ? '2 роки' : isDE ? '2 Jahre' : '2 Years'], [isUK ? 'Доставка' : isDE ? 'Lieferzeit' : 'Delivery', isUK ? '5-7 робочих днів' : isDE ? '5-7 Werktage' : '5-7 business days']].map(([label, value]) => <div key={label} className="contents">
              <span className="text-muted-foreground">{label}</span>
              <span className="font-medium">{value}</span>
            </div>)}
        </div>
      </div>
    </>;
  return <>
      <SEO title={`${name} — LED Neon Sign | Make It Neon`} description={description} ogType="product" jsonLd={[createProductSchema({
      name,
      description,
      price: basePrice,
      slug: product.slug,
      lang: currentLang
    }), createBreadcrumbSchema([{
      name: 'Home',
      url: `/${currentLang}`
    }, {
      name: isUK ? 'Магазин' : isDE ? 'Shop' : 'Shop',
      url: `/${currentLang}/shop`
    }, {
      name,
      url: `/${currentLang}/shop/${product.slug}`
    }])]} />
    <section className="section-padding" id="product-page">
      <div className="container-tight">
        {/* Back */}
        <Link to={`/${currentLang}/shop`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground 
                     transition-colors mb-8" id="back-to-shop">
          <ArrowLeft className="w-4 h-4" />
          {isUK ? 'Назад до магазину' : isDE ? 'Zurück zum Shop' : 'Back to Shop'}
        </Link>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Preview */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#0A0A12] flex items-center justify-center" id="product-preview">
              {product.image ? (/* Real product photograph */
              <>
                  <img src={product.image} alt={name} className="absolute inset-0 w-full h-full object-cover" />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 z-[2]" />
                </>) : (/* CSS neon text fallback */
              <>
                  {/* Ambient glow */}
                  <div className="absolute inset-0 opacity-20" style={{
                  background: `radial-gradient(ellipse at center, ${glowHex}40 0%, transparent 70%)`
                }} />

                  {/* Neon text */}
                  <span className="relative z-10 text-center px-8 leading-snug select-none" style={{
                  fontFamily: font ? `'${font.googleName}', cursive` : 'cursive',
                  fontSize: 'clamp(2rem, 8vw, 4rem)',
                  color: selectedColor?.hex || '#FF2D78',
                  textShadow: `
                        0 0 7px ${glowHex},
                        0 0 15px ${glowHex},
                        0 0 30px ${glowHex}90,
                        0 0 60px ${glowHex}50,
                        0 0 100px ${glowHex}30
                      `,
                  filter: 'brightness(1.1)'
                }}>
                    {name}
                  </span>
                </>)}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2 z-20">
                {product.bestSeller && <Badge className="bg-neon-warm text-black text-[10px] font-bold uppercase tracking-wider border-none">
                    {isUK ? 'Хіт' : 'Best Seller'}
                  </Badge>}
                {product.isNew && <Badge className="bg-neon-green text-black text-[10px] font-bold uppercase tracking-wider border-none">
                    {isUK ? 'Новинка' : 'New'}
                  </Badge>}
              </div>

              {/* Size overlay */}
              {selectedSize && <div className="absolute bottom-4 right-4 z-20 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                  <span className="text-white/80 text-xs font-medium">
                    {selectedSize.widthCm} × {selectedSize.heightCm} cm
                  </span>
                </div>}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map(star => <Star key={star} className={`w-4 h-4 ${star <= Math.round(product.rating) ? 'fill-neon-warm text-neon-warm' : 'fill-muted text-muted'}`} />)}
              </div>
              <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground">
                ({product.reviewCount} {isUK ? 'відгуків' : isDE ? 'Bewertungen' : 'reviews'})
              </span>
            </div>

            <Separator className="my-2 hidden lg:block opacity-50" />
            
            {/* Details for Desktop (Under Photo) */}
            <div className="hidden lg:flex flex-col gap-6">
              {detailsContent}
            </div>
          </div>

          {/* Right: Options */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl mb-2">{name}</h1>
              <p className="text-muted-foreground leading-relaxed">{description}</p>
            </div>

            <Separator />

            {/* Color Selection */}
            <div>
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-neon-pink" />
                {isUK ? 'Колір' : isDE ? 'Farbe' : 'Color'}
                <span className="text-muted-foreground font-normal">— {selectedColor?.name}</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {product.availableColors.map(colorId => {
                  const color = neonColors.find(c => c.id === colorId);
                  if (!color) return null;
                  const isActive = selectedColorId === colorId;
                  return <button key={colorId} onClick={() => setSelectedColorId(colorId)} className={`w-10 h-10 rounded-full transition-all duration-200 flex items-center justify-center
                        ${isActive ? 'ring-2 ring-offset-2 ring-foreground scale-110' : 'hover:scale-110 border-2 border-black/10'}`} style={{
                    backgroundColor: color.hex
                  }} title={color.name} aria-label={color.name}>
                      {isActive && <Check className="w-4 h-4" style={{
                      color: ['white', 'warm-white', 'yellow', 'lemon', 'green'].includes(colorId) ? '#000' : '#fff'
                    }} />}
                    </button>;
                })}
              </div>
            </div>

            <Separator />

            {/* Size Selection */}
            <div>
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Ruler className="w-4 h-4 text-neon-blue" />
                {isUK ? 'Розмір' : isDE ? 'Größe' : 'Size'}
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {product.availableSizes.map(size => {
                  const isActive = selectedSizeId === size.id;
                  return <button key={size.id} onClick={() => setSelectedSizeId(size.id)} className={`p-3 rounded-xl text-left transition-all duration-200 border
                        ${isActive ? 'border-foreground bg-foreground text-background shadow-lg' : 'border-border bg-background hover:border-foreground/30'}`} id={`size-${size.id}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold">{size.label}</span>
                        <span className={`text-sm font-bold ${isActive ? 'text-background' : 'text-foreground'}`}>
                          {size.price} CHF
                        </span>
                      </div>
                      <span className={`text-xs ${isActive ? 'text-background/70' : 'text-muted-foreground'}`}>
                        {size.widthCm} × {size.heightCm} cm
                      </span>
                    </button>;
                })}
              </div>
            </div>

            <Separator />

            {/* Indoor / Outdoor */}
            <div>
              <h4 className="text-sm font-semibold mb-3">
                {isUK ? 'Використання' : isDE ? 'Verwendung' : 'Usage'}
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setIsOutdoor(false)} className={`p-3 rounded-xl text-left transition-all duration-200 border flex items-center gap-3
                    ${!isOutdoor ? 'border-foreground bg-foreground text-background shadow-lg' : 'border-border bg-background hover:border-foreground/30'}`} id="usage-indoor">
                  <Sun className={`w-5 h-5 ${!isOutdoor ? 'text-background' : 'text-neon-warm'}`} />
                  <div>
                    <div className="text-sm font-semibold">{isUK ? 'В приміщенні' : isDE ? 'Innenbereich' : 'Indoor'}</div>
                    <div className={`text-xs ${!isOutdoor ? 'text-background/70' : 'text-muted-foreground'}`}>
                      {isUK ? 'Включено' : isDE ? 'Inklusive' : 'Included'}
                    </div>
                  </div>
                </button>
                <button onClick={() => setIsOutdoor(true)} className={`p-3 rounded-xl text-left transition-all duration-200 border flex items-center gap-3
                    ${isOutdoor ? 'border-foreground bg-foreground text-background shadow-lg' : 'border-border bg-background hover:border-foreground/30'}`} id="usage-outdoor">
                  <CloudRain className={`w-5 h-5 ${isOutdoor ? 'text-background' : 'text-neon-blue'}`} />
                  <div>
                    <div className="text-sm font-semibold">{isUK ? 'На вулиці' : isDE ? 'Außenbereich' : 'Outdoor'}</div>
                    <div className={`text-xs ${isOutdoor ? 'text-background/70' : 'text-muted-foreground'}`}>
                      +25% (IP65)
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <Separator />

            {/* Quantity */}
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold">{isUK ? 'Кількість' : isDE ? 'Anzahl' : 'Quantity'}</h4>
              <div className="flex items-center gap-3">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-9 h-9 rounded-lg border border-border flex items-center justify-center 
                             hover:bg-muted transition-colors text-lg font-medium" aria-label="Decrease">
                  −
                </button>
                <span className="w-8 text-center font-semibold text-lg">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-9 h-9 rounded-lg border border-border flex items-center justify-center 
                             hover:bg-muted transition-colors text-lg font-medium" aria-label="Increase">
                  +
                </button>
              </div>
            </div>

            {/* Price + Add to Cart */}
            <div className="glass p-6 rounded-2xl space-y-4">
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-sm text-muted-foreground">{isUK ? 'Разом' : isDE ? 'Gesamt' : 'Total'}</span>
                  <div className="text-3xl font-heading font-bold">{totalPrice} CHF</div>
                </div>
                {isOutdoor && <span className="text-xs text-muted-foreground">
                    {isUK ? 'вкл. захист від води' : isDE ? 'inkl. Outdoor-Schutz' : 'incl. outdoor protection'}
                  </span>}
              </div>

              <Button onClick={handleAddToCart} className={`w-full h-12 text-base font-heading font-semibold transition-all duration-300 ${addedFeedback ? 'bg-neon-green text-black shadow-[0_0_16px_rgba(57,255,20,0.3)]' : 'bg-neon-pink hover:bg-neon-pink/90 text-white shadow-[0_0_16px_rgba(255,45,120,0.3)] hover:shadow-[0_0_24px_rgba(255,45,120,0.5)]'}`} id="add-to-cart">
                {addedFeedback ? <><Check className="w-5 h-5 mr-2" />{isUK ? 'Додано!' : isDE ? 'Hinzugefügt!' : 'Added!'}</> : <><ShoppingCart className="w-5 h-5 mr-2" />{isUK ? 'В кошик' : isDE ? 'In den Warenkorb' : 'Add to Cart'}</>}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                ✓ {isUK ? 'Безкоштовний макет' : isDE ? 'Kostenloses Design-Mockup' : 'Free design mockup'} &nbsp;•&nbsp;
                ✓ {isUK ? 'Гарантія 2 роки' : isDE ? '2 Jahre Garantie' : '2 year warranty'} &nbsp;•&nbsp;
                ✓ {isUK ? 'Ручна робота в Цюриху' : isDE ? 'Handgefertigt in Zürich' : 'Handcrafted in Zurich'}
              </p>
            </div>

            {/* Details for Mobile (At Bottom) */}
            <div className="flex lg:hidden flex-col gap-6 mt-4">
              {detailsContent}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && <div className="mt-20">
            <h2 className="text-2xl mb-8 text-center">
              {isUK ? 'Вам також може сподобатися' : isDE ? 'Ähnliche Schilder' : 'You Might Also Like'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>}
      </div>
    </section>
    </>;
}