import React, { useState, useMemo } from 'react';
import { UserPlus, Upload, Filter, Search, RotateCcw } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Tabs from '../../components/ui/Tabs';
import Table from '../../components/ui/Table';
import Pagination from '../../components/ui/Pagination';
import { Input, Select } from '../../components/ui/Input';
import Avatar from '../../components/ui/Avatar';
import Modal from '../../components/ui/Modal';
import AnimatedBarChart from '../../components/charts/AnimatedBarChart';
import AnimatedDonut from '../../components/charts/AnimatedDonut';
import { useAppStore } from '../../context/AppContext';

export default function Directory() {
  const { state, addToast } = useAppStore();
  const allEmployees = state.employees;

  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [buFilter, setBuFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [newInviteEmail, setNewInviteEmail] = useState('');

  // Filtering & Sorting logic
  const filteredEmployees = useMemo(() => {
    return allEmployees.filter((emp) => {
      if (activeTab === 'recent') {
        const joinDate = new Date(emp.joiningDate);
        if (joinDate < new Date('2024-06-01')) return false;
      } else if (activeTab === 'pending') {
        if (emp.status !== 'pending' && emp.status !== 'invited') return false;
      }

      if (search && !emp.name.toLowerCase().includes(search.toLowerCase()) && !emp.code.toLowerCase().includes(search.toLowerCase()) && !emp.email.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      if (deptFilter !== 'All' && emp.department !== deptFilter) return false;
      if (buFilter !== 'All' && emp.businessUnit !== buFilter) return false;
      if (typeFilter !== 'All' && emp.type !== typeFilter) return false;
      if (statusFilter !== 'All' && emp.status !== statusFilter) return false;
      return true;
    }).sort((a, b) => {
      const fieldA = (a[sortField] || '').toString().toLowerCase();
      const fieldB = (b[sortField] || '').toString().toLowerCase();
      return sortOrder === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
    });
  }, [allEmployees, activeTab, search, deptFilter, buFilter, typeFilter, statusFilter, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredEmployees.length / pageSize) || 1;
  const paginatedEmployees = filteredEmployees.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Department chart counts
  const deptChartData = useMemo(() => {
    const counts = {};
    allEmployees.forEach(e => counts[e.department] = (counts[e.department] || 0) + 1);
    return Object.entries(counts).map(([dept, count]) => ({ day: dept.split(' ')[0], hours: count }));
  }, [allEmployees]);

  const statusDonutData = useMemo(() => {
    const active = allEmployees.filter(e => e.status === 'active').length;
    const invited = allEmployees.filter(e => e.status === 'invited').length;
    const pending = allEmployees.filter(e => e.status === 'pending').length;
    return [
      { name: 'Active', value: active, color: '#059669' },
      { name: 'Invited', value: invited, color: '#F59E0B' },
      { name: 'Pending', value: pending, color: '#0EA5E9' },
    ];
  }, [allEmployees]);

  const clearFilters = () => {
    setSearch('');
    setDeptFilter('All');
    setBuFilter('All');
    setTypeFilter('All');
    setStatusFilter('All');
    setCurrentPage(1);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === paginatedEmployees.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginatedEmployees.map(e => e.id)));
    }
  };

  const columns = [
    { header: <input type="checkbox" checked={selectedIds.size > 0 && selectedIds.size === paginatedEmployees.length} onChange={toggleSelectAll} className="rounded" />, className: 'w-8' },
    { header: 'Employee' },
    { header: 'Email' },
    { header: 'Designation' },
    { header: 'Department' },
    { header: 'Business Unit' },
    { header: 'Status' },
  ];

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-text">Employee Directory</h1>
          <p className="text-xs text-muted">Manage and view all employees in your organization</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={Upload} onClick={() => addToast({ title: 'Bulk Invite', message: 'Upload CSV wizard opened', type: 'info' })}>
            Bulk Invite Employees
          </Button>
          <Button size="sm" icon={UserPlus} onClick={() => setInviteModalOpen(true)}>
            Invite Employee
          </Button>
        </div>
      </div>

      {/* CHART FIRST (compact, 200px) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        <Card className="lg:col-span-8 p-3.5 h-[210px] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-text uppercase tracking-wider">Headcount by Department</span>
            <span className="text-xs text-muted font-mono">108 Records</span>
          </div>
          <AnimatedBarChart data={deptChartData} dataKey="hours" xKey="day" height={150} accentColor="#059669" valueSuffix=" emps" />
        </Card>

        <Card className="lg:col-span-4 p-3.5 h-[210px] flex flex-col justify-between">
          <span className="text-xs font-semibold text-text uppercase tracking-wider">Status Breakdown</span>
          <AnimatedDonut data={statusDonutData} centerValue={108} totalLabel="Headcount" height={130} />
        </Card>
      </div>

      {/* Tabs */}
      <Tabs
        activeTab={activeTab}
        onChange={(tab) => { setActiveTab(tab); setCurrentPage(1); }}
        tabs={[
          { id: 'all', label: 'All Employees', badge: allEmployees.length },
          { id: 'recent', label: 'Recent Joiners', badge: '14' },
          { id: 'pending', label: 'Pending Approval', badge: '12' },
        ]}
      />

      {/* Filter Toolbar */}
      <Card className="p-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
          <Input placeholder="Search name or ID..." value={search} onChange={(e) => setSearch(e.target.value)} icon={Search} clearable onClear={() => setSearch('')} />
          <Select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)} options={['All', 'Engineering', 'Product Management', 'Sales', 'HR', 'Finance', 'Support']} />
          <Select value={buFilter} onChange={(e) => setBuFilter(e.target.value)} options={['All', 'Headquarters', 'Bhopal Madhya Pradesh', 'Bengaluru Branch', 'Mumbai Hub']} />
          <Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} options={['All', 'Full-time', 'Part-time', 'Contract']} />
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} options={['All', 'active', 'invited', 'pending']} />
          <Select value={sortField} onChange={(e) => setSortField(e.target.value)} options={[{ value: 'name', label: 'Sort: Name' }, { value: 'code', label: 'Sort: Code' }, { value: 'department', label: 'Sort: Dept' }]} />
          <Button variant="secondary" size="sm" icon={RotateCcw} onClick={clearFilters}>Clear</Button>
        </div>
      </Card>

      {/* Table */}
      <Table
        columns={columns}
        data={paginatedEmployees}
        renderRow={(emp) => (
          <>
            <td className="py-2.5 px-4">
              <input type="checkbox" checked={selectedIds.has(emp.id)} onChange={() => {
                const next = new Set(selectedIds);
                next.has(emp.id) ? next.delete(emp.id) : next.add(emp.id);
                setSelectedIds(next);
              }} className="rounded" />
            </td>
            <td className="py-2.5 px-4">
              <div className="flex items-center gap-2.5">
                <Avatar name={emp.name} size="sm" />
                <div>
                  <div className="font-semibold text-text leading-tight">{emp.name}</div>
                  <div className="text-[10px] text-muted font-mono">{emp.code}</div>
                </div>
              </div>
            </td>
            <td className="py-2.5 px-4 text-muted">{emp.email}</td>
            <td className="py-2.5 px-4 text-text">{emp.designation}</td>
            <td className="py-2.5 px-4 text-text">{emp.department}</td>
            <td className="py-2.5 px-4 text-muted">{emp.businessUnit}</td>
            <td className="py-2.5 px-4">
              <Badge variant={emp.status === 'active' ? 'success' : emp.status === 'invited' ? 'warning' : 'info'} size="sm">
                {emp.status}
              </Badge>
            </td>
          </>
        )}
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredEmployees.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={(sz) => { setPageSize(sz); setCurrentPage(1); }}
      />

      {/* Invite Modal */}
      <Modal isOpen={inviteModalOpen} onClose={() => setInviteModalOpen(false)} title="Invite New Employee" subtitle="Send an onboarding invitation link">
        <div className="space-y-3">
          <Input label="Work Email Address" placeholder="colleague@techstuff.cloud" value={newInviteEmail} onChange={(e) => setNewInviteEmail(e.target.value)} />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setInviteModalOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={() => {
              addToast({ title: 'Invitation Sent', message: `Invite dispatched to ${newInviteEmail}`, type: 'success' });
              setInviteModalOpen(false);
              setNewInviteEmail('');
            }}>Send Invite</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
