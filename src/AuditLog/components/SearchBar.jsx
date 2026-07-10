/* @ author : Yash Pahwa
@email: yashpahwa.work@gmail.com
mobile : +91 8802444447
Thapar Institute of Engineering and Technology
*/

/*
 * Component: SearchBar
 * Purpose: Reusable search input for filtering audit log entries by keyword.
 * Features: Accessible searchbox with icon, configurable placeholder, and controlled value binding.
 */
import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = 'Search audit logs...', id = 'audit-log-search' }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#F4F5F8] dark:bg-[#1A1B24] rounded-xl w-full sm:w-72 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <Search className="h-4 w-4 text-dark-grey shrink-0" aria-hidden="true" />
      <input
        id={id}
        type="search"
        role="searchbox"
        aria-label="Search audit logs"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="bg-transparent text-xs text-black dark:text-white focus:outline-none w-full font-medium"
      />
    </div>
  );
}
