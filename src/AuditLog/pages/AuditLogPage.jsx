/* @ author : Yash Pahwa
@email: yashpahwa.work@gmail.com
mobile : +91 8802444447
Thapar Institute of Engineering and Technology
*/

/*
 * Page: AuditLogPage
 * Purpose: Main entry page for the Audit Log module in the LMS platform.
 * It orchestrates statistics cards, filters, toolbar, data table, and detail drawer
 * to provide a complete audit trail monitoring experience for administrators.
 * Features: Redux state integration, loading/error handling, animated layout.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { ProfileActionButton } from '@/components/profile/ProfileUi.jsx';
import AuditCards from '@/AuditLog/components/AuditCards.jsx';
import AuditFilters from '@/AuditLog/components/AuditFilters.jsx';
import AuditToolbar from '@/AuditLog/components/AuditToolbar.jsx';
import AuditTable from '@/AuditLog/components/AuditTable.jsx';
import AuditDrawer from '@/AuditLog/components/AuditDrawer.jsx';
import { useAuditFilters } from '@/AuditLog/hooks/useAuditFilters.js';
import { useAuditTable } from '@/AuditLog/hooks/useAuditTable.js';
import {
  selectAuditStats,
  selectAuditDetailLoading,
  selectUniqueUsers,
} from '@/AuditLog/redux/auditSelectors.js';

function AuditLogContent() {
  const stats = useSelector(selectAuditStats);
  const detailLoading = useSelector(selectAuditDetailLoading);

  const { filters, handleFilterChange, handleResetFilters } = useAuditFilters();
  const {
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
  } = useAuditTable();

  const userOptions = useSelector(selectUniqueUsers);

  if (loading && logs.length === 0 && !error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]" role="status" aria-label="Loading audit logs">
        <div className="h-10 w-10 border-4 border-tranquil-velvet border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-2 rounded-3xl bg-white/95 dark:bg-[#16171F]/95 backdrop-blur-sm p-6 shadow-[0_1px_3px_rgba(15,23,42,0.05)] hover:shadow-[0_8px_24px_rgba(108,29,95,0.08)] transition-shadow duration-300"
      >
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.8px] text-black dark:text-white">
            System Audit Log
          </h1>
          <p className="text-sm text-dark-grey whitespace-nowrap">
            Immutable record of every privileged action across the platform. Search, filter, and export audit trails for compliance and security review.
          </p>
        </div>
      </motion.div>

      <AuditCards stats={stats} />

      {error && (
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          role="alert"
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-extrabold text-red-600 dark:text-red-400">Failed to load audit logs</p>
              <p className="text-xs text-red-500/80 mt-0.5">{error}</p>
            </div>
          </div>
          <ProfileActionButton tone="warning" onClick={handleRetry} className="self-start sm:self-auto">
            <RefreshCw className="h-3.5 w-3.5" />
            Retry
          </ProfileActionButton>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white dark:bg-[#16171F] rounded-2xl shadow-[0_1px_3px_rgba(15,23,42,0.06)] p-6 space-y-6 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-shadow duration-300"
      >
        <AuditFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
          userOptions={userOptions}
        />

        <AuditToolbar
          allFilteredLogs={allFilteredLogs}
          pageSize={pagination.pageSize}
          onPageSizeChange={handlePageSizeChange}
        />

        {loading && logs.length > 0 && (
          <div className="flex items-center justify-center py-4" role="status" aria-label="Refreshing audit logs">
            <div className="h-6 w-6 border-2 border-tranquil-velvet border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <AuditTable
          logs={logs}
          sort={sort}
          pagination={pagination}
          onSort={handleSort}
          onView={handleViewLog}
          onPageChange={handlePageChange}
          onFirstPage={handleFirstPage}
          onLastPage={handleLastPage}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
      </motion.div>

      <AuditDrawer
        open={drawerOpen}
        log={selectedLog}
        loading={detailLoading}
        onClose={handleCloseDrawer}
      />
    </motion.div>
  );
}

export default function AuditLogPage() {
  return <AuditLogContent />;
}
