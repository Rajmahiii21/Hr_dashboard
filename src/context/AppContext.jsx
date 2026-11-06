import React, { createContext, useContext, useReducer } from 'react';
import { employees as initialEmployees } from '../data/employees';
import { initialPayrollRuns } from '../data/payroll';
import { initialBonusRuns } from '../data/bonuses';
import { initialWageAdvances } from '../data/advances';
import { initialTodos } from '../data/todos';
import { reimbursementsList as initialReimbursements } from '../data/reimbursements';
import { employeeLeaveRequests, regularizationApprovals, adminLeaveRequests } from '../data/leaves';

const AppContext = createContext();

const initialState = {
  employees: initialEmployees,
  payrollRuns: initialPayrollRuns,
  bonusRuns: initialBonusRuns,
  wageAdvances: initialWageAdvances,
  todos: initialTodos,
  reimbursements: initialReimbursements,
  employeeLeaves: employeeLeaveRequests,
  adminLeaves: adminLeaveRequests,
  regularizations: regularizationApprovals,
  toasts: [],
};

function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [action.payload, ...state.todos],
      };

    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload
            ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' }
            : t
        ),
      };

    case 'TOGGLE_SUBTASK': {
      const { todoId, subtaskId } = action.payload;
      return {
        ...state,
        todos: state.todos.map((t) => {
          if (t.id !== todoId) return t;
          const updatedSubtasks = t.subtasks.map((st) =>
            st.id === subtaskId ? { ...st, done: !st.done } : st
          );
          const completedCount = updatedSubtasks.filter((st) => st.done).length;
          return {
            ...t,
            subtasks: updatedSubtasks,
            completedSubtasks: completedCount,
            status: completedCount === updatedSubtasks.length ? 'completed' : 'pending',
          };
        }),
      };
    }

    case 'ADD_PAYROLL_RUN':
      return {
        ...state,
        payrollRuns: [action.payload, ...state.payrollRuns],
      };

    case 'ADD_BONUS_RUN':
      return {
        ...state,
        bonusRuns: [action.payload, ...state.bonusRuns],
      };

    case 'ADD_WAGE_ADVANCE':
      return {
        ...state,
        wageAdvances: [action.payload, ...state.wageAdvances],
      };

    case 'APPROVE_REGULARIZATION':
      return {
        ...state,
        regularizations: state.regularizations.map((r) =>
          r.id === action.payload ? { ...r, status: 'Approved' } : r
        ),
      };

    case 'APPROVE_LEAVE':
      return {
        ...state,
        adminLeaves: state.adminLeaves.map((l) =>
          l.id === action.payload ? { ...l, status: 'Approved' } : l
        ),
      };

    case 'APPROVE_REIMBURSEMENT':
      return {
        ...state,
        reimbursements: state.reimbursements.map((rm) =>
          rm.id === action.payload ? { ...rm, status: 'Approved' } : rm
        ),
      };

    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [...state.toasts, { ...action.payload, id: Date.now() + Math.random() }],
      };

    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.payload),
      };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const addToast = (toast) => {
    dispatch({ type: 'ADD_TOAST', payload: toast });
  };

  const removeToast = (id) => {
    dispatch({ type: 'REMOVE_TOAST', payload: id });
  };

  return (
    <AppContext.Provider value={{ state, dispatch, addToast, removeToast }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppStore() {
  return useContext(AppContext);
}
