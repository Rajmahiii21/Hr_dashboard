import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  LayoutDashboard,
  CheckSquare,
  BellRing,
  FileSpreadsheet,
  CalendarCheck,
  CalendarDays,
  Receipt,
  ReceiptIndianRupee,
  BadgePercent,
  Users,
  Coins,
  ChevronDown,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { useRole, ROLES } from '../context/RoleContext';

export default function Sidebar({ collapsed, setCollapsed }) {
  const { role, isAdmin } = useRole();
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  // Submenu states
  const [payrollOpen, setPayrollOpen] = useState(true);
  const [leaveOpen, setLeaveOpen] = useState(true);
  const [todosOpen, setTodosOpen] = useState(true);

  const employeeNav = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    {
      label: 'Todos',
      icon: CheckSquare,
      isOpen: todosOpen,
      toggle: () => setTodosOpen(!todosOpen),
      subItems: [
        { label: 'All Tasks', path: '/todos' },
        { label: 'Completed', path: '/todos/completed' },
        { label: 'Pending', path: '/todos/pending' },
      ],
    },
    { label: 'Reminders', path: '/reminders', icon: BellRing },
    { label: 'Tax Declaration', path: '/tax-declaration', icon: FileSpreadsheet },
    {
      label: 'Leave Management',
      icon: CalendarCheck,
      isOpen: leaveOpen,
      toggle: () => setLeaveOpen(!leaveOpen),
      subItems: [
        { label: 'My Leave Requests', path: '/leaves' },
        { label: 'Regularization Approvals', path: '/regularizations' },
      ],
    },
    { label: 'Attendance Calendar', path: '/attendance', icon: CalendarDays },
    { label: 'Payslip', path: '/payslips', icon: Receipt },
    { label: 'Reimbursements', path: '/reimbursements', icon: ReceiptIndianRupee },
    { label: 'Loans & Advances', path: '/loans', icon: Coins },
  ];

  const adminNav = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Employee Directory', path: '/directory', icon: Users },
    {
      label: 'Payroll',
      icon: ReceiptIndianRupee,
      isOpen: payrollOpen,
      toggle: () => setPayrollOpen(!payrollOpen),
      subItems: [
        { label: 'Payroll Runs', path: '/payroll/runs' },
        { label: 'New Payroll Run', path: '/payroll/new' },
        { label: 'Bonus & Incentives', path: '/payroll/bonus' },
        { label: 'Wage Advances', path: '/payroll/advances' },
      ],
    },
    {
      label: 'Todos',
      icon: CheckSquare,
      isOpen: todosOpen,
      toggle: () => setTodosOpen(!todosOpen),
      subItems: [
        { label: 'All Tasks', path: '/todos' },
        { label: 'Completed', path: '/todos/completed' },
        { label: 'Pending', path: '/todos/pending' },
      ],
    },
    { label: 'Reminders', path: '/reminders', icon: BellRing },
    { label: 'Tax Declaration', path: '/tax-declaration', icon: FileSpreadsheet },
    {
      label: 'Leave Management',
      icon: CalendarCheck,
      isOpen: leaveOpen,
      toggle: () => setLeaveOpen(!leaveOpen),
      subItems: [
        { label: 'Leave Requests', path: '/leaves' },
        { label: 'Regularization Approvals', path: '/regularizations' },
      ],
    },
  ];

  const navItems = isAdmin ? adminNav : employeeNav;

  return (
    <motion.aside
      animate={{ width: collapsed ? 76 : 260 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="glass-panel h-screen flex flex-col border-r border-border relative z-30 select-none overflow-hidden"
    >
      {/* Brand Header */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-border flex-shrink-0">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 rounded-xl bg-accent text-white font-black flex items-center justify-center flex-shrink-0 shadow-glow">
            T
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="overflow-hidden whitespace-nowrap"
            >
              <div className="text-xs font-bold text-text tracking-tight truncate leading-tight">
                Techstuff Pvt Ltd.
              </div>
              <div className="text-[10px] text-muted tracking-wider uppercase font-medium">
                HR Management
              </div>
            </motion.div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="p-1 rounded-lg text-muted hover:text-text hover:bg-surface-hover transition-colors hidden lg:flex"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
        {!collapsed && (
          <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-muted">
            Main Menu
          </div>
        )}

        {navItems.map((item, idx) => {
          if (item.subItems) {
            const hasActiveChild = item.subItems.some((sub) => location.pathname === sub.path);
            return (
              <div key={idx} className="space-y-1">
                <button
                  type="button"
                  onClick={item.toggle}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                    hasActiveChild ? 'text-accent bg-accent-soft' : 'text-muted hover:text-text hover:bg-surface-hover'
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  <div className="flex items-center gap-3 truncate">
                    <item.icon className="w-4 h-4 flex-shrink-0" />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </div>
                  {!collapsed && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        item.isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </button>

                {/* Submenu Items */}
                <AnimatePresence initial={false}>
                  {item.isOpen && !collapsed && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden pl-7 pr-1 space-y-0.5"
                    >
                      {item.subItems.map((sub, sIdx) => {
                        const isActive = location.pathname === sub.path;
                        return (
                          <NavLink
                            key={sIdx}
                            to={sub.path}
                            className={`relative block px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors truncate ${
                              isActive
                                ? 'text-accent font-semibold bg-accent-soft'
                                : 'text-muted hover:text-text hover:bg-surface-hover'
                            }`}
                          >
                            {isActive && !shouldReduceMotion && (
                              <motion.div
                                layoutId="sidebarSubPill"
                                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                                className="absolute left-0 top-1 bottom-1 w-1 bg-accent rounded-r"
                              />
                            )}
                            {sub.label}
                          </NavLink>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          }

          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={idx}
              to={item.path}
              title={collapsed ? item.label : undefined}
              className={`relative flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                isActive
                  ? 'text-accent font-semibold bg-accent-soft'
                  : 'text-muted hover:text-text hover:bg-surface-hover'
              }`}
            >
              {isActive && !shouldReduceMotion && (
                <motion.div
                  layoutId="sidebarActivePill"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-accent rounded-r"
                />
              )}
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          );
        })}
      </div>

      {/* Footer / System Status */}
      <div className="p-3 border-t border-border flex-shrink-0">
        <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl bg-surface-hover/70 border border-border">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          {!collapsed && (
            <div className="text-[10px] text-muted truncate">
              HR Cloud Engine <span className="text-text font-semibold">v2.6</span>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
