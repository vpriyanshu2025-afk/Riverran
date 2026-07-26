import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';

export const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-xl mx-auto px-6 py-24 text-center space-y-6"
    >
      <div className="w-20 h-20 bg-cream-100 text-champagne-600 rounded-full flex items-center justify-center mx-auto">
        <Sparkles className="w-10 h-10" />
      </div>
      <div className="space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-champagne-600">404 Error</span>
        <h1 className="font-serif text-4xl font-bold text-noir-900">Page Not Found</h1>
        <p className="text-noir-500 text-xs tracking-wide">
          The couture page you requested is not currently active in our Paris directory.
        </p>
      </div>
      <Link
        to="/shop"
        className="inline-flex items-center gap-3 px-8 py-3.5 bg-noir-900 hover:bg-champagne-600 text-cream-50 font-bold text-xs uppercase tracking-[0.25em] rounded-full transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Atelier</span>
      </Link>
    </motion.div>
  );
};
