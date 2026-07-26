import React from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from './ProductCard';
import { RefreshCw, Sparkles } from 'lucide-react';

export const ProductGrid = ({ products, onResetFilters }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (!products || products.length === 0) {
    return (
      <div className="py-20 px-6 text-center bg-white rounded-3xl border border-champagne-300/40 shadow-sm max-w-lg mx-auto my-8 space-y-4">
        <div className="w-16 h-16 rounded-full bg-cream-100 text-champagne-600 flex items-center justify-center mx-auto">
          <Sparkles className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-noir-900">No Atelier Items Match Your Criteria</h3>
        <p className="text-xs text-noir-500 tracking-wide max-w-xs mx-auto">
          Try broadening your price parameters or select a different couture category.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="px-6 py-3 bg-noir-900 hover:bg-champagne-600 text-cream-50 text-xs font-bold uppercase tracking-widest rounded-full transition-colors inline-flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={itemVariants}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
};
