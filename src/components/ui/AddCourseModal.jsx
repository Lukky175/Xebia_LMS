import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Layers, Award, Image, Users, HelpCircle } from 'lucide-react';
import BorderGlow from '@/components/ui/BorderGlow.jsx';
import { useTheme } from '@/context/ThemeContext.jsx';

export default function AddCourseModal({ isOpen, onClose, onAdd, defaultInstructorName }) {
  const { theme } = useTheme();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Frontend');
  const [instructor, setInstructor] = useState(defaultInstructorName || '');
  const [level, setLevel] = useState('Intermediate');
  const [lessons, setLessons] = useState(15);
  const [image, setImage] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [allowedOrganisation, setAllowedOrganisation] = useState('Xebia');
  const [error, setError] = useState('');

  const randomImages = [
    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Course title is required.');
      return;
    }

    if (!instructor.trim()) {
      setError('Instructor name is required.');
      return;
    }

    const selectedImage = image.trim() || randomImages[Math.floor(Math.random() * randomImages.length)];

    onAdd({
      title,
      category,
      instructor,
      level,
      lessons: parseInt(lessons, 10),
      image: selectedImage,
      visibility,
      allowedOrganisations: visibility === 'restricted' ? [allowedOrganisation] : []
    });

    // Reset Form
    setTitle('');
    setImage('');
    setVisibility('public');
    setAllowedOrganisation('Xebia');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="relative w-full max-w-lg z-50 overflow-hidden"
          >
            <BorderGlow
              edgeSensitivity={15}
              glowColor="304 76 30"
              backgroundColor={theme === 'dark' ? '#16171F' : '#FFFFFF'}
              borderRadius={20}
              glowRadius={40}
              glowIntensity={1.8}
            >
              <div className="bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] p-6 rounded-2xl space-y-4">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-medium-grey/40 dark:border-[#282A3A]/40 pb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-tranquil-velvet" />
                    <h3 className="text-sm font-extrabold text-black dark:text-white uppercase tracking-wider">
                      Add New Course Proposal
                    </h3>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-1.5 hover:bg-medium-grey/40 dark:hover:bg-white/5 rounded-lg text-dark-grey hover:text-black dark:hover:text-white transition cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {error && (
                  <div className="text-xs text-red-500 font-semibold bg-red-500/10 border border-red-500/20 p-2.5 rounded-xl text-center">
                    {error}
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  
                  {/* Title */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold text-text-secondary uppercase tracking-wider block">
                      Course Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mastering Kubernetes Microservices"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="w-full text-xs font-medium p-3 rounded-xl border border-medium-grey/60 dark:border-[#2D3043] focus:outline-hidden focus:border-tranquil-velvet transition bg-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Category */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold text-text-secondary uppercase tracking-wider block">
                        Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full text-xs font-medium p-3 rounded-xl border border-medium-grey/60 dark:border-[#2D3043] focus:outline-hidden focus:border-tranquil-velvet transition bg-white dark:bg-[#16171F]"
                      >
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="DevOps">DevOps</option>
                        <option value="Architecture">Architecture</option>
                        <option value="Design">Design</option>
                        <option value="Management">Management</option>
                      </select>
                    </div>

                    {/* Level */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold text-text-secondary uppercase tracking-wider block">
                        Difficulty Level
                      </label>
                      <select
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        className="w-full text-xs font-medium p-3 rounded-xl border border-medium-grey/60 dark:border-[#2D3043] focus:outline-hidden focus:border-tranquil-velvet transition bg-white dark:bg-[#16171F]"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Instructor */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold text-text-secondary uppercase tracking-wider block">
                        Instructor Name
                      </label>
                      <input
                        type="text"
                        placeholder="Instructor Name"
                        value={instructor}
                        onChange={(e) => setInstructor(e.target.value)}
                        required
                        className="w-full text-xs font-medium p-3 rounded-xl border border-medium-grey/60 dark:border-[#2D3043] focus:outline-hidden focus:border-tranquil-velvet transition bg-transparent"
                      />
                    </div>

                    {/* Lessons */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold text-text-secondary uppercase tracking-wider block">
                        Lessons count
                      </label>
                      <input
                        type="number"
                        min="5"
                        max="100"
                        value={lessons}
                        onChange={(e) => setLessons(e.target.value)}
                        required
                        className="w-full text-xs font-medium p-3 rounded-xl border border-medium-grey/60 dark:border-[#2D3043] focus:outline-hidden focus:border-tranquil-velvet transition bg-transparent"
                      />
                    </div>
                  </div>

                  {/* Image URL */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold text-text-secondary uppercase tracking-wider block">
                      Image URL (Optional)
                    </label>
                    <input
                      type="url"
                      placeholder="Leave empty for a random high-quality visual"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      className="w-full text-xs font-medium p-3 rounded-xl border border-medium-grey/60 dark:border-[#2D3043] focus:outline-hidden focus:border-tranquil-velvet transition bg-transparent"
                    />
                  </div>

                  {/* Course Visibility Scope */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold text-text-secondary uppercase tracking-wider block">
                        Visibility Scope
                      </label>
                      <select
                        value={visibility}
                        onChange={(e) => setVisibility(e.target.value)}
                        className="w-full text-xs font-medium p-3 rounded-xl border border-medium-grey/60 dark:border-[#2D3043] focus:outline-hidden focus:border-tranquil-velvet transition bg-white dark:bg-[#16171F]"
                      >
                        <option value="public">Public (All Orgs)</option>
                        <option value="restricted">Restricted to Org</option>
                      </select>
                    </div>

                    {visibility === 'restricted' && (
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-extrabold text-text-secondary uppercase tracking-wider block">
                          Allowed Organization
                        </label>
                        <select
                          value={allowedOrganisation}
                          onChange={(e) => setAllowedOrganisation(e.target.value)}
                          className="w-full text-xs font-medium p-3 rounded-xl border border-medium-grey/60 dark:border-[#2D3043] focus:outline-hidden focus:border-tranquil-velvet transition bg-white dark:bg-[#16171F]"
                        >
                          <option value="Xebia">Xebia</option>
                          <option value="Google">Google</option>
                          <option value="Microsoft">Microsoft</option>
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Footer actions */}
                  <div className="flex justify-end gap-3 pt-3 border-t border-medium-grey/40 dark:border-[#282A3A]/40 mt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 bg-blueish-grey hover:bg-medium-grey/30 dark:bg-bg-page dark:hover:bg-[#1E1F29] border border-medium-grey dark:border-border-card text-black dark:text-white text-xs font-bold rounded-xl transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-cta-orange hover:bg-[#E05600] text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-md shadow-cta-orange/10"
                    >
                      Propose Course
                    </button>
                  </div>

                </form>

              </div>
            </BorderGlow>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
