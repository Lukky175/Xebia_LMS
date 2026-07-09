import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout.jsx';
import DashboardHome from '@/pages/Dashboard/DashboardHome.jsx';
import UsersPage from '@/pages/Users/UsersPage.jsx';
import CoursesPage from '@/pages/Courses/CoursesPage.jsx';
import AnalyticsPage from '@/pages/Analytics/AnalyticsPage.jsx';
import RevenuePage from '@/pages/Revenue/RevenuePage.jsx';
import ReportsPage from '@/pages/Reports/ReportsPage.jsx';
import SettingsPage from '@/pages/Settings/SettingsPage.jsx';
import ModulesPage from '@/pages/Modules/ModulesPage.jsx';
import OrganisationsPage from '@/pages/Organisations/OrganisationsPage.jsx';
import AssessmentPage from '@/pages/Assessment/AssessmentPage.jsx';
import SchedulingPage from '@/pages/Scheduling/SchedulingPage.jsx';
import ProfilePage from '@/pages/Profile/ProfilePage.jsx';
import TutorsPage from '@/pages/Tutors/TutorsPage.jsx';
import RolesPage from '@/pages/Roles/RolesPage.jsx';
import { api } from '@/services/api.js';
import { useAuth } from '@/context/AuthContext.jsx';


export default function Dashboard({ courses, handleSimulateProgress, handleAddCourse, handleApproveCourse, handleDeleteCourse, coursesLoading }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [tutors, setTutors] = useState([]);
  const [tutorsLoading, setTutorsLoading] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const data = await api.getTutors();
        setTutors(data);
      } catch (err) {
        console.error("Failed to load tutors:", err);
      } finally {
        setTutorsLoading(false);
      }
    };
    fetchTutors();
  }, []);

  const handleAddTutor = async (tutorData) => {
    try {
      const updated = await api.addTutor(tutorData);
      setTutors(updated);
    } catch (err) {
      console.error("Failed to add tutor:", err);
    }
  };

  const handleDeleteTutor = async (tutorId) => {
    try {
      const updated = await api.deleteTutor(tutorId);
      setTutors(updated);
    } catch (err) {
      console.error("Failed to delete tutor:", err);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <DashboardLayout onSearchChange={handleSearchChange} searchValue={searchQuery}>
      <Routes>
        <Route path="/" element={<DashboardHome searchQuery={searchQuery} tutors={tutors} />} />
        <Route path="/modules" element={<ModulesPage />} />
        <Route path="/permissions" element={<BlankPage name="Permissions" />} />
        <Route 
          path="/roles-grants" 
          element={
            <RoleProtectedRoute>
              <RolesPage />
            </RoleProtectedRoute>
          } 
        />
        <Route path="/users" element={<UsersPage searchQuery={searchQuery} />} />
        <Route path="/organisations" element={<OrganisationsPage searchQuery={searchQuery} />} />
        <Route path="/domains" element={<BlankPage name="Domains" />} />
        <Route path="/parents" element={<BlankPage name="Parents" />} />
        <Route path="/learners" element={<BlankPage name="Learners" />} />
        <Route path="/batches" element={<BlankPage name="Batches" />} />
        <Route
          path="/courses"
          element={
            <CoursesPage
              courses={courses}
              handleSimulateProgress={handleSimulateProgress}
              handleAddCourse={handleAddCourse}
              handleApproveCourse={handleApproveCourse}
              handleDeleteCourse={handleDeleteCourse}
              searchQuery={searchQuery}
              loading={coursesLoading}
            />
          }
        />
        <Route path="/audit-log" element={<BlankPage name="Audit Log" />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/administration" element={<SettingsPage />} />
        <Route path="/scheduling" element={<SchedulingPage />} />
        <Route path="/assessment" element={<AssessmentPage />} />
        <Route path="/finance" element={<RevenuePage />} />
        <Route
          path="/trainer"
          element={
            <TutorsPage
              tutors={tutors}
              onAddTutor={handleAddTutor}
              onDeleteTutor={handleDeleteTutor}
              loading={tutorsLoading}
            />
          }
        />
      </Routes>
    </DashboardLayout>
  );
}

function BlankPage({ name }) {
  return (
    <div className="p-6 text-text-secondary text-sm font-medium bg-bg-card border border-border-card rounded-2xl max-w-md mx-auto mt-12 text-center shadow-xs">
      {name} Content Placeholder
    </div>
  );
}

function RoleProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  // Allow superadmin or admin (Platform Admin)
  const isAuthorized = currentUser?.role === 'admin' || currentUser?.role === 'superadmin';

  if (!isAuthorized) {
    return (
      <div className="flex flex-col items-center justify-center p-12 mt-12 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/30 max-w-2xl mx-auto text-center space-y-4">
        <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center text-red-500 mb-2">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-xl font-extrabold text-black dark:text-white">Access Denied</h2>
        <p className="text-sm font-medium text-dark-grey max-w-md">
          This page is restricted to Platform Administrators. Your current role does not have the required permissions to view or manage roles and grants.
        </p>
      </div>
    );
  }

  return children;
}


