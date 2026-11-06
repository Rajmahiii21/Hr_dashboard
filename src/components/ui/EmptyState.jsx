import React from 'react';
import { Inbox } from 'lucide-react';
import Button from './Button';

export default function EmptyState({
  icon: Icon = Inbox,
  title = 'No records found',
  description,
  actionLabel,
  onAction,
  className = '',
}) {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 glass-card rounded-2xl border border-dashed border-border ${className}`}>
      <div className="w-12 h-12 rounded-2xl bg-surface-hover flex items-center justify-center text-muted mb-3 border border-border">
        <Icon className="w-6 h-6 text-muted" />
      </div>
      <h3 className="text-sm font-semibold text-text mb-1">{title}</h3>
      {description && <p className="text-xs text-muted max-w-sm mb-4">{description}</p>}
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export function Skeleton({ className = '' }) {
  return (
    <div className={`animate-pulse bg-surface-hover/80 rounded-xl ${className}`} />
  );
}

export function Stepper({ steps = [], currentStep = 0, onStepClick }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        {/* Continuous progress track */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-0.5 bg-border z-0" />
        <div
          className="absolute top-1/2 left-0 -translate-y-1/2 h-0.5 bg-accent z-0 transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, idx) => {
          const isCompleted = idx < currentStep;
          const isCurrent = idx === currentStep;
          return (
            <div
              key={idx}
              onClick={() => onStepClick && onStepClick(idx)}
              className={`relative z-10 flex flex-col items-center cursor-pointer group`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-accent text-white shadow-glow'
                    : isCurrent
                    ? 'bg-surface-card border-2 border-accent text-accent shadow-md scale-110'
                    : 'bg-surface border border-border text-muted'
                }`}
              >
                {isCompleted ? '✓' : idx + 1}
              </div>
              <span
                className={`text-[11px] font-medium mt-1.5 transition-colors ${
                  isCurrent ? 'text-accent font-semibold' : isCompleted ? 'text-text' : 'text-muted'
                }`}
              >
                {step.label || step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
