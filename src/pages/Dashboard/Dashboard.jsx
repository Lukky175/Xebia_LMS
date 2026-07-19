import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout.jsx';
import DashboardHome from '@/pages/Dashboard/DashboardHome.jsx';
import UsersPage from '@/pages/Users/UsersPage.jsx';
import CoursesPage from '@/pages/Courses/CoursesPage.jsx';
import RevenuePage from '@/pages/Revenue/RevenuePage.jsx';
import SettingsPage from '@/pages/Settings/SettingsPage.jsx';
import ModulesPage from '@/pages/Modules/ModulesPage.jsx';
import OrganisationsPage from '@/pages/Organisations/OrganisationsPage.jsx';
import AssessmentPage from '@/pages/Assessment/AssessmentPage.jsx';
import SchedulingPage from '@/pages/Scheduling/SchedulingPage.jsx';
import ProfilePage from '@/pages/Profile/ProfilePage.jsx';
import TutorsPage from '@/pages/Tutors/TutorsPage.jsx';
import AuditLogPage from '@/AuditLog/pages/AuditLogPage.jsx';
import { AuditLogProvider } from '@/AuditLog/redux/AuditLogProvider.jsx';
import { api } from '@/services/api.js';

// Feature Pages
import PermissionsPage from '@/pages/Permissions/PermissionsPage.jsx';
import RolesGrantsPage from '@/pages/RolesGrants/RolesGrantsPage.jsx';
import DomainsPage from '@/pages/Domains/DomainsPage.jsx';
import BatchesPage from '@/pages/Batches/BatchesPage.jsx';
import LearnersPage from '@/pages/Learners/LearnersPage.jsx';


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
        <Route path="/permissions" element={<PermissionsPage />} />
        <Route path="/roles-grants" element={<RolesGrantsPage />} />
        <Route path="/users" element={<UsersPage searchQuery={searchQuery} />} />
        <Route path="/organisations" element={<OrganisationsPage searchQuery={searchQuery} />} />
        <Route path="/domains" element={<DomainsPage />} />
        <Route path="/parents" element={<BlankPage name="Parents" />} />
        <Route path="/learners" element={<LearnersPage searchQuery={searchQuery} />} />
        <Route path="/batches" element={<BatchesPage searchQuery={searchQuery} />} />
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
        <Route
          path="/audit-log"
          element={
            <AuditLogProvider>
              <AuditLogPage />
            </AuditLogProvider>
          }
        />
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


