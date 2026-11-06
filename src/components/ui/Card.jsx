import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function Card({
  children,
  className = '',
  hoverEffect = true,
  onClick,
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion || !hoverEffect) {
    return (
      <div
        onClick={onClick}
        className={`glass-card rounded-2xl p-5 border border-border shadow-glass-sm transition-all duration-200 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      onClick={onClick}
      whileHover={{
        y: -3,
        boxShadow: '0 12px 30px -4px rgba(0, 0, 0, 0.35)',
        borderColor: 'var(--border-strong)',
      }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className={`glass-card rounded-2xl p-5 border border-border shadow-glass-sm relative group overflow-hidden ${className}`}
      {...props}
    >
      {/* Subtle accent glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      {children}
    </motion.div>
  );
}
