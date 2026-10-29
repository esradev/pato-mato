/**
 * پتو متو (Peto Meto) - فروشگاه مدرن و شیک کیف و چمدان
 */

import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { HamburgerMenu } from './components/HamburgerMenu';
import { FloatingCartBadge } from './components/FloatingCartBadge';
import { Footer } from './components/Footer';

// Dedicated Page Views (Zero Modals!)
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { SizeGuidePage } from './pages/SizeGuidePage';
import { WishlistPage } from './pages/WishlistPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

const AppContent: React.FC = () => {
  const { currentPage } = useShop();

  const renderActivePage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'category':
        return <CategoryPage />;
      case 'product':
        return <ProductDetailPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'size-guide':
        return <SizeGuidePage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'tracking':
        return <OrderTrackingPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-amber-200 selection:text-amber-950 font-sans">
      {/* Top Header Bar */}
      <Header />

      {/* Hamburger Navigation Drawer */}
      <HamburgerMenu />

      {/* Dedicated Page View Content */}
      <main className="flex-1">
        {renderActivePage()}
      </main>

      {/* Ambient Floating Cart Pill (Gentle Floating Animation) */}
      <FloatingCartBadge />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
