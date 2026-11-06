import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Menu,
  Sun,
  Moon,
  Bell,
  Sparkles,
  LayoutGrid,
  Link2Off,
  User,
  Shield,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useRole, ROLES } from '../context/RoleContext';
import Avatar from '../components/ui/Avatar';

export default function Topbar({ onToggleSidebar }) {
  const { theme, toggleTheme } = useTheme();
  const { role, setRole, user, isAdmin } = useRole();
  const location = useLocation();

  // Determine breadcrumb from pathname
  const getBreadcrumbs = () => {
    const path = location.pathname;
    if (path === '/') return ['Overview', 'Dashboard'];
    const parts = path.split('/').filter(Boolean);
    return [
      'HR Portal',
      ...parts.map((p) => p.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())),
    ];
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="h-14 glass-panel border-b border-border px-4 flex items-center justify-between select-none relative z-20">
      {/* Left: Mobile hamburger & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
          className="p-1.5 rounded-xl text-muted hover:text-text hover:bg-surface-hover lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span className="text-border-strong">/</span>}
              <span className={idx === breadcrumbs.length - 1 ? 'text-text font-semibold' : ''}>
                {crumb}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Admin Tally Connect Disconnected Pill */}
        {isAdmin && (
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-hover border border-border text-[11px] text-muted">
            <Link2Off className="w-3.5 h-3.5 text-rose-400" />
            <span>Tally:</span>
            <span className="text-rose-400 font-medium">Disconnected</span>
          </div>
        )}

        {/* Role Switcher Pill */}
        <div className="flex items-center p-0.5 rounded-full bg-surface-hover border border-border">
          <button
            type="button"
            onClick={() => setRole(ROLES.EMPLOYEE)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              role === ROLES.EMPLOYEE
                ? 'bg-accent text-white shadow-glow'
                : 'text-muted hover:text-text'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Employee</span>
          </button>
          <button
            type="button"
            onClick={() => setRole(ROLES.ADMIN)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              role === ROLES.ADMIN
                ? 'bg-accent text-white shadow-glow'
                : 'text-muted hover:text-text'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Admin</span>
          </button>
        </div>

        {/* Grid / Quick action icon */}
        <button
          type="button"
          aria-label="Quick apps"
          className="p-2 rounded-xl text-muted hover:text-text hover:bg-surface-hover transition-colors hidden sm:flex"
        >
          <LayoutGrid className="w-4 h-4" />
        </button>

        {/* Sparkle icon */}
        <button
          type="button"
          aria-label="AI Assistant"
          className="p-2 rounded-xl text-accent hover:bg-accent-soft transition-colors"
        >
          <Sparkles className="w-4 h-4 animate-pulse-subtle" />
        </button>

        {/* Notification Bell with dot and wiggle */}
        <button
          type="button"
          aria-label="Notifications"
          className="p-2 rounded-xl text-muted hover:text-text hover:bg-surface-hover relative transition-colors"
        >
          <Bell className="w-4 h-4 animate-wiggle-once" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-surface" />
        </button>

        {/* Theme Toggle (Moon / Sun) */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          className="p-2 rounded-xl text-muted hover:text-text hover:bg-surface-hover transition-colors"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
        </button>

        {/* User Avatar with Name and Email */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-border">
          <Avatar name={user.name} size="sm" />
          <div className="hidden xl:block text-left">
            <div className="text-xs font-semibold text-text leading-tight truncate max-w-[120px]">
              {user.name}
            </div>
            <div className="text-[10px] text-muted truncate max-w-[120px]">
              {user.email}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
