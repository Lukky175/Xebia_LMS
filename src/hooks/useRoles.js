/* @ author : Gurnoor Singh
@email: gsingh13_be23@thapar.edu
mobile : +91- 7814205303
Thapar institute of engineering and technology, Patiala
*/

/*
 * Hook: useRoles
 * Purpose: Manages state and logic for the Roles & Grants module.
 * It provides methods to fetch, edit, and delete roles, as well as 
 * granularly update permissions (View, Create, Edit, Delete) across modules.
 * State is optimistically updated and kept in sync with the api service.
 */
import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api.js';

export function useRoles() {
  const [roles, setRoles] = useState([]);
  const [modules, setModules] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [fetchedRoles, fetchedModules] = await Promise.all([
        api.getRoles(),
        api.getModules()
      ]);
      setRoles(fetchedRoles);
      setModules(fetchedModules);
      if (fetchedRoles.length > 0 && !selectedRoleId) {
        setSelectedRoleId(fetchedRoles[0].id);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [selectedRoleId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const selectedRole = roles.find((r) => r.id === selectedRoleId) || null;

  const editRole = async (roleId, roleData) => {
    try {
      await api.updateRole(roleId, roleData);
      await fetchData(); // Refresh data
    } catch (err) {
      console.error("Failed to update role", err);
      throw err;
    }
  };

  const deleteRole = async (roleId) => {
    try {
      await api.deleteRole(roleId);
      // If we deleted the currently selected role, reset selection
      if (selectedRoleId === roleId) {
        setSelectedRoleId(null);
      }
      await fetchData();
    } catch (err) {
      console.error("Failed to delete role", err);
      throw err;
    }
  };

  const updatePermission = async (roleId, moduleId, action, value) => {
    const role = roles.find(r => r.id === roleId);
    if (!role) return;

    // Create a deep copy of permissions
    let newPermissions = JSON.parse(JSON.stringify(role.permissions));
    const moduleIndex = newPermissions.findIndex(p => p.module === moduleId);

    if (moduleIndex !== -1) {
      // Update existing permission
      newPermissions[moduleIndex].permissions[action] = value;
    } else {
      // Add new permission entry if it doesn't exist
      newPermissions.push({
        module: moduleId,
        permissions: {
          view: action === 'view' ? value : false,
          create: action === 'create' ? value : false,
          edit: action === 'edit' ? value : false,
          delete: action === 'delete' ? value : false,
        }
      });
    }

    // Optimistic update
    setRoles(prevRoles => prevRoles.map(r => r.id === roleId ? { ...r, permissions: newPermissions } : r));

    try {
      await api.updateRolePermissions(roleId, newPermissions);
    } catch (err) {
      console.error("Failed to update permission", err);
      // Revert on failure
      fetchData(); 
    }
  };

  return {
    roles,
    modules,
    selectedRole,
    selectedRoleId,
    setSelectedRoleId,
    loading,
    error,
    updatePermission,
    editRole,
    deleteRole,
    refreshRoles: fetchData
  };
}
