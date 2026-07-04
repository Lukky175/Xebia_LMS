/**
 * Author: Abhishek Dixit
 * Institution: Lovely Professional University
 * Develop the assessment management page for the platform, 
 * including overview cards, assessment tables, traffic charts, and activity feeds.
 */

import React, { useMemo, useState } from 'react';
import { Plus, Filter, Download, ArrowRight, Clock, ClipboardList, Activity, CheckCircle2, Flag, RefreshCcw, Trash2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';
import { useTheme } from '@/context/ThemeContext.jsx';
import { ProfileActionButton } from '@/components/profile/ProfileUi.jsx';

const overviewCards = [
  {
    title: 'Total Assessments',
    value: '1,284',
    meta: '+12%',
    metaClass: 'text-emerald font-semibold',
    description: 'since last month',
    icon: ClipboardList,
    tone: 'bg-[#F4F5FF] text-tranquil-velvet',
  },
  {
    title: 'Active Sessions',
    value: '42',
    meta: 'Current',
    description: '',
    icon: Activity,
    tone: 'bg-[#E8F7EE] text-emerald',
  },
  {
    title: 'Avg. Score',
    value: '78.5%',
    meta: '+3.4%',
    metaClass: 'text-emerald font-semibold',
    description: '',
    icon: CheckCircle2,
    tone: 'bg-[#E6F7F0] text-emerald',
  },
  {
    title: 'Pending Reviews',
    value: '15',
    meta: 'Requires action',
    metaClass: 'text-cta-orange font-semibold',
    description: '',
    icon: Flag,
    tone: 'bg-[#FFF4E5] text-cta-orange',
  },
];

const allAssessments = [
  { name: 'Q3 Engineering Certification', type: 'Certification', target: 'Senior Developers', status: 'ACTIVE' },
  { name: 'Product Strategy Quiz v2', type: 'Internal Quiz', target: 'Product Team', status: 'DRAFT' },
  { name: 'Security Awareness 2023', type: 'Compliance', target: 'All Employees', status: 'COMPLETED' },
];

const traffic7Days = [
  { day: 'Mon', sessions: 32 },
  { day: 'Tue', sessions: 45 },
  { day: 'Wed', sessions: 28 },
  { day: 'Thu', sessions: 56 },
  { day: 'Fri', sessions: 64 },
  { day: 'Sat', sessions: 48 },
  { day: 'Sun', sessions: 52 },
];

const traffic30Days = [
  { day: 'W1', sessions: 220 },
  { day: 'W2', sessions: 280 },
  { day: 'W3', sessions: 255 },
  { day: 'W4', sessions: 310 },
];

const activityFeed = [
  { title: 'New submission received', subtitle: 'John Doe completed “Engineering Cert”', time: '2m ago' },
  { title: 'Assessment Published', subtitle: 'Security Awareness 2023 is now live', time: '45m ago' },
  { title: 'System Update', subtitle: 'Automated scoring engine updated', time: '3h ago' },
];

const statusStyles = {
  ACTIVE: 'bg-emerald/15 text-emerald',
  DRAFT: 'bg-[#FFF4E5] text-cta-orange',
  COMPLETED: 'bg-[#F6E5F5] text-[#84117C]',
};

export default function AssessmentPage() {
  const { theme } = useTheme();
  const [chartRange, setChartRange] = useState('Last 7 Days');
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [assessments, setAssessments] = useState(allAssessments);

  const trafficData = useMemo(
    () => (chartRange === 'Last 7 Days' ? traffic7Days : traffic30Days),
    [chartRange]
  );

  const filteredAssessments = useMemo(() => {
    if (statusFilter === 'All') return assessments;
    return assessments.filter((item) => item.status === statusFilter);
  }, [statusFilter, assessments]);

  const pageSize = 3;
  const pageCount = Math.max(1, Math.ceil(filteredAssessments.length / pageSize));
  const pageItems = filteredAssessments.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const highlightIndex = useMemo(
    () => trafficData.reduce((maxIndex, item, index) => (item.sessions > trafficData[maxIndex].sessions ? index : maxIndex), 0),
    [trafficData]
  );

  const handleCreateAssessment = () => {
    window.alert('Create Assessment action triggered.');
  };

  const handleFilterToggle = () => {
    setFilterOpen((prev) => !prev);
  };

  const handleExport = () => {
    const headers = ['Assessment Name', 'Type', 'Target Group', 'Status'];
    const rows = filteredAssessments.map((item) => `${item.name},${item.type},${item.target},${item.status}`);
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'assessments_export.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleToggleAssessmentStatus = (name) => {
    const nextStatus = {
      DRAFT: 'ACTIVE',
      ACTIVE: 'COMPLETED',
      COMPLETED: 'DRAFT',
    };
    setAssessments((prev) =>
      prev.map((item) =>
        item.name === name ? { ...item, status: nextStatus[item.status] || item.status } : item
      )
    );
  };

  const handleDeleteAssessment = (name) => {
    if (window.confirm('Delete this assessment? This cannot be undone.')) {
      setAssessments((prev) => prev.filter((item) => item.name !== name));
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleChartRange = () => {
    setChartRange((current) => (current === 'Last 7 Days' ? 'Last 30 Days' : 'Last 7 Days'));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tranquil-velvet">Assessments Engine</p>
          <h1 className="text-3xl font-extrabold text-black dark:text-white">Manage and monitor platform assessments</h1>
          <p className="max-w-2xl text-sm text-dark-grey">Manage and monitor all platform assessments and examination modules with real-time performance tracking.</p>
        </div>

        <ProfileActionButton
          onClick={handleCreateAssessment}
          tone="warning"
          className="inline-flex items-center gap-2 px-5 py-3 text-sm"
        >
          <Plus className="h-4 w-4" />
          Create Assessment
        </ProfileActionButton>
      </div>

      <div className="grid gap-4 xl:grid-cols-4">
        {overviewCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="rounded-3xl border border-medium-grey/40 bg-white dark:bg-[#16171F] p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-dark-grey">{card.title}</p>
                  <p className="mt-3 text-3xl font-extrabold text-black dark:text-white">{card.value}</p>
                </div>
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${card.tone}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between gap-2 text-sm text-dark-grey">
                <span className={card.metaClass || 'text-dark-grey'}>{card.meta}</span>
                <span>{card.description}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-3xl border border-medium-grey/40 bg-white dark:bg-[#16171F] p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-bold text-black dark:text-white">Recent Assessments</h2>
            <p className="text-sm text-dark-grey">Track the latest assessment rollout and stage.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleFilterToggle}
              className="inline-flex items-center gap-2 rounded-2xl border border-medium-grey/50 bg-white px-4 py-2 text-xs font-bold text-dark-grey transition hover:border-tranquil-velvet hover:text-tranquil-velvet"
            >
              <Filter className="h-4 w-4" />
              Filter
            </button>
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-2 rounded-2xl border border-medium-grey/50 bg-white px-4 py-2 text-xs font-bold text-dark-grey transition hover:border-tranquil-velvet hover:text-tranquil-velvet"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        {filterOpen && (
          <div className="mt-4 rounded-2xl border border-medium-grey/40 bg-blueish-grey/70 p-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-dark-grey">Status</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-2xl border border-medium-grey/40 bg-white px-3 py-2 text-sm text-black focus:outline-none"
              >
                <option value="All">All</option>
                <option value="ACTIVE">Active</option>
                <option value="DRAFT">Draft</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
            <button
              onClick={() => setStatusFilter('All')}
              className="rounded-2xl bg-tranquil-velvet px-4 py-2 text-xs font-bold text-white hover:bg-bright-velvet transition"
            >
              Clear Filters
            </button>
          </div>
        )}

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[740px] text-left text-sm">
            <thead className="border-b border-medium-grey/40 text-dark-grey uppercase tracking-[0.18em] text-[10px]">
              <tr>
                <th className="py-4 px-4">Assessment Name</th>
                <th className="py-4 px-4">Type</th>
                <th className="py-4 px-4">Target Group</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((item) => (
                <tr key={item.name} className="border-b border-medium-grey/30 last:border-b-0 hover:bg-[#F7F8FC] dark:hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4 text-black dark:text-white font-semibold">{item.name}</td>
                  <td className="py-4 px-4 text-dark-grey">{item.type}</td>
                  <td className="py-4 px-4 text-dark-grey">{item.target}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${statusStyles[item.status]}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-dark-grey">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleToggleAssessmentStatus(item.name)}
                        className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-medium-grey/40 bg-white text-dark-grey hover:text-tranquil-velvet hover:bg-tranquil-velvet/5 transition"
                        title="Change status"
                      >
                        <RefreshCcw className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteAssessment(item.name)}
                        className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-cta-orange/20 bg-white text-cta-orange hover:bg-cta-orange/10 transition"
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

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-dark-grey">
          <span>
            Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, filteredAssessments.length)} of 1,284 assessments
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-medium-grey/40 bg-white text-dark-grey transition hover:bg-medium-grey/10"
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {[...Array(pageCount)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`inline-flex h-9 min-w-[36px] items-center justify-center rounded-xl text-sm font-bold transition ${currentPage === index + 1 ? 'bg-tranquil-velvet text-white' : 'border border-medium-grey/40 bg-white text-dark-grey hover:bg-medium-grey/10'}`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(Math.min(pageCount, currentPage + 1))}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-medium-grey/40 bg-white text-dark-grey transition hover:bg-medium-grey/10"
              disabled={currentPage === pageCount}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.7fr_1fr]">
        <div className="rounded-3xl border border-medium-grey/40 bg-white dark:bg-[#16171F] p-5 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-black dark:text-white">Session Traffic</h2>
              <p className="text-sm text-dark-grey">{chartRange}</p>
            </div>
            <button
              onClick={toggleChartRange}
              className="inline-flex items-center gap-2 rounded-2xl border border-medium-grey/40 bg-white px-4 py-2 text-xs font-bold text-dark-grey transition hover:bg-medium-grey/10"
            >
              <span>{chartRange}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="mt-5 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#282A3A' : '#E6E7EF'} vertical={false} />
                <XAxis dataKey="day" stroke={theme === 'dark' ? '#9CA3AF' : '#5A5A5A'} tickLine={false} axisLine={false} />
                <YAxis stroke={theme === 'dark' ? '#9CA3AF' : '#5A5A5A'} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#16171F' : '#FFFFFF', borderColor: theme === 'dark' ? '#282A3A' : '#DADCEA' }} cursor={{ fill: theme === 'dark' ? '#ffffff10' : '#00000008' }} />
                <Bar dataKey="sessions" radius={[14, 14, 0, 0]} barSize={30}>
                  {trafficData.map((entry, index) => (
                    <Cell key={`cell-${entry.day}`} fill={index === highlightIndex ? '#6C1D5F' : '#A669C2'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl border border-medium-grey/40 bg-white dark:bg-[#16171F] p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-black dark:text-white">Recent Activity</h2>
              <p className="text-sm text-dark-grey">Live assessment updates and notifications.</p>
            </div>
          </div>
          <div className="mt-5 space-y-4">
            {activityFeed.map((item) => (
              <div key={item.title} className="flex gap-3 rounded-3xl border border-medium-grey/40 bg-[#F7F8FC] dark:bg-[#11131A] p-4">
                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-tranquil-velvet/10 text-tranquil-velvet">
                  <Clock className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-black dark:text-white">{item.title}</p>
                  <p className="text-sm text-dark-grey">{item.subtitle}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-dark-grey/70">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-right">
            <button className="text-sm font-bold text-tranquil-velvet hover:text-bright-velvet transition">View All Activity</button>
          </div>
        </div>
      </div>
    </div>
  );
}
