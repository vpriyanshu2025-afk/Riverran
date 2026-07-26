import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { AdminOrders } from './pages/AdminOrders';
import { NotFound } from './pages/NotFound';
import { PageTransition } from './components/animations/PageTransition';
import { useCart } from './hooks/useCart';
import { CheckCircle2 } from 'lucide-react';

export const App = () => {
  const { toastMessage } = useCart();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-noir-900 font-sans selection:bg-champagne-500 selection:text-white relative">
      {/* Navigation Header */}
      <Navbar />

      {/* Slide-over Shopping Cart Drawer */}
      <CartDrawer />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="bg-noir-900 text-cream-50 px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-3 border border-champagne-400/40 text-xs font-semibold uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Main Page Content with Page Transitions */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/shop" element={<PageTransition><Shop /></PageTransition>} />
            <Route path="/product/:id" element={<PageTransition><ProductDetail /></PageTransition>} />
            <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
            <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
            <Route path="/admin/orders" element={<PageTransition><AdminOrders /></PageTransition>} />
            <Route path="/admin" element={<PageTransition><AdminOrders /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
