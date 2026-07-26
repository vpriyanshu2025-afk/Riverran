import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, Check, Heart, Eye } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';
import { useCart } from '../hooks/useCart';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-white rounded-3xl border border-champagne-300/40 shadow-[0_10px_30px_rgba(10,10,10,0.05)] hover:shadow-[0_25px_50px_-12px_rgba(10,10,10,0.14)] transition-all duration-500 flex flex-col overflow-hidden"
    >
      
      {/* 1. Large Editorial Image Container (4:5 Ratio) */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-cream-100">
        {/* 2. Image Zoom on Hover */}
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Badge Overlay */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.badge && (
            <span className="px-3.5 py-1 text-[9px] font-bold tracking-[0.25em] rounded-full uppercase bg-noir-900 text-cream-50 border border-champagne-400/30 shadow-md">
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2.5 py-0.5 text-[9px] font-extrabold rounded-full bg-champagne-500 text-white tracking-widest uppercase">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* 8. Wishlist Button with Motion */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className={`absolute top-4 right-4 p-3 rounded-full glass-luxury backdrop-blur-md transition-colors shadow-sm z-10 ${
            isWishlisted ? 'text-rose-600 fill-rose-600' : 'text-noir-800 hover:text-rose-600'
          }`}
          aria-label="Add to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
        </motion.button>

        {/* Hover Quick View Overlay Banner */}
        <div className="absolute inset-0 bg-noir-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="px-5 py-2.5 bg-white/95 text-noir-900 text-xs font-bold uppercase tracking-widest rounded-full shadow-luxury flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <Eye className="w-3.5 h-3.5 text-champagne-600" />
            Quick View
          </span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        
        {/* 5. Minimal Typography */}
        <div className="space-y-1">
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-champagne-600 block">
            {product.category}
          </span>

          <Link to={`/product/${product.id}`} className="block group-hover:text-champagne-600 transition-colors">
            <h3 className="font-serif text-base sm:text-lg font-bold text-noir-900 line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Subtle Rating */}
          <div className="flex items-center gap-1.5 pt-1">
            <div className="flex items-center text-champagne-500">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-bold text-noir-800">{product.rating}</span>
            <span className="text-xs text-noir-400 font-sans">({product.reviewsCount})</span>
          </div>
        </div>

        {/* 6. Price Hierarchy & 7. Quick Add Button */}
        <div className="flex items-center justify-between pt-3 border-t border-cream-200">
          <div>
            <div className="font-serif text-lg sm:text-xl font-bold text-noir-900 tracking-tight">
              {formatCurrency(product.price)}
            </div>
            {product.originalPrice > product.price && (
              <div className="text-xs text-noir-400 line-through font-sans">
                {formatCurrency(product.originalPrice)}
              </div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            disabled={added}
            className={`px-4 py-2.5 rounded-full font-bold text-[11px] uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${
              added
                ? 'bg-emerald-800 text-white'
                : 'bg-noir-900 hover:bg-champagne-600 text-cream-50 shadow-md hover:shadow-gold'
            }`}
            aria-label="Quick add to bag"
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </motion.button>
        </div>

      </div>
    </motion.div>
  );
};
