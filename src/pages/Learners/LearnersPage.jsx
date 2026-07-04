/**
 * Learners Page Component
 * Displays enrolled learners across organizations with search, filters, and pagination.
 */

import React, { useEffect, useMemo, useState } from 'react';
import { Plus, Search, SlidersHorizontal, ChevronLeft, ChevronRight, Mail, Building2, AlertCircle } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout.jsx';
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
  const [learners] = useState(initialLearners);
  const pageSize = 10;

  const filteredLearners = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return learners.filter((learner) => {
      if (!query) return true;
      return [learner.name, learner.email, learner.organisation, learner.domain]
        .join(' ')
        .toLowerCase()
        .includes(query);
    });
  }, [learners, searchQuery]);

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
                className="inline-flex items-center gap-2 rounded-xl bg-tranquil-velvet px-4 py-2.5 text-xs font-bold text-white transition hover:bg-bright-velvet"
              >
                <Search className="h-4 w-4" />
                Search
              </button>
            </div>

            <button
              type="button"
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
                              className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-medium-grey/40 dark:border-border-card bg-white dark:bg-[#16171F] text-dark-grey hover:text-tranquil-velvet hover:bg-tranquil-velvet/5 transition text-xs"
                              title="View"
                            >
                              👁️
                            </button>
                            <button
                              type="button"
                              className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-medium-grey/40 dark:border-border-card bg-white dark:bg-[#16171F] text-dark-grey hover:text-tranquil-velvet hover:bg-tranquil-velvet/5 transition text-xs"
                              title="Edit"
                            >
                              ✎
                            </button>
                            <button
                              type="button"
                              className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-cta-orange/20 bg-white dark:bg-[#16171F] text-cta-orange hover:bg-cta-orange/10 transition text-xs"
                              title="Delete"
                            >
                              🗑️
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
    </DashboardLayout>
  );
}
