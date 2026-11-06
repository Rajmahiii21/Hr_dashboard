/**
 * Loans & Advances and Reminders seed data
 */

export const loansList = [
  {
    id: 'ln-1',
    employeeName: 'Raj Maheshwari',
    type: 'Home Appliance Loan',
    principal: 60000,
    tenureMonths: 12,
    emi: 5000,
    paidAmount: 50000,
    outstanding: 10000,
    status: 'Active',
    startDate: 'Jan 2026',
    endDate: 'Dec 2026',
  },
  {
    id: 'ln-2',
    employeeName: 'Raj Maheshwari',
    type: 'Festival Advance 2025',
    principal: 25000,
    tenureMonths: 5,
    emi: 5000,
    paidAmount: 25000,
    outstanding: 0,
    status: 'Settled',
    startDate: 'Oct 2025',
    endDate: 'Feb 2026',
  },
];

export const remindersList = [
  {
    id: 'rem-1',
    title: 'Submit Tax Declarations proof for FY 2026-27',
    dueDate: '15 Nov 2026',
    priority: 'High',
    category: 'Tax & Compliance',
    status: 'Pending',
  },
  {
    id: 'rem-2',
    title: 'Aditi Maheshwari Birthday celebration',
    dueDate: '09 Nov 2026 (in 4d)',
    priority: 'Medium',
    category: 'Team Event',
    status: 'Upcoming',
  },
  {
    id: 'rem-3',
    title: 'Monthly Timesheet & Regularization lock',
    dueDate: '25 Nov 2026',
    priority: 'Urgent',
    category: 'Attendance',
    status: 'Upcoming',
  },
  {
    id: 'rem-4',
    title: 'Quarterly OKR review presentation',
    dueDate: '30 Nov 2026',
    priority: 'Medium',
    category: 'Performance',
    status: 'Upcoming',
  },
];
