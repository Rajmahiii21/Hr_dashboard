import React, { useState } from 'react';
import { CalendarCheck, Plus, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import Card from '../../components/ui/Card';
import StatCard from '../../components/ui/StatCard';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import Modal from '../../components/ui/Modal';
import { Input, Select } from '../../components/ui/Input';
import AnimatedDonut from '../../components/charts/AnimatedDonut';
import { useAppStore } from '../../context/AppContext';
import { useRole } from '../../context/RoleContext';

export default function Leaves() {
  const { isAdmin } = useRole();
  const { state, dispatch, addToast } = useAppStore();
  const employeeLeaves = state.employeeLeaves;
  const adminLeaves = state.adminLeaves;

  const [modalOpen, setModalOpen] = useState(false);
  const [leaveType, setLeaveType] = useState('Casual Leave');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  const handleApplyLeave = (e) => {
    e.preventDefault();
    addToast({
      title: 'Leave Request Submitted',
      message: `${leaveType} request submitted to manager for approval.`,
      type: 'success',
    });
    setModalOpen(false);
    setReason('');
  };

  const donutData = isAdmin
    ? [
        { name: 'Available', value: 247, color: '#059669' },
        { name: 'Pending Approvals', value: 3, color: '#F59E0B' },
        { name: 'Utilized This Month', value: 7, color: '#0EA5E9' },
      ]
    : [
        { name: 'Available', value: 1, color: 'rgba(255,255,255,0.1)' },
        { name: 'Used', value: 3, color: '#4F46E5' },
      ];

  const columns = isAdmin
    ? [
        { header: 'Employee' },
        { header: 'Leave Type' },
        { header: 'Dates' },
        { header: 'Days' },
        { header: 'Reason' },
        { header: 'Status' },
        { header: 'Action', align: 'right' },
      ]
    : [
        { header: 'Type' },
        { header: 'Start Date' },
        { header: 'End Date' },
        { header: 'Days' },
        { header: 'Reason' },
        { header: 'Status' },
      ];

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-text">
            {isAdmin ? 'Organization Leave Management' : 'My Leave Requests'}
          </h1>
          <p className="text-xs text-muted">
            {isAdmin ? 'Review employee leave applications and balances' : 'Submit and monitor leave requests and balance quotas'}
          </p>
        </div>
        {!isAdmin && (
          <Button size="sm" icon={Plus} onClick={() => setModalOpen(true)}>
            Apply Leave
          </Button>
        )}
      </div>

      {/* Compact Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <StatCard
          title="Available Balance"
          value={isAdmin ? 247 : 0}
          suffix=" Days"
          subtitle={isAdmin ? 'Total workforce quota' : 'No accrued balance left'}
          icon={CalendarCheck}
          delay={0.1}
        />
        <StatCard
          title="Allocated"
          value={isAdmin ? 260 : 0}
          suffix=" Days"
          subtitle="Annual quota entitlement"
          icon={CheckCircle2}
          delay={0.18}
        />
        <StatCard
          title="Used / Approved"
          value={isAdmin ? 10 : 0}
          suffix=" Days"
          subtitle="Leaves approved in FY"
          icon={Clock}
          delay={0.25}
        />
        <StatCard
          title="Pending Approvals"
          value={isAdmin ? 3 : 0}
          badgeText={isAdmin ? '3 NEW' : '0 PENDING'}
          badgeVariant={isAdmin ? 'warning' : 'default'}
          subtitle={isAdmin ? 'Awaiting your action' : 'No pending requests'}
          icon={AlertCircle}
          delay={0.32}
        />
      </div>

      {/* CHART directly below stat cards */}
      <Card className="p-4 h-[210px] flex flex-col justify-between">
        <span className="text-xs font-semibold text-text uppercase tracking-wider">Leave Allocation & Utilization</span>
        <AnimatedDonut
          data={donutData}
          totalLabel="Total Days"
          centerValue={isAdmin ? 257 : 3}
          height={140}
        />
      </Card>

      {/* Table of requests */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-text uppercase tracking-wider">
          {isAdmin ? 'Pending Applications (3)' : 'Leave History'}
        </h3>
        <Table
          columns={columns}
          data={isAdmin ? adminLeaves : employeeLeaves}
          renderRow={(l) =>
            isAdmin ? (
              <>
                <td className="py-3 px-4 font-semibold text-text">
                  <div>{l.employeeName}</div>
                  <div className="text-[10px] text-muted font-mono">{l.employeeCode}</div>
                </td>
                <td className="py-3 px-4 text-accent text-xs font-medium">{l.type}</td>
                <td className="py-3 px-4 text-muted text-xs">{l.dates}</td>
                <td className="py-3 px-4 font-mono font-bold text-text">{l.days}</td>
                <td className="py-3 px-4 text-xs text-muted max-w-xs truncate">{l.reason}</td>
                <td className="py-3 px-4">
                  <Badge variant={l.status === 'Approved' ? 'success' : 'warning'} size="sm">
                    {l.status}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-right">
                  {l.status === 'Pending' ? (
                    <Button
                      size="sm"
                      variant="primary"
                      className="text-xs"
                      onClick={() => {
                        dispatch({ type: 'APPROVE_LEAVE', payload: l.id });
                        addToast({ title: 'Leave Approved', message: `Approved for ${l.employeeName}`, type: 'success' });
                      }}
                    >
                      Approve
                    </Button>
                  ) : (
                    <span className="text-xs text-emerald-400 font-semibold">Approved ✓</span>
                  )}
                </td>
              </>
            ) : (
              <>
                <td className="py-3 px-4 font-semibold text-accent text-xs">{l.type}</td>
                <td className="py-3 px-4 text-muted text-xs font-mono">{l.startDate}</td>
                <td className="py-3 px-4 text-muted text-xs font-mono">{l.endDate}</td>
                <td className="py-3 px-4 font-mono font-bold text-text">{l.days}</td>
                <td className="py-3 px-4 text-xs text-muted max-w-xs truncate">{l.reason}</td>
                <td className="py-3 px-4">
                  <Badge variant="success" size="sm">{l.status}</Badge>
                </td>
              </>
            )
          }
        />
      </div>

      {/* Apply Leave Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Apply for Leave" subtitle="Submit planned time off request">
        <form onSubmit={handleApplyLeave} className="space-y-3">
          <Select label="Leave Category" value={leaveType} onChange={(e) => setLeaveType(e.target.value)} options={['Casual Leave', 'Sick Leave', 'Privilege Leave', 'Comp Off']} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Start Date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <Input label="End Date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
          <Input label="Reason for Leave" placeholder="e.g. Urgent personal commitment" value={reason} onChange={(e) => setReason(e.target.value)} />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button size="sm" type="submit">Submit Request</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
