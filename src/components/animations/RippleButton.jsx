import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const RippleButton = ({
  children,
  onClick,
  className = '',
  disabled = false,
  type = 'button',
  ...props
}) => {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = {
      id: Date.now(),
      x,
      y,
    };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    if (onClick) onClick(e);
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {children}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.4 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              top: ripple.y,
              left: ripple.x,
              transform: 'translate(-50%, -50%)',
            }}
            className="absolute w-12 h-12 bg-white/40 rounded-full pointer-events-none"
          />
        ))}
      </AnimatePresence>
    </motion.button>
  );
};
