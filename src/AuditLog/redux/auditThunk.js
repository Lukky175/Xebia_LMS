/* @ author : Yash Pahwa
@email: yashpahwa.work@gmail.com
mobile : +91 8802444447
Thapar Institute of Engineering and Technology
*/

/*
 * Thunks: auditThunk
 * Purpose: Defines async Redux thunks for audit log API operations.
 * Features: fetchAuditLogs (list with filters/sort/pagination) and fetchAuditLogDetail (single entry by ID).
 */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { auditLogService } from '@/AuditLog/services/auditLogService.js';

export const fetchAuditLogs = createAsyncThunk(
  'auditLog/fetchAuditLogs',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auditLog } = getState();
      const response = await auditLogService.fetchAuditLogs({
        filters: auditLog.filters,
        sortField: auditLog.sort.field,
        sortDirection: auditLog.sort.direction,
        page: auditLog.pagination.page,
        pageSize: auditLog.pagination.pageSize,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch audit logs');
    }
  }
);

export const fetchAuditLogDetail = createAsyncThunk(
  'auditLog/fetchAuditLogDetail',
  async (auditId, { rejectWithValue }) => {
    try {
      const log = await auditLogService.fetchAuditLogById(auditId);
      return log;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch audit log detail');
    }
  }
);
