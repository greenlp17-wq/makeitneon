// ═══════════════════════════════════════════════
// Make It Neon — Cart Sidebar (Sheet)
// ═══════════════════════════════════════════════

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Send, CheckCircle2, User, Mail, Phone } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart, getColorName, getItemPrice } from '@/hooks/useCart';
import { neonColors } from '@/data/neonColors';
import { sendEmail } from '@/lib/email';

type CheckoutStep = 'cart' | 'form' | 'success';

export function CartSidebar() {
  const { i18n } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || 'en';
  const isDE = i18n.language === 'de';
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();

  // Checkout flow state
  const [step, setStep] = useState<CheckoutStep>('cart');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error on change
    if (formErrors[field]) {
      setFormErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.length < 2) {
      errors.name = isDE ? 'Name erforderlich' : 'Name required';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = isDE ? 'Gültige E-Mail erforderlich' : 'Valid email required';
    }
    if (!formData.phone.trim() || formData.phone.length < 7) {
      errors.phone = isDE ? 'Telefonnummer erforderlich' : 'Phone number required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitOrder = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Build order summary
      const orderItems = items.map(item => {
        const name = isDE ? item.product.name_de : item.product.name_en;
        const size = item.product.availableSizes.find(s => s.id === item.selectedSizeId);
        const colorName = getColorName(item.selectedColorId);
        const price = getItemPrice(item);
        return `${name} — ${colorName}, ${size?.label} (${size?.widthCm}cm), ${item.isOutdoor ? 'Outdoor' : 'Indoor'}, Qty: ${item.quantity} — ${price} CHF`;
      }).join('\n');

      await sendEmail({
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message || '—',
        order_items: orderItems,
        total_price: `${totalPrice} CHF`,
        item_count: totalItems,
      }, 'Cart Order');

      setStep('success');
    } catch (e) {
      console.error(e);
      alert(isDE ? 'Fehler beim Senden. Bitte versuchen Sie es erneut.' : 'Failed to send. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep('cart');
    setFormData({ name: '', email: '', phone: '', message: '' });
    setFormErrors({});
    clearCart();
    closeCart();
  };

  // Reset checkout step when sidebar closes
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeCart();
      // Reset to cart view after animation
      setTimeout(() => {
        if (step !== 'success') setStep('cart');
      }, 300);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col" id="cart-sidebar">
        <SheetHeader className="px-4 sm:px-6 pt-6 pb-4">
          <SheetTitle className="font-heading text-xl flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            {step === 'form'
              ? (isDE ? 'Bestellung abschließen' : 'Complete Order')
              : step === 'success'
              ? (isDE ? 'Bestätigung' : 'Confirmation')
              : (isDE ? 'Warenkorb' : 'Cart')}
            {step === 'cart' && totalItems > 0 && (
              <span className="text-sm font-normal text-muted-foreground">
                ({totalItems} {totalItems === 1 ? (isDE ? 'Artikel' : 'item') : (isDE ? 'Artikel' : 'items')})
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {/* ─── SUCCESS STATE ─── */}
        {step === 'success' ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center px-4 sm:px-6 pb-6">
            <div className="w-20 h-20 rounded-full bg-neon-green/10 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-neon-green" />
            </div>
            <div>
              <h3 className="text-xl font-heading font-bold mb-2">
                {isDE ? 'Vielen Dank!' : 'Thank You!'}
              </h3>
              <p className="text-sm text-muted-foreground max-w-[280px] mx-auto leading-relaxed">
                {isDE
                  ? 'Ihre Bestellung wurde erfolgreich gesendet. Wir werden uns innerhalb von 24 Stunden bei Ihnen melden.'
                  : 'Your order has been submitted successfully. We will contact you within 24 hours to confirm details.'}
              </p>
            </div>
            <Button
              onClick={handleReset}
              className="bg-neon-pink hover:bg-neon-pink/90 text-white font-heading text-sm"
            >
              {isDE ? 'Fertig' : 'Done'}
            </Button>
          </div>
        ) : items.length === 0 ? (
          /* ─── EMPTY STATE ─── */
          <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center px-4 sm:px-6 pb-6">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {isDE ? 'Ihr Warenkorb ist leer' : 'Your cart is empty'}
              </h3>
              <p className="text-sm text-muted-foreground max-w-[240px] mx-auto">
                {isDE
                  ? 'Entdecken Sie unsere Kollektion handgefertigter LED-Neonschilder.'
                  : 'Discover our collection of handcrafted LED neon signs.'}
              </p>
            </div>
            <Button
              render={<Link to={`/${currentLang}/shop`} onClick={closeCart} />}
              className="bg-neon-pink hover:bg-neon-pink/90 text-white font-heading text-sm"
            >
              {isDE ? 'Shop durchsuchen' : 'Browse Shop'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        ) : step === 'form' ? (
          /* ─── ORDER FORM ─── */
          <>
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 space-y-5 py-2">
              {/* Order summary mini */}
              <div className="bg-muted/50 rounded-xl p-4">
                <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                  {isDE ? 'Zusammenfassung' : 'Order Summary'}
                </p>
                {items.map(item => {
                  const name = isDE ? item.product.name_de : item.product.name_en;
                  return (
                    <div key={item.cartId} className="flex justify-between text-sm py-0.5">
                      <span className="text-foreground">{item.quantity}× {name}</span>
                      <span className="font-medium">{getItemPrice(item)} CHF</span>
                    </div>
                  );
                })}
                <div className="border-t border-border mt-2 pt-2 flex justify-between text-base font-bold">
                  <span>{isDE ? 'Gesamt' : 'Total'}</span>
                  <span>{totalPrice} CHF</span>
                </div>
              </div>

              {/* Contact form */}
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {isDE
                    ? 'Bitte geben Sie Ihre Kontaktdaten ein. Wir bestätigen Ihre Bestellung per E-Mail.'
                    : 'Enter your contact details. We\'ll confirm your order by email.'}
                </p>

                <div>
                  <label className="text-sm font-medium mb-1.5 block" htmlFor="order-name">
                    <User className="w-3.5 h-3.5 inline mr-1.5" />
                    {isDE ? 'Name' : 'Full Name'} <span className="text-neon-pink">*</span>
                  </label>
                  <Input
                    id="order-name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder={isDE ? 'Max Mustermann' : 'John Doe'}
                    className="h-10 rounded-lg"
                  />
                  {formErrors.name && <p className="text-destructive text-xs mt-1">{formErrors.name}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block" htmlFor="order-email">
                    <Mail className="w-3.5 h-3.5 inline mr-1.5" />
                    {isDE ? 'E-Mail' : 'Email'} <span className="text-neon-pink">*</span>
                  </label>
                  <Input
                    id="order-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="you@example.com"
                    className="h-10 rounded-lg"
                  />
                  {formErrors.email && <p className="text-destructive text-xs mt-1">{formErrors.email}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block" htmlFor="order-phone">
                    <Phone className="w-3.5 h-3.5 inline mr-1.5" />
                    {isDE ? 'Telefon' : 'Phone'} <span className="text-neon-pink">*</span>
                  </label>
                  <Input
                    id="order-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+41 76 123 45 67"
                    className="h-10 rounded-lg"
                  />
                  {formErrors.phone && <p className="text-destructive text-xs mt-1">{formErrors.phone}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block" htmlFor="order-message">
                    {isDE ? 'Nachricht (optional)' : 'Message (optional)'}
                  </label>
                  <textarea
                    id="order-message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder={isDE
                      ? 'Besondere Wünsche oder Fragen...'
                      : 'Any special requests or questions...'}
                    className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm
                               placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/50
                               outline-none transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Submit footer */}
            <div className="pt-4 pb-6 px-4 sm:px-6 space-y-3 border-t border-border shrink-0">
              <Button
                onClick={handleSubmitOrder}
                disabled={isSubmitting}
                className="w-full bg-neon-pink hover:bg-neon-pink/90 text-white font-heading h-12 text-base
                           shadow-[0_0_16px_rgba(255,45,120,0.3)] hover:shadow-[0_0_24px_rgba(255,45,120,0.5)]
                           transition-all duration-300"
                id="cart-submit-order"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin mr-2" />
                    {isDE ? 'Wird gesendet...' : 'Sending...'}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    {isDE ? 'Bestellung absenden' : 'Submit Order'}
                  </>
                )}
              </Button>
              <button
                className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors underline text-center"
                onClick={() => setStep('cart')}
              >
                {isDE ? '← Zurück zum Warenkorb' : '← Back to cart'}
              </button>
            </div>
          </>
        ) : (
          /* ─── CART ITEMS ─── */
          <>
            {/* Cart items */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 space-y-4 py-2">
              {items.map(item => {
                const name = isDE ? item.product.name_de : item.product.name_en;
                const size = item.product.availableSizes.find(s => s.id === item.selectedSizeId);
                const color = neonColors.find(c => c.id === item.selectedColorId);
                const itemPrice = getItemPrice(item);

                return (
                  <div key={item.cartId} className="flex gap-4 p-3 rounded-xl bg-muted/50" id={`cart-item-${item.cartId}`}>
                    {/* Mini preview */}
                    <div className="w-20 h-16 rounded-lg bg-[#0A0A12] flex items-center justify-center shrink-0 overflow-hidden">
                      <span
                        className="text-xs font-medium text-center leading-tight select-none"
                        style={{
                          color: color?.hex || '#FF2D78',
                          textShadow: `0 0 6px ${color?.glowColor || color?.hex || '#FF2D78'}80`,
                        }}
                      >
                        {name}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold truncate">{name}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <div
                          className="w-3 h-3 rounded-full border border-black/10"
                          style={{ backgroundColor: color?.hex }}
                        />
                        <span className="text-xs text-muted-foreground">
                          {getColorName(item.selectedColorId)}
                        </span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">
                          {size?.label} ({size?.widthCm}cm)
                        </span>
                      </div>
                      {item.isOutdoor && (
                        <span className="inline-block text-[10px] uppercase tracking-wider font-bold text-neon-blue mt-1">
                          Outdoor
                        </span>
                      )}

                      {/* Quantity + price */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1">
                          <button
                            className="w-6 h-6 rounded-md bg-background flex items-center justify-center 
                                       hover:bg-muted transition-colors border border-black/5"
                            onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                          <button
                            className="w-6 h-6 rounded-md bg-background flex items-center justify-center 
                                       hover:bg-muted transition-colors border border-black/5"
                            onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold">{itemPrice} CHF</span>
                          <button
                            className="w-6 h-6 rounded-md hover:bg-destructive/10 flex items-center justify-center 
                                       text-muted-foreground hover:text-destructive transition-colors"
                            onClick={() => removeFromCart(item.cartId)}
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer / Total */}
            <div className="pt-4 pb-6 px-4 sm:px-6 space-y-4 border-t border-border shrink-0">
              <div className="flex items-center justify-between">
                <span className="text-base font-medium">{isDE ? 'Gesamt' : 'Total'}</span>
                <span className="text-xl font-heading font-bold">{totalPrice} CHF</span>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                {isDE
                  ? 'Handgefertigt in Zürich • 2 Jahre Garantie'
                  : 'Handcrafted in Zurich • 2 year warranty'}
              </p>

              <Button
                onClick={() => setStep('form')}
                className="w-full bg-neon-pink hover:bg-neon-pink/90 text-white font-heading h-12 text-base
                           shadow-[0_0_16px_rgba(255,45,120,0.3)] hover:shadow-[0_0_24px_rgba(255,45,120,0.5)]
                           transition-all duration-300"
                id="cart-request-order"
              >
                {isDE ? 'Bestellung anfragen' : 'Request Order'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <div className="flex items-center justify-between">
                <button
                  className="text-xs text-muted-foreground hover:text-destructive transition-colors underline"
                  onClick={clearCart}
                >
                  {isDE ? 'Warenkorb leeren' : 'Clear cart'}
                </button>
                <button
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors underline"
                  onClick={closeCart}
                >
                  {isDE ? 'Weiter einkaufen' : 'Continue shopping'}
                </button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
