import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AppLayout from './layouts/AppLayout';
import PageTransition from './components/motion/PageTransition';

import DashboardDispatcher from './pages/DashboardDispatcher';
import Playground from './pages/Playground';
import Directory from './pages/admin/Directory';
import PayrollRuns from './pages/admin/PayrollRuns';
import NewPayrollRun from './pages/admin/NewPayrollRun';
import BonusIncentives from './pages/admin/BonusIncentives';
import WageAdvances from './pages/admin/WageAdvances';
import TaxDeclaration from './pages/employee/TaxDeclaration';
import Todos from './pages/Todos';
import Reminders from './pages/Reminders';
import Leaves from './pages/employee/Leaves';
import Regularizations from './pages/Regularizations';
import AttendanceCalendar from './pages/employee/AttendanceCalendar';
import Payslips from './pages/employee/Payslips';
import Reimbursements from './pages/Reimbursements';
import Loans from './pages/employee/Loans';

export default function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<AppLayout />}>
          <Route
            path="/"
            element={
              <PageTransition>
                <DashboardDispatcher />
              </PageTransition>
            }
          />
          <Route
            path="/playground"
            element={
              <PageTransition>
                <Playground />
              </PageTransition>
            }
          />
          <Route
            path="/directory"
            element={
              <PageTransition>
                <Directory />
              </PageTransition>
            }
          />
          <Route
            path="/payroll/runs"
            element={
              <PageTransition>
                <PayrollRuns />
              </PageTransition>
            }
          />
          <Route
            path="/payroll/new"
            element={
              <PageTransition>
                <NewPayrollRun />
              </PageTransition>
            }
          />
          <Route
            path="/payroll/bonus"
            element={
              <PageTransition>
                <BonusIncentives />
              </PageTransition>
            }
          />
          <Route
            path="/payroll/advances"
            element={
              <PageTransition>
                <WageAdvances />
              </PageTransition>
            }
          />
          <Route
            path="/tax-declaration"
            element={
              <PageTransition>
                <TaxDeclaration />
              </PageTransition>
            }
          />
          <Route
            path="/todos"
            element={
              <PageTransition>
                <Todos />
              </PageTransition>
            }
          />
          <Route
            path="/todos/:filter"
            element={
              <PageTransition>
                <Todos />
              </PageTransition>
            }
          />
          <Route
            path="/reminders"
            element={
              <PageTransition>
                <Reminders />
              </PageTransition>
            }
          />
          <Route
            path="/leaves"
            element={
              <PageTransition>
                <Leaves />
              </PageTransition>
            }
          />
          <Route
            path="/regularizations"
            element={
              <PageTransition>
                <Regularizations />
              </PageTransition>
            }
          />
          <Route
            path="/attendance"
            element={
              <PageTransition>
                <AttendanceCalendar />
              </PageTransition>
            }
          />
          <Route
            path="/payslips"
            element={
              <PageTransition>
                <Payslips />
              </PageTransition>
            }
          />
          <Route
            path="/reimbursements"
            element={
              <PageTransition>
                <Reimbursements />
              </PageTransition>
            }
          />
          <Route
            path="/loans"
            element={
              <PageTransition>
                <Loans />
              </PageTransition>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
