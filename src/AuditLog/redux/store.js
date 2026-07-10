/* @ author : Yash Pahwa
@email: yashpahwa.work@gmail.com
mobile : +91 8802444447
Thapar Institute of Engineering and Technology
*/

/*
 * Store: auditLogStore
 * Purpose: Configures and exports the Redux store for the audit log module.
 * Features: Registers auditSlice reducer with serializable check disabled for drawer payloads.
 */
import { configureStore } from '@reduxjs/toolkit';
import auditReducer from '@/AuditLog/redux/auditSlice.js';

export const auditLogStore = configureStore({
  reducer: {
    auditLog: auditReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
