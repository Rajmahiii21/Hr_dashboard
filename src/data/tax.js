/**
 * Tax Declaration seed data (November 2026 expected salary)
 */

export const taxOverview = {
  totalEarnings: 8000,
  tdsDeducted: 0,
  totalDeduction: 960,
  netPay: 7040,
  regime: 'New Tax Regime',
  financialYear: 'FY 2026-2027',
};

export const taxChartData = [
  { month: 'Jun', earnings: 8000, deductions: 960, netPay: 7040 },
  { month: 'Jul', earnings: 8000, deductions: 960, netPay: 7040 },
  { month: 'Aug', earnings: 8000, deductions: 960, netPay: 7040 },
  { month: 'Sep', earnings: 8000, deductions: 960, netPay: 7040 },
  { month: 'Oct', earnings: 8000, deductions: 960, netPay: 7040 },
  { month: 'Nov', earnings: 8000, deductions: 960, netPay: 7040 },
];

export const taxDeductions80C = [
  { section: '80C', name: 'Employee Provident Fund (EPF)', declared: 11520, approved: 11520, maxLimit: 150000 },
  { section: '80C', name: 'Public Provident Fund (PPF)', declared: 50000, approved: 50000, maxLimit: 150000 },
  { section: '80C', name: 'Life Insurance Premium', declared: 24000, approved: 24000, maxLimit: 150000 },
  { section: '80D', name: 'Health Insurance (Self & Parents)', declared: 25000, approved: 25000, maxLimit: 50000 },
  { section: '80CCD', name: 'National Pension Scheme (NPS)', declared: 50000, approved: 50000, maxLimit: 50000 },
];

export const hraDeclarations = [
  {
    period: 'Apr 2026 - Mar 2027',
    monthlyRent: 18000,
    city: 'Bhopal (Non-Metro)',
    landlordName: 'Rameshwar Sharma',
    landlordPan: 'ABCDE1234F',
    status: 'Verified',
  },
];
