import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Sparkles } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/formatCurrency';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    toggleCartDrawer,
    removeFromCart,
    updateQuantity,
    subtotal,
    freeShippingThreshold,
    totalItemsCount,
  } = useCart();

  const navigate = useNavigate();

  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCartDrawer}
            className="absolute inset-0 bg-noir-950/70 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-cream-50 shadow-2xl flex flex-col border-l border-champagne-300/40"
            >
              
              {/* Header */}
              <div className="p-6 bg-noir-900 text-cream-50 flex items-center justify-between border-b border-champagne-500/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-champagne-500 text-noir-900 rounded-xl">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-serif text-lg font-bold">Shopping Bag</h2>
                    <p className="text-[10px] uppercase tracking-widest text-champagne-400">
                      {totalItemsCount} {totalItemsCount === 1 ? 'Couture Item' : 'Couture Items'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={toggleCartDrawer}
                  className="p-2 text-noir-400 hover:text-white hover:bg-noir-800 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Meter */}
              <div className="bg-champagne-100/70 p-4 border-b border-champagne-300/60 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-noir-900">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-champagne-600" />
                    {remainingForFreeShipping === 0 ? (
                      <span className="text-emerald-800 font-bold">Unlocked Complimentary Express Shipping</span>
                    ) : (
                      <span>
                        Add <strong>{formatCurrency(remainingForFreeShipping)}</strong> for Free Express Shipping
                      </span>
                    )}
                  </div>
                  <span className="text-champagne-700 font-bold">{Math.round(freeShippingProgress)}%</span>
                </div>
                <div className="w-full bg-cream-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-champagne-500 h-full transition-all duration-500 rounded-full"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Cart Item List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                    <div className="w-20 h-20 bg-cream-100 rounded-full flex items-center justify-center text-champagne-600">
                      <Sparkles className="w-10 h-10" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-noir-900">Your Bag is Empty</h3>
                      <p className="text-xs text-noir-500 tracking-wide max-w-xs mt-1">
                        Explore our Paris & Milan collection to discover unique haute couture pieces.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        toggleCartDrawer();
                        navigate('/shop');
                      }}
                      className="px-8 py-3.5 bg-noir-900 hover:bg-champagne-600 text-cream-50 font-bold text-xs uppercase tracking-widest rounded-full transition-colors"
                    >
                      Browse Atelier
                    </button>
                  </div>
                ) : (
                  cart.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="flex gap-4 p-4 bg-white rounded-2xl border border-champagne-200 shadow-sm relative group"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-24 object-cover rounded-xl bg-cream-100 flex-shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-serif text-sm font-bold text-noir-900 line-clamp-1 pr-4">
                              {product.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(product.id)}
                              className="text-noir-400 hover:text-rose-600 transition-colors p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-xs text-champagne-600 font-bold mt-0.5 font-serif">
                            {formatCurrency(product.price)}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-2 bg-cream-50 rounded-full border border-champagne-300/60 p-1">
                            <button
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              className="p-1 text-noir-600 hover:bg-white rounded-full"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-noir-900 w-5 text-center">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              className="p-1 text-noir-600 hover:bg-white rounded-full"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-serif text-sm font-bold text-noir-900">
                            {formatCurrency(product.price * quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Checkout Action Panel */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-champagne-300/40 bg-white space-y-4">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-noir-600">
                      <span>Subtotal</span>
                      <span className="font-serif font-bold text-noir-900">{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-noir-400">
                      <span>Express Shipping & Taxes</span>
                      <span>Calculated at checkout</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={() => {
                        toggleCartDrawer();
                        navigate('/cart');
                      }}
                      className="w-full py-3 bg-cream-100 hover:bg-cream-200 text-noir-900 font-bold text-xs uppercase tracking-widest rounded-full transition-colors text-center"
                    >
                      View Bag
                    </button>
                    <button
                      onClick={() => {
                        toggleCartDrawer();
                        navigate('/checkout');
                      }}
                      className="w-full py-3 bg-noir-900 hover:bg-champagne-600 text-cream-50 font-bold text-xs uppercase tracking-widest rounded-full transition-colors shadow-luxury flex items-center justify-center gap-2"
                    >
                      <span>Checkout</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
