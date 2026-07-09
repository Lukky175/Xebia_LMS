import React, { createContext, useContext, useState, useEffect } from 'react';
import { permissionsApi, permissionsContract } from '@/services/permissionsApi.js';

const PermissionsContext = createContext();

export function PermissionsProvider({ children }) {
  const [permissions, setPermissions] = useState(permissionsContract.defaultPermissions);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadPermissions = async () => {
      try {
        const savedPermissions = await permissionsApi.getPermissions();
        if (mounted) {
          setPermissions(savedPermissions);
        }
      } catch (error) {
        console.error('Failed to load permissions', error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadPermissions();

    return () => {
      mounted = false;
    };
  }, []);

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
    return permissionsApi.updateRolePermissions(role, newPaths).then((nextPermissions) => {
      setPermissions(nextPermissions);
      return nextPermissions;
    });
  };

  const resetToDefaults = () => {
    return permissionsApi.resetPermissions().then((nextPermissions) => {
      setPermissions(nextPermissions);
      return nextPermissions;
    });
  };

  return (
    <PermissionsContext.Provider value={{ permissions, hasPermission, updateRolePermissions, resetToDefaults, isLoading }}>
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
