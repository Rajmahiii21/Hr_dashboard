/**
 * Wage Advances seed data
 * Total Issued: ₹21,000, Outstanding: ₹11,000, Active: 3 / 5
 */

export const initialWageAdvances = [
  {
    id: 'wa-1',
    employeeName: 'riya ahuja',
    employeeCode: 'DEMO-1018',
    dateIssued: '29/10/2026',
    amount: 2000,
    recovered: 0,
    outstanding: 2000,
    reason: 'Medical expense emergency',
    status: 'Pending',
    month: 'Oct',
  },
  {
    id: 'wa-2',
    employeeName: 'Bharat Sharma',
    employeeCode: 'DEMO-1019',
    dateIssued: '29/10/2026',
    amount: 3000,
    recovered: 0,
    outstanding: 3000,
    reason: 'Home relocation support',
    status: 'Pending',
    month: 'Oct',
  },
  {
    id: 'wa-3',
    employeeName: 'Kuch bhi HR',
    employeeCode: 'DEMO-0018',
    dateIssued: '29/10/2026',
    amount: 1000,
    recovered: 0,
    outstanding: 1000,
    reason: 'Travel allowance advance',
    status: 'Pending',
    month: 'Oct',
  },
  {
    id: 'wa-4',
    employeeName: 'Amit Jain',
    employeeCode: 'DEMO-0010',
    dateIssued: '15/09/2026',
    amount: 10000,
    recovered: 5000,
    outstanding: 5000,
    reason: 'Tuition certification advance',
    status: 'Partially Recovered',
    month: 'Sep',
  },
  {
    id: 'wa-5',
    employeeName: 'Aman',
    employeeCode: 'DEMO-0043',
    dateIssued: '10/08/2026',
    amount: 5000,
    recovered: 5000,
    outstanding: 0,
    reason: 'Laptop repair advance',
    status: 'Settled',
    month: 'Aug',
  },
];

export const advancesChartData = [
  { month: 'Jun', issued: 4000, recovered: 4000 },
  { month: 'Jul', issued: 6000, recovered: 5000 },
  { month: 'Aug', issued: 5000, recovered: 5000 },
  { month: 'Sep', issued: 10000, recovered: 5000 },
  { month: 'Oct', issued: 6000, recovered: 0 },
];
