import React, { useState } from 'react';
import { Download, Receipt, IndianRupee, FileText, CheckCircle2, Printer } from 'lucide-react';
import Card from '../../components/ui/Card';
import StatCard from '../../components/ui/StatCard';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import AnimatedBarChart from '../../components/charts/AnimatedBarChart';
import { useAppStore } from '../../context/AppContext';
import { payslipsList } from '../../data/payslips';
import { formatCurrency } from '../../utils/format';

export default function Payslips() {
  const { addToast } = useAppStore();
  const [selectedPayslipId, setSelectedPayslipId] = useState(payslipsList[0].id);

  const activeSlip = payslipsList.find((p) => p.id === selectedPayslipId) || payslipsList[0];

  const chartData = [
    { day: 'Basic', hours: activeSlip.breakdown.earnings[0].amount / 1000 },
    { day: 'HRA', hours: activeSlip.breakdown.earnings[1].amount / 1000 },
    { day: 'Special', hours: activeSlip.breakdown.earnings[2].amount / 1000 },
    { day: 'Bonus', hours: activeSlip.breakdown.earnings[3].amount / 1000 },
    { day: 'Deductions', hours: activeSlip.totalDeductions / 1000, color: '#EF4444' },
  ];

  const handleDownload = () => {
    addToast({
      title: 'Downloading Payslip',
      message: `Payslip for ${activeSlip.month} downloaded as PDF.`,
      type: 'success',
    });
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-text">Payslips & Salary Slips</h1>
          <p className="text-xs text-muted">View monthly compensation statements, tax withholdings and deductions</p>
        </div>
        <Button size="sm" icon={Download} onClick={handleDownload}>
          Download Latest Payslip (PDF)
        </Button>
      </div>

      {/* Compact Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <StatCard
          title="Last Net Salary"
          value={activeSlip.netSalary}
          prefix="₹"
          badgeText="Credited"
          badgeVariant="success"
          subtitle={activeSlip.date}
          icon={IndianRupee}
          delay={0.1}
        />
        <StatCard
          title="Gross Earnings"
          value={activeSlip.grossEarnings}
          prefix="₹"
          subtitle="Fixed CTC base"
          icon={Receipt}
          delay={0.18}
        />
        <StatCard
          title="Total Deductions"
          value={activeSlip.totalDeductions}
          prefix="₹"
          subtitle="EPF + Professional Tax + TDS"
          icon={FileText}
          delay={0.25}
        />
        <StatCard
          title="Paid Days"
          value={activeSlip.daysPaid}
          suffix=" Days"
          badgeText="Full Month"
          badgeVariant="accent"
          subtitle="Zero loss of pay"
          icon={CheckCircle2}
          delay={0.32}
        />
      </div>

      {/* Main Two-Column Layout: Month list on left, Detail statement & Chart on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Month List (4 cols) */}
        <div className="lg:col-span-4 space-y-2.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted block mb-1">
            Available Statements ({payslipsList.length})
          </span>
          {payslipsList.map((slip) => {
            const isSelected = slip.id === selectedPayslipId;
            return (
              <div
                key={slip.id}
                onClick={() => setSelectedPayslipId(slip.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-accent bg-accent-soft/30 shadow-md'
                    : 'border-border glass-card hover:bg-surface-hover'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-text">{slip.month}</span>
                  <Badge variant="success" size="sm">{slip.status}</Badge>
                </div>
                <div className="flex items-center justify-between text-xs mt-2">
                  <span className="text-muted">{slip.date}</span>
                  <span className="font-mono font-bold text-accent tabular-nums">
                    {formatCurrency(slip.netSalary)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Statement & Chart (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <Card className="p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
              <div>
                <span className="text-xs text-muted block">Salary Statement</span>
                <h2 className="text-lg font-bold text-text">{activeSlip.month}</h2>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" icon={Printer} onClick={handleDownload}>
                  Print
                </Button>
                <Button size="sm" icon={Download} onClick={handleDownload}>
                  Download
                </Button>
              </div>
            </div>

            {/* Earnings & Deductions Breakdown Tables */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-4">
              <div>
                <h4 className="text-xs font-semibold text-text uppercase tracking-wider mb-2">Earnings</h4>
                <div className="space-y-1.5 text-xs">
                  {activeSlip.breakdown.earnings.map((e, idx) => (
                    <div key={idx} className="flex justify-between py-1 border-b border-border/40">
                      <span className="text-muted">{e.name}</span>
                      <span className="font-mono font-medium text-text tabular-nums">{formatCurrency(e.amount)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between py-1.5 font-bold text-text pt-2">
                    <span>Gross Earnings</span>
                    <span className="font-mono text-emerald-400 tabular-nums">{formatCurrency(activeSlip.grossEarnings)}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-text uppercase tracking-wider mb-2">Deductions</h4>
                <div className="space-y-1.5 text-xs">
                  {activeSlip.breakdown.deductions.map((d, idx) => (
                    <div key={idx} className="flex justify-between py-1 border-b border-border/40">
                      <span className="text-muted">{d.name}</span>
                      <span className="font-mono font-medium text-text tabular-nums">{formatCurrency(d.amount)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between py-1.5 font-bold text-text pt-2">
                    <span>Total Deductions</span>
                    <span className="font-mono text-rose-400 tabular-nums">{formatCurrency(activeSlip.totalDeductions)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Net Salary summary strip */}
            <div className="p-3.5 rounded-xl bg-accent-soft/50 border border-accent/25 flex items-center justify-between text-xs">
              <span className="font-semibold text-text">Net Take-Home Salary:</span>
              <span className="text-lg font-bold font-mono text-accent tabular-nums">
                {formatCurrency(activeSlip.netSalary)}
              </span>
            </div>
          </Card>

          {/* Earnings / Deductions Bar Chart */}
          <Card className="p-4 h-[220px] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-text uppercase tracking-wider">Salary Components Breakdown (₹ Thousands)</span>
              <span className="text-xs text-muted font-mono">{activeSlip.month}</span>
            </div>
            <AnimatedBarChart data={chartData} dataKey="hours" xKey="day" height={160} valuePrefix="₹" valueSuffix="k" />
          </Card>
        </div>
      </div>
    </div>
  );
}
