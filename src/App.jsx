import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard/Dashboard.jsx';
import BatchesPage from '@/pages/Batches/BatchesPage.jsx';
import LearnersPage from '@/pages/Learners/LearnersPage.jsx';
import { ThemeProvider } from '@/context/ThemeContext.jsx';
import { api } from '@/services/api.js';


function App() {
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
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard/batches" element={<BatchesPage />} />
          <Route path="/dashboard/learners" element={<LearnersPage />} />
          <Route 
            path="/dashboard/*" 
            element={
              <Dashboard 
                courses={courses} 
                handleSimulateProgress={handleSimulateProgress} 
                coursesLoading={loading}
              />
            } 
          />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
