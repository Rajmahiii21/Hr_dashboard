import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function RangeToggle({
  ranges = ['7D', '1M', '6M'],
  activeRange = '6M',
  onChange,
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="inline-flex items-center p-0.5 rounded-lg bg-surface-hover/80 border border-border">
      {ranges.map((range) => {
        const isActive = activeRange === range;
        return (
          <button
            key={range}
            type="button"
            onClick={() => onChange(range)}
            className={`relative px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors select-none cursor-pointer ${
              isActive ? 'text-accent' : 'text-muted hover:text-text'
            }`}
          >
            {isActive && !shouldReduceMotion && (
              <motion.div
                layoutId="rangeActivePill"
                transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                className="absolute inset-0 bg-surface-card rounded-md border border-border shadow-sm"
              />
            )}
            {isActive && shouldReduceMotion && (
              <div className="absolute inset-0 bg-surface-card rounded-md border border-border shadow-sm" />
            )}
            <span className="relative z-10">{range}</span>
          </button>
        );
      })}
    </div>
  );
}
