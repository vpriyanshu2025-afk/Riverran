import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS } from '../utils/productsData';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/formatCurrency';
import { ProductCard } from '../components/ProductCard';
import {
  Star,
  ShoppingBag,
  Check,
  Truck,
  ShieldCheck,
  ArrowLeft,
  Share2,
  Plus,
  Minus,
  CheckCircle2,
  ChevronDown,
  Maximize2,
  X,
  MapPin,
  Sparkles,
  Ruler,
  Clock,
} from 'lucide-react';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, recentlyViewed, addRecentlyViewed } = useCart();

  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

  useEffect(() => {
    if (product) {
      addRecentlyViewed(product);
    }
  }, [id, product]);

  const galleryImages = [
    product.image,
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1000&q=80',
  ];

  const [activeImage, setActiveImage] = useState(galleryImages[0]);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const colors = [
    { name: 'Champagne Satin', hex: '#D4AF37' },
    { name: 'Midnight Black', hex: '#0A0A0A' },
    { name: 'Cream Porcelain', hex: '#F5EFE6' },
    { name: 'Royal Navy', hex: '#1B365D' },
  ];
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const [userZip, setUserZip] = useState('400001');
  const [zipSubmitted, setZipSubmitted] = useState('400001');

  const [openAccordions, setOpenAccordions] = useState({
    craftsmanship: true,
    care: false,
    shipping: false,
  });

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const [added, setAdded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const filteredRecentlyViewed = recentlyViewed.filter((p) => p.id !== product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 space-y-16"
    >
      {/* Top Breadcrumb Nav */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-noir-600 hover:text-champagne-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Collection</span>
        </button>
        <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-champagne-600">
          Product Item #{product.id}
        </span>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-white border border-champagne-300/40 shadow-luxury group cursor-zoom-in">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              onClick={() => setLightboxOpen(true)}
            />
            {product.badge && (
              <span className="absolute top-6 left-6 px-4 py-1.5 bg-noir-900 text-cream-50 font-bold text-[10px] rounded-full uppercase tracking-[0.25em] shadow-md border border-champagne-400/40">
                {product.badge}
              </span>
            )}
            
            <button
              onClick={() => setLightboxOpen(true)}
              className="absolute bottom-6 right-6 p-3 rounded-full glass-luxury backdrop-blur-md text-noir-900 opacity-80 hover:opacity-100 transition-opacity shadow-sm"
              aria-label="Expand Image"
            >
              <Maximize2 className="w-4 h-4 text-champagne-600" />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {galleryImages.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(imgUrl)}
                className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                  activeImage === imgUrl
                    ? 'border-champagne-500 shadow-md ring-2 ring-champagne-300/50'
                    : 'border-cream-200 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={imgUrl} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Accordion Sections */}
          <div className="space-y-4 pt-8">
            
            <div className="bg-white rounded-3xl border border-champagne-300/40 shadow-sm overflow-hidden">
              <button
                onClick={() => toggleAccordion('craftsmanship')}
                className="w-full p-6 text-left flex items-center justify-between font-heading text-lg font-bold text-noir-900"
              >
                <span className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-champagne-600" />
                  Craftsmanship & Materials
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-champagne-600 transition-transform duration-300 ${
                    openAccordions.craftsmanship ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {openAccordions.craftsmanship && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6 text-xs text-noir-600 space-y-3 font-sans border-t border-cream-200 pt-4"
                  >
                    <p className="leading-relaxed">
                      Handcrafted using certified organic Mulberry silk and pure Mongolian cashmere. Every detail is finished by master craftsmen.
                    </p>
                    {product.specs && (
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        {Object.entries(product.specs).map(([k, v]) => (
                          <div key={k} className="p-3 bg-cream-50 rounded-xl">
                            <span className="font-bold text-noir-500 uppercase tracking-widest text-[9px] block">{k}</span>
                            <span className="font-heading text-noir-900 font-bold text-xs">{v}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="bg-white rounded-3xl border border-champagne-300/40 shadow-sm overflow-hidden">
              <button
                onClick={() => toggleAccordion('care')}
                className="w-full p-6 text-left flex items-center justify-between font-heading text-lg font-bold text-noir-900"
              >
                <span className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-champagne-600" />
                  Fabric & Garment Care
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-champagne-600 transition-transform duration-300 ${
                    openAccordions.care ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {openAccordions.care && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6 text-xs text-noir-600 space-y-2 font-sans border-t border-cream-200 pt-4"
                  >
                    <p className="leading-relaxed">
                      To preserve the natural lustre and texture, we recommend specialist dry cleaning only. Store in the provided cotton sleeve away from direct sunlight.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="bg-white rounded-3xl border border-champagne-300/40 shadow-sm overflow-hidden">
              <button
                onClick={() => toggleAccordion('shipping')}
                className="w-full p-6 text-left flex items-center justify-between font-heading text-lg font-bold text-noir-900"
              >
                <span className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-champagne-600" />
                  Complimentary Shipping & Returns
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-champagne-600 transition-transform duration-300 ${
                    openAccordions.shipping ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {openAccordions.shipping && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6 text-xs text-noir-600 space-y-2 font-sans border-t border-cream-200 pt-4"
                  >
                    <p className="leading-relaxed">
                      Complimentary express courier delivery on all orders. Items may be returned or exchanged within 30 days of delivery.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* Right Column: Sticky Purchase Panel */}
        <div className="lg:col-span-5 sticky top-28 bg-white p-8 sm:p-10 rounded-3xl border border-champagne-300/40 shadow-luxury space-y-8">
          
          <div>
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-champagne-600">
              {product.category}
            </span>
            <h1 className="font-heading text-3xl font-bold text-noir-900 tracking-tight mt-1 leading-snug">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mt-3">
              <div className="flex text-champagne-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-noir-800">{product.rating}</span>
              <span className="text-xs text-noir-400 font-sans">({product.reviewsCount} verified reviews)</span>
            </div>
          </div>

          {/* Price Hierarchy */}
          <div className="flex items-baseline gap-3 pb-4 border-b border-cream-200">
            <span className="font-heading text-3xl font-bold text-noir-900">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-noir-400 line-through font-medium">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
            <span className="ml-auto inline-flex items-center gap-1 px-3 py-1 bg-champagne-100 text-champagne-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5" />
              In Stock & Ready
            </span>
          </div>

          {/* Color Selector */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-noir-500">
              <span>Color Shade</span>
              <span className="text-noir-900 font-heading">{selectedColor.name}</span>
            </div>
            <div className="flex gap-3">
              {colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c)}
                  className={`w-9 h-9 rounded-full relative transition-all ${
                    selectedColor.name === c.name
                      ? 'ring-2 ring-champagne-500 ring-offset-2 scale-110 shadow-md'
                      : 'opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  aria-label={c.name}
                />
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-noir-500">
              <span>Select Size</span>
              <button
                onClick={() => setSizeGuideOpen(true)}
                className="text-champagne-600 hover:text-noir-900 flex items-center gap-1 font-bold lowercase text-xs tracking-normal"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>size guide</span>
              </button>
            </div>
            <div className="flex gap-2">
              {['XS', 'S', 'M', 'L', 'XL'].map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`flex-1 py-3 rounded-2xl text-xs font-bold transition-all ${
                    selectedSize === s
                      ? 'bg-noir-900 text-cream-50 shadow-md border-2 border-champagne-400'
                      : 'bg-cream-50 border border-champagne-300/60 text-noir-800 hover:border-noir-900'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Stepper & Add to Bag CTA */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-champagne-300/60 rounded-full bg-cream-50 p-1.5">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-noir-700 hover:bg-white rounded-full transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center font-bold text-noir-900 text-xs">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-noir-700 hover:bg-white rounded-full transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={added}
                className={`flex-1 py-4 px-6 rounded-full font-bold text-xs uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-2.5 shadow-gold ${
                  added
                    ? 'bg-emerald-800 text-white'
                    : 'bg-noir-900 hover:bg-champagne-600 text-cream-50'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added To Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add {quantity} To Bag</span>
                  </>
                )}
              </motion.button>
            </div>

            <div className="flex items-center justify-between text-xs text-noir-500 pt-2 border-t border-cream-200">
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 hover:text-champagne-600 font-bold uppercase tracking-wider text-[10px]"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Link Copied' : 'Share Item'}</span>
              </button>
              <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-champagne-600">
                <ShieldCheck className="w-3.5 h-3.5" />
                Authentic Certified Garment
              </span>
            </div>
          </div>

          {/* Delivery Estimator Box */}
          <div className="p-4 bg-cream-50 rounded-2xl border border-champagne-300/60 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-noir-900">
                <MapPin className="w-4 h-4 text-champagne-600" />
                <span>Delivery Estimator</span>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={userZip}
                  onChange={(e) => setUserZip(e.target.value)}
                  className="w-20 px-2 py-1 text-xs border border-champagne-300 rounded font-mono font-bold text-center"
                />
                <button
                  onClick={() => setZipSubmitted(userZip)}
                  className="px-2 py-1 bg-noir-900 text-cream-50 text-[10px] font-bold uppercase rounded"
                >
                  Calc
                </button>
              </div>
            </div>

            <div className="text-xs text-noir-600 font-sans space-y-1">
              <p className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-700" />
                <span>Estimated Arrival in <strong>{zipSubmitted}</strong>: <strong>Tuesday, July 28</strong></span>
              </p>
              <p className="text-[10px] text-noir-400">Complimentary Express Courier Shipping</p>
            </div>
          </div>

        </div>

      </div>

      {/* Tabs: Specifications & Customer Reviews */}
      <div className="bg-white rounded-3xl border border-champagne-300/40 shadow-sm p-8 sm:p-12 space-y-8">
        <div className="flex items-center space-x-8 border-b border-cream-200 pb-4">
          <button
            onClick={() => setActiveTab('specs')}
            className={`font-heading text-lg font-bold pb-2 transition-colors border-b-2 ${
              activeTab === 'specs'
                ? 'border-champagne-500 text-noir-900'
                : 'border-transparent text-noir-400 hover:text-noir-900'
            }`}
          >
            Product Specifications
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`font-heading text-lg font-bold pb-2 transition-colors border-b-2 ${
              activeTab === 'reviews'
                ? 'border-champagne-500 text-noir-900'
                : 'border-transparent text-noir-400 hover:text-noir-900'
            }`}
          >
            Verified Client Reviews ({product.reviewsCount})
          </button>
        </div>

        {activeTab === 'specs' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
            {product.specs &&
              Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="flex justify-between p-4 bg-cream-50 rounded-2xl border border-champagne-200/50">
                  <span className="font-semibold text-noir-500 uppercase tracking-widest">{key}</span>
                  <span className="font-bold text-noir-900 font-heading text-sm">{val}</span>
                </div>
              ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-6 bg-cream-50 rounded-2xl border border-champagne-200/50 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-heading font-bold text-noir-900 text-base">Sarah Jenkins</h4>
                <div className="flex text-champagne-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-noir-600 leading-relaxed italic">
                "Pure perfection. The fabric drape and tailoring are breathtaking in person. Arrived in a custom box."
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Recommended Items */}
      {relatedProducts.length > 0 && (
        <section className="space-y-8">
          <h3 className="font-heading text-2xl font-bold text-noir-900">Recommended Additions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Recently Viewed Section */}
      {filteredRecentlyViewed.length > 0 && (
        <section className="space-y-8 pt-8 border-t border-champagne-300/40">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-champagne-600">
              Session History
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-noir-900 tracking-tight mt-1">
              Recently Viewed Items
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredRecentlyViewed.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Lightbox Zoom Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-noir-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 p-3 text-cream-50 hover:text-champagne-400 bg-noir-800 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={activeImage}
              alt={product.name}
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-champagne-400/30"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Size Guide Modal */}
      <AnimatePresence>
        {sizeGuideOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-noir-950/70 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white p-8 rounded-3xl max-w-lg w-full space-y-6 shadow-2xl relative border border-champagne-300/40"
            >
              <div className="flex justify-between items-center border-b border-cream-200 pb-4">
                <h3 className="font-heading text-xl font-bold text-noir-900">Size Measurements</h3>
                <button
                  onClick={() => setSizeGuideOpen(false)}
                  className="p-1 text-noir-400 hover:text-noir-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <table className="w-full text-left border-collapse font-sans">
                  <thead>
                    <tr className="border-b border-cream-200 text-noir-500 font-bold uppercase tracking-widest text-[9px]">
                      <th className="py-2">Size</th>
                      <th className="py-2">Bust / Chest</th>
                      <th className="py-2">Waist</th>
                      <th className="py-2">Hips</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cream-100 font-medium text-noir-800">
                    <tr><td className="py-2.5 font-bold">XS</td><td>82 cm</td><td>64 cm</td><td>90 cm</td></tr>
                    <tr><td className="py-2.5 font-bold">S</td><td>86 cm</td><td>68 cm</td><td>94 cm</td></tr>
                    <tr><td className="py-2.5 font-bold">M</td><td>90 cm</td><td>72 cm</td><td>98 cm</td></tr>
                    <tr><td className="py-2.5 font-bold">L</td><td>96 cm</td><td>78 cm</td><td>104 cm</td></tr>
                    <tr><td className="py-2.5 font-bold">XL</td><td>102 cm</td><td>84 cm</td><td>110 cm</td></tr>
                  </tbody>
                </table>
              </div>

              <button
                onClick={() => setSizeGuideOpen(false)}
                className="w-full py-3 bg-noir-900 text-cream-50 font-bold text-xs uppercase tracking-widest rounded-full"
              >
                Close Size Guide
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sticky Quick Add Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md p-4 border-t border-champagne-300/40 shadow-2xl flex items-center justify-between gap-4">
        <div>
          <h4 className="font-heading text-sm font-bold text-noir-900 line-clamp-1">{product.name}</h4>
          <span className="font-heading text-xs font-bold text-champagne-600">{formatCurrency(product.price)}</span>
        </div>
        <button
          onClick={handleAddToCart}
          className="px-6 py-3 bg-noir-900 hover:bg-champagne-600 text-cream-50 font-bold text-xs uppercase tracking-widest rounded-full shadow-md flex items-center gap-2 flex-shrink-0"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add To Bag</span>
        </button>
      </div>

    </motion.div>
  );
};
