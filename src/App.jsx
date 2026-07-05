import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard/Dashboard.jsx';
import BatchesPage from '@/pages/Batches/BatchesPage.jsx';
import LearnersPage from '@/pages/Learners/LearnersPage.jsx';
import { ThemeProvider } from '@/context/ThemeContext.jsx';
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
import SignUpPage from '@/pages/SignUpPage.jsx';

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

  return (
    <ThemeProvider>
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
            <Route path="/signup" element={<SignUpPage />} />
          </Route>

          {/* Protected Dashboard Routes */}
          <Route 
            path="/dashboard/batches" 
            element={isAuthenticated ? <BatchesPage /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/dashboard/learners" 
            element={isAuthenticated ? <LearnersPage /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/dashboard/*" 
            element={
              isAuthenticated ? (
                <Dashboard 
                  courses={courses} 
                  handleSimulateProgress={handleSimulateProgress} 
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
    </ThemeProvider>
  );
}

export default App;
