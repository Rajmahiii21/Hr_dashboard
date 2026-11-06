import React from 'react';
import { getInitials } from '../../utils/format';

export default function Avatar({
  name = '',
  src,
  size = 'md',
  color,
  className = '',
}) {
  const sizeClasses = {
    sm: 'w-6 h-6 text-[10px]',
    md: 'w-8 h-8 text-xs',
    lg: 'w-10 h-10 text-sm font-medium',
    xl: 'w-14 h-14 text-base font-semibold',
  }[size] || 'w-8 h-8 text-xs';

  if (src) {
    return (
      <img
        src={src}
        alt={name || 'User avatar'}
        className={`rounded-full object-cover border border-border flex-shrink-0 ${sizeClasses} ${className}`}
      />
    );
  }

  // Generate consistent background color based on name initials if not provided
  const bgStyle = color
    ? { backgroundColor: color, color: '#FFFFFF' }
    : { backgroundColor: 'var(--accent-soft)', color: 'var(--accent)' };

  return (
    <div
      style={bgStyle}
      className={`rounded-full flex items-center justify-center font-semibold border border-border flex-shrink-0 select-none ${sizeClasses} ${className}`}
    >
      {getInitials(name)}
    </div>
  );
}
