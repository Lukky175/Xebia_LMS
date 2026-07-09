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
import DomainsPage from '@/pages/Domains/DomainsPage.jsx';
import RolesPage from '@/pages/Roles/RolesPage.jsx';
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
        <Route path="/organisations" element={<BlankPage name="Organisations" />} />
        <Route path="/domains" element={<DomainsPage />} />
        <Route path="/parents" element={<BlankPage name="Parents" />} />
        <Route path="/learners" element={<BlankPage name="Learners" />} />
        <Route path="/batches" element={<BlankPage name="Batches" />} />
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


