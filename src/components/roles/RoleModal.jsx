/* @ author : Gurnoor Singh
@email: gsingh13_be23@thapar.edu
mobile : +91- 7814205303
Thapar institute of engineering and technology, Patiala
*/

/*
 * Component: RoleModal
 * Purpose: Modal component for creating and editing roles (modifying name and description).
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Shield } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';

export default function RoleModal({ isOpen, onClose, onSave, role }) {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    if (role) {
      setFormData({
        name: role.name || '',
        description: role.description || ''
      });
    } else {
      setFormData({ name: '', description: '' });
    }
  }, [role, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md overflow-hidden bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] shadow-2xl rounded-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-medium-grey/40 dark:border-border-card bg-blueish-grey/30 dark:bg-bg-page/30">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-tranquil-velvet/10 dark:bg-tranquil-velvet-dark/30 rounded-xl flex items-center justify-center text-tranquil-velvet dark:text-amber-400">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-black dark:text-white">
                  {role ? 'Edit Role' : 'Create Role'}
                </h2>
                <p className="text-xs text-dark-grey font-medium">
                  {role ? 'Modify role details' : 'Add a new custom role'}
                </p>
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
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-dark-grey uppercase tracking-wider">Role Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Content Manager"
                required
                className="w-full px-4 py-3 rounded-xl bg-blueish-grey dark:bg-bg-page border border-medium-grey dark:border-border-card text-black dark:text-white text-sm font-medium focus:outline-none focus:border-tranquil-velvet focus:ring-1 focus:ring-tranquil-velvet transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-dark-grey uppercase tracking-wider">Description</label>
              <textarea 
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the responsibilities of this role..."
                rows="4"
                className="w-full px-4 py-3 rounded-xl bg-blueish-grey dark:bg-bg-page border border-medium-grey dark:border-border-card text-black dark:text-white text-sm font-medium focus:outline-none focus:border-tranquil-velvet focus:ring-1 focus:ring-tranquil-velvet transition resize-none sleek-scrollbar"
              ></textarea>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-medium-grey/40 dark:border-border-card">
              <button 
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl font-bold text-dark-grey hover:bg-blueish-grey dark:hover:bg-bg-page transition cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={!formData.name.trim()}
                className="px-5 py-2.5 rounded-xl font-bold text-white bg-tranquil-velvet hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2 cursor-pointer"
              >
                <Save className="h-4 w-4" />
                Save Changes
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
