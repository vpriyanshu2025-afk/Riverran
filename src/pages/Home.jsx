import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS, CATEGORIES } from '../utils/productsData';
import { ArrowRight, Sparkles, Award, ShieldCheck, Gem, Crown } from 'lucide-react';

export const Home = () => {
  const featuredProducts = PRODUCTS.slice(0, 8);

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* Hero Section */}
      <Hero />

      {/* Editorial Category Showcase */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-champagne-600">
              Handcrafted Categories
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-noir-900 tracking-tight mt-1">
              Explore the Atelier
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-noir-900 hover:text-champagne-600 transition-colors"
          >
            <span>View Full Directory</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {CATEGORIES.filter((c) => c !== 'All').slice(0, 4).map((category, idx) => {
            const count = PRODUCTS.filter((p) => p.category === category).length;
            return (
              <Link
                key={category}
                to={`/shop?category=${encodeURIComponent(category)}`}
                className="group relative overflow-hidden rounded-3xl bg-white p-8 border border-champagne-300/40 shadow-sm hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-cream-100 text-champagne-600 flex items-center justify-center font-bold text-lg mb-6 group-hover:bg-noir-900 group-hover:text-cream-50 transition-colors">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-champagne-600">
                  Category 0{idx + 1}
                </span>
                <h3 className="font-serif text-xl font-bold text-noir-900 group-hover:text-champagne-600 transition-colors mt-1">
                  {category}
                </h3>
                <p className="text-xs text-noir-500 mt-2 font-sans font-medium">{count} Curated Pieces</p>
              </Link>
            );
          })}
        </div>
      </motion.section>

      {/* Runway Collection Grid */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-champagne-600 flex items-center gap-1.5">
              <Crown className="w-4 h-4 text-champagne-500" />
              <span>Spring 2026 Collection</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-noir-900 tracking-tight mt-1">
              The Runway Edit
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-noir-900 hover:text-champagne-600 transition-colors"
          >
            <span>Explore All 12 Pieces</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </motion.section>

      {/* Editorial VIP Privilege Banner */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"
      >
        <div className="relative overflow-hidden rounded-3xl bg-noir-900 text-cream-50 p-10 sm:p-16 border border-champagne-400/30 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-champagne-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-xl space-y-6">
            <span className="px-4 py-1.5 bg-champagne-500/20 text-champagne-300 text-[10px] font-bold rounded-full uppercase tracking-[0.25em] border border-champagne-400/30">
              Private Atelier Privilege
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
              Enjoy 20% Off Your First Couture Order
            </h2>
            <p className="text-noir-300 text-xs sm:text-sm leading-relaxed tracking-wide">
              Apply private invitation code <strong className="bg-cream-50/10 px-3 py-1 rounded-md text-champagne-400 font-mono">LUXURY20</strong> at checkout for complimentary worldwide courier shipping and 20% off.
            </p>
            <Link
              to="/shop?category=Haute%20Couture"
              className="inline-flex items-center gap-3 px-8 py-4 bg-champagne-500 hover:bg-champagne-400 text-noir-950 font-extrabold text-xs uppercase tracking-[0.25em] rounded-full shadow-gold transition-all transform hover:scale-105"
            >
              <span>Claim Atelier Privilege</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Luxury Guarantees & Heritage */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white p-8 rounded-3xl border border-champagne-300/40 shadow-sm space-y-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-cream-100 text-champagne-600 flex items-center justify-center mx-auto md:mx-0">
              <Gem className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-xl font-bold text-noir-900">100% Certified Materials</h4>
            <p className="text-xs text-noir-600 leading-relaxed">
              Every silk thread, cashmere weave, and Fairmined diamond carries an individual GIA / Loro Piana certificate of origin.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-champagne-300/40 shadow-sm space-y-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-cream-100 text-champagne-600 flex items-center justify-center mx-auto md:mx-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-xl font-bold text-noir-900">Lifetime Atelier Service</h4>
            <p className="text-xs text-noir-600 leading-relaxed">
              Complimentary garment alterations, leather conditioning, and jewelry polishing for all Riverran Atelier items.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-champagne-300/40 shadow-sm space-y-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-cream-100 text-champagne-600 flex items-center justify-center mx-auto md:mx-0">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-xl font-bold text-noir-900">Worldwide Express Delivery</h4>
            <p className="text-xs text-noir-600 leading-relaxed">
              Direct dispatch from Paris and Milan via climate-neutral express courier with full transit insurance.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};
