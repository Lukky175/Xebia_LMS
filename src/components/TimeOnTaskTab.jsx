import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  Cell 
} from 'recharts';
import { 
  Clock, 
  TrendingUp, 
  Calendar, 
  AlertCircle 
} from 'lucide-react';

const MODULE_TIME_DATA = [
  { moduleName: 'Mod 1: Intro', avgMinutes: 48, fill: '#01AC9F' },
  { moduleName: 'Mod 2: Layouts', avgMinutes: 112, fill: '#6C1D5F' },
  { moduleName: 'Mod 3: Suspense', avgMinutes: 185, fill: '#FF6200' },
  { moduleName: 'Mod 4: Actions', avgMinutes: 140, fill: '#01AC9F' },
  { moduleName: 'Mod 5: Build Opt', avgMinutes: 95, fill: '#6C1D5F' }
];

const COHORT_IDLE_DATA = [
  { cohort: 'Cohort A', idlePercent: 24 },
  { cohort: 'Cohort B', idlePercent: 48 },
  { cohort: 'Cohort C', idlePercent: 12 },
  { cohort: 'Cohort D', idlePercent: 35 }
];

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const HOURS = ['8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm', '10pm'];

// Mock heatmap grid activity levels (0 to 3)
const HEATMAP_DATA = [
  [1, 2, 3, 2, 1, 3, 2, 1], // Mon
  [0, 1, 2, 3, 2, 2, 1, 0], // Tue
  [1, 2, 2, 3, 3, 1, 2, 2], // Wed
  [2, 3, 1, 2, 1, 2, 3, 1], // Thu
  [1, 2, 3, 3, 2, 3, 2, 1], // Fri
  [0, 0, 1, 1, 2, 2, 1, 1], // Sat
  [0, 1, 1, 2, 1, 1, 2, 0]  // Sun
];

export default function TimeOnTaskTab() {
  const [activeCell, setActiveCell] = useState(null);

  const getHeatmapColor = (level) => {
    switch(level) {
      case 3: return 'bg-[#01AC9F]'; // Heavy (Emerald)
      case 2: return 'bg-[#01AC9F]/60'; // Medium
      case 1: return 'bg-[#01AC9F]/30'; // Light
      default: return 'bg-[#282A3A]/40'; // None
    }
  };

  return (
    <div className="bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-xl p-5 shadow-xl text-black dark:text-[#F3F4F6] space-y-6">
      
      {/* Tab Header */}
      <div className="flex items-center justify-between border-b border-medium-grey dark:border-[#282A3A] pb-4">
        <div className="flex items-center gap-2">
          <Clock className="text-[#FF6200]" size={20} />
          <div>
            <h3 className="text-sm font-bold text-black dark:text-black dark:text-white">Time-on-Task & Learner Idle Analysis</h3>
            <p className="text-[10px] text-dark-grey dark:text-[#9CA3AF]">Analyze active engagement curves and platform fatigue</p>
          </div>
        </div>
        <span className="text-[9px] font-mono text-dark-grey dark:text-gray-500 uppercase tracking-widest">
          Engagement Metrics
        </span>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Module Avg Duration Bar Chart */}
        <div className="bg-[#F7F8FC] dark:bg-[#0F1015] border border-medium-grey dark:border-[#282A3A] p-4 rounded-xl space-y-3">
          <span className="text-xs font-bold text-black dark:text-black dark:text-white block">Average Minutes per Module</span>
          <div className="h-60 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MODULE_TIME_DATA} margin={{ top: 10, right: 5, left: -25, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#282A3A" vertical={false} />
                <XAxis dataKey="moduleName" stroke="#9CA3AF" tickLine={false} />
                <YAxis stroke="#9CA3AF" tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#16171F', borderColor: '#282A3A', color: '#F3F4F6' }}
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                />
                <Bar dataKey="avgMinutes" radius={[4, 4, 0, 0]}>
                  {MODULE_TIME_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Idle Time % per Cohort */}
        <div className="bg-[#F7F8FC] dark:bg-[#0F1015] border border-medium-grey dark:border-[#282A3A] p-4 rounded-xl space-y-3">
          <span className="text-xs font-bold text-black dark:text-black dark:text-white block">Idle Inactive Time % per Cohort</span>
          <div className="h-60 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={COHORT_IDLE_DATA} layout="vertical" margin={{ top: 10, right: 10, left: -5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#282A3A" horizontal={false} />
                <XAxis type="number" stroke="#9CA3AF" domain={[0, 100]} unit="%" tickLine={false} />
                <YAxis type="category" dataKey="cohort" stroke="#9CA3AF" tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#16171F', borderColor: '#282A3A', color: '#F3F4F6' }}
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                />
                <Bar dataKey="idlePercent" fill="#FF6200" radius={[0, 4, 4, 0]} barSize={16}>
                  {COHORT_IDLE_DATA.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.idlePercent > 30 ? '#FF6200' : '#01AC9F'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* CSS Grid Hour x Day Activity Heatmap */}
      <div className="bg-[#F7F8FC] dark:bg-[#0F1015] border border-medium-grey dark:border-[#282A3A] p-4 rounded-xl space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-black dark:text-black dark:text-white block">Hourly Activity Intensity (Hour × Day)</span>
          <div className="flex gap-2 text-[9px] text-dark-grey dark:text-[#9CA3AF]">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-[#282A3A]/40 rounded"></span> Idle</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-[#01AC9F]/30 rounded"></span> Low</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-[#01AC9F]/60 rounded"></span> Med</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-[#01AC9F] rounded"></span> Peak</span>
          </div>
        </div>

        {/* Heatmap Grid Wrapper */}
        <div className="space-y-1.5 overflow-x-auto pb-2">
          {/* Hour labels header row */}
          <div className="grid grid-cols-9 gap-1.5 min-w-[500px]">
            <div className="w-14"></div> {/* empty spacing for Day labels column */}
            {HOURS.map((hour, idx) => (
              <div key={idx} className="text-center text-[10px] text-dark-grey dark:text-gray-500 font-mono">
                {hour}
              </div>
            ))}
          </div>

          {/* Grid rows by day */}
          {DAYS.map((day, dayIdx) => (
            <div key={dayIdx} className="grid grid-cols-9 gap-1.5 min-w-[500px] items-center">
              {/* Day label */}
              <div className="w-14 text-xs font-bold text-dark-grey dark:text-[#9CA3AF] text-right pr-2">
                {day}
              </div>
              {/* Heatmap block cells */}
              {HOURS.map((hour, hourIdx) => {
                const level = HEATMAP_DATA[dayIdx][hourIdx];
                const isActive = activeCell?.day === day && activeCell?.hour === hour;

                return (
                  <div
                    key={hourIdx}
                    onMouseEnter={() => setActiveCell({ day, hour, level })}
                    onMouseLeave={() => setActiveCell(null)}
                    className={`h-8 rounded cursor-pointer transition-all ${getHeatmapColor(level)} ${
                      isActive ? 'ring-2 ring-white scale-105' : 'hover:scale-102'
                    }`}
                  />
                );
              })}
            </div>
          ))}
        </div>

        {/* Interactive Cell status readouts */}
        <div className="min-h-[36px] bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] p-2 rounded-lg text-center text-xs">
          {activeCell ? (
            <span className="text-black dark:text-black dark:text-white font-medium">
              Activity on <strong className="text-[#01AC9F]">{activeCell.day}</strong> at <strong className="text-[#01AC9F]">{activeCell.hour}</strong>: 
              <span className="ml-1.5 text-gray-300">
                {activeCell.level === 3 ? '🔥 Peak study load (80+ active learners)' :
                 activeCell.level === 2 ? '⚡ Moderate interaction (30-80 learners)' :
                 activeCell.level === 1 ? '✨ Light activity (10-30 learners)' :
                 '💤 No active learners'}
              </span>
            </span>
          ) : (
            <span className="text-dark-grey dark:text-gray-500 text-[11px] flex items-center justify-center gap-1">
              <AlertCircle size={12} /> Hover heatmap cells to inspect hourly enrollment interactions
            </span>
          )}
        </div>

      </div>

    </div>
  );
}
