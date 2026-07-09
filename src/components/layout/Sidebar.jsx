import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Layers, Key, Shield, Users, Building, Globe, GraduationCap,
  BookOpen, FileText, User, Settings, Calendar, ClipboardList, DollarSign, Briefcase,
  ChevronLeft, ChevronRight, Sun, Moon, LogOut
} from 'lucide-react';
import Logo from '@/components/ui/Logo.jsx';
import { useTheme } from '@/context/ThemeContext.jsx';
import { useAuth } from '@/context/AuthContext.jsx';

const navigationGroups = [
  {
    items: [
      { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard }
    ]
  },
  {
    section: 'Access Control',
    items: [
      { path: '/dashboard/modules', label: 'Modules', icon: Layers },
      { path: '/dashboard/permissions', label: 'Permissions', icon: Key },
      { path: '/dashboard/roles-grants', label: 'Roles & Grants', icon: Shield },
      { path: '/dashboard/users', label: 'Users', icon: Users }
    ]
  },
  {
    section: 'Directory',
    items: [
      { path: '/dashboard/organisations', label: 'Organisations', icon: Building },
      { path: '/dashboard/domains', label: 'Domains', icon: Globe },
      { path: '/dashboard/parents', label: 'Parents', icon: Users },
      { path: '/dashboard/learners', label: 'Learners', icon: GraduationCap },
      { path: '/dashboard/batches', label: 'Batches', icon: Layers },
      { path: '/dashboard/courses', label: 'Courses', icon: BookOpen }
    ]
  },
  {
    section: 'Governance',
    items: [
      { path: '/dashboard/audit-log', label: 'Audit Log', icon: FileText }
    ]
  },
  {
    section: 'Account',
    items: [
      { path: '/dashboard/profile', label: 'Profile', icon: User }
    ]
  },
  {
    section: 'Modules',
    items: [
      { path: '/dashboard/administration', label: 'Administration', icon: Settings },
      { path: '/dashboard/scheduling', label: 'Scheduling', icon: Calendar },
      { path: '/dashboard/assessment', label: 'Assessment', icon: ClipboardList },
      { path: '/dashboard/finance', label: 'Finance', icon: DollarSign },
      { path: '/dashboard/trainer', label: 'Trainer', icon: Briefcase }
    ]
  }
];

export default function Sidebar({ isCollapsed, setIsCollapsed, isMobile = false, onClose }) {
  const { theme, toggleTheme } = useTheme();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const initials = currentUser
    ? currentUser.name
      .split(' ')
      .filter(Boolean)
      .map(n => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
    : 'U';

  // Filter navigationGroups based on user role
  const filteredGroups = navigationGroups.map(group => {
    if (!currentUser || currentUser.role === 'admin' || currentUser.role === 'superadmin') {
      return group;
    }

    if (currentUser.role === 'trainer') {
      const allowedPaths = [
        '/dashboard',
        '/dashboard/courses',
        '/dashboard/trainer',
        '/dashboard/scheduling',
        '/dashboard/administration',
        '/dashboard/profile'
      ];
      const items = group.items.filter(item => allowedPaths.includes(item.path));
      return items.length > 0 ? { ...group, items } : null;
    }

    if (currentUser.role === 'student') {
      const allowedPaths = [
        '/dashboard',
        '/dashboard/courses',
        '/dashboard/profile',
        '/dashboard/assessment'
      ];
      const items = group.items.filter(item => allowedPaths.includes(item.path));
      return items.length > 0 ? { ...group, items } : null;
    }

    return group;
  }).filter(Boolean);

  return (
    <aside className={`h-screen bg-white dark:bg-[#11050F] text-black dark:text-white flex flex-col justify-between transition-all duration-300 relative border-r border-medium-grey dark:border-white/5 shadow-lg dark:shadow-2xl ${isCollapsed ? 'w-24' : 'w-64'} ${isMobile ? 'border-r-0 shadow-none' : ''}`}>

      {/* Collapse Toggle */}
      {!isMobile && (
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-6 h-6 w-6 rounded-full bg-cta-orange text-white flex items-center justify-center shadow-lg border border-white/10 hover:scale-115 transition duration-150 cursor-pointer z-50"
        >
          {isCollapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
        </button>
      )}

      <div className="p-4 flex-1 flex flex-col overflow-y-auto sleek-scrollbar">
        {/* Logo and Org Name */}
        <div className={`flex items-center mb-8 ${isCollapsed ? 'justify-center p-0 bg-transparent border-transparent shadow-none' : 'gap-3 bg-[#FFFFFF] dark:bg-[#11050F] p-2.5 rounded-xl shadow-md border border-medium-grey/40 dark:border-transparent justify-start'}`}>
          <Logo className={isCollapsed ? 'h-7 w-7' : 'h-8'} iconOnly={isCollapsed} />
          {!isCollapsed && (
            <div className="text-black dark:text-white leading-tight select-none">
              <h3 className="text-xs font-extrabold tracking-wider text-tranquil-velvet">XebiaLMS</h3>
              <p className="text-[10px] text-dark-grey font-medium">Platform Console</p>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="space-y-4">
          {filteredGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1">
              {group.section && !isCollapsed && (
                <div className="text-[9px] font-extrabold text-text-secondary uppercase tracking-widest px-3.5 pt-2 pb-1 select-none opacity-80">
                  {group.section}
                </div>
              )}
              {group.items.map(item => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/dashboard'}
                    onClick={() => {
                      if (isMobile && onClose) {
                        onClose();
                      }
                    }}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer group relative ${isCollapsed ? 'justify-center' : 'justify-start'
                      } ${isActive
                        ? 'bg-tranquil-velvet/10 text-tranquil-velvet border-l-4 border-cta-orange font-bold shadow-xs dark:bg-white/10 dark:text-white dark:shadow-inner'
                        : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary dark:text-text-secondary dark:hover:bg-bg-hover dark:hover:text-text-primary'
                      }`
                    }
                  >
                    <Icon className="h-4.5 w-4.5 shrink-0" />
                    {!isCollapsed && <span>{item.label}</span>}

                    {/* Tooltip when collapsed */}
                    {isCollapsed && (
                      <div className="absolute left-20 scale-0 group-hover:scale-100 transition duration-150 origin-left bg-black/90 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-md shadow-md z-50 whitespace-nowrap pointer-events-none">
                        {item.label}
                      </div>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>

      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-medium-grey dark:border-white/5 bg-[#F7F8FC]/50 dark:bg-black/10 flex flex-col gap-2 shrink-0">
        {/* Profile Card */}
        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-tranquil-velvet to-bright-velvet border-2 border-cta-orange/40 flex items-center justify-center text-white font-extrabold shadow-md shrink-0 uppercase select-none">
            {initials}
          </div>
          {!isCollapsed && (
            <div className="leading-tight">
              <h4 className="text-xs font-bold text-black dark:text-white">{currentUser ? currentUser.name : 'Guest User'}</h4>
              <p className="text-[10px] text-dark-grey dark:text-white/55 font-medium">{currentUser ? currentUser.title : 'Visitor'}</p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className={`flex gap-1.5 mt-2 ${isCollapsed ? 'flex-col items-center' : 'flex-row'}`}>
          <button
            onClick={toggleTheme}
            className={`p-2.5 bg-[#F7F8FC] dark:bg-white/5 hover:bg-medium-grey/40 dark:hover:bg-white/10 text-dark-grey dark:text-white/80 hover:text-black dark:hover:text-white rounded-xl border border-medium-grey/30 dark:border-white/5 transition flex items-center justify-center cursor-pointer ${isCollapsed ? 'w-10 h-10' : 'flex-1 gap-1.5 text-xs font-semibold'}`}
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
            {!isCollapsed && <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>

          <button
            onClick={() => {
              logout();
              navigate('/home');
            }}
            className={`p-2.5 bg-[#F7F8FC] dark:bg-white/5 hover:bg-medium-grey/40 dark:hover:bg-white/10 text-dark-grey dark:text-white/80 hover:text-red-500 dark:hover:text-red-400 rounded-xl border border-medium-grey/30 dark:border-white/5 transition flex items-center justify-center cursor-pointer ${isCollapsed ? 'w-10 h-10' : 'flex-1 gap-1.5 text-xs font-semibold'}`}
            title="Exit Portal"
          >
            <LogOut className="h-4 w-4" />
            {!isCollapsed && <span>Exit</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
