/**
 * Dashboard seed data for Employee and Admin views
 */

// Employee Main Chart: Attendance Trend
export const employeeAttendanceTrend = {
  '6M': [
    { period: 'Jun', days: 21, target: 22 },
    { period: 'Jul', days: 22, target: 22 },
    { period: 'Aug', days: 20, target: 21 },
    { period: 'Sep', days: 22, target: 22 },
    { period: 'Oct', days: 21, target: 21 },
    { period: 'Nov', days: 3, target: 4 },
  ],
  '1M': [
    { period: 'Week 1', days: 5, target: 5 },
    { period: 'Week 2', days: 5, target: 5 },
    { period: 'Week 3', days: 5, target: 5 },
    { period: 'Week 4', days: 6, target: 5 },
  ],
  '7D': [
    { period: 'Mon', days: 1, target: 1 },
    { period: 'Tue', days: 1, target: 1 },
    { period: 'Wed', days: 1, target: 1 },
    { period: 'Thu', days: 0, target: 1 },
    { period: 'Fri', days: 0, target: 1 },
    { period: 'Sat', days: 0, target: 0 },
    { period: 'Sun', days: 0, target: 0 },
  ],
};

// Employee Secondary Chart: Weekly Hours Mon-Sun
export const employeeWeeklyHours = [
  { day: 'Mon', hours: 8.0 },
  { day: 'Tue', hours: 7.5 },
  { day: 'Wed', hours: 8.2 },
  { day: 'Thu', hours: 6.8 },
  { day: 'Fri', hours: 8.0 },
  { day: 'Sat', hours: 0 },
  { day: 'Sun', hours: 0 },
];

// Admin Main Chart: Payroll Cost (last 6 months in Lakhs)
export const adminPayrollCostTrend = {
  '6M': [
    { period: 'Jun', cost: 44.52, budget: 46 },
    { period: 'Jul', cost: 45.78, budget: 47 },
    { period: 'Aug', cost: 46.91, budget: 48 },
    { period: 'Sep', cost: 47.82, budget: 49 },
    { period: 'Oct', cost: 48.90, budget: 50 },
    { period: 'Nov', cost: 5.80, budget: 50 },
  ],
  '1M': [
    { period: 'Run 1', cost: 5.69, budget: 6.0 },
    { period: 'Run 2', cost: 0.11, budget: 0.5 },
    { period: 'Run 3', cost: 0.00, budget: 0.2 },
  ],
  '7D': [
    { period: 'Mon', cost: 0.00, budget: 1.0 },
    { period: 'Tue', cost: 0.11, budget: 1.0 },
    { period: 'Wed', cost: 0.00, budget: 1.0 },
    { period: 'Thu', cost: 0.00, budget: 1.0 },
    { period: 'Fri', cost: 5.69, budget: 6.0 },
    { period: 'Sat', cost: 0.00, budget: 0 },
    { period: 'Sun', cost: 0.00, budget: 0 },
  ],
};

// Admin Secondary Chart: Department Distribution
export const adminDepartmentDistribution = [
  { department: 'Engineering', count: 42, color: '#4F46E5' },
  { department: 'Product Mgmt', count: 24, color: '#059669' },
  { department: 'Sales', count: 18, color: '#0EA5E9' },
  { department: 'HR', count: 10, color: '#F59E0B' },
  { department: 'Finance', count: 8, color: '#A855F7' },
  { department: 'Support', count: 6, color: '#EC4899' },
];

// Admin Headcount Growth
export const adminHeadcountGrowth = [
  { month: 'Jun', count: 92 },
  { month: 'Jul', count: 96 },
  { month: 'Aug', count: 101 },
  { month: 'Sep', count: 104 },
  { month: 'Oct', count: 106 },
  { month: 'Nov', count: 108 },
];

// Admin Attendance Today Donut
export const adminAttendanceToday = [
  { name: 'Present', value: 88, color: '#059669' },
  { name: 'Absent', value: 8, color: '#EF4444' },
  { name: 'On Leave', value: 7, color: '#F59E0B' },
  { name: 'WFH', value: 5, color: '#0EA5E9' },
];

// Sparkline series for KPI cards
export const sparklineData = {
  attendance: [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1],
  logged: [7.5, 8.0, 8.2, 7.8, 8.0, 0, 0, 8.1, 7.9, 8.0],
  leave: [24, 23, 23, 22, 22, 20, 20, 19, 18, 18],
  approvals: [4, 6, 9, 8, 11, 12, 14, 15],
};

// Holidays
export const upcomingHolidays = [
  { name: 'Guru Nanak Jayanti', date: '15 Nov 2026', day: 'Sunday', type: 'Gazetted' },
  { name: 'Christmas Day', date: '25 Dec 2026', day: 'Friday', type: 'Gazetted' },
  { name: 'New Year Day', date: '01 Jan 2027', day: 'Friday', type: 'Restricted' },
  { name: 'Republic Day', date: '26 Jan 2027', day: 'Tuesday', type: 'Gazetted' },
];
