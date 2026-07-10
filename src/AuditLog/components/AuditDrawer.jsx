/* @ author : Yash Pahwa
@email: yashpahwa.work@gmail.com
mobile : +91 8802444447
Thapar Institute of Engineering and Technology
*/

/*
 * Component: AuditDrawer
 * Purpose: Displays detailed information for a selected audit log entry in a side drawer.
 * Features: Accordion sections for user info, action details, metadata, and request/response payloads.
 */
import React, { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';
import { ProfileInfoRow } from '@/components/profile/ProfileUi.jsx';
import AuditStatusBadge from '@/AuditLog/components/AuditStatusBadge.jsx';
import { formatTimestamp, formatNullable } from '@/AuditLog/utils/auditHelpers.js';

function AccordionSection({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  const toggle = useCallback(() => {
    setOpen((current) => !current);
  }, []);

  return (
    <div className="border border-medium-grey/40 dark:border-border-card rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-4 py-3 bg-[#F7F8FC] dark:bg-[#18181B] text-left hover:bg-tranquil-velvet/5 transition-colors duration-200 group"
      >
        <span className="text-xs font-extrabold text-black dark:text-white uppercase tracking-[0.18em]">{title}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <ChevronDown className="h-4 w-4 text-dark-grey group-hover:text-tranquil-velvet transition-colors" aria-hidden="true" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3 bg-white dark:bg-[#16171F]">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function JsonViewer({ data }) {
  if (!data) {
    return <p className="text-xs text-dark-grey">No metadata available</p>;
  }

  return (
    <pre className="text-[10px] font-mono bg-[#F4F5FF] dark:bg-[#0F1015] text-tranquil-velvet dark:text-[#D3CCEC] rounded-xl p-4 overflow-x-auto sleek-scrollbar max-h-48">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

export default function AuditDrawer({ open, log, loading, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs"
            aria-hidden="true"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            role="dialog"
            aria-modal="true"
            aria-label="Audit log details"
            className="fixed top-0 right-0 z-50 h-full w-full max-w-lg bg-white dark:bg-[#16171F] border-l border-medium-grey dark:border-border-card shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between border-b border-medium-grey/30 dark:border-border-card px-6 py-4 shrink-0">
              <div>
                <h2 className="text-lg font-extrabold text-black dark:text-white">Audit Log Details</h2>
                <p className="text-xs text-dark-grey mt-0.5">{log?.auditId ?? 'Loading...'}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close audit log details"
                className="rounded-full p-2 text-dark-grey hover:bg-[#F7F8FC] dark:hover:bg-[#0F1015] hover:rotate-90 transition-all duration-300"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto sleek-scrollbar p-6 space-y-4">
              {loading && (
                <div className="flex items-center justify-center py-12" role="status" aria-label="Loading details">
                  <div className="h-8 w-8 border-4 border-tranquil-velvet border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              {!loading && log && (
                <>
                  <div className="flex items-center gap-2">
                    <AuditStatusBadge status={log.status} />
                    <span className="text-[10px] font-bold text-dark-grey">{formatTimestamp(log.timestamp)}</span>
                  </div>

                  <AccordionSection title="General Information" defaultOpen>
                    <ProfileInfoRow label="Audit ID" value={log.auditId} code />
                    <ProfileInfoRow label="User Name" value={formatNullable(log.userName)} />
                    <ProfileInfoRow label="Email" value={formatNullable(log.email)} />
                    <ProfileInfoRow label="Role" value={formatNullable(log.role)} />
                    <ProfileInfoRow label="Timestamp" value={formatTimestamp(log.timestamp)} />
                  </AccordionSection>

                  <AccordionSection title="Action Information">
                    <ProfileInfoRow label="Module" value={formatNullable(log.module)} />
                    <ProfileInfoRow label="Submodule" value={formatNullable(log.submodule)} />
                    <ProfileInfoRow label="Action" value={formatNullable(log.action)} />
                    <ProfileInfoRow label="Entity" value={formatNullable(log.entity)} />
                    <ProfileInfoRow label="Entity ID" value={formatNullable(log.entityId)} code />
                    <ProfileInfoRow label="Description" value={formatNullable(log.description)} />
                  </AccordionSection>

                  <AccordionSection title="System Information">
                    <ProfileInfoRow label="IP Address" value={formatNullable(log.ipAddress)} code />
                    <ProfileInfoRow label="Browser" value={formatNullable(log.browser)} />
                    <ProfileInfoRow label="Device" value={formatNullable(log.device)} />
                    <ProfileInfoRow label="Location" value={formatNullable(log.location)} />
                  </AccordionSection>

                  <AccordionSection title="Trace Information">
                    <ProfileInfoRow label="Trace ID" value={formatNullable(log.traceId)} code />
                  </AccordionSection>

                  <AccordionSection title="Metadata">
                    <JsonViewer data={log.metadata} />
                  </AccordionSection>
                </>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
