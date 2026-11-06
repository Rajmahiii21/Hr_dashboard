import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, CheckCircle2, IndianRupee, Clock, RotateCcw, FileText } from 'lucide-react';
import Card from '../../components/ui/Card';
import StatCard from '../../components/ui/StatCard';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import { Select } from '../../components/ui/Input';
import AnimatedBarChart from '../../components/charts/AnimatedBarChart';
import AnimatedAreaChart from '../../components/charts/AnimatedAreaChart';
import { useAppStore } from '../../context/AppContext';
import { payrollChartData } from '../../data/payroll';
import { formatCurrency } from '../../utils/format';

export default function PayrollRuns() {
  const navigate = useNavigate();
  const { state } = useAppStore();
  const runs = state.payrollRuns;

  const [statusFilter, setStatusFilter] = useState('All');
  const [fyFilter, setFyFilter] = useState('FY 2026-27');

  const filteredRuns = runs.filter((r) => {
    if (statusFilter !== 'All' && r.status !== statusFilter) return false;
    if (fyFilter !== 'All' && r.fy !== fyFilter) return false;
    return true;
  });

  const columns = [
    { header: 'Title & Period' },
    { header: 'Status' },
    { header: 'Employees' },
    { header: 'Net Pay' },
    { header: 'Processed By' },
    { header: 'Action', align: 'right' },
  ];

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-text">Payroll Runs</h1>
          <p className="text-xs text-muted">Manage and process employee payroll runs</p>
        </div>
        <Button size="sm" icon={Plus} onClick={() => navigate('/payroll/new')}>
          + New Payroll Run
        </Button>
      </div>

      {/* Stat Cards: Total Runs 8, Completed 7, Total Amount ₹240.38 Cr, In Progress 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <StatCard
          title="Total Runs"
          value={8}
          subtitle="FY 2026-27"
          icon={FileText}
          delay={0.1}
        />
        <StatCard
          title="Completed"
          value={7}
          badgeText="Processed"
          badgeVariant="success"
          subtitle="Successfully processed"
          icon={CheckCircle2}
          delay={0.18}
        />
        <StatCard
          title="Total Amount"
          value={240.38}
          prefix="₹"
          suffix=" Cr"
          decimals={2}
          subtitle="Net pay processed"
          icon={IndianRupee}
          delay={0.25}
        />
        <StatCard
          title="In Progress"
          value={1}
          badgeText="Active"
          badgeVariant="warning"
          subtitle="Active payroll runs"
          icon={Clock}
          delay={0.32}
        />
      </div>

      {/* CHART directly under the stat cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        <Card className="lg:col-span-6 p-3.5 h-[240px] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-text uppercase tracking-wider">Net Pay by Month (₹ Lakhs)</span>
            <span className="text-xs text-muted font-mono">FY 2026-27</span>
          </div>
          <AnimatedBarChart
            data={payrollChartData}
            dataKey="netPayLakhs"
            xKey="month"
            height={180}
            accentColor="#059669"
            valuePrefix="₹"
            valueSuffix=" L"
          />
        </Card>

        <Card className="lg:col-span-6 p-3.5 h-[240px] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-text uppercase tracking-wider">Employees Processed</span>
            <span className="text-xs text-muted font-mono">Volume Trend</span>
          </div>
          <AnimatedAreaChart
            data={payrollChartData}
            dataKey="employees"
            xKey="month"
            height={180}
            accentColor="#059669"
            valueSuffix=" Emps"
          />
        </Card>
      </div>

      {/* Filter toolbar */}
      <Card className="p-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="w-48">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={['All', 'Completed', 'Attendance Calculated', 'Draft']}
            />
          </div>
          <div className="w-44">
            <Select
              value={fyFilter}
              onChange={(e) => setFyFilter(e.target.value)}
              options={['All', 'FY 2026-27', 'FY 2025-26']}
            />
          </div>
          <Button
            variant="secondary"
            size="sm"
            icon={RotateCcw}
            onClick={() => {
              setStatusFilter('All');
              setFyFilter('FY 2026-27');
            }}
          >
            Clear Filters
          </Button>
        </div>
      </Card>

      {/* Table */}
      <Table
        columns={columns}
        data={filteredRuns}
        renderRow={(run) => (
          <>
            <td className="py-3 px-4">
              <div className="font-semibold text-text text-xs leading-tight">{run.title}</div>
              <div className="text-[11px] text-muted font-mono">{run.period}</div>
            </td>
            <td className="py-3 px-4">
              <Badge
                variant={run.status === 'Completed' ? 'success' : run.statusColor === 'amber' ? 'warning' : 'default'}
                size="sm"
              >
                {run.status}
              </Badge>
            </td>
            <td className="py-3 px-4 font-mono font-medium text-text">{run.employees}</td>
            <td className="py-3 px-4 font-mono font-semibold text-text tabular-nums">
              {formatCurrency(run.netPay)}
            </td>
            <td className="py-3 px-4 text-muted text-xs">{run.processedBy}</td>
            <td className="py-3 px-4 text-right">
              <Button variant="ghost" size="sm" className="text-xs">
                View Run
              </Button>
            </td>
          </>
        )}
      />
    </div>
  );
}
