import React, { useState } from 'react';
import { usePermissions } from '@/context/PermissionsContext.jsx';
import { permissionsContract } from '@/services/permissionsApi.js';
import { 
  Key, Shield, AlertCircle, Save, RotateCcw, Check,
  LayoutDashboard, Layers, Users, Building, Globe, 
  GraduationCap, BookOpen, FileText, User, Settings, 
  Calendar, ClipboardList, DollarSign, Briefcase
} from 'lucide-react';
import BorderGlow from '@/components/ui/BorderGlow.jsx';

const allRoutes = [
  {
    category: 'General',
    items: [
      { path: '/dashboard', label: 'Dashboard Home', desc: 'Main welcome dashboard with stats and graphs.', icon: LayoutDashboard }
    ]
  },
  {
    category: 'Access Control',
    items: [
      { path: '/dashboard/modules', label: 'Modules Directory', desc: 'Enable/disable custom systems modules.', icon: Layers },
      { path: '/dashboard/permissions', label: 'Permissions Editor', desc: 'Change permissions matrix for other roles.', icon: Key },
      { path: '/dashboard/roles-grants', label: 'Roles & Grants Settings', desc: 'Overview of roles descriptions and scopes.', icon: Shield },
      { path: '/dashboard/users', label: 'Users Directory', desc: 'Manage users, bulk update profiles and delete.', icon: Users }
    ]
  },
  {
    category: 'Directory',
    items: [
      { path: '/dashboard/organisations', label: 'Organisations Directory', desc: 'View corporate client entities and licenses.', icon: Building },
      { path: '/dashboard/domains', label: 'Domains Directory', desc: 'Domain mappings lists.', icon: Globe },
      { path: '/dashboard/parents', label: 'Parents Directory', desc: 'Manage parent-child account links.', icon: Users },
      { path: '/dashboard/learners', label: 'Learners Directory', desc: 'List and search registered student accounts.', icon: GraduationCap },
      { path: '/dashboard/batches', label: 'Batches Console', desc: 'Cohort setups and classes groupings.', icon: Layers },
      { path: '/dashboard/courses', label: 'Courses Catalog', desc: 'Curriculum lists and learning tracks.', icon: BookOpen }
    ]
  },
  {
    category: 'Governance & Audits',
    items: [
      { path: '/dashboard/audit-log', label: 'Security Audit Log', desc: 'Immutable audit logs of administrative actions.', icon: FileText }
    ]
  },
  {
    category: 'Account & Settings',
    items: [
      { path: '/dashboard/profile', label: 'My Profile Page', desc: 'User profile dashboard, badge counts and ratings.', icon: User },
      { path: '/dashboard/administration', label: 'Administration / Settings', desc: 'System properties, themes and notification logs.', icon: Settings }
    ]
  },
  {
    category: 'LMS Workflows',
    items: [
      { path: '/dashboard/scheduling', label: 'Lectures Scheduling', desc: 'Instructor lectures scheduler calendar.', icon: Calendar },
      { path: '/dashboard/assessment', label: 'Assessment Manager', desc: 'Student test panels and evaluation systems.', icon: ClipboardList },
      { path: '/dashboard/finance', label: 'Finance & Earnings', desc: 'MRR tracking, invoicing logs, and batch cost charts.', icon: DollarSign },
      { path: '/dashboard/trainer', label: 'Trainers Registry', desc: 'Browse courses instructors details.', icon: Briefcase }
    ]
  }
];

export default function PermissionsPage() {
  const { permissions, updateRolePermissions, resetToDefaults, isLoading } = usePermissions();
  const [selectedRole, setSelectedRole] = useState('trainer');
  const [activePaths, setActivePaths] = useState([]);
  const [toastMsg, setToastMsg] = useState('');

  React.useEffect(() => {
    setActivePaths(permissions[selectedRole] || []);
  }, [permissions, selectedRole]);

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

  const handleTogglePath = (path) => {
    if (selectedRole === 'superadmin') return; // Read-only bypass
    
    // Prevent locking out from permissions edit panel for admin role
    if (selectedRole === 'admin' && path === '/dashboard/permissions') {
      showToast('Cannot disable Permissions Access for Administrator to avoid lockouts.');
      return;
    }

    setActivePaths(prev => {
      if (prev.includes(path)) {
        return prev.filter(p => p !== path);
      } else {
        return [...prev, path];
      }
    });
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 4000);
  };

  const handleSave = async () => {
    if (selectedRole === 'superadmin') return;
    await updateRolePermissions(selectedRole, activePaths);
    showToast(`Permissions updated successfully for ${selectedRole.toUpperCase()} role.`);
  };

  const handleReset = async () => {
    if (window.confirm("Are you sure you want to reset ALL roles' permissions to default?")) {
      await resetToDefaults();
      setActivePaths(permissionsContract.defaultPermissions[selectedRole] || []);
      showToast("Reset all roles to defaults.");
    }
  };

  const handleSelectAll = () => {
    if (selectedRole === 'superadmin') return;
    const paths = allRoutes.flatMap(cat => cat.items.map(item => item.path));
    setActivePaths(paths);
  };

  const handleClearAll = () => {
    if (selectedRole === 'superadmin') return;
    // Always keep /dashboard and profile to have basic navigation
    setActivePaths(['/dashboard', '/dashboard/profile']);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {isLoading && (
        <div className="bg-neutral-50 dark:bg-white/5 border border-medium-grey dark:border-white/10 text-[11px] text-dark-grey px-4 py-3 rounded-xl">
          Loading permissions from the shared store...
        </div>
      )}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-black dark:text-white flex items-center gap-2">
            <Key className="h-5 w-5 text-cta-orange" />
            System Permissions Manager
          </h2>
          <p className="text-[11px] text-dark-grey">Configure role-based access levels, sidebar route visibility, and page authorization grants.</p>
        </div>
        
        <div className="flex items-center gap-2 shrink-0">
          <button 
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-medium-grey dark:border-white/10 text-xs font-bold text-dark-grey rounded-lg hover:bg-neutral-100 dark:hover:bg-white/5 transition duration-150 cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset Defaults
          </button>
          {selectedRole !== 'superadmin' && (
            <button 
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-cta-orange hover:bg-cta-orange/95 text-xs font-bold text-white rounded-lg shadow-md hover:scale-102 transition duration-150 cursor-pointer"
            >
              <Save className="h-3.5 w-3.5" />
              Save Scopes
            </button>
          )}
        </div>
      </div>

      {toastMsg && (
        <div className="bg-emerald/10 border border-emerald/20 text-emerald text-xs font-bold px-4 py-3 rounded-xl flex items-center gap-2 shadow-xs transition duration-200 animate-fadeIn">
          <Check className="h-4 w-4" />
          {toastMsg}
        </div>
      )}

      {/* Role Selection Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-medium-grey dark:border-white/5 pb-2">
        {[
          { key: 'superadmin', label: 'Superadmin' },
          { key: 'admin', label: 'Admin' },
          { key: 'trainer', label: 'Trainer / Instructor' },
          { key: 'student', label: 'Student / Learner' }
        ].map(role => (
          <button
            key={role.key}
            onClick={() => handleRoleChange(role.key)}
            className={`px-4 py-2 text-xs font-extrabold rounded-lg tracking-wide uppercase transition duration-150 cursor-pointer ${selectedRole === role.key ? 'bg-tranquil-velvet text-white shadow-md' : 'text-dark-grey hover:bg-neutral-100 dark:hover:bg-white/5'}`}
          >
            {role.label}
          </button>
        ))}
      </div>

      {/* Read-only notification for Superadmin */}
      {selectedRole === 'superadmin' && (
        <div className="bg-tranquil-velvet/10 border border-tranquil-velvet/20 text-tranquil-velvet dark:text-[#d38bca] text-xs font-semibold p-4 rounded-xl flex items-start gap-3">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Superadmin Bypass Access Active</p>
            <p className="text-[10px] text-dark-grey dark:text-gray-300 mt-1">
              Users with the Superadmin role hold absolute administrative controls. Their paths cannot be disabled or customized to guarantee they can always access the core system settings and databases.
            </p>
          </div>
        </div>
      )}

      {/* Configuration Matrix */}
      <div className="bg-bg-card border border-border-card rounded-2xl p-6 space-y-8">
        <div className="flex justify-between items-center pb-2 border-b border-medium-grey dark:border-white/5">
          <div>
            <h3 className="text-xs font-extrabold uppercase text-dark-grey tracking-wider">Module Permissions</h3>
            <p className="text-[10px] text-dark-grey mt-0.5">Toggle visibility for pages rendered under the selected role.</p>
          </div>
          {selectedRole !== 'superadmin' && (
            <div className="flex gap-2">
              <button 
                onClick={handleSelectAll} 
                className="text-[10px] font-extrabold text-tranquil-velvet dark:text-[#d38bca] hover:underline cursor-pointer"
              >
                Select All
              </button>
              <span className="text-[10px] text-dark-grey">|</span>
              <button 
                onClick={handleClearAll} 
                className="text-[10px] font-extrabold text-cta-orange hover:underline cursor-pointer"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-8">
          {allRoutes.map(cat => (
            <div key={cat.category} className="space-y-4">
              <h4 className="text-[10px] font-extrabold text-black dark:text-white tracking-widest uppercase border-l-2 border-cta-orange pl-2">
                {cat.category}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cat.items.map(item => {
                  const isChecked = selectedRole === 'superadmin' || activePaths.includes(item.path);
                  const Icon = item.icon;
                  return (
                    <div 
                      key={item.path} 
                      onClick={() => handleTogglePath(item.path)}
                      className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition duration-150 select-none ${isChecked ? 'bg-[#F7F8FC]/50 dark:bg-white/3 border-tranquil-velvet/50' : 'bg-transparent border-medium-grey dark:border-white/5 opacity-60 hover:opacity-80'}`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`p-2 rounded-lg shrink-0 ${isChecked ? 'bg-tranquil-velvet text-white' : 'bg-neutral-100 dark:bg-white/5 text-dark-grey'}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold text-black dark:text-white">{item.label}</p>
                          <p className="text-[9px] text-dark-grey leading-tight max-w-[280px]">{item.desc}</p>
                          <p className="text-[9px] font-mono text-dark-grey/75 mt-0.5">{item.path}</p>
                        </div>
                      </div>
                      <div className="relative inline-flex items-center shrink-0">
                        <input 
                          type="checkbox"
                          checked={isChecked}
                          disabled={selectedRole === 'superadmin'}
                          onChange={() => {}} // Controlled click via parent div
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-neutral-200 dark:bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
