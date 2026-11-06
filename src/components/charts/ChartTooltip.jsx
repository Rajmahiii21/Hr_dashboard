import React from 'react';
import { formatIndianNumber } from '../../utils/format';

export default function ChartTooltip({
  active,
  payload,
  label,
  formatter,
  prefix = '',
  suffix = '',
}) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="glass-panel border border-border-strong rounded-xl px-3.5 py-2.5 shadow-xl text-xs backdrop-blur-md">
      {label && <p className="font-semibold text-text mb-1">{label}</p>}
      <div className="space-y-1">
        {payload.map((entry, index) => {
          const val = entry.value;
          const formatted = formatter
            ? formatter(val)
            : `${prefix}${formatIndianNumber(val)}${suffix}`;

          return (
            <div key={index} className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: entry.color || entry.stroke || 'var(--accent)' }}
              />
              <span className="text-muted text-[11px] capitalize">{entry.name || 'Value'}:</span>
              <span className="font-mono font-semibold text-text tabular-nums">{formatted}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
