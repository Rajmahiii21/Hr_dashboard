import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function Table({
  columns = [],
  data = [],
  renderRow,
  keyField = 'id',
  emptyMessage = 'No records found',
  className = '',
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`w-full overflow-x-auto rounded-xl border border-border glass-card ${className}`}>
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-border bg-surface-hover/50 text-muted font-medium uppercase tracking-wider text-[11px]">
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={`py-3 px-4 ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'} ${col.className || ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-8 text-muted text-sm">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, index) => {
              const rowKey = row[keyField] || index;
              const delay = index < 12 ? index * 0.03 : 0;

              if (shouldReduceMotion) {
                return (
                  <tr
                    key={rowKey}
                    className="hover:bg-accent-soft/50 transition-colors group"
                  >
                    {renderRow(row, index)}
                  </tr>
                );
              }

              return (
                <motion.tr
                  key={rowKey}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay, ease: [0.16, 1, 0.3, 1] }}
                  className="hover:bg-accent-soft/40 transition-colors group cursor-default"
                >
                  {renderRow(row, index)}
                </motion.tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
