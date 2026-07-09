import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle, FileText, Archive, Plus, Trash2, Edit2, Star, Users, ShieldAlert, X, Loader2} from 'lucide-react';
import CountUp from '@/components/ui/CountUp.jsx';
import BorderGlow from '@/components/ui/BorderGlow.jsx';
import AddCourseModal from '@/components/ui/AddCourseModal.jsx';
import { useTheme } from '@/context/ThemeContext.jsx';
import { api } from '@/services/api.js';


const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=400&q=80',
];

const EMPTY_FORM = {
  title: '',
  instructor: '',
  category: '',
  level: 'Beginner',
  duration: '',
  lessons: '',
  image: '',
};

export default function CoursesPage({ courses, handleSimulateProgress, searchQuery, loading }) {
import { useAuth } from '@/context/AuthContext.jsx';

export default function CoursesPage({ 
  courses, 
  handleSimulateProgress, 
  handleAddCourse, 
  handleApproveCourse, 
  handleDeleteCourse, 
  searchQuery, 
  loading 
}) {
  const { theme } = useTheme();
  const { currentUser } = useAuth();
  const [localCourses, setLocalCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ── Modal state ──────────────────────────────────────────────────────────────
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    setLocalCourses(courses);
  }, [courses]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="h-10 w-10 border-4 border-tranquil-velvet border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const activeSearch = searchQuery || '';

  // Filter courses based on user role, organization visibility, and search terms
  const getFilteredCourses = () => {
    const searched = localCourses.filter(course => 
      course.title.toLowerCase().includes(activeSearch.toLowerCase()) ||
      course.instructor.toLowerCase().includes(activeSearch.toLowerCase()) ||
      course.category.toLowerCase().includes(activeSearch.toLowerCase())
    );

    // Filter by Organization Scope
    const scoped = searched.filter(course => {
      // Admins and Superadmins bypass checks
      if (currentUser?.role === 'admin' || currentUser?.role === 'superadmin') {
        return true;
      }
      // Trainers see their own courses
      if (currentUser?.role === 'trainer' && course.instructor === currentUser.name) {
        return true;
      }
      // Public courses are visible to everyone
      if (course.visibility === 'public' || !course.visibility) {
        return true;
      }
      // Restricted check matching user's organisation
      if (course.visibility === 'restricted') {
        return course.allowedOrganisations?.includes(currentUser?.organisation);
      }
      return false;
    });

    if (currentUser?.role === 'admin' || currentUser?.role === 'superadmin') {
      // Admins see published courses in the catalog list (pending list is rendered separately)
      return scoped.filter(c => c.status === 'published');
    }

    if (currentUser?.role === 'trainer') {
      // Trainers see all published courses plus their own pending proposals
      return scoped.filter(c => c.status === 'published' || (c.status === 'pending' && c.instructor === currentUser.name));
    }

    // Students only see published courses
    return scoped.filter(c => c.status === 'published');
  };

  const filteredCourses = getFilteredCourses();

  // Extract pending courses for admin review
  const pendingCourses = localCourses.filter(c => 
    c.status === 'pending' &&
    (c.title.toLowerCase().includes(activeSearch.toLowerCase()) ||
     c.instructor.toLowerCase().includes(activeSearch.toLowerCase()) ||
     c.category.toLowerCase().includes(activeSearch.toLowerCase()))
  );

  const handleSimulateClick = (id) => {
    handleSimulateProgress(id);
    setLocalCourses(prev => 
      prev.map(c => {
        if (c.id === id) {
          const nextCompleted = Math.min(c.lessons, c.completedLessons + 1);
          return {
            ...c,
            completedLessons: nextCompleted,
            progress: Math.round((nextCompleted / c.lessons) * 100)
          };
        }
        return c;
      })
    );
  };

  // ── Add course handlers ───────────────────────────────────────────────────────
  const handleFieldChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setFormError('');
  };

  const handleOpenModal = () => {
    setFormData(EMPTY_FORM);
    setFormError('');
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    if (submitting) return;
    setShowAddModal(false);
    setFormData(EMPTY_FORM);
    setFormError('');
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const { title, instructor, category, duration, lessons } = formData;
    if (!title.trim() || !instructor.trim() || !category.trim() || !duration.trim() || !lessons) {
      setFormError('Please fill in all required fields.');
      return;
    }
    const lessonCount = parseInt(lessons, 10);
    if (isNaN(lessonCount) || lessonCount < 1) {
      setFormError('Number of lessons must be a positive number.');
      return;
    }

    setSubmitting(true);
    try {
      const randomDefault = DEFAULT_IMAGES[Math.floor(Math.random() * DEFAULT_IMAGES.length)];
      const coursePayload = {
        title: title.trim(),
        instructor: instructor.trim(),
        category: category.trim(),
        level: formData.level,
        duration: duration.trim(),
        lessons: lessonCount,
        image: formData.image.trim() || randomDefault,
      };
      const updated = await api.addCourse(coursePayload);
      setLocalCourses(updated);
      setShowAddModal(false);
      setFormData(EMPTY_FORM);
    } catch (err) {
      console.error('Failed to add course:', err);
      setFormError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const isDark = theme === 'dark';

  // ── Input class helper ────────────────────────────────────────────────────────
  const inputCls =
    'w-full px-4 py-2.5 bg-white dark:bg-[#0D0E16] border border-medium-grey dark:border-[#282A3A] rounded-xl text-sm text-black dark:text-white placeholder-dark-grey focus:outline-none focus:ring-2 focus:ring-tranquil-velvet/40 focus:border-tranquil-velvet transition';
  const labelCls = 'block text-[11px] font-bold uppercase tracking-wider text-dark-grey mb-1.5';
  const handleAddNewCourse = (courseData) => {
    // If trainer logs in, status is pending. If admin, it is published.
    const status = (currentUser?.role === 'trainer') ? 'pending' : 'published';
    handleAddCourse({
      ...courseData,
      status
    });
  };

  // Compute stat counts
  const publishedCount = localCourses.filter(c => c.status === 'published').length;
  const pendingCount = localCourses.filter(c => c.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total Courses', count: localCourses.length, icon: BookOpen, color: '304 76 30' },
          { title: 'Published', count: localCourses.length, icon: CheckCircle, color: '176 99 34' },
          { title: 'Drafts', count: 5, icon: FileText, color: '304 76 30' },
          { title: 'Total Courses', count: publishedCount, icon: BookOpen, color: '304 76 30' },
          { title: 'Published', count: publishedCount, icon: CheckCircle, color: '176 99 34' },
          { title: 'Pending Approval', count: pendingCount, icon: FileText, color: '30 90 200' },
          { title: 'Archived', count: 0, icon: Archive, color: '176 99 34' }
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <BorderGlow
              key={idx}
              edgeSensitivity={20}
              glowColor={stat.color}
              backgroundColor={isDark ? '#16171F' : '#FFFFFF'}
              borderRadius={16}
              glowRadius={30}
              glowIntensity={1.2}
            >
              <div className="p-5 flex justify-between items-center bg-white dark:bg-[#16171F] rounded-2xl">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-dark-grey uppercase tracking-wider">{stat.title}</span>
                  <p className="text-2xl font-extrabold text-black dark:text-white">
                    <CountUp from={0} to={stat.count} duration={1.0} />
                  </p>
                </div>
                <div className="h-10 w-10 bg-tranquil-velvet/10 dark:bg-tranquil-velvet-dark/30 rounded-xl flex items-center justify-center text-tranquil-velvet dark:text-amber-400">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </BorderGlow>
          );
        })}
      </div>

      {/* Admin Realtime Approvals Section */}
      {(currentUser?.role === 'admin' || currentUser?.role === 'superadmin') && pendingCourses.length > 0 && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-cta-orange/15 to-amber-500/15 border border-cta-orange/30 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-cta-orange uppercase tracking-wider flex items-center gap-1.5">
                Pending Course Proposals ({pendingCourses.length}) <span className="h-2.5 w-2.5 rounded-full bg-cta-orange animate-pulse"></span>
              </h3>
              <p className="text-[10px] text-text-secondary">Trainers have proposed new courses. Review and approve them in real time to publish.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingCourses.map(course => (
              <BorderGlow
                key={course.id}
                edgeSensitivity={15}
                glowColor="30 90 200"
                backgroundColor={theme === 'dark' ? '#16171F' : '#FFFFFF'}
                borderRadius={16}
                glowRadius={40}
                glowIntensity={1.5}
              >
                <div className="bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl overflow-hidden flex flex-col justify-between h-full p-5 space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] bg-tranquil-velvet/10 text-tranquil-velvet border border-tranquil-velvet/20 px-2 py-0.5 rounded font-bold uppercase">
                        {course.category}
                      </span>
                      <div className="flex gap-1.5">
                        {course.visibility === 'restricted' && (
                          <span className="text-[9px] bg-blue-500/10 text-blue-500 font-bold uppercase px-2 py-0.5 rounded">
                            {course.allowedOrganisations?.[0]}
                          </span>
                        )}
                        <span className="text-[9px] bg-cta-orange/10 text-cta-orange font-bold uppercase px-2 py-0.5 rounded">
                          Pending
                        </span>
                      </div>
                    </div>
                    <h4 className="text-sm font-extrabold text-black dark:text-white line-clamp-1">{course.title}</h4>
                    <p className="text-[10px] text-dark-grey">Proposed by: <b className="text-black dark:text-white">{course.instructor}</b></p>
                    <p className="text-[10px] text-dark-grey">Level: <b>{course.level}</b> | Lessons: <b>{course.lessons}</b></p>
                  </div>
                  <div className="flex gap-2 pt-2 border-t border-medium-grey/40 dark:border-[#282A3A]/40">
                    <button
                      onClick={() => handleApproveCourse(course.id)}
                      className="flex-1 py-1.5 bg-emerald hover:bg-emerald/90 text-white text-[10px] font-bold rounded-lg transition cursor-pointer text-center"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDeleteCourse(course.id)}
                      className="flex-1 py-1.5 bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold rounded-lg transition cursor-pointer text-center"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </BorderGlow>
            ))}
          </div>
        </div>
      )}

      {/* Course Grid Controls */}
      <div className="flex justify-between items-center bg-white dark:bg-[#16171F] p-4 border border-medium-grey dark:border-[#282A3A] rounded-2xl shadow-sm">
        <span className="text-xs font-bold text-black dark:text-white uppercase tracking-wider">
          Enrolled Course Catalog ({filteredCourses.length})
        </span>
        <button 
          onClick={handleOpenModal}
          className="px-4 py-2 bg-cta-orange hover:bg-[#E05600] text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-cta-orange/15 border border-transparent"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Course</span>
        </button>
        {currentUser?.role !== 'student' && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-cta-orange hover:bg-[#E05600] text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-cta-orange/15 border border-transparent"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Course</span>
          </button>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <BorderGlow
            key={course.id}
            edgeSensitivity={15}
            glowColor="304 76 30"
            backgroundColor={isDark ? '#16171F' : '#FFFFFF'}
            borderRadius={16}
            glowRadius={40}
            glowIntensity={1.8}
            className="h-full"
          >
            <div className="bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl overflow-hidden flex flex-col justify-between h-full hover:shadow-md transition">
              <div>
                <div className="h-44 relative overflow-hidden bg-white dark:bg-bg-page border-b border-medium-grey dark:border-border-card">
                  <img src={course.image} className="h-full w-full object-cover" alt="" />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[85%]">
                    <span className="text-[9px] bg-white/90 dark:bg-bg-card/90 text-tranquil-velvet dark:text-amber-400 border border-tranquil-velvet/20 px-2 py-0.5 rounded font-bold uppercase shadow-sm">
                      {course.category}
                    </span>
                    {course.visibility === 'restricted' && (
                      <span className="text-[9px] bg-blue-500 text-white px-2 py-0.5 rounded font-bold uppercase shadow-sm">
                        {course.allowedOrganisations?.[0]} Scope
                      </span>
                    )}
                    {course.status === 'pending' && (
                      <span className="text-[9px] bg-cta-orange text-white px-2 py-0.5 rounded font-bold uppercase shadow-sm">
                        Pending
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex justify-between items-center text-xs text-amber-500 font-bold">
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <span>{course.progress === 100 ? '5.0' : '4.8'}</span>
                    </span>
                    <span className="text-dark-grey font-semibold flex items-center gap-1 text-[10px]">
                      <Users className="h-3.5 w-3.5" />
                      <span>1,250 enrolled</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-black dark:text-white line-clamp-1 hover:text-tranquil-velvet transition">
                    {course.title}
                  </h3>
                  <p className="text-xs text-dark-grey font-medium leading-relaxed line-clamp-2">
                    Instructor: <span className="text-black dark:text-white font-bold">{course.instructor}</span>
                  </p>

                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-[10px] font-bold text-black dark:text-white">
                      <span>Syllabus Completion</span>
                      <span className="text-bright-velvet dark:text-amber-400">{course.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-light-grey dark:bg-bg-page rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-500 ${course.progress === 100 ? 'bg-emerald' : 'bg-gradient-to-r from-tranquil-velvet to-bright-velvet'}`} style={{ width: `${course.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-medium-grey/40 dark:border-[#282A3A]/40 flex justify-between items-center mt-3">
                {course.status === 'pending' ? (
                  <span className="text-[9px] bg-cta-orange/15 text-cta-orange border border-cta-orange/20 px-2 py-1 rounded font-bold uppercase leading-none">
                    Pending Approval
                  </span>
                ) : (
                  <button 
                    onClick={() => handleSimulateClick(course.id)}
                    className="px-3 py-1.5 bg-blueish-grey hover:bg-medium-grey/30 dark:bg-bg-page dark:hover:bg-[#1E1F29] border border-medium-grey dark:border-border-card text-black dark:text-white text-[10px] font-bold rounded-lg transition cursor-pointer"
                  >
                    Simulate Lesson
                  </button>
                )}
                
                {(currentUser?.role === 'admin' || currentUser?.role === 'superadmin' || (currentUser?.role === 'trainer' && course.instructor === currentUser.name)) && (
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => alert(`Editing course: ${course.title}`)}
                      className="p-2 hover:bg-tranquil-velvet/10 hover:text-tranquil-velvet rounded-xl transition text-dark-grey cursor-pointer"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteCourse(course.id)}
                      className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition text-dark-grey cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </BorderGlow>
        ))}
      </div>

      {/* ── Add New Course Modal ─────────────────────────────────────────────── */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) handleCloseModal(); }}
        >
          <div
            className="w-full max-w-lg bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl shadow-2xl overflow-hidden"
            style={{ animation: 'modalSlideIn 0.25s ease-out' }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-medium-grey dark:border-[#282A3A]">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-cta-orange/10 flex items-center justify-center">
                  <Plus className="h-4 w-4 text-cta-orange" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-black dark:text-white">Add New Course</h2>
                  <p className="text-[10px] text-dark-grey">Fill in the details below</p>
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                disabled={submitting}
                className="p-1.5 hover:bg-medium-grey/20 dark:hover:bg-[#282A3A] rounded-lg transition text-dark-grey cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleAddSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">

              {/* Title */}
              <div>
                <label className={labelCls}>Course Title <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFieldChange}
                  placeholder="e.g. Advanced React Patterns"
                  className={inputCls}
                  disabled={submitting}
                />
              </div>

              {/* Instructor */}
              <div>
                <label className={labelCls}>Instructor Name <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  name="instructor"
                  value={formData.instructor}
                  onChange={handleFieldChange}
                  placeholder="e.g. Sarah Jenkins"
                  className={inputCls}
                  disabled={submitting}
                />
              </div>

              {/* Category + Level — side by side */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Category <span className="text-red-400">*</span></label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleFieldChange}
                    className={inputCls}
                    disabled={submitting}
                  >
                    <option value="">Select…</option>
                    {['Frontend', 'Backend', 'DevOps', 'Architecture', 'Design', 'Data Science', 'Security', 'Mobile', 'Cloud'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Level <span className="text-red-400">*</span></label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleFieldChange}
                    className={inputCls}
                    disabled={submitting}
                  >
                    {['Beginner', 'Intermediate', 'Advanced'].map(l => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Duration + Lessons — side by side */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Duration <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleFieldChange}
                    placeholder="e.g. 12h 30m"
                    className={inputCls}
                    disabled={submitting}
                  />
                </div>
                <div>
                  <label className={labelCls}>No. of Lessons <span className="text-red-400">*</span></label>
                  <input
                    type="number"
                    name="lessons"
                    value={formData.lessons}
                    onChange={handleFieldChange}
                    placeholder="e.g. 24"
                    min="1"
                    className={inputCls}
                    disabled={submitting}
                  />
                </div>
              </div>

              {/* Image URL — optional */}
              <div>
                <label className={labelCls}>Cover Image URL <span className="text-dark-grey font-normal normal-case">(optional — a default will be used)</span></label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleFieldChange}
                  placeholder="https://..."
                  className={inputCls}
                  disabled={submitting}
                />
              </div>

              {/* Error message */}
              {formError && (
                <p className="text-xs text-red-400 font-semibold bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                  {formError}
                </p>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={submitting}
                  className="flex-1 px-4 py-2.5 border border-medium-grey dark:border-[#282A3A] text-black dark:text-white text-xs font-bold rounded-xl hover:bg-medium-grey/10 dark:hover:bg-[#282A3A] transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2.5 bg-cta-orange hover:bg-[#E05600] disabled:opacity-60 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-cta-orange/20"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Adding…</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add Course</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Slide-in animation */}
          <style>{`
            @keyframes modalSlideIn {
              from { opacity: 0; transform: translateY(-16px) scale(0.97); }
              to   { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
