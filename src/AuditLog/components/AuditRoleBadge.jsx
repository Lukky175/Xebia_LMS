/* @ author : Yash Pahwa
@email: yashpahwa.work@gmail.com
mobile : +91 8802444447
Thapar Institute of Engineering and Technology
*/

/*
 * Component: AuditRoleBadge
 * Purpose: Renders a color-coded badge for user roles in audit log entries.
 * Features: Distinct styles for Super Admin, Admin, Manager, Organiser, Trainer, and Learner roles.
 */
import React from 'react';

const ROLE_STYLES = {
  'Super Admin': 'bg-tranquil-velvet/10 text-tranquil-velvet dark:bg-tranquil-velvet/15 dark:text-[#D3CCEC]',
  Admin: 'bg-[#F4F5F8] text-tranquil-velvet dark:bg-[#23242E] dark:text-[#D3CCEC]',
  Manager: 'bg-[#EEF2FF] text-[#4C6EF5] dark:bg-[#1E2A4A] dark:text-[#91A7FF]',
  Organiser: 'bg-emerald/[0.08] text-emerald dark:bg-emerald/10',
  Trainer: 'bg-emerald/[0.08] text-emerald dark:bg-emerald/12',
  Learner: 'bg-[#FFF7ED] text-[#C2410C] dark:bg-cta-orange/10 dark:text-cta-orange',
};

const FALLBACK_STYLE = 'bg-[#F4F5F8] text-dark-grey dark:bg-[#23242E] dark:text-text-secondary';

export default function AuditRoleBadge({ role }) {
  if (!role) {
    return (
      <span className="inline-flex items-center whitespace-nowrap rounded-md px-2.5 py-1 text-[10px] font-medium text-dark-grey">
        —
      </span>
    );
  }

  const style = ROLE_STYLES[role] || FALLBACK_STYLE;

  return (
    <span className={`inline-flex items-center whitespace-nowrap rounded-md px-2.5 py-1 text-[10px] font-medium leading-none ${style}`}>
      {role}
    </span>
  );
}
