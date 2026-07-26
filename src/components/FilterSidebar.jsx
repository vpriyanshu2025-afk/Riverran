import React from 'react';
import { CATEGORIES } from '../utils/productsData';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';

export const FilterSidebar = ({
  selectedCategory,
  setSelectedCategory,
  maxPrice,
  setMaxPrice,
  sortBy,
  setSortBy,
  resetFilters,
  totalResults
}) => {
  return (
    <aside className="bg-white p-6 sm:p-8 rounded-3xl border border-champagne-300/40 shadow-sm space-y-8">
      
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-4 border-b border-cream-200">
        <div className="flex items-center gap-2 font-serif text-lg font-bold text-noir-900">
          <SlidersHorizontal className="w-4 h-4 text-champagne-600" />
          <span>Refine Catalog</span>
        </div>
        <button
          onClick={resetFilters}
          className="text-xs text-champagne-600 hover:text-noir-900 font-bold uppercase tracking-wider flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Sort Option Selector */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-noir-500">
          Sort Collection
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full px-4 py-3 bg-cream-50 border border-champagne-300/60 rounded-2xl text-xs font-semibold text-noir-900 focus:outline-none focus:ring-2 focus:ring-champagne-500 cursor-pointer"
        >
          <option value="featured">Featured Curations</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Atelier Rating</option>
        </select>
      </div>

      {/* Category Pills */}
      <div className="space-y-3">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-noir-500">
          Couture Categories
        </label>
        <div className="space-y-1.5">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`w-full text-left px-4 py-2.5 rounded-2xl text-xs font-semibold tracking-wide transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-noir-900 text-cream-50 font-bold shadow-md'
                    : 'text-noir-700 hover:bg-cream-100 hover:text-noir-900'
                }`}
              >
                <span>{cat}</span>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Max Price Range Slider */}
      <div className="space-y-4 pt-4 border-t border-cream-200">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-[10px] uppercase tracking-[0.2em] text-noir-500">Maximum Price</span>
          <span className="text-champagne-600 bg-champagne-100 px-3 py-1 rounded-full font-serif">
            {formatCurrency(maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min="100"
          max="3500"
          step="50"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-champagne-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] font-bold text-noir-400 uppercase tracking-widest">
          <span>$100</span>
          <span>$3,500</span>
        </div>
      </div>

      {/* Results Count Badge */}
      <div className="pt-4 border-t border-cream-200 text-center">
        <span className="text-xs font-medium text-noir-500">
          Displaying <strong className="text-noir-900 font-serif">{totalResults}</strong> haute items
        </span>
      </div>

    </aside>
  );
};
