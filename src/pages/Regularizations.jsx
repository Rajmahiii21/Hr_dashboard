import React from 'react';
import { CalendarCheck, CheckCircle2, Clock, Check } from 'lucide-react';
import Card from '../components/ui/Card';
import StatCard from '../components/ui/StatCard';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Table from '../components/ui/Table';
import AnimatedBarChart from '../components/charts/AnimatedBarChart';
import { useAppStore } from '../context/AppContext';
import { useRole } from '../context/RoleContext';

export default function Regularizations() {
  const { isAdmin } = useRole();
  const { state, dispatch, addToast } = useAppStore();
  const regularizations = state.regularizations;

  const chartData = [
    { day: 'Check-in', hours: 2 },
    { day: 'Full Day', hours: 1 },
    { day: 'Check-out', hours: 1 },
    { day: 'WFH', hours: 1 },
  ];

  const handleApprove = (id, empName) => {
    dispatch({ type: 'APPROVE_REGULARIZATION', payload: id });
    addToast({
      title: 'Regularization Approved',
      message: `Punch correction approved for ${empName}.`,
      type: 'success',
    });
  };

  const columns = [
    { header: 'Employee' },
    { header: 'Date' },
    { header: 'Correction Type' },
    { header: 'Original' },
    { header: 'Requested' },
    { header: 'Reason' },
    { header: 'Status' },
    { header: 'Action', align: 'right' },
  ];

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-text">Attendance Regularization Approvals</h1>
        <p className="text-xs text-muted">Review biometric punch discrepancies and shift regularizations</p>
      </div>

      {/* Compact Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <StatCard
          title="Pending Regularizations"
          value={isAdmin ? 3 : 0}
          badgeText={isAdmin ? '3 Awaiting' : '0 Pending'}
          badgeVariant={isAdmin ? 'warning' : 'success'}
          subtitle={isAdmin ? 'Pending supervisor sign-off' : 'All punches reconciled'}
          icon={Clock}
          delay={0.1}
        />
        <StatCard
          title="Approval Turnaround"
          value={4.2}
          suffix=" hrs"
          decimals={1}
          subtitle="Avg resolution time"
          icon={CheckCircle2}
          delay={0.18}
        />
        <StatCard
          title="SLA Compliance"
          value={98}
          suffix="%"
          subtitle="Processed within 24h"
          icon={CalendarCheck}
          delay={0.25}
        />
      </div>

      {/* CHART directly under stat cards */}
      <Card className="p-3.5 h-[210px] flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-text uppercase tracking-wider">Regularization Types</span>
          <span className="text-xs text-muted font-mono">November 2026</span>
        </div>
        <AnimatedBarChart data={chartData} dataKey="hours" xKey="day" height={150} valueSuffix=" reqs" />
      </Card>

      {/* Table */}
      <Table
        columns={columns}
        data={regularizations}
        renderRow={(reg) => (
          <>
            <td className="py-3 px-4">
              <div className="font-semibold text-text text-xs">{reg.employeeName}</div>
              <div className="text-[10px] text-muted font-mono">{reg.employeeCode}</div>
            </td>
            <td className="py-3 px-4 font-mono text-muted text-xs">{reg.date}</td>
            <td className="py-3 px-4 text-accent text-xs font-medium">{reg.type}</td>
            <td className="py-3 px-4 font-mono text-muted text-xs">{reg.originalCheckIn}</td>
            <td className="py-3 px-4 font-mono text-emerald-400 text-xs font-semibold">{reg.requestedCheckIn}</td>
            <td className="py-3 px-4 text-muted text-xs truncate max-w-xs">{reg.reason}</td>
            <td className="py-3 px-4">
              <Badge variant={reg.status === 'Approved' ? 'success' : 'warning'} size="sm">
                {reg.status}
              </Badge>
            </td>
            <td className="py-3 px-4 text-right">
              {reg.status === 'Pending' ? (
                <Button
                  size="sm"
                  variant="primary"
                  className="text-xs"
                  icon={Check}
                  onClick={() => handleApprove(reg.id, reg.employeeName)}
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
    </div>
  );
}
