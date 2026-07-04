/**
 * Profile UI Components
 * Reusable components for profile-related UI elements
 */

import React, { useState } from 'react';
import { X } from 'lucide-react';

/**
 * ProfileBadge - Status badge with different color tones
 */
export function ProfileBadge({ children, tone = 'velvet' }) {
  const toneStyles = {
    velvet: 'bg-tranquil-velvet/10 text-tranquil-velvet dark:bg-tranquil-velvet/20',
    emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    orange: 'bg-cta-orange/10 text-cta-orange',
    amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  };

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold ${toneStyles[tone] || toneStyles.velvet}`}>
      {children}
    </span>
  );
}

/**
 * ProfileCardFrame - Card container for profile content
 */
export function ProfileCardFrame({ children, theme, className = '' }) {
  return (
    <div className={`rounded-2xl border border-medium-grey/30 dark:border-border-card bg-[#FBFBFE] dark:bg-[#0F1015] ${className}`}>
      {children}
    </div>
  );
}

/**
 * ProfileActionButton - Action button with consistent styling
 */
export function ProfileActionButton({ 
  children, 
  onClick, 
  variant = 'primary',
  disabled = false,
  className = '',
  ...props 
}) {
  const variantStyles = {
    primary: 'bg-tranquil-velvet text-white hover:bg-bright-velvet shadow-sm',
    secondary: 'bg-white dark:bg-[#16171F] border border-medium-grey/40 dark:border-border-card text-dark-grey hover:text-tranquil-velvet hover:bg-tranquil-velvet/5',
    danger: 'bg-white dark:bg-[#16171F] border border-cta-orange/20 text-cta-orange hover:bg-cta-orange/10',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

/**
 * ProfileActionModal - Modal dialog for actions
 */
export function ProfileActionModal({
  open = false,
  onClose,
  title = '',
  description = '',
  children,
  size = 'md',
}) {
  if (!open) return null;

  const sizeStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className={`w-full ${sizeStyles[size]} rounded-2xl bg-white dark:bg-[#1A1B23] border border-white/60 dark:border-border-card p-6 shadow-xl`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            {title && (
              <h2 className="text-lg font-extrabold text-black dark:text-white">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-sm text-dark-grey mt-1">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-lg hover:bg-medium-grey/10 dark:hover:bg-white/10 transition p-1"
          >
            <X className="h-5 w-5 text-dark-grey" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-6">
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * ProfileInfoField - Reusable information field component
 */
export function ProfileInfoField({ label, value, icon: Icon }) {
  return (
    <div className="flex items-start gap-3">
      {Icon && (
        <Icon className="h-4 w-4 text-tranquil-velvet flex-shrink-0 mt-0.5" />
      )}
      <div className="flex-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-dark-grey">
          {label}
        </p>
        <p className="text-sm font-medium text-black dark:text-white mt-1">
          {value}
        </p>
      </div>
    </div>
  );
}

/**
 * ProfileCard - Profile display card
 */
export function ProfileCard({ 
  avatar,
  name,
  subtitle,
  badges = [],
  onClick,
  className = '',
}) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border border-medium-grey/30 dark:border-border-card bg-[#FBFBFE] dark:bg-[#0F1015] p-4 cursor-pointer hover:border-tranquil-velvet/50 transition ${className}`}
    >
      <div className="flex gap-3">
        {avatar && (
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-tranquil-velvet/20 text-base font-bold text-tranquil-velvet flex-shrink-0">
            {avatar}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-black dark:text-white truncate">
            {name}
          </h3>
          {subtitle && (
            <p className="text-xs text-dark-grey truncate">
              {subtitle}
            </p>
          )}
          {badges.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {badges.map((badge, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-full bg-tranquil-velvet/10 px-2 py-0.5 text-[9px] font-bold text-tranquil-velvet dark:bg-tranquil-velvet/20"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
