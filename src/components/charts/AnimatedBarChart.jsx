import React, { memo, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import ChartTooltip from './ChartTooltip';

const AnimatedBarChart = memo(function AnimatedBarChart({
  data = [],
  dataKey = 'hours',
  xKey = 'day',
  height = 220,
  accentColor = 'var(--accent)',
  valuePrefix = '',
  valueSuffix = 'h',
  valueFormatter,
  showTallestBadge = true,
}) {
  const [activeIndex, setActiveIndex] = useState(null);

  // Find max item to highlight or show badge
  const maxValue = data.reduce((max, item) => Math.max(max, Number(item[dataKey]) || 0), 0);
  const maxIndex = data.findIndex((item) => Number(item[dataKey]) === maxValue);

  return (
    <div style={{ width: '100%', height }} className="relative select-none">
      {/* Tallest bar pill badge */}
      {showTallestBadge && maxValue > 0 && maxIndex !== -1 && (
        <div className="absolute top-1 right-2 z-10 text-[10px] text-accent font-semibold px-2 py-0.5 rounded-full bg-accent-soft border border-accent/20">
          Peak: {maxValue}{valueSuffix}
        </div>
      )}

      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          margin={{ top: 18, right: 8, left: -24, bottom: 0 }}
          onMouseMove={(state) => {
            if (state && state.activeTooltipIndex !== undefined) {
              setActiveIndex(state.activeTooltipIndex);
            }
          }}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--chart-grid)"
            vertical={false}
          />

          <XAxis
            dataKey={xKey}
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'var(--muted)', fontSize: 11 }}
            dy={8}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'var(--muted)', fontSize: 11 }}
            dx={-4}
          />

          <Tooltip
            content={
              <ChartTooltip
                prefix={valuePrefix}
                suffix={valueSuffix}
                formatter={valueFormatter}
              />
            }
            cursor={{ fill: 'transparent' }}
          />

          <Bar
            dataKey={dataKey}
            radius={[8, 8, 0, 0]}
            fill={accentColor}
            isAnimationActive={true}
            animationDuration={900}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => {
              const isHovered = activeIndex === index;
              const hasHover = activeIndex !== null;
              const opacity = hasHover ? (isHovered ? 1 : 0.45) : 0.9;
              const isTallest = index === maxIndex;

              return (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color || accentColor}
                  opacity={opacity}
                  stroke={isTallest ? 'rgba(255,255,255,0.3)' : 'none'}
                  strokeWidth={isTallest ? 1 : 0}
                  className="transition-opacity duration-150 cursor-pointer"
                />
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});

export default AnimatedBarChart;
