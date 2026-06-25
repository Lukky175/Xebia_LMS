import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Compass, CheckCircle, Trophy, ArrowRight, Star, Clock, ChevronRight, Check } from 'lucide-react';
import HeaderNav from '../components/HeaderNav.jsx';
import Footer from '../components/Footer.jsx';
import BorderGlow from '../components/BorderGlow.jsx';
import Typewriter from '../components/Typewriter.jsx';
import CountUp from '../components/CountUp.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import heroImg from '../assets/Hero2.png';
import bg1Img from '../assets/BG1.png';

const featuredCourses = [
  {
    id: 1,
    title: "Enterprise React with Tailwind CSS",
    instructor: "Sarah Jenkins",
    category: "Frontend",
    rating: 4.9,
    reviews: 128,
    duration: "12h 45m",
    level: "Intermediate",
    description: "Build robust, state-of-the-art corporate web platforms with advanced state management and optimized rendering configurations.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    title: "Fullstack Architecture & Design Patterns",
    instructor: "Alex Rivera",
    category: "Architecture",
    rating: 4.8,
    reviews: 94,
    duration: "18h 30m",
    level: "Advanced",
    description: "Design highly maintainable distributed systems, master clean architecture, and implement production-ready software patterns.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    title: "Introduction to Cloud Native & Kubernetes",
    instructor: "Michael Chen",
    category: "DevOps",
    rating: 4.7,
    reviews: 156,
    duration: "8h 15m",
    level: "Beginner",
    description: "Deploy scalable microservices pipelines. Master configuration maps, storage management, and advanced pod distribution metrics.",
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?"
  }
];

// Stagger child animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

const hoverCard = {
  hover: {
    y: -8,
    scale: 1.01,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

const scrollReveal = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const tabItemVariant = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 18 }
  }
};

const getBorderGlowConfig = (category) => {
  switch (category) {
    case 'Frontend':
      return {
        glowColor: '304 76 30',
        colors: ['#6C1D5F', '#84117C', '#FF6200']
      };
    case 'Architecture':
      return {
        glowColor: '304 76 30',
        colors: ['#84117C', '#6C1D5F', '#01AC9F']
      };
    case 'DevOps':
      return {
        glowColor: '176 99 34',
        colors: ['#01AC9F', '#FF6200', '#6C1D5F']
      };
    default:
      return {
        glowColor: '304 76 30',
        colors: ['#6C1D5F', '#84117C', '#FF6200']
      };
  }
};

export default function Home() {
  const [activeCurriculumTab, setActiveCurriculumTab] = useState('frontend');
  const [hoveredCourseId, setHoveredCourseId] = useState(null);
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleGoToDashboard = (course = null) => {
    if (course) {
      navigate('/dashboard', { state: { courseId: course.id } });
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-blueish-grey overflow-x-hidden">
      <HeaderNav />

      {/* Hero Section Wrapper with Background Image */}
      <div
        className="relative bg-cover bg-center overflow-hidden border-b border-medium-grey"
        style={{ backgroundImage: `url(${bg1Img})` }}
      >
        {/* Semi-transparent color overlay for premium look & legibility */}
        <div className="absolute inset-0 bg-white/60 dark:bg-[#0F1015]/80 pointer-events-none z-0"></div>

        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 px-8 md:px-16 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
          <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-bright-velvet/5 blur-3xl pointer-events-none z-0"></div>
          <div className="absolute left-10 bottom-10 w-96 h-96 rounded-full bg-tranquil-velvet/5 blur-3xl pointer-events-none z-0"></div>

          <motion.div
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={fadeUpItem}
              whileHover="hover"
              className="inline-flex items-center gap-2 bg-tranquil-velvet/10 border border-tranquil-velvet/20 px-3.5 py-1.5 rounded-full text-tranquil-velvet font-bold text-xs select-none cursor-default"
            >
              <motion.span
                variants={{
                  hover: { rotate: 180 }
                }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="inline-flex"
              >
                <Shield className="h-4 w-4" />
              </motion.span>
              <span>Next-Generation Enterprise Learning Platform</span>
            </motion.div>

            <motion.h1
              variants={fadeUpItem}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black tracking-tight leading-[110%] font-extrabold"
            >
              Accelerate your{' '}
              <br></br>
              <Typewriter
                words={[
                  "Team’s Expertise",
                  "Frontend Mastery",
                  "Cloud Capabilities",
                  "System Architectures",
                  "Engineering Scale"
                ]}
                className="bg-gradient-to-r from-tranquil-velvet to-bright-velvet bg-clip-text text-transparent"
              />{' '}
              <br></br>
              with <span className="bg-gradient-to-r from-tranquil-velvet to-bright-velvet bg-clip-text text-transparent">Xebia</span>
            </motion.h1>

            <motion.p
              variants={fadeUpItem}
              className="text-dark-grey text-base md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Empower your engineers with tailored learning paths, interactive sandbox simulations, and certified corporate curriculum designed by leading software authorities.
            </motion.p>

            <motion.div
              variants={fadeUpItem}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <motion.button
                onClick={() => handleGoToDashboard()}
                variants={{
                  hover: { scale: 1.03 }
                }}
                whileHover="hover"
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3.5 bg-cta-orange hover:bg-[#E05600] text-white font-bold rounded-xl text-sm shadow-lg shadow-cta-orange/20 transition-colors duration-150 flex items-center gap-2 cursor-pointer border border-transparent group"
              >
                <span>Start Enrolling Now</span>
                <motion.span
                  variants={{
                    hover: { x: 5 }
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 12 }}
                  className="inline-flex"
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </motion.button>
              <motion.a
                href="#curriculum"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3.5 bg-white hover:bg-light-grey/20 text-black border border-medium-grey font-bold rounded-xl text-sm transition-colors duration-150 text-center"
              >
                Explore Curriculum
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right side floating image */}
          <motion.div
            className="lg:col-span-5 relative flex justify-center"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="w-full max-w-md relative"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-tranquil-velvet to-bright-velvet rounded-2xl transform rotate-3 scale-[1.02] opacity-15 pointer-events-none"></div>
              <BorderGlow
                edgeSensitivity={15}
                glowColor="304 76 30"
                backgroundColor={theme === 'dark' ? '#16171F' : '#FFFFFF'}
                borderRadius={16}
                glowRadius={60}
                glowIntensity={2.5}
                fillOpacity={0.85}
                coneSpread={28}
                animated={true}
                colors={['#6C1D5F', '#84117C', '#FF6200']}
                className="shadow-xl"
              >
                <div className="bg-white p-4 rounded-2xl relative overflow-hidden">
                  <img src={heroImg} className="w-full h-auto object-cover rounded-xl" alt="LMS Hero Visual" />
                </div>
              </BorderGlow>
            </motion.div>
          </motion.div>
        </section>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white border-y border-medium-grey">
        <div className="max-w-7xl mx-auto px-8 md:px-16 w-full space-y-12">
          <motion.div
            className="text-center space-y-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={scrollReveal}
          >
            <span className="text-cta-orange text-xs font-bold uppercase tracking-widest font-semibold">Designed for Innovation</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-black tracking-tight font-extrabold">Standardized Core Pillars</h2>
            <p className="text-dark-grey text-sm max-w-lg mx-auto leading-relaxed">
              Enterprise-scale development modules structured to maximize practical capabilities.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
          >
            {/* Pillar 1 */}
            <motion.div
              variants={{
                ...fadeUpItem,
                hover: { y: -6, transition: { duration: 0.2 } }
              }}
              whileHover="hover"
              className="p-8 rounded-2xl border border-medium-grey bg-blueish-grey hover:border-tranquil-velvet/40 hover:shadow-md transition-colors duration-200 space-y-4 group cursor-default"
            >
              <div className="h-12 w-12 rounded-xl bg-tranquil-velvet/10 flex items-center justify-center text-tranquil-velvet group-hover:bg-tranquil-velvet group-hover:text-white transition-colors duration-300">
                <motion.div
                  variants={{
                    hover: { rotate: 360 }
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 10 }}
                  className="inline-flex"
                >
                  <Compass className="h-6 w-6" />
                </motion.div>
              </div>
              <h3 className="text-lg font-bold text-black font-semibold">Structured Career roadmaps</h3>
              <p className="text-dark-grey text-xs leading-relaxed">
                Transition junior staff into seasoned tech-leads with customized pathways tailored to company stacks.
              </p>
            </motion.div>

            {/* Pillar 2 */}
            <motion.div
              variants={{
                ...fadeUpItem,
                hover: { y: -6, transition: { duration: 0.2 } }
              }}
              whileHover="hover"
              className="p-8 rounded-2xl border border-medium-grey bg-blueish-grey hover:border-emerald/40 hover:shadow-md transition-colors duration-200 space-y-4 group cursor-default"
            >
              <div className="h-12 w-12 rounded-xl bg-emerald/10 flex items-center justify-center text-emerald group-hover:bg-emerald group-hover:text-white transition-colors duration-300">
                <motion.div
                  variants={{
                    hover: { y: [0, -6, 0] }
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 8 }}
                  className="inline-flex"
                >
                  <CheckCircle className="h-6 w-6" />
                </motion.div>
              </div>
              <h3 className="text-lg font-bold text-black font-semibold">Interactive Sandbox Labs</h3>
              <p className="text-dark-grey text-xs leading-relaxed">
                Practice microservice management and frontend compilation inside sandboxed configurations with zero local setups.
              </p>
            </motion.div>

            {/* Pillar 3 */}
            <motion.div
              variants={{
                ...fadeUpItem,
                hover: { y: -6, transition: { duration: 0.2 } }
              }}
              whileHover="hover"
              className="p-8 rounded-2xl border border-medium-grey bg-blueish-grey hover:border-cta-orange/40 hover:shadow-md transition-colors duration-200 space-y-4 group cursor-default"
            >
              <div className="h-12 w-12 rounded-xl bg-cta-orange/10 flex items-center justify-center text-cta-orange group-hover:bg-cta-orange group-hover:text-white transition-colors duration-300">
                <motion.div
                  variants={{
                    hover: { rotate: [0, -15, 15, -15, 15, 0] }
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="inline-flex"
                >
                  <Trophy className="h-6 w-6" />
                </motion.div>
              </div>
              <h3 className="text-lg font-bold text-black font-semibold">Industry Certified Credentials</h3>
              <p className="text-dark-grey text-xs leading-relaxed">
                Earn enterprise badges and qualified LinkedIn certifications verified by principal software engineers.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Curriculum Pathway Tabs Section */}
      <section id="curriculum" className="py-20 max-w-7xl mx-auto px-8 md:px-16 w-full space-y-12">
        <motion.div
          className="text-center space-y-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scrollReveal}
        >
          <span className="text-tranquil-velvet text-xs font-bold uppercase tracking-widest font-semibold">LMS Syllabus</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-black tracking-tight font-extrabold">Structured Curriculums</h2>
          <p className="text-dark-grey text-sm max-w-lg mx-auto">
            Explore specialized tracks organized by role and technical complexity.
          </p>
        </motion.div>

        {/* Tab Controls with Vercel-style Sliding Pill */}
        <div className="flex justify-center">
          <div className="flex bg-[#F0F1F5] dark:bg-[#16171F] p-1.5 rounded-2xl border border-medium-grey/40 dark:border-[#282A3A] relative">
            {[
              { id: 'frontend', label: 'Frontend Development' },
              { id: 'devops', label: 'DevOps & Infrastructure' },
              { id: 'architecture', label: 'Systems Architecture' }
            ].map(tab => {
              const isActive = activeCurriculumTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCurriculumTab(tab.id)}
                  className={`relative px-6 py-3.5 text-xs md:text-sm font-bold transition cursor-pointer duration-250 rounded-xl z-10 focus:outline-none ${isActive ? 'text-white' : 'text-dark-grey hover:text-black dark:text-white/60 dark:hover:text-white'}`}
                >
                  <span className="relative z-20">{tab.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 bg-tranquil-velvet rounded-xl z-10 shadow-md"
                      transition={{ type: "spring", stiffness: 320, damping: 25 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Details with AnimatePresence Page Transition */}
        <div className="bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl p-8 md:p-10 shadow-sm relative min-h-[380px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCurriculumTab}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: 0.05
                  }
                },
                exit: { opacity: 0, transition: { duration: 0.15 } }
              }}
            >
              {activeCurriculumTab === 'frontend' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                  <div className="space-y-6">
                    <motion.span variants={tabItemVariant} className="text-xs bg-tranquil-velvet/10 text-tranquil-velvet border border-tranquil-velvet/20 px-2.5 py-1 rounded-full font-bold uppercase select-none inline-block">Frontend Path</motion.span>
                    <motion.h3 variants={tabItemVariant} className="text-2xl font-bold text-black dark:text-white font-semibold">Modern Frontend Architectures</motion.h3>
                    <motion.p variants={tabItemVariant} className="text-dark-grey text-sm leading-relaxed">
                      Equip developers with deep React frameworks expertise, scalable design system rules, Tailwind CSS optimization, and modular micro-frontend components.
                    </motion.p>
                    <motion.ul variants={tabItemVariant} className="space-y-3 text-xs text-dark-grey font-medium">
                      <li className="flex items-center gap-2.5">
                        <Check className="h-4 w-4 text-emerald" />
                        <span>Tailwind CSS configuration models and custom themes</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <Check className="h-4 w-4 text-emerald" />
                        <span>Advanced state management models (Zustand/Redux)</span>
                      </li>
                    </motion.ul>
                    <motion.button
                      variants={tabItemVariant}
                      onClick={() => handleGoToDashboard()}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-5 py-2.5 bg-cta-orange hover:bg-[#E05600] text-white text-xs font-bold rounded-xl transition-colors shadow-md shadow-cta-orange/15 cursor-pointer border border-transparent"
                    >
                      Explore Courses
                    </motion.button>
                  </div>
                  <motion.div variants={tabItemVariant}>
                    <div className="bg-blueish-grey dark:bg-[#0F1015] border border-medium-grey dark:border-[#282A3A] p-6 rounded-2xl space-y-4">
                      <h4 className="text-sm font-bold text-black dark:text-white font-semibold">Syllabus Overview</h4>
                      <div className="space-y-3">
                        <motion.div
                          whileHover={{ x: 6, scale: 1.01 }}
                          className="p-3 bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-xl flex justify-between items-center text-xs shadow-xs hover:border-tranquil-velvet/40 transition duration-150 cursor-pointer"
                        >
                          <span className="font-semibold text-black dark:text-white">1. JSX Core & React State Engine</span>
                          <span className="text-tranquil-velvet font-bold">12 Lessons</span>
                        </motion.div>
                        <motion.div
                          whileHover={{ x: 6, scale: 1.01 }}
                          className="p-3 bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-xl flex justify-between items-center text-xs shadow-xs hover:border-tranquil-velvet/40 transition duration-150 cursor-pointer"
                        >
                          <span className="font-semibold text-black dark:text-white">2. Tailwind CSS Styling & Variables</span>
                          <span className="text-tranquil-velvet font-bold">8 Lessons</span>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}

              {activeCurriculumTab === 'devops' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                  <div className="space-y-6">
                    <motion.span variants={tabItemVariant} className="text-xs bg-emerald/10 text-emerald border border-emerald/20 px-2.5 py-1 rounded-full font-bold uppercase select-none inline-block">DevOps & Cloud</motion.span>
                    <motion.h3 variants={tabItemVariant} className="text-2xl font-bold text-black dark:text-white font-semibold">Cloud Native & Infrastructure at Scale</motion.h3>
                    <motion.p variants={tabItemVariant} className="text-dark-grey text-sm leading-relaxed">
                      Deploy highly resilient systems using Kubernetes clusters, Docker image registries, CI/CD automated orchestration pipelines, and advanced microservice distributions.
                    </motion.p>
                    <motion.ul variants={tabItemVariant} className="space-y-3 text-xs text-dark-grey font-medium">
                      <li className="flex items-center gap-2.5">
                        <Check className="h-4 w-4 text-emerald" />
                        <span>Kubernetes Pod orchestration and ingress controllers</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <Check className="h-4 w-4 text-emerald" />
                        <span>Dockerizing Node.js microservices and building caches</span>
                      </li>
                    </motion.ul>
                    <motion.button
                      variants={tabItemVariant}
                      onClick={() => handleGoToDashboard()}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-5 py-2.5 bg-cta-orange hover:bg-[#E05600] text-white text-xs font-bold rounded-xl transition-colors shadow-md shadow-cta-orange/15 cursor-pointer border border-transparent"
                    >
                      Explore Courses
                    </motion.button>
                  </div>
                  <motion.div variants={tabItemVariant}>
                    <div className="bg-blueish-grey dark:bg-[#0F1015] border border-medium-grey dark:border-[#282A3A] p-6 rounded-2xl space-y-4">
                      <h4 className="text-sm font-bold text-black dark:text-white font-semibold">Syllabus Overview</h4>
                      <div className="space-y-3">
                        <motion.div
                          whileHover={{ x: 6, scale: 1.01 }}
                          className="p-3 bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-xl flex justify-between items-center text-xs shadow-xs hover:border-tranquil-velvet/40 transition duration-150 cursor-pointer"
                        >
                          <span className="font-semibold text-black dark:text-white">1. Dockerizing Microservices</span>
                          <span className="text-tranquil-velvet font-bold">10 Lessons</span>
                        </motion.div>
                        <motion.div
                          whileHover={{ x: 6, scale: 1.01 }}
                          className="p-3 bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-xl flex justify-between items-center text-xs shadow-xs hover:border-tranquil-velvet/40 transition duration-150 cursor-pointer"
                        >
                          <span className="font-semibold text-black dark:text-white">2. Kubernetes Configuration Maps & Secrets</span>
                          <span className="text-tranquil-velvet font-bold">15 Lessons</span>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}

              {activeCurriculumTab === 'architecture' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                  <div className="space-y-6">
                    <motion.span variants={tabItemVariant} className="text-xs bg-bright-velvet/10 text-bright-velvet border border-bright-velvet/20 px-2.5 py-1 rounded-full font-bold uppercase select-none inline-block">Architecture Path</motion.span>
                    <motion.h3 variants={tabItemVariant} className="text-2xl font-bold text-black dark:text-white font-semibold">Systems Architecture & Patterns</motion.h3>
                    <motion.p variants={tabItemVariant} className="text-dark-grey text-sm leading-relaxed">
                      Study the theory and practice of enterprise-grade architectures: Clean code practices, distributed event streaming (Kafka), domain-driven design, and database replication patterns.
                    </motion.p>
                    <motion.ul variants={tabItemVariant} className="space-y-3 text-xs text-dark-grey font-medium">
                      <li className="flex items-center gap-2.5">
                        <Check className="h-4 w-4 text-emerald" />
                        <span>Domain-Driven Design (DDD) fundamentals</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <Check className="h-4 w-4 text-emerald" />
                        <span>Event Streaming patterns with Apache Kafka</span>
                      </li>
                    </motion.ul>
                    <motion.button
                      variants={tabItemVariant}
                      onClick={() => handleGoToDashboard()}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-5 py-2.5 bg-cta-orange hover:bg-[#E05600] text-white text-xs font-bold rounded-xl transition-colors shadow-md shadow-cta-orange/15 cursor-pointer border border-transparent"
                    >
                      Explore Courses
                    </motion.button>
                  </div>
                  <motion.div variants={tabItemVariant}>
                    <div className="bg-blueish-grey dark:bg-[#0F1015] border border-medium-grey dark:border-[#282A3A] p-6 rounded-2xl space-y-4">
                      <h4 className="text-sm font-bold text-black dark:text-white font-semibold">Syllabus Overview</h4>
                      <div className="space-y-3">
                        <motion.div
                          whileHover={{ x: 6, scale: 1.01 }}
                          className="p-3 bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-xl flex justify-between items-center text-xs shadow-xs hover:border-tranquil-velvet/40 transition duration-150 cursor-pointer"
                        >
                          <span className="font-semibold text-black dark:text-white">1. Clean Architecture Frameworks</span>
                          <span className="text-tranquil-velvet font-bold">14 Lessons</span>
                        </motion.div>
                        <motion.div
                          whileHover={{ x: 6, scale: 1.01 }}
                          className="p-3 bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-xl flex justify-between items-center text-xs shadow-xs hover:border-tranquil-velvet/40 transition duration-150 cursor-pointer"
                        >
                          <span className="font-semibold text-black dark:text-white">2. Event-Driven Systems Design</span>
                          <span className="text-tranquil-velvet font-bold">18 Lessons</span>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-tranquil-velvet-dark py-12 text-white">
        <div className="max-w-7xl mx-auto px-8 md:px-16 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-extrabold text-white">
              <CountUp from={0} to={50} duration={1.5} />k+
            </p>
            <p className="text-xs text-white/75 mt-1 font-semibold uppercase tracking-wider">Engineers Certified</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-white">
              <CountUp from={0} to={250} duration={1.8} separator="," />+
            </p>
            <p className="text-xs text-white/75 mt-1 font-semibold uppercase tracking-wider">Enterprise Clients</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-white">
              <CountUp from={0} to={95} duration={1.5} />%
            </p>
            <p className="text-xs text-white/75 mt-1 font-semibold uppercase tracking-wider">Completion Velocity</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-white">
              <CountUp from={0.0} to={4.8} duration={1.5} />
            </p>
            <p className="text-xs text-white/75 mt-1 font-semibold uppercase tracking-wider">Instructor Rating</p>
          </div>
        </div>
      </section>

      {/* Featured Courses Showcase Grid */}
      <section id="courses" className="py-20 bg-white border-b border-medium-grey">
        <div className="max-w-7xl mx-auto px-8 md:px-16 w-full space-y-12">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollReveal}
          >
            <div className="space-y-3">
              <span className="text-cta-orange text-xs font-bold uppercase tracking-widest font-semibold">Active Curriculum</span>
              <h2 className="text-3xl font-extrabold text-black tracking-tight font-extrabold">Featured Engineering Modules</h2>
            </div>
            <button
              onClick={() => handleGoToDashboard()}
              className="text-sm font-bold text-tranquil-velvet hover:text-bright-velvet transition flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <span>Browse all courses</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </motion.div>

          {/* Course Grid with Scroll Reveal Stagger */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={staggerContainer}
          >
            {featuredCourses.map(course => {
              const glowConfig = getBorderGlowConfig(course.category);
              const isHovered = hoveredCourseId === course.id;
              const isAnyHovered = hoveredCourseId !== null;

              return (
                <motion.div
                  key={course.id}
                  variants={fadeUpItem}
                  whileHover="hover"
                  custom={course.id}
                  className="flex flex-col justify-between cursor-default h-full"
                  style={{ originY: 0.5 }}
                  onMouseEnter={() => setHoveredCourseId(course.id)}
                  onMouseLeave={() => setHoveredCourseId(null)}
                  animate={{
                    opacity: !isAnyHovered || isHovered ? 1 : 0.6,
                    scale: isHovered ? 1.025 : 1,
                  }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <BorderGlow
                    edgeSensitivity={15}
                    glowColor={glowConfig.glowColor}
                    backgroundColor={theme === 'dark' ? '#16171F' : '#F7F8FC'}
                    borderRadius={16}
                    glowRadius={50}
                    glowIntensity={2.5}
                    fillOpacity={0.8}
                    coneSpread={28}
                    colors={glowConfig.colors}
                    className="h-full w-full flex flex-col justify-between"
                  >
                    <div className="flex flex-col justify-between h-full min-h-[460px]">
                      <div>
                        <div className="h-48 relative overflow-hidden bg-white dark:bg-[#16171F] border-b border-medium-grey dark:border-[#282A3A]">
                          {/* Hover zoom effect */}
                          <motion.img
                            src={course.image}
                            className="h-full w-full object-cover"
                            alt=""
                            variants={{
                              hover: { scale: 1.05, transition: { duration: 0.4 } }
                            }}
                          />
                          <div className="absolute top-3 left-3 flex gap-1">
                            <span className="text-[9px] bg-white/90 dark:bg-[#0F1015]/90 text-tranquil-velvet dark:text-[#d38bca] border border-tranquil-velvet/20 px-2 py-0.5 rounded font-bold uppercase shadow-sm">
                              {course.category}
                            </span>
                          </div>
                        </div>

                        <div className="p-6 space-y-3">
                          <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold">
                            <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                            <span>{course.rating}</span>
                            <span className="text-dark-grey font-medium">({course.reviews} reviews)</span>
                          </div>
                          <h3 className="text-base font-bold text-black dark:text-white hover:text-tranquil-velvet transition line-clamp-1">
                            {course.title}
                          </h3>
                          <p className="text-dark-grey text-xs leading-relaxed line-clamp-3">
                            {course.description}
                          </p>
                        </div>
                      </div>

                      <div className="p-6 pt-0 border-t border-medium-grey/40 dark:border-[#282A3A]/40 flex justify-between items-center mt-4">
                        <span className="text-xs text-dark-grey font-medium flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-dark-grey/65" />
                          <span>{course.duration}</span>
                        </span>
                        <motion.button
                          onClick={() => handleGoToDashboard(course)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-cta-orange hover:bg-[#E05600] text-white text-xs font-bold rounded-lg transition-colors duration-150 cursor-pointer border border-transparent shadow-sm shadow-cta-orange/10"
                        >
                          Start Learning
                        </motion.button>
                      </div>
                    </div>
                  </BorderGlow>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section id="testimonials" className="py-20 max-w-7xl mx-auto px-8 md:px-16 w-full space-y-12">
        <motion.div
          className="text-center space-y-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scrollReveal}
        >
          <span className="text-tranquil-velvet text-xs font-bold uppercase tracking-widest font-semibold">User Impact</span>
          <h2 className="text-3xl font-extrabold text-black tracking-tight font-extrabold">What Engineers Say</h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={staggerContainer}
        >
          <motion.div
            variants={fadeUpItem}
            whileHover={{ y: -5 }}
            className="bg-white border border-medium-grey p-8 rounded-2xl shadow-sm space-y-4 transition-all duration-255 cursor-default"
          >
            <div className="flex gap-1 text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="text-dark-grey text-xs italic leading-relaxed">
              "The frontend pathways were incredibly comprehensive. Building the scaling design systems inside the practical labs helped us standardise our React UI code."
            </p>
            <div className="flex gap-3 items-center">
              <div className="h-10 w-10 bg-tranquil-velvet/15 rounded-full flex items-center justify-center text-tranquil-velvet font-bold text-xs">
                ML
              </div>
              <div>
                <h4 className="text-xs font-bold text-black">Marcus Long</h4>
                <p className="text-[10px] text-dark-grey">Senior React Engineer, TechCorp</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUpItem}
            whileHover={{ y: -5 }}
            className="bg-white border border-medium-grey p-8 rounded-2xl shadow-sm space-y-4 transition-all duration-255 cursor-default"
          >
            <div className="flex gap-1 text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="text-dark-grey text-xs italic leading-relaxed">
              "Mastering Kubernetes deployment configurations via Xebia’s DevOps sandbox removed the deployment bottlenecks in our releases."
            </p>
            <div className="flex gap-3 items-center">
              <div className="h-10 w-10 bg-emerald/15 rounded-full flex items-center justify-center text-emerald font-bold text-xs">
                KA
              </div>
              <div>
                <h4 className="text-xs font-bold text-black">Karla Abbott</h4>
                <p className="text-[10px] text-dark-grey">Lead DevOps Engineer, CloudSystem</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUpItem}
            whileHover={{ y: -5 }}
            className="bg-white border border-medium-grey p-8 rounded-2xl shadow-sm space-y-4 transition-all duration-255 cursor-default"
          >
            <div className="flex gap-1 text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="text-dark-grey text-xs italic leading-relaxed">
              "A truly premium learning system. The event-driven systems syllabus was highly engaging. Completing my microservices badge verified my qualifications."
            </p>
            <div className="flex gap-3 items-center">
              <div className="h-10 w-10 bg-cta-orange/15 rounded-full flex items-center justify-center text-cta-orange font-bold text-xs">
                TR
              </div>
              <div>
                <h4 className="text-xs font-bold text-black">Toby Reynolds</h4>
                <p className="text-[10px] text-dark-grey">Solutions Architect, ApexData</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
