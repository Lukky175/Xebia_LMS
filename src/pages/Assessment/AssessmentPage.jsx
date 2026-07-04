/**
 * Assessment Page Component
 * Manage and monitor all platform assessments with real-time performance tracking.
 */

import React, { useMemo, useState } from 'react';
import { Plus, Download, Filter, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout.jsx';
import { useTheme } from '@/context/ThemeContext.jsx';
import { AssessmentStatusBadge, AssessmentModal } from '@/components/assessment/AssessmentUi.jsx';

const initialAssessments = [
  { id: 1, name: 'Q3 Engineering Certification', type: 'Certification', target: 'Senior Developers', status: 'Active' },
  { id: 2, name: 'Product Strategy Quiz v2', type: 'Internal Quiz', target: 'Product Team', status: 'Draft' },
  { id: 3, name: 'Security Awareness 2023', type: 'Compliance', target: 'All Employees', status: 'Completed' },
  { id: 4, name: 'React Hooks Sprint Check', type: 'Quiz', target: 'Frontend Team', status: 'Pending' },
  { id: 5, name: 'Cloud Native Mock Exam', type: 'Mock Test', target: 'Platform Engineers', status: 'Active' },
  { id: 6, name: 'Leadership Review', type: 'Review', target: 'Managers', status: 'Draft' },
];

const recentActivity = [
  { id: 1, title: 'New submission received', detail: 'John Doe completed Engineering Cert', time: '2m ago', tone: 'orange' },
  { id: 2, title: 'Assessment Published', detail: 'Security Awareness 2024 is now live', time: '45m ago', tone: 'velvet' },
  { id: 3, title: 'System Update', detail: 'Automated scoring engine updated', time: '2h ago', tone: 'muted' },
];

const trafficBars = [
  { label: 'M', value: 34, accent: false },
  { label: 'T', value: 58, accent: false },
  { label: 'W', value: 43, accent: false },
  { label: 'T', value: 72, accent: false },
  { label: 'F', value: 86, accent: true },
  { label: 'S', value: 55, accent: false },
  { label: 'S', value: 66, accent: false },
];

export default function AssessmentPage() {
  const { theme } = useTheme();
  const [assessments, setAssessments] = useState(initialAssessments);
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [createForm, setCreateForm] = useState({ name: '', type: '', target: '', status: 'Draft' });

  const pageSize = 3;

  const filtered = useMemo(() => {
    return assessments.filter((item) => statusFilter === 'All' || item.status === statusFilter);
  }, [assessments, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);
  const rangeStart = filtered.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, filtered.length);

  const handleCreate = (event) => {
    event.preventDefault();
    setAssessments((current) => [
      { id: Date.now(), name: createForm.name, type: createForm.type, target: createForm.target, status: createForm.status },
      ...current,
    ]);
    setShowCreateModal(false);
    setCreateForm({ name: '', type: '', target: '', status: 'Draft' });
    setPage(1);
  };

  const handleExport = () => {
    const rows = ['Name,Type,Target Group,Status\n', ...filtered.map((item) => `${item.name},${item.type},${item.target},${item.status}\n`)];
    const blob = new Blob(rows, { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'assessments.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleEdit = (assessment) => {
    setCreateForm({ name: assessment.name, type: assessment.type, target: assessment.target, status: assessment.status });
    setShowCreateModal(true);
  };

  const handleDelete = (id) => {
    setAssessments((current) => current.filter((item) => item.id !== id));
  };

  const stats = [
    { label: 'Total Assessments', value: assessments.length, change: '+12%' },
    { label: 'Active Sessions', value: 42, change: 'Current' },
    { label: 'Avg. Score', value: '78.5%', change: '+3.4%' },
    { label: 'Pending Reviews', value: 15, change: 'Requires action' },
  ];

  return (
    <DashboardLayout onSearchChange={() => {}} searchValue="">
      <div className="space-y-6">
        {/* Action Bar */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-cta-orange px-4 py-2.5 text-xs font-extrabold text-white shadow-[0_10px_24px_rgba(255,98,0,0.25)] transition hover:brightness-95"
          >
            <Plus className="h-4 w-4" />
            Create Assessment
          </button>
        </div>

        <div className="flex flex-col gap-4 rounded-3xl border border-white/60 dark:border-border-card bg-white/80 dark:bg-[#16171F]/90 backdrop-blur-sm p-6 shadow-sm">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-medium-grey/30 dark:border-border-card bg-[#FBFBFE] dark:bg-[#0F1015] p-5"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-dark-grey">
                  {stat.label}
                </p>
                <p className="text-2xl font-extrabold text-black dark:text-white mt-2">
                  {stat.value}
                </p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                  {stat.change}
                </p>
              </div>
            ))}
          </div>

          {/* Recent Assessments Table */}
          <div className="rounded-2xl border border-medium-grey/30 dark:border-border-card bg-[#FBFBFE] dark:bg-[#0F1015] p-5 md:p-6">
            <div className="flex flex-col gap-4 border-b border-medium-grey/40 dark:border-border-card pb-4 mb-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-sm font-extrabold text-black dark:text-white">Recent Assessments</h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStatusFilter(statusFilter === 'All' ? 'Active' : 'All')}
                  className="inline-flex items-center gap-2 rounded-xl border border-medium-grey/40 dark:border-border-card bg-white dark:bg-[#16171F] px-4 py-2 text-xs font-bold text-dark-grey hover:text-tranquil-velvet transition"
                >
                  <Filter className="h-3.5 w-3.5" />
                  Filter
                </button>
                <button
                  type="button"
                  onClick={handleExport}
                  className="inline-flex items-center gap-2 rounded-xl border border-medium-grey/40 dark:border-border-card bg-white dark:bg-[#16171F] px-4 py-2 text-xs font-bold text-dark-grey hover:text-tranquil-velvet transition"
                >
                  <Download className="h-3.5 w-3.5" />
                  Export
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto sleek-scrollbar">
              <table className="w-full min-w-[800px] text-left text-xs">
                <thead>
                  <tr className="border-b border-medium-grey/50 dark:border-border-card bg-[#F7F8FC]/80 dark:bg-[#18181B] text-dark-grey uppercase tracking-[0.18em]">
                    <th className="p-4 font-bold">Assessment Name</th>
                    <th className="p-4 font-bold">Type</th>
                    <th className="p-4 font-bold">Target Group</th>
                    <th className="p-4 font-bold">Status</th>
                    <th className="p-4 text-center font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pageItems.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-8 text-center">
                        <AlertCircle className="h-8 w-8 text-medium-grey/50 mx-auto mb-2" />
                        <p className="text-dark-grey">No assessments found</p>
                      </td>
                    </tr>
                  ) : (
                    pageItems.map((assessment) => (
                      <tr
                        key={assessment.id}
                        className="border-b border-medium-grey/30 dark:border-border-card/30 hover:bg-tranquil-velvet/5 dark:hover:bg-white/5 transition-colors"
                      >
                        <td className="p-4 font-bold text-black dark:text-white">
                          {assessment.name}
                        </td>
                        <td className="p-4 text-dark-grey">{assessment.type}</td>
                        <td className="p-4 text-dark-grey">{assessment.target}</td>
                        <td className="p-4">
                          <AssessmentStatusBadge status={assessment.status.toLowerCase()}>
                            {assessment.status}
                          </AssessmentStatusBadge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleEdit(assessment)}
                              className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-medium-grey/40 dark:border-border-card bg-white dark:bg-[#16171F] text-dark-grey hover:text-tranquil-velvet hover:bg-tranquil-velvet/5 transition"
                              title="Edit"
                            >
                              ✎
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(assessment.id)}
                              className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-cta-orange/20 bg-white dark:bg-[#16171F] text-cta-orange hover:bg-cta-orange/10 transition"
                              title="Delete"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filtered.length > 0 && (
              <div className="flex flex-col gap-3 border-t border-medium-grey/40 dark:border-border-card pt-4 mt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-dark-grey">
                  Showing {rangeStart} to {rangeEnd} of {filtered.length} assessments
                </p>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setPage((current) => Math.max(1, current - 1))}
                    disabled={page === 1}
                    className="inline-flex items-center gap-1 rounded-lg border border-medium-grey/40 dark:border-border-card bg-white dark:bg-[#16171F] px-3 py-2 text-xs font-bold text-dark-grey disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map((item) => (
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
                  <button
                    type="button"
                    onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                    disabled={page === totalPages}
                    className="inline-flex items-center gap-1 rounded-lg border border-medium-grey/40 dark:border-border-card bg-white dark:bg-[#16171F] px-3 py-2 text-xs font-bold text-dark-grey disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Session Traffic and Activity */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr]">
            {/* Session Traffic */}
            <div className="rounded-2xl border border-medium-grey/30 dark:border-border-card bg-[#FBFBFE] dark:bg-[#0F1015] p-5 md:p-6">
              <div className="flex items-center justify-between gap-3 mb-5">
                <h2 className="text-sm font-extrabold text-black dark:text-white">Session Traffic</h2>
                <span className="text-xs text-dark-grey bg-medium-grey/10 dark:bg-white/5 px-3 py-1 rounded-full">
                  Last 7 Days
                </span>
              </div>
              <div className="flex h-48 items-end gap-2 rounded-lg border border-medium-grey/20 dark:border-white/5 bg-medium-grey/5 dark:bg-white/5 px-4 py-4">
                {trafficBars.map((bar) => (
                  <div key={bar.label + bar.value} className="flex-1 flex flex-col items-center justify-end gap-2">
                    <div
                      className={`w-full rounded-t-lg transition-all ${
                        bar.accent
                          ? 'bg-gradient-to-t from-tranquil-velvet to-bright-velvet'
                          : 'bg-medium-grey/30 dark:bg-white/10'
                      }`}
                      style={{ height: `${Math.max(30, bar.value * 1.8)}px` }}
                    />
                    <span className="text-[9px] font-bold text-dark-grey">{bar.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="rounded-2xl border border-medium-grey/30 dark:border-border-card bg-[#FBFBFE] dark:bg-[#0F1015] p-5 md:p-6">
              <div className="flex items-center justify-between gap-3 mb-5">
                <h2 className="text-sm font-extrabold text-black dark:text-white">Recent Activity</h2>
                <button
                  type="button"
                  onClick={() => setShowActivityModal(true)}
                  className="text-xs font-bold text-tranquil-velvet hover:text-bright-velvet transition"
                >
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {recentActivity.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div
                      className={`mt-0.5 h-2 w-2 rounded-full flex-shrink-0 ${
                        item.tone === 'orange'
                          ? 'bg-cta-orange'
                          : item.tone === 'velvet'
                          ? 'bg-tranquil-velvet'
                          : 'bg-dark-grey/50'
                      }`}
                    />
                    <div>
                      <p className="text-xs font-bold text-black dark:text-white">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-dark-grey">{item.detail}</p>
                      <span className="text-[9px] text-dark-grey/60">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Assessment Modal */}
      <AssessmentModal
        open={showCreateModal}
        title="Create Assessment"
        onClose={() => setShowCreateModal(false)}
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="space-y-3">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-dark-grey block mb-1.5">
                Assessment Name
              </label>
              <input
                type="text"
                value={createForm.name}
                onChange={(e) => setCreateForm((current) => ({ ...current, name: e.target.value }))}
                className="w-full rounded-xl border border-medium-grey/40 dark:border-border-card bg-white dark:bg-[#0F1015] px-3.5 py-2.5 text-xs font-semibold text-black dark:text-white focus:outline-none"
                placeholder="Enter assessment name"
                required
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-dark-grey block mb-1.5">
                Type
              </label>
              <input
                type="text"
                value={createForm.type}
                onChange={(e) => setCreateForm((current) => ({ ...current, type: e.target.value }))}
                className="w-full rounded-xl border border-medium-grey/40 dark:border-border-card bg-white dark:bg-[#0F1015] px-3.5 py-2.5 text-xs font-semibold text-black dark:text-white focus:outline-none"
                placeholder="e.g., Quiz, Certification"
                required
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-dark-grey block mb-1.5">
                Target Group
              </label>
              <input
                type="text"
                value={createForm.target}
                onChange={(e) => setCreateForm((current) => ({ ...current, target: e.target.value }))}
                className="w-full rounded-xl border border-medium-grey/40 dark:border-border-card bg-white dark:bg-[#0F1015] px-3.5 py-2.5 text-xs font-semibold text-black dark:text-white focus:outline-none"
                placeholder="e.g., Frontend Team"
                required
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-dark-grey block mb-1.5">
                Status
              </label>
              <select
                value={createForm.status}
                onChange={(e) => setCreateForm((current) => ({ ...current, status: e.target.value }))}
                className="w-full rounded-xl border border-medium-grey/40 dark:border-border-card bg-white dark:bg-[#0F1015] px-3.5 py-2.5 text-xs font-semibold text-black dark:text-white focus:outline-none"
              >
                <option>Draft</option>
                <option>Active</option>
                <option>Completed</option>
                <option>Pending</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-medium-grey/20 dark:border-white/10">
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="inline-flex items-center gap-2 rounded-xl border border-medium-grey/40 dark:border-border-card bg-white dark:bg-[#16171F] px-4 py-2 text-xs font-bold text-dark-grey hover:bg-medium-grey/10 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-tranquil-velvet px-4 py-2 text-xs font-extrabold text-white hover:bg-bright-velvet transition"
            >
              Save Assessment
            </button>
          </div>
        </form>
      </AssessmentModal>

      {/* Activity Modal */}
      <AssessmentModal
        open={showActivityModal}
        title="Recent Activity"
        onClose={() => setShowActivityModal(false)}
      >
        <div className="space-y-3 max-h-96 overflow-y-auto sleek-scrollbar">
          {recentActivity.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 rounded-lg border border-medium-grey/30 dark:border-border-card bg-medium-grey/5 dark:bg-white/5 p-3"
            >
              <div
                className={`mt-0.5 h-2 w-2 rounded-full flex-shrink-0 ${
                  item.tone === 'orange'
                    ? 'bg-cta-orange'
                    : item.tone === 'velvet'
                    ? 'bg-tranquil-velvet'
                    : 'bg-dark-grey/50'
                }`}
              />
              <div>
                <p className="text-xs font-bold text-black dark:text-white">
                  {item.title}
                </p>
                <p className="text-[10px] text-dark-grey">{item.detail}</p>
                <span className="text-[9px] text-dark-grey/60">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </AssessmentModal>
    </DashboardLayout>
  );
}
