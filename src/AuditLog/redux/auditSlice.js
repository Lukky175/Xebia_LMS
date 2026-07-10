/* @ author : Yash Pahwa
@email: yashpahwa.work@gmail.com
mobile : +91 8802444447
Thapar Institute of Engineering and Technology
*/

/*
 * Slice: auditSlice
 * Purpose: Manages the Redux state for the audit log module.
 * Features: Handles logs, stats, pagination, filters, sorting, drawer state,
 * and async thunk lifecycle for fetching logs and log details.
 */
import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_PAGE_SIZE } from '@/AuditLog/constants.js';
import { fetchAuditLogs, fetchAuditLogDetail } from '@/AuditLog/redux/auditThunk.js';

const initialState = {
  logs: [],
  allFilteredLogs: [],
  uniqueUsers: [],
  stats: {
    total: 0,
    successful: 0,
    failed: 0,
    todayActivity: 0,
    critical: 0,
  },
  pagination: {
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    totalRecords: 0,
    totalPages: 1,
    rangeStart: 0,
    rangeEnd: 0,
  },
  filters: {
    search: '',
    user: '',
    role: '',
    module: '',
    action: '',
    dateFrom: '',
    dateTo: '',
    status: '',
  },
  sort: {
    field: 'timestamp',
    direction: 'desc',
  },
  selectedLog: null,
  drawerOpen: false,
  loading: false,
  detailLoading: false,
  error: null,
};

const auditSlice = createSlice({
  name: 'auditLog',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1;
    },
    resetFilters(state) {
      state.filters = initialState.filters;
      state.pagination.page = 1;
    },
    setPage(state, action) {
      state.pagination.page = action.payload;
    },
    setPageSize(state, action) {
      state.pagination.pageSize = action.payload;
      state.pagination.page = 1;
    },
    setSort(state, action) {
      const { field } = action.payload;
      if (state.sort.field === field) {
        state.sort.direction = state.sort.direction === 'asc' ? 'desc' : 'asc';
      } else {
        state.sort.field = field;
        state.sort.direction = 'asc';
      }
      state.pagination.page = 1;
    },
    openDrawer(state, action) {
      state.drawerOpen = true;
      state.selectedLog = action.payload;
    },
    closeDrawer(state) {
      state.drawerOpen = false;
      state.selectedLog = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuditLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuditLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.logs = action.payload.logs;
        state.allFilteredLogs = action.payload.allFilteredLogs;
        state.uniqueUsers = action.payload.uniqueUsers;
        state.stats = action.payload.stats;
        state.pagination = {
          ...state.pagination,
          page: action.payload.page,
          totalRecords: action.payload.totalRecords,
          totalPages: action.payload.totalPages,
          rangeStart: action.payload.rangeStart,
          rangeEnd: action.payload.rangeEnd,
        };
      })
      .addCase(fetchAuditLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load audit logs';
      })
      .addCase(fetchAuditLogDetail.pending, (state) => {
        state.detailLoading = true;
      })
      .addCase(fetchAuditLogDetail.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.selectedLog = action.payload;
        state.drawerOpen = true;
      })
      .addCase(fetchAuditLogDetail.rejected, (state, action) => {
        state.detailLoading = false;
        state.error = action.payload || 'Failed to load audit log details';
      });
  },
});

export const {
  setFilter,
  resetFilters,
  setPage,
  setPageSize,
  setSort,
  openDrawer,
  closeDrawer,
  clearError,
} = auditSlice.actions;

export default auditSlice.reducer;
