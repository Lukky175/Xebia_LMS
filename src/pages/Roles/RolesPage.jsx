/* @ author : Gurnoor Singh
@email: gsingh13_be23@thapar.edu
mobile : +91- 7814205303
Thapar institute of engineering and technology, Patiala
*/

/*
 * Component: RolesPage
 * Purpose: Main feature page for the Roles & Grants module. Manages the layout, View Switcher (Grid/Table), and coordinates state across all role and permission components.
 */
import React, { useState } from 'react';
import { Shield, Search, LayoutGrid, List } from 'lucide-react';
import { useRoles } from '../../hooks/useRoles.js';
import RoleCard from '../../components/roles/RoleCard.jsx';
import RolesTable from '../../components/roles/RolesTable.jsx';
import PermissionCard from '../../components/roles/PermissionCard.jsx';
import PermissionsTable from '../../components/roles/PermissionsTable.jsx';
import RoleSelector from '../../components/roles/RoleSelector.jsx';
import RoleModal from '../../components/roles/RoleModal.jsx';
import DeleteConfirmModal from '../../components/roles/DeleteConfirmModal.jsx';

export default function RolesPage() {
  const { 
    roles, 
    modules, 
    selectedRole, 
    selectedRoleId, 
    setSelectedRoleId, 
    updatePermission, 
    editRole,
    deleteRole,
    loading, 
    error 
  } = useRoles();

  const [viewType, setViewType] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [modalType, setModalType] = useState(null); // 'edit', 'delete', null
  const [activeRoleForModal, setActiveRoleForModal] = useState(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="h-10 w-10 border-4 border-tranquil-velvet border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500 font-semibold bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-200 dark:border-red-900/30">
        Error loading roles: {error}
      </div>
    );
  }

  const filteredRoles = roles.filter(role => 
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditSave = async (formData) => {
    if (activeRoleForModal) {
      await editRole(activeRoleForModal.id, formData);
    }
  };

  const handleDeleteConfirm = async (roleId) => {
    await deleteRole(roleId);
  };

  const openEditModal = (role) => {
    setActiveRoleForModal(role);
    setModalType('edit');
  };

  const openDeleteModal = (role) => {
    setActiveRoleForModal(role);
    setModalType('delete');
  };

  return (
    <div className="space-y-6 md:space-y-10 pb-10">
      
      {/* Header and Controls Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold text-black dark:text-white flex items-center gap-3">
            <Shield className="h-6 w-6 text-tranquil-velvet" />
            Roles & Grants
          </h1>
          <p className="text-sm text-dark-grey font-medium">
            Manage platform roles and permissions
          </p>
        </div>

        {/* Responsive Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Bar */}
          <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#16171F] border border-medium-grey dark:border-border-card rounded-xl w-full sm:w-64 shadow-sm">
            <Search className="h-4 w-4 text-dark-grey shrink-0" />
            <input 
              type="text" 
              placeholder="Search roles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm text-black dark:text-white focus:outline-none w-full font-medium"
            />
          </div>

          {/* View Switcher controls entire page layout */}
          <div className="flex bg-blueish-grey dark:bg-bg-page border border-medium-grey dark:border-border-card rounded-xl p-1 shrink-0">
            <button
              onClick={() => setViewType('grid')}
              className={`p-1.5 rounded-lg flex items-center gap-2 transition ${viewType === 'grid' ? 'bg-white dark:bg-[#16171F] shadow-sm text-black dark:text-white' : 'text-dark-grey hover:text-black dark:hover:text-white'}`}
              title="Grid View"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewType('table')}
              className={`p-1.5 rounded-lg flex items-center gap-2 transition ${viewType === 'table' ? 'bg-white dark:bg-[#16171F] shadow-sm text-black dark:text-white' : 'text-dark-grey hover:text-black dark:hover:text-white'}`}
              title="Table View"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main View: Grid or Table for Roles */}
      <div className="w-full">
        {viewType === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredRoles.map(role => (
              <RoleCard 
                key={role.id}
                role={role}
                isSelected={role.id === selectedRoleId}
                onClick={setSelectedRoleId}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
              />
            ))}
            {filteredRoles.length === 0 && (
              <div className="col-span-full py-12 text-center text-dark-grey font-semibold">
                No roles found matching "{searchQuery}"
              </div>
            )}
          </div>
        ) : (
          <RolesTable 
            roles={filteredRoles}
            selectedRoleId={selectedRoleId}
            onClick={setSelectedRoleId}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
          />
        )}
      </div>

      {/* Role Selector & Pagination info */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-t border-medium-grey/40 dark:border-border-card pt-6 md:pt-8">
        <RoleSelector 
          roles={roles}
          selectedRoleId={selectedRoleId}
          onChange={setSelectedRoleId}
        />
        <span className="text-[10px] font-bold text-dark-grey uppercase tracking-wider mb-2 sm:mb-3">
          Showing 1-{filteredRoles.length} of {filteredRoles.length}
        </span>
      </div>

      {/* Modules & Permissions Section */}
      {selectedRole && (
        <div className="space-y-4 pt-2">
          <h3 className="font-extrabold text-lg text-black dark:text-white">Modules & submodules</h3>
          
          {viewType === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {modules.map(module => {
                const rolePermission = selectedRole?.permissions?.find(p => p.module === module.id);
                // UI toggles "view" access for now in grid view
                const hasAccess = rolePermission?.permissions?.view || false;

                return (
                  <PermissionCard 
                    key={module.id}
                    module={module}
                    hasPermission={hasAccess}
                    onToggle={(val) => updatePermission(selectedRoleId, module.id, 'view', val)}
                  />
                );
              })}
            </div>
          ) : (
            <PermissionsTable 
              modules={modules}
              selectedRole={selectedRole}
              selectedRoleId={selectedRoleId}
              updatePermission={updatePermission}
            />
          )}
        </div>
      )}

      {/* Modals */}
      <RoleModal 
        isOpen={modalType === 'edit'}
        onClose={() => setModalType(null)}
        role={activeRoleForModal}
        onSave={handleEditSave}
      />

      <DeleteConfirmModal 
        isOpen={modalType === 'delete'}
        onClose={() => setModalType(null)}
        role={activeRoleForModal}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
