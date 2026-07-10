/* @ author : Yash Pahwa
@email: yashpahwa.work@gmail.com
mobile : +91 8802444447
Thapar Institute of Engineering and Technology
*/

/*
 * Component: AuditStatusBadge
 * Purpose: Renders a color-coded badge for audit log status values.
 * Features: Supports SUCCESS, FAILED, CRITICAL, and WARNING statuses with distinct styling.
 */
import React from 'react';
import { AUDIT_STATUSES } from '@/AuditLog/constants.js';

const STATUS_STYLES = {
  [AUDIT_STATUSES.SUCCESS]: 'bg-emerald/[0.1] text-emerald dark:bg-emerald/15',
  [AUDIT_STATUSES.FAILED]: 'bg-[#FFF7ED] text-[#C2410C] dark:bg-cta-orange/10 dark:text-cta-orange',
  [AUDIT_STATUSES.CRITICAL]: 'bg-[#FEF2F2] text-[#DC2626] dark:bg-red-500/10 dark:text-red-400',
  [AUDIT_STATUSES.WARNING]: 'bg-[#FFFBEB] text-[#B45309] dark:bg-amber-500/10 dark:text-amber-400',
};

export default function AuditStatusBadge({ status }) {
  if (!status) {
    return (
      <span className="inline-flex items-center rounded-md px-2.5 py-1 text-[10px] font-medium text-dark-grey">
        Unknown
      </span>
    );
  }

  const style = STATUS_STYLES[status] || 'bg-[#F4F5F8] text-dark-grey dark:bg-[#23242E]';

  return (
    <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${style}`}>
      {status}
    </span>
  );
}
