import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Card from './Card';
import Badge from './Badge';
import AnimatedNumber from '../motion/AnimatedNumber';
import Sparkline from '../charts/Sparkline';
import { iconPop } from '../../utils/motion';

export default function StatCard({
  title,
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  isTime = false,
  badgeText,
  badgeVariant = 'accent',
  pulsingBadge = false,
  subtitle,
  icon: Icon,
  sparklineData,
  sparklineColor,
  delay = 0,
  className = '',
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Card className={`h-[112px] flex flex-col justify-between py-3.5 px-4 relative overflow-hidden ${className}`}>
      {/* Top row: Title and Badge or Icon */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted truncate">
          {title}
        </span>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {badgeText && (
            <motion.div
              initial={shouldReduceMotion ? false : { scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: delay + 0.3, type: 'spring', stiffness: 350, damping: 20 }}
            >
              <Badge variant={badgeVariant} size="sm" pulsing={pulsingBadge}>
                {badgeText}
              </Badge>
            </motion.div>
          )}
          {Icon && (
            <motion.div
              variants={shouldReduceMotion ? {} : iconPop}
              initial="hidden"
              animate="show"
              className="w-7 h-7 rounded-lg bg-surface-hover border border-border flex items-center justify-center text-text"
            >
              <Icon className="w-3.5 h-3.5 text-accent" />
            </motion.div>
          )}
        </div>
      </div>

      {/* Middle and Bottom row: Value and Sparkline */}
      <div className="flex items-end justify-between gap-2 mt-auto">
        <div className="min-w-0 flex-1">
          <div className="text-2xl font-bold text-text tracking-tight truncate flex items-baseline">
            <AnimatedNumber
              value={value}
              prefix={prefix}
              suffix={suffix}
              decimals={decimals}
              isTime={isTime}
              delay={delay * 1000}
            />
          </div>
          {subtitle && (
            <p className="text-[11px] text-muted truncate mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        {sparklineData && (
          <div className="flex-shrink-0 pb-0.5">
            <Sparkline data={sparklineData} color={sparklineColor || 'var(--accent)'} />
          </div>
        )}
      </div>
    </Card>
  );
}
