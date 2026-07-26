/**
 * Subtle Luxury Framer Motion Animation Variants & Easing Functions
 */

export const luxuryEasing = [0.16, 1, 0.3, 1];

export const fadeIn = (direction = 'up', delay = 0, distance = 20) => ({
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
});

export const slideIn = (direction = 'left', delay = 0, distance = 40) => ({
  hidden: {
    x: direction === 'left' ? -distance : direction === 'right' ? distance : 0,
    y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
    opacity: 0,
  },
  visible: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: luxuryEasing,
      delay,
    },
  },
});

export const scaleIn = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: luxuryEasing,
      delay,
    },
  },
});

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const cardHoverVariants = {
  initial: { y: 0, shadow: '0 10px 30px rgba(10,10,10,0.05)' },
  hover: {
    y: -8,
    shadow: '0 25px 50px -12px rgba(10,10,10,0.14)',
    transition: { duration: 0.4, ease: luxuryEasing },
  },
};
