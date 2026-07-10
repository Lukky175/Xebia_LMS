/* @ author : Yash Pahwa
@email: yashpahwa.work@gmail.com
mobile : +91 8802444447
Thapar Institute of Engineering and Technology
*/

/*
 * Constants: constants
 * Purpose: Centralizes configuration values and enums for the audit log module.
 * Features: API endpoints, debounce/page-size settings, sortable columns,
 * status/role/module/action filter options, and local storage key.
 */
export const AUDIT_LOG_API = {
  BASE: import.meta.env.VITE_AUDIT_LOG_API_BASE || '/api/v1/audit-logs',
  LIST: import.meta.env.VITE_AUDIT_LOG_API_BASE || '/api/v1/audit-logs',
  DETAIL: (id) => `${import.meta.env.VITE_AUDIT_LOG_API_BASE || '/api/v1/audit-logs'}/${id}`,
};

export const DEBOUNCE_MS = 400;

export const PAGE_SIZE_OPTIONS = [10, 25, 50];

export const DEFAULT_PAGE_SIZE = 10;

export const SORTABLE_COLUMNS = ['timestamp', 'userName', 'module', 'action', 'status'];

export const AUDIT_STATUSES = {
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  CRITICAL: 'CRITICAL',
  WARNING: 'WARNING',
};

export const STATUS_OPTIONS = [
  { value: '', label: 'All Status' },
  { value: 'SUCCESS', label: 'Success' },
  { value: 'FAILED', label: 'Failed' },
  { value: 'CRITICAL', label: 'Critical' },
  { value: 'WARNING', label: 'Warning' },
];

export const ROLE_OPTIONS = [
  { value: '', label: 'All Roles' },
  { value: 'Super Admin', label: 'Super Admin' },
  { value: 'Admin', label: 'Admin' },
  { value: 'Manager', label: 'Manager' },
  { value: 'Organiser', label: 'Organiser' },
  { value: 'Trainer', label: 'Trainer' },
  { value: 'Learner', label: 'Learner' },
];

export const MODULE_OPTIONS = [
  { value: '', label: 'All Modules' },
  { value: 'Identity & Access', label: 'Identity & Access' },
  { value: 'Workforce', label: 'Workforce' },
  { value: 'Scheduling', label: 'Scheduling' },
  { value: 'Assessment', label: 'Assessment' },
  { value: 'Courses', label: 'Courses' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Analytics', label: 'Analytics' },
];

export const ACTION_OPTIONS = [
  { value: '', label: 'All Actions' },
  { value: 'CREATE', label: 'Create' },
  { value: 'UPDATE', label: 'Update' },
  { value: 'DELETE', label: 'Delete' },
  { value: 'LOGIN', label: 'Login' },
  { value: 'LOGOUT', label: 'Logout' },
  { value: 'APPROVE', label: 'Approve' },
  { value: 'EXPORT', label: 'Export' },
];

export const SEARCH_FIELDS = ['userName', 'email', 'module', 'entity', 'action', 'description'];

export const STORAGE_KEY = 'lms_audit_logs';
