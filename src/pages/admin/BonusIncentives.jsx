import React, { useState, useMemo } from 'react';
import { Plus, Gift, Search, RotateCcw, Wallet, CheckCircle } from 'lucide-react';
import Card from '../../components/ui/Card';
import StatCard from '../../components/ui/StatCard';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import Modal from '../../components/ui/Modal';
import { Input, Select } from '../../components/ui/Input';
import AnimatedDonut from '../../components/charts/AnimatedDonut';
import AnimatedBarChart from '../../components/charts/AnimatedBarChart';
import { useAppStore } from '../../context/AppContext';
import { bonusByTypeData, bonusByMonthData } from '../../data/bonuses';
import { formatCurrency } from '../../utils/format';

export default function BonusIncentives() {
  const { state, dispatch, addToast } = useAppStore();
  const bonusRuns = state.bonusRuns;

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);

  // New bonus modal form state
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState('Festival');
  const [newAmount, setNewAmount] = useState('');

  const filteredRuns = useMemo(() => {
    return bonusRuns.filter((b) => {
      if (search && !b.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (statusFilter !== 'All' && b.status !== statusFilter) return false;
      if (typeFilter !== 'All' && b.type.toLowerCase() !== typeFilter.toLowerCase()) return false;
      if (yearFilter !== 'All' && b.year !== yearFilter) return false;
      return true;
    });
  }, [bonusRuns, search, statusFilter, typeFilter, yearFilter]);

  const clearFilters = () => {
    setSearch('');
    setStatusFilter('All');
    setTypeFilter('All');
    setYearFilter('All');
  };

  const handleCreateBonus = (e) => {
    e.preventDefault();
    const gross = Number(newAmount) || 10000;
    const newRun = {
      id: `b-${Date.now()}`,
      title: newTitle || 'Performance Bonus - Q4',
      type: newType,
      period: 'Nov 2026',
      employees: 2,
      gross: gross,
      tds: 0,
      net: gross,
      status: 'Draft',
      year: '2026',
    };
    dispatch({ type: 'ADD_BONUS_RUN', payload: newRun });
    addToast({ title: 'Bonus Created', message: `${newRun.title} added to draft runs.`, type: 'success' });
    setModalOpen(false);
    setNewTitle('');
    setNewAmount('');
  };

  const columns = [
    { header: 'Title & Type' },
    { header: 'Period' },
    { header: 'Employees' },
    { header: 'Gross' },
    { header: 'TDS' },
    { header: 'Net' },
    { header: 'Status' },
  ];

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-text">Bonus & Incentives</h1>
          <p className="text-xs text-muted">
            Manage out-of-cycle bonus payments with automatic TDS deduction and bank statement matching.
          </p>
        </div>
        <Button size="sm" icon={Plus} onClick={() => setModalOpen(true)}>
          + New Bonus Run
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <StatCard
          title="Total Gross"
          value={345500}
          prefix="₹"
          subtitle="Total gross incentives allocated"
          icon={Wallet}
          delay={0.1}
        />
        <StatCard
          title="Total Net Disbursed"
          value={345500}
          prefix="₹"
          subtitle="Net disbursed amount"
          icon={CheckCircle}
          delay={0.18}
        />
        <StatCard
          title="Paid Runs"
          value="0 / 10"
          subtitle="Draft or Approved pipeline"
          icon={Gift}
          delay={0.25}
        />
      </div>

      {/* CHARTS directly below stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        <Card className="lg:col-span-5 p-3.5 h-[230px] flex flex-col justify-between">
          <span className="text-xs font-semibold text-text uppercase tracking-wider">Bonus by Type</span>
          <AnimatedDonut data={bonusByTypeData} centerValue={345500} valuePrefix="₹" totalLabel="Gross" height={150} />
        </Card>

        <Card className="lg:col-span-7 p-3.5 h-[230px] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-text uppercase tracking-wider">Gross by Month</span>
            <span className="text-xs text-muted font-mono">2026 Distribution</span>
          </div>
          <AnimatedBarChart
            data={bonusByMonthData}
            dataKey="gross"
            xKey="month"
            height={170}
            accentColor="#059669"
            valuePrefix="₹"
            valueSuffix=""
          />
        </Card>
      </div>

      {/* Filters Toolbar */}
      <Card className="p-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2.5">
          <Input placeholder="Search bonus title..." value={search} onChange={(e) => setSearch(e.target.value)} icon={Search} clearable onClear={() => setSearch('')} />
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} options={['All', 'Draft', 'Approved', 'Paid']} />
          <Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} options={['All', 'diwali', 'Festival', 'Performance', 'Referral', 'Milestone', 'Retention', 'Sales', 'Spot', 'Welcome']} />
          <Select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)} options={['All', '2026', '2025']} />
          <Button variant="secondary" size="sm" icon={RotateCcw} onClick={clearFilters}>Clear Filters</Button>
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
              <div className="text-[11px] text-muted capitalize">{run.type}</div>
            </td>
            <td className="py-3 px-4 text-muted font-mono text-xs">{run.period}</td>
            <td className="py-3 px-4 font-mono font-medium text-text">{run.employees}</td>
            <td className="py-3 px-4 font-mono font-semibold text-text tabular-nums">{formatCurrency(run.gross, 0)}</td>
            <td className="py-3 px-4 text-muted font-mono">{run.tds === 0 ? '-' : formatCurrency(run.tds, 0)}</td>
            <td className="py-3 px-4 font-mono font-semibold text-emerald-400 tabular-nums">{formatCurrency(run.net, 0)}</td>
            <td className="py-3 px-4">
              <Badge variant={run.status === 'Approved' ? 'success' : 'default'} size="sm">
                {run.status}
              </Badge>
            </td>
          </>
        )}
      />

      {/* New Bonus Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Create Out-of-Cycle Bonus Run" subtitle="Configure ex-gratia or incentive disbursement">
        <form onSubmit={handleCreateBonus} className="space-y-3">
          <Input label="Title" placeholder="e.g. Festival / Ex-gratia - November 2026" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          <Select label="Type" value={newType} onChange={(e) => setNewType(e.target.value)} options={['Festival', 'Performance', 'Referral', 'Spot']} />
          <Input label="Gross Amount (₹)" type="number" placeholder="50000" value={newAmount} onChange={(e) => setNewAmount(e.target.value)} />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button size="sm" type="submit">Create Run</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
