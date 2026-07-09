/**
 * Author: Abhishek Dixit
 * Institution: Lovely Professional University
 * Develop the profile management page for the platform, including profile cards, 
 * identity details, scopes, reachable modules, 
 * and modals for editing and viewing information.
 */

import React, { useState, useEffect } from 'react';
import { Camera, Pencil, Eye, Shield, ShieldCheck, ArrowRight, CheckCircle2, UploadCloud } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext.jsx';
import { useAuth } from '@/context/AuthContext.jsx';
import { usePermissions } from '@/context/PermissionsContext.jsx';
import { ProfileActionButton, ProfileBadge, ProfileCardFrame, ProfileInfoRow, ScopePill, ModuleLinkRow, ProfileActionModal } from '@/components/profile/ProfileUi.jsx';
import { ProfileEditModal } from '@/components/forms/FormsUi.jsx';

const pathModuleNames = {
  '/dashboard': 'Dashboard Home',
  '/dashboard/modules': 'Modules Directory',
  '/dashboard/permissions': 'Permissions Editor',
  '/dashboard/roles-grants': 'Roles & Grants Settings',
  '/dashboard/users': 'Users Directory',
  '/dashboard/organisations': 'Organisations Directory',
  '/dashboard/domains': 'Domains Directory',
  '/dashboard/parents': 'Parents Directory',
  '/dashboard/learners': 'Learners Directory',
  '/dashboard/batches': 'Batches Console',
  '/dashboard/courses': 'Courses Catalog',
  '/dashboard/audit-log': 'Security Audit Log',
  '/dashboard/profile': 'My Profile Page',
  '/dashboard/administration': 'Administration / Settings',
  '/dashboard/scheduling': 'Lectures Scheduling',
  '/dashboard/assessment': 'Assessment Manager',
  '/dashboard/finance': 'Finance & Earnings',
  '/dashboard/trainer': 'Trainers Registry'
};

export default function ProfilePage() {
  const { theme } = useTheme();
  const { currentUser, updateCurrentUser } = useAuth();
  const { hasPermission } = usePermissions();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showViewScopes, setShowViewScopes] = useState(false);
  const [showModulesModal, setShowModulesModal] = useState(false);
  const [activeModule, setActiveModule] = useState(null);
  
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    role: '',
    subRole: '',
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        displayName: currentUser.name || '',
        email: currentUser.email || '',
        role: currentUser.role || '',
        subRole: currentUser.title || '',
        profileImage: currentUser.profileImage || '',
      });
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="p-6 text-center text-dark-grey text-sm">
        No active session found. Please log in.
      </div>
    );
  }

  // Filter reachable modules based on role permissions
  const allPossiblePaths = Object.keys(pathModuleNames);
  const userModules = allPossiblePaths
    .filter(path => hasPermission(currentUser.role, path))
    .map(path => ({
      title: pathModuleNames[path],
      path: path,
      highlight: path === '/dashboard/trainer' ? 'TRAINER' : undefined
    }));

  // Generate permission scopes dynamically
  const userScopes = allPossiblePaths
    .filter(path => hasPermission(currentUser.role, path) && path !== '/dashboard/profile')
    .map(path => {
      const segment = path.replace('/dashboard/', '').replace('/dashboard', 'home');
      const action = (currentUser.role === 'admin' || currentUser.role === 'superadmin') ? 'MANAGE' : 'VIEW';
      return `LMS:${segment.toUpperCase().replace(/\//g, ':').replace(/-/g, '_')}:${action}`;
    });

  const scopePreview = userScopes.slice(0, 12);

  const handleChange = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSaveProfile = (event) => {
    event.preventDefault();
    updateCurrentUser({
      name: formData.displayName,
      email: formData.email,
      role: currentUser.role === 'superadmin' ? formData.role.toLowerCase() : currentUser.role,
      title: formData.subRole,
      profileImage: formData.profileImage,
    });
    setShowEditModal(false);
  };

  const handleViewPhoto = () => {
    setShowPhotoModal(true);
  };

  const handleOpenModule = (module) => {
    setActiveModule(module);
    setShowModulesModal(true);
  };

  const handleOpenAllModules = () => {
    setActiveModule(null);
    setShowModulesModal(true);
  };

  // Static fallback or dynamic hash for id
  const mockUserId = `e0000000-0000-0000-0000-${currentUser.email.length.toString().padStart(12, '0')}`;

  return (
    <div className="space-y-6">
      <ProfileCardFrame className="p-6 bg-[#FFFFFF] dark:bg-[#16171F] border border-[#E7E9F0] dark:border-white/5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 rounded-3xl bg-gradient-to-br from-sky-400 via-cyan-400 to-slate-700 text-white grid place-items-center text-4xl font-black shadow-sm select-none">
              {formData.profileImage ? (
                <img 
                  src={formData.profileImage} 
                  alt="Profile" 
                  className="h-full w-full object-cover rounded-3xl" 
                />
              ) : (
                <span>{formData.displayName?.[0] || currentUser.name?.[0] || 'U'}</span>
              )}
              <div 
                className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-zinc-800 shadow-sm border border-[#E7E9F0] dark:border-white/10 text-tranquil-velvet cursor-pointer" 
                onClick={handleViewPhoto}
              >
                <Camera className="h-4 w-4" />
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-dark-grey font-bold">Profile</p>
              <h2 className="text-3xl font-extrabold text-black dark:text-white">{currentUser.name}</h2>
              <p className="text-sm text-dark-grey">{currentUser.email}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <ProfileBadge>{currentUser.role.toUpperCase()}</ProfileBadge>
                <ProfileBadge tone="accent">{currentUser.title}</ProfileBadge>
                <ProfileBadge tone="success">Active session</ProfileBadge>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <ProfileActionButton type="button" tone="secondary" onClick={() => setShowEditModal(true)} className="min-w-[140px] justify-center">
              <Pencil className="h-4 w-4" /> Edit Profile
            </ProfileActionButton>
            <ProfileActionButton type="button" onClick={() => setShowEditModal(true)} className="min-w-[140px] justify-center">
              <Camera className="h-4 w-4" /> Photo
            </ProfileActionButton>
          </div>
        </div>
      </ProfileCardFrame>

      <div className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
        <ProfileCardFrame className="p-5 bg-[#FBFBFF] dark:bg-[#16171F] border border-[#E7E9F0] dark:border-white/5">
          <div className="flex items-center gap-2 border-b border-[#E7E9F0] dark:border-white/5 pb-4">
            <Shield className="h-4 w-4 text-tranquil-velvet" />
            <p className="text-sm font-bold text-black dark:text-white">Identity Details</p>
          </div>
          <div className="mt-4 space-y-4">
            <ProfileInfoRow label="User ID" value={mockUserId} code />
            <ProfileInfoRow label="Display name" value={currentUser.name} />
            <ProfileInfoRow label="Email" value={currentUser.email} />
            <ProfileInfoRow label="Organisation" value={currentUser.organisation || 'Xebia'} />
            <ProfileInfoRow label="Role / Title" value={`${currentUser.role.toUpperCase()} / ${currentUser.title}`} />
          </div>
        </ProfileCardFrame>

        <ProfileCardFrame className="p-5 bg-[#FBFBFF] dark:bg-[#16171F] border border-[#E7E9F0] dark:border-white/5">
          <div className="flex items-center justify-between gap-4 border-b border-[#E7E9F0] dark:border-white/5 pb-4">
            <p className="text-sm font-bold text-black dark:text-white">Permission Scopes</p>
            <button
              type="button"
              onClick={() => setShowViewScopes(true)}
              className="text-[10px] font-bold uppercase tracking-[0.22em] text-tranquil-velvet dark:text-[#d38bca] hover:text-bright-velvet transition cursor-pointer"
            >
              View all {userScopes.length} scopes
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.18em] text-tranquil-velvet dark:text-[#d38bca]">
            {scopePreview.map((scope) => (
              <ScopePill key={scope}>{scope}</ScopePill>
            ))}
            {userScopes.length === 0 && (
              <span className="text-dark-grey text-xs tracking-normal font-medium lowercase">No active scopes.</span>
            )}
          </div>
        </ProfileCardFrame>
      </div>

      <ProfileCardFrame className="p-6 bg-[#FBFBFF] dark:bg-[#16171F] border border-[#E7E9F0] dark:border-white/5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-black dark:text-white">Reachable Modules</p>
            <p className="text-xs text-dark-grey">{userModules.length} active modules permitted</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#F4F5FF] dark:bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-tranquil-velvet dark:text-[#d38bca]">
            <CheckCircle2 className="h-3 w-3 text-emerald" /> Active
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {userModules.map((module) => (
            <button
              key={module.title}
              type="button"
              onClick={() => handleOpenModule(module)}
              className="w-full text-left cursor-pointer"
            >
              <ModuleLinkRow title={module.title} path={module.path} highlight={module.highlight} />
            </button>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between gap-3 text-sm text-dark-grey border-t border-medium-grey dark:border-white/5 pt-4">
          <span>Profile access summary</span>
          <button
            type="button"
            onClick={handleOpenAllModules}
            className="inline-flex items-center gap-2 text-tranquil-velvet dark:text-[#d38bca] font-bold uppercase tracking-[0.18em] hover:text-bright-velvet transition cursor-pointer"
          >
            <Eye className="h-3.5 w-3.5" /> View all modules
          </button>
        </div>
      </ProfileCardFrame>

      <ProfileEditModal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleSaveProfile}
        value={formData}
        onChange={handleChange}
      />

      <ProfileActionModal
        open={showViewScopes}
        onClose={() => setShowViewScopes(false)}
        title="All assigned scopes"
        description={`Showing ${userScopes.length} permission scopes for ${currentUser.name}.`}
        footer={
          <ProfileActionButton tone="secondary" onClick={() => setShowViewScopes(false)}>Close</ProfileActionButton>
        }
      >
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {userScopes.map((scope) => (
            <ScopePill key={scope}>{scope}</ScopePill>
          ))}
          {userScopes.length === 0 && (
            <div className="col-span-full text-center text-dark-grey text-xs">No permission scopes assigned.</div>
          )}
        </div>
      </ProfileActionModal>

      <ProfileActionModal
        open={showPhotoModal}
        onClose={() => setShowPhotoModal(false)}
        title="Upload profile photo"
        description="Choose a new avatar image for your profile card."
        footer={
          <div className="flex justify-end gap-3">
            <ProfileActionButton tone="secondary" onClick={() => setShowPhotoModal(false)}>Cancel</ProfileActionButton>
            <ProfileActionButton type="button">Upload</ProfileActionButton>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="rounded-3xl border border-medium-grey/40 dark:border-white/10 bg-[#F7F8FC] dark:bg-white/5 p-5 text-sm text-dark-grey">
            <p className="font-bold text-black dark:text-white">Profile photo</p>
            <p className="mt-2 text-xs">Select an image to refresh the profile avatar shown in the header card.</p>
          </div>
          <label className="flex items-center gap-3 rounded-2xl border border-medium-grey/40 dark:border-white/10 bg-white dark:bg-[#0F1015] px-4 py-3 text-sm text-dark-grey cursor-pointer hover:border-tranquil-velvet/50 transition">
            <UploadCloud className="h-4 w-4 text-tranquil-velvet" />
            <span>Add photo file</span>
            <input type="file" accept="image/*" className="hidden" />
          </label>
        </div>
      </ProfileActionModal>

      <ProfileActionModal
        open={showModulesModal}
        onClose={() => setShowModulesModal(false)}
        title={activeModule ? activeModule.title : 'Reachable modules'}
        description={activeModule ? `Review quick details for ${activeModule.title}.` : 'All reachable modules available from this profile.'}
        footer={
          <div className="flex justify-end gap-3">
            <ProfileActionButton tone="secondary" onClick={() => setShowModulesModal(false)}>Close</ProfileActionButton>
          </div>
        }
      >
        <div className="space-y-4">
          {activeModule ? (
            <div className="space-y-3">
              <div className="text-sm text-dark-grey">Module route</div>
              <div className="rounded-2xl border border-medium-grey/40 dark:border-white/10 bg-[#F7F8FC] dark:bg-white/5 px-4 py-3 text-sm font-semibold text-black dark:text-white">{activeModule.path}</div>
              <div className="text-sm text-dark-grey">Tap Close when you are done reviewing this module entry.</div>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {userModules.map((module) => (
                <button
                  key={module.title}
                  type="button"
                  onClick={() => setActiveModule(module)}
                  className="rounded-2xl border border-medium-grey/40 dark:border-white/10 bg-white dark:bg-[#0F1015] px-4 py-3 text-left text-sm font-semibold text-black dark:text-white hover:border-tranquil-velvet/50 transition cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span>{module.title}</span>
                    {module.highlight && <ProfileBadge tone="accent">{module.highlight}</ProfileBadge>}
                  </div>
                  <p className="text-xs text-dark-grey mt-1">{module.path}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </ProfileActionModal>
    </div>
  );
}
