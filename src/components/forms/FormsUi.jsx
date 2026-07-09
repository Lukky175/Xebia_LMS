/**
 * Author: Abhishek Dixit
 * Institution: Lovely Professional University
 * Develop the UI for the forms in the application using React and Tailwind CSS. 
 * The forms include assessment creation, batch creation, learner management, 
 * and profile editing. 
 * The UI components are designed to be responsive 
 * and user-friendly, with smooth animations 
 * and transitions for a better user experience.
 */

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Save, Camera } from 'lucide-react';
import { useAuth } from '@/context/AuthContext.jsx';

function Backdrop({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm"
    />
  );
}

const modalVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.05, ease: 'easeOut' } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: 'easeOut' } },
};

export function AssessmentFormModal({ open, onClose, onSubmit, value = {}, onChange }) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Backdrop onClose={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#FFFFFF] via-[#F7F4FF] to-[#EFF3FF] p-8 shadow-[0_32px_80px_rgba(15,23,42,0.16)]"
          >
            <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.18),_transparent_25%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.16),_transparent_30%)] pointer-events-none" />
            <div className="relative">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between mb-6">
                <div className="space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6D28D9]">Create assessment</p>
                  <h3 className="text-3xl font-extrabold text-slate-950">New assessment flow with premium launch tools</h3>
                  <p className="max-w-2xl text-sm leading-6 text-slate-600">Design the core assessment, set the audience, and choose the exact status before launch.</p>
                </div>
                <button onClick={onClose} className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-[#7C3AED]/40 hover:text-[#7C3AED]">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 mb-6">
                {['Fast setup', 'Draft autosave', 'Launch-ready'].map((item) => (
                  <div key={item} className="rounded-2xl bg-white/90 p-4 text-sm font-semibold text-slate-700 shadow-sm border border-white/80">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="rounded-xl border border-[#E7E3FF] bg-white/90 p-5 shadow-sm">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6D28D9]">Assessment name</p>
                  <input
                    required
                    value={value.name || ''}
                    onChange={(e) => onChange('name', e.target.value)}
                    placeholder="e.g. Engineering Certification"
                    className="mt-3 w-full rounded-2xl border border-slate-200 bg-[#F8F6FF] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/15"
                  />
                </div>
                <div className="rounded-xl border border-[#E7E3FF] bg-white/90 p-5 shadow-sm">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6D28D9]">Type</p>
                  <select
                    value={value.type || 'Quiz'}
                    onChange={(e) => onChange('type', e.target.value)}
                    className="mt-3 w-full rounded-2xl border border-slate-200 bg-[#F8F6FF] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/15"
                  >
                    <option>Quiz</option>
                    <option>Certification</option>
                    <option>Compliance</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="rounded-xl border border-[#E7E3FF] bg-white/90 p-5 shadow-sm">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6D28D9]">Target group</p>
                  <input
                    value={value.target || ''}
                    onChange={(e) => onChange('target', e.target.value)}
                    placeholder="e.g. Product Team"
                    className="mt-3 w-full rounded-2xl border border-slate-200 bg-[#F8F6FF] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/15"
                  />
                </div>
                <div className="rounded-xl border border-[#E7E3FF] bg-white/90 p-5 shadow-sm">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6D28D9]">Status</p>
                  <select
                    value={value.status || 'DRAFT'}
                    onChange={(e) => onChange('status', e.target.value)}
                    className="mt-3 w-full rounded-2xl border border-slate-200 bg-[#F8F6FF] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/15"
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="ACTIVE">Active</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </div>
                <div className="rounded-xl border border-[#E7E3FF] bg-[#EEF2FF]/90 p-5 shadow-sm">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#4338CA]">Why this assessment?</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">Give learners clarity on the goal of this assessment and who should complete it first.</p>
                </div>
              </div>

              <div className="rounded-xl border border-[#E9E7FF] bg-white/90 p-5 shadow-sm">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6D28D9]">Launch details</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-[#F7F4FF] p-4 text-sm text-slate-700">Draft mode is autosaved as you work.</div>
                  <div className="rounded-2xl bg-[#EEF2FF] p-4 text-sm text-slate-700">Status changes are reflected instantly in the table.</div>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end sm:items-center">
                <motion.button
                  type="button"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="inline-flex h-14 items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] px-6 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(124,58,237,0.24)] transition hover:shadow-[0_22px_50px_rgba(124,58,237,0.32)]"
                >
                  <Save className="h-4 w-4" />
                  Create assessment
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function BatchFormModal({ open, onClose, onSubmit, value = {}, onChange }) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Backdrop onClose={onClose} />
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className="relative z-10 w-full max-w-2xl rounded-2xl bg-[#fff7f0] p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-extrabold">Create Batch</h3>
                <p className="text-sm text-dark-grey">Create a cohort and invite learners later.</p>
              </div>
              <button onClick={onClose} className="h-10 w-10 rounded-lg bg-white/80 flex items-center justify-center"><X className="h-5 w-5" /></button>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label>
                  <div className="text-[10px] font-semibold uppercase text-dark-grey">Batch name</div>
                  <input required value={value.name || ''} onChange={(e) => onChange('name', e.target.value)} className="mt-2 w-full rounded-xl border px-3 py-2" />
                </label>
                <label>
                  <div className="text-[10px] font-semibold uppercase text-dark-grey">Organisation</div>
                  <input value={value.organisation || ''} onChange={(e) => onChange('organisation', e.target.value)} className="mt-2 w-full rounded-xl border px-3 py-2" />
                </label>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <label>
                  <div className="text-[10px] font-semibold uppercase text-dark-grey">Learners</div>
                  <input type="number" min="0" value={value.learners || 0} onChange={(e) => onChange('learners', e.target.value)} className="mt-2 w-full rounded-xl border px-3 py-2" />
                </label>
                <label>
                  <div className="text-[10px] font-semibold uppercase text-dark-grey">Duration</div>
                  <select value={value.duration || '3 Months (12 Weeks)'} onChange={(e) => onChange('duration', e.target.value)} className="mt-2 w-full rounded-xl border px-3 py-2">
                    <option>3 Months (12 Weeks)</option>
                    <option>6 Months</option>
                    <option>1 Year</option>
                  </select>
                </label>
                <label>
                  <div className="text-[10px] font-semibold uppercase text-dark-grey">Status</div>
                  <select value={value.status || 'Pending Approval'} onChange={(e) => onChange('status', e.target.value)} className="mt-2 w-full rounded-xl border px-3 py-2">
                    <option>Pending Approval</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                  </select>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button type="button" onClick={onClose} className="rounded-xl border px-4 py-2">Cancel</button>
                <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-cta-orange px-4 py-2 text-white">Save</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function LearnerFormModal({ open, onClose, onSubmit, value = {}, onChange, mode = 'create' }) {
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
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white via-[#f9f4ff] to-[#fbf7f8] shadow-[0_32px_70px_rgba(15,23,42,0.18)] dark:border-white/5 dark:bg-[#11131a]"
          >
            <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top_left,_rgba(255,98,0,0.24),_transparent_22%),radial-gradient(circle_at_top_right,_rgba(132,17,124,0.18),_transparent_28%)] pointer-events-none" />
            <div className="relative px-10 pt-10 pb-8">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className="mb-8 rounded-xl border border-white/70 bg-white/95 p-8 shadow-[0_32px_80px_rgba(15,23,42,0.08)] dark:border-slate-700 dark:bg-[#0f1016]/95"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="max-w-2xl space-y-3">
                    <div className="text-xs font-semibold uppercase tracking-[0.26em] text-tranquil-velvet/80">
                      {mode === 'create' ? 'Create learner' : 'Edit learner'}
                    </div>
                    <h3 className="text-3xl font-extrabold tracking-[-0.05em] text-slate-950 dark:text-white">
                      {mode === 'create' ? 'Create learner' : 'Learner details'}
                    </h3>
                    <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                      Build learner profiles with a polished form experience designed for clarity, speed, and modern admin workflows.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-tranquil-velvet/40 hover:text-tranquil-velvet focus:outline-none focus:ring-2 focus:ring-tranquil-velvet/30 dark:border-slate-700 dark:bg-[#141418] dark:text-slate-200"
                    aria-label="Close learner form"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>

              <form onSubmit={onSubmit} className="space-y-6">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={modalVariants}
                  className="grid grid-cols-1 gap-4 lg:grid-cols-2"
                >
                  <motion.div
                    variants={cardVariants}
                    whileHover={{ y: -2, scale: 1.01 }}
                    className="space-y-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-[#141418]/90"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Name</p>
                    <input
                      required
                      type="text"
                      value={value.name || ''}
                      onChange={(event) => onChange('name', event.target.value)}
                      placeholder="Jane Doe"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none transition duration-200 ease-out focus:border-tranquil-velvet focus:ring-2 focus:ring-tranquil-velvet/10 dark:border-slate-700 dark:bg-[#111318] dark:text-white"
                    />
                  </motion.div>
                  <motion.div
                    variants={cardVariants}
                    whileHover={{ y: -2, scale: 1.01 }}
                    className="space-y-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-[#141418]/90"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Email</p>
                    <input
                      required
                      type="email"
                      value={value.email || ''}
                      onChange={(event) => onChange('email', event.target.value)}
                      placeholder="jane@example.com"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none transition duration-200 ease-out focus:border-tranquil-velvet focus:ring-2 focus:ring-tranquil-velvet/10 dark:border-slate-700 dark:bg-[#111318] dark:text-white"
                    />
                  </motion.div>
                </motion.div>

                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={modalVariants}
                  className="grid grid-cols-1 gap-4 lg:grid-cols-2"
                >
                  <motion.div
                    variants={cardVariants}
                    whileHover={{ y: -2, scale: 1.01 }}
                    className="space-y-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-[#141418]/90"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Organisation</p>
                    <input
                      value={value.organisation || ''}
                      onChange={(event) => onChange('organisation', event.target.value)}
                      placeholder="State Technical University"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none transition duration-200 ease-out focus:border-tranquil-velvet focus:ring-2 focus:ring-tranquil-velvet/10 dark:border-slate-700 dark:bg-[#111318] dark:text-white"
                    />
                  </motion.div>
                  <motion.div
                    variants={cardVariants}
                    whileHover={{ y: -2, scale: 1.01 }}
                    className="space-y-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-[#141418]/90"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Type</p>
                    <select
                      value={value.type || 'University'}
                      onChange={(event) => onChange('type', event.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none transition duration-200 ease-out focus:border-tranquil-velvet focus:ring-2 focus:ring-tranquil-velvet/10 dark:border-slate-700 dark:bg-[#111318] dark:text-white"
                    >
                      <option>University</option>
                      <option>Institute</option>
                    </select>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={modalVariants}
                  className="grid grid-cols-1 gap-4 lg:grid-cols-3"
                >
                  <motion.div
                    variants={cardVariants}
                    whileHover={{ y: -2, scale: 1.01 }}
                    className="space-y-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-[#141418]/90"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Domain</p>
                    <input
                      value={value.domain || ''}
                      onChange={(event) => onChange('domain', event.target.value)}
                      placeholder="DevOps & Cloud"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none transition duration-200 ease-out focus:border-tranquil-velvet focus:ring-2 focus:ring-tranquil-velvet/10 dark:border-slate-700 dark:bg-[#111318] dark:text-white"
                    />
                  </motion.div>
                  <motion.div
                    variants={cardVariants}
                    whileHover={{ y: -2, scale: 1.01 }}
                    className="space-y-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-[#141418]/90"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Semester</p>
                    <input
                      type="number"
                      min="1"
                      value={value.sem || 1}
                      onChange={(event) => onChange('sem', event.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none transition duration-200 ease-out focus:border-tranquil-velvet focus:ring-2 focus:ring-tranquil-velvet/10 dark:border-slate-700 dark:bg-[#111318] dark:text-white"
                    />
                  </motion.div>
                  <motion.div
                    variants={cardVariants}
                    whileHover={{ y: -2, scale: 1.01 }}
                    className="space-y-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-[#141418]/90"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Status</p>
                    <select
                      value={value.status || 'Active'}
                      onChange={(event) => onChange('status', event.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none transition duration-200 ease-out focus:border-tranquil-velvet focus:ring-2 focus:ring-tranquil-velvet/10 dark:border-slate-700 dark:bg-[#111318] dark:text-white"
                    >
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                  className="flex flex-col gap-3 sm:flex-row sm:justify-end"
                >
                  <motion.button
                    type="button"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="inline-flex h-14 items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:border-tranquil-velvet/40 hover:bg-tranquil-velvet/5 dark:border-slate-700 dark:bg-[#111318] dark:text-slate-200"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-tranquil-velvet to-bright-velvet px-6 text-sm font-semibold text-white shadow-[0_20px_45px_rgba(132,17,124,0.3)] transition hover:-translate-y-0.5"
                  >
                    <Save className="h-4 w-4" />
                    {mode === 'create' ? 'Create learner' : 'Save learner'}
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

export function ProfileEditModal({ open, onClose, onSubmit, value = {}, onChange }) {
  const { currentUser } = useAuth();
  const [imagePreview, setImagePreview] = useState(value.profileImage || '');

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        setImagePreview(result);
        onChange('profileImage', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview('');
    onChange('profileImage', '');
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 overflow-y-auto py-8 px-4"
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
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="relative z-10 mx-auto flex h-[calc(100vh-4rem)] w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#F6F8FF] via-[#EFF3FF] to-[#F7F7FF] shadow-[0_34px_100px_rgba(17,24,39,0.14)] dark:border-white/5 dark:bg-[#11131a]"
          >
            <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_22%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.14),_transparent_28%)] pointer-events-none" />
            <div className="relative flex h-full flex-col overflow-hidden">
              <div className="relative flex-1 overflow-y-auto px-10 pt-10 pb-8">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className="mb-8 flex flex-col gap-4 rounded-3xl border border-white/70 bg-white/90 p-6 shadow-[0_25px_60px_rgba(255,255,255,0.8)] backdrop-blur-xl dark:border-slate-700 dark:bg-[#0f1016]/90"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-slate-900 to-[#4f46e5] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.26em] text-white shadow-sm">
                      <span className="h-2.5 w-2.5 rounded-full bg-white" />
                      Edit Profile
                    </div>
                    <h3 className="text-3xl font-extrabold tracking-[-0.05em] text-slate-950 dark:text-white">Edit profile</h3>
                    <p className="max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                      Update your display details, manage your role, and adjust your profile photo directly in one elegant flow.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-[#6366f1]/40 hover:text-[#4f46e5] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 dark:border-slate-700 dark:bg-[#141418] dark:text-slate-200"
                    aria-label="Close edit profile"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[
                    { label: 'Upload or remove your profile picture instantly.', tone: 'bg-[#EEF2FF] text-slate-950' },
                    { label: 'Live preview updates as you choose a new image.', tone: 'bg-[#F3E8FF] text-[#7C3AED]' },
                    { label: 'Smooth animated controls for a more premium feel.', tone: 'bg-[#EDE9FE] text-[#4338CA]' },
                  ].map((item) => (
                    <motion.div
                      key={item.label}
                      variants={cardVariants}
                      whileHover={{ y: -2, scale: 1.01 }}
                      className={`rounded-2xl px-4 py-3 text-sm font-semibold shadow-sm border border-white/80 ${item.tone}`}
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <form onSubmit={onSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center gap-4 rounded-2xl border border-[#EDE9FE] bg-gradient-to-br from-[#EEF2FF] via-[#F5E8FF] to-[#FDF2F8] p-6 text-center shadow-[0_30px_80px_rgba(124,58,237,0.12)]"
                >
                  <div className="relative">
                    <div className="h-32 w-32 rounded-full bg-gradient-to-br from-tranquil-velvet via-bright-velvet to-[#9333EA] p-1 shadow-xl">
                      <div className="h-full w-full overflow-hidden rounded-full bg-white">
                        {imagePreview ? (
                          <img src={imagePreview} alt="Profile preview" className="h-full w-full object-cover" />
                        ) : (
                          <div className="grid h-full w-full place-items-center text-4xl font-black text-tranquil-velvet">{value.displayName?.[0] || 'P'}</div>
                        )}
                      </div>
                    </div>
                    <label className="absolute -bottom-3 right-0 inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-bold text-tranquil-velvet shadow-lg border border-tranquil-velvet/20 cursor-pointer hover:bg-tranquil-velvet/10">
                      <Camera className="h-3.5 w-3.5" />
                      Change
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xl font-bold text-slate-950">Your profile picture</p>
                    <p className="text-sm text-dark-grey">Center aligned avatar with a premium brand glow.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-tranquil-velvet shadow-sm border border-tranquil-velvet/30 hover:bg-tranquil-velvet/10 transition"
                  >
                    Remove photo
                  </button>
                </motion.div>

                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={modalVariants}
                  className="grid grid-cols-1 gap-4 lg:grid-cols-[0.95fr_1.05fr]"
                >
                  <motion.div
                    variants={cardVariants}
                    whileHover={{ y: -2, scale: 1.01 }}
                    className="space-y-3 rounded-xl border border-slate-200 bg-white/90 p-5 shadow-sm dark:border-slate-700 dark:bg-[#141418]/90"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Display name</p>
                    <input
                      value={value.displayName || ''}
                      onChange={(event) => onChange('displayName', event.target.value)}
                      placeholder="Platform Admin"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none transition duration-200 ease-out focus:border-[#4338ca] focus:ring-2 focus:ring-[#4338ca]/10 dark:border-slate-700 dark:bg-[#111318] dark:text-white"
                    />
                  </motion.div>
                  <motion.div
                    variants={cardVariants}
                    whileHover={{ y: -2, scale: 1.01 }}
                    className="space-y-3 rounded-xl border border-slate-200 bg-white/90 p-5 shadow-sm dark:border-slate-700 dark:bg-[#141418]/90"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Email</p>
                    <input
                      type="email"
                      value={value.email || ''}
                      onChange={(event) => onChange('email', event.target.value)}
                      placeholder="admin@xebia.lms"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none transition duration-200 ease-out focus:border-[#4338ca] focus:ring-2 focus:ring-[#4338ca]/10 dark:border-slate-700 dark:bg-[#111318] dark:text-white"
                    />
                  </motion.div>
                </motion.div>

                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={modalVariants}
                  className="grid grid-cols-1 gap-4 lg:grid-cols-2"
                >
                  <motion.div
                    variants={cardVariants}
                    whileHover={{ y: -2, scale: 1.01 }}
                    className="space-y-3 rounded-xl border border-slate-200 bg-white/90 p-5 shadow-sm dark:border-slate-700 dark:bg-[#141418]/90"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Role</p>
                    <select
                      value={value.role || 'admin'}
                      onChange={(event) => onChange('role', event.target.value)}
                      disabled={currentUser?.role !== 'superadmin'}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none transition duration-200 ease-out focus:border-[#4338ca] focus:ring-2 focus:ring-[#4338ca]/10 dark:border-slate-700 dark:bg-[#111318] dark:text-white disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <option value="superadmin">SUPERADMIN</option>
                      <option value="admin">ADMIN</option>
                      <option value="trainer">TRAINER</option>
                      <option value="student">STUDENT</option>
                    </select>
                  </motion.div>
                  <motion.div
                    variants={cardVariants}
                    whileHover={{ y: -2, scale: 1.01 }}
                    className="space-y-3 rounded-xl border border-slate-200 bg-white/90 p-5 shadow-sm dark:border-slate-700 dark:bg-[#141418]/90"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Sub role</p>
                    <input
                      value={value.subRole || ''}
                      onChange={(event) => onChange('subRole', event.target.value)}
                      placeholder="Super admin"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none transition duration-200 ease-out focus:border-[#4338ca] focus:ring-2 focus:ring-[#4338ca]/10 dark:border-slate-700 dark:bg-[#111318] dark:text-white"
                    />
                  </motion.div>
                </motion.div>

                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={modalVariants}
                  className="grid grid-cols-1 gap-4 lg:grid-cols-2"
                >
                  <motion.div
                    variants={cardVariants}
                    whileHover={{ y: -2, scale: 1.01 }}
                    className="space-y-3 rounded-xl border border-[#D8B4FE] bg-white/90 p-5 shadow-sm"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6D28D9]">Profile details</p>
                    <div className="rounded-xl border border-[#E9D5FF] bg-[#FAF5FF] p-4 text-sm text-slate-700">
                      <p className="font-semibold text-slate-900">Profile image</p>
                      <p className="mt-2 text-sm">Use the centered avatar block above to update your photo and keep the layout clean.</p>
                    </div>
                  </motion.div>
                  <motion.div
                    variants={cardVariants}
                    whileHover={{ y: -2, scale: 1.01 }}
                    className="space-y-3 rounded-xl border border-[#D8B4FE] bg-[#F8F0FF] p-5 shadow-sm"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6D28D9]">Preview</p>
                    <div className="rounded-2xl border border-dashed border-[#C4B5FD] bg-white p-6 text-sm text-slate-700">
                      <p className="font-semibold text-slate-900">Profile image preview</p>
                      <p className="mt-2 text-sm text-slate-500">This preview updates as you choose a new photo. Remove it anytime to revert to initials.</p>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                  className="flex flex-col gap-3 sm:flex-row sm:justify-end"
                >
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex h-14 items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:border-[#4338ca]/40 hover:bg-[#EFF6FF] dark:border-slate-700 dark:bg-[#111318] dark:text-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-slate-900 via-[#4338ca] to-[#6366f1] px-6 text-sm font-semibold text-white shadow-[0_20px_45px_rgba(67,56,202,0.28)] transition hover:-translate-y-0.5"
                  >
                    <Save className="h-4 w-4" />
                    Save profile
                  </button>
                </motion.div>
              </form>
            </div>
          </div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
