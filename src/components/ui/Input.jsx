import React from 'react';
import { Search, X } from 'lucide-react';

export function Input({
  label,
  error,
  icon: Icon,
  clearable = false,
  onClear,
  value,
  onChange,
  className = '',
  id,
  ...props
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-medium text-muted mb-1.5">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3 text-muted pointer-events-none flex items-center">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={inputId}
          value={value}
          onChange={onChange}
          className={`w-full bg-surface-hover/80 border border-border rounded-xl text-text placeholder-muted text-xs sm:text-sm transition-all focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent ${
            Icon ? 'pl-9' : 'pl-3.5'
          } ${clearable && value ? 'pr-9' : 'pr-3.5'} py-2 ${className}`}
          {...props}
        />
        {clearable && value && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear input"
            className="absolute right-3 text-muted hover:text-text p-0.5 rounded-full"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
      {error && <p className="text-[11px] text-rose-500 mt-1">{error}</p>}
    </div>
  );
}

export function Select({
  label,
  options = [],
  value,
  onChange,
  className = '',
  id,
  ...props
}) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="block text-xs font-medium text-muted mb-1.5">
          {label}
        </label>
      )}
      <select
        id={selectId}
        value={value}
        onChange={onChange}
        className={`w-full bg-surface-hover/80 border border-border rounded-xl text-text text-xs sm:text-sm px-3.5 py-2 transition-all focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent ${className}`}
        {...props}
      >
        {options.map((opt) => {
          const val = typeof opt === 'object' ? opt.value : opt;
          const lbl = typeof opt === 'object' ? opt.label : opt;
          return (
            <option key={val} value={val} className="bg-surface-card text-text">
              {lbl}
            </option>
          );
        })}
      </select>
    </div>
  );
}
