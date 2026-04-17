import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import {
  PartyPopper, CalendarCheck, Truck, RotateCcw,
  Check, ArrowRight, Sparkles, Mail, Phone, User,
  ChevronDown, ChevronUp, Star,
} from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { StaggerGroup } from '@/components/animations/StaggerGroup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SEO } from '@/components/seo/SEO';
import { rentalSigns, rentalPackages, type RentalSign } from '@/data/rentalCatalog';
import { sendEmail } from '@/lib/email';

type RentalCategory = 'all' | 'wedding' | 'birthday' | 'business';

export default function RentalPage() {
  const { i18n } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || 'en';
  const isDE = i18n.language === 'de';

  // State
  const [activeCategory, setActiveCategory] = useState<RentalCategory>('all');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedSign, setSelectedSign] = useState<RentalSign | null>(null);
  const [selectedPackage, setSelectedPackage] = useState('standard');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', date: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  // Categories
  const categories: { key: RentalCategory; label: string; label_de: string }[] = [
    { key: 'all', label: 'All Signs', label_de: 'Alle Schilder' },
    { key: 'wedding', label: 'Wedding', label_de: 'Hochzeit' },
    { key: 'birthday', label: 'Birthday & Events', label_de: 'Geburtstag & Events' },
    { key: 'business', label: 'Business', label_de: 'Business' },
  ];

  const filteredSigns = activeCategory === 'all'
    ? rentalSigns
    : rentalSigns.filter(s => s.category === activeCategory);

  // FAQ data
  const faqs = isDE ? [
    { q: 'Wie lange kann ich ein Schild mieten?', a: 'Standard ist ein Wochenende (Fr–Mo). Wöchentliche Miete ist auch möglich — kontaktieren Sie uns für einen Spezialpreis.' },
    { q: 'Was passiert, wenn das Schild beschädigt wird?', a: 'Kleinere Gebrauchsspuren sind normal und vom Deposit abgedeckt. Bei grösseren Schäden wird die Kaution teilweise oder ganz einbehalten.' },
    { q: 'Kann ich das Schild per Post erhalten?', a: 'Ja! Wir versenden in spezieller Schutzverpackung. Sie erhalten das Schild 3-5 Tage vor dem Event. Rücksendung im gleichen Karton.' },
    { q: 'Wie früh soll ich buchen?', a: 'Beliebte Schilder sind schnell vergriffen, besonders in der Hochzeitssaison (Mai–Sept). Wir empfehlen, mindestens 2-4 Wochen im Voraus zu buchen.' },
    { q: 'Brauche ich eine spezielle Steckdose?', a: 'Nein! Unsere LED-Neonschilder laufen mit einem normalen 230V Netzteil (CH/EU Stecker). Verbrauch: nur 5-15 Watt.' },
  ] : [
    { q: 'How long can I rent a sign?', a: 'Standard rental is a weekend (Fri–Mon). Weekly rentals are also available — contact us for a special rate.' },
    { q: 'What happens if the sign is damaged?', a: 'Minor wear and tear is normal and covered by the deposit. For significant damage, the deposit may be partially or fully retained.' },
    { q: 'Can I receive the sign by mail?', a: 'Yes! We ship in protective packaging. You receive the sign 3-5 days before your event. Return in the same box with the included shipping label.' },
    { q: 'How early should I book?', a: 'Popular signs book quickly, especially during wedding season (May–Sept). We recommend booking 2-4 weeks in advance.' },
    { q: 'Do I need a special power outlet?', a: 'No! Our LED neon signs run on a standard 230V adapter (CH/EU plug). Power consumption is only 5-15 watts.' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.date) return;

    setFormStatus('sending');
    try {
      const pkg = rentalPackages.find(p => p.id === selectedPackage);
      await sendEmail({
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || '—',
        message: formData.message || '—',
        rental_sign: selectedSign ? (isDE ? selectedSign.name_de : selectedSign.name) : 'Not specified',
        rental_package: pkg ? `${pkg.icon} ${pkg.tier.charAt(0).toUpperCase() + pkg.tier.slice(1)}` : '—',
        event_date: formData.date,
      }, 'Rental Inquiry');
      setFormStatus('success');
    } catch {
      setFormStatus('idle');
    }
  };

  // Steps
  const howSteps = isDE ? [
    { icon: PartyPopper, title: 'Schild wählen', desc: 'Durchsuchen Sie unsere Kollektion und wählen Sie das perfekte Neonschild für Ihren Anlass.' },
    { icon: CalendarCheck, title: 'Datum buchen', desc: 'Sichern Sie Ihr Wunschdatum mit einer Anzahlung von 50% + Kaution.' },
    { icon: Truck, title: 'Geniessen', desc: 'Wir liefern oder versenden das Schild rechtzeitig. Einstecken und Ihr Event zum Leuchten bringen!' },
    { icon: RotateCcw, title: 'Zurückgeben', desc: 'Nach dem Event verpacken Sie das Schild im Originalkarton. Kaution wird innerhalb von 5 Tagen zurückerstattet.' },
  ] : [
    { icon: PartyPopper, title: 'Choose Your Sign', desc: 'Browse our collection and pick the perfect neon sign for your occasion.' },
    { icon: CalendarCheck, title: 'Book Your Date', desc: 'Secure your date with a 50% deposit + refundable security deposit.' },
    { icon: Truck, title: 'Enjoy', desc: 'We deliver or ship the sign in time. Plug it in and make your event glow!' },
    { icon: RotateCcw, title: 'Return', desc: 'After the event, repack the sign in the original box. Deposit refunded within 5 business days.' },
  ];

  return (
    <>
      <SEO
        title={isDE
          ? 'Neonschild mieten — Für Hochzeiten & Events | Make It Neon'
          : 'Rent a Neon Sign — For Weddings & Events | Make It Neon'}
        description={isDE
          ? 'Mieten Sie LED-Neonschilder für Hochzeiten, Geburtstage und Events. Ab CHF 80 pro Wochenende. Lieferung in Zürich & Schweiz.'
          : 'Rent LED neon signs for weddings, birthdays, and events. From CHF 80 per weekend. Delivery in Zurich & Switzerland.'}
      />

      {/* ─── HERO ─── */}
      <section className="relative bg-calc-bg overflow-hidden -mt-20 pt-[calc(clamp(4rem,8vw,8rem)+5rem)] pb-12 md:pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,45,120,0.08)_0%,transparent_60%)]" />
        <div className="container-tight relative z-10 text-center">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-pink/10 text-neon-pink text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              {isDE ? 'Neu: Neonschild-Vermietung' : 'New: Neon Sign Rental'}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
              {isDE ? 'Mieten Sie Ihr' : 'Rent Your'}{' '}
              <span className="gradient-neon-text">{isDE ? 'Neonschild' : 'Neon Sign'}</span>
            </h1>
            <p className="text-lg text-white/50 max-w-3xl mx-auto mb-8 leading-relaxed">
              {isDE
                ? 'Perfekt für Hochzeiten, Geburtstage und Events. Ab CHF 80 pro Wochenende. Kaution wird vollständig zurückerstattet.'
                : 'Perfect for weddings, birthdays, and events. From CHF 80 per weekend. Deposit fully refundable.'}
            </p>
            <div className="flex flex-wrap gap-6 justify-center text-white/30 text-sm font-medium">
              <span>✓ {isDE ? 'Ab CHF 80/Wochenende' : 'From CHF 80/weekend'}</span>
              <span>✓ {isDE ? 'Kaution zurückerstattet' : 'Deposit refunded'}</span>
              <span>✓ {isDE ? 'Lieferung & Versand' : 'Delivery & shipping'}</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="section-padding bg-background" id="rental-how-it-works">
        <div className="container-tight">
          <ScrollReveal className="text-center mb-14">
            <h2 className="mb-3">{isDE ? 'So funktioniert die Miete' : 'How Rental Works'}</h2>
            <p className="text-muted-foreground text-lg">
              {isDE ? 'In vier einfachen Schritten zu Ihrem Neonschild.' : 'Four simple steps to your neon sign.'}
            </p>
          </ScrollReveal>
          <StaggerGroup
            childSelector=".step-card"
            staggerAmount={0.1}
            direction="up"
            distance={30}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {howSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="step-card text-center p-6 rounded-2xl bg-muted/30 border border-border/50">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-neon-pink/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-neon-pink" />
                  </div>
                  <div className="text-xs font-bold text-neon-pink mb-2 uppercase tracking-wider">
                    {isDE ? `Schritt ${i + 1}` : `Step ${i + 1}`}
                  </div>
                  <h3 className="text-lg font-heading font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* ─── SIGN CATALOG ─── */}
      <section className="section-padding bg-muted/20" id="rental-catalog">
        <div className="container-tight">
          <ScrollReveal className="text-center mb-10">
            <h2 className="mb-3">{isDE ? 'Verfügbare Schilder' : 'Available Signs'}</h2>
            <p className="text-muted-foreground text-lg">
              {isDE
                ? 'Wählen Sie das perfekte Schild für Ihren Anlass.'
                : 'Choose the perfect sign for your occasion.'}
            </p>
          </ScrollReveal>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${activeCategory === cat.key
                    ? 'bg-neon-pink text-white shadow-[0_0_12px_rgba(255,45,120,0.3)]'
                    : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
                  }`}
              >
                {isDE ? cat.label_de : cat.label}
              </button>
            ))}
          </div>

          {/* Signs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredSigns.map(sign => {
              const name = isDE ? sign.name_de : sign.name;
              const isSelected = selectedSign?.id === sign.id;
              return (
                <button
                  key={sign.id}
                  onClick={() => setSelectedSign(isSelected ? null : sign)}
                  className={`group relative rounded-2xl overflow-hidden bg-[#0A0A12] aspect-[4/3] text-left transition-all duration-300
                    ${isSelected
                      ? 'ring-2 ring-neon-pink shadow-[0_0_20px_rgba(255,45,120,0.2)] scale-[1.02]'
                      : 'hover:shadow-lg hover:scale-[1.01]'}`}
                  id={`rental-sign-${sign.id}`}
                >
                  {/* Neon sign image */}
                  <div className="absolute inset-0 flex items-center justify-center bg-stone-900">
                    <img 
                      src={sign.image} 
                      alt={name} 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  </div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  {/* Popular badge */}
                  {sign.popular && (
                    <div className="absolute top-2 right-2">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-neon-warm/90 text-black text-[9px] font-bold uppercase tracking-wider">
                        <Star className="w-2.5 h-2.5" />
                        Popular
                      </span>
                    </div>
                  )}

                  {/* Selected check */}
                  {isSelected && (
                    <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-neon-pink flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}

                  {/* Info */}
                  <div className="absolute bottom-0 inset-x-0 p-3">
                    <div className="text-white font-heading font-bold text-xs sm:text-sm">{name}</div>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-white/60 text-xs">{sign.widthCm} cm</span>
                      <span className="text-white font-bold text-sm">
                        {isDE ? 'ab' : 'from'} {sign.price} CHF
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── PACKAGES ─── */}
      <section className="section-padding bg-background" id="rental-packages">
        <div className="container-tight">
          <ScrollReveal className="text-center mb-12">
            <h2 className="mb-3">{isDE ? 'Mietpakete' : 'Rental Packages'}</h2>
            <p className="text-muted-foreground text-lg">
              {isDE
                ? 'Wählen Sie das passende Paket für Ihren Anlass.'
                : 'Choose the right package for your event.'}
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {rentalPackages.map(pkg => {
              const isActive = selectedPackage === pkg.id;
              const features = isDE ? pkg.features_de : pkg.features;
              const badge = isDE ? pkg.badge_de : pkg.badge;

              return (
                <button
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg.id)}
                  className={`relative text-left p-6 rounded-2xl border transition-all duration-300
                    ${isActive
                      ? 'border-neon-pink bg-neon-pink/5 shadow-[0_0_20px_rgba(255,45,120,0.1)]'
                      : 'border-border bg-background hover:border-neon-pink/30'}`}
                  id={`rental-pkg-${pkg.id}`}
                >
                  {badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-block px-3 py-1 rounded-full bg-neon-pink text-white text-[10px] font-bold uppercase tracking-wider">
                        {badge}
                      </span>
                    </div>
                  )}

                  <div className="text-3xl mb-3">{pkg.icon}</div>
                  <h3 className="text-xl font-heading font-bold mb-1 capitalize">{pkg.tier}</h3>
                  <div className="text-2xl font-heading font-bold text-neon-pink mb-1">
                    {isDE ? 'ab' : 'from'} {pkg.priceFrom} CHF
                  </div>
                  <div className="text-xs text-muted-foreground mb-4">
                    {isDE ? 'Kaution' : 'Deposit'}: {pkg.deposit} CHF ({isDE ? 'zurückerstattet' : 'refundable'})
                  </div>

                  <ul className="space-y-2">
                    {features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-neon-green shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── BOOKING FORM ─── */}
      <section className="section-padding bg-calc-bg relative overflow-hidden" id="rental-booking">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,45,120,0.06)_0%,transparent_60%)]" />
        <div className="container-tight relative z-10">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-white mb-3">{isDE ? 'Jetzt buchen' : 'Book Now'}</h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              {isDE
                ? 'Füllen Sie das Formular aus und wir bestätigen Ihre Buchung innerhalb von 24 Stunden.'
                : 'Fill out the form and we\'ll confirm your booking within 24 hours.'}
            </p>
          </ScrollReveal>

          {formStatus === 'success' ? (
            <ScrollReveal className="text-center max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-neon-green/10 flex items-center justify-center">
                <Check className="w-8 h-8 text-neon-green" />
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-3">
                {isDE ? 'Buchungsanfrage erhalten!' : 'Booking Request Received!'}
              </h3>
              <p className="text-white/50 mb-6">
                {isDE
                  ? 'Wir bestätigen Ihre Buchung innerhalb von 24 Stunden per E-Mail.'
                  : 'We\'ll confirm your booking within 24 hours by email.'}
              </p>
              <Button
                onClick={() => { setFormStatus('idle'); setFormData({ name: '', email: '', phone: '', date: '', message: '' }); }}
                className="bg-neon-pink hover:bg-neon-pink/90 text-white font-heading"
              >
                {isDE ? 'Weitere Anfrage' : 'New Inquiry'}
              </Button>
            </ScrollReveal>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
              {/* Selected sign preview */}
              {selectedSign && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4 mb-2">
                  <div className="w-16 h-12 rounded-lg bg-[#0A0A12] flex items-center justify-center shrink-0">
                    <span
                      className="text-xs font-bold"
                      style={{ color: selectedSign.colorHex, textShadow: `0 0 6px ${selectedSign.glowColor}` }}
                    >
                      {isDE ? selectedSign.name_de : selectedSign.name}
                    </span>
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{isDE ? selectedSign.name_de : selectedSign.name}</div>
                    <div className="text-white/40 text-xs">
                      {isDE ? 'ab' : 'from'} {selectedSign.price} CHF • {selectedSign.widthCm}cm
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-white/70 mb-1.5 block">
                    <User className="w-3.5 h-3.5 inline mr-1" />
                    {isDE ? 'Name' : 'Full Name'} <span className="text-neon-pink">*</span>
                  </label>
                  <Input
                    required
                    value={formData.name}
                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    placeholder={isDE ? 'Max Mustermann' : 'John Doe'}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-11"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-white/70 mb-1.5 block">
                    <Mail className="w-3.5 h-3.5 inline mr-1" />
                    Email <span className="text-neon-pink">*</span>
                  </label>
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                    placeholder="you@example.com"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-11"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-white/70 mb-1.5 block">
                    <Phone className="w-3.5 h-3.5 inline mr-1" />
                    {isDE ? 'Telefon' : 'Phone'}
                  </label>
                  <Input
                    value={formData.phone}
                    onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                    placeholder="+41 76 123 45 67"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-11"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-white/70 mb-1.5 block">
                    <CalendarCheck className="w-3.5 h-3.5 inline mr-1" />
                    {isDE ? 'Eventdatum' : 'Event Date'} <span className="text-neon-pink">*</span>
                  </label>
                  <Input
                    required
                    type="date"
                    value={formData.date}
                    onChange={e => setFormData(p => ({ ...p, date: e.target.value }))}
                    className="bg-white/5 border-white/10 text-white h-11"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-white/70 mb-1.5 block">
                  {isDE ? 'Nachricht (optional)' : 'Message (optional)'}
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  placeholder={isDE
                    ? 'Ort, besondere Wünsche, oder Fragen...'
                    : 'Venue, special requests, or questions...'}
                  className="w-full rounded-lg bg-white/5 border border-white/10 text-white px-3 py-2 text-sm
                             placeholder:text-white/20 focus:border-neon-pink focus:ring-2 focus:ring-neon-pink/30
                             outline-none transition-colors resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full bg-neon-pink hover:bg-neon-pink/90 text-white font-heading h-12 text-base
                           shadow-[0_0_20px_rgba(255,45,120,0.3)] hover:shadow-[0_0_32px_rgba(255,45,120,0.5)]
                           transition-all duration-300"
                id="rental-submit"
              >
                {formStatus === 'sending' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin mr-2" />
                    {isDE ? 'Wird gesendet...' : 'Sending...'}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    {isDE ? 'Buchungsanfrage senden' : 'Send Booking Request'}
                  </>
                )}
              </Button>

              <p className="text-white/30 text-xs text-center">
                {isDE
                  ? 'Keine Zahlung erforderlich. Wir bestätigen Ihre Buchung innerhalb von 24h.'
                  : 'No payment required now. We\'ll confirm your booking within 24 hours.'}
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="section-padding bg-background" id="rental-faq">
        <div className="container-tight max-w-2xl">
          <ScrollReveal className="text-center mb-10">
            <h2 className="mb-3">{isDE ? 'Häufige Fragen zur Miete' : 'Rental FAQ'}</h2>
          </ScrollReveal>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left font-medium hover:bg-muted/30 transition-colors"
                >
                  <span>{faq.q}</span>
                  {expandedFaq === i ? <ChevronUp className="w-4 h-4 shrink-0" /> : <ChevronDown className="w-4 h-4 shrink-0" />}
                </button>
                {expandedFaq === i && (
                  <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-14 bg-muted/30">
        <div className="container-tight text-center">
          <ScrollReveal>
            <p className="text-muted-foreground mb-4">
              {isDE
                ? 'Lieber kaufen statt mieten? Entdecken Sie unsere Kollektion.'
                : 'Prefer to buy instead of rent? Check out our collection.'}
            </p>
            <Button
              render={<Link to={`/${currentLang}/shop`} />}
              variant="outline"
              className="font-heading text-sm group"
            >
              {isDE ? 'Zum Shop' : 'Browse Shop'}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
