/* @ author : Yash Pahwa
@email: yashpahwa.work@gmail.com
mobile : +91 8802444447
Thapar Institute of Engineering and Technology
*/

/*
 * Hook: useAuditFilters
 * Purpose: Custom hook that manages audit log filter state via Redux.
 * It provides handlers for updating individual filters and resetting all filters.
 * Returns: { filters, handleFilterChange, handleResetFilters }
 */
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, resetFilters } from '@/AuditLog/redux/auditSlice.js';
import { selectAuditFilters } from '@/AuditLog/redux/auditSelectors.js';

export function useAuditFilters() {
  const dispatch = useDispatch();
  const filters = useSelector(selectAuditFilters);

  const handleFilterChange = useCallback(
    (field, value) => {
      dispatch(setFilter({ [field]: value }));
    },
    [dispatch]
  );

  const handleResetFilters = useCallback(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  return {
    filters,
    handleFilterChange,
    handleResetFilters,
  };
}
