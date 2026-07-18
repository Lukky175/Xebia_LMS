/**
 * Author: Abhishek Dixit
 * Institution: Lovely Professional University
 * Develop the profile management page for the platform, including profile cards, 
 * identity details, scopes, reachable modules, 
 * and modals for editing and viewing information.
 */

import React, { useState } from 'react';
import { Camera, Pencil, Eye, Shield, ShieldCheck, ArrowRight, CheckCircle2, UploadCloud } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext.jsx';
import { ProfileActionButton, ProfileBadge, ProfileCardFrame, ProfileInfoRow, ScopePill, ModuleLinkRow, ProfileActionModal } from '@/components/profile/ProfileUi.jsx';

const profileData = {
  name: 'Platform Admin',
  email: 'admin@xebia.lms',
  role: 'ADMIN',
  subRole: 'Super admin',
  userId: 'e0000000-0000-0000-0000-000000000001',
  permissionVersion: 22,
  profileImage: '',
  modules: [
    { title: 'Administration', path: '/admin' },
    { title: 'Assessment', path: '/assessment' },
    { title: 'Domains', path: '/domains' },
    { title: 'Finance', path: '/finance' },
    { title: 'Learners', path: '/learners' },
    { title: 'Courses', path: '/courses' },
    { title: 'Scheduling', path: '/scheduling' },
    { title: 'Organisations', path: '/organisations' },
    { title: 'Category', path: '/parents' },
    { title: 'Trainer', path: '/trainer', highlight: 'TRAINER' },
    { title: 'Batches', path: '/batches' },
    { title: 'System Logs', path: '/logs' },
  ],
  scopes: [
    'ADM:AUDIT:VIEW',
    'ADM:BATCH:MANAGE',
    'ADM:COURSE:MANAGE',
    'ADM:DOMAIN:MANAGE',
    'ADM:LEARNER:MANAGE',
    'ADM:ORG:MANAGE',
    'ADM:PARENT:MANAGE',
    'ADM:RBAC:MANAGE',
    'ADM:UPDATE',
    'ADM:USER:MANAGE',
    'ASSESSMENT:VIEW',
    'FINANCE:MANAGE',
    'SCHEDULING:MANAGE',
    'SCHEDULING:VIEW',
  ],
};

const scopePreview = profileData.scopes.slice(0, 12);

export default function ProfilePage() {
  const { theme } = useTheme();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showViewScopes, setShowViewScopes] = useState(false);
  const [showModulesModal, setShowModulesModal] = useState(false);
  const [activeModule, setActiveModule] = useState(null);
  const [formData, setFormData] = useState({
    displayName: profileData.name,
    email: profileData.email,
    role: profileData.role,
    subRole: profileData.subRole,
  });

  const handleChange = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSaveProfile = (event) => {
    event.preventDefault();
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

  return (
    <div className="space-y-6">
      <ProfileCardFrame className="p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 rounded-3xl bg-tranquil-velvet text-white grid place-items-center text-4xl font-black shadow-sm">
              P
              <div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-bg-card shadow-sm border border-border-card text-tranquil-velvet">
                <Camera className="h-4 w-4" />
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-dark-grey font-bold">Profile</p>
              <h2 className="text-3xl font-extrabold text-black">{profileData.name}</h2>
              <p className="text-sm text-dark-grey">{profileData.email}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <ProfileBadge>{profileData.role}</ProfileBadge>
                <ProfileBadge tone="accent">{profileData.subRole}</ProfileBadge>
                <ProfileBadge tone="success">Active session</ProfileBadge>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <ProfileActionButton type="button" tone="secondary" onClick={() => setShowEditModal(true)} className="min-w-[140px] justify-center">
              <Pencil className="h-4 w-4" /> Edit Profile
            </ProfileActionButton>
            <ProfileActionButton type="button" onClick={handleViewPhoto} className="min-w-[140px] justify-center">
              <Camera className="h-4 w-4" /> Photo
            </ProfileActionButton>
          </div>
        </div>
      </ProfileCardFrame>

      <div className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
          <ProfileCardFrame className="p-5">
            <div className="flex items-center gap-2 border-b border-border-card pb-4">
              <Shield className="h-4 w-4 text-tranquil-velvet" />
              <p className="text-sm font-bold text-black dark:text-white">Identity</p>
            </div>
            <div className="mt-4 space-y-4">
              <ProfileInfoRow label="User ID" value={profileData.userId} code />
              <ProfileInfoRow label="Display name" value={formData.displayName} />
              <ProfileInfoRow label="Email" value={formData.email} />
              <ProfileInfoRow label="Role" value={`${formData.role} / ${formData.subRole}`} />
              <ProfileInfoRow label="Permission version" value={profileData.permissionVersion} />
            </div>
          </ProfileCardFrame>

          <ProfileCardFrame className="p-5">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-bold text-black">Scopes</p>
              <button
                type="button"
                onClick={() => setShowViewScopes(true)}
                className="text-[10px] font-bold uppercase tracking-[0.22em] text-tranquil-velvet hover:text-bright-velvet transition"
              >
                View all {profileData.scopes.length} scopes
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.18em] text-tranquil-velvet">
              {scopePreview.map((scope) => (
                <ScopePill key={scope}>{scope}</ScopePill>
              ))}
            </div>
          </ProfileCardFrame>
        </div>

      <ProfileCardFrame className="p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-black dark:text-white">Reachable modules</p>
            <p className="text-xs text-text-secondary">12 active modules</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-bg-hover px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-tranquil-velvet">
            <CheckCircle2 className="h-3 w-3 text-tranquil-velvet" /> Active
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {profileData.modules.map((module) => (
            <button
              key={module.title}
              type="button"
              onClick={() => handleOpenModule(module)}
              className="w-full text-left"
            >
              <ModuleLinkRow title={module.title} path={module.path} highlight={module.highlight} />
            </button>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between gap-3 text-sm text-dark-grey">
          <span>Profile access summary</span>
          <button
            type="button"
            onClick={handleOpenAllModules}
            className="inline-flex items-center gap-2 text-tranquil-velvet font-bold uppercase tracking-[0.18em] hover:text-bright-velvet transition"
          >
            <Eye className="h-3.5 w-3.5" /> View all modules
          </button>
        </div>
      </ProfileCardFrame>

      <ProfileActionModal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit profile details"
        description="Update your user identity, email, and access role."
        footer={
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <ProfileActionButton tone="secondary" onClick={() => setShowEditModal(false)}>Cancel</ProfileActionButton>
            <ProfileActionButton type="submit" form="profileForm">Save</ProfileActionButton>
          </div>
        }
      >
        <form id="profileForm" onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-text-secondary">
              <span className="block text-[10px] font-bold uppercase tracking-[0.18em]">Display name</span>
              <input
                value={formData.displayName}
                onChange={(e) => handleChange('displayName', e.target.value)}
                className="w-full rounded-2xl border border-border-card bg-bg-hover px-4 py-3 text-sm text-text-primary focus:outline-none"
              />
            </label>
            <label className="space-y-2 text-sm text-text-secondary">
              <span className="block text-[10px] font-bold uppercase tracking-[0.18em]">Email</span>
              <input
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full rounded-2xl border border-border-card bg-bg-hover px-4 py-3 text-sm text-text-primary focus:outline-none"
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-text-secondary">
              <span className="block text-[10px] font-bold uppercase tracking-[0.18em]">Role</span>
              <select
                value={formData.role}
                onChange={(e) => handleChange('role', e.target.value)}
                className="w-full rounded-2xl border border-border-card bg-bg-hover px-4 py-3 text-sm text-text-primary focus:outline-none"
              >
                <option>ADMIN</option>
                <option>MANAGER</option>
                <option>EDITOR</option>
              </select>
            </label>
            <label className="space-y-2 text-sm text-text-secondary">
              <span className="block text-[10px] font-bold uppercase tracking-[0.18em]">Sub role</span>
              <input
                value={formData.subRole}
                onChange={(e) => handleChange('subRole', e.target.value)}
                className="w-full rounded-2xl border border-border-card bg-bg-hover px-4 py-3 text-sm text-text-primary focus:outline-none"
              />
            </label>
          </div>
        </form>
      </ProfileActionModal>

      <ProfileActionModal
        open={showViewScopes}
        onClose={() => setShowViewScopes(false)}
        title="All assigned scopes"
        description={`Showing ${profileData.scopes.length} permission scopes for ${profileData.name}.`}
        footer={
          <ProfileActionButton tone="secondary" onClick={() => setShowViewScopes(false)}>Close</ProfileActionButton>
        }
      >
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {profileData.scopes.map((scope) => (
            <ScopePill key={scope}>{scope}</ScopePill>
          ))}
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
          <div className="rounded-3xl border border-border-card/40 bg-bg-hover p-5 text-sm text-text-secondary">
            <p className="font-bold text-black dark:text-white">Profile photo</p>
            <p className="mt-2 text-xs">Select an image to refresh the profile avatar shown in the header card.</p>
          </div>
          <label className="flex items-center gap-3 rounded-2xl border border-border-card/40 bg-bg-card px-4 py-3 text-sm text-text-secondary cursor-pointer hover:border-tranquil-velvet/50 transition">
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
              <div className="text-sm text-text-secondary">Module route</div>
              <div className="rounded-2xl border border-border-card/40 bg-bg-hover px-4 py-3 text-sm font-semibold text-text-primary">{activeModule.path}</div>
              <div className="text-sm text-text-secondary">Tap Close when you are done reviewing this module entry.</div>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {profileData.modules.map((module) => (
                <button
                  key={module.title}
                  type="button"
                  onClick={() => setActiveModule(module)}
                  className="rounded-2xl border border-border-card/40 bg-bg-card px-4 py-3 text-left text-sm font-semibold text-text-primary hover:border-tranquil-velvet/50 transition"
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
