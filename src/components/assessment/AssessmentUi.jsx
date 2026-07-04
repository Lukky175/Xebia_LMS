/**
 * Assessment UI Components
 * Reusable components for assessment-related UI elements
 */

import React, { useState } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

/**
 * AssessmentBadge - Assessment status badge
 */
export function AssessmentBadge({ children, status = 'pending' }) {
  const statusStyles = {
    pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    completed: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    failed: 'bg-red-500/10 text-red-600 dark:text-red-400',
    in_progress: 'bg-tranquil-velvet/10 text-tranquil-velvet dark:bg-tranquil-velvet/20',
  };

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold ${statusStyles[status] || statusStyles.pending}`}>
      {children}
    </span>
  );
}

/**
 * AssessmentTableRow - Table row for assessment data
 */
export function AssessmentTableRow({ 
  title, 
  score, 
  maxScore, 
  status, 
  date,
  actions = [] 
}) {
  const percentage = (score / maxScore) * 100;
  
  return (
    <tr className="border-b border-medium-grey/30 dark:border-border-card/30 hover:bg-tranquil-velvet/5 dark:hover:bg-white/5 transition-colors">
      <td className="p-4">
        <p className="font-bold text-black dark:text-white text-sm">{title}</p>
      </td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          <div className="w-16 h-2 bg-medium-grey/20 dark:bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-tranquil-velvet" 
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-dark-grey">{Math.round(percentage)}%</span>
        </div>
      </td>
      <td className="p-4">
        <span className="text-sm font-semibold text-black dark:text-white">{score}/{maxScore}</span>
      </td>
      <td className="p-4">
        <AssessmentBadge status={status}>{status}</AssessmentBadge>
      </td>
      <td className="p-4">
        <span className="text-xs text-dark-grey">{date}</span>
      </td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          {actions.map((action, index) => (
            <button
              key={index}
              type="button"
              onClick={action.onClick}
              className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-medium-grey/40 dark:border-border-card bg-white dark:bg-[#16171F] text-dark-grey hover:text-tranquil-velvet hover:bg-tranquil-velvet/5 transition"
              title={action.label}
            >
              {action.icon}
            </button>
          ))}
        </div>
      </td>
    </tr>
  );
}

/**
 * AssessmentToolbarButton - Assessment toolbar button
 */
export function AssessmentToolbarButton({ 
  children, 
  onClick, 
  variant = 'primary',
  disabled = false,
  className = '',
  icon: Icon = null,
}) {
  const variantStyles = {
    primary: 'bg-tranquil-velvet text-white hover:bg-bright-velvet',
    secondary: 'bg-white dark:bg-[#16171F] border border-medium-grey/40 dark:border-border-card text-dark-grey hover:text-tranquil-velvet hover:bg-tranquil-velvet/5',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${className}`}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </button>
  );
}

/**
 * AssessmentScoreCard - Display assessment score
 */
export function AssessmentScoreCard({ 
  title, 
  score, 
  maxScore, 
  date,
  status = 'completed',
}) {
  const percentage = (score / maxScore) * 100;
  const isPassed = percentage >= 70;

  return (
    <div className="rounded-2xl border border-medium-grey/30 dark:border-border-card bg-[#FBFBFE] dark:bg-[#0F1015] p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-black dark:text-white text-sm">{title}</h3>
          <p className="text-[10px] text-dark-grey mt-1">{date}</p>
        </div>
        {isPassed ? (
          <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
        ) : (
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
        )}
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-dark-grey">Score</span>
            <span className="text-sm font-bold text-black dark:text-white">{score}/{maxScore}</span>
          </div>
          <div className="w-full h-2 bg-medium-grey/20 dark:bg-white/10 rounded-full overflow-hidden">
            <div 
              className={`h-full ${isPassed ? 'bg-emerald-500' : 'bg-red-500'}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-medium-grey/20 dark:border-border-card">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-dark-grey">
            {isPassed ? 'Passed' : 'Not Passed'}
          </span>
          <span className={`text-sm font-bold ${isPassed ? 'text-emerald-600' : 'text-red-600'}`}>
            {Math.round(percentage)}%
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * AssessmentQuestionCard - Assessment question display
 */
export function AssessmentQuestionCard({ 
  question, 
  options = [], 
  answer = null,
  onSelectAnswer = () => {},
  disabled = false,
}) {
  return (
    <div className="rounded-2xl border border-medium-grey/30 dark:border-border-card bg-[#FBFBFE] dark:bg-[#0F1015] p-5 space-y-4">
      <p className="font-semibold text-black dark:text-white text-sm">
        {question}
      </p>

      <div className="space-y-2">
        {options.map((option, index) => (
          <button
            key={index}
            type="button"
            onClick={() => !disabled && onSelectAnswer(option.id)}
            disabled={disabled}
            className={`w-full rounded-lg px-4 py-3 text-xs font-semibold text-left transition ${
              answer === option.id
                ? 'bg-tranquil-velvet text-white'
                : 'border border-medium-grey/40 dark:border-border-card bg-white dark:bg-[#16171F] text-dark-grey hover:border-tranquil-velvet hover:bg-tranquil-velvet/5'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * AssessmentFrame - Container frame for assessment content
 */
export function AssessmentFrame({ children, className = '' }) {
  return (
    <div className={`rounded-2xl border border-medium-grey/30 dark:border-border-card bg-[#FBFBFE] dark:bg-[#0F1015] p-5 ${className}`}>
      {children}
    </div>
  );
}

/**
 * AssessmentIcons - Icons for assessment status
 */
export const AssessmentIcons = {
  passed: '✓',
  failed: '✗',
  pending: '⏳',
  inProgress: '◐',
};

/**
 * AssessmentModal - Modal for assessment actions
 */
export function AssessmentModal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-[#1A1B23] border border-white/60 dark:border-border-card p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-extrabold text-black dark:text-white">{title}</h2>
          <button onClick={onClose} className="p-1">
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

/**
 * AssessmentPagination - Pagination component for assessments
 */
export function AssessmentPagination({ current, total, onPageChange }) {
  return (
    <div className="flex items-center gap-2">
      <button
        disabled={current === 1}
        onClick={() => onPageChange(current - 1)}
        className="px-3 py-2 rounded-lg border border-medium-grey/40 disabled:opacity-50"
      >
        ←
      </button>
      <span className="text-sm font-semibold">
        Page {current} of {total}
      </span>
      <button
        disabled={current === total}
        onClick={() => onPageChange(current + 1)}
        className="px-3 py-2 rounded-lg border border-medium-grey/40 disabled:opacity-50"
      >
        →
      </button>
    </div>
  );
}

/**
 * AssessmentPill - Pill badge for quick info
 */
export function AssessmentPill({ children, variant = 'default' }) {
  const variants = {
    default: 'bg-tranquil-velvet/10 text-tranquil-velvet',
    success: 'bg-emerald-500/10 text-emerald-600',
    warning: 'bg-amber-500/10 text-amber-600',
    error: 'bg-red-500/10 text-red-600',
  };

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold ${variants[variant]}`}>
      {children}
    </span>
  );
}

/**
 * AssessmentStatCard - Card showing assessment statistics
 */
export function AssessmentStatCard({ label, value, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-medium-grey/30 dark:border-border-card bg-[#FBFBFE] dark:bg-[#0F1015] p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-dark-grey">{label}</p>
          <p className="text-2xl font-bold text-black dark:text-white mt-2">{value}</p>
        </div>
        {Icon && <Icon className="h-8 w-8 text-tranquil-velvet opacity-20" />}
      </div>
    </div>
  );
}

/**
 * AssessmentStatusBadge - Status badge with icon
 */
export function AssessmentStatusBadge({ status, children }) {
  const statusClasses = {
    completed: 'bg-emerald-500/10 text-emerald-600',
    pending: 'bg-amber-500/10 text-amber-600',
    failed: 'bg-red-500/10 text-red-600',
    inProgress: 'bg-tranquil-velvet/10 text-tranquil-velvet',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold ${statusClasses[status] || statusClasses.pending}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}
