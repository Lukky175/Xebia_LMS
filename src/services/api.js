import { initialCourses, initialTutors, initialUsers, initialDomains } from '@/data/mockData.js';

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

export const api = {
  // Courses API
  async getCourses() {
    await delay();
    return getStorageItem('lms_courses', initialCourses);
  },

  // ✅ NEW: Add a new course and persist to localStorage
  async addCourse(courseData) {
    await delay(300);
    const courses = getStorageItem('lms_courses', initialCourses);
    const newCourse = {
      ...courseData,
      id: Date.now(),
      progress: 0,
      completedLessons: 0,
    };
    const updated = [...courses, newCourse];
    setStorageItem('lms_courses', updated);
    return updated;
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

  // Tutors API
  async getTutors() {
    await delay();
    return getStorageItem('lms_tutors', initialTutors);
  },

  async addTutor(tutorData) {
    await delay();
    const tutors = getStorageItem('lms_tutors', initialTutors);
    const newTutor = {
      ...tutorData,
      id: `T-${Date.now()}`
    };
    const updated = [...tutors, newTutor];
    setStorageItem('lms_tutors', updated);
    return updated;
  },

  // Users API
  async getUsers() {
    await delay();
    return getStorageItem('lms_users', initialUsers);
  },

  async deleteUser(id) {
    await delay();
    const users = getStorageItem('lms_users', initialUsers);
    const updated = users.filter(u => u.id !== id);
    setStorageItem('lms_users', updated);
    return updated;
  },

  async deleteUsersBulk(ids) {
    await delay();
    const users = getStorageItem('lms_users', initialUsers);
    const updated = users.filter(u => !ids.includes(u.id));
    setStorageItem('lms_users', updated);
    return updated;
  },

  async deleteTutor(tutorId) {
    await delay();
    const tutors = getStorageItem('lms_tutors', initialTutors);
    const updated = tutors.filter(t => t.id !== tutorId);
    setStorageItem('lms_tutors', updated);
    return updated;
  },

  // Domains API
  async getDomains() {
    await delay();
    return getStorageItem('lms_domains', initialDomains);
  },

  async addDomain(domainData) {
    await delay(300);
    const domains = getStorageItem('lms_domains', initialDomains);
    const newDomain = { ...domainData, id: Date.now() };
    const updated = [...domains, newDomain];
    setStorageItem('lms_domains', updated);
    return updated;
  },

  async updateDomain(id, updates) {
    await delay(300);
    const domains = getStorageItem('lms_domains', initialDomains);
    const updated = domains.map(d => d.id === id ? { ...d, ...updates } : d);
    setStorageItem('lms_domains', updated);
    return updated;
  },

  async deleteDomain(id) {
    await delay(300);
    const domains = getStorageItem('lms_domains', initialDomains);
    const updated = domains.filter(d => d.id !== id);
    setStorageItem('lms_domains', updated);
    return updated;
  },
};
