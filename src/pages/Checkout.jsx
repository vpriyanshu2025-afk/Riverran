import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/formatCurrency';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Truck,
  ArrowRight,
  Sparkles,
  Award,
} from 'lucide-react';

export const Checkout = () => {
  const { cart, grandTotal, subtotal, shippingFee, estimatedTax, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: 'Baroness Caroline de Rothschild',
    email: 'caroline@rothschild-atelier.com',
    address: '14 Rue du Faubourg Saint-Honoré',
    city: 'Paris',
    zipCode: '75008',
    paymentMethod: 'card',
    cardNumber: '•••• •••• •••• 8888',
    cardExp: '10/29',
    cardCvc: '999',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setOrderId('ATELIER-' + Math.floor(100000 + Math.random() * 900000));
      setOrderComplete(true);
      clearCart();
    }, 1500);
  };

  if (orderComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto px-6 py-20 text-center space-y-8"
      >
        <div className="w-20 h-20 bg-champagne-100 text-champagne-600 rounded-full flex items-center justify-center mx-auto shadow-gold">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-champagne-600">
            Couture Order Confirmed
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-noir-900">Thank You for Your Order</h1>
          <p className="text-xs text-noir-500 max-w-md mx-auto tracking-wide">
            Your haute couture piece <strong className="text-noir-900 font-serif">{orderId}</strong> is now being tailored in our Paris studio. A receipt has been dispatched to <strong>{formData.email}</strong>.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-champagne-300/40 text-left space-y-4 shadow-sm max-w-md mx-auto text-xs">
          <div className="flex justify-between border-b border-cream-200 pb-3">
            <span className="text-noir-500 font-medium uppercase tracking-wider">Tracking Code</span>
            <span className="font-serif font-bold text-noir-900 text-sm">{orderId}</span>
          </div>
          <div className="flex justify-between border-b border-cream-200 pb-3">
            <span className="text-noir-500 font-medium uppercase tracking-wider">Delivery Destination</span>
            <span className="font-bold text-noir-900 text-right">
              {formData.address}, {formData.city}
            </span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="text-noir-500 font-medium uppercase tracking-wider">Total Paid</span>
            <span className="font-serif font-bold text-champagne-600 text-base">{formatCurrency(grandTotal)}</span>
          </div>
        </div>

        <button
          onClick={() => navigate('/shop')}
          className="px-9 py-4 bg-noir-900 hover:bg-champagne-600 text-cream-50 font-bold text-xs uppercase tracking-[0.25em] rounded-full transition-colors inline-flex items-center gap-3"
        >
          <span>Return To Atelier</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 space-y-10"
    >
      <div>
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-champagne-600">
          Private Checkout
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-noir-900 tracking-tight mt-1">
          Delivery & Payment Details
        </h1>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Form Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Delivery Address */}
          <div className="bg-white p-8 rounded-3xl border border-champagne-300/40 shadow-sm space-y-6">
            <h3 className="font-serif text-xl font-bold text-noir-900 flex items-center gap-3">
              <Truck className="w-5 h-5 text-champagne-600" />
              <span>Express Delivery Address</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
              <div>
                <label className="text-[10px] font-bold text-noir-500 uppercase tracking-widest block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-cream-50 border border-champagne-300/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-champagne-500 font-medium"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-noir-500 uppercase tracking-widest block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-cream-50 border border-champagne-300/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-champagne-500 font-medium"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[10px] font-bold text-noir-500 uppercase tracking-widest block mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-cream-50 border border-champagne-300/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-champagne-500 font-medium"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-noir-500 uppercase tracking-widest block mb-1">City</label>
                <input
                  type="text"
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-cream-50 border border-champagne-300/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-champagne-500 font-medium"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-noir-500 uppercase tracking-widest block mb-1">ZIP / Postal Code</label>
                <input
                  type="text"
                  required
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-cream-50 border border-champagne-300/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-champagne-500 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-white p-8 rounded-3xl border border-champagne-300/40 shadow-sm space-y-6">
            <h3 className="font-serif text-xl font-bold text-noir-900 flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-champagne-600" />
              <span>Payment Option</span>
            </h3>

            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                className={`py-4 px-4 rounded-2xl border text-xs font-bold flex flex-col items-center gap-2 transition-all ${
                  formData.paymentMethod === 'card'
                    ? 'border-champagne-500 bg-champagne-100/60 text-noir-900 shadow-sm'
                    : 'border-cream-200 text-noir-600 hover:border-champagne-300'
                }`}
              >
                <CreditCard className="w-5 h-5 text-champagne-600" />
                <span className="uppercase tracking-widest text-[10px]">Credit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: 'applepay' })}
                className={`py-4 px-4 rounded-2xl border text-xs font-bold flex flex-col items-center gap-2 transition-all ${
                  formData.paymentMethod === 'applepay'
                    ? 'border-champagne-500 bg-champagne-100/60 text-noir-900 shadow-sm'
                    : 'border-cream-200 text-noir-600 hover:border-champagne-300'
                }`}
              >
                <Sparkles className="w-5 h-5 text-champagne-600" />
                <span className="uppercase tracking-widest text-[10px]">Apple Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: 'wire' })}
                className={`py-4 px-4 rounded-2xl border text-xs font-bold flex flex-col items-center gap-2 transition-all ${
                  formData.paymentMethod === 'wire'
                    ? 'border-champagne-500 bg-champagne-100/60 text-noir-900 shadow-sm'
                    : 'border-cream-200 text-noir-600 hover:border-champagne-300'
                }`}
              >
                <Award className="w-5 h-5 text-champagne-600" />
                <span className="uppercase tracking-widest text-[10px]">Bank Transfer</span>
              </button>
            </div>

            {formData.paymentMethod === 'card' && (
              <div className="space-y-4 pt-2 text-xs">
                <div>
                  <label className="text-[10px] font-bold text-noir-500 uppercase tracking-widest block mb-1">Card Number</label>
                  <input
                    type="text"
                    required
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-cream-50 border border-champagne-300/60 rounded-xl font-mono text-sm font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-noir-500 uppercase tracking-widest block mb-1">Expiry Date</label>
                    <input
                      type="text"
                      required
                      name="cardExp"
                      value={formData.cardExp}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-cream-50 border border-champagne-300/60 rounded-xl font-mono text-sm font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-noir-500 uppercase tracking-widest block mb-1">Security Code (CVC)</label>
                    <input
                      type="text"
                      required
                      name="cardCvc"
                      value={formData.cardCvc}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-cream-50 border border-champagne-300/60 rounded-xl font-mono text-sm font-bold"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right Order Overview Column (1 Col) */}
        <div className="bg-white p-8 rounded-3xl border border-champagne-300/40 shadow-sm space-y-6">
          <h3 className="font-serif text-xl font-bold text-noir-900 pb-4 border-b border-cream-200">
            Order Overview
          </h3>

          <div className="space-y-3 max-h-60 overflow-y-auto">
            {cart.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between items-center text-xs">
                <span className="font-medium text-noir-700 line-clamp-1 pr-2">
                  {quantity}x {product.name}
                </span>
                <span className="font-serif font-bold text-noir-900">
                  {formatCurrency(product.price * quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-xs pt-4 border-t border-cream-200">
            <div className="flex justify-between text-noir-600">
              <span>Subtotal</span>
              <span className="font-serif font-bold text-noir-900">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-noir-600">
              <span>Express Shipping</span>
              <span className="font-serif font-bold text-noir-900">
                {shippingFee === 0 ? 'COMPLIMENTARY' : formatCurrency(shippingFee)}
              </span>
            </div>
            <div className="flex justify-between text-noir-600">
              <span>Sales Tax</span>
              <span className="font-serif font-bold text-noir-900">{formatCurrency(estimatedTax)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold font-serif text-noir-900 pt-4 border-t border-cream-200">
              <span>Total Amount</span>
              <span className="text-champagne-600">{formatCurrency(grandTotal)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-noir-900 hover:bg-champagne-600 text-cream-50 font-bold text-xs uppercase tracking-[0.25em] rounded-full shadow-luxury transition-all flex items-center justify-center gap-3"
          >
            <Lock className="w-4 h-4 text-champagne-400" />
            <span>{isSubmitting ? 'Securing Atelier Order...' : 'Place Couture Order'}</span>
          </button>

          <p className="text-[10px] text-center text-noir-400 font-sans">
            By placing order, you accept Riverran Atelier's Privacy Policy & Terms of Haute Couture.
          </p>
        </div>

      </form>

    </motion.div>
  );
};
