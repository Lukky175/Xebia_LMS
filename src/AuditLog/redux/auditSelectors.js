/* @ author : Yash Pahwa
@email: yashpahwa.work@gmail.com
mobile : +91 8802444447
Thapar Institute of Engineering and Technology
*/

/*
 * Selectors: auditSelectors
 * Purpose: Provides memoized Redux selectors for accessing audit log state.
 * Features: Selectors for logs, stats, pagination, filters, sort, drawer, loading, and error states.
 */
export const selectAuditLogs = (state) => state.auditLog.logs;

export const selectAllFilteredLogs = (state) => state.auditLog.allFilteredLogs;

export const selectUniqueUsers = (state) => state.auditLog.uniqueUsers;

export const selectAuditStats = (state) => state.auditLog.stats;

export const selectAuditPagination = (state) => state.auditLog.pagination;

export const selectAuditFilters = (state) => state.auditLog.filters;

export const selectAuditSort = (state) => state.auditLog.sort;

export const selectSelectedLog = (state) => state.auditLog.selectedLog;

export const selectDrawerOpen = (state) => state.auditLog.drawerOpen;

export const selectAuditLoading = (state) => state.auditLog.loading;

export const selectAuditDetailLoading = (state) => state.auditLog.detailLoading;

export const selectAuditError = (state) => state.auditLog.error;

export const selectHasActiveFilters = (state) => {
  const filters = state.auditLog.filters;
  return Object.values(filters).some((value) => Boolean(value));
};
