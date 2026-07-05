import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const MOCK_USERS = [
  { email: 'superadmin@xebia.com', password: 'superadmin123', name: 'Super Admin', role: 'superadmin', title: 'System Controller' },
  { email: 'admin@xebia.com', password: 'admin123', name: 'Apurv Jha', role: 'admin', title: 'Platform Admin' },
  { email: 'trainer@xebia.com', password: 'trainer123', name: 'Sarah Jenkins', role: 'trainer', title: 'Senior Trainer' },
  { email: 'student@xebia.com', password: 'student123', name: 'Marcus Long', role: 'student', title: 'Student Learner' }
];

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('lms_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, password) => {
    // 1. Search in hardcoded mock users
    let user = MOCK_USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    // 2. Search in locally registered custom users if not found in MOCK_USERS
    if (!user) {
      const savedUsers = JSON.parse(localStorage.getItem("lms_registered_users") || "[]");
      user = savedUsers.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
    }

    if (user) {
      const userPayload = {
        name: user.name,
        email: user.email,
        role: user.role,
        title: user.title
      };
      localStorage.setItem('lms_current_user', JSON.stringify(userPayload));
      setCurrentUser(userPayload);
      return { success: true, user: userPayload };
    }

    return { success: false, error: 'Invalid email or password' };
  };

  const logout = () => {
    localStorage.removeItem('lms_current_user');
    setCurrentUser(null);
  };

  const isAuthenticated = !!currentUser;

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
