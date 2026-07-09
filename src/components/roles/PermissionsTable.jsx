/* @ author : Gurnoor Singh
@email: gsingh13_be23@thapar.edu
mobile : +91- 7814205303
Thapar institute of engineering and technology, Patiala
*/

/*
 * Component: PermissionsTable
 * Purpose: Table component to manage all CRUD permissions across modules in Table view.
 */
import React from 'react';
import ToggleSwitch from '../ui/ToggleSwitch.jsx';
import * as Icons from 'lucide-react';

export default function PermissionsTable({ modules, selectedRole, updatePermission, selectedRoleId }) {
  return (
    <div className="bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl shadow-sm p-0 overflow-hidden">
      <div className="overflow-x-auto sleek-scrollbar">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-medium-grey/50 dark:border-border-card text-dark-grey uppercase font-bold tracking-wider bg-blueish-grey/50 dark:bg-bg-page/50">
              <th className="p-4 w-1/4">Module</th>
              <th className="p-4 w-1/3">Description & Route</th>
              <th className="p-4 text-center">View</th>
              <th className="p-4 text-center">Create</th>
              <th className="p-4 text-center">Edit</th>
              <th className="p-4 text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((module) => {
              const rolePermission = selectedRole?.permissions?.find(p => p.module === module.id) || { permissions: {} };
              const IconComponent = Icons[module.icon] || Icons.Box;

              return (
                <tr 
                  key={module.id} 
                  className="border-b border-medium-grey/30 dark:border-border-card/30 hover:bg-blueish-grey/30 dark:hover:bg-bg-page/20 transition"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex items-center justify-center text-tranquil-velvet dark:text-purple-400 shrink-0">
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-black dark:text-white">{module.title}</h4>
                        <p className="text-[9px] text-dark-grey uppercase tracking-wider font-bold mt-0.5">
                          {module.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-xs text-dark-grey font-medium line-clamp-1 mb-1">
                      {module.description}
                    </p>
                    <p className="text-[10px] text-emerald font-semibold font-mono">
                      {module.route}
                    </p>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center">
                      <ToggleSwitch 
                        checked={rolePermission.permissions.view || false} 
                        onChange={(val) => updatePermission(selectedRoleId, module.id, 'view', val)}
                      />
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center">
                      <ToggleSwitch 
                        checked={rolePermission.permissions.create || false} 
                        onChange={(val) => updatePermission(selectedRoleId, module.id, 'create', val)}
                      />
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center">
                      <ToggleSwitch 
                        checked={rolePermission.permissions.edit || false} 
                        onChange={(val) => updatePermission(selectedRoleId, module.id, 'edit', val)}
                      />
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center">
                      <ToggleSwitch 
                        checked={rolePermission.permissions.delete || false} 
                        onChange={(val) => updatePermission(selectedRoleId, module.id, 'delete', val)}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
            
            {modules.length === 0 && (
              <tr>
                <td colSpan="6" className="p-12 text-center text-dark-grey font-semibold">
                  No modules available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
