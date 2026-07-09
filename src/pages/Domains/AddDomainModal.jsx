import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Loader2 } from 'lucide-react';

const CATEGORIES = ['Frontend', 'Backend', 'DevOps', 'Data Science', 'Monitoring', 'Architecture', 'Security', 'Design'];

const EMPTY = { name: '', code: '', category: 'Frontend', parentId: null, status: 'Active' };

export default function AddDomainModal({ show, onClose, onAdd, domains = [] }) {
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const set = (key, val) => {
    setForm(prev => ({ ...prev, [key]: val }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.code.trim() || !form.category) {
      setError('Domain name, code, and category are required.');
      return;
    }
    setSubmitting(true);
    try {
      await onAdd({
        ...form,
        code: form.code.toUpperCase().trim(),
        name: form.name.trim(),
        parentId: form.parentId ? Number(form.parentId) : null,
      });
      setForm(EMPTY);
      setError('');
      onClose();
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (submitting) return;
    setForm(EMPTY);
    setError('');
    onClose();
  };

  const inputCls =
    'w-full text-xs font-semibold bg-white dark:bg-[#0F1015] border border-medium-grey dark:border-[#282A3A] px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-tranquil-velvet/30 transition text-black dark:text-white placeholder-dark-grey';
  const labelCls = 'block text-[10px] font-bold text-dark-grey uppercase tracking-wider mb-1.5';

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative z-10 w-full max-w-md bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-medium-grey dark:border-[#282A3A]">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-cta-orange/10 flex items-center justify-center">
                  <Plus className="h-4 w-4 text-cta-orange" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-black dark:text-white">Add New Domain</h3>
                  <p className="text-[10px] text-dark-grey">Create a new course taxonomy domain</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                disabled={submitting}
                className="p-1.5 hover:bg-bg-hover dark:hover:bg-[#282A3A] rounded-xl transition text-dark-grey cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Name */}
              <div>
                <label className={labelCls}>Domain Name <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => set('name', e.target.value)}
                  placeholder="e.g. React.js"
                  className={inputCls}
                  disabled={submitting}
                />
              </div>

              {/* Code + Category */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Code <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    value={form.code}
                    onChange={e => set('code', e.target.value.toUpperCase())}
                    placeholder="e.g. REACT"
                    maxLength={8}
                    className={inputCls}
                    disabled={submitting}
                  />
                </div>
                <div>
                  <label className={labelCls}>Category <span className="text-red-400">*</span></label>
                  <select
                    value={form.category}
                    onChange={e => set('category', e.target.value)}
                    className={inputCls}
                    disabled={submitting}
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Parent + Status */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Parent Domain</label>
                  <select
                    value={form.parentId ?? ''}
                    onChange={e => set('parentId', e.target.value || null)}
                    className={inputCls}
                    disabled={submitting}
                  >
                    <option value="">None</option>
                    {domains.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Status</label>
                  <select
                    value={form.status}
                    onChange={e => set('status', e.target.value)}
                    className={inputCls}
                    disabled={submitting}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="text-[11px] text-red-400 font-semibold bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              {/* Actions */}
              <div className="flex gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={submitting}
                  className="flex-1 px-4 py-2.5 text-xs font-bold border border-medium-grey dark:border-[#282A3A] text-dark-grey hover:bg-bg-hover dark:hover:bg-[#282A3A] rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2.5 text-xs font-bold bg-cta-orange hover:bg-[#e05600] disabled:opacity-60 text-white rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-cta-orange/20"
                >
                  {submitting
                    ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /><span>Adding…</span></>
                    : <><Plus className="h-3.5 w-3.5" /><span>Add Domain</span></>
                  }
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
