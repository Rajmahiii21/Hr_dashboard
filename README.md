# Techstuff Pvt Ltd. - HR Management Dashboard Redesign

A high-performance, dark teal glass HR Management Web Application built with React 18, Vite, Tailwind CSS v3, Framer Motion, and Recharts.

---

## 🚀 Commands to Run

```bash
npm create vite@latest hr-dashboard -- --template react
cd hr-dashboard
npm install
npm install react-router-dom framer-motion recharts lucide-react clsx
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
npm run dev        # (opens http://localhost:5173)
npm run build
npm run preview
```

---

## 🌟 Key Architecture & Features

### 1. The #1 Layout Rule: Strictly ABOVE THE FOLD
At 1366x768 and 1440x900 viewports, the following are 100% visible without scrolling:
- Top Navigation Bar (56px)
- One-line Greeting Header (36-40px)
- The Chart Row (Main 8 cols, Secondary 4 cols, ~300px height with explicit container constraints)
- The KPI Card Row (~112px height with sparklines)
All secondary lists, approvals, team birthdays, and tables sit comfortably below the fold and animate smoothly into view upon scrolling.

### 2. Dual Roles & Reactive Accent Transitions
- **Employee**: "Raj Maheshwari" (`rajm93415@gmail.com`), Indigo accent (`#4F46E5`).
- **Admin**: "Admin" (`demo.admin@gmail.com`), Emerald accent (`#059669`), with disconnected "Tally Connect" status pill.
- Role switch cross-fades the `--accent` and `--accent-soft` CSS variables over 400ms and persists in `localStorage`.

### 3. Physical & Intentional Animation Choreography
- **`<AnimatedNumber />`**: Races up from 0 on every mount using `requestAnimationFrame` with an `easeOutExpo` curve (`ease = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)`). Enforces `tabular-nums` font metrics and Indian locale formatting (`en-IN`).
- **Custom Recharts**: Smooth monotone splines, linear gradient opacity fills, hover dimming, custom glassmorphism tooltips, and live sparklines.
- **Micro-Interactions**: Pulsing "ON DUTY" live badge, notification bell wiggle on load, sliding pill indicators via `layoutId`, and shine sweep on primary buttons.
- **Accessibility**: Full `prefers-reduced-motion` compliance, Esc modal dismissal, and ARIA labels.

---

## 📁 Project Folder Structure

```
hr-dashboard/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── README.md
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── routes.jsx
│   ├── index.css
│   ├── context/
│   │   ├── AppContext.jsx          # Central store with useReducer & Toast dispatcher
│   │   ├── RoleContext.jsx         # Employee & Admin switching + persistent state
│   │   └── ThemeContext.jsx        # Dark/Light theme toggle with View Transitions
│   ├── hooks/
│   │   ├── useCountUp.js
│   │   └── useSimulatedFetch.js
│   ├── utils/
│   │   ├── format.js               # Indian currency (₹), numbers, and dates
│   │   └── motion.js               # Shared spring choreography & stagger variants
│   ├── layouts/
│   │   ├── AppLayout.jsx           # Shell with 56px topbar & h-[calc(100vh-56px)] container
│   │   ├── Sidebar.jsx             # Collapsible (260px -> 76px) navigation drawer
│   │   └── Topbar.jsx              # Role pill, theme toggle, and user details
│   ├── components/
│   │   ├── motion/
│   │   │   ├── AnimatedNumber.jsx  # RAF easeOutExpo count-up with tabular nums
│   │   │   ├── PageTransition.jsx  # Route entrance/exit transition
│   │   │   ├── Reveal.jsx          # Scroll whileInView trigger
│   │   │   └── Stagger.jsx         # Staggered children container
│   │   ├── charts/
│   │   │   ├── AnimatedAreaChart.jsx # Recharts monotone gradient area chart
│   │   │   ├── AnimatedBarChart.jsx  # Recharts staggered bar chart with hover dimming
│   │   │   ├── AnimatedDonut.jsx     # PieChart with center count-up & sliding legend
│   │   │   ├── Sparkline.jsx         # Lightweight SVG sparkline
│   │   │   ├── ChartTooltip.jsx      # Glassmorphism tooltip with tabular numbers
│   │   │   └── RangeToggle.jsx       # 7D / 1M / 6M animated segmented toggle
│   │   └── ui/
│   │       ├── Card.jsx              # Glass card with hover lift & glow
│   │       ├── StatCard.jsx          # 112px compact KPI card
│   │       ├── Badge.jsx             # Tag badges with live pulsing option
│   │       ├── Button.jsx            # Interactive button with shine sweep
│   │       ├── Modal.jsx             # Accessible modal with spring entrance & Esc listener
│   │       ├── Toast.jsx             # Top-right slide-in with 3s progress bar
│   │       ├── Tabs.jsx              # Sliding underline and pill tab indicators
│   │       ├── Table.jsx             # 30ms staggered table row entrance
│   │       ├── Pagination.jsx        # Pagination with page size selector
│   │       ├── Input.jsx             # Input & Select controls
│   │       ├── Avatar.jsx            # User avatar with fallback initials
│   │       └── EmptyState.jsx        # Empty state, Skeleton & animated Stepper
│   ├── data/
│   │   ├── employees.js              # Deterministic 108 employee records
│   │   ├── payroll.js                # Initial runs, Net Pay ₹240.38 Cr, charts
│   │   ├── bonuses.js                # 10 runs summing to exact ₹3,45,500
│   │   ├── advances.js               # Exact ₹21,000 issued & ₹11,000 outstanding
│   │   ├── todos.js                  # Initial todos, subtasks & assignments
│   │   ├── dashboard.js              # Attendance trends, weekly hours, holidays
│   │   ├── tax.js                    # Earnings ₹8,000, Deductions ₹960, Net ₹7,040
│   │   ├── attendance.js             # November 2026 daily calendar punches
│   │   ├── leaves.js                 # Leave balances & regularization queue
│   │   ├── payslips.js               # October - August salary statements
│   │   └── loans.js                  # Appliance loan & compliance reminders
│   └── pages/
│       ├── DashboardDispatcher.jsx   # Role-based route dispatcher
│       ├── Playground.jsx            # Animation test bed (/playground)
│       ├── Todos.jsx                 # Two-pane todo manager with progress ring
│       ├── Reminders.jsx             # Compliance & event reminders
│       ├── Regularizations.jsx       # Punch correction approvals
│       ├── Reimbursements.jsx        # 11 pending expense claims & vouchers
│       ├── admin/
│       │   ├── Dashboard.jsx         # Executive analytics dashboard
│       │   ├── Directory.jsx         # 108 employee directory with search & filters
│       │   ├── PayrollRuns.jsx       # Payroll run history & processing
│       │   ├── NewPayrollRun.jsx     # 3-step animated stepper run wizard
│       │   ├── BonusIncentives.jsx   # Out-of-cycle bonuses
│       │   └── WageAdvances.jsx      # Salary advance management
│       └── employee/
│           ├── Dashboard.jsx         # Employee self-service dashboard
│           ├── AttendanceCalendar.jsx# Month grid with diagonal cell stagger
│           ├── TaxDeclaration.jsx    # Regime toggle & Section 80 deductions
│           ├── Leaves.jsx            # Leave applications & quota balance
│           ├── Payslips.jsx          # Downloadable PDF salary slips
│           └── Loans.jsx             # Zero-interest advance programs
```
