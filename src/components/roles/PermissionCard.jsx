/* @ author : Gurnoor Singh
@email: gsingh13_be23@thapar.edu
mobile : +91- 7814205303
Thapar institute of engineering and technology, Patiala
*/

/*
 * Component: PermissionCard
 * Purpose: Card component to toggle a single module's permissions in Grid view.
 */
import React from 'react';
import { motion } from 'framer-motion';
import ToggleSwitch from '../ui/ToggleSwitch.jsx';
import * as Icons from 'lucide-react';

export default function PermissionCard({ module, hasPermission, onToggle }) {
  // Dynamically resolve icon from lucide-react based on string name
  const IconComponent = Icons[module.icon] || Icons.Box;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 bg-purple-50 dark:bg-purple-900/20 rounded-xl flex items-center justify-center text-tranquil-velvet dark:text-purple-400 shrink-0">
            <IconComponent className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-black dark:text-white">{module.title}</h4>
            <p className="text-[10px] text-dark-grey uppercase tracking-wider font-bold mt-1">
              {module.id}
            </p>
          </div>
        </div>
        <ToggleSwitch 
          checked={hasPermission} 
          onChange={onToggle} 
        />
      </div>
      
      <div className="mt-4 pt-4 border-t border-medium-grey/40 dark:border-border-card">
        <p className="text-xs text-dark-grey font-medium line-clamp-2">
          {module.description}
        </p>
        <p className="text-[10px] text-emerald font-semibold mt-2 font-mono">
          {module.route}
        </p>
      </div>
    </motion.div>
  );
}
