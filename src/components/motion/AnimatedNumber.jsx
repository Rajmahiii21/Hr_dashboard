import React, { useEffect, useState, useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { formatIndianNumber } from '../../utils/format';

/**
 * AnimatedNumber component with requestAnimationFrame and easeOutExpo curve
 * Formula: ease = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
 */
export default function AnimatedNumber({
  value = 0,
  prefix = '',
  suffix = '',
  decimals = 0,
  delay = 0,
  duration,
  className = '',
  isTime = false,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const shouldReduceMotion = useReducedMotion();

  // If time format e.g. "0h 0m" or "8h 30m"
  const isTimeString = typeof value === 'string' && value.includes('h') && value.includes('m');

  // Parse time if string
  const parseTime = (str) => {
    const match = str.match(/(\d+)h\s*(\d+)m/);
    if (match) {
      return { hours: parseInt(match[1], 10), mins: parseInt(match[2], 10) };
    }
    return { hours: 0, mins: 0 };
  };

  const numericTarget = typeof value === 'number' ? value : parseFloat(value) || 0;
  const timeTarget = isTimeString ? parseTime(value) : null;

  // Auto calculate duration scaled by magnitude if not explicitly provided
  const targetDuration = duration || (
    Math.abs(numericTarget) > 100000 ? 1800 :
    Math.abs(numericTarget) > 1000 ? 1600 :
    Math.abs(numericTarget) > 100 ? 1400 : 1100
  );

  const [currentVal, setCurrentVal] = useState(0);
  const [currentHours, setCurrentHours] = useState(0);
  const [currentMins, setCurrentMins] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) {
      setCurrentVal(numericTarget);
      if (timeTarget) {
        setCurrentHours(timeTarget.hours);
        setCurrentMins(timeTarget.mins);
      }
      return;
    }

    if (!isInView) return;

    let startTimestamp = null;
    let animId = null;
    let timeoutId = null;

    const startAnimation = () => {
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsed = timestamp - startTimestamp;
        const progress = Math.min(elapsed / targetDuration, 1);

        // easeOutExpo curve
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

        if (timeTarget) {
          setCurrentHours(Math.round(timeTarget.hours * ease));
          setCurrentMins(Math.round(timeTarget.mins * ease));
        } else {
          setCurrentVal(numericTarget * ease);
        }

        if (progress < 1) {
          animId = requestAnimationFrame(step);
        } else {
          setCurrentVal(numericTarget);
          if (timeTarget) {
            setCurrentHours(timeTarget.hours);
            setCurrentMins(timeTarget.mins);
          }
        }
      };

      animId = requestAnimationFrame(step);
    };

    if (delay > 0) {
      timeoutId = setTimeout(startAnimation, delay);
    } else {
      startAnimation();
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [numericTarget, isInView, delay, targetDuration, shouldReduceMotion, isTimeString, value]);

  if (isTimeString || isTime) {
    const hours = shouldReduceMotion && timeTarget ? timeTarget.hours : currentHours;
    const mins = shouldReduceMotion && timeTarget ? timeTarget.mins : currentMins;
    return (
      <span ref={ref} className={`tabular-nums font-mono ${className}`}>
        {prefix}{hours}h {mins}m{suffix}
      </span>
    );
  }

  const displayedVal = shouldReduceMotion ? numericTarget : currentVal;

  return (
    <span ref={ref} className={`tabular-nums font-mono ${className}`}>
      {prefix}
      {formatIndianNumber(displayedVal, decimals)}
      {suffix}
    </span>
  );
}
