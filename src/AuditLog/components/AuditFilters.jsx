/* @ author : Yash Pahwa
@email: yashpahwa.work@gmail.com
mobile : +91 8802444447
Thapar Institute of Engineering and Technology
*/

/*
 * Component: AuditFilters
 * Purpose: Renders the filter panel for narrowing audit log results.
 * Features: Search bar, role/module/action/status dropdowns, date range pickers,
 * and a reset-filters action to clear all active filters.
 */
import React, { useMemo } from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import SearchBar from '@/AuditLog/components/SearchBar.jsx';
import {
  ROLE_OPTIONS,
  MODULE_OPTIONS,
  ACTION_OPTIONS,
  STATUS_OPTIONS,
} from '@/AuditLog/constants.js';

function FilterSelect({ label, value, onChange, options, id }) {
  return (
    <div className="filter-chip flex items-center gap-1.5 px-3 py-1.5 bg-[#F4F5F8] dark:bg-[#1A1B24] rounded-xl shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:bg-[#ECEEF3] dark:hover:bg-[#23242E]">
      <Filter className="h-3.5 w-3.5 text-dark-grey shrink-0" aria-hidden="true" />
      <select
        id={id}
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="bg-transparent text-xs text-black dark:text-white focus:outline-none font-bold cursor-pointer"
      >
        {options.map((option) => (
          <option key={option.value || 'all'} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function DateInput({ label, value, onChange, id }) {
  return (
    <div className="filter-chip flex items-center gap-1.5 px-3 py-1.5 bg-[#F4F5F8] dark:bg-[#1A1B24] rounded-xl shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:bg-[#ECEEF3] dark:hover:bg-[#23242E]">
      <input
        id={id}
        type="date"
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="bg-transparent text-xs text-black dark:text-white focus:outline-none font-bold cursor-pointer"
      />
    </div>
  );
}

export default function AuditFilters({ filters, onFilterChange, onReset, userOptions = [] }) {
  const userSelectOptions = useMemo(
    () => [{ value: '', label: 'All Users' }, ...userOptions.map((user) => ({ value: user, label: user }))],
    [userOptions]
  );

  return (
    <section aria-label="Audit log filters" className="flex flex-col gap-3">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <SearchBar
          value={filters.search}
          onChange={(value) => onFilterChange('search', value)}
          placeholder="Search user, email, module, entity..."
        />

        <button
          type="button"
          onClick={onReset}
          className="btn-interactive inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F4F5F8] dark:bg-[#1A1B24] rounded-xl text-xs font-bold text-dark-grey hover:text-tranquil-velvet hover:bg-[#ECEEF3] dark:hover:bg-[#23242E] transition self-start lg:self-auto shadow-[0_1px_2px_rgba(15,23,42,0.04)] group"
          aria-label="Reset all filters"
        >
          <RotateCcw className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-rotate-180" />
          Reset
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <FilterSelect
          id="audit-filter-user"
          label="Filter by user"
          value={filters.user}
          onChange={(value) => onFilterChange('user', value)}
          options={userSelectOptions}
        />
        <FilterSelect
          id="audit-filter-role"
          label="Filter by role"
          value={filters.role}
          onChange={(value) => onFilterChange('role', value)}
          options={ROLE_OPTIONS}
        />
        <FilterSelect
          id="audit-filter-module"
          label="Filter by module"
          value={filters.module}
          onChange={(value) => onFilterChange('module', value)}
          options={MODULE_OPTIONS}
        />
        <FilterSelect
          id="audit-filter-action"
          label="Filter by action"
          value={filters.action}
          onChange={(value) => onFilterChange('action', value)}
          options={ACTION_OPTIONS}
        />
        <FilterSelect
          id="audit-filter-status"
          label="Filter by status"
          value={filters.status}
          onChange={(value) => onFilterChange('status', value)}
          options={STATUS_OPTIONS}
        />
        <DateInput
          id="audit-filter-date-from"
          label="Date from"
          value={filters.dateFrom}
          onChange={(value) => onFilterChange('dateFrom', value)}
        />
        <DateInput
          id="audit-filter-date-to"
          label="Date to"
          value={filters.dateTo}
          onChange={(value) => onFilterChange('dateTo', value)}
        />
      </div>
    </section>
  );
}
