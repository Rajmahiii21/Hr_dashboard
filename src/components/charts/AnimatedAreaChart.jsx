import React, { memo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import ChartTooltip from './ChartTooltip';

const CustomActiveDot = (props) => {
  const { cx, cy, stroke } = props;
  return (
    <g>
      <circle cx={cx} cy={cy} r={8} fill={stroke} opacity={0.25} className="animate-ping origin-center" />
      <circle cx={cx} cy={cy} r={5} fill={stroke} stroke="var(--surface-card)" strokeWidth={2} />
    </g>
  );
};

const AnimatedAreaChart = memo(function AnimatedAreaChart({
  data = [],
  dataKey = 'days',
  secondaryKey,
  xKey = 'period',
  height = 220,
  accentColor = 'var(--accent)',
  secondaryColor = '#0EA5E9',
  valuePrefix = '',
  valueSuffix = '',
  valueFormatter,
  yTickFormatter,
}) {
  const gradId = `areaGrad-${dataKey}`;
  const secGradId = secondaryKey ? `secGrad-${secondaryKey}` : null;

  return (
    <div style={{ width: '100%', height }} className="relative select-none">
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 12, right: 12, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={accentColor} stopOpacity={0.35} />
              <stop offset="95%" stopColor={accentColor} stopOpacity={0.0} />
            </linearGradient>
            {secGradId && (
              <linearGradient id={secGradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={secondaryColor} stopOpacity={0.25} />
                <stop offset="95%" stopColor={secondaryColor} stopOpacity={0.0} />
              </linearGradient>
            )}
          </defs>

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
            tickFormatter={yTickFormatter}
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
            cursor={{ stroke: 'var(--border-strong)', strokeWidth: 1, strokeDasharray: '4 4' }}
          />

          {secondaryKey && (
            <Area
              type="monotone"
              dataKey={secondaryKey}
              stroke={secondaryColor}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#${secGradId})`}
              isAnimationActive={true}
              animationDuration={1200}
              animationEasing="ease-out"
              activeDot={<CustomActiveDot stroke={secondaryColor} />}
            />
          )}

          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={accentColor}
            strokeWidth={2.5}
            fillOpacity={1}
            fill={`url(#${gradId})`}
            isAnimationActive={true}
            animationDuration={1400}
            animationEasing="ease-out"
            activeDot={<CustomActiveDot stroke={accentColor} />}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
});

export default AnimatedAreaChart;
