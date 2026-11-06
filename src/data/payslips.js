/**
 * Payslips seed data for Raj Maheshwari
 */

export const payslipsList = [
  {
    id: 'pay-2026-10',
    month: 'October 2026',
    date: '31 Oct 2026',
    grossEarnings: 125000,
    totalDeductions: 14200,
    netSalary: 110800,
    daysPaid: 31,
    status: 'Paid',
    breakdown: {
      earnings: [
        { name: 'Basic Salary', amount: 62500 },
        { name: 'House Rent Allowance (HRA)', amount: 31250 },
        { name: 'Special Allowance', amount: 25000 },
        { name: 'Statutory Bonus', amount: 6250 },
      ],
      deductions: [
        { name: 'Provident Fund (EPF)', amount: 7500 },
        { name: 'Professional Tax (PT)', amount: 200 },
        { name: 'TDS (Income Tax)', amount: 6500 },
      ],
    },
  },
  {
    id: 'pay-2026-09',
    month: 'September 2026',
    date: '30 Sep 2026',
    grossEarnings: 125000,
    totalDeductions: 14200,
    netSalary: 110800,
    daysPaid: 30,
    status: 'Paid',
    breakdown: {
      earnings: [
        { name: 'Basic Salary', amount: 62500 },
        { name: 'House Rent Allowance (HRA)', amount: 31250 },
        { name: 'Special Allowance', amount: 25000 },
        { name: 'Statutory Bonus', amount: 6250 },
      ],
      deductions: [
        { name: 'Provident Fund (EPF)', amount: 7500 },
        { name: 'Professional Tax (PT)', amount: 200 },
        { name: 'TDS (Income Tax)', amount: 6500 },
      ],
    },
  },
  {
    id: 'pay-2026-08',
    month: 'August 2026',
    date: '31 Aug 2026',
    grossEarnings: 125000,
    totalDeductions: 14200,
    netSalary: 110800,
    daysPaid: 31,
    status: 'Paid',
    breakdown: {
      earnings: [
        { name: 'Basic Salary', amount: 62500 },
        { name: 'House Rent Allowance (HRA)', amount: 31250 },
        { name: 'Special Allowance', amount: 25000 },
        { name: 'Statutory Bonus', amount: 6250 },
      ],
      deductions: [
        { name: 'Provident Fund (EPF)', amount: 7500 },
        { name: 'Professional Tax (PT)', amount: 200 },
        { name: 'TDS (Income Tax)', amount: 6500 },
      ],
    },
  },
];
