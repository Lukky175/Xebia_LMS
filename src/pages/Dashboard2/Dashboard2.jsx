import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, 
  FileText, 
  Users, 
  GraduationCap, 
  BarChart3, 
  HelpCircle, 
  LogOut, 
  Search, 
  Settings, 
  Bell, 
  MessageSquare, 
  ChevronRight,
  ExternalLink,
  Phone,
  CheckSquare,
  ArrowUpRight,
  TrendingUp,
  Award,
  AlertCircle,
  Plus,
  Trash2,
  Download,
  Calendar as CalendarIcon,
  X,
  Mail,
  CheckCircle,
  ArrowLeft,
  BookOpen
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, Bar, LineChart, Line, CartesianGrid } from 'recharts';
import CountUp from '../../components/CountUp.jsx';

// Inline logo element for SkillSphere Academy
function SkillSphereLogo({ className = "h-8" }) {
  return (
    <div className="flex items-center gap-2 select-none">
      <div className="h-8 w-8 bg-[#386B40] rounded-xl flex items-center justify-center shadow-md shadow-[#386B40]/20 shrink-0">
        <GraduationCap className="h-5 w-5 text-white" />
      </div>
      <div className="leading-tight text-left">
        <h3 className="text-sm font-black text-[#1F3A23] tracking-wide">SkillSphere</h3>
        <p className="text-[9px] text-[#5A5A5A] font-bold uppercase tracking-wider leading-none">Academy</p>
      </div>
    </div>
  );
}

export default function Dashboard2() {
  const navigate = useNavigate();

  // Active Tab state
  const [activeTab, setActiveTab] = useState('Dashboard');

  // Search filter
  const [searchTerm, setSearchTerm] = useState('');
  
  // Toast notifications state
  const [toasts, setToasts] = useState([]);
  const triggerToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  };

  // --- STATE FOR DASHBOARD TAB ---
  const [weeklyTasks, setWeeklyTasks] = useState([
    { id: 1, label: 'Webinar course', completed: true },
    { id: 2, label: 'Parents day', completed: true },
    { id: 3, label: 'Discuss goals', completed: false },
    { id: 4, label: 'Weekly meeting', completed: false },
    { id: 5, label: 'Tutor interview', completed: true },
  ]);

  const [todayCourses, setTodayCourses] = useState([
    { id: 'c1', label: 'Statistics', completed: false },
    { id: 'c2', label: 'Public Speaking', completed: false },
    { id: 'c3', label: 'Digital Marketing', completed: false },
    { id: 'c4', label: 'English', completed: true },
    { id: 'c5', label: 'SMM', completed: true },
    { id: 'c6', label: 'Mathematics', completed: true }
  ]);

  const [payments, setPayments] = useState([
    { id: '2034789', classId: 'A123', studentName: 'Susan Smith', tutorName: 'Dr. Maxim Accardo', date: '01.01.2025', fee: 1300, due: 800, status: 'Received' },
    { id: '3434118', classId: 'A123', studentName: 'Alex Smith', tutorName: 'Mr. Ralph Perry', date: '01.10.2024', fee: 950, due: 0, status: 'Received' },
    { id: '2035487', classId: 'B12', studentName: 'Steven Black', tutorName: 'Ms. Keith Rodman', date: '01.10.2024', fee: 850, due: 820, status: 'Pending' },
    { id: '1034786', classId: 'A100', studentName: 'Anna-Maria Mur', tutorName: 'Dr. Marcus MesCaline', date: '15.09.2024', fee: 1240, due: 200, status: 'Received' },
    { id: '2065985', classId: 'H78', studentName: 'Alice Rodman', tutorName: 'Ms. Anna Long', date: '01.01.2025', fee: 1300, due: 0, status: 'Received' },
    { id: '2001389', classId: 'B134', studentName: 'Tom Pitt', tutorName: 'Mrs. Anna Dickens', date: '15.07.2024', fee: 250, due: 0, status: 'Received' },
    { id: '2033789', classId: 'G45', studentName: 'Alex Muller', tutorName: 'Dr. Diana Lorens', date: '01.01.2025', fee: 1000, due: 0, status: 'Received' },
    { id: '1134289', classId: 'A123', studentName: 'Aria Brown', tutorName: 'Mr. Arthur John', date: '01.01.2025', fee: 550, due: 150, status: 'Received' }
  ]);

  const [paymentStatusFilter, setPaymentStatusFilter] = useState('All');

  // --- STATE FOR TUTORS TAB ---
  const [tutors, setTutors] = useState([
    { id: 'T-101', name: 'Dr. Alice Meenss', dept: 'Languages & Arts', courses: 4, hours: 148, rating: 4.9, status: 'Online' },
    { id: 'T-102', name: 'Dr. Christopher Smith', dept: 'Engineering & tech', courses: 6, hours: 220, rating: 4.8, status: 'Online' },
    { id: 'T-103', name: 'Mrs. Monica Black', dept: 'Digital Design', courses: 3, hours: 92, rating: 4.7, status: 'Online' },
    { id: 'T-104', name: 'Ms. Keith Rodman', dept: 'Marketing & SMM', courses: 5, hours: 165, rating: 4.9, status: 'Online' },
    { id: 'T-105', name: 'Dr. Daniel Kha', dept: 'Sciences', courses: 4, hours: 120, rating: 4.6, status: 'Online' },
    { id: 'T-106', name: 'Mr. Ralph Perry', dept: 'Public Speaking', courses: 2, hours: 45, rating: 4.5, status: 'Offline' }
  ]);
  const [deptFilter, setDeptFilter] = useState('All');
  const [showTutorModal, setShowTutorModal] = useState(false);
  const [newTutor, setNewTutor] = useState({ name: '', dept: 'Engineering & tech', courses: 1, hours: 10, rating: 5.0, status: 'Online' });

  // --- STATE FOR STUDENTS TAB ---
  const [students, setStudents] = useState([
    { id: 'S-201', name: 'Susan Smith', classId: 'A123', attendance: 98, grade: 'A', status: 'Active' },
    { id: 'S-202', name: 'Alex Smith', classId: 'A123', attendance: 95, grade: 'B+', status: 'Active' },
    { id: 'S-203', name: 'Steven Black', classId: 'B12', attendance: 88, grade: 'C', status: 'Warning' },
    { id: 'S-204', name: 'Anna-Maria Mur', classId: 'A100', attendance: 96, grade: 'A-', status: 'Active' },
    { id: 'S-205', name: 'Alice Rodman', classId: 'H78', attendance: 100, grade: 'A+', status: 'Active' },
    { id: 'S-206', name: 'Tom Pitt', classId: 'B134', attendance: 94, grade: 'B', status: 'Active' },
    { id: 'S-207', name: 'Alex Muller', classId: 'G45', attendance: 92, grade: 'B-', status: 'Active' },
    { id: 'S-208', name: 'Aria Brown', classId: 'A123', attendance: 89, grade: 'C+', status: 'Active' }
  ]);
  const [studentStatusFilter, setStudentStatusFilter] = useState('All');
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: '', classId: 'A123', attendance: 95, grade: 'A', status: 'Active' });

  // --- STATE FOR REPORTS TAB ---
  const [generatingReportId, setGeneratingReportId] = useState(null);
  const [reportProgress, setReportProgress] = useState(0);

  const reportTypes = [
    { id: 'tutor-audit', title: 'Tutor Hours & Billing Audit', desc: 'Summarizes lesson hours logged, invoice details, and outstanding balances.', format: 'PDF' },
    { id: 'student-grades', title: 'Student Grading & Performance Summary', desc: 'Detailed report of attendance rates, exam scores, and warning status levels.', format: 'CSV' },
    { id: 'website-visits', title: 'Website Traffic & Marketing Analytics', desc: 'Log reviews of page visits, referral paths, and returning visitor metrics.', format: 'XLSX' }
  ];

  // --- CHART DATA FOR ANALYTICS TAB ---
  const monthlyEnrollmentData = [
    { name: 'Jan', enrollments: 85, active: 1100 },
    { name: 'Feb', enrollments: 94, active: 1180 },
    { name: 'Mar', enrollments: 120, active: 1250 },
    { name: 'Apr', enrollments: 115, active: 1210 },
    { name: 'May', enrollments: 140, active: 1390 },
    { name: 'Jun', enrollments: 168, active: 1540 }
  ];

  const tutorSatisfactionData = [
    { name: 'Dr. Alice M.', rating: 4.9 },
    { name: 'Dr. Chris S.', rating: 4.8 },
    { name: 'Mrs. Monica B.', rating: 4.7 },
    { name: 'Ms. Keith R.', rating: 4.9 },
    { name: 'Dr. Daniel K.', rating: 4.6 },
    { name: 'Mr. Ralph P.', rating: 4.5 }
  ];

  // Helper arrays/objects
  const onlineTutors = [
    { name: 'Dr. Alice Meenss', role: 'Tutor', avatarColor: 'bg-emerald/10 text-emerald' },
    { name: 'Dr. Christopher Smith', role: 'Tutor', avatarColor: 'bg-[#386B40]/10 text-[#386B40]' },
    { name: 'Mrs. Monica Black', role: 'Tutor', avatarColor: 'bg-[#FF6200]/10 text-[#FF6200]' },
    { name: 'Mr. Ralph Fare', role: 'Student', avatarColor: 'bg-blue-500/10 text-blue-500' },
    { name: 'Ms. Keith Rodman', role: 'Tutor', avatarColor: 'bg-purple-500/10 text-purple-500' },
    { name: 'Dr. Daniel Kha', role: 'Tutor', avatarColor: 'bg-[#386B40]/10 text-[#386B40]' },
    { name: 'Ms. Julie McLaren', role: 'Student', avatarColor: 'bg-pink-500/10 text-pink-500' },
    { name: 'Dr. Marcus MesCaline', role: 'Tutor', avatarColor: 'bg-indigo-500/10 text-indigo-500' },
    { name: 'Mr. Maxim Accardo', role: 'Student', avatarColor: 'bg-amber-500/10 text-amber-500' }
  ];

  const projectBars = [
    { day: 'M', hours: 6 },
    { day: 'T', hours: 8 },
    { day: 'W', hours: 5 },
    { day: 'T', hours: 9 },
    { day: 'F', hours: 17, highlighted: true },
    { day: 'S', hours: 4 },
    { day: 'S', hours: 2 }
  ];

  const sparklineVisits = [
    { name: '1', val: 1.2 }, { name: '2', val: 2.1 }, { name: '3', val: 1.5 },
    { name: '4', val: 3.2 }, { name: '5', val: 2.0 }, { name: '6', val: 2.8 },
    { name: '7', val: 1.8 }, { name: '8', val: 3.4 }, { name: '9', val: 2.2 },
    { name: '10', val: 4.2 }
  ];
  const sparklineReturning = [
    { name: '1', val: 2.2 }, { name: '2', val: 1.2 }, { name: '3', val: 2.5 },
    { name: '4', val: 2.1 }, { name: '5', val: 3.1 }, { name: '6', val: 2.6 },
    { name: '7', val: 3.0 }, { name: '8', val: 2.4 }, { name: '9', val: 3.3 },
    { name: '10', val: 4.0 }
  ];
  const sparklineSpecial = [
    { name: '1', val: 1.0 }, { name: '2', val: 1.5 }, { name: '3', val: 1.2 },
    { name: '4', val: 2.0 }, { name: '5', val: 1.8 }, { name: '6', val: 2.3 },
    { name: '7', val: 2.1 }, { name: '8', val: 2.8 }, { name: '9', val: 2.5 },
    { name: '10', val: 3.1 }
  ];

  // Toggle checklist tasks
  const handleToggleTask = (id) => {
    setWeeklyTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };
  const handleToggleCourse = (id) => {
    setTodayCourses(prev => prev.map(c => c.id === id ? { ...c, completed: !c.completed } : c));
  };

  const weeklyCompletionRate = useMemo(() => {
    const completed = weeklyTasks.filter(t => t.completed).length;
    return Math.round((completed / weeklyTasks.length) * 100);
  }, [weeklyTasks]);

  // SVG ring configs
  const radius = 34;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (weeklyCompletionRate / 100) * circumference;

  // Filter payments (Dashboard tab)
  const filteredPayments = useMemo(() => {
    return payments.filter(p => {
      const matchSearch = p.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.tutorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.id.includes(searchTerm);
      const matchStatus = paymentStatusFilter === 'All' || p.status === paymentStatusFilter;
      return matchSearch && matchStatus;
    });
  }, [payments, searchTerm, paymentStatusFilter]);

  // Filter tutors
  const filteredTutors = useMemo(() => {
    return tutors.filter(t => {
      const matchSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.dept.toLowerCase().includes(searchTerm.toLowerCase());
      const matchDept = deptFilter === 'All' || t.dept === deptFilter;
      return matchSearch && matchDept;
    });
  }, [tutors, searchTerm, deptFilter]);

  // Filter students
  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const matchSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.classId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = studentStatusFilter === 'All' || s.status === studentStatusFilter;
      return matchSearch && matchStatus;
    });
  }, [students, searchTerm, studentStatusFilter]);

  // Save Add Tutor Form
  const saveTutor = (e) => {
    e.preventDefault();
    if (!newTutor.name.trim()) return;
    const added = {
      ...newTutor,
      id: `T-${Date.now().toString().slice(-3)}`
    };
    setTutors([added, ...tutors]);
    setShowTutorModal(false);
    setNewTutor({ name: '', dept: 'Engineering & tech', courses: 1, hours: 10, rating: 5.0, status: 'Online' });
    triggerToast(`Added Tutor ${added.name} successfully!`);
  };

  // Save Add Student Form
  const saveStudent = (e) => {
    e.preventDefault();
    if (!newStudent.name.trim()) return;
    const added = {
      ...newStudent,
      id: `S-${Date.now().toString().slice(-3)}`
    };
    setStudents([added, ...students]);
    setShowStudentModal(false);
    setNewStudent({ name: '', classId: 'A123', attendance: 95, grade: 'A', status: 'Active' });
    triggerToast(`Registered Student ${added.name} successfully!`);
  };

  // Delete handlers
  const deleteTutor = (id) => {
    setTutors(tutors.filter(t => t.id !== id));
    triggerToast('Tutor entry removed.', 'info');
  };
  const deleteStudent = (id) => {
    setStudents(students.filter(s => s.id !== id));
    triggerToast('Student registration archived.', 'info');
  };

  // Simulate report generation
  const handleGenerateReport = (report) => {
    if (generatingReportId) return;
    setGeneratingReportId(report.id);
    setReportProgress(0);

    const interval = setInterval(() => {
      setReportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setGeneratingReportId(null);
            triggerToast(`Downloaded ${report.title} successfully!`);
          }, 300);
          return 100;
        }
        return prev + 20;
      });
    }, 150);
  };

  return (
    <div className="flex h-screen w-screen bg-[#F4F7F4] text-[#2C3E2D] overflow-hidden font-sans">
      
      {/* Toast Portal */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map(t => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-xs font-bold max-w-sm ${
                t.type === 'success' 
                  ? 'bg-emerald/10 border-emerald/30 text-[#2D5A27]' 
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-600'
              }`}
            >
              <CheckCircle className="h-4 w-4 shrink-0" />
              <span>{t.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 1. SkillSphere Sidebar */}
      <aside className="w-64 bg-white border-r border-[#D4E2D4] flex flex-col justify-between p-6 shrink-0 h-full shadow-sm">
        <div className="space-y-8 flex-1 flex flex-col overflow-y-auto">
          {/* Logo */}
          <div className="border-b border-[#EBF2EB] pb-4">
            <SkillSphereLogo />
          </div>

          {/* Nav Items */}
          <nav className="space-y-1.5">
            {[
              { label: 'Dashboard', icon: Layers },
              { label: 'Reports', icon: FileText },
              { label: 'Tutors', icon: Users },
              { label: 'Students', icon: GraduationCap },
              { label: 'Analytics', icon: BarChart3 }
            ].map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeTab === item.label;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveTab(item.label);
                    setSearchTerm('');
                  }}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 text-xs font-bold rounded-xl transition duration-150 cursor-pointer ${
                    isActive 
                      ? 'bg-[#EAF2EB] text-[#2D5A27] border-l-4 border-[#386B40]' 
                      : 'text-[#5A5A5A] hover:bg-[#F4F8F4] hover:text-black'
                  }`}
                >
                  <Icon className={`h-4.5 w-4.5 shrink-0 ${isActive ? 'text-[#2D5A27]' : 'text-[#5A5A5A]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="space-y-3 pt-6 border-t border-[#EBF2EB] shrink-0">
          <button 
            onClick={() => triggerToast("Help documentation is already updated to SkillSphere system specifications.", 'info')}
            className="w-full flex items-center gap-3.5 px-4 py-2.5 text-xs font-bold text-[#5A5A5A] hover:bg-[#F4F8F4] hover:text-black transition rounded-xl cursor-pointer"
          >
            <HelpCircle className="h-4.5 w-4.5 shrink-0" />
            <span>Help</span>
          </button>

          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full flex items-center gap-3.5 px-4 py-2.5 text-xs font-bold text-red-600 bg-red-500/5 hover:bg-red-500/10 transition rounded-xl cursor-pointer border border-red-500/10"
          >
            <ArrowLeft className="h-4.5 w-4.5 shrink-0" />
            <span>Back to LMS</span>
          </button>
        </div>
      </aside>

      {/* 2. Main Scrollable Container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-[#D4E2D4] px-8 flex items-center justify-between shrink-0 shadow-xs z-10">
          {/* Welcome back (Left) */}
          <div className="text-left select-none">
            <h1 className="text-sm font-black text-[#1F3A23] leading-none">
              {activeTab === 'Dashboard' && "Welcome back, Adam!"}
              {activeTab === 'Reports' && "Skills Reports System"}
              {activeTab === 'Tutors' && "Tutors Administration"}
              {activeTab === 'Students' && "Students Database Directory"}
              {activeTab === 'Analytics' && "SkillSphere Analytical Hub"}
            </h1>
            <p className="text-[10px] text-[#5A5A5A] font-bold mt-1">
              {activeTab === 'Dashboard' && "Plan, prioritize, and accomplish your tasks with ease."}
              {activeTab === 'Reports' && "Export tutoring schedules logs, certificates databases, and traffic audits."}
              {activeTab === 'Tutors' && "Track active classes hours load, performance indices, and feedback ratings."}
              {activeTab === 'Students' && "Monitor attendance status levels, GPA averages, and enrollment directories."}
              {activeTab === 'Analytics' && "Weekly average study hours, class enrollment distributions, and feedback indexes."}
            </p>
          </div>

          {/* Search (Center) */}
          <div className="flex items-center gap-2.5 w-full max-w-xs px-3.5 py-1.5 bg-[#F4F7F4] border border-[#D4E2D4] rounded-full focus-within:border-[#386B40] transition duration-200">
            <Search className="h-4 w-4 text-[#5A5A5A] shrink-0" />
            <input 
              type="text" 
              placeholder={`Search ${activeTab.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-xs text-black focus:outline-none w-full font-medium"
            />
          </div>

          {/* Actions (Right) */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => alert("Settings configuration active.")}
              className="p-2 text-[#5A5A5A] hover:text-black transition rounded-full hover:bg-[#F4F8F4] cursor-pointer flex items-center gap-1 border border-[#D4E2D4] px-3.5 py-1.5"
            >
              <Settings className="h-4 w-4 shrink-0" />
              <span className="text-[10px] font-black">Settings</span>
            </button>
            <div className="h-5 w-px bg-[#D4E2D4]"></div>
            <button 
              onClick={() => triggerToast("Inbox database is fully synchronized.", 'info')}
              className="p-2 text-[#5A5A5A] hover:text-black transition rounded-full hover:bg-[#F4F8F4] cursor-pointer relative"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-[#FF6200] rounded-full"></span>
            </button>
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-[#386B40] to-[#2D5A27] flex items-center justify-center text-white font-extrabold shadow-sm text-xs">
              AD
            </div>
          </div>
        </header>

        {/* Dashboard Content Frame */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 max-w-7xl w-full mx-auto">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              
              {/* --- 1. DASHBOARD TAB VIEW --- */}
              {activeTab === 'Dashboard' && (
                <div className="space-y-8">
                  {/* Left portion + Right portion grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left portion */}
                    <div className="lg:col-span-9 space-y-6">
                      
                      {/* Stat Cards */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-[#2D5A27] hover:bg-[#23461E] transition duration-200 text-white rounded-2xl p-5 shadow-sm flex flex-col justify-between min-h-[120px] relative overflow-hidden group">
                          <div className="flex justify-between items-start">
                            <span className="text-[9px] font-bold text-white/70 uppercase tracking-widest">Total Courses</span>
                            <button className="p-1 rounded bg-white/10 hover:bg-white/20 text-white cursor-pointer transition">
                              <ExternalLink className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <div className="pt-2">
                            <h3 className="text-3xl font-black text-white"><CountUp from={0} to={134} duration={1.2} /></h3>
                            <p className="text-[9px] text-white/60 font-semibold mt-1">Incl. 2 pending courses</p>
                          </div>
                        </div>

                        <div className="bg-white border border-[#D4E2D4] hover:border-[#386B40]/40 transition rounded-2xl p-5 shadow-sm flex flex-col justify-between min-h-[120px]">
                          <div className="flex justify-between items-start">
                            <span className="text-[9px] font-bold text-[#5A5A5A] uppercase tracking-widest">Running</span>
                            <button className="p-1 rounded hover:bg-[#F4F8F4] text-[#5A5A5A] hover:text-black cursor-pointer transition">
                              <ExternalLink className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <div className="pt-2">
                            <h3 className="text-3xl font-black text-[#1F3A23]"><CountUp from={0} to={42} duration={1.0} /></h3>
                            <p className="text-[9px] text-[#5A5A5A] font-semibold mt-1">Incl. 2 pending courses</p>
                          </div>
                        </div>

                        <div className="bg-white border border-[#D4E2D4] hover:border-[#386B40]/40 transition rounded-2xl p-5 shadow-sm flex flex-col justify-between min-h-[120px]">
                          <div className="flex justify-between items-start">
                            <span className="text-[9px] font-bold text-[#5A5A5A] uppercase tracking-widest">Finished</span>
                            <button className="p-1 rounded hover:bg-[#F4F8F4] text-[#5A5A5A] hover:text-black cursor-pointer transition">
                              <ExternalLink className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <div className="pt-2">
                            <h3 className="text-3xl font-black text-[#1F3A23]"><CountUp from={0} to={92} duration={1.0} /></h3>
                            <p className="text-[9px] text-[#5A5A5A] font-semibold mt-1">Excl. 2 pending courses</p>
                          </div>
                        </div>

                        <div className="bg-white border border-[#D4E2D4] hover:border-[#386B40]/40 transition rounded-2xl p-5 shadow-sm flex flex-col justify-between min-h-[120px]">
                          <div className="flex justify-between items-start">
                            <span className="text-[9px] font-bold text-[#5A5A5A] uppercase tracking-widest">New</span>
                            <span className="text-[10px] text-[#386B40] font-extrabold bg-[#EAF2EB] px-2 py-0.5 rounded-full shrink-0">Incoming</span>
                          </div>
                          <div className="pt-2">
                            <h3 className="text-3xl font-black text-[#386B40]">+2</h3>
                            <p className="text-[9px] text-[#5A5A5A] font-semibold mt-1">Incl. 2 pending courses</p>
                          </div>
                        </div>
                      </div>

                      {/* Online, Project Progress, Calendar grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Online list */}
                        <div className="bg-white border border-[#D4E2D4] rounded-2xl p-5 shadow-sm flex flex-col justify-between min-h-[380px]">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-[10px] font-extrabold text-[#1F3A23] uppercase tracking-widest flex items-center gap-1.5">
                              <span className="h-2 w-2 rounded-full bg-[#386B40] animate-pulse"></span>
                              Online ({onlineTutors.length})
                            </span>
                            <button className="p-1 rounded hover:bg-[#F4F8F4] text-[#5A5A5A] cursor-pointer">
                              <ExternalLink className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <div className="flex-1 space-y-2.5 overflow-y-auto pr-1">
                            {onlineTutors.map((t, idx) => (
                              <div key={idx} className="flex items-center justify-between bg-[#F8FAF8] border border-[#EBF2EB] hover:border-[#386B40]/30 p-2 rounded-xl transition">
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <div className={`h-7 w-7 rounded-lg font-black text-[9px] flex items-center justify-center shrink-0 ${t.avatarColor}`}>
                                    {t.name.split(' ').slice(-1)[0][0]}
                                  </div>
                                  <div className="leading-tight min-w-0">
                                    <p className="text-xs font-bold text-black truncate">{t.name}</p>
                                    <span className="text-[9px] text-[#5A5A5A] font-semibold">{t.role}</span>
                                  </div>
                                </div>
                                <div className="flex gap-1.5 shrink-0">
                                  <button onClick={() => triggerToast(`Opened chat dialogue box with ${t.name}.`)} className="p-1 hover:bg-[#EAF2EB] text-[#5A5A5A] hover:text-[#386B40] rounded transition cursor-pointer">
                                    <MessageSquare className="h-3.5 w-3.5" />
                                  </button>
                                  <button onClick={() => triggerToast(`Calling ${t.name} via platform dialer...`)} className="p-1 hover:bg-[#EAF2EB] text-[#5A5A5A] hover:text-[#386B40] rounded transition cursor-pointer">
                                    <Phone className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Project Progress */}
                        <div className="bg-white border border-[#D4E2D4] rounded-2xl p-5 shadow-sm flex flex-col justify-between min-h-[380px] relative">
                          <div className="flex justify-between items-center mb-3">
                            <div>
                              <span className="text-[10px] font-extrabold text-[#5A5A5A] uppercase tracking-widest">Project Progress</span>
                              <p className="text-[9px] text-[#5A5A5A] mt-0.5">Weekly average: 12.3h</p>
                            </div>
                            <button className="p-1 rounded hover:bg-[#F4F8F4] text-[#5A5A5A] cursor-pointer">
                              <ExternalLink className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <div className="flex-1 flex items-end justify-between px-2 pt-6 pb-2 h-full min-h-[220px]">
                            {projectBars.map((bar, i) => (
                              <div key={i} className="flex flex-col items-center gap-2 h-full justify-end flex-1 group">
                                <div className="relative w-full flex justify-center opacity-0 group-hover:opacity-100 transition duration-150">
                                  <span className="absolute bottom-1 bg-[#2C3E2D] text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap z-20">
                                    {bar.hours}h
                                  </span>
                                </div>
                                <div className="w-6 bg-[#EBF2EB] dark:bg-[#1E1F29] rounded-t-lg overflow-hidden h-full flex flex-col justify-end relative border border-transparent hover:border-[#386B40]/40 transition">
                                  <motion.div 
                                    className={`w-full rounded-t-lg ${bar.highlighted ? 'bg-[#386B40]' : 'bg-[#5C4F61]/65'}`}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${(bar.hours / 20) * 100}%` }}
                                    transition={{ duration: 1.0, ease: 'easeOut' }}
                                  />
                                </div>
                                <span className="text-[10px] font-black text-[#5A5A5A]">{bar.day}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Calendar timeline */}
                        <div className="bg-white border border-[#D4E2D4] rounded-2xl p-5 shadow-sm flex flex-col justify-between min-h-[380px]">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-[10px] font-extrabold text-[#5A5A5A] uppercase tracking-widest">Calendar Grid</span>
                            <button className="p-1 rounded hover:bg-[#F4F8F4] text-[#5A5A5A] cursor-pointer">
                              <ExternalLink className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <div className="flex-1 flex flex-col justify-between gap-3 pt-2">
                            <div className="flex justify-between text-[10px] font-black border-b border-[#EBF2EB] pb-2 text-[#5A5A5A]">
                              <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                            </div>
                            <div className="flex-1 flex flex-col gap-3 justify-center">
                              <div className="bg-[#5C4F61]/10 border border-[#5C4F61]/25 p-3 rounded-xl space-y-1 text-left relative">
                                <span className="bg-[#5C4F61] text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase">English</span>
                                <p className="text-xs font-bold text-[#1F3A23] pt-1">Alina & Daniel</p>
                                <p className="text-[9px] text-[#5A5A5A]">Mon - Tue • 10:00 - 11:30</p>
                              </div>
                              <div className="bg-[#386B40]/10 border border-[#386B40]/25 p-3 rounded-xl space-y-1 text-left relative">
                                <span className="bg-[#386B40] text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase">Art Fundamentals</span>
                                <p className="text-xs font-bold text-[#1F3A23] pt-1">Monica & Christopher</p>
                                <p className="text-[9px] text-[#5A5A5A]">Wed - Fri • 14:00 - 15:30</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* January Report Review */}
                      <div className="space-y-3">
                        <h3 className="text-xs font-black uppercase tracking-wider text-[#1F3A23]">January Report Review</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="bg-white border border-[#D4E2D4] rounded-2xl p-5 shadow-sm flex flex-col justify-between min-h-[140px]">
                            <div className="flex justify-between items-start">
                              <div className="space-y-0.5 text-left">
                                <span className="text-[9px] font-bold text-[#5A5A5A] uppercase tracking-widest">Website visits</span>
                                <h4 className="text-2xl font-black text-black mt-1"><CountUp from={0} to={198} duration={1.2} /></h4>
                                <span className="text-[9px] text-[#386B40] font-semibold flex items-center gap-1">
                                  <TrendingUp className="h-3 w-3" /> 2.6 more than usual
                                </span>
                              </div>
                              <button className="p-1 rounded hover:bg-[#F4F8F4] text-[#5A5A5A] cursor-pointer"><ExternalLink className="h-3 w-3" /></button>
                            </div>
                            <div className="h-10 w-full mt-2">
                              <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={sparklineVisits} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                  <linearGradient id="glowVis" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#386B40" stopOpacity={0.2}/><stop offset="95%" stopColor="#386B40" stopOpacity={0}/>
                                  </linearGradient>
                                  <Area type="monotone" dataKey="val" stroke="#386B40" strokeWidth={2} fillOpacity={1} fill="url(#glowVis)" />
                                </AreaChart>
                              </ResponsiveContainer>
                            </div>
                          </div>

                          <div className="bg-white border border-[#D4E2D4] rounded-2xl p-5 shadow-sm flex flex-col justify-between min-h-[140px]">
                            <div className="flex justify-between items-start">
                              <div className="space-y-0.5 text-left">
                                <span className="text-[9px] font-bold text-[#5A5A5A] uppercase tracking-widest">Returning visits</span>
                                <h4 className="text-2xl font-black text-black mt-1"><CountUp from={0} to={46} duration={1.0} /></h4>
                                <span className="text-[9px] text-[#386B40] font-semibold flex items-center gap-1">
                                  <TrendingUp className="h-3 w-3" /> 1.4 more than usual
                                </span>
                              </div>
                              <button className="p-1 rounded hover:bg-[#F4F8F4] text-[#5A5A5A] cursor-pointer"><ExternalLink className="h-3 w-3" /></button>
                            </div>
                            <div className="h-10 w-full mt-2">
                              <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={sparklineReturning} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                  <linearGradient id="glowRet" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#386B40" stopOpacity={0.2}/><stop offset="95%" stopColor="#386B40" stopOpacity={0}/>
                                  </linearGradient>
                                  <Area type="monotone" dataKey="val" stroke="#386B40" strokeWidth={2} fillOpacity={1} fill="url(#glowRet)" />
                                </AreaChart>
                              </ResponsiveContainer>
                            </div>
                          </div>

                          <div className="bg-white border border-[#D4E2D4] rounded-2xl p-5 shadow-sm flex flex-col justify-between min-h-[140px]">
                            <div className="flex justify-between items-start">
                              <div className="space-y-0.5 text-left">
                                <span className="text-[9px] font-bold text-[#5A5A5A] uppercase tracking-widest">Special visitors</span>
                                <h4 className="text-2xl font-black text-black mt-1"><CountUp from={0} to={14} duration={0.8} /></h4>
                                <span className="text-[9px] text-[#386B40] font-semibold flex items-center gap-1">
                                  <TrendingUp className="h-3 w-3" /> 1.2 more than usual
                                </span>
                              </div>
                              <button className="p-1 rounded hover:bg-[#F4F8F4] text-[#5A5A5A] cursor-pointer"><ExternalLink className="h-3 w-3" /></button>
                            </div>
                            <div className="h-10 w-full mt-2">
                              <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={sparklineSpecial} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                  <linearGradient id="glowSpec" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#386B40" stopOpacity={0.2}/><stop offset="95%" stopColor="#386B40" stopOpacity={0}/>
                                  </linearGradient>
                                  <Area type="monotone" dataKey="val" stroke="#386B40" strokeWidth={2} fillOpacity={1} fill="url(#glowSpec)" />
                                </AreaChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Right portion sidebar widget */}
                    <div className="lg:col-span-3 space-y-6">
                      <div className="bg-white border border-[#D4E2D4] rounded-2xl p-5 shadow-sm flex flex-col justify-between min-h-[300px]">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-[10px] font-extrabold text-[#1F3A23] uppercase tracking-widest">Weekly Plan</span>
                          <button className="p-1 rounded hover:bg-[#F4F8F4] text-[#5A5A5A] cursor-pointer"><ExternalLink className="h-3 w-3" /></button>
                        </div>
                        <div className="flex flex-col items-center justify-center py-4 space-y-2 relative">
                          <div className="relative h-24 w-24 flex items-center justify-center">
                            <svg className="h-full w-full transform -rotate-90">
                              <circle cx="48" cy="48" r={radius} fill="transparent" stroke="#EBF2EB" strokeWidth={strokeWidth} />
                              <motion.circle cx="48" cy="48" r={radius} fill="transparent" stroke="#386B40" strokeWidth={strokeWidth} strokeDasharray={circumference}
                                animate={{ strokeDashoffset }} transition={{ type: 'spring', stiffness: 60, damping: 10 }} strokeLinecap="round" />
                            </svg>
                            <span className="absolute text-lg font-black text-black">{weeklyCompletionRate}%</span>
                          </div>
                          <span className="text-[10px] text-[#5A5A5A] font-bold">Autosaver delivery active</span>
                        </div>
                        <div className="space-y-2 pt-2 border-t border-[#EBF2EB]">
                          {weeklyTasks.map((t) => (
                            <div key={t.id} onClick={() => handleToggleTask(t.id)} className="flex items-center justify-between text-xs font-semibold hover:bg-[#F4F8F4] p-1.5 rounded-lg transition cursor-pointer">
                              <span className={`${t.completed ? 'line-through text-[#5A5A5A] font-medium' : 'text-[#1F3A23] font-bold'}`}>{t.label}</span>
                              <input type="checkbox" checked={t.completed} onChange={() => {}} className="h-4 w-4 rounded accent-[#386B40] pointer-events-none" />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-[#1F3A23] text-white rounded-2xl p-5 shadow-sm flex flex-col justify-between min-h-[300px]">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Today's Courses</span>
                          <button className="p-1 rounded bg-white/10 hover:bg-white/20 text-white cursor-pointer"><ExternalLink className="h-3 w-3" /></button>
                        </div>
                        <div className="space-y-2 flex-1 flex flex-col justify-center">
                          {todayCourses.map((c) => (
                            <div key={c.id} onClick={() => handleToggleCourse(c.id)} className="flex items-center justify-between text-xs font-bold hover:bg-white/10 p-1.5 rounded-lg transition cursor-pointer">
                              <span className={`${c.completed ? 'text-white/60 font-medium' : 'text-white font-extrabold'}`}>{c.label}</span>
                              <input type="checkbox" checked={c.completed} onChange={() => {}} className="h-3.5 w-3.5 rounded accent-[#386B40] pointer-events-none" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Upcoming payments list */}
                  <div className="bg-white border border-[#D4E2D4] rounded-2xl p-6 shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="space-y-0.5 text-left">
                        <span className="text-[10px] font-bold text-[#5A5A5A] uppercase tracking-widest">Track due billings</span>
                        <h3 className="text-sm font-extrabold text-[#1F3A23]">Upcoming Payments Ledger</h3>
                      </div>
                      <div className="bg-[#F4F7F4] p-1 rounded-lg border border-[#D4E2D4] flex gap-1 text-[10px] font-bold">
                        {['All', 'Received', 'Pending'].map(status => (
                          <button key={status} onClick={() => setPaymentStatusFilter(status)} className={`px-3 py-1 rounded-md transition cursor-pointer ${paymentStatusFilter === status ? 'bg-[#386B40] text-white shadow-xs' : 'text-[#5A5A5A] hover:text-black'}`}>
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-[#EBF2EB] text-[10px] font-bold text-[#5A5A5A] uppercase">
                            <th className="py-3 px-2">Student ID</th><th className="py-3 px-2">Class</th><th className="py-3 px-2">Student Name</th><th className="py-3 px-2">Tutor Name</th><th className="py-3 px-2">Start Date</th><th className="py-3 px-2 text-right">Fee</th><th className="py-3 px-2 text-right">Due</th><th className="py-3 px-2 text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F8FAF8] text-xs font-semibold text-[#1F3A23]">
                          {filteredPayments.map((p) => (
                            <tr key={p.id} className="hover:bg-[#F8FAF8] transition">
                              <td className="py-3 px-2 font-bold text-black">{p.id}</td>
                              <td className="py-3 px-2 text-[#5A5A5A]">{p.classId}</td>
                              <td className="py-3 px-2 font-black">{p.studentName}</td>
                              <td className="py-3 px-2 text-[#5A5A5A]">{p.tutorName}</td>
                              <td className="py-3 px-2 text-[#5A5A5A]">{p.date}</td>
                              <td className="py-3 px-2 text-right">£{p.fee.toLocaleString()}</td>
                              <td className="py-3 px-2 text-right text-red-600">£{p.due.toLocaleString()}</td>
                              <td className="py-3 px-2 text-right">
                                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold ${p.status === 'Received' ? 'bg-emerald/10 text-emerald border border-emerald/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                                  {p.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* --- 2. REPORTS TAB VIEW --- */}
              {activeTab === 'Reports' && (
                <div className="space-y-6">
                  <div className="bg-white border border-[#D4E2D4] p-6 rounded-2xl shadow-sm text-left">
                    <h3 className="text-base font-extrabold text-[#1F3A23]">SkillSphere Documentation & Reports Library</h3>
                    <p className="text-xs text-[#5A5A5A] mt-1">Select standard formats to generate instant PDF presentations, grades audits, or billing statements spreadsheets.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {reportTypes.map((rep) => {
                      const isCompiling = generatingReportId === rep.id;
                      return (
                        <div key={rep.id} className="bg-white border border-[#D4E2D4] p-6 rounded-2xl shadow-sm flex flex-col justify-between min-h-[220px] text-left">
                          <div className="space-y-3">
                            <span className="bg-[#EAF2EB] text-[#2D5A27] text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                              Format: {rep.format}
                            </span>
                            <h4 className="text-sm font-black text-black">{rep.title}</h4>
                            <p className="text-xs text-[#5A5A5A] leading-relaxed">{rep.desc}</p>
                          </div>

                          <div className="pt-4 border-t border-[#F4F7F4] mt-4 space-y-3">
                            {isCompiling && (
                              <div className="space-y-1">
                                <div className="flex justify-between text-[10px] font-bold text-[#386B40]">
                                  <span>Compiling records...</span>
                                  <span>{reportProgress}%</span>
                                </div>
                                <div className="h-1 bg-[#F4F7F4] rounded-full overflow-hidden">
                                  <motion.div className="h-full bg-[#386B40]" initial={{ width: 0 }} animate={{ width: `${reportProgress}%` }} />
                                </div>
                              </div>
                            )}

                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleGenerateReport(rep)}
                                disabled={isCompiling}
                                className="flex-1 py-2 px-3 text-xs font-bold bg-[#386B40] hover:bg-[#2D5A27] text-white rounded-xl shadow-xs transition disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
                              >
                                <Download className="h-3.5 w-3.5" /> Generate Report
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* --- 3. TUTORS TAB VIEW --- */}
              {activeTab === 'Tutors' && (
                <div className="space-y-6">
                  {/* Actions Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white border border-[#D4E2D4] p-5 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-3">
                      <select 
                        value={deptFilter} 
                        onChange={(e) => setDeptFilter(e.target.value)}
                        className="text-xs font-bold bg-[#F4F7F4] border border-[#D4E2D4] px-3.5 py-1.5 rounded-xl focus:outline-none cursor-pointer"
                      >
                        <option value="All">All Departments</option>
                        <option value="Engineering & tech">Engineering & Tech</option>
                        <option value="Languages & Arts">Languages & Arts</option>
                        <option value="Digital Design">Digital Design</option>
                        <option value="Marketing & SMM">Marketing & SMM</option>
                        <option value="Sciences">Sciences</option>
                        <option value="Public Speaking">Public Speaking</option>
                      </select>
                      <span className="text-xs font-semibold text-[#5A5A5A]">Found {filteredTutors.length} tutors</span>
                    </div>

                    <button 
                      onClick={() => setShowTutorModal(true)}
                      className="px-4 py-2.5 bg-[#386B40] hover:bg-[#2D5A27] text-white text-xs font-bold rounded-xl transition shadow-sm flex items-center gap-1.5 cursor-pointer border border-transparent"
                    >
                      <Plus className="h-4 w-4" /> Add Tutor Profile
                    </button>
                  </div>

                  {/* Tutors Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTutors.map((tut) => (
                      <div key={tut.id} className="bg-white border border-[#D4E2D4] p-5 rounded-2xl shadow-sm flex flex-col justify-between min-h-[200px] text-left">
                        <div className="space-y-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-sm font-black text-black">{tut.name}</h4>
                              <p className="text-[10px] text-[#5A5A5A] font-bold uppercase tracking-wider mt-0.5">{tut.dept}</p>
                            </div>
                            <span className={`h-2.5 w-2.5 rounded-full ${tut.status === 'Online' ? 'bg-[#386B40] animate-pulse' : 'bg-gray-300'}`} title={tut.status} />
                          </div>

                          <div className="grid grid-cols-3 gap-2 pt-2 text-center border-t border-[#F4F7F4]">
                            <div className="bg-[#F8FAF8] p-1.5 rounded-lg">
                              <p className="text-xs font-extrabold text-black">{tut.courses}</p>
                              <span className="text-[8px] text-[#5A5A5A] font-bold uppercase block">Courses</span>
                            </div>
                            <div className="bg-[#F8FAF8] p-1.5 rounded-lg">
                              <p className="text-xs font-extrabold text-black">{tut.hours}h</p>
                              <span className="text-[8px] text-[#5A5A5A] font-bold uppercase block">Taught</span>
                            </div>
                            <div className="bg-[#F8FAF8] p-1.5 rounded-lg">
                              <p className="text-xs font-extrabold text-[#386B40]">★ {tut.rating}</p>
                              <span className="text-[8px] text-[#5A5A5A] font-bold uppercase block">Rating</span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 mt-4 border-t border-[#F4F7F4] flex justify-between items-center">
                          <span className="text-[10px] text-dark-grey font-mono uppercase bg-[#F8FAF8] px-2 py-0.5 rounded border border-[#EBF2EB]">{tut.id}</span>
                          <div className="flex items-center gap-1.5">
                            <button onClick={() => triggerToast(`Contacting ${tut.name}...`)} className="p-1.5 hover:bg-[#EAF2EB] text-[#5A5A5A] hover:text-[#386B40] rounded transition cursor-pointer" title="Message"><MessageSquare className="h-4 w-4" /></button>
                            <button onClick={() => deleteTutor(tut.id)} className="p-1.5 hover:bg-red-500/10 text-red-500 rounded transition cursor-pointer" title="Remove Profile"><Trash2 className="h-4 w-4" /></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- 4. STUDENTS TAB VIEW --- */}
              {activeTab === 'Students' && (
                <div className="space-y-6">
                  {/* Actions Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white border border-[#D4E2D4] p-5 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#F4F7F4] p-1 rounded-lg border border-[#D4E2D4] flex gap-1 text-[10px] font-bold">
                        {['All', 'Active', 'Warning'].map(status => (
                          <button key={status} onClick={() => setStudentStatusFilter(status)} className={`px-3 py-1 rounded-md transition cursor-pointer ${studentStatusFilter === status ? 'bg-[#386B40] text-white shadow-xs' : 'text-[#5A5A5A] hover:text-black'}`}>
                            {status}
                          </button>
                        ))}
                      </div>
                      <span className="text-xs font-semibold text-[#5A5A5A]">Found {filteredStudents.length} students</span>
                    </div>

                    <button 
                      onClick={() => setShowStudentModal(true)}
                      className="px-4 py-2.5 bg-[#386B40] hover:bg-[#2D5A27] text-white text-xs font-bold rounded-xl transition shadow-sm flex items-center gap-1.5 cursor-pointer border border-transparent"
                    >
                      <Plus className="h-4 w-4" /> Register Student
                    </button>
                  </div>

                  {/* Students Database list */}
                  <div className="bg-white border border-[#D4E2D4] rounded-2xl p-6 shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-[#EBF2EB] text-[10px] font-bold text-[#5A5A5A] uppercase">
                            <th className="py-3 px-2">Student ID</th><th className="py-3 px-2">Student Name</th><th className="py-3 px-2">Class</th><th className="py-3 px-2 text-right">Attendance</th><th className="py-3 px-2 text-right">Grade (GPA)</th><th className="py-3 px-2 text-right">Status</th><th className="py-3 px-2 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F8FAF8] text-xs font-semibold text-[#1F3A23]">
                          {filteredStudents.map((s) => (
                            <tr key={s.id} className="hover:bg-[#F8FAF8] transition">
                              <td className="py-3 px-2 font-mono text-[#5A5A5A]">{s.id}</td>
                              <td className="py-3 px-2 font-black text-black">{s.name}</td>
                              <td className="py-3 px-2 text-[#5A5A5A]">{s.classId}</td>
                              <td className="py-3 px-2 text-right">{s.attendance}%</td>
                              <td className="py-3 px-2 text-right text-[#386B40]">{s.grade}</td>
                              <td className="py-3 px-2 text-right">
                                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold ${s.status === 'Active' ? 'bg-[#386B40]/10 text-[#386B40]' : 'bg-red-500/10 text-red-500'}`}>
                                  {s.status}
                                </span>
                              </td>
                              <td className="py-3 px-2 text-right">
                                <button onClick={() => deleteStudent(s.id)} className="p-1 hover:bg-red-500/10 text-red-500 rounded transition cursor-pointer">
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* --- 5. ANALYTICS TAB VIEW --- */}
              {activeTab === 'Analytics' && (
                <div className="space-y-6">
                  {/* Stats review row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white border border-[#D4E2D4] p-5 rounded-2xl shadow-sm text-left">
                      <span className="text-[10px] font-bold text-[#5A5A5A] uppercase tracking-wider block">Average Study Velocity</span>
                      <p className="text-2xl font-black text-black mt-1"><CountUp from={0} to={12.3} duration={1.0} decimals={1} /> hrs/wk</p>
                      <span className="text-[9px] text-[#386B40] font-semibold flex items-center gap-0.5 mt-0.5"><TrendingUp className="h-3 w-3" /> +1.2h vs last week</span>
                    </div>
                    <div className="bg-white border border-[#D4E2D4] p-5 rounded-2xl shadow-sm text-left">
                      <span className="text-[10px] font-bold text-[#5A5A5A] uppercase tracking-wider block">Cohort Retention Index</span>
                      <p className="text-2xl font-black text-black mt-1"><CountUp from={0} to={94} duration={1.0} />%</p>
                      <span className="text-[9px] text-[#386B40] font-semibold flex items-center gap-0.5 mt-0.5"><TrendingUp className="h-3 w-3" /> System baseline optimal</span>
                    </div>
                    <div className="bg-white border border-[#D4E2D4] p-5 rounded-2xl shadow-sm text-left">
                      <span className="text-[10px] font-bold text-[#5A5A5A] uppercase tracking-wider block">Tutor Satisfaction Rate</span>
                      <p className="text-2xl font-black text-[#386B40] mt-1"><CountUp from={0} to={4.8} duration={1.0} decimals={1} />/5.0</p>
                      <span className="text-[9px] text-[#5A5A5A] font-semibold block mt-0.5">Based on 284 review audits</span>
                    </div>
                  </div>

                  {/* Analytical Charts */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Monthly Growth of Students (Area Chart) */}
                    <div className="bg-white border border-[#D4E2D4] rounded-2xl p-6 shadow-sm text-left flex flex-col justify-between min-h-[350px]">
                      <div className="space-y-0.5 mb-4">
                        <h4 className="text-sm font-extrabold text-black">Monthly Student growth vs Active logins</h4>
                        <p className="text-[10px] text-[#5A5A5A]">Auditing active enrollment pools versus classroom logins</p>
                      </div>
                      <div className="flex-1 min-h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={monthlyEnrollmentData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                            <defs>
                              <linearGradient id="activeSph" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#386B40" stopOpacity={0.35}/>
                                <stop offset="95%" stopColor="#386B40" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#EBF2EB" />
                            <XAxis dataKey="name" stroke="#5A5A5A" fontSize={9} tickLine={false} />
                            <YAxis stroke="#5A5A5A" fontSize={9} tickLine={false} />
                            <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#DADCEA' }} />
                            <Area type="monotone" dataKey="active" stroke="#386B40" strokeWidth={2.5} fillOpacity={1} fill="url(#activeSph)" name="Active Logins" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Tutor feedback rating (Bar Chart) */}
                    <div className="bg-white border border-[#D4E2D4] rounded-2xl p-6 shadow-sm text-left flex flex-col justify-between min-h-[350px]">
                      <div className="space-y-0.5 mb-4">
                        <h4 className="text-sm font-extrabold text-black">Tutor Feedback Ratings</h4>
                        <p className="text-[10px] text-[#5A5A5A]">Averages of student-logged satisfaction ratings</p>
                      </div>
                      <div className="flex-1 min-h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={tutorSatisfactionData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#EBF2EB" />
                            <XAxis dataKey="name" stroke="#5A5A5A" fontSize={8} tickLine={false} />
                            <YAxis stroke="#5A5A5A" fontSize={9} tickLine={false} domain={[4, 5]} />
                            <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#DADCEA' }} />
                            <Bar dataKey="rating" fill="#5C4F61" radius={[4, 4, 0, 0]} name="Feedback Rating" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

        </main>
      </div>

      {/* --- ADD TUTOR MODAL DIALOG --- */}
      <AnimatePresence>
        {showTutorModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowTutorModal(false)} className="fixed inset-0 bg-black/50 backdrop-blur-xs" />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 15 }} 
              className="bg-white border border-[#D4E2D4] rounded-2xl max-w-md w-full shadow-2xl p-6 relative z-10 text-left"
            >
              <div className="flex justify-between items-center pb-3 border-b border-[#F4F7F4] mb-4">
                <h3 className="text-sm font-extrabold text-[#1F3A23]">Add Tutor Profile</h3>
                <button onClick={() => setShowTutorModal(false)} className="p-1 hover:bg-[#F4F8F4] text-dark-grey rounded-full"><X className="h-4 w-4" /></button>
              </div>

              <form onSubmit={saveTutor} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#5A5A5A] uppercase">Full Name</label>
                  <input type="text" required value={newTutor.name} onChange={(e) => setNewTutor({...newTutor, name: e.target.value})} placeholder="e.g. Dr. Jane Foster" className="w-full text-xs font-semibold bg-[#F4F7F4] border border-[#D4E2D4] px-3.5 py-2.5 rounded-xl focus:outline-none" />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#5A5A5A] uppercase">Department</label>
                  <select value={newTutor.dept} onChange={(e) => setNewTutor({...newTutor, dept: e.target.value})} className="w-full text-xs font-semibold bg-[#F4F7F4] border border-[#D4E2D4] px-3.5 py-2.5 rounded-xl focus:outline-none">
                    <option>Engineering & tech</option><option>Languages & Arts</option><option>Digital Design</option><option>Marketing & SMM</option><option>Sciences</option><option>Public Speaking</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#5A5A5A] uppercase">Courses count</label>
                    <input type="number" min="1" max="10" required value={newTutor.courses} onChange={(e) => setNewTutor({...newTutor, courses: parseInt(e.target.value)})} className="w-full text-xs font-semibold bg-[#F4F7F4] border border-[#D4E2D4] px-3.5 py-2.5 rounded-xl focus:outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#5A5A5A] uppercase">Hours taught</label>
                    <input type="number" min="0" required value={newTutor.hours} onChange={(e) => setNewTutor({...newTutor, hours: parseInt(e.target.value)})} className="w-full text-xs font-semibold bg-[#F4F7F4] border border-[#D4E2D4] px-3.5 py-2.5 rounded-xl focus:outline-none" />
                  </div>
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <button type="button" onClick={() => setShowTutorModal(false)} className="px-4 py-2 text-xs font-bold border border-[#D4E2D4] text-[#5A5A5A] hover:bg-[#F4F8F4] rounded-xl transition">Cancel</button>
                  <button type="submit" className="px-4 py-2 text-xs font-bold bg-[#386B40] hover:bg-[#2D5A27] text-white rounded-xl transition">Add Tutor</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- REGISTER STUDENT MODAL DIALOG --- */}
      <AnimatePresence>
        {showStudentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowStudentModal(false)} className="fixed inset-0 bg-black/50 backdrop-blur-xs" />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 15 }} 
              className="bg-white border border-[#D4E2D4] rounded-2xl max-w-md w-full shadow-2xl p-6 relative z-10 text-left"
            >
              <div className="flex justify-between items-center pb-3 border-b border-[#F4F7F4] mb-4">
                <h3 className="text-sm font-extrabold text-[#1F3A23]">Register Student</h3>
                <button onClick={() => setShowStudentModal(false)} className="p-1 hover:bg-[#F4F8F4] text-dark-grey rounded-full"><X className="h-4 w-4" /></button>
              </div>

              <form onSubmit={saveStudent} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#5A5A5A] uppercase">Student Name</label>
                  <input type="text" required value={newStudent.name} onChange={(e) => setNewStudent({...newStudent, name: e.target.value})} placeholder="e.g. Timothy Vance" className="w-full text-xs font-semibold bg-[#F4F7F4] border border-[#D4E2D4] px-3.5 py-2.5 rounded-xl focus:outline-none" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#5A5A5A] uppercase">Class ID</label>
                    <input type="text" required value={newStudent.classId} onChange={(e) => setNewStudent({...newStudent, classId: e.target.value})} placeholder="A123" className="w-full text-xs font-semibold bg-[#F4F7F4] border border-[#D4E2D4] px-3.5 py-2.5 rounded-xl focus:outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#5A5A5A] uppercase">GPA Grade</label>
                    <select value={newStudent.grade} onChange={(e) => setNewStudent({...newStudent, grade: e.target.value})} className="w-full text-xs font-semibold bg-[#F4F7F4] border border-[#D4E2D4] px-3.5 py-2.5 rounded-xl focus:outline-none">
                      <option>A+</option><option>A</option><option>A-</option><option>B+</option><option>B</option><option>B-</option><option>C</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#5A5A5A] uppercase">Attendance Rate (%)</label>
                  <input type="number" min="0" max="100" required value={newStudent.attendance} onChange={(e) => setNewStudent({...newStudent, attendance: parseInt(e.target.value)})} className="w-full text-xs font-semibold bg-[#F4F7F4] border border-[#D4E2D4] px-3.5 py-2.5 rounded-xl focus:outline-none" />
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <button type="button" onClick={() => setShowStudentModal(false)} className="px-4 py-2 text-xs font-bold border border-[#D4E2D4] text-[#5A5A5A] hover:bg-[#F4F8F4] rounded-xl transition">Cancel</button>
                  <button type="submit" className="px-4 py-2 text-xs font-bold bg-[#386B40] hover:bg-[#2D5A27] text-white rounded-xl transition">Register</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
