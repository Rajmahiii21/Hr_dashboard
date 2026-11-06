import React, { useState } from 'react';
import { ReceiptIndianRupee, Plus, CheckCircle2, Clock, Check, FileText } from 'lucide-react';
import Card from '../components/ui/Card';
import StatCard from '../components/ui/StatCard';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Table from '../components/ui/Table';
import Modal from '../components/ui/Modal';
import { Input, Select } from '../components/ui/Input';
import AnimatedBarChart from '../components/charts/AnimatedBarChart';
import { useAppStore } from '../context/AppContext';
import { useRole } from '../context/RoleContext';
import { reimbursementCategoryChart } from '../data/reimbursements';
import { formatCurrency } from '../utils/format';

export default function Reimbursements() {
  const { isAdmin } = useRole();
  const { state, dispatch, addToast } = useAppStore();
  const claims = state.reimbursements;

  const [modalOpen, setModalOpen] = useState(false);
  const [claimTitle, setClaimTitle] = useState('');
  const [category, setCategory] = useState('Travel & Commute');
  const [amount, setAmount] = useState('');

  const chartData = reimbursementCategoryChart.map((c) => ({
    day: c.name,
    hours: c.amount / 1000,
  }));

  const handleApprove = (id, empName) => {
    dispatch({ type: 'APPROVE_REIMBURSEMENT', payload: id });
    addToast({
      title: 'Claim Approved',
      message: `Expense claim approved for ${empName}. Added to next payroll run.`,
      type: 'success',
    });
  };

  const handleCreateClaim = (e) => {
    e.preventDefault();
    addToast({
      title: 'Expense Claim Submitted',
      message: `Claim for ₹${amount || '1,500'} submitted for managerial approval.`,
      type: 'success',
    });
    setModalOpen(false);
  };

  const columns = [
    { header: 'Employee' },
    { header: 'Claim Title' },
    { header: 'Category' },
    { header: 'Claim Date' },
    { header: 'Amount' },
    { header: 'Receipt' },
    { header: 'Status' },
    { header: 'Action', align: 'right' },
  ];

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-text">Reimbursements & Claims</h1>
          <p className="text-xs text-muted">Expense claims, travel reimbursements and statutory allowances</p>
        </div>
        {!isAdmin && (
          <Button size="sm" icon={Plus} onClick={() => setModalOpen(true)}>
            + New Claim
          </Button>
        )}
      </div>

      {/* Compact Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <StatCard
          title="Pending Claims"
          value={claims.filter(c => c.status === 'Pending').length}
          badgeText={isAdmin ? '11 NEW' : '0 PENDING'}
          badgeVariant={isAdmin ? 'warning' : 'success'}
          subtitle={isAdmin ? 'Pending finance sign-off' : 'All claims settled'}
          icon={Clock}
          delay={0.1}
        />
        <StatCard
          title="Pending Value"
          value={53998}
          prefix="₹"
          subtitle="Net reimbursement liability"
          icon={ReceiptIndianRupee}
          delay={0.18}
        />
        <StatCard
          title="Auto-matched Bills"
          value={100}
          suffix="%"
          subtitle="OCR verified vouchers"
          icon={CheckCircle2}
          delay={0.25}
        />
      </div>

      {/* CHART directly under stats */}
      <Card className="p-3.5 h-[210px] flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-text uppercase tracking-wider">Claims by Category (₹ Thousands)</span>
          <span className="text-xs text-muted font-mono">Q3 FY 2026-27</span>
        </div>
        <AnimatedBarChart data={chartData} dataKey="hours" xKey="day" height={150} valuePrefix="₹" valueSuffix="k" />
      </Card>

      {/* Table */}
      <Table
        columns={columns}
        data={claims}
        renderRow={(claim) => (
          <>
            <td className="py-3 px-4">
              <div className="font-semibold text-text text-xs leading-tight">{claim.employeeName}</div>
              <div className="text-[10px] text-muted font-mono">{claim.employeeCode}</div>
            </td>
            <td className="py-3 px-4 font-medium text-text text-xs">{claim.title}</td>
            <td className="py-3 px-4 text-muted text-xs">{claim.category}</td>
            <td className="py-3 px-4 text-muted text-xs font-mono">{claim.claimDate}</td>
            <td className="py-3 px-4 font-mono font-bold text-text tabular-nums">{formatCurrency(claim.amount, 0)}</td>
            <td className="py-3 px-4">
              <span className="text-accent text-[11px] hover:underline cursor-pointer flex items-center gap-1 font-mono">
                <FileText className="w-3.5 h-3.5" /> PDF
              </span>
            </td>
            <td className="py-3 px-4">
              <Badge variant={claim.status === 'Approved' ? 'success' : 'warning'} size="sm">
                {claim.status}
              </Badge>
            </td>
            <td className="py-3 px-4 text-right">
              {claim.status === 'Pending' ? (
                <Button
                  size="sm"
                  variant="primary"
                  className="text-xs"
                  icon={Check}
                  onClick={() => handleApprove(claim.id, claim.employeeName)}
                >
                  Approve
                </Button>
              ) : (
                <span className="text-xs text-emerald-400 font-semibold">Approved ✓</span>
              )}
            </td>
          </>
        )}
      />

      {/* Submit Claim Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="File Reimbursement Claim" subtitle="Upload voucher and submit expense details">
        <form onSubmit={handleCreateClaim} className="space-y-3">
          <Input label="Expense Description" placeholder="e.g. Broadband wifi bill for October" value={claimTitle} onChange={(e) => setClaimTitle(e.target.value)} />
          <Select label="Expense Category" value={category} onChange={(e) => setCategory(e.target.value)} options={['Meals & Entertainment', 'Internet / Phone', 'Office Supplies', 'Certification & Courses', 'Travel & Commute', 'Hardware & Equipments']} />
          <Input label="Amount (₹)" type="number" placeholder="1500" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button size="sm" type="submit">Submit Claim</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
