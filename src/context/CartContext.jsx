import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  // Load initial cart from localStorage
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('riverran_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      console.error('Failed to parse cart from localStorage:', e);
      return [];
    }
  });

  // Recently Viewed Products
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    try {
      const saved = localStorage.getItem('riverran_recently_viewed');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('riverran_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cart]);

  // Sync recently viewed to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('riverran_recently_viewed', JSON.stringify(recentlyViewed));
    } catch (e) {
      console.error('Failed to save recently viewed to localStorage:', e);
    }
  }, [recentlyViewed]);

  const addRecentlyViewed = (product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 6); // Keep last 6 viewed products
    });
  };

  // Show auto-disappearing toast notification
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  /**
   * Add item to cart
   */
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { product, quantity }];
      }
    });

    showToast(`Added "${product.name}" to your bag!`);
  };

  /**
   * Remove item completely
   */
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
    showToast('Item removed from bag');
  };

  /**
   * Update item quantity
   */
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  /**
   * Clear all items from cart
   */
  const clearCart = () => {
    setCart([]);
  };

  const toggleCartDrawer = () => {
    setIsCartOpen((prev) => !prev);
  };

  // Calculations
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 100.0;
  const shippingFee = subtotal > freeShippingThreshold || subtotal === 0 ? 0 : 25.0;
  const estimatedTax = subtotal * 0.08;
  const grandTotal = subtotal + shippingFee + estimatedTax;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItemsCount,
        subtotal,
        shippingFee,
        estimatedTax,
        grandTotal,
        freeShippingThreshold,
        isCartOpen,
        setIsCartOpen,
        toggleCartDrawer,
        toastMessage,
        setToastMessage,
        recentlyViewed,
        addRecentlyViewed,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
