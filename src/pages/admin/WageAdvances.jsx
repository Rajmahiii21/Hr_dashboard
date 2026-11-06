import React, { useState } from 'react';
import { Plus, Coins, Clock, CheckCircle2, MoreVertical } from 'lucide-react';
import Card from '../../components/ui/Card';
import StatCard from '../../components/ui/StatCard';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import Modal from '../../components/ui/Modal';
import { Input, Select } from '../../components/ui/Input';
import AnimatedBarChart from '../../components/charts/AnimatedBarChart';
import { useAppStore } from '../../context/AppContext';
import { advancesChartData } from '../../data/advances';
import { formatCurrency } from '../../utils/format';

export default function WageAdvances() {
  const { state, dispatch, addToast } = useAppStore();
  const advances = state.wageAdvances;

  const [modalOpen, setModalOpen] = useState(false);
  const [empName, setEmpName] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');

  const handleIssueAdvance = (e) => {
    e.preventDefault();
    const amt = Number(amount) || 2000;
    const newAdv = {
      id: `wa-${Date.now()}`,
      employeeName: empName || 'New Employee',
      employeeCode: 'DEMO-1020',
      dateIssued: '06/11/2026',
      amount: amt,
      recovered: 0,
      outstanding: amt,
      reason: reason || 'Personal emergency assistance',
      status: 'Pending',
      month: 'Nov',
    };
    dispatch({ type: 'ADD_WAGE_ADVANCE', payload: newAdv });
    addToast({ title: 'Advance Issued', message: `₹${amt} issued to ${newAdv.employeeName}.`, type: 'success' });
    setModalOpen(false);
    setEmpName('');
    setAmount('');
    setReason('');
  };

  const columns = [
    { header: 'Employee' },
    { header: 'Date Issued' },
    { header: 'Amount' },
    { header: 'Recovered' },
    { header: 'Outstanding' },
    { header: 'Reason' },
    { header: 'Status' },
    { header: '', align: 'right' },
  ];

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-text">Wage Advances</h1>
          <p className="text-xs text-muted">
            Advances against wages, auto-recovered as a payroll deduction in future runs. Available for all employees, not just daily-wage workers.
          </p>
        </div>
        <Button size="sm" icon={Plus} onClick={() => setModalOpen(true)}>
          + Issue Advance
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <StatCard
          title="Total Issued"
          value={21000}
          prefix="₹"
          subtitle="Cumulative advances issued"
          icon={Coins}
          delay={0.1}
        />
        <StatCard
          title="Outstanding"
          value={11000}
          prefix="₹"
          subtitle="Pending salary deduction"
          icon={Clock}
          delay={0.18}
        />
        <StatCard
          title="Active Advances"
          value="3 / 5"
          subtitle="Currently active recovery plans"
          icon={CheckCircle2}
          delay={0.25}
        />
      </div>

      {/* CHART: Issued vs Recovered bar chart by month */}
      <Card className="p-3.5 h-[230px] flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-text uppercase tracking-wider">Issued vs Recovered by Month</span>
          <span className="text-xs text-muted font-mono">Jun - Oct 2026</span>
        </div>
        <AnimatedBarChart
          data={advancesChartData}
          dataKey="issued"
          xKey="month"
          height={170}
          accentColor="#059669"
          valuePrefix="₹"
          valueSuffix=""
        />
      </Card>

      {/* Table */}
      <Table
        columns={columns}
        data={advances}
        renderRow={(adv) => (
          <>
            <td className="py-3 px-4">
              <div className="font-semibold text-text text-xs leading-tight">{adv.employeeName}</div>
              <div className="text-[10px] text-muted font-mono">{adv.employeeCode}</div>
            </td>
            <td className="py-3 px-4 text-muted font-mono text-xs">{adv.dateIssued}</td>
            <td className="py-3 px-4 font-mono font-medium text-text tabular-nums">{formatCurrency(adv.amount, 0)}</td>
            <td className="py-3 px-4 font-mono font-semibold text-emerald-400 tabular-nums">{formatCurrency(adv.recovered, 0)}</td>
            <td className="py-3 px-4 font-mono font-bold text-text tabular-nums">{formatCurrency(adv.outstanding, 0)}</td>
            <td className="py-3 px-4 text-muted text-xs truncate max-w-xs">{adv.reason}</td>
            <td className="py-3 px-4">
              <Badge variant={adv.status === 'Settled' ? 'success' : adv.status === 'Partially Recovered' ? 'info' : 'warning'} size="sm">
                {adv.status}
              </Badge>
            </td>
            <td className="py-3 px-4 text-right">
              <button className="text-muted hover:text-text p-1">
                <MoreVertical className="w-4 h-4" />
              </button>
            </td>
          </>
        )}
      />

      {/* Issue Advance Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Issue Wage Advance" subtitle="Disburse salary advance with automated monthly recovery">
        <form onSubmit={handleIssueAdvance} className="space-y-3">
          <Input label="Employee Full Name" placeholder="e.g. Diya Joshi" value={empName} onChange={(e) => setEmpName(e.target.value)} />
          <Input label="Advance Amount (₹)" type="number" placeholder="3000" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <Input label="Disbursement Reason" placeholder="Medical or emergency personal expense" value={reason} onChange={(e) => setReason(e.target.value)} />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button size="sm" type="submit">Issue Advance</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
