/* @ author : Gurnoor Singh
@email: gsingh13_be23@thapar.edu
mobile : +91- 7814205303
Thapar institute of engineering and technology, Patiala
*/

/*
 * Component: DeleteConfirmModal
 * Purpose: Modal component to confirm the deletion of a role. Protects platform admin roles from deletion.
 */
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Trash2 } from 'lucide-react';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, role }) {
  if (!isOpen || !role) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-sm overflow-hidden bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] shadow-2xl rounded-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-medium-grey/40 dark:border-border-card bg-red-50/50 dark:bg-red-900/10">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-red-500/10 dark:bg-red-500/20 rounded-xl flex items-center justify-center text-red-500">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-black dark:text-white">
                  Delete Role
                </h2>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-xl text-dark-grey hover:bg-medium-grey/30 dark:hover:bg-border-card/50 transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            <p className="text-sm font-medium text-dark-grey leading-relaxed">
              Are you sure you want to delete the role <span className="font-bold text-black dark:text-white">"{role.name}"</span>? 
              This action cannot be undone and will remove all permissions associated with this role.
            </p>
            
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-xl">
              <p className="text-xs font-semibold text-red-600 dark:text-red-400">
                Warning: Users assigned to this role will lose their access privileges.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-5 border-t border-medium-grey/40 dark:border-border-card bg-blueish-grey/30 dark:bg-bg-page/30">
            <button 
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl font-bold text-dark-grey hover:bg-blueish-grey dark:hover:bg-bg-page transition cursor-pointer"
            >
              Cancel
            </button>
            <button 
              onClick={() => { onConfirm(role.id); onClose(); }}
              className="px-5 py-2.5 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 transition flex items-center gap-2 cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
              Delete Role
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
