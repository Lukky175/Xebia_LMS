/**
 * Profile Page Component
 * User profile with personal, contact, and academic information
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Calendar, Edit2, Save, X } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout.jsx';
import { useTheme } from '@/context/ThemeContext.jsx';

const initialProfile = {
  name: 'Ghanshyam Dwivedi',
  role: 'Student',
  avatar: 'GD',
  domain: 'DevOps & Cloud',
  semester: 'Semester 5',
  email: 'race7621@gmail.com',
  phone: '+91 98765 43210',
  location: 'Jalandhar, Punjab',
  organization: 'State Technical University',
  joinedDate: '15 Jan, 2024',
  bio: 'Passionate about DevOps & Cloud technologies',
};

export default function ProfilePage() {
  const { theme } = useTheme();
  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(profile);

  const handleSaveChanges = () => {
    setProfile(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  return (
    <DashboardLayout onSearchChange={() => {}} searchValue="">
      <div className="space-y-6">
        {/* Edit Button */}
        <div className="flex justify-end">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-cta-orange px-4 py-2.5 text-xs font-extrabold text-white shadow-[0_10px_24px_rgba(255,98,0,0.25)] transition hover:brightness-95"
            >
              <Edit2 className="h-4 w-4" />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex items-center gap-2 rounded-xl border border-medium-grey/40 dark:border-border-card bg-white dark:bg-[#16171F] px-4 py-2 text-xs font-bold text-dark-grey hover:bg-medium-grey/10 transition"
              >
                <X className="h-4 w-4" />
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveChanges}
                className="inline-flex items-center gap-2 rounded-xl bg-tranquil-velvet px-4 py-2 text-xs font-bold text-white hover:bg-bright-velvet transition"
              >
                <Save className="h-4 w-4" />
                Save Changes
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 rounded-3xl border border-white/60 dark:border-border-card bg-white/80 dark:bg-[#16171F]/90 backdrop-blur-sm p-6 shadow-sm">
          {/* Profile Header */}
          <div className="flex items-start gap-4 pb-4 border-b border-medium-grey/20 dark:border-border-card/30">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-tranquil-velvet to-bright-velvet flex items-center justify-center text-white font-bold text-2xl shrink-0">
              {profile.avatar}
            </div>
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="text-2xl font-extrabold text-black dark:text-white bg-transparent border-b border-tranquil-velvet outline-none w-full"
                />
              ) : (
                <h1 className="text-2xl font-extrabold text-black dark:text-white">{profile.name}</h1>
              )}
              <p className="text-sm text-dark-grey mt-1">{profile.role}</p>
              <div className="flex gap-2 mt-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-tranquil-velvet/10 px-2.5 py-1 text-xs font-bold text-tranquil-velvet">
                  {profile.domain}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-bright-velvet/10 px-2.5 py-1 text-xs font-bold text-bright-velvet">
                  {profile.semester}
                </span>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Contact Information */}
            <div className="space-y-4">
              <h2 className="text-sm font-extrabold text-black dark:text-white uppercase tracking-wider">
                Contact Information
              </h2>
              <div className="space-y-3">
                {/* Email */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-medium-grey/5 dark:bg-white/5">
                  <Mail className="h-4 w-4 text-tranquil-velvet mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-dark-grey">Email</p>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm((prev) => ({ ...prev, email: e.target.value }))}
                        className="text-sm font-semibold text-black dark:text-white bg-transparent border-b border-tranquil-velvet outline-none w-full"
                      />
                    ) : (
                      <p className="text-sm font-semibold text-black dark:text-white break-all">{profile.email}</p>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-medium-grey/5 dark:bg-white/5">
                  <Phone className="h-4 w-4 text-tranquil-velvet mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-dark-grey">Phone</p>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => setEditForm((prev) => ({ ...prev, phone: e.target.value }))}
                        className="text-sm font-semibold text-black dark:text-white bg-transparent border-b border-tranquil-velvet outline-none w-full"
                      />
                    ) : (
                      <p className="text-sm font-semibold text-black dark:text-white">{profile.phone}</p>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-medium-grey/5 dark:bg-white/5">
                  <MapPin className="h-4 w-4 text-tranquil-velvet mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-dark-grey">Location</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.location}
                        onChange={(e) => setEditForm((prev) => ({ ...prev, location: e.target.value }))}
                        className="text-sm font-semibold text-black dark:text-white bg-transparent border-b border-tranquil-velvet outline-none w-full"
                      />
                    ) : (
                      <p className="text-sm font-semibold text-black dark:text-white">{profile.location}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="space-y-4">
              <h2 className="text-sm font-extrabold text-black dark:text-white uppercase tracking-wider">
                Academic Information
              </h2>
              <div className="space-y-3">
                {/* Organization */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-medium-grey/5 dark:bg-white/5">
                  <div className="h-4 w-4 text-tranquil-velvet mt-0.5 shrink-0">🏢</div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-dark-grey">Organisation</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.organization}
                        onChange={(e) =>
                          setEditForm((prev) => ({ ...prev, organization: e.target.value }))
                        }
                        className="text-sm font-semibold text-black dark:text-white bg-transparent border-b border-tranquil-velvet outline-none w-full"
                      />
                    ) : (
                      <p className="text-sm font-semibold text-black dark:text-white">{profile.organization}</p>
                    )}
                  </div>
                </div>

                {/* Domain */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-medium-grey/5 dark:bg-white/5">
                  <div className="h-4 w-4 text-tranquil-velvet mt-0.5 shrink-0">📚</div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-dark-grey">Domain</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.domain}
                        onChange={(e) => setEditForm((prev) => ({ ...prev, domain: e.target.value }))}
                        className="text-sm font-semibold text-black dark:text-white bg-transparent border-b border-tranquil-velvet outline-none w-full"
                      />
                    ) : (
                      <p className="text-sm font-semibold text-black dark:text-white">{profile.domain}</p>
                    )}
                  </div>
                </div>

                {/* Joined Date */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-medium-grey/5 dark:bg-white/5">
                  <Calendar className="h-4 w-4 text-tranquil-velvet mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-dark-grey">Joined Date</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.joinedDate}
                        onChange={(e) =>
                          setEditForm((prev) => ({ ...prev, joinedDate: e.target.value }))
                        }
                        className="text-sm font-semibold text-black dark:text-white bg-transparent border-b border-tranquil-velvet outline-none w-full"
                      />
                    ) : (
                      <p className="text-sm font-semibold text-black dark:text-white">{profile.joinedDate}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="space-y-3 pt-4 border-t border-medium-grey/20 dark:border-border-card/30">
            <h2 className="text-sm font-extrabold text-black dark:text-white uppercase tracking-wider">Bio</h2>
            {isEditing ? (
              <textarea
                value={editForm.bio}
                onChange={(e) => setEditForm((prev) => ({ ...prev, bio: e.target.value }))}
                className="w-full min-h-24 p-3 rounded-xl border border-tranquil-velvet bg-transparent text-sm font-medium text-black dark:text-white outline-none resize-none"
              />
            ) : (
              <p className="text-sm text-dark-grey leading-relaxed">{profile.bio}</p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
