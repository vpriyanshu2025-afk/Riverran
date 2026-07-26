import React from 'react';
import { motion } from 'framer-motion';
import { luxuryEasing } from '../../utils/motion';

export const ScrollReveal = ({
  children,
  direction = 'up',
  delay = 0,
  distance = 30,
  className = '',
}) => {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
      x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.7,
        ease: luxuryEasing,
        delay,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
