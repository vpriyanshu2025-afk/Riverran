import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/formatCurrency';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  Tag,
  ShieldCheck,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';

export const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    shippingFee,
    estimatedTax,
  } = useCart();

  const navigate = useNavigate();
  const [promoInput, setPromoInput] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    if (promoInput.trim().toUpperCase() === 'LUXURY20') {
      setDiscountPercent(20);
      setPromoSuccess('20% Exclusive VIP Discount applied!');
    } else {
      setPromoError('Invalid code. Try LUXURY20');
    }
  };

  const discountAmount = (subtotal * discountPercent) / 100;
  const finalSubtotal = subtotal - discountAmount;
  const finalGrandTotal = finalSubtotal + shippingFee + estimatedTax;

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center space-y-6">
        <div className="w-24 h-24 bg-cream-100 text-champagne-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="font-heading text-3xl font-bold text-noir-900">Your Shopping Bag is Empty</h2>
          <p className="text-noir-500 text-xs max-w-md mx-auto tracking-wide">
            Your bag is currently empty. Explore our collection to select handcrafted luxury pieces.
          </p>
        </div>
        <Link
          to="/shop"
          className="inline-flex items-center gap-3 px-9 py-4 bg-noir-900 hover:bg-champagne-600 text-cream-50 font-bold text-xs uppercase tracking-[0.25em] rounded-full shadow-luxury transition-all"
        >
          <span>Explore Directory</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 space-y-10"
    >
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-champagne-300/40 pb-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-champagne-600">
            Shopping Bag Overview
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-noir-900 tracking-tight mt-1">
            Your Selected Pieces
          </h1>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-rose-600 hover:text-rose-700 font-bold uppercase tracking-widest flex items-center gap-1.5 bg-rose-50 px-4 py-2.5 rounded-full transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Bag</span>
        </button>
      </div>

      {/* Cart Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        
        {/* Cart Item List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="bg-white p-6 rounded-3xl border border-champagne-300/40 shadow-sm flex flex-col sm:flex-row items-center gap-6"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-24 h-32 object-cover rounded-2xl bg-cream-100 flex-shrink-0"
              />

              <div className="flex-1 w-full space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-champagne-600">
                      {product.category}
                    </span>
                    <Link
                      to={`/product/${product.id}`}
                      className="block font-heading text-lg font-bold text-noir-900 hover:text-champagne-600 transition-colors mt-0.5"
                    >
                      {product.name}
                    </Link>
                  </div>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-noir-400 hover:text-rose-600 p-1 transition-colors"
                    aria-label="Delete item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-cream-100">
                  <div className="flex items-center border border-champagne-300/60 rounded-full bg-cream-50 p-1">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="p-1 text-noir-700 hover:bg-white rounded-full"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-noir-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="p-1 text-noir-700 hover:bg-white rounded-full"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <div className="font-heading text-lg font-bold text-noir-900">
                      {formatCurrency(product.price * quantity)}
                    </div>
                    <div className="text-[11px] text-noir-400 font-sans">
                      {formatCurrency(product.price)} each
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-noir-900 hover:text-champagne-600 transition-colors pt-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Order Summary Sidebar */}
        <div className="bg-white p-8 rounded-3xl border border-champagne-300/40 shadow-sm space-y-6">
          <h3 className="font-heading text-xl font-bold text-noir-900 pb-4 border-b border-cream-200">
            Summary Breakdown
          </h3>

          {/* Promo Form */}
          <form onSubmit={handleApplyPromo} className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.25em] text-noir-500 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-champagne-600" />
              <span>Promo Code</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Try LUXURY20"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                className="w-full px-4 py-2.5 text-xs bg-cream-50 border border-champagne-300/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-champagne-500 uppercase font-mono font-bold"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-noir-900 hover:bg-champagne-600 text-cream-50 font-bold text-xs uppercase tracking-widest rounded-xl transition-colors"
              >
                Apply
              </button>
            </div>
            {promoSuccess && (
              <p className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{promoSuccess}</span>
              </p>
            )}
            {promoError && <p className="text-xs text-rose-500 font-semibold">{promoError}</p>}
          </form>

          {/* Price Calculations */}
          <div className="space-y-3 text-xs pt-4 border-t border-cream-200">
            <div className="flex justify-between text-noir-600">
              <span>Items Subtotal</span>
              <span className="font-heading font-bold text-noir-900">{formatCurrency(subtotal)}</span>
            </div>

            {discountPercent > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>VIP Discount ({discountPercent}%)</span>
                <span>-{formatCurrency(discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between text-noir-600">
              <span>Express Courier Shipping</span>
              <span className="font-bold text-noir-900">
                {shippingFee === 0 ? (
                  <strong className="text-emerald-700 font-heading">FREE</strong>
                ) : (
                  formatCurrency(shippingFee)
                )}
              </span>
            </div>

            <div className="flex justify-between text-noir-600">
              <span>Estimated Sales Tax</span>
              <span className="font-heading font-bold text-noir-900">{formatCurrency(estimatedTax)}</span>
            </div>

            <div className="flex justify-between text-xl font-bold font-heading text-noir-900 pt-4 border-t border-cream-200">
              <span>Grand Total</span>
              <span className="text-champagne-600">{formatCurrency(finalGrandTotal)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-4 bg-noir-900 hover:bg-champagne-600 text-cream-50 font-bold text-xs uppercase tracking-[0.25em] rounded-full shadow-luxury transition-all flex items-center justify-center gap-3"
          >
            <span>Proceed To Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="text-center pt-2">
            <span className="text-[11px] text-noir-400 font-medium flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-champagne-600" />
              Guaranteed 256-Bit SSL Encrypted Checkout
            </span>
          </div>

        </div>

      </div>

    </motion.div>
  );
};
