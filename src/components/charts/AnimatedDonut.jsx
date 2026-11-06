import React, { memo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion, useReducedMotion } from 'framer-motion';
import AnimatedNumber from '../motion/AnimatedNumber';
import ChartTooltip from './ChartTooltip';

const AnimatedDonut = memo(function AnimatedDonut({
  data = [],
  totalLabel = 'Total',
  centerValue,
  valueSuffix = '',
  valuePrefix = '',
  height = 200,
  innerRadius = 55,
  outerRadius = 75,
}) {
  const shouldReduceMotion = useReducedMotion();

  const total = centerValue !== undefined
    ? centerValue
    : data.reduce((sum, item) => sum + (Number(item.value) || 0), 0);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full select-none">
      {/* Donut with center AnimatedNumber */}
      <div style={{ width: height, height }} className="relative flex-shrink-0 flex items-center justify-center">
        <ResponsiveContainer width={height} height={height}>
          <PieChart>
            <Tooltip
              content={<ChartTooltip prefix={valuePrefix} suffix={valueSuffix} />}
            />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={3}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              isAnimationActive={!shouldReduceMotion}
              animationDuration={1000}
              animationEasing="ease-out"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`donut-cell-${index}`}
                  fill={entry.color || 'var(--accent)'}
                  stroke="var(--surface-card)"
                  strokeWidth={2}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl font-bold text-text tracking-tight font-mono tabular-nums">
            <AnimatedNumber value={total} prefix={valuePrefix} suffix={valueSuffix} delay={300} />
          </span>
          <span className="text-[10px] uppercase tracking-wider text-muted font-medium">
            {totalLabel}
          </span>
        </div>
      </div>

      {/* Legend items sliding in from right */}
      <div className="flex-1 w-full space-y-2">
        {data.map((item, idx) => (
          <motion.div
            key={item.name || idx}
            initial={shouldReduceMotion ? false : { opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + idx * 0.08, duration: 0.3 }}
            className="flex items-center justify-between text-xs py-1 px-2 rounded-lg hover:bg-surface-hover transition-colors"
          >
            <div className="flex items-center gap-2 truncate">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color || 'var(--accent)' }}
              />
              <span className="text-muted text-[11px] truncate">{item.name}</span>
            </div>
            <span className="font-mono font-semibold text-text tabular-nums ml-2">
              <AnimatedNumber value={item.value} prefix={valuePrefix} suffix={valueSuffix} delay={400} />
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
});

export default AnimatedDonut;
