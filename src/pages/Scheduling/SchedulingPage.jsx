/**
 * Scheduling Page Component
 * Manage schedules and sessions
 */

import React, { useState } from 'react';
import { Plus, Calendar, Clock, Users, Trash2, Eye, PencilLine } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout.jsx';
import { useTheme } from '@/context/ThemeContext.jsx';

const initialSchedules = [
  {
    id: 1,
    title: 'DevOps Fundamentals - Session 1',
    date: '15 Jul, 2024',
    time: '10:00 AM - 11:30 AM',
    instructor: 'Dr. Abhishek Singh',
    learners: 45,
    status: 'Scheduled',
  },
  {
    id: 2,
    title: 'Cloud Computing Basics',
    date: '16 Jul, 2024',
    time: '2:00 PM - 3:30 PM',
    instructor: 'Prof. Rajesh Kumar',
    learners: 38,
    status: 'Scheduled',
  },
  {
    id: 3,
    title: 'Kubernetes Workshop',
    date: '17 Jul, 2024',
    time: '9:00 AM - 12:00 PM',
    instructor: 'Dr. Priya Sharma',
    learners: 52,
    status: 'Completed',
  },
];

export default function SchedulingPage() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [schedules, setSchedules] = useState(initialSchedules);

  const filteredSchedules = schedules.filter((schedule) => {
    const query = searchQuery.toLowerCase();
    return (
      schedule.title.toLowerCase().includes(query) ||
      schedule.instructor.toLowerCase().includes(query)
    );
  });

  const deleteSchedule = (id) => {
    setSchedules(schedules.filter((s) => s.id !== id));
  };

  const getStatusColor = (status) => {
    return status === 'Completed'
      ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
      : 'bg-tranquil-velvet/10 text-tranquil-velvet dark:bg-tranquil-velvet/20';
  };

  return (
    <DashboardLayout onSearchChange={(event) => setSearchQuery(event.target.value)} searchValue={searchQuery}>
      <div className="space-y-6">
        {/* Action Bar */}
        <div className="flex justify-end">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-cta-orange px-4 py-2.5 text-xs font-extrabold text-white shadow-[0_10px_24px_rgba(255,98,0,0.25)] transition hover:brightness-95"
          >
            <Plus className="h-4 w-4" />
            New Schedule
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col gap-3 rounded-2xl border border-medium-grey/30 dark:border-border-card bg-white/50 dark:bg-[#16171F]/50 p-4 md:p-5">
          <div className="flex items-center gap-2 px-3.5 py-2.5 bg-blueish-grey dark:bg-[#0F1015] border border-medium-grey/40 dark:border-border-card rounded-xl">
            <input
              type="text"
              placeholder="Search by title or instructor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs text-black dark:text-white placeholder-dark-grey/50 focus:outline-none w-full"
            />
          </div>
        </div>

        {/* Schedules Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredSchedules.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <Calendar className="h-12 w-12 text-medium-grey/50 mb-3" />
              <p className="text-dark-grey font-semibold">No schedules found</p>
              <p className="text-xs text-dark-grey/60">Try a different search query</p>
            </div>
          ) : (
            filteredSchedules.map((schedule) => (
              <div
                key={schedule.id}
                className="rounded-2xl border border-medium-grey/30 dark:border-border-card bg-white/80 dark:bg-[#16171F]/80 backdrop-blur-sm p-5 hover:border-tranquil-velvet/50 transition-colors"
              >
                {/* Header */}
                <div className="flex flex-col gap-2 border-b border-medium-grey/20 dark:border-border-card pb-3 mb-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold text-black dark:text-white flex-1">
                      {schedule.title}
                    </h3>
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-bold whitespace-nowrap ${getStatusColor(
                        schedule.status,
                      )}`}
                    >
                      {schedule.status}
                    </span>
                  </div>
                  <p className="text-xs text-dark-grey">{schedule.instructor}</p>
                </div>

                {/* Details */}
                <div className="space-y-2.5 mb-4">
                  <div className="flex items-center gap-2 text-xs text-dark-grey">
                    <Calendar className="h-3.5 w-3.5 text-tranquil-velvet" />
                    <span>{schedule.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-dark-grey">
                    <Clock className="h-3.5 w-3.5 text-tranquil-velvet" />
                    <span>{schedule.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-dark-grey">
                    <Users className="h-3.5 w-3.5 text-tranquil-velvet" />
                    <span>{schedule.learners} learners</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 border-t border-medium-grey/20 dark:border-border-card pt-3">
                  <button
                    type="button"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-tranquil-velvet/10 dark:bg-tranquil-velvet/5 px-3 py-2 text-[10px] font-bold text-tranquil-velvet hover:bg-tranquil-velvet/20 transition"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    View
                  </button>
                  <button
                    type="button"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-medium-grey/10 dark:bg-white/5 px-3 py-2 text-[10px] font-bold text-dark-grey hover:bg-medium-grey/20 transition"
                  >
                    <PencilLine className="h-3.5 w-3.5" />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteSchedule(schedule.id)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-cta-orange/10 px-3 py-2 text-[10px] font-bold text-cta-orange hover:bg-cta-orange/20 transition"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
