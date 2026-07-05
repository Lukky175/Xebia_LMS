import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Users, BookOpen, Clock, Award, Shield, 
  TrendingUp, ArrowUpRight, ArrowDownRight, 
  CheckCircle, AlertTriangle, Activity,
  Server, HardDrive, Cpu, Terminal, Play, FileText
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, LineChart, Line, BarChart, Bar
} from 'recharts';
import BorderGlow from '@/components/ui/BorderGlow.jsx';
import CountUp from '@/components/ui/CountUp.jsx';
import { useTheme } from '@/context/ThemeContext.jsx';
import { useAuth } from '@/context/AuthContext.jsx';


// Dummy data for charts
const sparklineData = [
  { value: 30 }, { value: 45 }, { value: 35 }, { value: 60 }, { value: 40 }, { value: 75 }, { value: 90 }
];

const analyticsDaily = [
  { name: 'Mon', active: 120, enrollments: 40 },
  { name: 'Tue', active: 150, enrollments: 65 },
  { name: 'Wed', active: 180, enrollments: 55 },
  { name: 'Thu', active: 220, enrollments: 80 },
  { name: 'Fri', active: 210, enrollments: 95 },
  { name: 'Sat', active: 160, enrollments: 30 },
  { name: 'Sun', active: 190, enrollments: 45 },
];

const analyticsWeekly = [
  { name: 'Wk 1', active: 850, enrollments: 320 },
  { name: 'Wk 2', active: 940, enrollments: 450 },
  { name: 'Wk 3', active: 1100, enrollments: 410 },
  { name: 'Wk 4', active: 1250, enrollments: 580 },
];

const analyticsMonthly = [
  { name: 'Jan', active: 3200, enrollments: 1200 },
  { name: 'Feb', active: 3800, enrollments: 1550 },
  { name: 'Mar', active: 4500, enrollments: 1800 },
  { name: 'Apr', active: 4200, enrollments: 1600 },
  { name: 'May', active: 5100, enrollments: 2100 },
  { name: 'Jun', active: 5800, enrollments: 2450 },
];

const recentActivity = [
  { id: 1, type: 'register', user: 'Marcus Long', detail: 'registered as a new student', time: '10 mins ago' },
  { id: 2, type: 'complete', user: 'Karla Abbott', detail: 'completed "Mastering Node.js Microservices"', time: '45 mins ago' },
  { id: 3, type: 'certificate', user: 'Toby Reynolds', detail: 'issued React Developer certification badge', time: '2 hours ago' },
  { id: 4, type: 'submit', user: 'Sarah Jenkins', detail: 'submitted Cloud DevOps final assessment', time: '4 hours ago' }
];

const cardHoverVariant = {
  hover: {
    y: -2,
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  }
};

export default function DashboardHome({ tutors = [] }) {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { currentUser } = useAuth();
  const [chartRange, setChartRange] = useState('daily'); // daily, weekly, monthly

  if (currentUser?.role === 'trainer') {
    return <TrainerDashboard theme={theme} />;
  }

  if (currentUser?.role === 'student') {
    return <StudentDashboard theme={theme} />;
  }

  const getAnalyticsData = () => {
    switch (chartRange) {
      case 'weekly': return analyticsWeekly;
      case 'monthly': return analyticsMonthly;
      default: return analyticsDaily;
    }
  };

  return (
    <div className="space-y-6">
      {currentUser?.role === 'superadmin' && (
        <SuperadminHeader theme={theme} />
      )}
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 md:auto-rows-[170px] gap-6">
        
        {/* BENTO CARD 1: Hero Platform Overview (col-span-6, row-span-2) */}
        <div className="md:col-span-6 md:row-span-2">
          <BorderGlow
            edgeSensitivity={15}
            glowColor="304 76 30"
            backgroundColor={theme === 'dark' ? '#16171F' : '#FFFFFF'}
            borderRadius={16}
            glowRadius={40}
            glowIntensity={1.5}
            className="h-full"
          >
            <motion.div
              whileHover="hover"
              variants={cardHoverVariant}
              className="p-6 flex flex-col justify-between h-full bg-gradient-to-tr from-tranquil-velvet-dark via-tranquil-velvet to-bright-velvet rounded-2xl text-white relative overflow-hidden"
            >
              <div className="absolute right-0 bottom-0 top-0 opacity-10 w-1/2 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-white via-white/5 to-transparent pointer-events-none"></div>
              
              <div className="space-y-1 relative z-10">
                <span className="text-cta-orange text-xs font-bold uppercase tracking-widest">Enterprise Platform</span>
                <h2 className="text-2xl font-extrabold text-white">LMS Platform Overview</h2>
                <p className="text-white/80 text-[11px] leading-relaxed max-w-sm">
                  Dynamic statistics capturing total student registries, active developer sandbox paths, and certification completion velocities.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 relative z-10">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-white/60 font-semibold uppercase tracking-wider">Total Students</span>
                  <p className="text-2xl font-extrabold text-white"><CountUp from={0} to={12840} duration={1.5} separator="," /></p>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-white/60 font-semibold uppercase tracking-wider">Active Users</span>
                  <p className="text-2xl font-extrabold text-white"><CountUp from={0} to={854} duration={1.2} /></p>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-white/60 font-semibold uppercase tracking-wider">Enrolled Courses</span>
                  <p className="text-2xl font-extrabold text-white"><CountUp from={0} to={45} duration={1.0} /></p>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-white/60 font-semibold uppercase tracking-wider">Completion Rate</span>
                  <p className="text-2xl font-extrabold text-white"><CountUp from={0} to={92} duration={1.0} />%</p>
                </div>
              </div>
            </motion.div>
          </BorderGlow>
        </div>

        {/* BENTO CARD 2: New Enrollments (col-span-3) */}
        <div className="md:col-span-3">
          <BorderGlow
            edgeSensitivity={20}
            glowColor="304 76 30"
            backgroundColor={theme === 'dark' ? '#16171F' : '#FFFFFF'}
            borderRadius={16}
            glowRadius={30}
            glowIntensity={1.2}
            className="h-full"
          >
            <motion.div
              whileHover="hover"
              variants={cardHoverVariant}
              className="p-5 flex flex-col justify-between h-full bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-dark-grey uppercase tracking-widest">New Enrollments</span>
                  <h3 className="text-xl font-extrabold text-black dark:text-white mt-0.5">
                    <CountUp from={0} to={184} duration={1.5} />
                  </h3>
                </div>
                <div className="p-2 rounded-xl bg-tranquil-velvet/10 dark:bg-tranquil-velvet-dark/30 text-tranquil-velvet dark:text-amber-400">
                  <Users className="h-4 w-4" />
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald font-bold">
                <ArrowUpRight className="h-4 w-4 shrink-0" />
                <span>+12.5% Growth</span>
                <span className="text-dark-grey font-medium">this week</span>
              </div>
            </motion.div>
          </BorderGlow>
        </div>

        {/* BENTO CARD 3: Revenue Snapshot (col-span-3) */}
        <div className="md:col-span-3">
          <BorderGlow
            edgeSensitivity={20}
            glowColor="176 99 34"
            backgroundColor={theme === 'dark' ? '#16171F' : '#FFFFFF'}
            borderRadius={16}
            glowRadius={30}
            glowIntensity={1.2}
            className="h-full"
          >
            <motion.div
              whileHover="hover"
              variants={cardHoverVariant}
              className="p-5 flex flex-col justify-between h-full bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-dark-grey uppercase tracking-widest">Monthly Revenue</span>
                  <h3 className="text-xl font-extrabold text-black dark:text-white mt-0.5">
                    $<CountUp from={0} to={45200} duration={1.8} separator="," />
                  </h3>
                </div>
                <div className="p-2 rounded-xl bg-emerald/10 text-emerald">
                  <TrendingUp className="h-4 w-4" />
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald font-bold">
                <ArrowUpRight className="h-4 w-4 shrink-0" />
                <span>+8.4% MRR Growth</span>
                <span className="text-dark-grey font-medium">this month</span>
              </div>
            </motion.div>
          </BorderGlow>
        </div>

        {/* BENTO CARD 4: Certificates Issued (col-span-3) */}
        <div className="md:col-span-3">
          <BorderGlow
            edgeSensitivity={20}
            glowColor="304 76 30"
            backgroundColor={theme === 'dark' ? '#16171F' : '#FFFFFF'}
            borderRadius={16}
            glowRadius={30}
            glowIntensity={1.2}
            className="h-full"
          >
            <motion.div
              whileHover="hover"
              variants={cardHoverVariant}
              className="p-5 flex flex-col justify-between h-full bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-dark-grey uppercase tracking-widest">Certificates Issued</span>
                  <h3 className="text-xl font-extrabold text-black dark:text-white mt-0.5">
                    <CountUp from={0} to={1280} duration={1.2} separator="," />
                  </h3>
                </div>
                <div className="p-2 rounded-xl bg-bright-velvet/10 text-bright-velvet">
                  <Award className="h-4 w-4" />
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald font-bold">
                <ArrowUpRight className="h-4 w-4 shrink-0" />
                <span>+15 New Today</span>
                <span className="text-dark-grey font-medium">graduates</span>
              </div>
            </motion.div>
          </BorderGlow>
        </div>

        {/* BENTO CARD 6: At-Risk Learners (col-span-3) */}
        <div className="md:col-span-3">
          <BorderGlow
            edgeSensitivity={20}
            glowColor="304 76 30"
            backgroundColor={theme === 'dark' ? '#16171F' : '#FFFFFF'}
            borderRadius={16}
            glowRadius={30}
            glowIntensity={1.2}
            className="h-full"
          >
            <motion.div
              whileHover="hover"
              variants={cardHoverVariant}
              className="p-5 flex flex-col justify-between h-full bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-dark-grey uppercase tracking-widest">At-Risk Learners</span>
                  <h3 className="text-xl font-extrabold text-red-500 mt-0.5">
                    <CountUp from={0} to={14} duration={0.8} />
                  </h3>
                </div>
                <div className="p-2 rounded-xl bg-red-500/10 text-red-500">
                  <AlertTriangle className="h-4 w-4" />
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-red-500 font-bold">
                <ArrowDownRight className="h-4 w-4 shrink-0" />
                <span>-3 Learners Decreased</span>
                <span className="text-dark-grey font-medium">resolved</span>
              </div>
            </motion.div>
          </BorderGlow>
        </div>

        {/* BENTO CARD 5: Learning Analytics Chart (col-span-6, row-span-2) */}
        <div className="md:col-span-6 md:row-span-2">
          <BorderGlow
            edgeSensitivity={15}
            glowColor="304 76 30"
            backgroundColor={theme === 'dark' ? '#16171F' : '#FFFFFF'}
            borderRadius={16}
            glowRadius={40}
            glowIntensity={1.5}
            className="h-full"
          >
            <motion.div
              whileHover="hover"
              variants={cardHoverVariant}
              className="p-6 flex flex-col justify-between h-full bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-extrabold text-black dark:text-white">Active Student Trends</h3>
                  <p className="text-[10px] text-dark-grey">Activity rates versus course registrations</p>
                </div>
                
                {/* Tab switcher */}
                <div className="bg-blueish-grey dark:bg-bg-page p-1 rounded-lg border border-medium-grey dark:border-border-card flex gap-1">
                  {['daily', 'weekly', 'monthly'].map(range => (
                    <button
                      key={range}
                      onClick={() => setChartRange(range)}
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-md transition cursor-pointer capitalize ${chartRange === range ? 'bg-tranquil-velvet text-white' : 'text-dark-grey hover:text-black dark:hover:text-white'}`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chart */}
              <div className="flex-1 min-h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={getAnalyticsData()} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="activeGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6C1D5F" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#6C1D5F" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="enrollGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF6200" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#FF6200" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#282A3A' : '#E6E7EF'} />
                    <XAxis dataKey="name" stroke={theme === 'dark' ? '#9CA3AF' : '#5A5A5A'} fontSize={9} tickLine={false} />
                    <YAxis stroke={theme === 'dark' ? '#9CA3AF' : '#5A5A5A'} fontSize={9} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#16171F' : '#FFFFFF', borderColor: theme === 'dark' ? '#282A3A' : '#DADCEA' }} />
                    <Area type="monotone" dataKey="active" stroke="#6C1D5F" strokeWidth={2} fillOpacity={1} fill="url(#activeGrad)" name="Active Developers" />
                    <Area type="monotone" dataKey="enrollments" stroke="#FF6200" strokeWidth={2} fillOpacity={1} fill="url(#enrollGrad)" name="Enrollments" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </BorderGlow>
        </div>

        {/* BENTO CARD 7: Course Approvals (col-span-6) */}
        <div className="md:col-span-6">
          <BorderGlow
            edgeSensitivity={15}
            glowColor="176 99 34"
            backgroundColor={theme === 'dark' ? '#16171F' : '#FFFFFF'}
            borderRadius={16}
            glowRadius={30}
            glowIntensity={1.2}
            className="h-full"
          >
            <motion.div
              whileHover="hover"
              variants={cardHoverVariant}
              className="p-5 flex flex-col justify-between h-full bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl"
            >
              <div className="space-y-0.5">
                <span className="text-[9px] font-bold text-dark-grey uppercase tracking-widest">Syllabus Registry</span>
                <h3 className="text-sm font-extrabold text-black dark:text-white">Course Syllabus Approvals</h3>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center pt-2">
                <div className="bg-amber-500/10 border border-amber-500/20 py-2.5 rounded-xl">
                  <p className="text-lg font-extrabold text-amber-500">2</p>
                  <p className="text-[9px] text-dark-grey font-bold uppercase mt-0.5">Pending</p>
                </div>
                <div className="bg-blueish-grey dark:bg-bg-page border border-medium-grey/40 py-2.5 rounded-xl">
                  <p className="text-lg font-extrabold text-dark-grey">5</p>
                  <p className="text-[9px] text-dark-grey font-bold uppercase mt-0.5">Draft</p>
                </div>
                <div className="bg-emerald/10 border border-emerald/20 py-2.5 rounded-xl">
                  <p className="text-lg font-extrabold text-emerald">38</p>
                  <p className="text-[9px] text-dark-grey font-bold uppercase mt-0.5">Published</p>
                </div>
              </div>
            </motion.div>
          </BorderGlow>
        </div>

        {/* BENTO CARD 11: Support Overview (col-span-6) */}
        <div className="md:col-span-6">
          <BorderGlow
            edgeSensitivity={15}
            glowColor="304 76 30"
            backgroundColor={theme === 'dark' ? '#16171F' : '#FFFFFF'}
            borderRadius={16}
            glowRadius={30}
            glowIntensity={1.2}
            className="h-full"
          >
            <motion.div
              whileHover="hover"
              variants={cardHoverVariant}
              className="p-5 flex flex-col justify-between h-full bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl"
            >
              <div className="space-y-0.5">
                <span className="text-[9px] font-bold text-dark-grey uppercase tracking-widest">Helpdesk Overview</span>
                <h3 className="text-sm font-extrabold text-black dark:text-white">Active Support Tickets</h3>
              </div>
              <div className="flex gap-4 pt-2">
                <div className="flex-1 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-lg font-extrabold text-red-500">3</p>
                    <p className="text-[9px] text-dark-grey font-bold uppercase tracking-wider">Open Tickets</p>
                  </div>
                  <AlertTriangle className="h-5 w-5 text-red-500 opacity-60" />
                </div>
                <div className="flex-1 p-3 bg-emerald/10 border border-emerald/20 rounded-xl flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-lg font-extrabold text-emerald">14</p>
                    <p className="text-[9px] text-dark-grey font-bold uppercase tracking-wider">Resolved Today</p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-emerald opacity-60" />
                </div>
              </div>
            </motion.div>
          </BorderGlow>
        </div>

        {/* BENTO CARD 8: Top Courses (col-span-4) */}
        <div className="md:col-span-4">
          <BorderGlow
            edgeSensitivity={15}
            glowColor="304 76 30"
            backgroundColor={theme === 'dark' ? '#16171F' : '#FFFFFF'}
            borderRadius={16}
            glowRadius={30}
            glowIntensity={1.2}
            className="h-full"
          >
            <motion.div
              whileHover="hover"
              variants={cardHoverVariant}
              className="p-5 flex flex-col justify-between h-full bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl"
            >
              <div className="space-y-0.5 mb-2">
                <span className="text-[9px] font-bold text-dark-grey uppercase tracking-widest">Classroom Metrics</span>
                <h3 className="text-sm font-extrabold text-black dark:text-white">Top Performing Course</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-black dark:text-white">
                  <span className="line-clamp-1">Enterprise React Architectures</span>
                  <span className="text-tranquil-velvet dark:text-amber-400">84%</span>
                </div>
                <div className="h-2 w-full bg-blueish-grey dark:bg-bg-page rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-tranquil-velvet to-bright-velvet rounded-full" style={{ width: '84%' }}></div>
                </div>
                <p className="text-[9px] text-dark-grey leading-none font-semibold">Enrolled: 3,450 students</p>
              </div>
            </motion.div>
          </BorderGlow>
        </div>

        {/* BENTO CARD 9: Instructor Performance (col-span-4) */}
        <div className="md:col-span-4">
          <BorderGlow
            edgeSensitivity={15}
            glowColor="176 99 34"
            backgroundColor={theme === 'dark' ? '#16171F' : '#FFFFFF'}
            borderRadius={16}
            glowRadius={30}
            glowIntensity={1.2}
            className="h-full"
          >
            <motion.div
              whileHover="hover"
              variants={cardHoverVariant}
              onClick={() => navigate('/dashboard/trainer')}
              className="p-5 flex flex-col justify-between h-full bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl cursor-pointer"
            >
              <div className="space-y-0.5 mb-2">
                <span className="text-[9px] font-bold text-dark-grey uppercase tracking-widest">Faculty Audit</span>
                <h3 className="text-sm font-extrabold text-black dark:text-white">Faculty & Online Tutors</h3>
              </div>
              <div className="mt-2 text-left">
                <p className="text-2xl font-extrabold text-black dark:text-white tracking-tight">
                  {tutors.length} {tutors.length === 1 ? 'trainer' : 'trainers'}
                </p>
                <p className="text-[10px] text-dark-grey font-medium mt-1">Active on the platform</p>
              </div>
            </motion.div>
          </BorderGlow>
        </div>

        {/* BENTO CARD 10: Activity Feed (col-span-4, row-span-2) */}
        <div className="md:col-span-4 md:row-span-2">
          <BorderGlow
            edgeSensitivity={15}
            glowColor="304 76 30"
            backgroundColor={theme === 'dark' ? '#16171F' : '#FFFFFF'}
            borderRadius={16}
            glowRadius={40}
            glowIntensity={1.5}
            className="h-full"
          >
            <motion.div
              whileHover="hover"
              variants={cardHoverVariant}
              className="p-6 flex flex-col justify-between h-full bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl"
            >
              <div className="space-y-0.5 mb-4">
                <span className="text-[9px] font-bold text-dark-grey uppercase tracking-widest">Activity Audit</span>
                <h3 className="text-sm font-extrabold text-black dark:text-white">Live Activity Feed</h3>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto sleek-scrollbar pr-2">
                {recentActivity.map(act => (
                  <div key={act.id} className="flex gap-3 text-xs leading-relaxed text-dark-grey">
                    <div className="w-1.5 h-1.5 rounded-full bg-cta-orange mt-1.5 shrink-0"></div>
                    <div>
                      <p className="text-dark-grey"><span className="font-bold text-black dark:text-white">{act.user}</span> {act.detail}</p>
                      <span className="text-[9px] text-dark-grey/60 font-semibold">{act.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </BorderGlow>
        </div>

        {/* BENTO CARD 12: System Health (col-span-8) */}
        <div className="md:col-span-8">
          <BorderGlow
            edgeSensitivity={15}
            glowColor="176 99 34"
            backgroundColor={theme === 'dark' ? '#16171F' : '#FFFFFF'}
            borderRadius={16}
            glowRadius={30}
            glowIntensity={1.2}
            className="h-full"
          >
            <motion.div
              whileHover="hover"
              variants={cardHoverVariant}
              className="p-5 flex flex-col justify-between h-full bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="space-y-0.5">
                  <span className="text-[9px] font-bold text-dark-grey uppercase tracking-widest">Server Metrics</span>
                  <h3 className="text-sm font-extrabold text-black dark:text-white">LMS Infrastructure Health</h3>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald/10 border border-emerald/20 text-emerald text-xs px-2.5 py-0.5 rounded-full font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse"></span>
                  <span>99.98% Uptime</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="flex items-center gap-2 text-left bg-blueish-grey dark:bg-bg-page p-2 rounded-xl border border-medium-grey/40">
                  <Server className="h-5 w-5 text-tranquil-velvet" />
                  <div>
                    <p className="text-xs font-extrabold text-black dark:text-white">2.4ms</p>
                    <p className="text-[9px] text-dark-grey font-bold uppercase leading-none">API Latency</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-left bg-blueish-grey dark:bg-bg-page p-2 rounded-xl border border-medium-grey/40">
                  <Cpu className="h-5 w-5 text-emerald" />
                  <div>
                    <p className="text-xs font-extrabold text-black dark:text-white">34.2%</p>
                    <p className="text-[9px] text-dark-grey font-bold uppercase leading-none">CPU Workload</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-left bg-blueish-grey dark:bg-bg-page p-2 rounded-xl border border-medium-grey/40">
                  <HardDrive className="h-5 w-5 text-cta-orange" />
                  <div>
                    <p className="text-xs font-extrabold text-black dark:text-white">45.8 GB</p>
                    <p className="text-[9px] text-dark-grey font-bold uppercase leading-none">Storage Used</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-left bg-blueish-grey dark:bg-bg-page p-2 rounded-xl border border-medium-grey/40">
                  <Terminal className="h-5 w-5 text-bright-velvet" />
                  <div>
                    <p className="text-xs font-extrabold text-black dark:text-white">Normal</p>
                    <p className="text-[9px] text-dark-grey font-bold uppercase leading-none">Sandbox Engine</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </BorderGlow>
        </div>

      </div>
      <div className="h-6"></div> {/* Bottom buffer space to prevent glow clip/overflow */}
    </div>
  );
}

function TrainerDashboard({ theme }) {
  const trainerDailyData = [
    { name: 'Mon', hours: 4 },
    { name: 'Tue', hours: 6 },
    { name: 'Wed', hours: 5 },
    { name: 'Thu', hours: 8 },
    { name: 'Fri', hours: 7 },
    { name: 'Sat', hours: 2 },
    { name: 'Sun', hours: 0 }
  ];

  return (
    <div className="space-y-6">
      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 md:auto-rows-[170px] gap-6">
        
        {/* Hero Card */}
        <div className="md:col-span-8 md:row-span-2">
          <BorderGlow
            edgeSensitivity={15}
            glowColor="304 76 30"
            backgroundColor={theme === 'dark' ? '#16171F' : '#FFFFFF'}
            borderRadius={16}
            glowRadius={40}
            glowIntensity={1.5}
            className="h-full"
          >
            <div className="p-6 flex flex-col justify-between h-full bg-gradient-to-tr from-tranquil-velvet-dark via-tranquil-velvet to-bright-velvet rounded-2xl text-white relative overflow-hidden">
              <div className="absolute right-0 bottom-0 top-0 opacity-10 w-1/2 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-white via-white/5 to-transparent pointer-events-none"></div>
              
              <div className="space-y-1 relative z-10">
                <span className="text-cta-orange text-xs font-bold uppercase tracking-widest">Trainer Console</span>
                <h2 className="text-2xl font-extrabold text-white mt-1">Welcome back, Sarah Jenkins!</h2>
                <p className="text-white/80 text-[11px] leading-relaxed max-w-md mt-2">
                  Monitor your active courses, check student query submissions, review average instruction feedback ratings, and schedule your next enterprise lecture sessions.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 mt-4 relative z-10">
                <div>
                  <span className="text-[10px] text-white/60 font-semibold uppercase tracking-wider block">Assigned Batches</span>
                  <span className="text-2xl font-bold text-white">4 Batches</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/60 font-semibold uppercase tracking-wider block">Total Learners</span>
                  <span className="text-2xl font-bold text-white">184 Students</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/60 font-semibold uppercase tracking-wider block">Feedback Rating</span>
                  <span className="text-2xl font-bold text-emerald">4.92 / 5</span>
                </div>
              </div>
            </div>
          </BorderGlow>
        </div>

        {/* Small stats card 1 */}
        <div className="md:col-span-4 md:row-span-1">
          <div className="bg-bg-card border border-border-card rounded-2xl p-5 flex items-center justify-between h-full hover:shadow-md transition duration-200">
            <div className="space-y-1">
              <span className="text-[9px] font-bold text-text-secondary uppercase tracking-wider">Weekly Teaching Hours</span>
              <h3 className="text-2xl font-extrabold text-text-primary">32 Hours</h3>
              <p className="text-[10px] text-emerald font-semibold flex items-center gap-0.5">
                <TrendingUp className="h-3 w-3" /> +12% vs last week
              </p>
            </div>
            <div className="p-3.5 bg-tranquil-velvet/10 text-tranquil-velvet rounded-xl">
              <Clock className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Small stats card 2 */}
        <div className="md:col-span-4 md:row-span-1">
          <div className="bg-bg-card border border-border-card rounded-2xl p-5 flex items-center justify-between h-full hover:shadow-md transition duration-200">
            <div className="space-y-1">
              <span className="text-[9px] font-bold text-text-secondary uppercase tracking-wider">Active Query Resolution</span>
              <h3 className="text-2xl font-extrabold text-text-primary">94%</h3>
              <p className="text-[10px] text-emerald font-semibold flex items-center gap-0.5">
                <CheckCircle className="h-3 w-3" /> 16 resolved today
              </p>
            </div>
            <div className="p-3.5 bg-emerald/10 text-emerald rounded-xl">
              <Users className="h-6 w-6" />
            </div>
          </div>
        </div>

      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Teaching Hours Graph */}
        <div className="lg:col-span-2 bg-bg-card border border-border-card rounded-2xl p-5 space-y-4 hover:shadow-md transition duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-text-primary">Teaching Hours History</h3>
              <p className="text-[10px] text-text-secondary">Summary of lecture hours distributed across the week</p>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trainerDailyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#27272A' : '#E4E4E7'} />
                <XAxis dataKey="name" stroke={theme === 'dark' ? '#71717A' : '#A1A1AA'} fontSize={10} tickLine={false} />
                <YAxis stroke={theme === 'dark' ? '#71717A' : '#A1A1AA'} fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#18181B' : '#FFFFFF', borderColor: theme === 'dark' ? '#27272A' : '#E4E4E7', fontSize: '11px', borderRadius: '8px' }} />
                <Bar dataKey="hours" fill="#84117C" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Assigned Courses */}
        <div className="bg-bg-card border border-border-card rounded-2xl p-5 space-y-4 hover:shadow-md transition duration-200">
          <div>
            <h3 className="text-sm font-bold text-text-primary">My Courses</h3>
            <p className="text-[10px] text-text-secondary">Enterprise courses currently assigned to you</p>
          </div>
          <div className="space-y-3.5">
            {[
              { id: 1, title: "Enterprise React with Tailwind CSS", students: 48, completions: "75%" },
              { id: 2, title: "UI/UX Design Systems at Scale", students: 56, completions: "62%" },
              { id: 3, title: "Mastering Node.js Microservices", students: 38, completions: "80%" }
            ].map(course => (
              <div key={course.id} className="flex items-center justify-between p-2.5 rounded-xl bg-blueish-grey dark:bg-bg-page border border-border-card">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-text-primary line-clamp-1">{course.title}</h4>
                  <p className="text-[9px] text-text-secondary font-medium">{course.students} Learners Enrolled</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-cta-orange bg-cta-orange/10 px-2 py-0.5 rounded-md">{course.completions} avg</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
      <div className="h-6"></div>
    </div>
  );
}

function StudentDashboard({ theme }) {
  const studentWeeklyHours = [
    { name: 'Mon', study: 1.5 },
    { name: 'Tue', study: 2.0 },
    { name: 'Wed', study: 1.0 },
    { name: 'Thu', study: 3.5 },
    { name: 'Fri', study: 2.5 },
    { name: 'Sat', study: 4.0 },
    { name: 'Sun', study: 1.5 }
  ];

  return (
    <div className="space-y-6">
      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 md:auto-rows-[170px] gap-6">
        
        {/* Welcome Hero Card */}
        <div className="md:col-span-8 md:row-span-2">
          <BorderGlow
            edgeSensitivity={15}
            glowColor="304 76 30"
            backgroundColor={theme === 'dark' ? '#16171F' : '#FFFFFF'}
            borderRadius={16}
            glowRadius={40}
            glowIntensity={1.5}
            className="h-full"
          >
            <div className="p-6 flex flex-col justify-between h-full bg-gradient-to-tr from-tranquil-velvet-dark via-tranquil-velvet to-bright-velvet rounded-2xl text-white relative overflow-hidden">
              <div className="absolute right-0 bottom-0 top-0 opacity-10 w-1/2 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-white via-white/5 to-transparent pointer-events-none"></div>
              
              <div className="space-y-1 relative z-10">
                <span className="text-cta-orange text-xs font-bold uppercase tracking-widest">Student Portal</span>
                <h2 className="text-2xl font-extrabold text-white mt-1">Welcome back, Marcus Long!</h2>
                <p className="text-white/80 text-[11px] leading-relaxed max-w-md mt-2">
                  Continue your training modules, track your weekly study hour streaks, submit your code sandbox assignments, and prepare for upcoming module exams.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 mt-4 relative z-10">
                <div>
                  <span className="text-[10px] text-white/60 font-semibold uppercase tracking-wider block">Courses Enrolled</span>
                  <span className="text-2xl font-bold text-white">3 Courses</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/60 font-semibold uppercase tracking-wider block">Hours Studied</span>
                  <span className="text-2xl font-bold text-white">15.5 hrs</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/60 font-semibold uppercase tracking-wider block">Completed Badges</span>
                  <span className="text-2xl font-bold text-emerald">2 Badges</span>
                </div>
              </div>
            </div>
          </BorderGlow>
        </div>

        {/* Learning Streak Card */}
        <div className="md:col-span-4 md:row-span-1">
          <div className="bg-bg-card border border-border-card rounded-2xl p-5 flex items-center justify-between h-full hover:shadow-md transition duration-200">
            <div className="space-y-1">
              <span className="text-[9px] font-bold text-text-secondary uppercase tracking-wider">Current Study Streak</span>
              <h3 className="text-2xl font-extrabold text-text-primary">5 Days</h3>
              <p className="text-[10px] text-emerald font-semibold flex items-center gap-0.5">
                <TrendingUp className="h-3 w-3" /> Keeping it up!
              </p>
            </div>
            <div className="p-3.5 bg-cta-orange/10 text-cta-orange rounded-xl">
              <Award className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Small stats card 2 */}
        <div className="md:col-span-4 md:row-span-1">
          <div className="bg-bg-card border border-border-card rounded-2xl p-5 flex items-center justify-between h-full hover:shadow-md transition duration-200">
            <div className="space-y-1">
              <span className="text-[9px] font-bold text-text-secondary uppercase tracking-wider">Next Assessment</span>
              <h3 className="text-sm font-bold text-text-primary line-clamp-1">React Advanced Hooks</h3>
              <p className="text-[10px] text-cta-orange font-semibold">
                Due in 2 days
              </p>
            </div>
            <div className="p-3.5 bg-bright-velvet/10 text-bright-velvet rounded-xl">
              <FileText className="h-6 w-6" />
            </div>
          </div>
        </div>

      </div>

      {/* Chart & Progress Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Study Hours Graph */}
        <div className="lg:col-span-2 bg-bg-card border border-border-card rounded-2xl p-5 space-y-4 hover:shadow-md transition duration-200">
          <div>
            <h3 className="text-sm font-bold text-text-primary">Weekly Study Activity</h3>
            <p className="text-[10px] text-text-secondary">Study hours recorded per day in active modules</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={studentWeeklyHours}>
                <defs>
                  <linearGradient id="colorStudy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6C1D5F" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6C1D5F" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#27272A' : '#E4E4E7'} />
                <XAxis dataKey="name" stroke={theme === 'dark' ? '#71717A' : '#A1A1AA'} fontSize={10} tickLine={false} />
                <YAxis stroke={theme === 'dark' ? '#71717A' : '#A1A1AA'} fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#18181B' : '#FFFFFF', borderColor: theme === 'dark' ? '#27272A' : '#E4E4E7', fontSize: '11px', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="study" stroke="#6C1D5F" fillOpacity={1} fill="url(#colorStudy)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Current Enrolled Courses Progress */}
        <div className="bg-bg-card border border-border-card rounded-2xl p-5 space-y-4 hover:shadow-md transition duration-200">
          <div>
            <h3 className="text-sm font-bold text-text-primary">Active Courses</h3>
            <p className="text-[10px] text-text-secondary">Track your progression through active modules</p>
          </div>
          <div className="space-y-4">
            {[
              { id: 1, title: "Enterprise React with Tailwind CSS", progress: 75 },
              { id: 2, title: "Introduction to Cloud Native & Kubernetes", progress: 90 },
              { id: 3, title: "Mastering Node.js Microservices", progress: 15 }
            ].map(course => (
              <div key={course.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-text-primary line-clamp-1">{course.title}</span>
                  <span className="font-extrabold text-tranquil-velvet">{course.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-blueish-grey dark:bg-bg-page rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-tranquil-velvet rounded-full transition-all duration-500" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
      <div className="h-6"></div>
    </div>
  );
}

function SuperadminHeader({ theme }) {
  const [cacheFlushed, setCacheFlushed] = useState(false);
  const [loadSimulated, setLoadSimulated] = useState(false);

  const handleFlushCache = () => {
    setCacheFlushed(true);
    setTimeout(() => setCacheFlushed(false), 3000);
  };

  const handleSimulateLoad = () => {
    setLoadSimulated(true);
    setTimeout(() => setLoadSimulated(false), 3000);
  };

  return (
    <div className="bg-gradient-to-r from-tranquil-velvet-dark/20 to-bright-velvet/20 border border-tranquil-velvet/40 p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition duration-200">
      <div className="space-y-1 flex items-start gap-3">
        <div className="p-2.5 bg-cta-orange/10 text-cta-orange rounded-xl mt-0.5">
          <Activity className="h-5 w-5 animate-pulse" />
        </div>
        <div>
          <h3 className="text-xs font-bold text-text-primary uppercase tracking-widest flex items-center gap-1.5">
            Superadmin Console <span className="h-2 w-2 rounded-full bg-emerald inline-block animate-pulse"></span>
          </h3>
          <p className="text-[10px] text-text-secondary">System-wide performance logs, node latency, and developer debugging shortcuts.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[10px] text-text-secondary font-semibold">
            <span>API Status: <b className="text-emerald">Healthy (99.98%)</b></span>
            <span>Latency: <b className="text-emerald">12ms</b></span>
            <span>Cluster Load: <b className="text-emerald">Low (14%)</b></span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button 
          onClick={handleFlushCache}
          className="px-3.5 py-2 bg-bg-card border border-border-card text-text-primary hover:bg-bg-hover text-[10px] font-bold rounded-xl shadow-xs transition cursor-pointer select-none active:scale-95"
        >
          {cacheFlushed ? "✓ Cache Flushed" : "Flush Redis Cache"}
        </button>
        <button 
          onClick={handleSimulateLoad}
          className="px-3.5 py-2 bg-cta-orange hover:bg-cta-orange/90 text-white text-[10px] font-bold rounded-xl shadow-xs transition cursor-pointer select-none active:scale-95"
        >
          {loadSimulated ? "⚡ Simulating Load..." : "Simulate Peak Traffic"}
        </button>
      </div>
    </div>
  );
}

