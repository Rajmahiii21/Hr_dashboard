/**
 * Deterministic seed data: 108 employee records
 */

const baseEmployees = [
  {
    id: 'emp-1',
    name: 'Admin',
    code: 'TECH-02',
    email: 'demo.admin@gmail.com',
    designation: 'N/A',
    department: 'Engineering',
    businessUnit: 'Bhopal Madhya Pradesh',
    status: 'active',
    type: 'Full-time',
    avatar: 'AD',
    joiningDate: '2023-01-15',
  },
  {
    id: 'emp-2',
    name: 'Aman',
    code: 'DEMO-0043',
    email: 'aman@techstuff.cloud',
    designation: 'BDE',
    department: 'Product Management',
    businessUnit: 'Headquarters',
    status: 'active',
    type: 'Full-time',
    avatar: 'AM',
    joiningDate: '2023-03-20',
  },
  {
    id: 'emp-3',
    name: 'Amit Jain',
    code: 'DEMO-0010',
    email: 'amit.malhotra10@example.com',
    designation: 'Software Engineer',
    department: 'Product Management',
    businessUnit: 'Headquarters',
    status: 'invited',
    type: 'Full-time',
    avatar: 'AJ',
    joiningDate: '2023-04-10',
  },
  {
    id: 'emp-4',
    name: 'Raj Maheshwari',
    code: 'TECH-0064',
    email: 'rajm93415@gmail.com',
    designation: 'Senior Frontend Engineer',
    department: 'Engineering',
    businessUnit: 'Headquarters',
    status: 'active',
    type: 'Full-time',
    avatar: 'RM',
    joiningDate: '2023-02-01',
  },
  {
    id: 'emp-5',
    name: 'Aditi Maheshwari',
    code: 'TECH-0065',
    email: 'aditi.m@techstuff.cloud',
    designation: 'UI/UX Designer',
    department: 'Product Management',
    businessUnit: 'Headquarters',
    status: 'active',
    type: 'Full-time',
    avatar: 'AM',
    joiningDate: '2025-11-17',
  },
  {
    id: 'emp-6',
    name: 'Sara Khan',
    code: 'DEMO-0008',
    email: 'sara.k@techstuff.cloud',
    designation: 'HR Specialist',
    department: 'HR',
    businessUnit: 'Headquarters',
    status: 'active',
    type: 'Full-time',
    avatar: 'SK',
    joiningDate: '2024-02-14',
  },
  {
    id: 'emp-7',
    name: 'Diya Joshi',
    code: 'DEMO-0006',
    email: 'diya.j@techstuff.cloud',
    designation: 'Financial Analyst',
    department: 'Finance',
    businessUnit: 'Headquarters',
    status: 'active',
    type: 'Full-time',
    avatar: 'DJ',
    joiningDate: '2024-05-19',
  },
  {
    id: 'emp-8',
    name: 'Riya Ahuja',
    code: 'DEMO-1018',
    email: 'riya.ahuja@techstuff.cloud',
    designation: 'Customer Success',
    department: 'Support',
    businessUnit: 'Bhopal Madhya Pradesh',
    status: 'active',
    type: 'Full-time',
    avatar: 'RA',
    joiningDate: '2024-06-01',
  },
  {
    id: 'emp-9',
    name: 'Bharat Sharma',
    code: 'DEMO-1019',
    email: 'bharat.s@techstuff.cloud',
    designation: 'QA Engineer',
    department: 'Engineering',
    businessUnit: 'Bhopal Madhya Pradesh',
    status: 'active',
    type: 'Full-time',
    avatar: 'BS',
    joiningDate: '2024-07-15',
  },
  {
    id: 'emp-10',
    name: 'Kuch bhi HR',
    code: 'DEMO-0018',
    email: 'kuchbhi.hr@techstuff.cloud',
    designation: 'HR Coordinator',
    department: 'HR',
    businessUnit: 'Headquarters',
    status: 'active',
    type: 'Contract',
    avatar: 'KH',
    joiningDate: '2024-08-01',
  },
];

const firstNames = ['Rohit', 'Pooja', 'Vikram', 'Neha', 'Sanjay', 'Ananya', 'Kunal', 'Simran', 'Arjun', 'Meera', 'Rohan', 'Tanvi', 'Deepak', 'Isha', 'Varun', 'Kavita', 'Manish', 'Shreya', 'Gaurav', 'Nidhi'];
const lastNames = ['Verma', 'Patel', 'Kapoor', 'Reddy', 'Chopra', 'Nair', 'Bhatia', 'Singh', 'Deshmukh', 'Saxena', 'Mehta', 'Gupta', 'Rao', 'Iyer', 'Agarwal', 'Pandey', 'Kulkarni', 'Jadhav', 'Yadav', 'Malhotra'];
const departments = ['Engineering', 'Product Management', 'Sales', 'HR', 'Finance', 'Support'];
const units = ['Headquarters', 'Bhopal Madhya Pradesh', 'Bengaluru Branch', 'Mumbai Hub'];
const designations = [
  'Software Engineer', 'Senior Software Engineer', 'DevOps Specialist', 'Frontend Developer',
  'Product Manager', 'QA Analyst', 'Sales Executive', 'Account Manager', 'Content Strategist',
  'Talent Acquisition Lead', 'Payroll Executive', 'Systems Analyst', 'Operations Associate'
];

export const employees = [...baseEmployees];

// Generate deterministic remaining records to reach exactly 108
for (let i = baseEmployees.length + 1; i <= 108; i++) {
  const fn = firstNames[(i * 7) % firstNames.length];
  const ln = lastNames[(i * 11) % lastNames.length];
  const dept = departments[(i * 3) % departments.length];
  const desig = designations[(i * 5) % designations.length];
  const bu = units[(i * 2) % units.length];
  const isInvited = i % 9 === 0;
  const isPending = i % 17 === 0;
  const status = isInvited ? 'invited' : isPending ? 'pending' : 'active';
  const type = i % 6 === 0 ? 'Contract' : i % 8 === 0 ? 'Part-time' : 'Full-time';
  const codeNum = String(i).padStart(4, '0');

  employees.push({
    id: `emp-${i}`,
    name: `${fn} ${ln}`,
    code: `DEMO-${codeNum}`,
    email: `${fn.toLowerCase()}.${ln.toLowerCase()}${i}@example.com`,
    designation: desig,
    department: dept,
    businessUnit: bu,
    status: status,
    type: type,
    avatar: `${fn[0]}${ln[0]}`,
    joiningDate: `2024-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
  });
}
