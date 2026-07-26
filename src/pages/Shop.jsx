import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProducts } from '../hooks/useProducts';
import { ProductGrid } from '../components/ProductGrid';
import { FilterSidebar } from '../components/FilterSidebar';
import { Search, SlidersHorizontal, X } from 'lucide-react';

export const Shop = () => {
  const [searchParams] = useSearchParams();
  const {
    products,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    maxPrice,
    setMaxPrice,
    sortBy,
    setSortBy,
    resetFilters,
  } = useProducts();

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');

    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams, setSelectedCategory, setSearchQuery]);

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 space-y-10"
    >
      {/* Header Editorial Banner */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-champagne-300/40 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-champagne-600">
            Catalog Directory
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-noir-900 tracking-tight mt-1">
            The Complete Atelier Collection
          </h1>
          <p className="text-xs text-noir-500 mt-2 tracking-wide font-sans max-w-lg">
            Explore handcrafted haute couture, fine jewelry, and Italian leather goods from Paris and Milan.
          </p>
        </div>

        {/* Search Bar Input */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search haute pieces..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-3 text-xs bg-cream-50 border border-champagne-300 rounded-full focus:outline-none focus:ring-2 focus:ring-champagne-500 font-sans tracking-wide"
          />
          <Search className="w-4 h-4 text-champagne-600 absolute left-3.5 top-3.5" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3.5 text-noir-400 hover:text-noir-900"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Grid & Filter Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <FilterSidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            sortBy={sortBy}
            setSortBy={setSortBy}
            resetFilters={resetFilters}
            totalResults={products.length}
          />
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between bg-white p-4 rounded-2xl border border-champagne-300/40">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="px-5 py-2.5 bg-noir-900 text-cream-50 font-bold text-xs uppercase tracking-widest rounded-full flex items-center gap-2"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{mobileFilterOpen ? 'Close Filters' : 'Refine Catalog'}</span>
          </button>

          <span className="text-xs font-bold text-noir-500 uppercase tracking-widest font-serif">
            {products.length} Items
          </span>
        </div>

        {/* Mobile Filter Collapsible */}
        {mobileFilterOpen && (
          <div className="lg:hidden col-span-1">
            <FilterSidebar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              sortBy={sortBy}
              setSortBy={setSortBy}
              resetFilters={resetFilters}
              totalResults={products.length}
            />
          </div>
        )}

        {/* Products Grid Column */}
        <div className="lg:col-span-3">
          <ProductGrid products={products} onResetFilters={resetFilters} />
        </div>

      </div>

    </motion.div>
  );
};
