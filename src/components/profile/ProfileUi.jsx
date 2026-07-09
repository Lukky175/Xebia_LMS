/**
 * Author: Abhishek Dixit
 * Institution: Lovely Professional University
 * Develop the UI components for the profile management system, 
 * including cards, badges, buttons, and modals.
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export function ProfileCardFrame({ children, className = '' }) {
  return (
    <div className={`rounded-2xl border border-[#E7E9F0] bg-white dark:bg-[#16171F] shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function ProfileActionButton({ children, tone = 'primary', className = '', ...rest }) {
  const toneClasses = {
    primary: 'bg-tranquil-velvet hover:bg-bright-velvet text-white',
    secondary: 'bg-white border border-[#E7E9F0] text-tranquil-velvet hover:bg-[#F4E5F5] hover:text-tranquil-velvet',
    success: 'bg-emerald text-white hover:bg-emerald/90',
    warning: 'bg-cta-orange hover:bg-[#E05600] text-white',
  };

  return (
    <button
      {...rest}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-shadow shadow-sm ${toneClasses[tone] || toneClasses.primary} ${className}`}
    >
      {children}
    </button>
  );
}

export function ProfileBadge({ children, tone = 'secondary' }) {
  const toneClasses = {
    secondary: 'bg-tranquil-velvet text-white',
    accent: 'bg-[#FF6200] text-white',
    info: 'bg-[#F4F5F5] text-tranquil-velvet border border-tranquil-velvet/20',
    success: 'bg-emerald/15 text-emerald border border-emerald/30',
    warning: 'bg-[#FFF4E5] text-cta-orange border border-cta-orange/30',
  };
  const classes = toneClasses[tone] || toneClasses.secondary;
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${classes}`}>
      {children}
    </span>
  );
}

export function ProfileInfoRow({ label, value, code }) {
  return (
    <div className="flex flex-col gap-2 border-b border-medium-grey/30 pb-4 last:border-b-0 last:pb-0">
      <div className="flex items-center justify-between gap-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-dark-grey">{label}</span>
        <span className={`text-sm font-semibold ${code ? 'font-mono bg-[#F4F5FF] dark:bg-[#0F1015] rounded-lg px-2 py-1 text-tranquil-velvet' : 'text-black dark:text-white'}`}>
          {value}
        </span>
      </div>
    </div>
  );
}

export function ScopePill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-emerald/30 bg-emerald/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald">
      {children}
    </span>
  );
}

export function ModuleLinkRow({ title, path, highlight }) {
  return (
    <div className="rounded-2xl border border-[#E7E9F0] dark:border-white/5 bg-white dark:bg-[#16171F] p-5 shadow-xs transition-all duration-300 hover:border-tranquil-velvet/40 dark:hover:border-tranquil-velvet/40 hover:bg-[#F8FAFC]/55 dark:hover:bg-[#1c1e28]/70 hover:scale-[1.01] hover:shadow-md">
      <div className="flex items-center justify-between gap-3">
        <span className="font-bold tracking-tight text-slate-900 dark:text-white transition duration-200">{title}</span>
        {highlight && <ProfileBadge tone="accent">{highlight}</ProfileBadge>}
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-mono font-medium">{path}</p>
    </div>
  );
}

export function ProfileActionModal({ open, onClose, title, description, children, footer }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/85 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            className="relative z-10 w-full max-w-2xl rounded-2xl bg-white dark:bg-[#16171F] border border-medium-grey dark:border-white/5 shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-medium-grey/30 px-6 py-4">
              <div>
                <h3 className="text-lg font-extrabold text-black dark:text-white">{title}</h3>
                {description && <p className="text-xs text-dark-grey mt-1">{description}</p>}
              </div>
              <button onClick={onClose} className="rounded-full p-2 text-dark-grey hover:bg-[#F7F8FC] dark:hover:bg-[#0F1015] transition cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-6 max-h-[calc(100vh-16rem)] overflow-y-auto">{children}</div>
            {footer && <div className="border-t border-medium-grey/30 px-6 py-4 bg-[#FAFBFF] dark:bg-[#11131A]">{footer}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
