import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 rounded-lg',
    md: 'text-sm px-4 py-2 gap-2 rounded-xl',
    lg: 'text-base px-5 py-2.5 gap-2.5 rounded-xl',
    icon: 'p-2 rounded-xl',
  }[size] || 'text-sm px-4 py-2 gap-2 rounded-xl';

  const variantClasses = {
    primary: 'bg-accent text-white font-medium shadow-glow btn-shine hover:brightness-110 active:brightness-95',
    secondary: 'bg-surface-hover text-text font-medium border border-border hover:bg-surface active:bg-surface-card',
    outline: 'bg-transparent text-text border border-border font-medium hover:border-accent hover:text-accent',
    ghost: 'bg-transparent text-muted hover:text-text hover:bg-surface-hover',
    danger: 'bg-rose-600/90 text-white font-medium hover:bg-rose-500 shadow-sm',
    accentSoft: 'bg-accent-soft text-accent font-medium hover:bg-accent/20 border border-accent/20',
  }[variant] || 'bg-accent text-white';

  const MotionComponent = shouldReduceMotion ? 'button' : motion.button;
  const motionProps = shouldReduceMotion ? {} : { whileTap: { scale: 0.97 }, transition: { duration: 0.08 } };

  return (
    <MotionComponent
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center transition-colors disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer ${sizeClasses} ${variantClasses} ${className}`}
      {...motionProps}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 flex-shrink-0" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 flex-shrink-0" />}
    </MotionComponent>
  );
}
