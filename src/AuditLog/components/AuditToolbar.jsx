/* @ author : Yash Pahwa
@email: yashpahwa.work@gmail.com
mobile : +91 8802444447
Thapar Institute of Engineering and Technology
*/

/*
 * Component: AuditToolbar
 * Purpose: Provides toolbar actions for the audit log table.
 * Features: Page size selector, CSV export, and JSON export of filtered audit logs.
 */
import React, { useCallback } from 'react';
import { Download, FileJson } from 'lucide-react';
import { PAGE_SIZE_OPTIONS } from '@/AuditLog/constants.js';
import {
  exportLogsToCSV,
  exportLogsToJSON,
  downloadFile,
} from '@/AuditLog/utils/auditHelpers.js';

export default function AuditToolbar({ allFilteredLogs, pageSize, onPageSizeChange }) {
  const handleExportCSV = useCallback(() => {
    const content = exportLogsToCSV(allFilteredLogs);
    downloadFile(content, `audit_logs_${Date.now()}.csv`, 'text/csv');
  }, [allFilteredLogs]);

  const handleExportJSON = useCallback(() => {
    const content = exportLogsToJSON(allFilteredLogs);
    downloadFile(content, `audit_logs_${Date.now()}.json`, 'application/json');
  }, [allFilteredLogs]);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="flex items-center gap-2">
        <label htmlFor="audit-page-size" className="text-[10px] font-bold uppercase tracking-wider text-dark-grey">
          Page size
        </label>
        <select
          id="audit-page-size"
          value={pageSize}
          onChange={(event) => onPageSizeChange(event.target.value)}
          className="px-3 py-1.5 bg-[#F4F5F8] dark:bg-[#1A1B24] rounded-xl text-xs font-bold text-black dark:text-white focus:outline-none cursor-pointer shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
          aria-label="Select page size"
        >
          {PAGE_SIZE_OPTIONS.map((size) => (
            <option key={size} value={size}>
              {size} rows
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2 self-start sm:self-auto">
        <button
          type="button"
          onClick={handleExportCSV}
          className="btn-interactive px-4 py-2 bg-[#F4F5F8] hover:bg-[#ECEEF3] dark:bg-[#1A1B24] dark:hover:bg-[#23242E] text-black dark:text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] group"
          aria-label="Export audit logs as CSV"
        >
          <Download className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
          Export CSV
        </button>
        <button
          type="button"
          onClick={handleExportJSON}
          className="btn-interactive px-4 py-2 bg-[#F4F5F8] hover:bg-[#ECEEF3] dark:bg-[#1A1B24] dark:hover:bg-[#23242E] text-black dark:text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] group"
          aria-label="Export audit logs as JSON"
        >
          <FileJson className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
          Export JSON
        </button>
      </div>
    </div>
  );
}
