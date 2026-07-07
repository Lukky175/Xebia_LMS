import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Search, Bell, MessageSquare, Sparkles, LogOut, Settings, HelpCircle, ChevronRight, Menu } from 'lucide-react';
import { useAuth } from '@/context/AuthContext.jsx';

const pathTitleMap = {
  '/dashboard': { title: 'Platform Dashboard', category: 'Platform' },
  '/dashboard/modules': { title: 'Modules Manager', category: 'Access Control' },
  '/dashboard/permissions': { title: 'Permissions Guard', category: 'Access Control' },
  '/dashboard/roles-grants': { title: 'Roles & Grants Controller', category: 'Access Control' },
  '/dashboard/users': { title: 'Users Directory', category: 'Access Control' },
  '/dashboard/organisations': { title: 'Organisations Directory', category: 'Directory' },
  '/dashboard/domains': { title: 'Domain Registry', category: 'Directory' },
  '/dashboard/parents': { title: 'Parents Directory', category: 'Directory' },
  '/dashboard/learners': { title: 'Learners Directory', category: 'Directory' },
  '/dashboard/batches': { title: 'Learners Batches', category: 'Directory' },
  '/dashboard/courses': { title: 'Course Catalog', category: 'Directory' },
  '/dashboard/audit-log': { title: 'System Audit Log', category: 'Governance' },
  '/dashboard/profile': { title: 'Profile Settings', category: 'Account' },
  '/dashboard/administration': { title: 'Administration Panel', category: 'Modules' },
  '/dashboard/scheduling': { title: 'Scheduling Planner', category: 'Modules' },
  '/dashboard/assessment': { title: 'Assessments Engine', category: 'Modules' },
  '/dashboard/finance': { title: 'Finance Center', category: 'Modules' },
  '/dashboard/trainer': { title: 'Trainer Dashboard', category: 'Modules' }
};

export default function Navbar({ onSearchChange, searchValue, onToggleMobileSidebar }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const currentPath = location.pathname;
  const pageMeta = pathTitleMap[currentPath] || { title: 'Dashboard', category: 'Analytics' };
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const initials = currentUser
    ? currentUser.name
        .split(' ')
        .filter(Boolean)
        .map(n => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'U';


  return (
    <header className="h-16 border-b border-medium-grey px-4 sm:px-6 md:px-8 flex items-center justify-between bg-white/80 dark:bg-bg-card/85 backdrop-blur-md sticky top-0 z-30 shrink-0">
      
      {/* Left: Breadcrumbs & Dynamic Title & Hamburger Menu */}
      <div className="flex items-center gap-3 select-none">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 -ml-2 rounded-xl text-dark-grey hover:text-black dark:hover:text-white hover:bg-blueish-grey dark:hover:bg-[#1E1F29] transition cursor-pointer"
          aria-label="Open Sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex flex-col">
          <div className="flex items-center gap-1 text-[10px] font-bold text-dark-grey uppercase tracking-wider">
            <span>Admin</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-tranquil-velvet dark:text-amber-400">{pageMeta.category}</span>
          </div>
          <h1 className="text-base font-extrabold text-black dark:text-white leading-tight">
            {pageMeta.title}
          </h1>
        </div>
      </div>

      {/* Center: Global Search Bar */}
      <div className="flex items-center gap-2 flex-1 max-w-[130px] sm:max-w-xs md:max-w-sm px-2.5 sm:px-3.5 py-1.5 bg-blueish-grey dark:bg-[#1E1F29] border border-medium-grey dark:border-[#2D3043] rounded-xl focus-within:border-tranquil-velvet transition duration-200">
        <Search className="h-4.5 w-4.5 text-dark-grey shrink-0" />
        <input 
          type="text" 
          placeholder="Search..." 
          value={searchValue || ''}
          onChange={onSearchChange}
          className="bg-transparent text-xs text-black dark:text-white placeholder-dark-grey/50 focus:outline-none w-full font-medium"
        />
      </div>

      {/* Right: Actions Menu */}
      <div className="flex items-center gap-2 sm:gap-3 relative">
        {/* AI Assistant Button */}
        <button 
          onClick={() => alert("AI Assistant panel toggled! Under sandbox development.")}
          className="p-2 sm:px-3.5 sm:py-1.5 bg-gradient-to-r from-tranquil-velvet to-bright-velvet hover:opacity-95 text-white text-[11px] font-bold rounded-xl transition duration-150 flex items-center gap-1.5 shadow-md shadow-tranquil-velvet/20 cursor-pointer border border-transparent"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">AI Copilot</span>
        </button>

        <div className="h-6 w-px bg-medium-grey dark:bg-border-card hidden sm:block"></div>

        {/* Messaging button */}
        <button 
          onClick={() => alert("Inbox widget opened! Sandbox simulation active.")}
          className="relative p-2 text-dark-grey hover:text-black dark:hover:text-white transition rounded-xl hover:bg-blueish-grey dark:hover:bg-[#1E1F29] cursor-pointer hidden sm:block"
        >
          <MessageSquare className="h-5 w-5" />
        </button>

        <div className="h-6 w-px bg-medium-grey dark:bg-border-card"></div>

        {/* Notification bell */}
        <button 
          onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
          className="relative p-2 text-dark-grey hover:text-black dark:hover:text-white transition rounded-xl hover:bg-blueish-grey dark:hover:bg-[#1E1F29] cursor-pointer"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-cta-orange rounded-full border-2 border-white dark:border-bg-card"></span>
        </button>

        {/* Notifications Dropdown */}
        {notifDropdownOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setNotifDropdownOpen(false)}></div>
            <div className="absolute right-0 sm:right-12 top-12 w-[calc(100vw-32px)] sm:w-80 bg-white dark:bg-bg-card border border-medium-grey dark:border-border-card rounded-2xl shadow-xl p-4 space-y-3 z-50 animate-in fade-in duration-200">
              <h4 className="text-xs font-extrabold text-black dark:text-white uppercase tracking-wider border-b border-medium-grey/50 pb-2">Recent Notifications</h4>
              <div className="space-y-3 max-h-60 overflow-y-auto sleek-scrollbar pr-2">
                <div className="text-[11px] leading-relaxed text-dark-grey border-b border-medium-grey/30 pb-2">
                  <p className="font-bold text-black dark:text-white">🚀 System Peak Warning</p>
                  <p className="mt-0.5">Server workload hit 88% due to active DevOps sandboxes.</p>
                  <span className="text-[9px] text-dark-grey/60 block mt-1">2 mins ago</span>
                </div>
                <div className="text-[11px] leading-relaxed text-dark-grey border-b border-medium-grey/30 pb-2">
                  <p className="font-bold text-black dark:text-white">🎓 12 New Course Enrollments</p>
                  <p className="mt-0.5">Enterprise cohort registered in systems architecture.</p>
                  <span className="text-[9px] text-dark-grey/60 block mt-1">1 hour ago</span>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="h-6 w-px bg-medium-grey dark:bg-border-card"></div>

        {/* User Profile Avatar / Quick Actions Menu */}
        <button 
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="h-9 w-9 rounded-xl bg-gradient-to-tr from-tranquil-velvet to-bright-velvet border-2 border-cta-orange/40 flex items-center justify-center text-white font-extrabold shadow-md cursor-pointer hover:scale-105 transition"
        >
          {initials}
        </button>

        {/* Profile Dropdown */}
        {dropdownOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)}></div>
            <div className="absolute right-0 top-12 w-52 bg-white dark:bg-bg-card border border-medium-grey dark:border-border-card rounded-2xl shadow-xl p-2.5 z-50 animate-in fade-in duration-200">
              <div className="px-3.5 py-2 border-b border-medium-grey/50 dark:border-border-card/50 pb-2.5 mb-2 leading-tight">
                <p className="text-xs font-bold text-black dark:text-white">{currentUser ? currentUser.name : 'Guest User'}</p>
                <p className="text-[9px] text-dark-grey uppercase font-bold tracking-wider mt-0.5">{currentUser ? currentUser.title : 'Visitor'}</p>
              </div>

              <Link 
                to="/dashboard/settings" 
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-dark-grey hover:bg-blueish-grey dark:hover:bg-[#1E1F29] rounded-lg transition"
              >
                <Settings className="h-4 w-4" />
                <span>Account Settings</span>
              </Link>
              
              <Link 
                to="/#faq"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-dark-grey hover:bg-blueish-grey dark:hover:bg-[#1E1F29] rounded-lg transition"
              >
                <HelpCircle className="h-4 w-4" />
                <span>Help & Docs</span>
              </Link>

              <div className="h-px bg-medium-grey/50 dark:bg-border-card/50 my-1.5"></div>

              <button 
                onClick={() => {
                  logout();
                  setDropdownOpen(false);
                  navigate('/home');
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-500 hover:bg-red-500/10 rounded-lg transition text-left cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                <span>Exit Portal</span>
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
