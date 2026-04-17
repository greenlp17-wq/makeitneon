import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ScrollRestoration } from '@/components/layout/ScrollRestoration';
import { CartProvider } from '@/hooks/useCart';

// Lazy-loaded pages
const HomePage = lazy(() => import('@/pages/HomePage'));
const CalculatorPage = lazy(() => import('@/pages/CalculatorPage'));
const ShopPage = lazy(() => import('@/pages/ShopPage'));
const ProductPage = lazy(() => import('@/pages/ProductPage'));
const CustomOrderPage = lazy(() => import('@/pages/CustomOrderPage'));
const PortfolioPage = lazy(() => import('@/pages/PortfolioPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const FAQPage = lazy(() => import('@/pages/FAQPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const BlogPage = lazy(() => import('@/pages/BlogPage'));
const BlogPostPage = lazy(() => import('@/pages/BlogPostPage'));
const RentalPage = lazy(() => import('@/pages/RentalPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

// Labs routes
const LabsHeroesPage = lazy(() => import('@/pages/LabsHeroesPage'));
const LabsHeadersPage = lazy(() => import('@/pages/LabsHeadersPage'));

// Loading fallback
function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-neon-pink border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground font-medium">Loading...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollRestoration />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Redirect root to /en */}
            <Route path="/" element={<Navigate to="/en" replace />} />

            {/* Language-prefixed routes */}
            <Route path="/:lang" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="calculator" element={<CalculatorPage />} />
              <Route path="shop" element={<ShopPage />} />
              <Route path="shop/:slug" element={<ProductPage />} />
              <Route path="custom-order" element={<CustomOrderPage />} />
              <Route path="rental" element={<RentalPage />} />
              <Route path="portfolio" element={<PortfolioPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="faq" element={<FAQPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="blog/:slug" element={<BlogPostPage />} />
              
              {/* HIDDEN LABS ROUTES */}
              <Route path="_labs/heroes" element={<LabsHeroesPage />} />
              <Route path="_labs/headers" element={<LabsHeadersPage />} />
            </Route>

            {/* 404 catch-all */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
