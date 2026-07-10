/* @ author : Yash Pahwa
@email: yashpahwa.work@gmail.com
mobile : +91 8802444447
Thapar Institute of Engineering and Technology
*/

/*
 * Hook: useAuditTable
 * Purpose: Custom hook that manages audit log table interactions and data fetching.
 * It encapsulates pagination, sorting, drawer state, and debounced filter-driven API calls.
 * Returns: { logs, allFilteredLogs, pagination, sort, drawerOpen, selectedLog, loading, error, handlers }
 */
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from '@/AuditLog/hooks/useDebounce.js';
import {
  setPage,
  setPageSize,
  setSort,
  closeDrawer,
} from '@/AuditLog/redux/auditSlice.js';
import { fetchAuditLogs, fetchAuditLogDetail } from '@/AuditLog/redux/auditThunk.js';
import {
  selectAuditLogs,
  selectAuditPagination,
  selectAuditSort,
  selectAuditFilters,
  selectDrawerOpen,
  selectSelectedLog,
  selectAuditLoading,
  selectAuditError,
  selectAllFilteredLogs,
} from '@/AuditLog/redux/auditSelectors.js';

export function useAuditTable() {
  const dispatch = useDispatch();
  const logs = useSelector(selectAuditLogs);
  const allFilteredLogs = useSelector(selectAllFilteredLogs);
  const pagination = useSelector(selectAuditPagination);
  const sort = useSelector(selectAuditSort);
  const filters = useSelector(selectAuditFilters);
  const drawerOpen = useSelector(selectDrawerOpen);
  const selectedLog = useSelector(selectSelectedLog);
  const loading = useSelector(selectAuditLoading);
  const error = useSelector(selectAuditError);

  const debouncedSearch = useDebounce(filters.search);

  useEffect(() => {
    dispatch(fetchAuditLogs());
  }, [
    dispatch,
    debouncedSearch,
    filters.user,
    filters.role,
    filters.module,
    filters.action,
    filters.dateFrom,
    filters.dateTo,
    filters.status,
    pagination.page,
    pagination.pageSize,
    sort.field,
    sort.direction,
  ]);

  const handleSort = useCallback(
    (field) => {
      dispatch(setSort({ field }));
    },
    [dispatch]
  );

  const handlePageChange = useCallback(
    (page) => {
      dispatch(setPage(page));
    },
    [dispatch]
  );

  const handlePageSizeChange = useCallback(
    (pageSize) => {
      dispatch(setPageSize(Number(pageSize)));
    },
    [dispatch]
  );

  const handleFirstPage = useCallback(() => {
    dispatch(setPage(1));
  }, [dispatch]);

  const handleLastPage = useCallback(() => {
    dispatch(setPage(pagination.totalPages));
  }, [dispatch, pagination.totalPages]);

  const handlePrevPage = useCallback(() => {
    dispatch(setPage(Math.max(1, pagination.page - 1)));
  }, [dispatch, pagination.page]);

  const handleNextPage = useCallback(() => {
    dispatch(setPage(Math.min(pagination.totalPages, pagination.page + 1)));
  }, [dispatch, pagination.page, pagination.totalPages]);

  const handleViewLog = useCallback(
    (auditId) => {
      dispatch(fetchAuditLogDetail(auditId));
    },
    [dispatch]
  );

  const handleCloseDrawer = useCallback(() => {
    dispatch(closeDrawer());
  }, [dispatch]);

  const handleRetry = useCallback(() => {
    dispatch(fetchAuditLogs());
  }, [dispatch]);

  return {
    logs,
    allFilteredLogs,
    pagination,
    sort,
    drawerOpen,
    selectedLog,
    loading,
    error,
    handleSort,
    handlePageChange,
    handlePageSizeChange,
    handleFirstPage,
    handleLastPage,
    handlePrevPage,
    handleNextPage,
    handleViewLog,
    handleCloseDrawer,
    handleRetry,
  };
}
