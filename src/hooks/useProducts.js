import { useState, useMemo } from 'react';
import { PRODUCTS } from '../utils/productsData';

export const useProducts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(350);
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-low', 'price-high', 'rating'

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category Filter
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;

      // Search Query Filter
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      // Price Filter
      const matchesPrice = product.price <= maxPrice;

      return matchesCategory && matchesSearch && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // Default featured order
    });
  }, [searchQuery, selectedCategory, maxPrice, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setMaxPrice(350);
    setSortBy('featured');
  };

  return {
    products: filteredProducts,
    allProducts: PRODUCTS,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    maxPrice,
    setMaxPrice,
    sortBy,
    setSortBy,
    resetFilters,
  };
};
