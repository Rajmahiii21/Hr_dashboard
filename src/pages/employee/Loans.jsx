import React, { useState } from 'react';
import { Coins, Plus, CheckCircle2, Clock, Landmark } from 'lucide-react';
import Card from '../../components/ui/Card';
import StatCard from '../../components/ui/StatCard';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import Modal from '../../components/ui/Modal';
import { Input, Select } from '../../components/ui/Input';
import AnimatedBarChart from '../../components/charts/AnimatedBarChart';
import { useAppStore } from '../../context/AppContext';
import { loansList } from '../../data/loans';
import { formatCurrency } from '../../utils/format';

export default function Loans() {
  const { addToast } = useAppStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [loanType, setLoanType] = useState('Personal Appliance Loan');
  const [amount, setAmount] = useState('');
  const [tenure, setTenure] = useState('6');

  const chartData = [
    { day: 'Principal', hours: 85 },
    { day: 'Repaid', hours: 75, color: '#059669' },
    { day: 'Outstanding', hours: 10, color: '#F59E0B' },
  ];

  const handleApply = (e) => {
    e.preventDefault();
    addToast({
      title: 'Loan Application Submitted',
      message: `Request for ₹${amount || '25,000'} submitted for HR approval.`,
      type: 'success',
    });
    setModalOpen(false);
  };

  const columns = [
    { header: 'Loan Particulars' },
    { header: 'Tenure' },
    { header: 'Monthly EMI' },
    { header: 'Principal' },
    { header: 'Repaid' },
    { header: 'Outstanding' },
    { header: 'Status' },
  ];

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-text">Loans & Advances</h1>
          <p className="text-xs text-muted">Corporate emergency loans, appliance advances and salary deductions</p>
        </div>
        <Button size="sm" icon={Plus} onClick={() => setModalOpen(true)}>
          Apply for Loan
        </Button>
      </div>

      {/* Compact Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <StatCard
          title="Total Sanctioned"
          value={85000}
          prefix="₹"
          subtitle="Lifetime approved loan limits"
          icon={Landmark}
          delay={0.1}
        />
        <StatCard
          title="Repaid to Date"
          value={75000}
          prefix="₹"
          badgeText="88% Cleared"
          badgeVariant="success"
          subtitle="Deducted via payroll runs"
          icon={CheckCircle2}
          delay={0.18}
        />
        <StatCard
          title="Current Outstanding"
          value={10000}
          prefix="₹"
          subtitle="2 remaining EMI cycles"
          icon={Clock}
          delay={0.25}
        />
      </div>

      {/* CHART directly below stats */}
      <Card className="p-3.5 h-[210px] flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-text uppercase tracking-wider">Loan Repayment Progress (₹ Thousands)</span>
          <span className="text-xs text-muted font-mono">FY 2026-27</span>
        </div>
        <AnimatedBarChart data={chartData} dataKey="hours" xKey="day" height={150} valuePrefix="₹" valueSuffix="k" />
      </Card>

      {/* Table */}
      <Table
        columns={columns}
        data={loansList}
        renderRow={(ln) => (
          <>
            <td className="py-3 px-4">
              <div className="font-semibold text-text text-xs">{ln.type}</div>
              <div className="text-[10px] text-muted">{ln.startDate} - {ln.endDate}</div>
            </td>
            <td className="py-3 px-4 text-muted text-xs font-mono">{ln.tenureMonths} Months</td>
            <td className="py-3 px-4 font-mono font-medium text-text tabular-nums">{formatCurrency(ln.emi, 0)}</td>
            <td className="py-3 px-4 font-mono font-bold text-text tabular-nums">{formatCurrency(ln.principal, 0)}</td>
            <td className="py-3 px-4 font-mono font-semibold text-emerald-400 tabular-nums">{formatCurrency(ln.paidAmount, 0)}</td>
            <td className="py-3 px-4 font-mono font-bold text-amber-400 tabular-nums">{formatCurrency(ln.outstanding, 0)}</td>
            <td className="py-3 px-4">
              <Badge variant={ln.status === 'Active' ? 'warning' : 'success'} size="sm">
                {ln.status}
              </Badge>
            </td>
          </>
        )}
      />

      {/* Apply Loan Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Apply for Corporate Loan" subtitle="Zero-interest EMI advance program for employees">
        <form onSubmit={handleApply} className="space-y-3">
          <Select label="Loan Facility" value={loanType} onChange={(e) => setLoanType(e.target.value)} options={['Personal Appliance Loan', 'Festival Advance', 'Medical Emergency Loan', 'Education Upskilling Advance']} />
          <Input label="Required Amount (₹)" type="number" placeholder="25000" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <Select label="Repayment Tenure" value={tenure} onChange={(e) => setTenure(e.target.value)} options={['3 Months', '6 Months', '12 Months']} />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button size="sm" type="submit">Submit Application</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
