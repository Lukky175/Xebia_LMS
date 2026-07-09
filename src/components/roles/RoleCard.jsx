/* @ author : Gurnoor Singh
@email: gsingh13_be23@thapar.edu
mobile : +91- 7814205303
Thapar institute of engineering and technology, Patiala
*/

/*
 * Component: RoleCard
 * Purpose: Card component displaying a summary of a role's permissions and details in Grid view.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Pencil, Trash2 } from 'lucide-react';
import BorderGlow from '../ui/BorderGlow.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';

export default function RoleCard({ role, isSelected, onClick, onEdit, onDelete }) {
  const { theme } = useTheme();

  // Calculate accessible modules: count modules where at least one permission is true
  const accessibleModulesCount = role.permissions?.filter(mod => 
    Object.values(mod.permissions || {}).some(val => val === true)
  ).length || 0;

  const isPlatformAdmin = role.name === 'Platform Admin' || role.name === 'Super Admin';

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      onClick={() => onClick(role.id)}
      className="cursor-pointer h-full"
    >
      <BorderGlow
        edgeSensitivity={20}
        glowColor={isSelected ? '304 76 30' : '220 13 40'} // tranquil-velvet or neutral
        backgroundColor={theme === 'dark' ? '#16171F' : '#FFFFFF'}
        borderRadius={16}
        glowRadius={30}
        glowIntensity={isSelected ? 1.5 : 0.5}
      >
        <div className={`relative p-5 h-full rounded-2xl border-2 transition-colors duration-200 flex flex-col justify-between ${
          isSelected 
            ? 'bg-purple-50/50 dark:bg-purple-900/10 border-tranquil-velvet shadow-sm shadow-tranquil-velvet/20' 
            : 'bg-white dark:bg-[#16171F] border-transparent dark:border-[#282A3A] hover:border-tranquil-velvet/30'
        }`}>
          
          <div className="flex flex-col gap-3">
            {/* Avatar */}
            <div className="h-10 w-10 rounded-xl bg-blueish-grey dark:bg-bg-page flex items-center justify-center border border-medium-grey dark:border-border-card shrink-0">
              <span className="text-sm font-extrabold text-tranquil-velvet dark:text-amber-400">
                {role.name.substring(0, 2).toUpperCase()}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-extrabold text-lg text-black dark:text-white tracking-wide mt-1">
              {role.name}
            </h3>
            
            {/* Description */}
            <p className="text-xs text-dark-grey font-medium leading-relaxed line-clamp-2 h-8">
              {role.description}
            </p>

            {/* Modules */}
            <div className="pt-1">
              <span className="text-sm font-extrabold text-black dark:text-white">{accessibleModulesCount}</span>
              <span className="text-sm text-dark-grey font-medium ml-1.5">Accessible Modules</span>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-5 pt-4 flex items-center gap-6 border-t border-medium-grey/40 dark:border-border-card">
            <button 
              onClick={(e) => { e.stopPropagation(); onEdit?.(role); }}
              className="flex items-center gap-1.5 text-xs font-bold text-dark-grey hover:text-tranquil-velvet transition"
              title="Edit Role"
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit
            </button>
            
            <div title={isPlatformAdmin ? "Platform Admin cannot be deleted" : "Delete Role"}>
              <button 
                onClick={(e) => { e.stopPropagation(); onDelete?.(role); }}
                disabled={isPlatformAdmin}
                className={`flex items-center gap-1.5 text-xs font-bold transition ${
                  isPlatformAdmin 
                    ? 'text-medium-grey dark:text-border-card cursor-not-allowed' 
                    : 'text-dark-grey hover:text-red-500 cursor-pointer'
                }`}
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </button>
            </div>
          </div>
          
        </div>
      </BorderGlow>
    </motion.div>
  );
}
