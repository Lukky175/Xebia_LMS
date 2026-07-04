/**
 * Author: Abhishek Dixit
 * Institution: Lovely Professional University
 * Develop the learners management page for the platform, 
 * including overview cards, learners tables, traffic charts, and activity feeds.
 */

import React, { useEffect, useMemo, useState } from 'react';
import { Plus, Search, SlidersHorizontal, ChevronLeft, ChevronRight, Mail, Building2, AlertCircle, Eye, Pencil, Trash2 } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout.jsx';
import { ProfileActionModal } from '@/components/profile/ProfileUi.jsx';
import { useTheme } from '@/context/ThemeContext.jsx';

const initialLearners = [
  {
    id: 1,
    name: 'Ghanshyam Dwivedi',
    email: 'race7621@gmail.com',
    organisation: 'State Technical University',
    type: 'University',
    domain: 'DevOps & Cloud',
    sem: 5,
    status: 'Active',
    avatar: 'GD',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    email: 'priya@universitytech.edu',
    organisation: 'Global Institute of Tech',
    type: 'Institute',
    domain: 'Cyber Security',
    sem: 3,
    status: 'Active',
    avatar: 'PS',
  },
  {
    id: 3,
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@university.edu',
    organisation: 'State Technical University',
    type: 'University',
    domain: 'DevOps & Cloud',
    sem: 6,
    status: 'Active',
    avatar: 'RK',
  },
  {
    id: 4,
    name: 'Ananya Singh',
    email: 'ananya.singh@globaltech.edu',
    organisation: 'Global Institute of Tech',
    type: 'Institute',
    domain: 'Machine Learning',
    sem: 4,
    status: 'Inactive',
    avatar: 'AS',
  },
  {
    id: 5,
    name: 'Vikram Patel',
    email: 'vikram.patel@university.edu',
    organisation: 'State Technical University',
    type: 'University',
    domain: 'Cyber Security',
    sem: 7,
    status: 'Active',
    avatar: 'VP',
  },
  {
    id: 6,
    name: 'Neha Gupta',
    email: 'neha.gupta@institute.edu',
    organisation: 'Global Institute of Tech',
    type: 'Institute',
    domain: 'DevOps & Cloud',
    sem: 2,
    status: 'Active',
    avatar: 'NG',
  },
  {
    id: 7,
    name: 'Arjun Reddy',
    email: 'arjun.reddy@university.edu',
    organisation: 'State Technical University',
    type: 'University',
    domain: 'Web Development',
    sem: 5,
    status: 'Active',
    avatar: 'AR',
  },
  {
    id: 8,
    name: 'Sneha Mishra',
    email: 'sneha.mishra@globaltech.edu',
    organisation: 'Global Institute of Tech',
    type: 'Institute',
    domain: 'Data Science',
    sem: 3,
    status: 'Inactive',
    avatar: 'SM',
  },
];

export default function LearnersPage() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [learners, setLearners] = useState(initialLearners);
  const [showLearnerModal, setShowLearnerModal] = useState(false);
  const [modalMode, setModalMode] = useState('view');
  const [selectedLearner, setSelectedLearner] = useState(null);
  const [learnerForm, setLearnerForm] = useState({
    name: '',
    email: '',
    organisation: '',
    type: 'University',
    domain: 'DevOps & Cloud',
    sem: 1,
    status: 'Active',
    avatar: '',
  });
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const pageSize = 10;

  const handleSearch = () => {
    setPage(1);
  };

  const openLearnerModal = (mode, learner = null) => {
    setModalMode(mode);
    setSelectedLearner(learner);

    if (learner) {
      setLearnerForm({
        name: learner.name,
        email: learner.email,
        organisation: learner.organisation,
        type: learner.type,
        domain: learner.domain,
        sem: learner.sem,
        status: learner.status,
        avatar: learner.avatar,
      });
    } else {
      setLearnerForm({
        name: '',
        email: '',
        organisation: '',
        type: 'University',
        domain: 'DevOps & Cloud',
        sem: 1,
        status: 'Active',
        avatar: '',
      });
    }

    setShowLearnerModal(true);
  };

  const closeLearnerModal = () => {
    setShowLearnerModal(false);
    setSelectedLearner(null);
  };

  const handleLearnerFieldChange = (field, value) => {
    setLearnerForm((current) => ({ ...current, [field]: value }));
  };

  const handleLearnerSave = (event) => {
    event.preventDefault();
    const updatedLearner = {
      id: selectedLearner?.id || Math.max(0, ...learners.map((item) => item.id)) + 1,
      name: learnerForm.name,
      email: learnerForm.email,
      organisation: learnerForm.organisation,
      type: learnerForm.type,
      domain: learnerForm.domain,
      sem: Number(learnerForm.sem),
      status: learnerForm.status,
      avatar: learnerForm.avatar || learnerForm.name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase(),
    };

    if (modalMode === 'edit') {
      setLearners((current) => current.map((item) => (item.id === updatedLearner.id ? updatedLearner : item)));
    } else {
      setLearners((current) => [updatedLearner, ...current]);
    }

    closeLearnerModal();
  };

  const handleDeleteLearner = (learnerId) => {
    if (window.confirm('Delete this learner? This cannot be undone.')) {
      setLearners((current) => current.filter((learner) => learner.id !== learnerId));
    }
  };

  const handleOpenFilters = () => {
    setShowFiltersModal(true);
  };

  const applyFilters = () => {
    setPage(1);
    setShowFiltersModal(false);
  };

  const clearFilters = () => {
    setFilterStatus('All');
    setFilterType('All');
  };

  const filteredLearners = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return learners.filter((learner) => {
      if (filterStatus !== 'All' && learner.status !== filterStatus) return false;
      if (filterType !== 'All' && learner.type !== filterType) return false;
      if (!query) return true;
      return [learner.name, learner.email, learner.organisation, learner.domain]
        .join(' ')
        .toLowerCase()
        .includes(query);
    });
  }, [learners, searchQuery, filterStatus, filterType]);

  const totalPages = Math.max(1, Math.ceil(filteredLearners.length / pageSize));
  const pageRows = filteredLearners.slice((page - 1) * pageSize, page * pageSize);
  const rangeStart = filteredLearners.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, filteredLearners.length);

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  useEffect(() => {
    setPage((current) => Math.min(current, totalPages));
  }, [totalPages]);

  const getStatusColor = (status) => {
    return status === 'Active' 
      ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' 
      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400';
  };

  const getStatusIcon = (status) => {
    return status === 'Active' ? '●' : '○';
  };

  const getAvatarColor = (initials) => {
    const colors = [
      'bg-tranquil-velvet/20 text-tranquil-velvet',
      'bg-cta-orange/20 text-cta-orange',
      'bg-emerald-500/20 text-emerald-600',
      'bg-blue-500/20 text-blue-600',
      'bg-purple-500/20 text-purple-600',
    ];
    return colors[initials.charCodeAt(0) % colors.length];
  };

  return (
    <DashboardLayout onSearchChange={(event) => setSearchQuery(event.target.value)} searchValue={searchQuery}>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 rounded-3xl border border-white/60 dark:border-border-card bg-white/80 dark:bg-[#16171F]/90 backdrop-blur-sm p-6 shadow-sm">
          {/* Header Section */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 rounded-full bg-tranquil-velvet/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-tranquil-velvet">
                Users
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.8px] text-black dark:text-white">
                Learners
              </h1>
              <p className="text-sm text-dark-grey max-w-2xl">
                Enrolled learners across organisations
              </p>
            </div>

            <button
              type="button"
              onClick={() => openLearnerModal('create')}
              className="inline-flex items-center gap-2 rounded-xl bg-cta-orange px-4 py-2.5 text-xs font-extrabold text-white shadow-[0_10px_24px_rgba(255,98,0,0.25)] transition hover:brightness-95 self-start sm:self-auto"
            >
              <Plus className="h-4 w-4" />
              New learner
            </button>
          </div>

          {/* Search and Filter Section */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 gap-2">
              <div className="flex-1 relative">
                <input
                  type="email"
                  placeholder="Search by email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-medium-grey/40 dark:border-border-card bg-white dark:bg-[#0F1015] px-4 py-2.5 text-xs placeholder-dark-grey text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-tranquil-velvet/50"
                />
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-grey pointer-events-none" />
              </div>
              <button
                type="button"
                onClick={handleSearch}
                className="inline-flex items-center gap-2 rounded-xl bg-tranquil-velvet px-4 py-2.5 text-xs font-bold text-white transition hover:bg-bright-velvet"
              >
                <Search className="h-4 w-4" />
                Search
              </button>
            </div>

            <button
              type="button"
              onClick={handleOpenFilters}
              className="inline-flex items-center gap-2 rounded-xl border border-medium-grey/40 dark:border-border-card bg-white dark:bg-[#16171F] px-4 py-2.5 text-xs font-bold text-dark-grey transition hover:bg-medium-grey/10"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
          </div>

          {/* Table Section */}
          <div className="rounded-2xl border border-medium-grey/30 dark:border-border-card bg-[#FBFBFE] dark:bg-[#0F1015] p-4 md:p-6">
            {filteredLearners.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <AlertCircle className="h-12 w-12 text-medium-grey/50 mb-3" />
                <p className="text-dark-grey">No learners found matching your search.</p>
              </div>
            ) : (
              <div className="overflow-x-auto sleek-scrollbar">
                <table className="w-full min-w-[1000px] text-left text-xs">
                  <thead>
                    <tr className="border-b border-medium-grey/50 dark:border-border-card bg-[#F7F8FC]/80 dark:bg-[#18181B] text-dark-grey uppercase tracking-[0.18em]">
                      <th className="p-4 font-bold">Learner</th>
                      <th className="p-4 font-bold">Organisation</th>
                      <th className="p-4 font-bold">Type</th>
                      <th className="p-4 font-bold">Domain</th>
                      <th className="p-4 font-bold">Sem</th>
                      <th className="p-4 font-bold">Status</th>
                      <th className="p-4 font-bold text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageRows.map((learner) => (
                      <tr
                        key={learner.id}
                        className="border-b border-medium-grey/30 dark:border-border-card/30 hover:bg-tranquil-velvet/5 dark:hover:bg-white/5 transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className={`flex h-10 w-10 items-center justify-center rounded-lg font-bold ${getAvatarColor(learner.avatar)}`}>
                              {learner.avatar}
                            </div>
                            <div>
                              <p className="font-bold text-black dark:text-white">{learner.name}</p>
                              <p className="text-[10px] text-dark-grey">{learner.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-start gap-2">
                            <Building2 className="h-3.5 w-3.5 text-tranquil-velvet mt-0.5 flex-shrink-0" />
                            <span className="text-dark-grey text-xs">{learner.organisation}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-dark-grey">{learner.type}</span>
                        </td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-tranquil-velvet/10 px-3 py-1.5 text-[10px] font-bold text-tranquil-velvet dark:bg-tranquil-velvet/20">
                            {learner.domain}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="font-semibold text-black dark:text-white">{learner.sem}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className={`text-xl leading-none ${learner.status === 'Active' ? 'text-emerald-500' : 'text-gray-400'}`}>
                              {getStatusIcon(learner.status)}
                            </span>
                            <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold ${getStatusColor(learner.status)}`}>
                              {learner.status}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              type="button"
                              onClick={() => openLearnerModal('view', learner)}
                              className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-medium-grey/40 dark:border-border-card bg-white dark:bg-[#16171F] text-dark-grey hover:text-tranquil-velvet hover:bg-tranquil-velvet/5 transition text-xs"
                              title="View"
                            >
                              <Eye className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => openLearnerModal('edit', learner)}
                              className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-medium-grey/40 dark:border-border-card bg-white dark:bg-[#16171F] text-dark-grey hover:text-tranquil-velvet hover:bg-tranquil-velvet/5 transition text-xs"
                              title="Edit"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteLearner(learner.id)}
                              className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-cta-orange/20 bg-white dark:bg-[#16171F] text-cta-orange hover:bg-cta-orange/10 transition text-xs"
                              title="Delete"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {filteredLearners.length > 0 && (
              <div className="flex flex-col gap-3 border-t border-medium-grey/40 dark:border-border-card pt-4 mt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-dark-grey">
                  Showing {rangeStart} to {rangeEnd} of {filteredLearners.length} learners
                </p>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setPage((current) => Math.max(1, current - 1))}
                    disabled={page === 1}
                    className="inline-flex items-center gap-1 rounded-lg border border-medium-grey/40 dark:border-border-card bg-white dark:bg-[#16171F] px-3 py-2 text-xs font-bold text-dark-grey disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, index) => {
                    if (totalPages <= 5) return index + 1;
                    if (page <= 3) return index + 1;
                    if (page >= totalPages - 2) return totalPages - 4 + index;
                    return page - 2 + index;
                  }).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setPage(item)}
                      className={`h-8 min-w-8 rounded-lg px-2 text-xs font-bold transition ${
                        item === page
                          ? 'bg-tranquil-velvet text-white'
                          : 'bg-white dark:bg-[#16171F] text-dark-grey border border-medium-grey/40 dark:border-border-card hover:bg-medium-grey/10'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                  {totalPages > 5 && page < totalPages - 2 && (
                    <>
                      <span className="text-dark-grey">...</span>
                      <button
                        type="button"
                        onClick={() => setPage(totalPages)}
                        className="h-8 min-w-8 rounded-lg px-2 text-xs font-bold bg-white dark:bg-[#16171F] text-dark-grey border border-medium-grey/40 dark:border-border-card transition hover:bg-medium-grey/10"
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                    disabled={page === totalPages}
                    className="inline-flex items-center gap-1 rounded-lg border border-medium-grey/40 dark:border-border-card bg-white dark:bg-[#16171F] px-3 py-2 text-xs font-bold text-dark-grey disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ProfileActionModal
        open={showLearnerModal}
        onClose={closeLearnerModal}
        title={modalMode === 'create' ? 'New learner' : modalMode === 'edit' ? 'Edit learner' : 'Learner details'}
        description={
          modalMode === 'view'
            ? 'Review learner information details.'
            : 'Fill in learner details to add or update the record.'
        }
        footer={
          modalMode === 'view' ? (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => openLearnerModal('edit', selectedLearner)}
                className="inline-flex items-center gap-2 rounded-xl bg-tranquil-velvet px-4 py-2 text-xs font-bold text-white transition hover:bg-bright-velvet"
              >
                <Pencil className="h-4 w-4" /> Edit
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeLearnerModal}
                className="rounded-xl border border-medium-grey/40 bg-white px-4 py-2 text-xs font-bold text-dark-grey transition hover:bg-medium-grey/10"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="learnerForm"
                className="rounded-xl bg-tranquil-velvet px-4 py-2 text-xs font-bold text-white transition hover:bg-bright-velvet"
              >
                Save
              </button>
            </div>
          )
        }
      >
        {modalMode === 'view' ? (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-dark-grey font-bold">Name</p>
                <p className="mt-1 text-sm text-black">{selectedLearner?.name}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-dark-grey font-bold">Email</p>
                <p className="mt-1 text-sm text-black">{selectedLearner?.email}</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-dark-grey font-bold">Organisation</p>
                <p className="mt-1 text-sm text-black">{selectedLearner?.organisation}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-dark-grey font-bold">Type</p>
                <p className="mt-1 text-sm text-black">{selectedLearner?.type}</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-dark-grey font-bold">Domain</p>
                <p className="mt-1 text-sm text-black">{selectedLearner?.domain}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-dark-grey font-bold">Sem</p>
                <p className="mt-1 text-sm text-black">{selectedLearner?.sem}</p>
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-dark-grey font-bold">Status</p>
              <p className="mt-1 text-sm text-black">{selectedLearner?.status}</p>
            </div>
          </div>
        ) : (
          <form id="learnerForm" onSubmit={handleLearnerSave} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-dark-grey">
                <span className="block text-[10px] font-bold uppercase tracking-[0.18em]">Name</span>
                <input
                  value={learnerForm.name}
                  onChange={(e) => handleLearnerFieldChange('name', e.target.value)}
                  className="w-full rounded-2xl border border-medium-grey bg-[#F7F8FC] px-4 py-3 text-sm text-black focus:outline-none"
                />
              </label>
              <label className="space-y-2 text-sm text-dark-grey">
                <span className="block text-[10px] font-bold uppercase tracking-[0.18em]">Email</span>
                <input
                  value={learnerForm.email}
                  onChange={(e) => handleLearnerFieldChange('email', e.target.value)}
                  className="w-full rounded-2xl border border-medium-grey bg-[#F7F8FC] px-4 py-3 text-sm text-black focus:outline-none"
                />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-dark-grey">
                <span className="block text-[10px] font-bold uppercase tracking-[0.18em]">Organisation</span>
                <input
                  value={learnerForm.organisation}
                  onChange={(e) => handleLearnerFieldChange('organisation', e.target.value)}
                  className="w-full rounded-2xl border border-medium-grey bg-[#F7F8FC] px-4 py-3 text-sm text-black focus:outline-none"
                />
              </label>
              <label className="space-y-2 text-sm text-dark-grey">
                <span className="block text-[10px] font-bold uppercase tracking-[0.18em]">Type</span>
                <select
                  value={learnerForm.type}
                  onChange={(e) => handleLearnerFieldChange('type', e.target.value)}
                  className="w-full rounded-2xl border border-medium-grey bg-[#F7F8FC] px-4 py-3 text-sm text-black focus:outline-none"
                >
                  <option>University</option>
                  <option>Institute</option>
                </select>
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-dark-grey">
                <span className="block text-[10px] font-bold uppercase tracking-[0.18em]">Domain</span>
                <input
                  value={learnerForm.domain}
                  onChange={(e) => handleLearnerFieldChange('domain', e.target.value)}
                  className="w-full rounded-2xl border border-medium-grey bg-[#F7F8FC] px-4 py-3 text-sm text-black focus:outline-none"
                />
              </label>
              <label className="space-y-2 text-sm text-dark-grey">
                <span className="block text-[10px] font-bold uppercase tracking-[0.18em]">Semester</span>
                <input
                  type="number"
                  min="1"
                  value={learnerForm.sem}
                  onChange={(e) => handleLearnerFieldChange('sem', e.target.value)}
                  className="w-full rounded-2xl border border-medium-grey bg-[#F7F8FC] px-4 py-3 text-sm text-black focus:outline-none"
                />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-dark-grey">
                <span className="block text-[10px] font-bold uppercase tracking-[0.18em]">Status</span>
                <select
                  value={learnerForm.status}
                  onChange={(e) => handleLearnerFieldChange('status', e.target.value)}
                  className="w-full rounded-2xl border border-medium-grey bg-[#F7F8FC] px-4 py-3 text-sm text-black focus:outline-none"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </label>
              <label className="space-y-2 text-sm text-dark-grey">
                <span className="block text-[10px] font-bold uppercase tracking-[0.18em]">Avatar</span>
                <input
                  value={learnerForm.avatar}
                  onChange={(e) => handleLearnerFieldChange('avatar', e.target.value)}
                  className="w-full rounded-2xl border border-medium-grey bg-[#F7F8FC] px-4 py-3 text-sm text-black focus:outline-none"
                />
              </label>
            </div>
          </form>
        )}
      </ProfileActionModal>

      <ProfileActionModal
        open={showFiltersModal}
        onClose={() => setShowFiltersModal(false)}
        title="Learner filters"
        description="Filter learners by status or learner type."
        footer={
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={clearFilters}
              className="rounded-xl border border-medium-grey/40 bg-white px-4 py-2 text-xs font-bold text-dark-grey transition hover:bg-medium-grey/10"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={applyFilters}
              className="rounded-xl bg-tranquil-velvet px-4 py-2 text-xs font-bold text-white transition hover:bg-bright-velvet"
            >
              Apply
            </button>
          </div>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm text-dark-grey">
            <span className="block text-[10px] font-bold uppercase tracking-[0.18em]">Status</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full rounded-2xl border border-medium-grey bg-[#F7F8FC] px-4 py-3 text-sm text-black focus:outline-none"
            >
              <option>All</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </label>
          <label className="space-y-2 text-sm text-dark-grey">
            <span className="block text-[10px] font-bold uppercase tracking-[0.18em]">Learner type</span>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full rounded-2xl border border-medium-grey bg-[#F7F8FC] px-4 py-3 text-sm text-black focus:outline-none"
            >
              <option>All</option>
              <option>University</option>
              <option>Institute</option>
            </select>
          </label>
        </div>
      </ProfileActionModal>    </DashboardLayout>
  );
}
