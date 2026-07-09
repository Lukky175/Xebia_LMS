/* @ author : Gurnoor Singh
@email: gsingh13_be23@thapar.edu
mobile : +91- 7814205303
Thapar institute of engineering and technology, Patiala
*/

/*
 * Component: RolesTable
 * Purpose: Table component displaying all roles and their metrics in Table view.
 */
import React, { useState } from 'react';
import { Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

export default function RolesTable({ roles, selectedRoleId, onClick, onEdit, onDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const rolesPerPage = 10;

  const indexOfLastRole = currentPage * rolesPerPage;
  const indexOfFirstRole = indexOfLastRole - rolesPerPage;
  const currentRoles = roles.slice(indexOfFirstRole, indexOfLastRole);
  const totalPages = Math.ceil(roles.length / rolesPerPage);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(currentRoles.map(r => r.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id, e) => {
    e.stopPropagation();
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(rId => rId !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl shadow-sm p-0 overflow-hidden">
      <div className="overflow-x-auto sleek-scrollbar">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-medium-grey/50 dark:border-border-card text-dark-grey uppercase font-bold tracking-wider bg-blueish-grey/50 dark:bg-bg-page/50">
              <th className="p-4 w-12 text-center">
                <input 
                  type="checkbox" 
                  onChange={handleSelectAll}
                  checked={currentRoles.length > 0 && selectedRows.length === currentRoles.length}
                  className="cursor-pointer"
                />
              </th>
              <th className="p-4">Role</th>
              <th className="p-4">Description</th>
              <th className="p-4 w-32 text-center">Accessible Modules</th>
              <th className="p-4 w-24">Status</th>
              <th className="p-4 text-center w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRoles.map(role => {
              const isChecked = selectedRows.includes(role.id);
              const isSelected = role.id === selectedRoleId;
              const accessibleModulesCount = role.permissions?.filter(mod => 
                Object.values(mod.permissions || {}).some(val => val === true)
              ).length || 0;
              const isPlatformAdmin = role.name === 'Platform Admin' || role.name === 'Super Admin';

              return (
                <tr 
                  key={role.id} 
                  onClick={() => onClick(role.id)}
                  className={`border-b border-medium-grey/30 dark:border-border-card/30 hover:bg-blueish-grey/30 dark:hover:bg-bg-page/20 transition cursor-pointer ${
                    isSelected ? 'bg-purple-50/50 dark:bg-purple-900/10' : ''
                  } ${isChecked ? 'bg-tranquil-velvet/5 dark:bg-tranquil-velvet-dark/10' : ''}`}
                >
                  <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
                    <input 
                      type="checkbox" 
                      checked={isChecked}
                      onChange={(e) => handleSelectRow(role.id, e)}
                      className="cursor-pointer"
                    />
                  </td>
                  <td className="p-4 font-extrabold text-black dark:text-white flex items-center gap-2">
                    <div className={`h-6 w-6 rounded flex items-center justify-center text-[10px] border ${
                      isSelected ? 'bg-tranquil-velvet text-white border-transparent' : 'bg-blueish-grey dark:bg-bg-page border-medium-grey dark:border-border-card text-dark-grey'
                    }`}>
                      {role.name.substring(0, 2).toUpperCase()}
                    </div>
                    {role.name}
                  </td>
                  <td className="p-4 font-medium text-dark-grey max-w-[200px] truncate" title={role.description}>
                    {role.description}
                  </td>
                  <td className="p-4 font-bold text-center text-black dark:text-white">
                    {accessibleModulesCount}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-[#01AC9F]/10 text-[#01AC9F] border border-[#01AC9F]/20">
                      Active
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button 
                        onClick={(e) => { e.stopPropagation(); onEdit?.(role); }}
                        className="p-1.5 rounded-lg text-dark-grey hover:text-tranquil-velvet hover:bg-tranquil-velvet/10 transition"
                        title="Edit Role"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <div title={isPlatformAdmin ? "Platform Admin cannot be deleted" : "Delete Role"} onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={(e) => { e.stopPropagation(); onDelete?.(role); }}
                          disabled={isPlatformAdmin}
                          className={`p-1.5 rounded-lg transition ${
                            isPlatformAdmin 
                              ? 'text-medium-grey dark:text-border-card cursor-not-allowed' 
                              : 'text-dark-grey hover:text-red-500 hover:bg-red-500/10 cursor-pointer'
                          }`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}

            {currentRoles.length === 0 && (
              <tr>
                <td colSpan="8" className="p-12 text-center text-dark-grey font-semibold">
                  No roles match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center border-t border-medium-grey/40 dark:border-border-card/40 p-4">
          <span className="text-[10px] font-bold text-dark-grey uppercase tracking-wider">
            Showing {indexOfFirstRole + 1} - {Math.min(indexOfLastRole, roles.length)} of {roles.length} roles
          </span>
          <div className="flex items-center gap-1.5">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-1.5 border border-medium-grey dark:border-border-card bg-blueish-grey dark:bg-bg-page hover:bg-medium-grey/30 rounded-lg transition disabled:opacity-50 cursor-pointer text-dark-grey"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-xs font-bold text-black dark:text-white px-2">Page {currentPage} of {totalPages}</span>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 border border-medium-grey dark:border-border-card bg-blueish-grey dark:bg-bg-page hover:bg-medium-grey/30 rounded-lg transition disabled:opacity-50 cursor-pointer text-dark-grey"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
