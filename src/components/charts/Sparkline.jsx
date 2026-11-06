import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function Sparkline({
  data = [1, 2, 3, 2, 4, 3, 5],
  color = 'var(--accent)',
  height = 36,
  width = 90,
  fillOpacity = 0.15,
}) {
  const shouldReduceMotion = useReducedMotion();

  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const paddingY = 4;
  const usableHeight = height - paddingY * 2;
  const stepX = width / (data.length - 1);

  const points = data.map((val, i) => {
    const x = i * stepX;
    const y = height - paddingY - ((val - min) / range) * usableHeight;
    return [x, y];
  });

  // Build SVG path
  const linePath = points.reduce((acc, [x, y], i) => {
    return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  const areaPath = `${linePath} L ${width} ${height} L 0 ${height} Z`;

  return (
    <div className="relative inline-flex items-center overflow-hidden" style={{ width, height }}>
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <linearGradient id={`sparkGrad-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={fillOpacity} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>

        <path d={areaPath} fill={`url(#sparkGrad-${color})`} />

        {shouldReduceMotion ? (
          <path d={linePath} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
        ) : (
          <motion.path
            d={linePath}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          />
        )}
      </svg>
    </div>
  );
}
