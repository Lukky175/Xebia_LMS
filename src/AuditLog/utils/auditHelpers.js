/* @ author : Yash Pahwa
@email: yashpahwa.work@gmail.com
mobile : +91 8802444447
Thapar Institute of Engineering and Technology
*/

/*
 * Utils: auditHelpers
 * Purpose: Provides utility functions for audit log data processing and export.
 * Features: Timestamp formatting, stats computation, filtering, sorting, pagination,
 * CSV/JSON export, and file download helpers.
 */
import { AUDIT_STATUSES } from '@/AuditLog/constants.js';

export function formatTimestamp(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  }).format(date);
}

export function formatNullable(value, fallback = '—') {
  if (value === null || value === undefined || value === '') return fallback;
  return value;
}

export function isToday(timestamp) {
  if (!timestamp) return false;
  const date = new Date(timestamp);
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

export function computeStats(logs) {
  const total = logs.length;
  const successful = logs.filter((log) => log.status === AUDIT_STATUSES.SUCCESS).length;
  const failed = logs.filter((log) => log.status === AUDIT_STATUSES.FAILED).length;
  const todayActivity = logs.filter((log) => isToday(log.timestamp)).length;
  const critical = logs.filter((log) => log.status === AUDIT_STATUSES.CRITICAL).length;

  return { total, successful, failed, todayActivity, critical };
}

export function sortLogs(logs, sortField, sortDirection) {
  if (!sortField) return logs;

  const direction = sortDirection === 'desc' ? -1 : 1;

  return [...logs].sort((left, right) => {
    const leftValue = left[sortField];
    const rightValue = right[sortField];

    if (sortField === 'timestamp') {
      return (new Date(leftValue) - new Date(rightValue)) * direction;
    }

    const leftText = String(leftValue ?? '').toLowerCase();
    const rightText = String(rightValue ?? '').toLowerCase();
    if (leftText < rightText) return -1 * direction;
    if (leftText > rightText) return 1 * direction;
    return 0;
  });
}

export function filterLogs(logs, filters) {
  const search = filters.search?.trim().toLowerCase() ?? '';

  return logs.filter((log) => {
    const matchesSearch =
      !search ||
      [log.userName, log.email, log.module, log.entity, log.action, log.description].some((field) =>
        String(field ?? '').toLowerCase().includes(search)
      );

    const matchesUser = !filters.user || log.userName === filters.user;
    const matchesRole = !filters.role || log.role === filters.role;
    const matchesModule = !filters.module || log.module === filters.module;
    const matchesAction = !filters.action || log.action === filters.action;
    const matchesStatus = !filters.status || log.status === filters.status;

    let matchesDateRange = true;
    if (filters.dateFrom) {
      matchesDateRange = matchesDateRange && new Date(log.timestamp) >= new Date(filters.dateFrom);
    }
    if (filters.dateTo) {
      const endDate = new Date(filters.dateTo);
      endDate.setHours(23, 59, 59, 999);
      matchesDateRange = matchesDateRange && new Date(log.timestamp) <= endDate;
    }

    return (
      matchesSearch &&
      matchesUser &&
      matchesRole &&
      matchesModule &&
      matchesAction &&
      matchesStatus &&
      matchesDateRange
    );
  });
}

export function paginateLogs(logs, page, pageSize) {
  const totalRecords = logs.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * pageSize;
  const end = start + pageSize;

  return {
    logs: logs.slice(start, end),
    totalRecords,
    totalPages,
    page: safePage,
    rangeStart: totalRecords === 0 ? 0 : start + 1,
    rangeEnd: Math.min(end, totalRecords),
  };
}

export function exportLogsToCSV(logs) {
  const headers = [
    'Audit ID',
    'Timestamp',
    'User Name',
    'Email',
    'Role',
    'Module',
    'Submodule',
    'Action',
    'Entity',
    'Entity ID',
    'Status',
    'IP Address',
    'Browser',
    'Device',
    'Location',
    'Trace ID',
    'Description',
  ];

  const rows = logs.map((log) =>
    [
      log.auditId,
      log.timestamp,
      log.userName,
      log.email,
      log.role,
      log.module,
      log.submodule,
      log.action,
      log.entity,
      log.entityId,
      log.status,
      log.ipAddress,
      log.browser,
      log.device,
      log.location,
      log.traceId,
      log.description,
    ]
      .map((value) => `"${String(value ?? '').replace(/"/g, '""')}"`)
      .join(',')
  );

  return [headers.join(','), ...rows].join('\n');
}

export function exportLogsToJSON(logs) {
  return JSON.stringify(logs, null, 2);
}

export function downloadFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  window.URL.revokeObjectURL(url);
}

export function getUniqueUsers(logs) {
  const users = [...new Set(logs.map((log) => log.userName).filter(Boolean))];
  return users.sort((a, b) => a.localeCompare(b));
}
