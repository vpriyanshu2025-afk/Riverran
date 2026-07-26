import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/formatCurrency';
import { saveOrderToFirestore } from '../utils/firebase';
import {
  Truck,
  ArrowRight,
  Phone,
  User,
  MapPin,
  Building,
  MessageSquare,
  Sparkles,
  Mail,
  FileText,
  AlertCircle,
  CheckCircle2,
  Trash2,
  Database,
} from 'lucide-react';

export const Checkout = () => {
  const { cart, grandTotal, subtotal, shippingFee, estimatedTax, clearCart } = useCart();
  const navigate = useNavigate();

  // Target WhatsApp Phone Number
  const [storeWhatsAppNumber, setStoreWhatsAppNumber] = useState('917291817567');

  // Form State
  const [formData, setFormData] = useState({
    fullName: 'Ananya Sharma',
    phone: '+91 98765 43210',
    email: 'ananya@riverran-luxury.com',
    address: '14 Park Street, Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pinCode: '400001',
    orderNotes: 'Please package in luxury gift wrap if possible.',
  });

  // Validation Error state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  /**
   * Validate required fields
   */
  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone Number is required for WhatsApp';
    if (!formData.address.trim()) newErrors.address = 'Street Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pinCode.trim()) newErrors.pinCode = 'PIN Code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Save order to Firestore AND launch WhatsApp
   */
  const handleWhatsAppCheckout = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const generatedOrderId = 'RIVERRAN-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedOrderId);

    // 1. Prepare Order Document for Firestore
    const orderPayload = {
      orderRef: generatedOrderId,
      storeName: 'Riverran',
      customer: { ...formData },
      products: cart.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        color: item.product.color || 'Champagne Satin',
        size: item.product.size || 'M',
        quantity: item.quantity,
        price: item.product.price,
        image: item.product.image,
      })),
      totalQuantity: cart.reduce((acc, i) => acc + i.quantity, 0),
      pricing: {
        subtotal,
        shippingFee,
        estimatedTax,
        grandTotal,
      },
      status: 'Pending',
    };

    // 2. Save Order to Firestore DB
    await saveOrderToFirestore(orderPayload);

    // 3. Format WhatsApp Text Message in 100% Clean English
    const formattedProducts = cart
      .map((item, index) => {
        const p = item.product;
        const color = p.color || 'Champagne Satin';
        const size = p.size || 'M';
        const itemTotal = formatCurrency(p.price * item.quantity);
        return `• *${index + 1}. ${p.name}*
  - *Color:* ${color}
  - *Size:* ${size}
  - *Qty:* ${item.quantity} x ${formatCurrency(p.price)} = ${itemTotal}`;
      })
      .join('\n\n');

    const messageText = `🛍️ *STORE: RIVERRAN*
*ORDER REF:* ${generatedOrderId}
----------------------------------
👤 *CUSTOMER DETAILS:*
• *Name:* ${formData.fullName}
• *Phone:* ${formData.phone}${formData.email ? `\n• *Email:* ${formData.email}` : ''}
• *Address:* ${formData.address}
• *City:* ${formData.city}
• *State:* ${formData.state}
• *PIN Code:* ${formData.pinCode}

📦 *ORDER ITEMS:*
${formattedProducts}

----------------------------------
💰 *PAYMENT SUMMARY:*
• *Subtotal:* ${formatCurrency(subtotal)}
• *Shipping:* ${shippingFee === 0 ? 'FREE Express Courier' : formatCurrency(shippingFee)}
• *Sales Tax:* ${formatCurrency(estimatedTax)}
• *GRAND TOTAL:* ${formatCurrency(grandTotal)}
${formData.orderNotes ? `\n📝 *ORDER NOTES:*\n"${formData.orderNotes}"` : ''}
----------------------------------
Thank you for shopping with Riverran!`;

    // 4. Construct WhatsApp URL
    const cleanNumber = storeWhatsAppNumber.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(messageText)}`;
    setWhatsappUrl(url);

    setTimeout(() => {
      setIsSubmitting(false);
      setOrderComplete(true);
      window.open(url, '_blank');
    }, 1000);
  };

  const handleConfirmAndClearCart = () => {
    clearCart();
    navigate('/shop');
  };

  if (orderComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto px-6 py-20 text-center space-y-8"
      >
        <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-gold">
          <MessageSquare className="w-10 h-10 text-emerald-700" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-champagne-600 flex items-center justify-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-emerald-700" />
            <span>Saved to Database & WhatsApp Launched</span>
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-noir-900">
            Order Saved & Launched
          </h1>
          <p className="text-xs text-noir-500 max-w-md mx-auto tracking-wide font-sans">
            Your order <strong className="text-noir-900 font-heading">{orderId}</strong> is saved with status <strong className="text-amber-600">Pending</strong> and launched in WhatsApp.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-champagne-300/40 text-left space-y-4 shadow-sm max-w-md mx-auto text-xs font-sans">
          <div className="flex justify-between border-b border-cream-200 pb-3">
            <span className="text-noir-500 font-medium uppercase tracking-wider">Store Name</span>
            <span className="font-heading font-bold text-noir-900 text-sm">Riverran</span>
          </div>
          <div className="flex justify-between border-b border-cream-200 pb-3">
            <span className="text-noir-500 font-medium uppercase tracking-wider">Database Status</span>
            <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 font-bold rounded-full text-[10px] uppercase">
              Pending
            </span>
          </div>
          <div className="flex justify-between border-b border-cream-200 pb-3">
            <span className="text-noir-500 font-medium uppercase tracking-wider">Customer</span>
            <span className="font-bold text-noir-900">{formData.fullName}</span>
          </div>
          <div className="flex justify-between border-b border-cream-200 pb-3">
            <span className="text-noir-500 font-medium uppercase tracking-wider">Contact Phone</span>
            <span className="font-bold text-noir-900">{formData.phone}</span>
          </div>
          <div className="flex justify-between border-b border-cream-200 pb-3">
            <span className="text-noir-500 font-medium uppercase tracking-wider">Complete Address</span>
            <span className="font-bold text-noir-900 text-right">
              {formData.address}, {formData.city}, {formData.state} - {formData.pinCode}
            </span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="text-noir-500 font-medium uppercase tracking-wider">Grand Total</span>
            <span className="font-heading font-bold text-champagne-600 text-base">{formatCurrency(grandTotal)}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-full shadow-lg transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Re-open WhatsApp Message</span>
            </a>
          )}

          <button
            onClick={handleConfirmAndClearCart}
            className="w-full sm:w-auto px-8 py-4 bg-noir-900 hover:bg-champagne-600 text-cream-50 font-bold text-xs uppercase tracking-[0.2em] rounded-full transition-colors inline-flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear Bag & Finish</span>
          </button>
        </div>
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
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-champagne-600 flex items-center gap-1.5">
          <Database className="w-3.5 h-3.5 text-champagne-600" />
          <span>Store: Riverran</span>
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-noir-900 tracking-tight mt-1">
          WhatsApp & Database Order Checkout
        </h1>
        <p className="text-xs text-noir-500 mt-2 font-sans">
          Enter your delivery details to generate a formatted WhatsApp message sent to <strong>+91 7291817567</strong>.
        </p>
      </div>

      <form onSubmit={handleWhatsAppCheckout} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Customer Form Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Customer Details Form */}
          <div className="bg-white p-8 rounded-3xl border border-champagne-300/40 shadow-sm space-y-6">
            <h3 className="font-heading text-xl font-bold text-noir-900 flex items-center gap-3">
              <User className="w-5 h-5 text-champagne-600" />
              <span>Customer Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs font-sans">
              
              {/* Full Name */}
              <div className="sm:col-span-2">
                <label className="text-[10px] font-bold text-noir-500 uppercase tracking-widest block mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-champagne-600" />
                    <span>Full Name *</span>
                  </span>
                  {errors.fullName && (
                    <span className="text-rose-500 text-[10px] lowercase font-normal flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.fullName}
                    </span>
                  )}
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="e.g. Ananya Sharma"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-cream-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-champagne-500 font-medium ${
                    errors.fullName ? 'border-rose-500 bg-rose-50/20' : 'border-champagne-300/60'
                  }`}
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="text-[10px] font-bold text-noir-500 uppercase tracking-widest block mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-champagne-600" />
                    <span>Phone Number *</span>
                  </span>
                  {errors.phone && (
                    <span className="text-rose-500 text-[10px] lowercase font-normal flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.phone}
                    </span>
                  )}
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="e.g. +91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-cream-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-champagne-500 font-medium font-mono ${
                    errors.phone ? 'border-rose-500 bg-rose-50/20' : 'border-champagne-300/60'
                  }`}
                />
              </div>

              {/* Email (Optional) */}
              <div>
                <label className="text-[10px] font-bold text-noir-500 uppercase tracking-widest block mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-champagne-600" />
                  <span>Email (Optional)</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="e.g. ananya@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-cream-50 border border-champagne-300/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-champagne-500 font-medium"
                />
              </div>

              {/* Address */}
              <div className="sm:col-span-2">
                <label className="text-[10px] font-bold text-noir-500 uppercase tracking-widest block mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-champagne-600" />
                    <span>Address *</span>
                  </span>
                  {errors.address && (
                    <span className="text-rose-500 text-[10px] lowercase font-normal flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.address}
                    </span>
                  )}
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="e.g. 14 Park Street, Bandra West"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-cream-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-champagne-500 font-medium ${
                    errors.address ? 'border-rose-500 bg-rose-50/20' : 'border-champagne-300/60'
                  }`}
                />
              </div>

              {/* City */}
              <div>
                <label className="text-[10px] font-bold text-noir-500 uppercase tracking-widest block mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-champagne-600" />
                    <span>City *</span>
                  </span>
                  {errors.city && (
                    <span className="text-rose-500 text-[10px] lowercase font-normal flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.city}
                    </span>
                  )}
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="e.g. Mumbai"
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-cream-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-champagne-500 font-medium ${
                    errors.city ? 'border-rose-500 bg-rose-50/20' : 'border-champagne-300/60'
                  }`}
                />
              </div>

              {/* State */}
              <div>
                <label className="text-[10px] font-bold text-noir-500 uppercase tracking-widest block mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-champagne-600" />
                    <span>State *</span>
                  </span>
                  {errors.state && (
                    <span className="text-rose-500 text-[10px] lowercase font-normal flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.state}
                    </span>
                  )}
                </label>
                <input
                  type="text"
                  name="state"
                  placeholder="e.g. Maharashtra"
                  value={formData.state}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-cream-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-champagne-500 font-medium ${
                    errors.state ? 'border-rose-500 bg-rose-50/20' : 'border-champagne-300/60'
                  }`}
                />
              </div>

              {/* PIN Code */}
              <div className="sm:col-span-2">
                <label className="text-[10px] font-bold text-noir-500 uppercase tracking-widest block mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-champagne-600" />
                    <span>PIN Code *</span>
                  </span>
                  {errors.pinCode && (
                    <span className="text-rose-500 text-[10px] lowercase font-normal flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.pinCode}
                    </span>
                  )}
                </label>
                <input
                  type="text"
                  name="pinCode"
                  placeholder="e.g. 400001"
                  value={formData.pinCode}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-cream-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-champagne-500 font-medium font-mono ${
                    errors.pinCode ? 'border-rose-500 bg-rose-50/20' : 'border-champagne-300/60'
                  }`}
                />
              </div>

              {/* Order Notes (Optional) */}
              <div className="sm:col-span-2">
                <label className="text-[10px] font-bold text-noir-500 uppercase tracking-widest block mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-champagne-600" />
                  <span>Order Notes (Optional)</span>
                </label>
                <textarea
                  rows="3"
                  name="orderNotes"
                  placeholder="Special instructions for delivery or gift wrapping..."
                  value={formData.orderNotes}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-cream-50 border border-champagne-300/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-champagne-500 font-medium"
                />
              </div>

            </div>
          </div>

          {/* Store WhatsApp Target Phone Number Configurator */}
          <div className="bg-cream-100/70 p-6 rounded-3xl border border-champagne-300/60 space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold text-noir-900 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-emerald-700" />
                <span>WhatsApp Target Number</span>
              </span>
              <input
                type="text"
                value={storeWhatsAppNumber}
                onChange={(e) => setStoreWhatsAppNumber(e.target.value)}
                className="w-36 px-3 py-1 bg-white border border-champagne-300 rounded-lg text-xs font-mono font-bold text-center"
              />
            </div>
            <p className="text-[11px] text-noir-500">
              Orders will be saved to Database and sent to <code className="font-mono bg-white px-1.5 py-0.5 rounded text-emerald-800 font-bold">https://wa.me/{storeWhatsAppNumber}</code>
            </p>
          </div>

        </div>

        {/* Right Order Breakdown Column (1 Col) */}
        <div className="bg-white p-8 rounded-3xl border border-champagne-300/40 shadow-sm space-y-6">
          <h3 className="font-heading text-xl font-bold text-noir-900 pb-4 border-b border-cream-200">
            Order Breakdown
          </h3>

          {/* Product Items List */}
          <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
            {cart.map(({ product, quantity }) => {
              const color = product.color || 'Champagne Satin';
              const size = product.size || 'M';
              return (
                <div key={product.id} className="p-3.5 bg-cream-50 rounded-2xl border border-champagne-200/50 space-y-1.5 text-xs font-sans">
                  <div className="flex justify-between font-bold text-noir-900">
                    <span className="line-clamp-1">{product.name}</span>
                    <span>{formatCurrency(product.price * quantity)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-noir-500">
                    <span>Color: <strong className="text-noir-800">{color}</strong></span>
                    <span>Size: <strong className="text-noir-800">{size}</strong></span>
                    <span>Qty: <strong className="text-noir-800">{quantity}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-2 text-xs pt-4 border-t border-cream-200">
            <div className="flex justify-between text-noir-600">
              <span>Subtotal</span>
              <span className="font-heading font-bold text-noir-900">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-noir-600">
              <span>Shipping</span>
              <span className="font-heading font-bold text-noir-900">
                {shippingFee === 0 ? 'FREE Express Courier' : formatCurrency(shippingFee)}
              </span>
            </div>
            <div className="flex justify-between text-noir-600">
              <span>Sales Tax (8%)</span>
              <span className="font-heading font-bold text-noir-900">{formatCurrency(estimatedTax)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold font-heading text-noir-900 pt-4 border-t border-cream-200">
              <span>Grand Total</span>
              <span className="text-champagne-600">{formatCurrency(grandTotal)}</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-[0.25em] rounded-full shadow-lg transition-all flex items-center justify-center gap-3"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{isSubmitting ? 'Formatting Order...' : 'Order on WhatsApp'}</span>
          </button>

          <p className="text-[10px] text-center text-noir-400 font-sans">
            Saves order document to Database & opens WhatsApp addressing <strong>+91 7291817567</strong>.
          </p>
        </div>

      </form>

    </motion.div>
  );
};
