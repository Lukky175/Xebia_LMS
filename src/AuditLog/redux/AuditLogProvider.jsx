/* @ author : Yash Pahwa
@email: yashpahwa.work@gmail.com
mobile : +91 8802444447
Thapar Institute of Engineering and Technology
*/

/*
 * Provider: AuditLogProvider
 * Purpose: Wraps audit log pages with a dedicated Redux store provider.
 * Features: Isolates audit log state from the rest of the application.
 */
import { Provider } from 'react-redux';
import { auditLogStore } from '@/AuditLog/redux/store.js';

export function AuditLogProvider({ children }) {
  return <Provider store={auditLogStore}>{children}</Provider>;
}
