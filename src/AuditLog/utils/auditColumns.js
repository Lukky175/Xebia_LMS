/* @ author : Yash Pahwa
@email: yashpahwa.work@gmail.com
mobile : +91 8802444447
Thapar Institute of Engineering and Technology
*/

/*
 * Config: auditColumns
 * Purpose: Defines the column schema for the audit log data table.
 * Features: Column keys, labels, sortability flags, and responsive min-width classes.
 */
export const AUDIT_TABLE_COLUMNS = [
  { key: 'timestamp', label: 'Timestamp', sortable: true, className: 'min-w-[140px]' },
  { key: 'userName', label: 'User', sortable: true, className: 'min-w-[120px]' },
  { key: 'role', label: 'Role', sortable: false, className: 'min-w-[120px]' },
  { key: 'module', label: 'Module', sortable: true, className: 'min-w-[120px]' },
  { key: 'action', label: 'Action', sortable: true, className: 'min-w-[90px]' },
  { key: 'description', label: 'Description', sortable: false, className: 'min-w-[200px]' },
  { key: 'status', label: 'Status', sortable: true, className: 'min-w-[90px]' },
  { key: 'ipAddress', label: 'IP', sortable: false, className: 'min-w-[110px]' },
  { key: 'device', label: 'Device', sortable: false, className: 'min-w-[100px]' },
  { key: 'actions', label: 'Actions', sortable: false, className: 'min-w-[80px] text-center' },
];
