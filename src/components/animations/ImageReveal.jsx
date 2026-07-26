import React from 'react';
import { motion } from 'framer-motion';
import { luxuryEasing } from '../../utils/motion';

export const ImageReveal = ({ src, alt, className = '', imgClassName = '' }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Curtain Mask overlay animation */}
      <motion.div
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: luxuryEasing }}
        className="absolute inset-0 bg-noir-900 z-10 origin-top"
      />
      <motion.img
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: luxuryEasing }}
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${imgClassName}`}
      />
    </div>
  );
};
