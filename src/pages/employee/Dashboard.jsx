import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  CalendarCheck,
  CheckCircle2,
  Calendar,
  Gift,
  FileText,
  UserX,
  Award,
  Zap,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import Card from '../../components/ui/Card';
import StatCard from '../../components/ui/StatCard';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import AnimatedNumber from '../../components/motion/AnimatedNumber';
import Reveal from '../../components/motion/Reveal';
import AnimatedAreaChart from '../../components/charts/AnimatedAreaChart';
import AnimatedBarChart from '../../components/charts/AnimatedBarChart';
import AnimatedDonut from '../../components/charts/AnimatedDonut';
import RangeToggle from '../../components/charts/RangeToggle';
import {
  employeeAttendanceTrend,
  employeeWeeklyHours,
  sparklineData,
  upcomingHolidays,
} from '../../data/dashboard';
import { employeeLeaveBalances } from '../../data/leaves';
import { getGreeting } from '../../utils/format';

import { useRole } from '../../context/RoleContext';

export default function EmployeeDashboard() {
  const { user } = useRole();
  const [range, setRange] = useState('6M');
  const [whosOffDay, setWhosOffDay] = useState('Today');

  const mainChartData = employeeAttendanceTrend[range] || employeeAttendanceTrend['6M'];

  const leaveDonutData = [
    { name: 'Used', value: 0, color: '#4F46E5' },
    { name: 'Available', value: 1, color: 'rgba(255,255,255,0.1)' },
  ];

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-10">
      {/* 1. Greeting Line (Height ~40px) */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-wrap items-center justify-between gap-2 h-9"
      >
        <div className="flex items-center gap-2">
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-text">
            {getGreeting('Raj')}
          </h1>
          <span className="text-xs text-muted hidden sm:inline">
            Here is your overview this month.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="accent" size="sm" pulsing={true}>
            ON DUTY
          </Badge>
          <span className="text-xs text-muted tabular-nums hidden md:inline">
            Nov 06, 2026
          </span>
        </div>
      </motion.div>

      {/* 2. Chart Row (Main 8 cols, Secondary 4 cols, Height ~290-310px) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        {/* Main Chart (8 cols): Attendance Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.38, delay: 0.15 }}
          className="lg:col-span-8"
        >
          <Card className="p-3.5 sm:p-4 h-[300px] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Attendance Trend
                  </span>
                  <div className="flex items-center gap-1 text-sm font-bold text-text">
                    <AnimatedNumber value={3} suffix=" Days" delay={300} />
                    <span className="text-[11px] font-normal text-emerald-400 ml-1">
                      (0 days missed this month)
                    </span>
                  </div>
                </div>
              </div>
              <RangeToggle ranges={['7D', '1M', '6M']} activeRange={range} onChange={setRange} />
            </div>

            <div className="flex-1 w-full pt-1">
              <AnimatedAreaChart
                data={mainChartData}
                dataKey="days"
                secondaryKey="target"
                xKey="period"
                height={220}
                accentColor={user.accent}
                valueSuffix=" Days"
              />
            </div>
          </Card>
        </motion.div>

        {/* Secondary Chart (4 cols): Weekly Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.38, delay: 0.25 }}
          className="lg:col-span-4"
        >
          <Card className="p-3.5 sm:p-4 h-[300px] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted block">
                  Weekly Hours
                </span>
                <span className="text-xs font-bold text-text">
                  Mon - Sun Track
                </span>
              </div>
              <span className="text-xs font-mono font-semibold text-accent tabular-nums">
                38.5h total
              </span>
            </div>

            <div className="flex-1 w-full pt-1">
              <AnimatedBarChart
                data={employeeWeeklyHours}
                dataKey="hours"
                xKey="day"
                height={220}
                accentColor={user.accent}
                valueSuffix="h"
              />
            </div>
          </Card>
        </motion.div>
      </div>

      {/* 3. KPI Row: 3 Compact Cards with Sparklines (Height ~112px) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.35 }}
        >
          <StatCard
            title="Logged Today"
            value="0h 0m"
            isTime={true}
            badgeText="ON DUTY"
            pulsingBadge={true}
            subtitle="3 days present this month"
            icon={Clock}
            sparklineData={sparklineData.logged}
            delay={0.35}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.42 }}
        >
          <StatCard
            title="Total Attendance"
            value={3}
            suffix=" Days"
            subtitle="0 days missed this month"
            icon={CalendarCheck}
            sparklineData={sparklineData.attendance}
            sparklineColor="#059669"
            delay={0.42}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.49 }}
        >
          <StatCard
            title="Leave Available"
            value={0}
            suffix=" Days"
            subtitle="No pending requests"
            icon={CheckCircle2}
            sparklineData={sparklineData.leave}
            sparklineColor="#F59E0B"
            delay={0.49}
          />
        </motion.div>
      </div>

      {/* =========================================================================
          BELOW THE FOLD: Animate into view when scrolled
          ========================================================================= */}
      <div className="pt-6 border-t border-border/60 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Pending Approvals (badge "0 NEW") */}
          <Reveal className="lg:col-span-6">
            <Card className="p-4 h-full">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-text">Pending Approvals</h3>
                  <Badge variant="default" size="sm">
                    0 NEW
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-surface-hover/70 border border-border">
                  <span className="text-muted block text-[11px]">Leave Requests</span>
                  <span className="font-bold text-text">0 pending approval</span>
                </div>
                <div className="p-2.5 rounded-xl bg-surface-hover/70 border border-border">
                  <span className="text-muted block text-[11px]">Attendance</span>
                  <span className="font-bold text-text">0 pending regularizations</span>
                </div>
                <div className="p-2.5 rounded-xl bg-surface-hover/70 border border-border">
                  <span className="text-muted block text-[11px]">Reimbursements</span>
                  <span className="font-bold text-text">0 pending claims</span>
                </div>
                <div className="p-2.5 rounded-xl bg-surface-hover/70 border border-border">
                  <span className="text-muted block text-[11px]">Tax Declarations</span>
                  <span className="font-bold text-text">0 pending declarations</span>
                </div>
              </div>
            </Card>
          </Reveal>

          {/* Leave & Attendance Tiles with Donut */}
          <Reveal className="lg:col-span-6" delay={0.1}>
            <Card className="p-4 h-full flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-text">Leave & Attendance</h3>
                <span className="text-[11px] text-muted">FY 2026-27</span>
              </div>
              <div className="grid grid-cols-4 gap-2 mb-3 text-center">
                <div className="p-2 rounded-xl bg-surface-hover border border-border">
                  <span className="text-[10px] text-muted block uppercase">Available</span>
                  <span className="text-base font-bold text-text font-mono">0</span>
                </div>
                <div className="p-2 rounded-xl bg-surface-hover border border-border">
                  <span className="text-[10px] text-muted block uppercase">Allocated</span>
                  <span className="text-base font-bold text-text font-mono">0</span>
                </div>
                <div className="p-2 rounded-xl bg-surface-hover border border-border">
                  <span className="text-[10px] text-muted block uppercase">Used</span>
                  <span className="text-base font-bold text-text font-mono">0</span>
                </div>
                <div className="p-2 rounded-xl bg-surface-hover border border-border">
                  <span className="text-[10px] text-muted block uppercase">Pending</span>
                  <span className="text-base font-bold text-text font-mono">0</span>
                </div>
              </div>
              <div className="pt-2 border-t border-border flex items-center justify-between text-xs text-muted">
                <span>Leave Usage</span>
                <span className="font-semibold text-text">0% utilized</span>
              </div>
            </Card>
          </Reveal>
        </div>

        {/* Team Birthdays, Anniversaries, Who's Off & Public Documents */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Team Birthdays */}
          <Reveal delay={0.15}>
            <Card className="p-4 h-full">
              <div className="flex items-center gap-2 mb-3">
                <Gift className="w-4 h-4 text-accent" />
                <h3 className="text-xs font-semibold text-text uppercase tracking-wider">Team Birthdays</h3>
              </div>
              <div className="p-2.5 rounded-xl bg-surface-hover/80 border border-border flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent-soft text-accent flex items-center justify-center font-bold text-xs">
                  AM
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-text truncate">Aditi Maheshwari</div>
                  <div className="text-[10px] text-muted flex items-center justify-between">
                    <span>TECH-0065</span>
                    <span className="text-accent font-medium">Nov 9, in 4d</span>
                  </div>
                </div>
              </div>
            </Card>
          </Reveal>

          {/* Work Anniversaries */}
          <Reveal delay={0.2}>
            <Card className="p-4 h-full">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-semibold text-text uppercase tracking-wider">Work Anniversaries</h3>
              </div>
              <div className="p-2.5 rounded-xl bg-surface-hover/80 border border-border flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                  AM
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-text truncate">Aditi Maheshwari</div>
                  <div className="text-[10px] text-muted flex items-center justify-between">
                    <span>1 years</span>
                    <span className="text-emerald-400 font-medium">Nov 17, in 12d</span>
                  </div>
                </div>
              </div>
            </Card>
          </Reveal>

          {/* Who's Off */}
          <Reveal delay={0.25}>
            <Card className="p-4 h-full">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <UserX className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs font-semibold text-text uppercase tracking-wider">Who's Off</h3>
                </div>
                <div className="flex items-center gap-1 text-[10px] bg-surface-hover px-1.5 py-0.5 rounded-md border border-border">
                  <button
                    onClick={() => setWhosOffDay('Prev')}
                    className={`px-1 rounded ${whosOffDay === 'Prev' ? 'text-accent font-bold' : 'text-muted'}`}
                  >
                    Prev
                  </button>
                  <button
                    onClick={() => setWhosOffDay('Today')}
                    className={`px-1 rounded ${whosOffDay === 'Today' ? 'text-accent font-bold' : 'text-muted'}`}
                  >
                    Today
                  </button>
                  <button
                    onClick={() => setWhosOffDay('Next')}
                    className={`px-1 rounded ${whosOffDay === 'Next' ? 'text-accent font-bold' : 'text-muted'}`}
                  >
                    Next
                  </button>
                </div>
              </div>
              <div className="text-center py-4 text-muted text-xs">
                No one is off today
              </div>
            </Card>
          </Reveal>

          {/* Public Documents */}
          <Reveal delay={0.3}>
            <Card className="p-4 h-full">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-sky-400" />
                <h3 className="text-xs font-semibold text-text uppercase tracking-wider">Public Documents</h3>
              </div>
              <div className="text-center py-4 text-muted text-xs">
                No documents shared
              </div>
            </Card>
          </Reveal>
        </div>

        {/* Upcoming Holidays & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <Reveal className="lg:col-span-8" delay={0.35}>
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-accent" />
                <h3 className="text-xs font-semibold text-text uppercase tracking-wider">Upcoming Holidays</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {upcomingHolidays.slice(0, 2).map((holiday, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-surface-hover/70 border border-border flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-text block">{holiday.name}</span>
                      <span className="text-[11px] text-muted">{holiday.date} ({holiday.day})</span>
                    </div>
                    <Badge variant="outline" size="sm">{holiday.type}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>

          <Reveal className="lg:col-span-4" delay={0.4}>
            <Card className="p-4 flex flex-col justify-between">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-semibold text-text uppercase tracking-wider">Quick Actions</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="secondary" size="sm" className="w-full text-xs">Apply Leave</Button>
                <Button variant="secondary" size="sm" className="w-full text-xs">Regularize</Button>
                <Button variant="secondary" size="sm" className="w-full text-xs">Claim Expense</Button>
                <Button variant="secondary" size="sm" className="w-full text-xs">Tax Form</Button>
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
