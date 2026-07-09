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
      <div className="p-5 flex justify-between items-center bg-white dark:bg-[#16171F] rounded-xl">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-dark-grey uppercase tracking-wider">{title}</span>
          <p className="text-2xl font-extrabold text-black dark:text-white">
            <CountUp from={0} to={count} duration={1.1} separator="," />{suffix}
          </p>
          <p className="text-[10px] text-emerald font-semibold">{change}</p>
        </div>
        <div className="h-10 w-10 bg-tranquil-velvet/10 dark:bg-tranquil-velvet-dark/30 rounded-lg flex items-center justify-center text-tranquil-velvet dark:text-amber-400">
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
      className={`h-8 w-8 inline-flex cursor-pointer items-center justify-center rounded-lg border border-medium-grey/40 dark:border-border-card bg-white dark:bg-[#16171F] transition ${toneClasses[tone]}`}
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
          className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-medium-grey/40 dark:border-border-card bg-white dark:bg-[#16171F] px-3 py-2 text-xs font-bold text-dark-grey disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onPageSelect?.(item)}
              className={`h-8 min-w-8 cursor-pointer rounded-lg px-2 text-xs font-bold transition ${
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
          className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-medium-grey/40 dark:border-border-card bg-white dark:bg-[#16171F] px-3 py-2 text-xs font-bold text-dark-grey disabled:opacity-40 disabled:cursor-not-allowed"
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
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-3xl overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-white via-[#f8f3ff] to-[#fdfcff] shadow-[0_40px_120px_rgba(99,102,241,0.12)] dark:border-white/5 dark:bg-[#11131a]"
          >
            <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.2),_transparent_24%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.18),_transparent_30%)] pointer-events-none" />
            <div className="relative px-8 pb-8 pt-10">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="mb-8 rounded-[32px] border border-white/80 bg-white/95 p-8 shadow-[0_32px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-700 dark:bg-[#0f1016]/95"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="max-w-2xl space-y-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-950/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-white shadow-sm shadow-slate-900/10">
                      <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#4F46E5] shadow-lg" />
                      {title}
                    </div>
                    <h3 className="text-3xl font-extrabold tracking-[-0.05em] text-slate-950 dark:text-white">{title}</h3>
                    <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-tranquil-velvet/40 hover:text-tranquil-velvet focus:outline-none focus:ring-2 focus:ring-tranquil-velvet/30 dark:border-slate-700 dark:bg-[#141418] dark:text-slate-200"
                    aria-label="Close module form"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>

              <form onSubmit={onSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.33, ease: 'easeOut' }}
                  className="grid grid-cols-1 gap-4 lg:grid-cols-2"
                >
                  <motion.label
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.32, delay: 0.05, ease: 'easeOut' }}
                    className="space-y-3 rounded-[28px] border border-slate-200 bg-slate-50/95 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)] dark:border-slate-700 dark:bg-[#111318]/90"
                  >
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Title</span>
                    <input
                      required
                      type="text"
                      value={value.title}
                      onChange={(event) => onChange('title', event.target.value)}
                      placeholder="e.g. Certificates"
                      className="w-full rounded-[24px] border border-slate-200 bg-white px-4 py-4 text-sm text-slate-900 outline-none transition duration-200 ease-out focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10 dark:border-slate-700 dark:bg-[#16171F] dark:text-white"
                    />
                  </motion.label>
                  <motion.label
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.32, delay: 0.08, ease: 'easeOut' }}
                    className="space-y-3 rounded-[28px] border border-slate-200 bg-slate-50/95 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)] dark:border-slate-700 dark:bg-[#111318]/90"
                  >
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Route</span>
                    <input
                      required
                      type="text"
                      value={value.route}
                      onChange={(event) => onChange('route', event.target.value)}
                      placeholder="/certificates"
                      className="w-full rounded-[24px] border border-slate-200 bg-white px-4 py-4 text-sm text-slate-900 outline-none transition duration-200 ease-out focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10 dark:border-slate-700 dark:bg-[#16171F] dark:text-white"
                    />
                  </motion.label>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.33, delay: 0.1, ease: 'easeOut' }}
                  className="grid grid-cols-1 gap-4 lg:grid-cols-3"
                >
                  <motion.label
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.32, delay: 0.12, ease: 'easeOut' }}
                    className="space-y-3 rounded-[28px] border border-slate-200 bg-slate-50/95 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)] dark:border-slate-700 dark:bg-[#111318]/90"
                  >
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Key</span>
                    <input
                      required
                      type="text"
                      value={value.key}
                      onChange={(event) => onChange('key', event.target.value)}
                      placeholder="CERT"
                      className="w-full rounded-[24px] border border-slate-200 bg-white px-4 py-4 text-sm text-slate-900 outline-none transition duration-200 ease-out focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10 dark:border-slate-700 dark:bg-[#16171F] dark:text-white"
                    />
                  </motion.label>
                  <motion.label
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.32, delay: 0.14, ease: 'easeOut' }}
                    className="space-y-3 rounded-[28px] border border-slate-200 bg-slate-50/95 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)] dark:border-slate-700 dark:bg-[#111318]/90"
                  >
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Order</span>
                    <input
                      required
                      type="number"
                      min="1"
                      value={value.order}
                      onChange={(event) => onChange('order', event.target.value)}
                      className="w-full rounded-[24px] border border-slate-200 bg-white px-4 py-4 text-sm text-slate-900 outline-none transition duration-200 ease-out focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10 dark:border-slate-700 dark:bg-[#16171F] dark:text-white"
                    />
                  </motion.label>
                  <motion.label
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.32, delay: 0.16, ease: 'easeOut' }}
                    className="space-y-3 rounded-[28px] border border-slate-200 bg-slate-50/95 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)] dark:border-slate-700 dark:bg-[#111318]/90"
                  >
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Status</span>
                    <select
                      value={value.active ? 'active' : 'inactive'}
                      onChange={(event) => onChange('active', event.target.value === 'active')}
                      className="w-full rounded-[24px] border border-slate-200 bg-white px-4 py-4 text-sm text-slate-900 outline-none transition duration-200 ease-out focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10 dark:border-slate-700 dark:bg-[#16171F] dark:text-white"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </motion.label>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.33, delay: 0.18, ease: 'easeOut' }}
                  className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)] dark:border-slate-700 dark:bg-[#111318]/90"
                >
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Submodules</span>
                  <input
                    type="text"
                    value={value.submodules}
                    onChange={(event) => onChange('submodules', event.target.value)}
                    placeholder="—"
                    className="mt-3 w-full rounded-[24px] border border-slate-200 bg-white px-4 py-4 text-sm text-slate-900 outline-none transition duration-200 ease-out focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10 dark:border-slate-700 dark:bg-[#16171F] dark:text-white"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.33, delay: 0.2, ease: 'easeOut' }}
                  className="flex flex-col gap-3 sm:flex-row sm:justify-end"
                >
                  <motion.button
                    type="button"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="inline-flex h-14 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:border-tranquil-velvet/40 hover:bg-tranquil-velvet/5 dark:border-slate-700 dark:bg-[#111318] dark:text-slate-200"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#4F46E5] px-6 text-sm font-semibold text-white shadow-[0_20px_45px_rgba(124,58,237,0.3)] transition hover:-translate-y-0.5"
                  >
                    <Save className="h-4 w-4" />
                    Save Module
                  </motion.button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ModuleCard({ module, onView, onEdit, onToggle, onDelete }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      whileHover={{ scale: 1.02, y: -3 }}
      className="relative overflow-hidden rounded-lg border border-medium-grey/40 bg-white/90 p-4 shadow-[0_10px_30px_rgba(132,17,124,0.09)] dark:border-border-card dark:bg-[#16171F]"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cta-orange via-tranquil-velvet to-bright-velvet" />
      <div className="flex items-start justify-between gap-3 pt-2">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <ModuleKeyBadge value={module.key} />
            <h3 className="text-sm font-extrabold text-black dark:text-white">{module.title}</h3>
          </div>
          <p className="text-xs text-dark-grey">
            Route: <span className="font-semibold text-tranquil-velvet dark:text-[#D3CCEC]">{module.route}</span>
          </p>
          <p className="text-xs text-dark-grey">
            Submodules: <span className="font-semibold text-black dark:text-white">{module.submodules}</span>
          </p>
        </div>

        <ModuleStatusBadge active={module.active} />
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 border-t border-medium-grey/20 pt-3 dark:border-border-card">
        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-dark-grey">
          Order {module.order}
        </div>
        <div className="flex items-center gap-2">
          <ModuleIconButton icon={Layers3} label="View" onClick={onView} />
          <ModuleIconButton icon={Pencil} label="Edit" onClick={onEdit} />
          <ModuleIconButton icon={Power} label="Toggle" tone="accent" onClick={onToggle} />
          <ModuleIconButton icon={Trash2} label="Delete" tone="danger" onClick={onDelete} />
        </div>
      </div>
    </motion.div>
  );
}

export function ModuleCardsGrid({ items = [], onView, onEdit, onToggle, onDelete }) {
  return (
    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <AnimatePresence>
        {items.map((module) => (
          <ModuleCard
            key={module.key}
            module={module}
            onView={() => onView?.(module)}
            onEdit={() => onEdit?.(module)}
            onToggle={() => onToggle?.(module)}
            onDelete={() => onDelete?.(module.key)}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}