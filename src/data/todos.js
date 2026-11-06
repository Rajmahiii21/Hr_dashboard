/**
 * Todos seed data
 */

export const initialTodos = [
  {
    id: 'todo-1',
    title: 'Complete the revision of Topic incl...',
    fullTitle: 'Complete the revision of Topic inclusion for employee handbook & safety policy guidelines 2026',
    description: 'Review updated policies with HR team, verify statutory compliances, and prepare final sign-off documentation.',
    status: 'completed',
    isOverdue: true,
    completedSubtasks: 2,
    totalSubtasks: 2,
    subtasks: [
      { id: 'st-1', text: 'Review section 4 regarding overtime calculations', done: true },
      { id: 'st-2', text: 'Confirm health insurance coverage clauses with legal team', done: true },
    ],
    timeAgo: '8 days ago',
    dueDate: '2026-10-28',
    assignedTo: [
      { name: 'Raj Maheshwari', avatar: 'R', color: '#4F46E5' },
      { name: 'Admin', avatar: 'A', color: '#059669' },
    ],
    priority: 'High',
  },
  {
    id: 'todo-2',
    title: 'Verify pending tax declarations for Q3',
    fullTitle: 'Verify pending tax declarations and HRA rent receipts for Q3 salary processing',
    description: 'Cross-check submitted rent receipts with Form 12BB declarations before November salary lock.',
    status: 'pending',
    isOverdue: false,
    completedSubtasks: 1,
    totalSubtasks: 3,
    subtasks: [
      { id: 'st-3', text: 'Audit high-value HRA submissions (> ₹1L PAN mandatory)', done: true },
      { id: 'st-4', text: 'Flag mismatched employee PAN records', done: false },
      { id: 'st-5', text: 'Send reminder email to unsubmitted personnel', done: false },
    ],
    timeAgo: '2 days ago',
    dueDate: '2026-11-10',
    assignedTo: [
      { name: 'Sara Khan', avatar: 'S', color: '#F59E0B' },
      { name: 'Admin', avatar: 'A', color: '#059669' },
    ],
    priority: 'Medium',
  },
  {
    id: 'todo-3',
    title: 'Update leave policy for Diwali festival week',
    fullTitle: 'Circulate holiday notice & optional floating leave balance update for upcoming festival week',
    description: 'Publish official leave calendar notification and configure automatic attendance exemption rules.',
    status: 'pending',
    isOverdue: false,
    completedSubtasks: 0,
    totalSubtasks: 2,
    subtasks: [
      { id: 'st-6', text: 'Draft CEO broadcast mailer', done: false },
      { id: 'st-7', text: 'Configure portal calendar with declared public holidays', done: false },
    ],
    timeAgo: '1 day ago',
    dueDate: '2026-11-08',
    assignedTo: [
      { name: 'Admin', avatar: 'A', color: '#059669' },
    ],
    priority: 'Urgent',
  },
];
