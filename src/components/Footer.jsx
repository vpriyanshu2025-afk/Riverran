import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Send, CheckCircle2, Globe, Shield, Award } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-noir-900 text-cream-200 pt-20 pb-12 border-t border-champagne-500/20 mt-auto">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Global Flagship Locations */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-16 border-b border-noir-800 text-center md:text-left">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-champagne-400">Flagship Studio 01</span>
            <h4 className="font-serif text-lg font-bold text-white mt-1">PARIS</h4>
            <p className="text-xs text-noir-400 mt-1">12 Place Vendôme, 75001 Paris</p>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-champagne-400">Flagship Studio 02</span>
            <h4 className="font-serif text-lg font-bold text-white mt-1">MILAN</h4>
            <p className="text-xs text-noir-400 mt-1">Via Montenapoleone 8, Milano</p>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-champagne-400">Flagship Studio 03</span>
            <h4 className="font-serif text-lg font-bold text-white mt-1">NEW YORK</h4>
            <p className="text-xs text-noir-400 mt-1">740 Fifth Avenue, New York, NY</p>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-champagne-400">Flagship Studio 04</span>
            <h4 className="font-serif text-lg font-bold text-white mt-1">TOKYO</h4>
            <p className="text-xs text-noir-400 mt-1">6-7-1 Ginza, Chuo-ku, Tokyo</p>
          </div>
        </div>

        {/* Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 py-16">
          
          {/* Brand Philosophy */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex flex-col">
              <span className="font-serif text-2xl tracking-[0.25em] font-extrabold text-white uppercase">
                RIVERRA<span className="text-champagne-400">N</span>
              </span>
              <span className="text-[9px] font-sans font-bold tracking-[0.4em] uppercase text-champagne-400 mt-0.5">
                ATELIER HAUTE COUTURE
              </span>
            </Link>
            <p className="text-xs text-noir-400 max-w-sm leading-relaxed tracking-wide font-sans">
              Dedicated to pure silk, Mongolian cashmere, vegetable-tanned Italian leathers, and 18k Fairmined gold. Crafted in Paris for collectors around the globe.
            </p>
            
            {/* VIP Newsletter */}
            <div className="pt-2 space-y-3">
              <h5 className="text-[10px] font-bold uppercase tracking-[0.25em] text-champagne-400">
                Join the Private Atelier Circle
              </h5>
              {subscribed ? (
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold py-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Welcome to the Private Circle. Lookbook delivered.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-md">
                  <input
                    type="email"
                    required
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 text-xs bg-noir-800 border border-noir-700 rounded-l-full text-white placeholder:text-noir-500 focus:outline-none focus:border-champagne-400 font-sans"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-champagne-500 hover:bg-champagne-400 text-noir-950 rounded-r-full font-bold text-xs uppercase tracking-widest flex items-center justify-center transition-colors"
                  >
                    <span>Subscribe</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Couture Collections */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-5">Collections</h4>
            <ul className="space-y-3 text-xs font-medium text-noir-400">
              <li><Link to="/shop?category=Haute%20Couture" className="hover:text-champagne-400 transition-colors">Haute Couture</Link></li>
              <li><Link to="/shop?category=Leather%20Goods" className="hover:text-champagne-400 transition-colors">Leather Goods</Link></li>
              <li><Link to="/shop?category=Fine%20Jewelry" className="hover:text-champagne-400 transition-colors">Fine Jewelry</Link></li>
              <li><Link to="/shop?category=Footwear" className="hover:text-champagne-400 transition-colors">Footwear Atelier</Link></li>
              <li><Link to="/shop?category=Fragrance%20%26%20Beauty" className="hover:text-champagne-400 transition-colors">Niche Fragrance</Link></li>
            </ul>
          </div>

          {/* Concierge Service */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-5">Concierge</h4>
            <ul className="space-y-3 text-xs font-medium text-noir-400">
              <li><a href="#private-appointment" className="hover:text-champagne-400 transition-colors">Private Appointments</a></li>
              <li><a href="#bespoke" className="hover:text-champagne-400 transition-colors">Bespoke Tailoring</a></li>
              <li><a href="#care" className="hover:text-champagne-400 transition-colors">Garment Care Guide</a></li>
              <li><a href="#shipping" className="hover:text-champagne-400 transition-colors">Complimentary Express Delivery</a></li>
            </ul>
          </div>

          {/* Brand Heritage */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-5">Atelier</h4>
            <ul className="space-y-3 text-xs font-medium text-noir-400">
              <li><a href="#heritage" className="hover:text-champagne-400 transition-colors">Our Heritage</a></li>
              <li><a href="#sustainability" className="hover:text-champagne-400 transition-colors">Fairmined & Organic Silk</a></li>
              <li><a href="#press" className="hover:text-champagne-400 transition-colors">Vogue & Harper's Bazaar Press</a></li>
              <li><a href="#careers" className="hover:text-champagne-400 transition-colors">Artisan Careers</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="pt-8 border-t border-noir-800 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-noir-500">
          <p>© {new Date().getFullYear()} RIVERRA N ATELIER S.A. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-noir-300 cursor-pointer">Terms of Haute Service</span>
            <span className="hover:text-noir-300 cursor-pointer">Privacy & GDPR</span>
            <span className="hover:text-noir-300 cursor-pointer">Cookie Preferences</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
