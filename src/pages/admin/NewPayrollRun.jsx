import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { Stepper } from '../../components/ui/EmptyState';
import { Input, Select } from '../../components/ui/Input';
import { useAppStore } from '../../context/AppContext';

export default function NewPayrollRun() {
  const navigate = useNavigate();
  const { dispatch, addToast } = useAppStore();

  const [step, setStep] = useState(0);
  const [month, setMonth] = useState('November');
  const [year, setYear] = useState('2026');
  const [title, setTitle] = useState('November 2026 - Regular Payroll');
  const [description, setDescription] = useState('Standard monthly salary processing for all full-time and contract personnel.');

  const handleSuggestTitle = () => {
    setTitle(`${month} ${year} - Regular Payroll`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRun = {
      id: `pr-${Date.now()}`,
      title: title || `${month} ${year} - Regular Payroll`,
      period: `${month} ${year}`,
      status: 'Attendance Calculated',
      statusColor: 'amber',
      employees: 108,
      netPay: 49850000,
      processedBy: 'Admin',
      date: new Date().toISOString().split('T')[0],
      fy: 'FY 2026-27',
    };

    dispatch({ type: 'ADD_PAYROLL_RUN', payload: newRun });
    addToast({
      title: 'Payroll Run Initialized',
      message: `${title} created successfully with 108 personnel attendance calculation.`,
      type: 'success',
    });
    navigate('/payroll/runs');
  };

  const steps = [
    { label: 'Details' },
    { label: 'Attendance' },
    { label: 'Review' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold text-text">Create New Payroll Run</h1>
        <p className="text-xs text-muted">Set up a new payroll run for employee salary processing</p>
      </div>

      {/* Animated 3-step stepper at the top */}
      <Card className="p-4">
        <Stepper steps={steps} currentStep={step} onStepClick={setStep} />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Payroll Run Details Form */}
        <div className="lg:col-span-7">
          <Card className="p-5">
            <h2 className="text-sm font-semibold text-text mb-4">Payroll Run Details</h2>

            {step === 0 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Select
                    label="Month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    options={['November', 'December', 'January', 'February', 'March']}
                  />
                  <Select
                    label="Year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    options={['2026', '2027']}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium text-muted">Run Title</label>
                    <button
                      type="button"
                      onClick={handleSuggestTitle}
                      className="text-xs font-semibold text-accent hover:underline flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      Suggest Title
                    </button>
                  </div>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. November 2026 - Regular Payroll"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-muted block mb-1.5">Description (Optional)</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-surface-hover/80 border border-border rounded-xl text-text text-xs p-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  />
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <Button variant="outline" size="sm" onClick={() => navigate('/payroll/runs')}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={() => setStep(1)} icon={ArrowRight} iconPosition="right">
                    Proceed to Attendance
                  </Button>
                </div>
              </form>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-surface-hover border border-border text-xs space-y-2">
                  <div className="flex justify-between font-medium">
                    <span className="text-muted">Total Active Personnel:</span>
                    <span className="text-text font-bold">108</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-muted">Attendance Lock Status:</span>
                    <span className="text-emerald-400 font-bold">Verified</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-muted">Total Working Days:</span>
                    <span className="text-text font-bold">21 Days</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <Button variant="outline" size="sm" onClick={() => setStep(0)} icon={ArrowLeft}>
                    Back
                  </Button>
                  <Button size="sm" onClick={() => setStep(2)} icon={ArrowRight} iconPosition="right">
                    Proceed to Review
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-accent-soft/40 border border-accent/20 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted">Payroll Title:</span>
                    <span className="text-text font-semibold">{title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Target Pay Date:</span>
                    <span className="text-text font-semibold">30 Nov 2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Estimated Net Payout:</span>
                    <span className="text-emerald-400 font-bold text-sm">₹49,85,000.00</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <Button variant="outline" size="sm" onClick={() => setStep(1)} icon={ArrowLeft}>
                    Back
                  </Button>
                  <Button size="sm" onClick={handleSubmit} icon={CheckCircle2}>
                    Create Payroll Run
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Right Column: Preview and Latest Completed Payroll */}
        <div className="lg:col-span-5 space-y-4">
          {/* Live Preview Card */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">Preview</h3>
              <Badge variant="accent" size="sm">Live Updating</Badge>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[11px] text-muted block">Period</span>
                <span className="text-sm font-semibold text-text">{month} {year}</span>
              </div>
              <div>
                <span className="text-[11px] text-muted block">Title</span>
                <span className="text-sm font-bold text-accent">{title || '—'}</span>
              </div>
              <div>
                <span className="text-[11px] text-muted block">Description</span>
                <p className="text-xs text-muted leading-relaxed">{description || 'No description provided'}</p>
              </div>
            </div>
          </Card>

          {/* Latest Completed Payroll */}
          <Card className="p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
              Latest Completed Payroll
            </h3>
            <div className="p-3 rounded-xl bg-surface-hover border border-border text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-muted">Period:</span>
                <span className="text-text font-semibold">November 2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Title:</span>
                <span className="text-text font-semibold">November 2026 - Regular Payroll</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Status:</span>
                <Badge variant="success" size="sm">Completed</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
