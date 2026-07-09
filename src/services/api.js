import { initialCourses, initialTutors, initialUsers, initialOrganisations, initialRoles, initialModules } from '@/data/mockData.js';

// Helper to simulate network latency
const delay = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));

// LocalStorage database helpers
const getStorageItem = (key, fallback) => {
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return fallback;
  }
};

const setStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const ROLES_STORAGE_KEY = 'lms_roles_v2';
const MODULES_STORAGE_KEY = 'lms_modules';

export const api = {
  // Courses API
  async getCourses() {
    await delay();
    const courses = getStorageItem('lms_courses', initialCourses);
    return courses.map(c => ({
      status: 'published',
      ...c
    }));
  },

  async updateCourseProgress(courseId) {
    await delay();
    const courses = getStorageItem('lms_courses', initialCourses);
    const updated = courses.map(course => {
      if (course.id === courseId) {
        const nextCompleted = Math.min(course.lessons, course.completedLessons + 1);
        const nextProgress = Math.round((nextCompleted / course.lessons) * 100);
        return {
          ...course,
          completedLessons: nextCompleted,
          progress: nextProgress
        };
      }
      return course;
    });
    setStorageItem('lms_courses', updated);
    return updated;
  },

  async addCourse(courseData) {
    await delay();
    const courses = getStorageItem('lms_courses', initialCourses);
    const newCourse = {
      id: courses.length ? Math.max(...courses.map(c => c.id)) + 1 : 1,
      progress: 0,
      completedLessons: 0,
      lessons: parseInt(courseData.lessons || 10, 10),
      enrollments: 0,
      rating: 5.0,
      ...courseData,
      status: courseData.status || 'published'
    };
    const updated = [...courses, newCourse];
    setStorageItem('lms_courses', updated);
    return updated;
  },

  async approveCourse(courseId) {
    await delay();
    const courses = getStorageItem('lms_courses', initialCourses);
    const updated = courses.map(c => {
      if (c.id === courseId) {
        return { ...c, status: 'published' };
      }
      return c;
    });
    setStorageItem('lms_courses', updated);
    return updated;
  },

  async deleteCourse(courseId) {
    await delay();
    const courses = getStorageItem('lms_courses', initialCourses);
    const updated = courses.filter(c => c.id !== courseId);
    setStorageItem('lms_courses', updated);
    return updated;
  },

  // Tutors API
  async getTutors() {
    await delay();
    return getStorageItem('lms_tutors', initialTutors);
  },

  async addTutor(tutorData) {
    await delay();
    const tutors = getStorageItem('lms_tutors', initialTutors);
    const newTutor = {
      id: `T-${200 + tutors.length + 1}`,
      rating: 4.8,
      status: 'Online',
      ...tutorData,
      courses: parseInt(tutorData.courses || 0, 10),
      hours: parseInt(tutorData.hours || 0, 10)
    };
    const updated = [...tutors, newTutor];
    setStorageItem('lms_tutors', updated);
    return updated;
  },

  async deleteTutor(tutorId) {
    await delay();
    const tutors = getStorageItem('lms_tutors', initialTutors);
    const updated = tutors.filter(t => t.id !== tutorId);
    setStorageItem('lms_tutors', updated);
    return updated;
  },

  // Users API
  async getUsers() {
    await delay();
    return initialUsers;
  },

  async deleteUser(userId) {
    await delay();
    return initialUsers.filter(u => u.id !== userId);
  },

  async deleteUsersBulk(userIds) {
    await delay();
    return initialUsers.filter(u => !userIds.includes(u.id));
  },


  /* @ author : Gurnoor Singh
@email: gsingh13_be23@thapar.edu
mobile : +91- 7814205303
Thapar institute of engineering and technology, Patiala
*/

  /*
   * Service: api
   * Purpose: Simulates a backend API service for the LMS platform.
   * It manages local storage caching, simulated network latency, and handles
   * CRUD operations for courses, tutors, users, and organisations.
   */
  // Organisations API
  async getOrganisations() {
    await delay();
    return getStorageItem('lms_organisations', initialOrganisations);
  },

  async addOrganisation(orgData) {
    await delay();
    const orgs = getStorageItem('lms_organisations', initialOrganisations);
    const newOrg = {
      id: orgs.length ? Math.max(...orgs.map(o => o.id)) + 1 : 1,
      usedSeats: 0,
      status: 'ACTIVE',
      ...orgData,
      seats: parseInt(orgData.seats || 0, 10),
      mrr: parseInt(orgData.mrr || 0, 10)
    };
    const updated = [newOrg, ...orgs];
    setStorageItem('lms_organisations', updated);
    return updated;
  },

  // --- Roles & Permissions API ---
  /**
   * Fetch all available modules in the system.
   */
  async getModules() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stored = localStorage.getItem(MODULES_STORAGE_KEY);
        if (!stored) {
          localStorage.setItem(MODULES_STORAGE_KEY, JSON.stringify(initialModules));
          resolve(initialModules);
        } else {
          resolve(JSON.parse(stored));
        }
      }, 300); // Simulate network latency
    });
  },

  /**
   * Fetch all roles and their respective permissions.
   */
  async getRoles() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stored = localStorage.getItem(ROLES_STORAGE_KEY);
        if (!stored) {
          localStorage.setItem(ROLES_STORAGE_KEY, JSON.stringify(initialRoles));
          resolve(initialRoles);
        } else {
          resolve(JSON.parse(stored));
        }
      }, 400);
    });
  },

  /**
   * Update the permissions for a specific role.
   * @param {string} roleId - The ID of the role to update.
   * @param {Array} newPermissions - The complete new array of permission objects.
   */
  async updateRolePermissions(roleId, newPermissions) {
    return new Promise(async (resolve, reject) => {
      try {
        const roles = await this.getRoles();
        const roleIndex = roles.findIndex((r) => r.id === roleId);
        
        if (roleIndex === -1) {
          throw new Error('Role not found');
        }

        roles[roleIndex] = {
          ...roles[roleIndex],
          permissions: newPermissions
        };

        localStorage.setItem(ROLES_STORAGE_KEY, JSON.stringify(roles));
        resolve(roles[roleIndex]);
      } catch (error) {
        reject(error);
      }
    });
  },

  /**
   * Create a new role.
   */
  async createRole(roleData) {
    return new Promise(async (resolve) => {
      const roles = await this.getRoles();
      const newRole = {
        id: `role-${Date.now()}`,
        name: roleData.name,
        description: roleData.description || '',
        type: roleData.type || 'Custom',
        permissions: roleData.permissions || []
      };
      
      roles.push(newRole);
      localStorage.setItem(ROLES_STORAGE_KEY, JSON.stringify(roles));
      resolve(newRole);
    });
  },

  /**
   * Update a role's name and description.
   */
  async updateRole(roleId, roleData) {
    return new Promise(async (resolve, reject) => {
      try {
        const roles = await this.getRoles();
        const roleIndex = roles.findIndex((r) => r.id === roleId);
        
        if (roleIndex === -1) {
          throw new Error('Role not found');
        }

        roles[roleIndex] = {
          ...roles[roleIndex],
          name: roleData.name || roles[roleIndex].name,
          description: roleData.description || roles[roleIndex].description,
          // Preserve existing permissions and type
        };

        localStorage.setItem(ROLES_STORAGE_KEY, JSON.stringify(roles));
        resolve(roles[roleIndex]);
      } catch (error) {
        reject(error);
      }
    });
  },

  /**
   * Delete a role by ID.
   */
  async deleteRole(roleId) {
    return new Promise(async (resolve, reject) => {
      const roles = await this.getRoles();
      const filtered = roles.filter(r => r.id !== roleId);
      
      if (roles.length === filtered.length) {
        reject(new Error('Role not found or cannot be deleted'));
        return;
      }

      localStorage.setItem(ROLES_STORAGE_KEY, JSON.stringify(filtered));
      resolve({ success: true, id: roleId });
    });
  }
};
