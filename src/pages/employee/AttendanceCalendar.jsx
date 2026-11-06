import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import Card from '../../components/ui/Card';
import StatCard from '../../components/ui/StatCard';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import AnimatedBarChart from '../../components/charts/AnimatedBarChart';
import { calendarDaysNovember, attendanceMonthlyStats } from '../../data/attendance';

export default function AttendanceCalendar() {
  const [activeHoverDay, setActiveHoverDay] = useState(null);

  const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Status colors & classes
  const getDayStatusClass = (status) => {
    switch (status) {
      case 'present':
        return 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25';
      case 'holiday':
        return 'bg-amber-500/15 border-amber-500/30 text-amber-400 hover:bg-amber-500/25';
      case 'weekend':
        return 'bg-surface-hover/40 border-border text-muted/60';
      default:
        return 'bg-surface-hover/80 border-border text-muted hover:border-accent';
    }
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-text">Attendance Calendar</h1>
          <p className="text-xs text-muted">Daily shift logs, biometric punches and regularization history</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="accent" size="sm">November 2026</Badge>
        </div>
      </div>

      {/* Compact Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <StatCard
          title="Present Days"
          value={attendanceMonthlyStats.presentDays}
          suffix=" Days"
          subtitle="3 days logged this month"
          icon={CheckCircle2}
          delay={0.1}
        />
        <StatCard
          title="Avg Daily Hours"
          value={attendanceMonthlyStats.avgHoursPerDay}
          suffix="h"
          decimals={1}
          subtitle="Target 8.0h / day"
          icon={Clock}
          delay={0.18}
        />
        <StatCard
          title="Gazetted Holidays"
          value={attendanceMonthlyStats.holidays}
          suffix=" Day"
          subtitle="Guru Nanak Jayanti (15 Nov)"
          icon={Calendar}
          delay={0.25}
        />
        <StatCard
          title="Absent Days"
          value={attendanceMonthlyStats.absentDays}
          suffix=" Days"
          badgeText="100% On Track"
          badgeVariant="success"
          subtitle="Zero unexcused leaves"
          icon={CheckCircle2}
          delay={0.32}
        />
      </div>

      {/* Month Calendar Grid with Diagonal Stagger */}
      <Card className="p-4 sm:p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-text">November 2026</h2>
            <span className="text-xs text-muted">(30 Days)</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-muted">Present</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="text-muted">Holiday</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-muted/40" />
              <span className="text-muted">Weekend</span>
            </div>
          </div>
        </div>

        {/* 7-column Calendar Header */}
        <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-semibold uppercase tracking-wider text-muted">
          {dayHeaders.map((dh, i) => (
            <div key={i} className="py-1">
              {dh}
            </div>
          ))}
        </div>

        {/* 30 Day Cells with Diagonal Stagger */}
        <div className="grid grid-cols-7 gap-2 relative">
          {calendarDaysNovember.map((cell, idx) => {
            const col = idx % 7;
            const row = Math.floor(idx / 7);
            const diagonalDelay = (col + row) * 0.025;

            return (
              <motion.div
                key={cell.day}
                initial={{ opacity: 0, scale: 0.85, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.3, delay: diagonalDelay, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setActiveHoverDay(cell)}
                onMouseLeave={() => setActiveHoverDay(null)}
                className={`relative min-h-[72px] sm:min-h-[84px] p-2 rounded-xl border flex flex-col justify-between transition-all cursor-pointer ${getDayStatusClass(
                  cell.status
                )}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono">{cell.day}</span>
                  {cell.status === 'present' && (
                    <span className="text-[10px] font-mono font-semibold text-emerald-400">
                      {cell.hours}h
                    </span>
                  )}
                  {cell.status === 'holiday' && (
                    <span className="text-[9px] font-semibold text-amber-400 truncate max-w-[48px]">
                      Holiday
                    </span>
                  )}
                </div>

                <div className="text-[10px] truncate text-muted">
                  {cell.status === 'present' ? `${cell.checkIn}` : cell.status === 'holiday' ? 'Off' : ''}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Hover Tooltip / Detail Bar */}
        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-muted">
          {activeHoverDay ? (
            <div className="flex items-center gap-4">
              <span className="font-semibold text-text">
                {activeHoverDay.date} ({activeHoverDay.dayName}):
              </span>
              <span>Status: <span className="font-semibold capitalize text-text">{activeHoverDay.status}</span></span>
              <span>In: <span className="font-mono text-text">{activeHoverDay.checkIn}</span></span>
              <span>Out: <span className="font-mono text-text">{activeHoverDay.checkOut}</span></span>
              {activeHoverDay.hours > 0 && (
                <span>Duration: <span className="font-mono font-bold text-accent">{activeHoverDay.hours} hrs</span></span>
              )}
            </div>
          ) : (
            <span>Hover over any calendar cell to view biometric punch timestamps and shift logs.</span>
          )}
        </div>
      </Card>
    </div>
  );
}
