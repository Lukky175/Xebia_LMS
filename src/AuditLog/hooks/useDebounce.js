/* @ author : Yash Pahwa
@email: yashpahwa.work@gmail.com
mobile : +91 8802444447
Thapar Institute of Engineering and Technology
*/

/*
 * Hook: useDebounce
 * Purpose: Delays updating a value until after a specified delay period has elapsed.
 * Used to debounce search input and reduce unnecessary API calls while typing.
 * Returns: debouncedValue
 */
import { useEffect, useState } from 'react';
import { DEBOUNCE_MS } from '@/AuditLog/constants.js';

export function useDebounce(value, delay = DEBOUNCE_MS) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
