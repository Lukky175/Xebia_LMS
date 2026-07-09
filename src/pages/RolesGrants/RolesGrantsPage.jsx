import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ShieldAlert, Key, Users, UserCheck, Star } from 'lucide-react';
import BorderGlow from '@/components/ui/BorderGlow.jsx';
import { usePermissions } from '@/context/PermissionsContext.jsx';

export default function RolesGrantsPage() {
  const navigate = useNavigate();
  const { permissions } = usePermissions();

  const rolesList = [
    {
      role: 'superadmin',
      title: 'Platform Super Administrator',
      clearance: 'Clearance Level 5 (Absolute Control)',
      desc: 'Holds complete platform access including database logs, server diagnostic charts, client organization configurations, and user creation privileges.',
      badge: 'Owner / Root',
      icon: ShieldAlert,
      themeColor: '304 76 30', // Orange/Red glow
      textColor: 'text-cta-orange bg-cta-orange/10'
    },
    {
      role: 'admin',
      title: 'Operations Administrator',
      clearance: 'Clearance Level 4 (Administrative Scope)',
      desc: 'Controls cohort creation, user list audits, finance cost logs, system settings, and default parameters tuning.',
      badge: 'Admin Scope',
      icon: Shield,
      themeColor: '304 76 30',
      textColor: 'text-tranquil-velvet bg-tranquil-velvet/10'
    },
    {
      role: 'trainer',
      title: 'Course Instructor / Trainer',
      clearance: 'Clearance Level 2 (Instructional Scope)',
      desc: 'Assigned to teach batches, review lecture slides, publish pending courses proposals, and respond to learner questions.',
      badge: 'Write / Edit',
      icon: Star,
      themeColor: '168 84 50', // Emerald/teal glow
      textColor: 'text-emerald bg-emerald/10'
    },
    {
      role: 'student',
      title: 'Enrolled Student / Learner',
      clearance: 'Clearance Level 1 (Sandbox Scope)',
      desc: 'Consumes published lecture courses, answers quizzes, tracks study progress graphs, and obtains completion certificates.',
      badge: 'Read / Execute',
      icon: UserCheck,
      themeColor: '210 50 40', // Blueish
      textColor: 'text-blue-500 bg-blue-500/10'
    }
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-black dark:text-white flex items-center gap-2">
            <Shield className="h-5 w-5 text-tranquil-velvet" />
            Roles & Scope Grants
          </h2>
          <p className="text-[11px] text-dark-grey">Overview of platform credentials classifications, user roles description, and active clearance levels.</p>
        </div>
        
        <button 
          onClick={() => navigate('/dashboard/permissions')}
          className="flex items-center gap-1.5 px-4 py-2 bg-tranquil-velvet hover:bg-tranquil-velvet/95 text-xs font-bold text-white rounded-lg shadow-md hover:scale-102 transition duration-150 cursor-pointer shrink-0"
        >
          <Key className="h-3.5 w-3.5" />
          Edit Permissions Matrix
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rolesList.map(roleData => {
          const Icon = roleData.icon;
          const allowedCount = roleData.role === 'superadmin' ? 'All' : (permissions[roleData.role]?.length || 0);

          return (
            <BorderGlow
              key={roleData.role}
              edgeSensitivity={10}
              glowColor={roleData.themeColor}
              backgroundColor="var(--bg-card)"
              borderRadius={16}
              glowRadius={30}
              glowIntensity={1.0}
              className="h-full"
            >
              <div className="p-6 flex flex-col justify-between h-full bg-bg-card border border-border-card rounded-2xl">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className={`p-2.5 rounded-xl ${roleData.textColor}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${roleData.textColor}`}>
                      {roleData.badge}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-extrabold text-black dark:text-white">{roleData.title}</h3>
                    <p className="text-[9px] font-semibold text-emerald uppercase tracking-wider">{roleData.clearance}</p>
                  </div>

                  <p className="text-[10px] text-dark-grey leading-relaxed">{roleData.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-medium-grey dark:border-white/5 flex justify-between items-center text-[10px]">
                  <span className="text-dark-grey font-medium">Configured Modules:</span>
                  <span className="font-bold text-black dark:text-white px-2 py-0.5 rounded bg-neutral-100 dark:bg-white/5">
                    {allowedCount} Allowed
                  </span>
                </div>
              </div>
            </BorderGlow>
          );
        })}
      </div>
    </div>
  );
}
