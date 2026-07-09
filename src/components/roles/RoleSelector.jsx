/* @ author : Gurnoor Singh
@email: gsingh13_be23@thapar.edu
mobile : +91- 7814205303
Thapar institute of engineering and technology, Patiala
*/

/*
 * Component: RoleSelector
 * Purpose: Dropdown component for selecting the active role to manage its permissions.
 */
import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function RoleSelector({ roles, selectedRoleId, onChange }) {
  return (
    <div className="flex flex-col space-y-2 w-full sm:w-72">
      <label className="text-[10px] font-bold text-dark-grey uppercase tracking-wider">
        Role to grant
      </label>
      <div className="relative">
        <select
          value={selectedRoleId || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-white dark:bg-[#16171F] border-2 border-tranquil-velvet/50 dark:border-tranquil-velvet/30 rounded-xl px-4 py-3 pr-10 text-sm font-extrabold text-black dark:text-white focus:outline-none focus:border-tranquil-velvet transition-colors cursor-pointer shadow-sm"
        >
          {roles.map(role => (
            <option key={role.id} value={role.id} className="font-semibold">
              {role.name.toUpperCase()}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-tranquil-velvet">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}
