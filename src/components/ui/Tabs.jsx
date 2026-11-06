import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function Tabs({
  tabs = [],
  activeTab,
  onChange,
  variant = 'underline', // 'underline' or 'pill'
  className = '',
}) {
  const shouldReduceMotion = useReducedMotion();

  if (variant === 'pill') {
    return (
      <div className={`inline-flex p-1 bg-surface-hover/70 border border-border rounded-xl ${className}`}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`relative px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors select-none cursor-pointer ${
                isActive ? 'text-text' : 'text-muted hover:text-text'
              }`}
            >
              {isActive && !shouldReduceMotion && (
                <motion.div
                  layoutId="activePill"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  className="absolute inset-0 bg-surface-card border border-border rounded-lg shadow-sm"
                />
              )}
              {isActive && shouldReduceMotion && (
                <div className="absolute inset-0 bg-surface-card border border-border rounded-lg shadow-sm" />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {tab.icon && <tab.icon className="w-3.5 h-3.5" />}
                {tab.label}
                {tab.badge !== undefined && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isActive ? 'bg-accent/20 text-accent font-semibold' : 'bg-surface text-muted'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  // Underline variant
  return (
    <div className={`flex items-center gap-6 border-b border-border ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`relative pb-3 text-sm font-medium transition-colors select-none cursor-pointer flex items-center gap-2 ${
              isActive ? 'text-accent font-semibold' : 'text-muted hover:text-text'
            }`}
          >
            {tab.icon && <tab.icon className="w-4 h-4" />}
            {tab.label}
            {tab.badge !== undefined && (
              <span className="px-1.5 py-0.5 rounded-full text-[11px] bg-accent-soft text-accent font-medium">
                {tab.badge}
              </span>
            )}
            {isActive && !shouldReduceMotion && (
              <motion.div
                layoutId="activeUnderline"
                transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full"
              />
            )}
            {isActive && shouldReduceMotion && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
}
