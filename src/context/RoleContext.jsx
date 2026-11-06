import React, { createContext, useContext, useEffect, useState } from 'react';

const RoleContext = createContext();

export const ROLES = {
  EMPLOYEE: 'employee',
  ADMIN: 'admin',
};

export const USER_PROFILES = {
  [ROLES.EMPLOYEE]: {
    role: ROLES.EMPLOYEE,
    name: 'Raj Maheshwari',
    email: 'rajm93415@gmail.com',
    code: 'TECH-0064',
    designation: 'Software Engineer',
    department: 'Engineering',
    accent: '#4F46E5',
    avatar: 'RM',
  },
  [ROLES.ADMIN]: {
    role: ROLES.ADMIN,
    name: 'Admin',
    email: 'demo.admin@gmail.com',
    code: 'TECH-02',
    designation: 'HR Administrator',
    department: 'Management',
    accent: '#059669',
    avatar: 'AD',
  },
};

export function RoleProvider({ children }) {
  const [role, setRole] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const qRole = params.get('role');
    if (qRole === ROLES.ADMIN || qRole === ROLES.EMPLOYEE) return qRole;

    const saved = localStorage.getItem('techstuff_role');
    return saved === ROLES.ADMIN ? ROLES.ADMIN : ROLES.EMPLOYEE;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-role', role);
    localStorage.setItem('techstuff_role', role);
  }, [role]);

  const switchRole = (newRole) => {
    if (newRole in USER_PROFILES) {
      setRole(newRole);
    }
  };

  const user = USER_PROFILES[role];

  return (
    <RoleContext.Provider value={{ role, setRole: switchRole, user, isAdmin: role === ROLES.ADMIN }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  return useContext(RoleContext);
}
