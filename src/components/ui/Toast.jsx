import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useAppStore } from '../../context/AppContext';

export default function ToastContainer() {
  const { state, removeToast } = useAppStore();
  const toasts = state?.toasts || [];

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast, onDismiss }) {
  const shouldReduceMotion = useReducedMotion();
  const duration = 3000;
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (elapsed >= duration) {
        clearInterval(interval);
        onDismiss();
      }
    }, 20);

    return () => clearInterval(interval);
  }, [duration, onDismiss]);

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />,
    error: <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />,
    info: <Info className="w-4 h-4 text-sky-400 flex-shrink-0" />,
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 40, scale: 0.95 }}
      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0, scale: 1 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 20, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className="pointer-events-auto relative overflow-hidden glass-card border border-border-strong rounded-xl p-3.5 shadow-xl flex items-start gap-3"
    >
      {icons[toast.type || 'success']}
      <div className="flex-1 min-w-0 pr-2">
        <h4 className="text-xs font-semibold text-text truncate">{toast.title}</h4>
        {toast.message && (
          <p className="text-[11px] text-muted mt-0.5 leading-snug">{toast.message}</p>
        )}
      </div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="text-muted hover:text-text p-1 -mr-1 -mt-1 rounded-md"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      {/* Shrinking progress bar */}
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-75"
        style={{ width: `${progress}%` }}
      />
    </motion.div>
  );
}
