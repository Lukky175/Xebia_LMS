/**
 * Author: Abhishek Dixit
 * Institution: Lovely Professional University
 * Develop the UI components for the module management system, 
 * including cards, badges, buttons, pagination, and modals.
 */

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Pencil, Power, Trash2, Layers3, X, Save } from 'lucide-react';
import BorderGlow from '@/components/ui/BorderGlow.jsx';
import CountUp from '@/components/ui/CountUp.jsx';

export function ModuleStatCard({ title, count, change, icon: Icon, glowColor, suffix = '', theme }) {
  return (
    <BorderGlow
      edgeSensitivity={20}
      glowColor={glowColor}
      backgroundColor={theme === 'dark' ? '#16171F' : '#FFFFFF'}
      borderRadius={16}
      glowRadius={30}
      glowIntensity={1.15}
    >
      <div className="p-5 flex justify-between items-center bg-white dark:bg-[#16171F] rounded-2xl">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-dark-grey uppercase tracking-wider">{title}</span>
          <p className="text-2xl font-extrabold text-black dark:text-white">
            <CountUp from={0} to={count} duration={1.1} separator="," />{suffix}
          </p>
          <p className="text-[10px] text-emerald font-semibold">{change}</p>
        </div>
        <div className="h-10 w-10 bg-tranquil-velvet/10 dark:bg-tranquil-velvet-dark/30 rounded-xl flex items-center justify-center text-tranquil-velvet dark:text-amber-400">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </BorderGlow>
  );
}

export function ModuleStatusBadge({ active }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold border ${
        active
          ? 'bg-emerald/15 text-emerald border-emerald/25'
          : 'bg-[#F0F1F5] text-dark-grey border-medium-grey/40 dark:bg-[#27272A] dark:text-text-secondary dark:border-border-card'
      }`}
    >
      {active ? 'Active' : 'Inactive'}
    </span>
  );
}

export function ModuleIconButton({ icon: Icon, label, tone = 'neutral', onClick }) {
  const toneClasses = {
    neutral: 'text-dark-grey hover:text-tranquil-velvet hover:bg-tranquil-velvet/5 dark:hover:bg-white/5',
    danger: 'text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10',
    accent: 'text-tranquil-velvet hover:text-white hover:bg-tranquil-velvet dark:hover:bg-bright-velvet',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className={`h-8 w-8 inline-flex items-center justify-center rounded-lg border border-medium-grey/40 dark:border-border-card bg-white dark:bg-[#16171F] transition ${toneClasses[tone]}`}
    >
      <Icon className="h-3.5 w-3.5" />
    </button>
  );
}

export function ModuleKeyBadge({ value }) {
  return (
    <span className="inline-flex items-center rounded-sm bg-tranquil-velvet/10 text-tranquil-velvet px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider">
      {value}
    </span>
  );
}

export function ModulePagination({ page, totalPages, onPrev, onNext, onPageSelect, totalItems, rangeStart, rangeEnd }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-medium-grey/40 dark:border-border-card pt-4">
      <p className="text-xs text-dark-grey">
        Showing {rangeStart}-{rangeEnd} of {totalItems} modules
      </p>
      <div className="flex items-center gap-2 self-end sm:self-auto">
        <button
          type="button"
          onClick={onPrev}
          disabled={page === 1}
          className="inline-flex items-center gap-1 rounded-lg border border-medium-grey/40 dark:border-border-card bg-white dark:bg-[#16171F] px-3 py-2 text-xs font-bold text-dark-grey disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onPageSelect?.(item)}
              className={`h-8 min-w-8 rounded-lg px-2 text-xs font-bold transition ${
                item === page
                  ? 'bg-tranquil-velvet text-white'
                  : 'bg-white dark:bg-[#16171F] text-dark-grey border border-medium-grey/40 dark:border-border-card hover:border-tranquil-velvet/40'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={onNext}
          disabled={page === totalPages}
          className="inline-flex items-center gap-1 rounded-lg border border-medium-grey/40 dark:border-border-card bg-white dark:bg-[#16171F] px-3 py-2 text-xs font-bold text-dark-grey disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next <ChevronDown className="h-3.5 w-3.5 -rotate-90" />
        </button>
      </div>
    </div>
  );
}

export function ModuleActionsCell({ onView, onEdit, onToggle, onDelete }) {
  return (
    <div className="flex items-center justify-center gap-2">
      <ModuleIconButton icon={Layers3} label="View module hierarchy" onClick={onView} />
      <ModuleIconButton icon={Pencil} label="Edit module" onClick={onEdit} />
      <ModuleIconButton icon={Power} label="Toggle module active state" tone="accent" onClick={onToggle} />
      <ModuleIconButton icon={Trash2} label="Delete module" tone="danger" onClick={onDelete} />
    </div>
  );
}

export function ModuleFormModal({ open, onClose, onSubmit, value, onChange, title = 'Create Module', description = 'Add a reusable module entry to the manager.' }) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-medium-grey dark:border-border-card bg-white dark:bg-[#16171F] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#F0F1F5] dark:border-[#262837] px-6 py-4">
              <div>
                <h3 className="text-sm font-extrabold text-black dark:text-white">{title}</h3>
                <p className="text-[10px] text-dark-grey">{description}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-1.5 text-dark-grey transition hover:bg-[#F7F8FC] dark:hover:bg-[#262837] hover:text-black dark:hover:text-white"
                aria-label="Close module form"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={onSubmit} className="space-y-4 px-6 py-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-dark-grey">Title</label>
                  <input
                    required
                    type="text"
                    value={value.title}
                    onChange={(event) => onChange('title', event.target.value)}
                    placeholder="e.g. Certificates"
                    className="w-full rounded-xl border border-medium-grey dark:border-border-card bg-white dark:bg-[#0F1015] px-3.5 py-2.5 text-xs font-semibold text-black dark:text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-dark-grey">Route</label>
                  <input
                    required
                    type="text"
                    value={value.route}
                    onChange={(event) => onChange('route', event.target.value)}
                    placeholder="/certificates"
                    className="w-full rounded-xl border border-medium-grey dark:border-border-card bg-white dark:bg-[#0F1015] px-3.5 py-2.5 text-xs font-semibold text-black dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-dark-grey">Key</label>
                  <input
                    required
                    type="text"
                    value={value.key}
                    onChange={(event) => onChange('key', event.target.value)}
                    placeholder="CERT"
                    className="w-full rounded-xl border border-medium-grey dark:border-border-card bg-white dark:bg-[#0F1015] px-3.5 py-2.5 text-xs font-semibold text-black dark:text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-dark-grey">Order</label>
                  <input
                    required
                    type="number"
                    min="1"
                    value={value.order}
                    onChange={(event) => onChange('order', event.target.value)}
                    className="w-full rounded-xl border border-medium-grey dark:border-border-card bg-white dark:bg-[#0F1015] px-3.5 py-2.5 text-xs font-semibold text-black dark:text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-dark-grey">Status</label>
                  <select
                    value={value.active ? 'active' : 'inactive'}
                    onChange={(event) => onChange('active', event.target.value === 'active')}
                    className="w-full rounded-xl border border-medium-grey dark:border-border-card bg-white dark:bg-[#0F1015] px-3.5 py-2.5 text-xs font-semibold text-black dark:text-white focus:outline-none"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-dark-grey">Submodules</label>
                <input
                  type="text"
                  value={value.submodules}
                  onChange={(event) => onChange('submodules', event.target.value)}
                  placeholder="Optional submodule count or label"
                  className="w-full rounded-xl border border-medium-grey dark:border-border-card bg-white dark:bg-[#0F1015] px-3.5 py-2.5 text-xs font-semibold text-black dark:text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-medium-grey dark:border-border-card bg-white dark:bg-[#0F1015] px-4 py-2 text-xs font-bold text-dark-grey transition hover:bg-[#F7F8FC] dark:hover:bg-[#262837]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-tranquil-velvet px-4 py-2 text-xs font-bold text-white transition hover:bg-bright-velvet"
                >
                  <Save className="h-3.5 w-3.5" />
                  Save Module
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}