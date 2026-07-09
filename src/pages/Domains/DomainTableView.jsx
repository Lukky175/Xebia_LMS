import React from 'react';
import { Eye, Edit2, RefreshCw, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const PAGE_SIZE = 6;

function getParentName(parentId, allDomains) {
  if (!parentId) return null;
  const p = allDomains.find(d => d.id === parentId);
  return p ? p.name : null;
}

function StatusBadge({ status }) {
  const isActive = status === 'Active';
  return (
    <span
      className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${
        isActive
          ? 'bg-emerald/10 text-emerald border-emerald/20'
          : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
      }`}
    >
      {status}
    </span>
  );
}

export default function DomainTableView({
  domains,
  allDomains,
  currentPage,
  onPageChange,
  totalCount,
  onDelete,
  onToggleStatus,
  onEdit,
}) {
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  const start = (currentPage - 1) * PAGE_SIZE + 1;
  const end = Math.min(currentPage * PAGE_SIZE, totalCount);

  const btnBase =
    'p-1.5 rounded-lg transition cursor-pointer text-dark-grey';

  return (
    <div className="space-y-0">
      {/* Table */}
      <div className="overflow-x-auto sleek-scrollbar rounded-xl border border-medium-grey dark:border-[#282A3A]">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-medium-grey/60 dark:border-[#282A3A] bg-bg-page dark:bg-[#0F1015]">
              {['Name', 'Code', 'Parent', 'Status', 'Actions'].map(col => (
                <th
                  key={col}
                  className={`px-5 py-3 text-[10px] font-bold text-dark-grey uppercase tracking-wider select-none ${col === 'Actions' ? 'text-center' : ''}`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {domains.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center text-dark-grey font-semibold">
                  No domains match your filters.
                </td>
              </tr>
            ) : (
              domains.map((domain, idx) => {
                const parentName = getParentName(domain.parentId, allDomains);
                const isLast = idx === domains.length - 1;
                return (
                  <tr
                    key={domain.id}
                    className={`${!isLast ? 'border-b border-medium-grey/30 dark:border-[#282A3A]/60' : ''} hover:bg-bg-hover/40 dark:hover:bg-[#1a1b24]/60 transition`}
                  >
                    {/* Name */}
                    <td className="px-5 py-3.5 font-bold text-black dark:text-white">
                      {domain.name}
                    </td>

                    {/* Code */}
                    <td className="px-5 py-3.5">
                      <span className="px-2 py-0.5 bg-bg-hover dark:bg-[#282A3A] border border-medium-grey/60 dark:border-[#282A3A] rounded font-mono text-[10px] font-bold text-black dark:text-white">
                        {domain.code}
                      </span>
                    </td>

                    {/* Parent */}
                    <td className="px-5 py-3.5 text-dark-grey font-semibold">
                      {parentName || '—'}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-3.5">
                      <StatusBadge status={domain.status} />
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-center gap-0.5">
                        <button
                          onClick={() => onEdit(domain)}
                          title="View"
                          className={`${btnBase} hover:bg-tranquil-velvet/10 hover:text-tranquil-velvet`}
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => onEdit(domain)}
                          title="Edit"
                          className={`${btnBase} hover:bg-tranquil-velvet/10 hover:text-tranquil-velvet`}
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => onToggleStatus(domain)}
                          title={domain.status === 'Active' ? 'Deactivate' : 'Activate'}
                          className={`${btnBase} hover:bg-emerald/10 hover:text-emerald`}
                        >
                          <RefreshCw className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => onDelete(domain.id)}
                          title="Delete"
                          className={`${btnBase} hover:bg-red-500/10 hover:text-red-500`}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center pt-4">
        <span className="text-[10px] font-bold text-dark-grey uppercase tracking-wider">
          Showing {totalCount === 0 ? 0 : start}–{end} of {totalCount} domains
        </span>

        {totalPages > 1 && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-[10px] font-bold border border-medium-grey dark:border-[#282A3A] bg-white dark:bg-[#16171F] text-dark-grey hover:bg-bg-hover rounded-lg transition disabled:opacity-40 cursor-pointer"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={`w-7 h-7 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                  p === currentPage
                    ? 'bg-tranquil-velvet text-white shadow-sm'
                    : 'border border-medium-grey dark:border-[#282A3A] text-dark-grey hover:bg-bg-hover dark:bg-[#16171F]'
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 text-[10px] font-bold border border-medium-grey dark:border-[#282A3A] bg-white dark:bg-[#16171F] text-dark-grey hover:bg-bg-hover rounded-lg transition disabled:opacity-40 cursor-pointer"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
