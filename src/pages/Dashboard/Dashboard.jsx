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
import AssessmentPage from '@/pages/Assessment/AssessmentPage.jsx';
import SchedulingPage from '@/pages/Scheduling/SchedulingPage.jsx';
import ProfilePage from '@/pages/Profile/ProfilePage.jsx';
import TutorsPage from '@/pages/Tutors/TutorsPage.jsx';
import DomainsPage from '@/pages/Domains/DomainsPage.jsx';
import { api } from '@/services/api.js';


export default function Dashboard({ courses, handleSimulateProgress, coursesLoading }) {
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
        <Route path="/roles-grants" element={<BlankPage name="Roles & Grants" />} />
        <Route path="/users" element={<UsersPage searchQuery={searchQuery} />} />
        <Route path="/organisations" element={<BlankPage name="Organisations" />} />
        <Route path="/domains" element={<DomainsPage />} />
        <Route path="/parents" element={<BlankPage name="Parents" />} />
        <Route path="/learners" element={<BlankPage name="Learners" />} />
        <Route path="/batches" element={<BlankPage name="Batches" />} />
        <Route
          path="/courses"
          element={
            <CoursesPage
              courses={courses}
              handleSimulateProgress={handleSimulateProgress}
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


