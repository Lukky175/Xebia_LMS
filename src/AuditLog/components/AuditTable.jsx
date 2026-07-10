/* @ author : Yash Pahwa
@email: yashpahwa.work@gmail.com
mobile : +91 8802444447
Thapar Institute of Engineering and Technology
*/

/*
 * Component: AuditTable
 * Purpose: Renders the main sortable data table for audit log entries.
 * Features: Column sorting, status/role badges, row-level view action, empty state,
 * and integrated pagination controls.
 */
import React, { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Eye, ChevronUp, ChevronDown, FileText } from 'lucide-react';
import { ProfileCardFrame } from '@/components/profile/ProfileUi.jsx';
import { ModuleIconButton } from '@/components/modules/ModuleUi.jsx';
import AuditStatusBadge from '@/AuditLog/components/AuditStatusBadge.jsx';
import AuditRoleBadge from '@/AuditLog/components/AuditRoleBadge.jsx';
import AuditPagination from '@/AuditLog/components/AuditPagination.jsx';
import { AUDIT_TABLE_COLUMNS } from '@/AuditLog/utils/auditColumns.js';
import { formatTimestamp, formatNullable } from '@/AuditLog/utils/auditHelpers.js';

function SortIcon({ field, sortField, sortDirection }) {
  if (sortField !== field) {
    return <ChevronUp className="h-3 w-3 opacity-30 transition-opacity group-hover:opacity-60" aria-hidden="true" />;
  }
  return sortDirection === 'asc' ? (
    <motion.div initial={{ rotate: 180 }} animate={{ rotate: 0 }} transition={{ duration: 0.2 }}>
      <ChevronUp className="h-3 w-3" aria-hidden="true" />
    </motion.div>
  ) : (
    <motion.div initial={{ rotate: -180 }} animate={{ rotate: 0 }} transition={{ duration: 0.2 }}>
      <ChevronDown className="h-3 w-3" aria-hidden="true" />
    </motion.div>
  );
}

export default function AuditTable({
  logs,
  sort,
  pagination,
  onSort,
  onView,
  onPageChange,
  onFirstPage,
  onLastPage,
  onPrevPage,
  onNextPage,
}) {
  const tableRows = useMemo(
    () =>
      logs.map((log) => ({
        ...log,
        formattedTimestamp: formatTimestamp(log.timestamp),
        displayUser: formatNullable(log.userName),
        displayDescription: formatNullable(log.description, 'No description'),
        displayIp: formatNullable(log.ipAddress),
        displayDevice: formatNullable(log.device),
      })),
    [logs]
  );

  const handleSortClick = useCallback(
    (field) => {
      onSort(field);
    },
    [onSort]
  );

  const handleViewClick = useCallback(
    (auditId) => {
      onView(auditId);
    },
    [onView]
  );

  if (tableRows.length === 0) {
    return (
      <ProfileCardFrame className="overflow-hidden border-0 p-0 shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center py-16 px-6 text-center"
          role="status"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FileText className="h-12 w-12 text-medium-grey/50 mb-4" aria-hidden="true" />
          </motion.div>
          <p className="text-sm font-extrabold text-black dark:text-white">No Audit Logs Found</p>
          <p className="text-xs text-dark-grey mt-1 max-w-sm">
            No records match your current filters. Try adjusting your search criteria or date range.
          </p>
        </motion.div>
      </ProfileCardFrame>
    );
  }

  return (
    <ProfileCardFrame className="overflow-hidden border-0 p-0 shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
      <div className="overflow-x-auto sleek-scrollbar">
        <table className="w-full min-w-[1100px] text-left text-xs" role="table" aria-label="Audit log records">
          <thead>
            <tr className="border-b border-black/[0.04] dark:border-white/[0.06] bg-[#FAFBFD] dark:bg-[#18181B] text-dark-grey uppercase tracking-[0.18em]">
              {AUDIT_TABLE_COLUMNS.map((column) => (
                <th key={column.key} className={`p-4 ${column.className}`} scope="col">
                  {column.sortable ? (
                    <button
                      type="button"
                      onClick={() => handleSortClick(column.key)}
                      className="group inline-flex items-center gap-1 font-bold hover:text-tranquil-velvet transition-colors duration-200"
                      aria-label={`Sort by ${column.label}`}
                    >
                      {column.label}
                      <SortIcon field={column.key} sortField={sort.field} sortDirection={sort.direction} />
                    </button>
                  ) : (
                    column.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row, index) => (
              <motion.tr
                key={row.auditId}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: 4, backgroundColor: 'rgba(108, 29, 95, 0.04)' }}
                className="border-b border-black/[0.04] dark:border-white/[0.06] transition-colors cursor-default"
              >
                <td className="p-4 font-medium text-dark-grey whitespace-nowrap">{row.formattedTimestamp}</td>
                <td className="p-4">
                  <p className="font-bold text-black dark:text-white">{row.displayUser}</p>
                  {row.email && <p className="text-[10px] text-dark-grey mt-0.5">{row.email}</p>}
                </td>
                <td className="p-4 whitespace-nowrap">
                  <AuditRoleBadge role={row.role} />
                </td>
                <td className="p-4 font-semibold text-tranquil-velvet dark:text-[#D3CCEC]">{formatNullable(row.module)}</td>
                <td className="p-4">
                  <span className="inline-flex items-center rounded-md bg-tranquil-velvet/[0.08] text-tranquil-velvet px-2 py-1 text-[10px] font-semibold uppercase tracking-wide">
                    {formatNullable(row.action)}
                  </span>
                </td>
                <td className="p-4 text-dark-grey max-w-[240px] truncate" title={row.displayDescription}>
                  {row.displayDescription}
                </td>
                <td className="p-4">
                  <AuditStatusBadge status={row.status} />
                </td>
                <td className="p-4 font-mono text-[10px] text-dark-grey">{row.displayIp}</td>
                <td className="p-4 text-dark-grey">{row.displayDevice}</td>
                <td className="p-4 text-center">
                  <ModuleIconButton
                    icon={Eye}
                    label={`View details for ${row.auditId}`}
                    onClick={() => handleViewClick(row.auditId)}
                  />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 sm:p-5">
        <AuditPagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          totalRecords={pagination.totalRecords}
          rangeStart={pagination.rangeStart}
          rangeEnd={pagination.rangeEnd}
          onFirst={onFirstPage}
          onPrev={onPrevPage}
          onNext={onNextPage}
          onLast={onLastPage}
          onPageSelect={onPageChange}
        />
      </div>
    </ProfileCardFrame>
  );
}
