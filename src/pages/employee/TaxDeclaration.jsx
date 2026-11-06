import React, { useState } from 'react';
import { IndianRupee, ShieldCheck, FileSpreadsheet, ArrowRightLeft, CheckCircle2 } from 'lucide-react';
import Card from '../../components/ui/Card';
import StatCard from '../../components/ui/StatCard';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Tabs from '../../components/ui/Tabs';
import Table from '../../components/ui/Table';
import Modal from '../../components/ui/Modal';
import AnimatedBarChart from '../../components/charts/AnimatedBarChart';
import AnimatedAreaChart from '../../components/charts/AnimatedAreaChart';
import { useAppStore } from '../../context/AppContext';
import { taxOverview, taxChartData, taxDeductions80C, hraDeclarations } from '../../data/tax';
import { formatCurrency } from '../../utils/format';

export default function TaxDeclaration() {
  const { addToast } = useAppStore();
  const [activeTab, setActiveTab] = useState('80c');
  const [regimeModalOpen, setRegimeModalOpen] = useState(false);
  const [selectedRegime, setSelectedRegime] = useState(taxOverview.regime);

  const tabs = [
    { id: '80c', label: 'Section 80 Deductions' },
    { id: 'hra', label: 'HRA Declaration' },
    { id: 'prev', label: 'Previous Employer' },
  ];

  const handleSwitchRegime = () => {
    addToast({
      title: 'Tax Regime Updated',
      message: `Tax computation switched to ${selectedRegime}.`,
      type: 'success',
    });
    setRegimeModalOpen(false);
  };

  const columns80C = [
    { header: 'Section' },
    { header: 'Particulars' },
    { header: 'Declared Amount' },
    { header: 'Approved Amount' },
    { header: 'Max Limit' },
    { header: 'Status' },
  ];

  const columnsHra = [
    { header: 'Period' },
    { header: 'Monthly Rent' },
    { header: 'City Category' },
    { header: 'Landlord Name' },
    { header: 'Landlord PAN' },
    { header: 'Status' },
  ];

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-text">Tax Declaration</h1>
          <p className="text-xs text-muted">Manage your tax declarations and deductions • November, 2026 expected salary</p>
        </div>
      </div>

      {/* Stat cards (count-up): Total Earnings ₹8,000, TDS Deducted ₹0, Total Deduction ₹960, Net Pay ₹7,040 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <StatCard
          title="Total Earnings"
          value={8000}
          prefix="₹"
          subtitle="Monthly gross salary"
          icon={IndianRupee}
          delay={0.1}
        />
        <StatCard
          title="TDS Deducted"
          value={0}
          prefix="₹"
          badgeText="Zero Tax"
          badgeVariant="success"
          subtitle="Estimated tax for month"
          icon={ShieldCheck}
          delay={0.18}
        />
        <StatCard
          title="Total Deduction"
          value={960}
          prefix="₹"
          subtitle="Statutory EPF & PT"
          icon={FileSpreadsheet}
          delay={0.25}
        />
        <StatCard
          title="Net Pay"
          value={7040}
          prefix="₹"
          badgeText="Take Home"
          badgeVariant="accent"
          subtitle="Expected credit to account"
          icon={CheckCircle2}
          delay={0.32}
        />
      </div>

      {/* CHART immediately below: 'Earnings vs Deductions' bar chart + 'Monthly Net Pay' line */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        <Card className="lg:col-span-6 p-3.5 h-[230px] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-text uppercase tracking-wider">Earnings vs Deductions</span>
            <span className="text-xs text-muted font-mono">Jun - Nov 2026</span>
          </div>
          <AnimatedBarChart
            data={taxChartData}
            dataKey="earnings"
            xKey="month"
            height={170}
            valuePrefix="₹"
            valueSuffix=""
          />
        </Card>

        <Card className="lg:col-span-6 p-3.5 h-[230px] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-text uppercase tracking-wider">Monthly Net Pay</span>
            <span className="text-xs text-muted font-mono">Constant ₹7,040</span>
          </div>
          <AnimatedAreaChart
            data={taxChartData}
            dataKey="netPay"
            xKey="month"
            height={170}
            valuePrefix="₹"
            valueSuffix=""
          />
        </Card>
      </div>

      {/* Tax Regime Card */}
      <Card className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent-soft text-accent flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-text">Active Tax Regime</h3>
              <Badge variant="accent" size="sm">New Tax Regime</Badge>
            </div>
            <p className="text-xs text-muted mt-0.5">
              Concessional slab rates applied automatically under Section 115BAC for FY 2026-27.
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" icon={ArrowRightLeft} onClick={() => setRegimeModalOpen(true)}>
          Change Regime
        </Button>
      </Card>

      {/* Tax Declaration - FY 2026-2027 with sliding tabs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-text">Tax Declaration - FY 2026-2027</h2>
          <Button size="sm" onClick={() => addToast({ title: 'Declaration Saved', message: 'Proof submission submitted for review.', type: 'success' })}>
            Save Declarations
          </Button>
        </div>

        <Tabs activeTab={activeTab} onChange={setActiveTab} tabs={tabs} />

        {activeTab === '80c' && (
          <Table
            columns={columns80C}
            data={taxDeductions80C}
            renderRow={(item) => (
              <>
                <td className="py-3 px-4 font-mono font-bold text-accent">{item.section}</td>
                <td className="py-3 px-4 font-medium text-text">{item.name}</td>
                <td className="py-3 px-4 font-mono text-text tabular-nums">{formatCurrency(item.declared, 0)}</td>
                <td className="py-3 px-4 font-mono text-emerald-400 tabular-nums">{formatCurrency(item.approved, 0)}</td>
                <td className="py-3 px-4 font-mono text-muted tabular-nums">{formatCurrency(item.maxLimit, 0)}</td>
                <td className="py-3 px-4">
                  <Badge variant="success" size="sm">Verified</Badge>
                </td>
              </>
            )}
          />
        )}

        {activeTab === 'hra' && (
          <Table
            columns={columnsHra}
            data={hraDeclarations}
            renderRow={(item) => (
              <>
                <td className="py-3 px-4 text-text">{item.period}</td>
                <td className="py-3 px-4 font-mono text-text tabular-nums">{formatCurrency(item.monthlyRent, 0)} / mo</td>
                <td className="py-3 px-4 text-muted">{item.city}</td>
                <td className="py-3 px-4 text-text font-medium">{item.landlordName}</td>
                <td className="py-3 px-4 font-mono text-muted">{item.landlordPan}</td>
                <td className="py-3 px-4">
                  <Badge variant="success" size="sm">{item.status}</Badge>
                </td>
              </>
            )}
          />
        )}

        {activeTab === 'prev' && (
          <Card className="p-8 text-center text-xs text-muted">
            <p>No previous employment income recorded for current financial year FY 2026-27.</p>
          </Card>
        )}
      </div>

      {/* Change Regime Modal */}
      <Modal isOpen={regimeModalOpen} onClose={() => setRegimeModalOpen(false)} title="Change Tax Regime" subtitle="Select your preferred income tax calculation structure">
        <div className="space-y-4">
          <div
            onClick={() => setSelectedRegime('New Tax Regime')}
            className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
              selectedRegime === 'New Tax Regime'
                ? 'border-accent bg-accent-soft/40 shadow-sm'
                : 'border-border bg-surface-hover'
            }`}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-text text-xs">New Tax Regime (Default)</span>
              {selectedRegime === 'New Tax Regime' && <Badge variant="accent" size="sm">Selected</Badge>}
            </div>
            <p className="text-[11px] text-muted">Standard ₹75,000 deduction, lower slab tax rates, zero surcharge up to ₹7 Lakhs.</p>
          </div>

          <div
            onClick={() => setSelectedRegime('Old Tax Regime')}
            className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
              selectedRegime === 'Old Tax Regime'
                ? 'border-accent bg-accent-soft/40 shadow-sm'
                : 'border-border bg-surface-hover'
            }`}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-text text-xs">Old Tax Regime</span>
              {selectedRegime === 'Old Tax Regime' && <Badge variant="accent" size="sm">Selected</Badge>}
            </div>
            <p className="text-[11px] text-muted">Allows Chapter VI-A deductions (80C, 80D, HRA exemption, Home loan interest).</p>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setRegimeModalOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={handleSwitchRegime}>Confirm Regime</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
