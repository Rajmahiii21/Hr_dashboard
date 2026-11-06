import React from 'react';
import { useRole } from '../context/RoleContext';
import EmployeeDashboard from './employee/Dashboard';
import AdminDashboard from './admin/Dashboard';

export default function DashboardDispatcher() {
  const { isAdmin } = useRole();

  return isAdmin ? <AdminDashboard /> : <EmployeeDashboard />;
}
