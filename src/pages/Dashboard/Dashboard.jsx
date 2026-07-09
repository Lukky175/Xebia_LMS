import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
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
import PermissionsPage from '@/pages/Permissions/PermissionsPage.jsx';
import RolesGrantsPage from '@/pages/RolesGrants/RolesGrantsPage.jsx';
import { usePermissions } from '@/context/PermissionsContext.jsx';
import { useAuth } from '@/context/AuthContext.jsx';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { api } from '@/services/api.js';

function AccessDenied({ path, role }) {
  const navigate = useNavigate();
  return (
    <div className="p-8 max-w-lg mx-auto bg-bg-card border border-border-card rounded-2xl text-center space-y-6 shadow-xl mt-16 animate-fadeIn">
      <div className="w-16 h-16 bg-cta-orange/10 text-cta-orange rounded-full flex items-center justify-center mx-auto">
        <ShieldAlert className="h-8 w-8" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-extrabold text-black dark:text-white">Access Denied</h3>
        <p className="text-xs text-dark-grey leading-relaxed">
          Your current account role (<span className="font-bold text-tranquil-velvet uppercase tracking-wider">{role}</span>) does not possess authorization to view the requested resources.
        </p>
      </div>

      <div className="bg-neutral-50 dark:bg-white/3 p-3.5 rounded-xl border border-medium-grey dark:border-white/5 text-[10px] font-mono text-dark-grey text-left space-y-1">
        <div><span className="font-bold">Requested Path:</span> {path}</div>
        <div><span className="font-bold">Required Grant:</span> Role permissions scope match</div>
      </div>

      <button 
        onClick={() => navigate('/dashboard')}
        className="flex items-center justify-center gap-1.5 px-5 py-2.5 bg-tranquil-velvet hover:bg-tranquil-velvet/95 text-xs font-bold text-white rounded-xl shadow-md w-full hover:scale-101 transition duration-150 cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        Return to Dashboard Home
      </button>
    </div>
  );
}

function GuardedRoute({ children }) {
  const { currentUser } = useAuth();
  const { hasPermission } = usePermissions();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Check path mapping permission
  if (!hasPermission(currentUser.role, location.pathname)) {
    return <AccessDenied path={location.pathname} role={currentUser.role} />;
  }

  return children;
}

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
        <Route path="/" element={<GuardedRoute><DashboardHome searchQuery={searchQuery} tutors={tutors} /></GuardedRoute>} />
        <Route path="/modules" element={<GuardedRoute><ModulesPage /></GuardedRoute>} />
        <Route path="/permissions" element={<GuardedRoute><PermissionsPage /></GuardedRoute>} />
        <Route path="/roles-grants" element={<GuardedRoute><RolesGrantsPage /></GuardedRoute>} />
        <Route path="/users" element={<GuardedRoute><UsersPage searchQuery={searchQuery} /></GuardedRoute>} />
        <Route path="/organisations" element={<GuardedRoute><OrganisationsPage searchQuery={searchQuery} /></GuardedRoute>} />
        <Route path="/domains" element={<GuardedRoute><BlankPage name="Domains" /></GuardedRoute>} />
        <Route path="/parents" element={<GuardedRoute><BlankPage name="Parents" /></GuardedRoute>} />
        <Route path="/learners" element={<GuardedRoute><BlankPage name="Learners" /></GuardedRoute>} />
        <Route path="/batches" element={<GuardedRoute><BlankPage name="Batches" /></GuardedRoute>} />
        <Route
          path="/courses"
          element={
            <GuardedRoute>
              <CoursesPage
                courses={courses}
                handleSimulateProgress={handleSimulateProgress}
                handleAddCourse={handleAddCourse}
                handleApproveCourse={handleApproveCourse}
                handleDeleteCourse={handleDeleteCourse}
                searchQuery={searchQuery}
                loading={coursesLoading}
              />
            </GuardedRoute>
          }
        />
        <Route path="/audit-log" element={<GuardedRoute><BlankPage name="Audit Log" /></GuardedRoute>} />
        <Route path="/profile" element={<GuardedRoute><ProfilePage /></GuardedRoute>} />
        <Route path="/administration" element={<GuardedRoute><SettingsPage /></GuardedRoute>} />
        <Route path="/scheduling" element={<GuardedRoute><SchedulingPage /></GuardedRoute>} />
        <Route path="/assessment" element={<GuardedRoute><AssessmentPage /></GuardedRoute>} />
        <Route path="/finance" element={<GuardedRoute><RevenuePage /></GuardedRoute>} />
        <Route
          path="/trainer"
          element={
            <GuardedRoute>
              <TutorsPage
                tutors={tutors}
                onAddTutor={handleAddTutor}
                onDeleteTutor={handleDeleteTutor}
                loading={tutorsLoading}
              />
            </GuardedRoute>
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


