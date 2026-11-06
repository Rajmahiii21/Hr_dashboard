import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  CalendarCheck,
  CheckCircle2,
  AlertCircle,
  Gift,
  FileText,
  TrendingUp,
  Users,
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
  adminPayrollCostTrend,
  adminDepartmentDistribution,
  adminAttendanceToday,
  adminHeadcountGrowth,
  sparklineData,
} from '../../data/dashboard';
import { getGreeting } from '../../utils/format';

export default function AdminDashboard() {
  const [range, setRange] = useState('6M');

  const mainChartData = adminPayrollCostTrend[range] || adminPayrollCostTrend['6M'];

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
            {getGreeting('Admin')}
          </h1>
          <span className="text-xs text-muted hidden sm:inline">
            Organization executive summary and workforce analytics.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success" size="sm" pulsing={true}>
            SYSTEM OPERATIONAL
          </Badge>
          <span className="text-xs text-muted tabular-nums hidden md:inline">
            FY 2026-27
          </span>
        </div>
      </motion.div>

      {/* 2. Chart Row (Main 8 cols, Secondary 4 cols, Height ~290-310px) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        {/* Main Chart (8 cols): Payroll Cost - last 6 months */}
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
                    Payroll Cost
                  </span>
                  <div className="flex items-center gap-1 text-sm font-bold text-text">
                    <AnimatedNumber value={48.9} prefix="₹" suffix=" L" decimals={1} delay={300} />
                    <span className="text-[11px] font-normal text-emerald-400 ml-1">
                      (+6.2% vs budget)
                    </span>
                  </div>
                </div>
              </div>
              <RangeToggle ranges={['7D', '1M', '6M']} activeRange={range} onChange={setRange} />
            </div>

            <div className="flex-1 w-full pt-1">
              <AnimatedAreaChart
                data={mainChartData}
                dataKey="cost"
                secondaryKey="budget"
                xKey="period"
                height={220}
                valuePrefix="₹"
                valueSuffix=" Lakhs"
                accentColor="#059669"
              />
            </div>
          </Card>
        </motion.div>

        {/* Secondary Chart (4 cols): Department Distribution */}
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
                  Department Distribution
                </span>
                <span className="text-xs font-bold text-text">
                  Workforce Allocation
                </span>
              </div>
              <span className="text-xs font-mono font-semibold text-emerald-400 tabular-nums">
                108 total
              </span>
            </div>

            <div className="flex-1 w-full pt-1">
              <AnimatedBarChart
                data={adminDepartmentDistribution}
                dataKey="count"
                xKey="department"
                height={220}
                accentColor="#059669"
                valueSuffix=" Emps"
              />
            </div>
          </Card>
        </motion.div>
      </div>

      {/* 3. KPI Row: 4 Compact Cards with Sparklines (Height ~112px) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
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
            subtitle="Office check-in in progress"
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
            value={30}
            suffix=" Days"
            subtitle="0 days missed"
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
            value={247}
            suffix=" Days"
            subtitle="3 pending leave requests"
            icon={CheckCircle2}
            sparklineData={sparklineData.leave}
            sparklineColor="#F59E0B"
            delay={0.49}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.56 }}
        >
          <StatCard
            title="Pending Approvals"
            value={15}
            badgeText="15 NEW"
            badgeVariant="warning"
            subtitle="Action required across teams"
            icon={AlertCircle}
            sparklineData={sparklineData.approvals}
            sparklineColor="#EF4444"
            delay={0.56}
          />
        </motion.div>
      </div>

      {/* =========================================================================
          BELOW THE FOLD: Animate into view when scrolled
          ========================================================================= */}
      <div className="pt-6 border-t border-border/60 space-y-4">
        {/* Pending Approvals List & Attendance Today Donut */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <Reveal className="lg:col-span-6">
            <Card className="p-4 h-full">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-text">Pending Approvals Queue</h3>
                  <Badge variant="warning" size="sm">
                    15 Total
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-surface-hover/70 border border-border">
                  <span className="text-muted block text-[11px]">Leave Requests</span>
                  <span className="font-bold text-text text-sm">0 pending approval</span>
                </div>
                <div className="p-3 rounded-xl bg-surface-hover/70 border border-border">
                  <span className="text-muted block text-[11px]">Attendance Regularizations</span>
                  <span className="font-bold text-amber-400 text-sm">3 pending</span>
                </div>
                <div className="p-3 rounded-xl bg-surface-hover/70 border border-border">
                  <span className="text-muted block text-[11px]">Reimbursements</span>
                  <span className="font-bold text-rose-400 text-sm">11 pending claims</span>
                </div>
                <div className="p-3 rounded-xl bg-surface-hover/70 border border-border">
                  <span className="text-muted block text-[11px]">Tax Declarations</span>
                  <span className="font-bold text-sky-400 text-sm">1 pending</span>
                </div>
              </div>
            </Card>
          </Reveal>

          {/* Attendance Today Donut */}
          <Reveal className="lg:col-span-6" delay={0.1}>
            <Card className="p-4 h-full">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-text">Attendance Today</h3>
                <span className="text-[11px] text-muted">108 Personnel</span>
              </div>
              <AnimatedDonut
                data={adminAttendanceToday}
                totalLabel="Employees"
                centerValue={108}
                height={160}
              />
            </Card>
          </Reveal>
        </div>

        {/* Headcount Growth & Team Birthdays & Public Documents */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Headcount Growth Chart (7 cols) */}
          <Reveal className="lg:col-span-7" delay={0.15}>
            <Card className="p-4 h-full flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-sm font-semibold text-text">Headcount Growth</h3>
                  <p className="text-xs text-muted">Active personnel progression (Jun - Nov 2026)</p>
                </div>
                <span className="text-sm font-bold text-emerald-400 font-mono">108 Active</span>
              </div>
              <div className="pt-2">
                <AnimatedAreaChart
                  data={adminHeadcountGrowth}
                  dataKey="count"
                  xKey="month"
                  height={180}
                  accentColor="#059669"
                  valueSuffix=" Employees"
                />
              </div>
            </Card>
          </Reveal>

          {/* Team Birthdays & Public Documents (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Reveal delay={0.2}>
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Gift className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-xs font-semibold text-text uppercase tracking-wider">
                    Upcoming Team Birthdays
                  </h3>
                </div>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-surface-hover/80 border border-border flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">
                        SK
                      </div>
                      <div>
                        <div className="font-semibold text-text">Sara Khan</div>
                        <div className="text-[10px] text-muted">DEMO-0008</div>
                      </div>
                    </div>
                    <Badge variant="accent" size="sm">Nov 7, in 2d</Badge>
                  </div>

                  <div className="p-2.5 rounded-xl bg-surface-hover/80 border border-border flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">
                        DJ
                      </div>
                      <div>
                        <div className="font-semibold text-text">Diya Joshi</div>
                        <div className="text-[10px] text-muted">DEMO-0006</div>
                      </div>
                    </div>
                    <Badge variant="outline" size="sm">Nov 10, in 5d</Badge>
                  </div>
                </div>
              </Card>
            </Reveal>

            <Reveal delay={0.25}>
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-sky-400" />
                  <h3 className="text-xs font-semibold text-text uppercase tracking-wider">
                    Public Documents
                  </h3>
                </div>
                <div className="p-2.5 rounded-xl bg-surface-hover/80 border border-border flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-[10px]">
                      PDF
                    </div>
                    <div>
                      <div className="font-semibold text-text">Full stack</div>
                      <div className="text-[10px] text-muted">Architecture & Onboarding Kit 2026</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs">Download</Button>
                </div>
              </Card>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
