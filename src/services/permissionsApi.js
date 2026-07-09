import { initialModules, initialRoles } from '@/data/mockData.js';

const STORAGE_KEYS = {
  permissions: 'lms_role_permissions_v2',
  roles: 'lms_roles_v2',
  modules: 'lms_modules'
};

const defaultPermissions = {
  superadmin: [
    '/dashboard',
    '/dashboard/modules',
    '/dashboard/permissions',
    '/dashboard/roles-grants',
    '/dashboard/users',
    '/dashboard/organisations',
    '/dashboard/domains',
    '/dashboard/parents',
    '/dashboard/learners',
    '/dashboard/batches',
    '/dashboard/courses',
    '/dashboard/audit-log',
    '/dashboard/profile',
    '/dashboard/administration',
    '/dashboard/scheduling',
    '/dashboard/assessment',
    '/dashboard/finance',
    '/dashboard/trainer'
  ],
  admin: [
    '/dashboard',
    '/dashboard/modules',
    '/dashboard/permissions',
    '/dashboard/roles-grants',
    '/dashboard/users',
    '/dashboard/organisations',
    '/dashboard/domains',
    '/dashboard/parents',
    '/dashboard/learners',
    '/dashboard/batches',
    '/dashboard/courses',
    '/dashboard/audit-log',
    '/dashboard/profile',
    '/dashboard/administration',
    '/dashboard/scheduling',
    '/dashboard/assessment',
    '/dashboard/finance',
    '/dashboard/trainer'
  ],
  trainer: [
    '/dashboard',
    '/dashboard/learners',
    '/dashboard/batches',
    '/dashboard/courses',
    '/dashboard/scheduling',
    '/dashboard/assessment',
    '/dashboard/profile'
  ],
  student: [
    '/dashboard',
    '/dashboard/courses',
    '/dashboard/profile',
    '/dashboard/assessment'
  ]
};

const apiBaseUrl = import.meta.env.VITE_BACKEND_URL || '';

const clone = (value) => JSON.parse(JSON.stringify(value));

const readJson = (key, fallback) => {
  const raw = window.localStorage.getItem(key);
  if (!raw) {
    window.localStorage.setItem(key, JSON.stringify(fallback));
    return clone(fallback);
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    return clone(fallback);
  }
};

const writeJson = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
  return clone(value);
};

const resolvePermissionsEndpoint = (path = '') => `${apiBaseUrl.replace(/\/$/, '')}/api/permissions${path}`;

const normalizePermissionsPayload = (payload) => {
  if (!payload) return clone(defaultPermissions);
  if (payload.permissions) return clone(payload.permissions);
  return clone(payload);
};

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  if (!response.ok) {
    throw new Error(`Permissions API request failed (${response.status})`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const permissionsContract = {
  endpoints: {
    getAll: 'GET /api/permissions',
    updateRole: 'PUT /api/permissions/:roleId',
    reset: 'POST /api/permissions/reset',
    roles: 'GET /api/roles',
    modules: 'GET /api/modules'
  },
  defaultPermissions,
  storageKeys: STORAGE_KEYS,
  modulesSeed: initialModules,
  rolesSeed: initialRoles
};

export const permissionsApi = {
  async getPermissions() {
    if (apiBaseUrl) {
      try {
        const payload = await requestJson(resolvePermissionsEndpoint());
        return normalizePermissionsPayload(payload);
      } catch (error) {
        console.warn('Permissions API unavailable, using local fallback.', error);
      }
    }

    return readJson(STORAGE_KEYS.permissions, defaultPermissions);
  },

  async updateRolePermissions(roleId, newPaths) {
    const nextPermissions = await this.getPermissions();
    nextPermissions[roleId] = [...newPaths];

    if (apiBaseUrl) {
      try {
        const payload = await requestJson(resolvePermissionsEndpoint(`/${encodeURIComponent(roleId)}`), {
          method: 'PUT',
          body: JSON.stringify({ roleId, permissions: nextPermissions[roleId], permissionsMap: nextPermissions })
        });
        return normalizePermissionsPayload(payload || nextPermissions);
      } catch (error) {
        console.warn('Permissions API update failed, writing to local fallback.', error);
      }
    }

    return writeJson(STORAGE_KEYS.permissions, nextPermissions);
  },

  async resetPermissions() {
    const nextPermissions = clone(defaultPermissions);

    if (apiBaseUrl) {
      try {
        const payload = await requestJson(resolvePermissionsEndpoint('/reset'), {
          method: 'POST',
          body: JSON.stringify({ permissions: nextPermissions })
        });
        return normalizePermissionsPayload(payload || nextPermissions);
      } catch (error) {
        console.warn('Permissions API reset failed, writing to local fallback.', error);
      }
    }

    return writeJson(STORAGE_KEYS.permissions, nextPermissions);
  }
};
