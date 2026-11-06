/**
 * Leave requests and Regularization Approvals seed data
 */

export const employeeLeaveBalances = {
  available: 0,
  allocated: 0,
  used: 0,
  pending: 0,
};

export const employeeLeaveRequests = [
  {
    id: 'lr-1',
    type: 'Casual Leave',
    startDate: '2026-10-14',
    endDate: '2026-10-14',
    days: 1,
    reason: 'Family personal commitment',
    status: 'Approved',
    appliedOn: '2026-10-10',
    approvedBy: 'Admin',
  },
  {
    id: 'lr-2',
    type: 'Sick Leave',
    startDate: '2026-08-22',
    endDate: '2026-08-23',
    days: 2,
    reason: 'Viral fever recovery',
    status: 'Approved',
    appliedOn: '2026-08-21',
    approvedBy: 'Admin',
  },
];

export const regularizationApprovals = [
  {
    id: 'reg-1',
    employeeName: 'Aman',
    employeeCode: 'DEMO-0043',
    date: '2026-11-03',
    originalCheckIn: '10:45 AM',
    requestedCheckIn: '09:30 AM',
    reason: 'Biometric fingerprint reader timeout on entry',
    status: 'Pending',
    type: 'Check-in Regularization',
  },
  {
    id: 'reg-2',
    employeeName: 'Sara Khan',
    employeeCode: 'DEMO-0008',
    date: '2026-11-02',
    originalCheckIn: '-',
    requestedCheckIn: '09:15 AM',
    reason: 'Client meeting onsite in morning session',
    status: 'Pending',
    type: 'Full Day Regularization',
  },
  {
    id: 'reg-3',
    employeeName: 'Bharat Sharma',
    employeeCode: 'DEMO-1019',
    date: '2026-10-30',
    originalCheckIn: '07:30 PM (No out swipe)',
    requestedCheckIn: '06:15 PM',
    reason: 'Emergency power trip during office checkout',
    status: 'Pending',
    type: 'Check-out Regularization',
  },
];

export const adminLeaveRequests = [
  {
    id: 'alr-1',
    employeeName: 'Amit Jain',
    employeeCode: 'DEMO-0010',
    type: 'Privilege Leave',
    dates: '12 Nov - 14 Nov 2026',
    days: 3,
    reason: 'Wedding ceremony in family',
    status: 'Pending',
    appliedOn: '2026-11-04',
  },
  {
    id: 'alr-2',
    employeeName: 'Diya Joshi',
    employeeCode: 'DEMO-0006',
    type: 'Casual Leave',
    dates: '18 Nov 2026',
    days: 1,
    reason: 'Personal urgent appointment',
    status: 'Pending',
    appliedOn: '2026-11-05',
  },
  {
    id: 'alr-3',
    employeeName: 'Riya Ahuja',
    employeeCode: 'DEMO-1018',
    type: 'Sick Leave',
    dates: '09 Nov 2026',
    days: 1,
    reason: 'Doctor consultation',
    status: 'Pending',
    appliedOn: '2026-11-05',
  },
];
