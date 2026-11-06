import React, { useState } from 'react';
import { BellRing, Plus, Calendar, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import Card from '../components/ui/Card';
import StatCard from '../components/ui/StatCard';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Table from '../components/ui/Table';
import Modal from '../components/ui/Modal';
import { Input, Select } from '../components/ui/Input';
import AnimatedBarChart from '../components/charts/AnimatedBarChart';
import { useAppStore } from '../context/AppContext';
import { remindersList as initialReminders } from '../data/loans';

export default function Reminders() {
  const { addToast } = useAppStore();
  const [reminders, setReminders] = useState(initialReminders);
  const [modalOpen, setModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newCategory, setNewCategory] = useState('Tax & Compliance');
  const [newPriority, setNewPriority] = useState('High');

  const chartData = [
    { day: 'Tax', hours: 2 },
    { day: 'Team', hours: 1 },
    { day: 'Timesheet', hours: 1 },
    { day: 'OKR', hours: 1 },
  ];

  const handleAddReminder = (e) => {
    e.preventDefault();
    const newRem = {
      id: `rem-${Date.now()}`,
      title: newTitle || 'Upcoming compliance filing',
      dueDate: newDate || '20 Nov 2026',
      priority: newPriority,
      category: newCategory,
      status: 'Upcoming',
    };
    setReminders([newRem, ...reminders]);
    addToast({ title: 'Reminder Set', message: `${newRem.title} scheduled.`, type: 'success' });
    setModalOpen(false);
    setNewTitle('');
    setNewDate('');
  };

  const handleDismiss = (id) => {
    setReminders(reminders.filter(r => r.id !== id));
    addToast({ title: 'Reminder Dismissed', message: 'Item marked as completed.', type: 'info' });
  };

  const columns = [
    { header: 'Reminder Title' },
    { header: 'Category' },
    { header: 'Due Date' },
    { header: 'Priority' },
    { header: 'Status' },
    { header: 'Action', align: 'right' },
  ];

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-text">Reminders & Alerts</h1>
          <p className="text-xs text-muted">Statutory compliance deadlines, team birthdays and operational milestones</p>
        </div>
        <Button size="sm" icon={Plus} onClick={() => setModalOpen(true)}>
          + Set Reminder
        </Button>
      </div>

      {/* Compact Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <StatCard
          title="Active Reminders"
          value={reminders.length}
          subtitle="Configured calendar notifications"
          icon={BellRing}
          delay={0.1}
        />
        <StatCard
          title="High Priority"
          value={reminders.filter(r => r.priority === 'High' || r.priority === 'Urgent').length}
          badgeText="Critical"
          badgeVariant="danger"
          subtitle="Requires attention within 7 days"
          icon={AlertTriangle}
          delay={0.18}
        />
        <StatCard
          title="Upcoming In 7d"
          value={2}
          subtitle="Aditi B'day & Tax submission"
          icon={Clock}
          delay={0.25}
        />
      </div>

      {/* CHART directly under stats */}
      <Card className="p-3.5 h-[210px] flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-text uppercase tracking-wider">Reminders by Category</span>
          <span className="text-xs text-muted font-mono">November 2026</span>
        </div>
        <AnimatedBarChart data={chartData} dataKey="hours" xKey="day" height={150} valueSuffix=" alerts" />
      </Card>

      {/* Table */}
      <Table
        columns={columns}
        data={reminders}
        renderRow={(rem) => (
          <>
            <td className="py-3 px-4 font-semibold text-text text-xs">{rem.title}</td>
            <td className="py-3 px-4 text-muted text-xs">{rem.category}</td>
            <td className="py-3 px-4 text-muted text-xs font-mono">{rem.dueDate}</td>
            <td className="py-3 px-4">
              <Badge variant={rem.priority === 'Urgent' || rem.priority === 'High' ? 'danger' : 'warning'} size="sm">
                {rem.priority}
              </Badge>
            </td>
            <td className="py-3 px-4">
              <Badge variant="outline" size="sm">{rem.status}</Badge>
            </td>
            <td className="py-3 px-4 text-right">
              <Button variant="secondary" size="sm" className="text-xs" onClick={() => handleDismiss(rem.id)}>
                Dismiss
              </Button>
            </td>
          </>
        )}
      />

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Set Calendar Reminder" subtitle="Notify team members about compliance milestones">
        <form onSubmit={handleAddReminder} className="space-y-3">
          <Input label="Title" placeholder="e.g. Provident Fund deposit cut-off" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Target Date" type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
            <Select label="Priority" value={newPriority} onChange={(e) => setNewPriority(e.target.value)} options={['Medium', 'High', 'Urgent']} />
          </div>
          <Select label="Category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} options={['Tax & Compliance', 'Team Event', 'Attendance', 'Performance']} />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button size="sm" type="submit">Save Reminder</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
