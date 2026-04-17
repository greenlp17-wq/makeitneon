import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams, useLocation } from 'react-router-dom';
import { Menu, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileMenu } from './MobileMenu';
import { CartSidebar } from '@/components/shop/CartSidebar';
import { useCart } from '@/hooks/useCart';

export function Header() {
  const { t } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || 'en';
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems, openCart } = useCart();

  // On non-home pages, always use the "scrolled" (dark text) style
  // because these pages have light backgrounds
  const isHomePage = useMemo(() => {
    const path = location.pathname.replace(/^\/[a-z]{2}\/?/, '');
    return path === '' || path === '/';
  }, [location.pathname]);

  const useDarkStyle = !isHomePage || scrolled;

  // Track scroll for glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'home', path: `/${currentLang}` },
    { key: 'calculator', path: `/${currentLang}/calculator` },
    { key: 'shop', path: `/${currentLang}/shop` },
    { key: 'rental', path: `/${currentLang}/rental` },
    { key: 'portfolio', path: `/${currentLang}/portfolio` },
    { key: 'about', path: `/${currentLang}/about` },
    { key: 'faq', path: `/${currentLang}/faq` },
    { key: 'contact', path: `/${currentLang}/contact` },
  ];

  const checkActive = (path: string) => {
    const current = location.pathname;
    const base = path === `/${currentLang}` ? `/${currentLang}` : path;
    
    if (base === `/${currentLang}`) {
      return current === base || current === `${base}/`;
    }
    return current === base || current.startsWith(`${base}/`);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          useDarkStyle
            ? 'glass py-3 shadow-lg border-b border-white/10'
            : 'bg-transparent py-5'
        }`}
        id="main-header"
      >
        <div className="container-wide flex items-center justify-between">
          {/* Logo */}
          <Link
            to={`/${currentLang}`}
            className={`font-heading text-xl sm:text-2xl font-bold tracking-tight transition-opacity hover:opacity-80 
              ${useDarkStyle ? 'text-foreground' : 'text-white'}`}
            id="logo-link"
          >
            Make It <span className="gradient-neon-text">Neon</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" id="desktop-nav">
            {navItems.map((item) => {
              const active = checkActive(item.path);
              return (
                <Link
                  key={item.key}
                  to={item.path}
                  className={`relative px-3 py-2 text-sm transition-colors rounded-lg
                    ${active
                      ? (useDarkStyle ? 'text-neon-pink font-semibold' : 'text-neon-pink drop-shadow-[0_0_8px_rgba(255,45,120,0.8)] font-semibold')
                      : (useDarkStyle ? 'text-muted-foreground font-medium hover:text-foreground hover:bg-black/5' : 'text-white/80 font-medium hover:text-white hover:bg-white/10')
                    }`}
                  id={`nav-${item.key}`}
                >
                  {t(`nav.${item.key}`)}
                  {active && (
                    <span 
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-neon-pink shadow-[0_0_8px_rgba(255,45,120,0.8)]" 
                      aria-hidden="true" 
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right section */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher 
              className={useDarkStyle ? 'text-foreground hover:bg-black/5' : 'text-white hover:bg-white/10'} 
            />

            {/* Cart icon */}
            <button
              className={`relative p-2 rounded-lg transition-colors
                ${useDarkStyle ? 'text-foreground hover:bg-black/5' : 'text-white hover:bg-white/10'}`}
              onClick={openCart}
              aria-label="Cart"
              id="cart-trigger"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-neon-pink text-white
                                 text-[10px] font-bold flex items-center justify-center
                                 shadow-[0_0_8px_rgba(255,45,120,0.4)]
                                 animate-in zoom-in-50 duration-200">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>

            {/* CTA — desktop only */}
            <Button
              render={<Link to={`/${currentLang}/calculator`} />}
              size="sm"
              className="hidden lg:inline-flex bg-neon-pink hover:bg-neon-pink/90 text-white
                         font-heading text-xs font-semibold tracking-wide
                         shadow-[0_0_16px_rgba(255,45,120,0.3)] hover:shadow-[0_0_24px_rgba(255,45,120,0.5)]
                         transition-all duration-300"
              id="cta-order"
            >
              {t('nav.orderNow')}
            </Button>

            {/* Mobile hamburger */}
            <button
              className={`lg:hidden p-2 rounded-lg transition-colors
                ${useDarkStyle ? 'text-foreground hover:bg-black/5' : 'text-white hover:bg-white/10'}`}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              id="mobile-menu-trigger"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navItems={navItems}
      />

      {/* Cart Sidebar */}
      <CartSidebar />
    </>
  );
}
