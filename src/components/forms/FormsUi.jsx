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

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Save, Camera, User } from 'lucide-react';
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


export function ProfileEditModal({ open, onClose, onSubmit, value = {}, isSaving = false }) {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    role: 'admin',
    subRole: '',
    profileImage: ''
  });
  const [imagePreview, setImagePreview] = useState('');
  const [avatarKey, setAvatarKey] = useState(0);

  useEffect(() => {
    if (open) {
      setFormData({
        displayName: value.displayName || '',
        email: value.email || '',
        role: value.role || 'admin',
        subRole: value.subRole || '',
        profileImage: value.profileImage || ''
      });
      setImagePreview(value.profileImage || '');
    }
  }, [open, value]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && !isSaving) {
        onClose();
      }
    };
    if (open) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose, isSaving]);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        setImagePreview(result);
        setFormData(prev => ({ ...prev, profileImage: result }));
        setAvatarKey(prev => prev + 1);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview('');
    setFormData(prev => ({ ...prev, profileImage: '' }));
    setAvatarKey(prev => prev + 1);
  };

  const handleFieldChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isSaving) return;
    onSubmit(formData);
  };

  return (
    <AnimatePresence>
      {open && (
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
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-black dark:text-white">Edit Profile</h2>
                  <p className="text-xs text-dark-grey font-medium">Modify your user settings</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                disabled={isSaving}
                className="p-2 rounded-xl text-dark-grey hover:bg-medium-grey/30 dark:hover:bg-border-card/50 transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <form onSubmit={handleFormSubmit} className="p-6 space-y-5">
              {/* Profile Photo Row */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-blueish-grey dark:bg-bg-page border border-medium-grey dark:border-border-card">
                <motion.div 
                  key={avatarKey}
                  animate={{ scale: [0.95, 1.05, 1] }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="relative shrink-0"
                >
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-tranquil-velvet via-bright-velvet to-[#9333EA] p-0.5 shadow-md">
                    <div className="h-full w-full overflow-hidden rounded-full bg-white dark:bg-[#16171F]">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Profile preview" className="h-full w-full object-cover" />
                      ) : (
                        <div className="grid h-full w-full place-items-center text-xl font-black text-tranquil-velvet dark:text-[#a855f7]">{formData.displayName?.[0] || 'P'}</div>
                      )}
                    </div>
                  </div>
                  <label className="absolute -bottom-1 -right-1 inline-flex items-center justify-center h-6 w-6 rounded-full bg-white dark:bg-[#1f2029] text-tranquil-velvet dark:text-[#b48eff] shadow border border-tranquil-velvet/20 dark:border-[#b48eff]/20 cursor-pointer hover:scale-105 transition duration-150">
                    <Camera className="h-3.5 w-3.5" />
                    <input type="file" accept="image/*" disabled={isSaving} onChange={handleImageChange} className="hidden" />
                  </label>
                </motion.div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-black dark:text-white">Profile picture</p>
                  <p className="text-[10px] text-dark-grey">Choose a new avatar photo</p>
                  {imagePreview && (
                    <button
                      type="button"
                      disabled={isSaving}
                      onClick={handleRemoveImage}
                      className="text-[10px] font-bold text-red-500 hover:underline cursor-pointer disabled:opacity-50"
                    >
                      Remove photo
                    </button>
                  )}
                </div>
              </div>

              {/* Display name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-dark-grey uppercase tracking-wider">Display Name</label>
                <input
                  required
                  type="text"
                  value={formData.displayName}
                  disabled={isSaving}
                  onChange={(e) => handleFieldChange('displayName', e.target.value)}
                  placeholder="e.g. Content Manager"
                  className="w-full px-4 py-3 rounded-xl bg-blueish-grey dark:bg-bg-page border border-medium-grey dark:border-border-card text-black dark:text-white text-sm font-medium focus:outline-none focus:border-tranquil-velvet focus:ring-1 focus:ring-tranquil-velvet transition"
                />
              </div>

              {/* Email address */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-dark-grey uppercase tracking-wider">Email Address</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  disabled={isSaving}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  placeholder="admin@xebia.lms"
                  className="w-full px-4 py-3 rounded-xl bg-blueish-grey dark:bg-bg-page border border-medium-grey dark:border-border-card text-black dark:text-white text-sm font-medium focus:outline-none focus:border-tranquil-velvet focus:ring-1 focus:ring-tranquil-velvet transition"
                />
              </div>

              {/* Grid for Role and Title */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-dark-grey uppercase tracking-wider">Access Role</label>
                  <select
                    value={formData.role}
                    disabled={isSaving || currentUser?.role !== 'superadmin'}
                    onChange={(e) => handleFieldChange('role', e.target.value)}
                    className="w-full px-3 py-3 rounded-xl bg-blueish-grey dark:bg-bg-page border border-medium-grey dark:border-border-card text-black dark:text-white text-xs font-medium focus:outline-none focus:border-tranquil-velvet focus:ring-1 focus:ring-tranquil-velvet transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <option value="superadmin">SUPERADMIN</option>
                    <option value="admin">ADMIN</option>
                    <option value="trainer">TRAINER</option>
                    <option value="student">STUDENT</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-dark-grey uppercase tracking-wider">Specialty / Title</label>
                  <input
                    type="text"
                    value={formData.subRole}
                    disabled={isSaving}
                    onChange={(e) => handleFieldChange('subRole', e.target.value)}
                    placeholder="e.g. Senior Instructor"
                    className="w-full px-4 py-3 rounded-xl bg-blueish-grey dark:bg-bg-page border border-medium-grey dark:border-border-card text-black dark:text-white text-sm font-medium focus:outline-none focus:border-tranquil-velvet focus:ring-1 focus:ring-tranquil-velvet transition"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-medium-grey/40 dark:border-border-card">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-xl font-bold text-dark-grey hover:bg-blueish-grey dark:hover:bg-bg-page transition cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-xl font-bold text-white bg-tranquil-velvet hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2 cursor-pointer"
                >
                  {isSaving ? (
                    <>
                      <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
