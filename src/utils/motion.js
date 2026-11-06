/**
 * Motion utilities and Framer Motion spring presets
 */

export const springConfig = {
  type: "spring",
  stiffness: 220,
  damping: 24,
  mass: 1,
};

export const snappySpring = {
  type: "spring",
  stiffness: 340,
  damping: 28,
};

export const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const item = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.96,
    filter: "blur(6px)",
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: springConfig,
  },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: springConfig,
  },
};

export const iconPop = {
  hidden: { scale: 0.6, rotate: -12, opacity: 0 },
  show: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 280,
      damping: 18,
      delay: 0.15,
    },
  },
};

export const cardHover = {
  rest: { y: 0, scale: 1, boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.2)" },
  hover: {
    y: -4,
    scale: 1.005,
    boxShadow: "0 12px 28px -4px rgba(0, 0, 0, 0.35)",
    transition: { duration: 0.15, ease: "easeOut" },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.08 },
  },
};

export const pageTransition = {
  initial: { opacity: 0, y: 14 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.18, ease: "easeIn" },
  },
};
