/* @ author : Yash Pahwa
@email: yashpahwa.work@gmail.com
mobile : +91 8802444447
Thapar Institute of Engineering and Technology
*/

/*
 * Component: AuditPagination
 * Purpose: Renders pagination controls for the audit log data table.
 * Features: First/prev/next/last navigation, page number selection,
 * and displays current record range out of total records.
 */
import React, { useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

export default function AuditPagination({
  page,
  totalPages,
  totalRecords,
  rangeStart,
  rangeEnd,
  onFirst,
  onPrev,
  onNext,
  onLast,
  onPageSelect,
}) {
  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let index = start; index <= end; index += 1) {
      pages.push(index);
    }
    return pages;
  }, [page, totalPages]);

  return (
    <nav
      className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-black/[0.04] dark:border-white/[0.06] pt-4"
      aria-label="Audit log pagination"
    >
      <p className="text-xs text-dark-grey">
        Showing {rangeStart}-{rangeEnd} of {totalRecords} audit logs
      </p>

      <div className="flex items-center gap-2 self-end sm:self-auto">
        <button
          type="button"
          onClick={onFirst}
          disabled={page === 1}
          aria-label="Go to first page"
          className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-[#F4F5F8] dark:bg-[#1A1B24] text-dark-grey disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#ECEEF3] dark:hover:bg-[#23242E] transition btn-interactive shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
        >
          <ChevronsLeft className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={onPrev}
          disabled={page === 1}
          aria-label="Go to previous page"
          className="inline-flex items-center gap-1 rounded-lg bg-[#F4F5F8] dark:bg-[#1A1B24] px-3 py-2 text-xs font-bold text-dark-grey disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_1px_2px_rgba(15,23,42,0.04)] btn-interactive hover:bg-[#ECEEF3] dark:hover:bg-[#23242E] transition"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Prev
        </button>

        <div className="flex items-center gap-1" role="group" aria-label="Page numbers">
          {pageNumbers.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onPageSelect(item)}
              aria-label={`Go to page ${item}`}
              aria-current={item === page ? 'page' : undefined}
              className={`h-8 min-w-8 rounded-lg px-2 text-xs font-bold transition btn-interactive ${
                item === page
                  ? 'bg-tranquil-velvet text-white scale-105 shadow-md'
                  : 'bg-[#F4F5F8] dark:bg-[#1A1B24] text-dark-grey shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:bg-[#ECEEF3] dark:hover:bg-[#23242E]'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onNext}
          disabled={page === totalPages}
          aria-label="Go to next page"
          className="inline-flex items-center gap-1 rounded-lg bg-[#F4F5F8] dark:bg-[#1A1B24] px-3 py-2 text-xs font-bold text-dark-grey disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_1px_2px_rgba(15,23,42,0.04)] btn-interactive hover:bg-[#ECEEF3] dark:hover:bg-[#23242E] transition"
        >
          Next
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={onLast}
          disabled={page === totalPages}
          aria-label="Go to last page"
          className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-[#F4F5F8] dark:bg-[#1A1B24] text-dark-grey disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#ECEEF3] dark:hover:bg-[#23242E] transition btn-interactive shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
        >
          <ChevronsRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </nav>
  );
}
