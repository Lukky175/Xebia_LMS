/**
 * Author: Abhishek Dixit
 * Institution: Lovely Professional University
 * Develop the scheduling management page for the platform, 
 * including calendar views, event lists, 
 * resource allocation, and automated directives.
 */

import React, { useMemo, useState } from 'react';
import { Plus, Calendar, Clock, Users, Trash2, Eye, PencilLine } from 'lucide-react';
import BorderGlow from '@/components/ui/BorderGlow.jsx';
import { ProfileActionButton } from '@/components/profile/ProfileUi.jsx';
import { useTheme } from '@/context/ThemeContext.jsx';

// Static demo events matching the screenshot layout (days are relative placeholders)
const calendarEvents = [
  { id: 1, day: 3, title: 'HR Onboarding', color: 'bg-[#6C1D5F] text-white' },
  { id: 2, day: 5, title: 'System Maintenance', color: 'bg-[#DB8B15] text-white' },
  { id: 3, day: 11, title: 'Governance Audit', color: 'bg-[#0CA678] text-white' },
  { id: 4, day: 11, title: 'Engineering Prep', color: 'bg-[#6C1D5F] text-white' },
];

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const createMonthMatrix = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay();
  const matrix = [];
  let day = 1 - firstDay;
  for (let week = 0; week < 6; week += 1) {
    const row = [];
    for (let wd = 0; wd < 7; wd += 1) {
      const dt = new Date(year, month, day);
      row.push({
        dayNumber: dt.getDate(),
        inMonth: dt.getMonth() === month,
        key: `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`,
      });
      day += 1;
    }
    matrix.push(row);
  }
  return matrix;
};

const formatMonthLabel = (d) => d.toLocaleString('default', { month: 'long', year: 'numeric' });

export default function SchedulingPage() {
  const { theme } = useTheme();
  const [viewMode, setViewMode] = useState('Month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [schedules, setSchedules] = useState([
    { id: 1, title: 'System Maintenance', displayDate: '14 Jul, 2026', time: '02:00 AM - 03:00 AM', learners: 24, status: 'Upcoming' },
    { id: 2, title: 'Engineering Quiz Prep', displayDate: '11 Jul, 2026', time: '10:00 AM - 11:30 AM', learners: 18, status: 'In Progress' },
    { id: 3, title: 'HR Onboarding', displayDate: '07 Jul, 2026', time: '09:00 AM - 10:30 AM', learners: 32, status: 'Postponed' },
  ]);

  const monthLabel = useMemo(() => formatMonthLabel(currentDate), [currentDate]);
  const monthMatrix = useMemo(() => createMonthMatrix(currentDate.getFullYear(), currentDate.getMonth()), [currentDate]);

  const eventsByDay = useMemo(() => calendarEvents.reduce((acc, e) => {
    const k = String(e.day).padStart(2, '0');
    acc[k] = acc[k] || [];
    acc[k].push(e);
    return acc;
  }, {}), []);

  const handleNavigate = (dir) => {
    setCurrentDate((prev) => {
      const month = dir === 'next' ? prev.getMonth() + 1 : prev.getMonth() - 1;
      return new Date(prev.getFullYear(), month, 1);
    });
  };

  const handleQuickSchedule = () => {
    const title = window.prompt('Quick schedule title');
    if (!title) return;
    const newItem = { id: Date.now(), title, displayDate: formatMonthLabel(currentDate), time: '11:00 AM - 12:30 PM', learners: 10, status: 'Scheduled' };
    setSchedules((p) => [newItem, ...p]);
    window.alert(`Quick scheduled ${title}`);
  };

  const handleAction = (type, item) => {
    if (type === 'view') window.alert(`Viewing ${item.title} — ${item.displayDate}`);
    if (type === 'edit') window.alert(`Edit ${item.title}`);
    if (type === 'delete') setSchedules((p) => p.filter((s) => s.id !== item.id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tranquil-velvet">Scheduling</p>
          <h1 className="text-3xl font-extrabold text-black dark:text-white">Manage and coordinate platform events and sessions.</h1>
          <p className="max-w-2xl text-sm text-dark-grey">Plan events, track availability, and keep your dates aligned across the learning platform in {monthLabel}.</p>
        </div>

        <ProfileActionButton tone="warning" onClick={handleQuickSchedule} className="inline-flex items-center gap-2 px-5 py-3 text-sm">
          <Plus className="h-4 w-4" />
          Quick Schedule
        </ProfileActionButton>
      </div>

      <div className="grid gap-4 xl:grid-cols-[2.2fr_0.8fr]">
        <div className="rounded-3xl border border-medium-grey/40 bg-white dark:bg-[#16171F] p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-bold text-black dark:text-white">Scheduling Calendar</h2>
              <p className="text-sm text-dark-grey">Manage event slots, sessions, and team availability in one live calendar.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {['Month', 'Week', 'Day'].map((m) => (
                <button key={m} type="button" onClick={() => setViewMode(m)} className={`rounded-full px-4 py-2 text-xs font-bold transition ${viewMode === m ? 'bg-tranquil-velvet text-white' : 'bg-white border border-medium-grey/40 text-dark-grey hover:bg-medium-grey/10'}`}>
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-[32px] border border-medium-grey/40 bg-[#F7F8FC] p-5 dark:bg-[#11131A]">
            <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => handleNavigate('prev')} className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-medium-grey/40 bg-white text-dark-grey hover:bg-medium-grey/10 transition">‹</button>
                <div className="space-y-1 text-sm">
                  <p className="font-semibold text-dark-grey">{monthLabel}</p>
                  <p className="text-xs text-dark-grey">{viewMode} view</p>
                </div>
                <button type="button" onClick={() => handleNavigate('next')} className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-medium-grey/40 bg-white text-dark-grey hover:bg-medium-grey/10 transition">›</button>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-sm text-dark-grey">
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-dark-grey shadow-sm"><span className="h-2.5 w-2.5 rounded-full bg-[#DB8B15]"/>Maintenance</div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-dark-grey shadow-sm"><span className="h-2.5 w-2.5 rounded-full bg-[#6C1D5F]"/>Training</div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-dark-grey shadow-sm"><span className="h-2.5 w-2.5 rounded-full bg-[#0CA678]"/>Governance</div>
              </div>
            </div>

            {viewMode === 'Month' ? (
              <div className="overflow-hidden rounded-[28px] border border-medium-grey/30 bg-white shadow-sm">
                <div className="grid grid-cols-7 gap-px bg-[#ECEFF5] px-4 py-3 text-[11px] uppercase tracking-[0.24em] text-dark-grey">
                  {weekDays.map((d) => (<div key={d} className="text-center font-semibold">{d}</div>))}
                </div>
                <div className="grid grid-cols-7 gap-px bg-[#ECEFF5] p-4 text-sm text-dark-grey">
                  {monthMatrix.map((week, wi) => (
                    <React.Fragment key={wi}>
                      {week.map((cell) => {
                        const events = eventsByDay[String(cell.dayNumber).padStart(2, '0')] || [];
                        return (
                          <div key={cell.key} className={`min-h-[110px] overflow-hidden rounded-3xl border border-transparent bg-white p-3 ${cell.inMonth ? '' : 'bg-[#F7F8FC] text-dark-grey/50'}`}>
                            <div className="flex items-start justify-between gap-2"><span className={`text-xs font-semibold ${cell.inMonth ? 'text-dark-grey' : 'text-dark-grey/40'}`}>{cell.dayNumber}</span></div>
                            <div className="mt-3 space-y-2">
                              {cell.inMonth && events.slice(0, 2).map((ev) => (<div key={ev.id} className={`rounded-2xl px-2 py-1 text-[11px] font-semibold ${ev.color}`}>{ev.title}</div>))}
                            </div>
                          </div>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-3xl border border-medium-grey/40 bg-white p-6 text-dark-grey">
                <p className="mb-4 text-sm font-semibold">{viewMode} schedule</p>
                {schedules.slice(0, viewMode === 'Week' ? 4 : 2).map((it) => (
                  <div key={it.id} className="mb-3 rounded-3xl bg-[#F7F8FC] p-4 last:mb-0">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-black dark:text-white">{it.title}</p>
                        <p className="text-xs text-dark-grey">{it.displayDate} · {it.time}</p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-[10px] font-bold ${it.status === 'In Progress' ? 'bg-emerald/10 text-emerald' : it.status === 'Postponed' ? 'bg-[#F6E5F5] text-[#84117C]' : 'bg-[#FFF4E5] text-cta-orange'}`}>{it.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-medium-grey/40 bg-white dark:bg-[#16171F] p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3 mb-5">
              <div>
                <h2 className="text-lg font-bold text-black dark:text-white">Upcoming Events</h2>
                <p className="text-sm text-dark-grey">See the next important sessions and deadlines.</p>
              </div>
              <div className="h-11 w-11 rounded-3xl bg-tranquil-velvet/10 text-tranquil-velvet grid place-items-center"><Calendar className="h-5 w-5"/></div>
            </div>

            <div className="space-y-4">
              {schedules.slice(0, 3).map((item) => (
                <div key={item.id} className="rounded-3xl border border-medium-grey/40 bg-[#F7F8FC] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-black dark:text-white">{item.title}</p>
                      <p className="text-xs text-dark-grey">{item.displayDate}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-[10px] font-bold ${item.status === 'In Progress' ? 'bg-emerald/10 text-emerald' : item.status === 'Postponed' ? 'bg-[#F6E5F5] text-[#84117C]' : 'bg-[#FFF4E5] text-cta-orange'}`}>{item.status}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3 text-xs text-dark-grey"><span>{item.time}</span><span>{item.learners} learners</span></div>
                </div>
              ))}
            </div>
          </div>

          <BorderGlow edgeSensitivity={22} glowColor="108 29 95" backgroundColor={theme === 'dark' ? '#16171F' : '#FFFFFF'} borderRadius={24} glowRadius={40} glowIntensity={1.3} className="overflow-hidden">
            <div className="rounded-3xl bg-gradient-to-br from-tranquil-velvet to-bright-velvet p-6 text-white">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/75">{currentDate.toLocaleString('default', { month: 'long' })} Capacity</p>
                  <p className="mt-2 text-3xl font-extrabold">84%</p>
                </div>
                <div className="rounded-3xl bg-white/10 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white">+12% vs last month</div>
              </div>
              <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/20"><div className="h-full w-[84%] rounded-full bg-white shadow-sm"/></div>
              <p className="mt-4 text-sm text-white/80">Resource usage and event capacity look healthy for the upcoming period.</p>
            </div>
          </BorderGlow>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <div className="rounded-3xl border border-medium-grey/40 bg-white dark:bg-[#16171F] p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-bold text-black dark:text-white">Resource Allocation</h2>
              <p className="text-sm text-dark-grey">Real-time tracking of engineering teams and physical assets assigned to upcoming events.</p>
            </div>
            <ProfileActionButton tone="secondary" className="px-4 py-2 text-xs" onClick={() => window.alert('Opening resource manager.')}>Manage Resources</ProfileActionButton>
          </div>

          <div className="space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3"><span className="text-sm font-semibold text-black dark:text-white">Team Alpha (DevOps)</span><span className="text-sm font-bold text-dark-grey">90% Allocated</span></div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-blueish-grey/70 border border-medium-grey/40"><div className="h-full w-[90%] rounded-full bg-emerald"/></div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3"><span className="text-sm font-semibold text-black dark:text-white">Main Lab (Facility)</span><span className="text-sm font-bold text-dark-grey">45% Allocated</span></div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-blueish-grey/70 border border-medium-grey/40"><div className="h-full w-[45%] rounded-full bg-tranquil-velvet"/></div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-medium-grey/40 bg-white dark:bg-[#16171F] p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-5"><div><h2 className="text-lg font-bold text-black dark:text-white">Automated Directives</h2><p className="text-sm text-dark-grey">Scheduled tasks helping keep your calendar running smoothly.</p></div></div>
          <div className="space-y-4">
            <div className="rounded-3xl border border-medium-grey/40 bg-[#F7F8FC] p-4"><div className="flex items-center justify-between gap-3"><p className="font-semibold text-black dark:text-white">Auto-Schedule Audit</p><span className="inline-flex rounded-full bg-tranquil-velvet/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-tranquil-velvet">Auto</span></div><p className="mt-2 text-sm text-dark-grey">Scheduled for every 2nd Friday. Next run in 2 days.</p></div>
            <div className="rounded-3xl border border-medium-grey/40 bg-[#F7F8FC] p-4"><div className="flex items-center justify-between gap-3"><p className="font-semibold text-black dark:text-white">Weekly Health Check</p><span className="inline-flex rounded-full bg-tranquil-velvet/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-tranquil-velvet">Auto</span></div><p className="mt-2 text-sm text-dark-grey">Continuous background execution enabled.</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}
