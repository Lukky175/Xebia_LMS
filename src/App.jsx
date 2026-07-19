import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard/Dashboard.jsx';
import { ThemeProvider } from '@/context/ThemeContext.jsx';
import { PermissionsProvider } from '@/context/PermissionsContext.jsx';
import { useAuth } from '@/context/AuthContext.jsx';
import { api } from '@/services/api.js';

// Layouts
import MarketingLayout from '@/layouts/MarketingLayout.jsx';
import AuthLayout from '@/layouts/AuthLayout.jsx';

// Pages
import HomePage from '@/pages/HomePage.jsx';
import FAQPage from '@/pages/FAQPage.jsx';
import ContactPage from '@/pages/ContactPage.jsx';
import LoginPage from '@/pages/LoginPage.jsx';

function App() {
  const { isAuthenticated } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await api.getCourses();
        setCourses(data);
      } catch (err) {
        console.error("Failed to load courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleSimulateProgress = async (courseId) => {
    try {
      const updated = await api.updateCourseProgress(courseId);
      setCourses(updated);
    } catch (err) {
      console.error("Failed to update progress:", err);
    }
  };

  const handleAddCourse = async (courseData) => {
    try {
      const updated = await api.addCourse(courseData);
      setCourses(updated);
    } catch (err) {
      console.error("Failed to add course:", err);
    }
  };

  const handleApproveCourse = async (courseId) => {
    try {
      const updated = await api.approveCourse(courseId);
      setCourses(updated);
    } catch (err) {
      console.error("Failed to approve course:", err);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      const updated = await api.deleteCourse(courseId);
      setCourses(updated);
    } catch (err) {
      console.error("Failed to delete course:", err);
    }
  };

  return (
    <ThemeProvider>
      <PermissionsProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Marketing Routes */}
            <Route element={<MarketingLayout />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>

            {/* Authentication Routes (Only for Guests) */}
            <Route element={!isAuthenticated ? <AuthLayout /> : <Navigate to="/dashboard" replace />}>
              <Route path="/login" element={<LoginPage />} />
            </Route>

            {/* Protected Dashboard Routes */}
            <Route 
              path="/dashboard/*" 
              element={
                isAuthenticated ? (
                  <Dashboard 
                    courses={courses} 
                    handleSimulateProgress={handleSimulateProgress} 
                    handleAddCourse={handleAddCourse}
                    handleApproveCourse={handleApproveCourse}
                    handleDeleteCourse={handleDeleteCourse}
                    coursesLoading={loading}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />

            {/* Fallback Redirection */}
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </BrowserRouter>
      </PermissionsProvider>
    </ThemeProvider>
  );
}

export default App;
