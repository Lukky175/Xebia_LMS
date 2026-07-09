import React, { createContext, useContext, useState, useEffect } from 'react';

const PermissionsContext = createContext();

const defaultPermissions = {
  superadmin: [
    '/dashboard',
    '/dashboard/modules',
    '/dashboard/permissions',
    '/dashboard/roles-grants',
    '/dashboard/users',
    '/dashboard/organisations',
    '/dashboard/domains',
    '/dashboard/parents',
    '/dashboard/learners',
    '/dashboard/batches',
    '/dashboard/courses',
    '/dashboard/audit-log',
    '/dashboard/profile',
    '/dashboard/administration',
    '/dashboard/scheduling',
    '/dashboard/assessment',
    '/dashboard/finance',
    '/dashboard/trainer'
  ],
  admin: [
    '/dashboard',
    '/dashboard/modules',
    '/dashboard/permissions',
    '/dashboard/roles-grants',
    '/dashboard/users',
    '/dashboard/organisations',
    '/dashboard/domains',
    '/dashboard/parents',
    '/dashboard/learners',
    '/dashboard/batches',
    '/dashboard/courses',
    '/dashboard/audit-log',
    '/dashboard/profile',
    '/dashboard/administration',
    '/dashboard/scheduling',
    '/dashboard/assessment',
    '/dashboard/finance',
    '/dashboard/trainer'
  ],
  trainer: [
    '/dashboard',
    '/dashboard/courses',
    '/dashboard/trainer',
    '/dashboard/scheduling',
    '/dashboard/administration',
    '/dashboard/profile'
  ],
  student: [
    '/dashboard',
    '/dashboard/courses',
    '/dashboard/profile',
    '/dashboard/assessment'
  ]
};

export function PermissionsProvider({ children }) {
  const [permissions, setPermissions] = useState(() => {
    const saved = localStorage.getItem('lms_role_permissions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse permissions", e);
      }
    }
    return defaultPermissions;
  });

  useEffect(() => {
    localStorage.setItem('lms_role_permissions', JSON.stringify(permissions));
  }, [permissions]);

  const hasPermission = (role, path) => {
    if (!role) return false;
    
    // Superadmin protection: always has permission to everything to avoid lockouts
    if (role === 'superadmin') return true;

    // Normalizing dashboard path (e.g., if there's trailing slashes)
    const normalizedPath = path.replace(/\/$/, '');
    
    const allowed = permissions[role] || [];
    
    if (allowed.includes(normalizedPath)) return true;
    
    // In case route matching has subpaths
    return allowed.some(p => p !== '/dashboard' && normalizedPath.startsWith(p));
  };

  const updateRolePermissions = (role, newPaths) => {
    if (role === 'superadmin') return; // Cannot modify superadmin
    setPermissions(prev => ({
      ...prev,
      [role]: newPaths
    }));
  };

  const resetToDefaults = () => {
    setPermissions(defaultPermissions);
  };

  return (
    <PermissionsContext.Provider value={{ permissions, hasPermission, updateRolePermissions, resetToDefaults }}>
      {children}
    </PermissionsContext.Provider>
  );
}

export function usePermissions() {
  const context = useContext(PermissionsContext);
  if (!context) {
    throw new Error('usePermissions must be used within a PermissionsProvider');
  }
  return context;
}
