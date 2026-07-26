import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, Menu, X, Database } from 'lucide-react';
import { useCart } from '../hooks/useCart';

export const Navbar = () => {
  const { totalItemsCount, toggleCartDrawer } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-luxury border-b border-champagne-400/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-24">
          
          {/* Desktop Left Nav Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {[
              { label: 'Collection', path: '/shop' },
              { label: 'Luxury Apparel', path: '/shop?category=Luxury%20Apparel' },
              { label: 'Leather Goods', path: '/shop?category=Leather%20Goods' },
              { label: 'Admin Portal', path: '/admin/orders' },
            ].map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`relative py-1 text-xs font-semibold uppercase tracking-[0.2em] transition-colors ${
                    active ? 'text-noir-900 font-bold' : 'text-noir-600 hover:text-champagne-600'
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-champagne-400"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Brand Logo */}
          <Link to="/" className="flex flex-col items-center group">
            <span className="font-heading text-2xl sm:text-3xl tracking-[0.25em] font-extrabold text-noir-900 group-hover:text-champagne-600 transition-colors uppercase">
              RIVERRA<span className="text-champagne-500 font-normal">N</span>
            </span>
            <span className="text-[9px] font-sans font-bold tracking-[0.4em] uppercase text-champagne-600 mt-0.5">
              LUXURY FASHION STORE
            </span>
          </Link>

          {/* Right Action Menu */}
          <div className="flex items-center space-x-6">
            
            {/* Search Input Trigger */}
            <div className="relative">
              {searchOpen ? (
                <motion.form
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 220 }}
                  exit={{ opacity: 0, width: 0 }}
                  onSubmit={handleSearchSubmit}
                  className="flex items-center"
                >
                  <input
                    type="text"
                    autoFocus
                    placeholder="Search collection..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-3 pr-8 py-1.5 text-xs bg-cream-100 border-b border-champagne-400 focus:outline-none text-noir-900 font-sans tracking-wide"
                  />
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="absolute right-1 text-noir-500 hover:text-noir-900"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </motion.form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-noir-800 hover:text-champagne-600 transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5 stroke-[1.5]" />
                </button>
              )}
            </div>

            {/* Shopping Bag Drawer Trigger */}
            <button
              onClick={toggleCartDrawer}
              className="relative p-2 text-noir-800 hover:text-champagne-600 transition-colors flex items-center gap-1.5"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              <span className="hidden sm:inline text-xs font-bold uppercase tracking-widest text-noir-900">
                Bag
              </span>
              {totalItemsCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-noir-900 text-cream-50 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-champagne-400"
                >
                  {totalItemsCount}
                </motion.span>
              )}
            </button>

            {/* Mobile Navigation Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-noir-900 focus:outline-none"
              aria-label="Toggle Mobile Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 stroke-[1.5]" /> : <Menu className="w-6 h-6 stroke-[1.5]" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-cream-50 border-b border-champagne-300 px-6 pt-4 pb-8 space-y-6 shadow-2xl overflow-hidden"
          >
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 text-xs bg-white border border-champagne-300 rounded-full focus:outline-none"
              />
              <Search className="w-4 h-4 text-champagne-600 absolute right-4 top-3.5" />
            </form>

            <nav className="flex flex-col space-y-4 font-heading text-lg text-noir-900">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="py-1 border-b border-cream-200">
                Home Editorial
              </Link>
              <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="py-1 border-b border-cream-200">
                Full Collection
              </Link>
              <Link to="/admin/orders" onClick={() => setMobileMenuOpen(false)} className="py-1 border-b border-cream-200 text-sm font-sans uppercase tracking-widest text-champagne-600 flex items-center gap-2">
                <Database className="w-4 h-4" />
                <span>Admin Orders Portal</span>
              </Link>
              <Link to="/cart" onClick={() => setMobileMenuOpen(false)} className="py-1 flex items-center justify-between text-sm font-sans font-bold uppercase tracking-widest">
                <span>Shopping Bag</span>
                <span className="px-2 py-0.5 bg-noir-900 text-cream-50 rounded-full text-xs">
                  {totalItemsCount} items
                </span>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
