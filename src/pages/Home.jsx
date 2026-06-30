import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ArrowRight, HelpCircle, Search, ChevronDown, Mail, Phone, MapPin, Send, CheckCircle, Lock, User, Eye, EyeOff } from 'lucide-react';
import HeaderNav from '../components/HeaderNav.jsx';
import Footer from '../components/Footer.jsx';
import BorderGlow from '../components/BorderGlow.jsx';
import Typewriter from '../components/Typewriter.jsx';
import Logo from '../components/Logo.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import heroImg from '../assets/Hero2.png';
import bg1Img from '../assets/BG1.avif';

const faqData = [
  {
    id: 1,
    category: "general",
    question: "What is Xebia LMS?",
    answer: "Xebia LMS is a next-generation corporate Learning Management System specifically designed to accelerate development, deployment, and structural design capabilities for enterprise software engineering departments."
  },
  {
    id: 2,
    category: "general",
    question: "How do I enroll in a learning path?",
    answer: "Learning path enrollments can be authorized by your department's administrator, or you can register directly from the Learning Paths page inside the LMS platform."
  },
  {
    id: 3,
    category: "portal",
    question: "How can I simulate completing a lesson?",
    answer: "To simulate a complete lesson, navigate to the Student Portal (LMS Dashboard), select a course, and in the bottom of the Course Details page, click 'Simulate Complete Lesson'. This increases your progress bar by one module."
  },
  {
    id: 4,
    category: "portal",
    question: "Where do I download certificates?",
    answer: "Once a course progress bar reaches 100%, graduation credentials are automatically registered. You can review and download certificates in the 'Certificates' tab in the Student Portal sidebar."
  },
  {
    id: 5,
    category: "corporate",
    question: "Do you support custom event-driven labs?",
    answer: "Yes, Xebia LMS supports enterprise sandboxed lab configurations for Kubernetes node scaling, event streaming deployments with Kafka, and React component integration pipelines."
  },
  {
    id: 6,
    category: "corporate",
    question: "How do I request a dedicated client dashboard?",
    answer: "Submit a request form in the Contact Us section below, and one of our enterprise curriculum consultants will connect with you to review your team size and coordinate setup configurations."
  }
];

const officeLocations = [
  {
    city: "Amsterdam (HQ)",
    address: "Wibautstraat 224, 1097 DN Amsterdam, Netherlands",
    phone: "+31 (0)20 333 0606",
    email: "info@xebia.com"
  },
  {
    city: "Noida",
    address: "Logix Techno Park, Sector 127, Noida, UP 201301, India",
    phone: "+91 120 409 2700",
    email: "india-info@xebia.com"
  },
  {
    city: "Atlanta",
    address: "Peachtree St NE, Suite 1400, Atlanta, GA 30309, USA",
    phone: "+1 (404) 474 4114",
    email: "usa-info@xebia.com"
  },
  {
    city: "Paris",
    address: "Rue de la Chaussée d'Antin, 75009 Paris, France",
    phone: "+33 (0)1 83 62 10 10",
    email: "france-info@xebia.com"
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

const faqContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

const faqItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

const contactContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const contactItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  // Auth Form States
  const [activeTab, setActiveTab] = useState('signin'); // 'signin' or 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '', confirmPassword: '', agree: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

  const emailInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAuthForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      if (activeTab === 'signin') {
        setSubmitMessage({ type: 'success', text: 'Welcome back! Redirecting to dashboard...' });
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        if (authForm.password !== authForm.confirmPassword) {
          setSubmitMessage({ type: 'error', text: 'Passwords do not match!' });
          return;
        }
        setSubmitMessage({ type: 'success', text: 'Account registered successfully! Redirecting...' });
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }
    }, 1200);
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setSubmitMessage(null);
  };

  // FAQ States
  const [faqSearchQuery, setFaqSearchQuery] = useState('');
  const [activeFaqCategory, setActiveFaqCategory] = useState('all');
  const [expandedFaqId, setExpandedFaqId] = useState(null);

  // Contact States
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: 'demo', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [activeHighlight, setActiveHighlight] = useState(null);

  // Custom Event Listener for smooth scrolling and highlighting
  useEffect(() => {
    const handleScrollEvent = (e) => {
      const id = e.detail;
      const element = document.getElementById(id);
      if (element) {
        setActiveHighlight(id);
        element.scrollIntoView({ behavior: 'smooth' });

        // Focus the email input if scrolling to the auth form
        if (id === 'hero-auth-form') {
          setTimeout(() => {
            if (emailInputRef.current) {
              emailInputRef.current.focus({ preventScroll: true });
            }
          }, 800); // Wait for scroll animation to finish
        }

        // Remove highlight after animation completes
        const clearTimer = setTimeout(() => {
          setActiveHighlight(null);
        }, 2000);
        return () => clearTimeout(clearTimer);
      }
    };

    window.addEventListener('app-scroll-to', handleScrollEvent);
    return () => window.removeEventListener('app-scroll-to', handleScrollEvent);
  }, []);

  // Handle initial page load hash and location updates
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.slice(1);
      const timer = setTimeout(() => {
        const event = new CustomEvent('app-scroll-to', { detail: targetId });
        window.dispatchEvent(event);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, location.hash]);

  const handleScrollTo = (id) => {
    // Set hash manually to keep url in sync
    window.history.pushState(null, '', `#${id}`);
    const event = new CustomEvent('app-scroll-to', { detail: id });
    window.dispatchEvent(event);
  };


  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email && contactForm.message) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setContactForm({ name: '', email: '', subject: 'demo', message: '' });
      }, 5000);
    }
  };

  // Filtered FAQs
  const filteredFaqs = faqData.filter(faq => {
    const matchesCategory = activeFaqCategory === 'all' || faq.category === activeFaqCategory;
    const matchesSearch = faq.question.toLowerCase().includes(faqSearchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(faqSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-blueish-grey dark:bg-[#0F1015] overflow-x-hidden transition-colors duration-250">
      <HeaderNav />

      {/* Hero Section Wrapper with Background Image */}
      <div
        id="hero"
        className="relative bg-cover bg-center overflow-hidden border-b border-medium-grey"
        style={{ backgroundImage: `url(${bg1Img})` }}
      >
        {/* Semi-transparent color overlay for premium look & legibility */}
        <div className="absolute inset-0 bg-white/35 dark:bg-[#0F1015]/85 backdrop-blur-[2px] pointer-events-none z-0"></div>

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
              className="inline-flex items-center gap-2 bg-tranquil-velvet/10 border border-tranquil-velvet/20 px-3.5 py-1.5 rounded-full text-tranquil-velvet dark:text-[#b25fa6] dark:bg-tranquil-velvet/25 dark:border-tranquil-velvet/40 font-bold text-xs select-none cursor-default"
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
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-primary dark:text-white tracking-tight leading-[110%]"
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
                className="bg-gradient-to-r from-tranquil-velvet to-bright-velvet dark:from-[#802370] dark:to-[#9E1B94] bg-clip-text text-transparent"
              />{' '}
              <br></br>
              with <span className="bg-gradient-to-r from-tranquil-velvet to-bright-velvet dark:from-[#802370] dark:to-[#9E1B94] bg-clip-text text-transparent">Xebia</span>
            </motion.h1>
            <motion.p
              variants={fadeUpItem}
              className="text-text-primary dark:text-white font-semibold text-base md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Empower your engineers with tailored learning paths, interactive sandbox simulations, and certified corporate curriculum designed by leading software authorities.
            </motion.p>
            <motion.div
              variants={fadeUpItem}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <motion.button
                onClick={() => handleScrollTo('hero-auth-form')}
                variants={{
                  hover: { scale: 1.03 }
                }}
                whileHover="hover"
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3.5 bg-cta-orange hover:bg-[#E05600] text-white font-bold rounded-xl text-sm shadow-lg shadow-cta-orange/20 transition-colors duration-150 flex items-center gap-2 cursor-pointer border border-transparent group"
              >
                <span>Get Started Now</span>
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
              <motion.button
                onClick={() => handleScrollTo('faq')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3.5 bg-white dark:bg-[#16171F] hover:bg-light-grey/20 text-black dark:text-white border border-medium-grey dark:border-[#282A3A] font-bold rounded-xl text-sm transition-colors duration-150 text-center cursor-pointer"
              >
                Read FAQs
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right side floating Auth form */}
          <motion.div
            id="hero-auth-form"
            className="lg:col-span-5 relative flex justify-center scroll-mt-24"
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
                borderRadius={20}
                glowRadius={60}
                glowIntensity={2.5}
                fillOpacity={0.85}
                coneSpread={28}
                animated={true}
                colors={['#6C1D5F', '#84117C', '#FF6200']}
                className="shadow-2xl"
              >
                <div className="p-6 md:p-8 space-y-6">
                  {/* Logo & Header */}
                  <div className="text-center space-y-2">
                    <div className="flex justify-center mb-2">
                      <Logo className="h-8" />
                    </div>
                    <p className="text-xs text-dark-grey dark:text-white/60 font-medium">
                      {activeTab === 'signin' ? 'Welcome back! Access your enterprise courses.' : 'Create an account to start your learning path.'}
                    </p>
                  </div>

                  {/* Tab Selector */}
                  <div className="flex bg-[#F0F1F5] dark:bg-[#1C1D26] p-1 rounded-xl relative border border-medium-grey/40 dark:border-[#282A3A]/40">
                    <button
                      type="button"
                      onClick={() => switchTab('signin')}
                      className={`w-1/2 text-center py-2.5 text-xs font-bold transition duration-200 cursor-pointer relative focus:outline-none z-10 ${activeTab === 'signin' ? 'text-white font-extrabold' : 'text-dark-grey dark:text-white/60 hover:text-black dark:hover:text-white'}`}
                    >
                      <span className="relative z-20">Sign In</span>
                      {activeTab === 'signin' && (
                        <motion.div
                          layoutId="activeAuthTab"
                          className="absolute inset-0 bg-tranquil-velvet rounded-lg shadow-sm"
                          transition={{ type: "spring", stiffness: 350, damping: 28 }}
                        />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => switchTab('signup')}
                      className={`w-1/2 text-center py-2.5 text-xs font-bold transition duration-200 cursor-pointer relative focus:outline-none z-10 ${activeTab === 'signup' ? 'text-white font-extrabold' : 'text-dark-grey dark:text-white/60 hover:text-black dark:hover:text-white'}`}
                    >
                      <span className="relative z-20">Register</span>
                      {activeTab === 'signup' && (
                        <motion.div
                          layoutId="activeAuthTab"
                          className="absolute inset-0 bg-tranquil-velvet rounded-lg shadow-sm"
                          transition={{ type: "spring", stiffness: 350, damping: 28 }}
                        />
                      )}
                    </button>
                  </div>

                  {/* Auth Form */}
                  <form onSubmit={handleAuthSubmit} className="space-y-4">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="space-y-4"
                      >
                        {activeTab === 'signup' && (
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-dark-grey dark:text-white/60">Full Name</label>
                            <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-dark-grey/50" />
                              <input
                                type="text"
                                name="name"
                                required
                                value={authForm.name}
                                onChange={handleInputChange}
                                placeholder="Jane Doe"
                                className="w-full pl-10 pr-4 py-2.5 text-xs text-black dark:text-white bg-blueish-grey dark:bg-[#1C1D26] border border-medium-grey dark:border-[#282A3A] rounded-lg focus:outline-none focus:border-tranquil-velvet transition font-medium"
                              />
                            </div>
                          </div>
                        )}

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-dark-grey dark:text-white/60">Email Address</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-dark-grey/50" />
                            <input
                              ref={emailInputRef}
                              type="email"
                              name="email"
                              required
                              value={authForm.email}
                              onChange={handleInputChange}
                              placeholder="jane.doe@company.com"
                              className="w-full pl-10 pr-4 py-2.5 text-xs text-black dark:text-white bg-blueish-grey dark:bg-[#1C1D26] border border-medium-grey dark:border-[#282A3A] rounded-lg focus:outline-none focus:border-tranquil-velvet transition font-medium"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center">
                            <label className="text-xs font-bold text-dark-grey dark:text-white/60">Password</label>
                            {activeTab === 'signin' && (
                              <a href="#" className="text-[10px] font-bold text-tranquil-velvet dark:text-[#d38bca] hover:underline">Forgot password?</a>
                            )}
                          </div>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-dark-grey/50" />
                            <input
                              type={showPassword ? 'text' : 'password'}
                              name="password"
                              required
                              value={authForm.password}
                              onChange={handleInputChange}
                              placeholder="••••••••"
                              className="w-full pl-10 pr-10 py-2.5 text-xs text-black dark:text-white bg-blueish-grey dark:bg-[#1C1D26] border border-medium-grey dark:border-[#282A3A] rounded-lg focus:outline-none focus:border-tranquil-velvet transition font-medium"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-3 text-dark-grey hover:text-black dark:hover:text-white cursor-pointer"
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>

                        {activeTab === 'signup' && (
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-dark-grey dark:text-white/60">Confirm Password</label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-dark-grey/50" />
                              <input
                                type="password"
                                name="confirmPassword"
                                required
                                value={authForm.confirmPassword}
                                onChange={handleInputChange}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-2.5 text-xs text-black dark:text-white bg-blueish-grey dark:bg-[#1C1D26] border border-medium-grey dark:border-[#282A3A] rounded-lg focus:outline-none focus:border-tranquil-velvet transition font-medium"
                              />
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {/* Feedback Messages */}
                    {submitMessage && (
                      <div className={`p-3 rounded-lg text-xs font-bold border ${submitMessage.type === 'success' ? 'bg-emerald/10 border-emerald/20 text-emerald' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                        {submitMessage.text}
                      </div>
                    )}

                    {/* Extra Options Checkbox */}
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="agree"
                        name="agree"
                        checked={authForm.agree}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-tranquil-velvet bg-blueish-grey dark:bg-[#1C1D26] border-medium-grey dark:border-[#282A3A] rounded focus:ring-tranquil-velvet cursor-pointer"
                      />
                      <label htmlFor="agree" className="text-[10px] text-dark-grey dark:text-white/60 select-none cursor-pointer">
                        {activeTab === 'signin' ? 'Keep me signed in on this device' : 'I agree to the Terms of Service & Privacy Policy'}
                      </label>
                    </div>

                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-cta-orange hover:bg-[#E05600] disabled:bg-cta-orange/50 text-white text-xs font-bold rounded-xl transition duration-150 flex items-center justify-center gap-2 shadow-md shadow-cta-orange/20 cursor-pointer border border-transparent"
                    >
                      {isSubmitting ? (
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <span>{activeTab === 'signin' ? 'Sign In' : 'Create Account'}</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </form>

                  {/* Social Login Separator */}
                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-medium-grey/40 dark:border-[#282A3A]/40"></div>
                    <span className="flex-shrink mx-4 text-[10px] text-dark-grey/65 dark:text-white/40 uppercase tracking-widest font-bold">Or continue with</span>
                    <div className="flex-grow border-t border-medium-grey/40 dark:border-[#282A3A]/40"></div>
                  </div>

                  {/* Social Logins */}
                  <div className="grid grid-cols-2 gap-4">
                    <button type="button" className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#F0F1F5] hover:bg-[#E2E4EB] dark:bg-[#1C1D26] dark:hover:bg-[#252733] border border-medium-grey/40 dark:border-[#282A3A]/40 rounded-xl text-xs font-bold text-black dark:text-white transition cursor-pointer">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.28 4.114-3.418 0-6.19-2.772-6.19-6.19s2.772-6.19 6.19-6.19c1.7 0 3.22.68 4.3 1.78l3.1-3.1C19.2 2.23 15.9 1 12.24 1 6.04 1 12.24s5.04 11.24 11.24 11.24c6.3 0 11.24-4.5 11.24-11.24 0-.78-.08-1.5-.24-2.18l-11 0z" />
                      </svg>
                      <span>Google</span>
                    </button>
                    <button type="button" className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#F0F1F5] hover:bg-[#E2E4EB] dark:bg-[#1C1D26] dark:hover:bg-[#252733] border border-medium-grey/40 dark:border-[#282A3A]/40 rounded-xl text-xs font-bold text-black dark:text-white transition cursor-pointer">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                      <span>GitHub</span>
                    </button>
                  </div>
                </div>
              </BorderGlow>
            </motion.div>
          </motion.div>
        </section>
      </div>

      {/* FAQ Section */}
      <section id="faq" className="py-20 border-b border-medium-grey bg-white dark:bg-[#0F1015] transition-colors duration-250 relative overflow-hidden">
        {/* Animated highlight pulse */}
        <AnimatePresence>
          {activeHighlight === 'faq' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.4, 0.4, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.0, times: [0, 0.15, 0.85, 1] }}
              className="absolute inset-0 bg-gradient-to-b from-tranquil-velvet/20 to-transparent pointer-events-none z-0"
            />
          )}
        </AnimatePresence>

        <motion.div
          className="max-w-4xl mx-auto px-8 w-full space-y-12 z-10 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={faqContainerVariants}
          animate={activeHighlight === 'faq' ? {
            scale: [1, 1.015, 1],
          } : {}}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          {/* FAQ Header block */}
          <motion.div className="text-center space-y-4" variants={faqItemVariants}>
            <div className="inline-flex items-center gap-2 bg-tranquil-velvet/10 border border-tranquil-velvet/20 px-3.5 py-1.5 rounded-full text-tranquil-velvet dark:text-[#d38bca] font-bold text-xs select-none">
              <HelpCircle className="h-4 w-4" />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-black dark:text-white tracking-tight font-extrabold">Got Questions? We’ve Got Answers</h2>
            <p className="text-dark-grey dark:text-white/60 text-sm max-w-xl mx-auto">
              Search our knowledge base or select a category below to quickly resolve your doubts about modules, tracks, and certifications.
            </p>
          </motion.div>

          {/* Search FAQ Bar */}
          <motion.div
            className="bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] p-4 rounded-2xl shadow-sm flex items-center gap-3 transition-colors duration-250"
            variants={faqItemVariants}
          >
            <Search className="h-5 w-5 text-dark-grey dark:text-white/40" />
            <input
              type="text"
              placeholder="Search FAQs (e.g. certificates, sandbox, progress)..."
              value={faqSearchQuery}
              onChange={(e) => setFaqSearchQuery(e.target.value)}
              className="bg-transparent text-sm text-black dark:text-white placeholder-dark-grey/50 dark:placeholder-white/30 focus:outline-none w-full font-medium"
            />
          </motion.div>

          {/* Categories and List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

            {/* Category selector */}
            <motion.div className="space-y-1 md:col-span-1" variants={faqItemVariants}>
              {[
                { id: 'all', label: 'All FAQs' },
                { id: 'general', label: 'General' },
                { id: 'portal', label: 'Student Portal' },
                { id: 'corporate', label: 'Enterprise' }
              ].map(cat => {
                const isActive = activeFaqCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => { setActiveFaqCategory(cat.id); setExpandedFaqId(null); }}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-bold transition duration-200 cursor-pointer relative focus:outline-none ${isActive ? 'text-white font-extrabold' : 'text-dark-grey dark:text-white/60 hover:bg-blueish-grey/50 dark:hover:bg-white/5 border border-transparent'}`}
                  >
                    <span className="relative z-10">{cat.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeFaqCategoryPill"
                        className="absolute inset-0 bg-tranquil-velvet rounded-lg shadow-sm"
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      />
                    )}
                  </button>
                );
              })}
            </motion.div>

            {/* Accordion FAQ List */}
            <motion.div className="md:col-span-3 space-y-4" variants={faqItemVariants}>
              <AnimatePresence mode="popLayout">
                {filteredFaqs.map(faq => {
                  const isExpanded = expandedFaqId === faq.id;
                  return (
                    <motion.div
                      layout
                      key={faq.id}
                      className="bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-xl overflow-hidden shadow-sm transition duration-200 hover:border-medium-grey/85 dark:hover:border-[#282A3A]/85"
                    >
                      <button
                        onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                        className="w-full px-6 py-4.5 text-left flex justify-between items-center font-bold text-sm text-black dark:text-white hover:text-tranquil-velvet dark:hover:text-[#d38bca] transition cursor-pointer focus:outline-none"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown className={`h-4 w-4 text-dark-grey dark:text-white/40 transition-transform duration-200 ${isExpanded ? 'transform rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-5 text-xs text-dark-grey dark:text-white/70 leading-relaxed border-t border-blueish-grey dark:border-[#282A3A] pt-4 bg-blueish-grey/20 dark:bg-[#121319]/40 font-medium">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {filteredFaqs.length === 0 && (
                <motion.div
                  layout
                  className="py-12 text-center bg-white dark:bg-[#16171F] rounded-xl border border-medium-grey dark:border-[#282A3A] shadow-sm transition-colors duration-250"
                >
                  <HelpCircle className="h-10 w-10 text-medium-grey dark:text-white/20 mx-auto mb-2" />
                  <p className="text-xs text-dark-grey dark:text-white/60 font-semibold">No answers match your query</p>
                  <button onClick={() => { setFaqSearchQuery(''); setActiveFaqCategory('all'); }} className="text-xs text-tranquil-velvet dark:text-[#d38bca] hover:underline mt-2 cursor-pointer font-bold">
                    Clear Search filters
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-blueish-grey dark:bg-[#0F1015] transition-colors duration-250 relative overflow-hidden">
        {/* Animated highlight pulse */}
        <AnimatePresence>
          {activeHighlight === 'contact' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.4, 0.4, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.0, times: [0, 0.15, 0.85, 1] }}
              className="absolute inset-0 bg-gradient-to-b from-cta-orange/20 to-transparent pointer-events-none z-0"
            />
          )}
        </AnimatePresence>

        <motion.div
          className="max-w-6xl mx-auto px-8 w-full space-y-12 z-10 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={contactContainerVariants}
          animate={activeHighlight === 'contact' ? {
            scale: [1, 1.015, 1],
          } : {}}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <motion.div className="text-center space-y-3" variants={contactItemVariants}>
            <span className="text-cta-orange text-xs font-bold uppercase tracking-widest font-semibold">Connect With Us</span>
            <h2 className="text-3xl font-extrabold text-black dark:text-white tracking-tight font-extrabold">Let’s Start a Conversation</h2>
            <p className="text-dark-grey dark:text-white/60 text-sm max-w-lg mx-auto">
              Have questions about corporate training setups, roadmap authorization, or private labs? Our support representatives are here to help.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Message form on left */}
            <motion.div className="lg:col-span-7 bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl p-8 shadow-sm space-y-6" variants={contactItemVariants}>
              <h3 className="text-lg font-bold text-black dark:text-white border-b border-blueish-grey dark:border-[#282A3A] pb-4">Send Us A Message</h3>

              {formSubmitted ? (
                <div className="bg-emerald/10 border border-emerald/20 text-emerald p-6 rounded-xl space-y-2">
                  <h4 className="text-sm font-bold flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>Message Received!</span>
                  </h4>
                  <p className="text-xs text-emerald-900 dark:text-emerald-300 leading-relaxed font-medium">
                    Thank you for contacting Xebia Academy support. A dedicated learning pathways manager has received your request and will reach out to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-dark-grey dark:text-white/60">Your Name</label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="Jane Doe"
                        className="w-full px-4.5 py-2.5 text-xs text-black dark:text-white bg-blueish-grey dark:bg-[#1C1D26] border border-medium-grey dark:border-[#282A3A] rounded-lg focus:outline-none focus:border-tranquil-velvet transition font-medium"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-dark-grey dark:text-white/60">Email Address</label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="jane.doe@company.com"
                        className="w-full px-4.5 py-2.5 text-xs text-black dark:text-white bg-blueish-grey dark:bg-[#1C1D26] border border-medium-grey dark:border-[#282A3A] rounded-lg focus:outline-none focus:border-tranquil-velvet transition font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-dark-grey dark:text-white/60">Request Subject</label>
                    <select
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full px-4.5 py-2.5 text-xs text-black dark:text-white bg-blueish-grey dark:bg-[#1C1D26] border border-medium-grey dark:border-[#282A3A] rounded-lg focus:outline-none focus:border-tranquil-velvet transition font-bold"
                    >
                      <option value="demo">Request Corporate Demo</option>
                      <option value="billing">Enterprise Pricing & Contracts</option>
                      <option value="technical">Technical Support / Sandbox Issues</option>
                      <option value="other">General Inquiries</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-dark-grey dark:text-white/60">Message</label>
                    <textarea
                      rows="5"
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Tell us about your team size, curriculum requirements, or support needs..."
                      className="w-full px-4.5 py-2.5 text-xs text-black dark:text-white bg-blueish-grey dark:bg-[#1C1D26] border border-medium-grey dark:border-[#282A3A] rounded-lg focus:outline-none focus:border-tranquil-velvet transition resize-none font-medium"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-cta-orange hover:bg-[#E05600] text-white text-xs font-bold rounded-xl transition duration-150 flex items-center justify-center gap-2 shadow-md shadow-cta-orange/20 cursor-pointer border border-transparent"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </motion.div>

            {/* Office directory grid on right */}
            <motion.div className="lg:col-span-5 space-y-6" variants={contactItemVariants}>
              <div className="bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl p-8 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-black dark:text-white border-b border-blueish-grey dark:border-[#282A3A] pb-4">Corporate Office Directory</h3>
                <div className="space-y-6 max-h-[400px] overflow-y-auto sleek-scrollbar pr-2">
                  {officeLocations.map((loc, idx) => (
                    <div key={idx} className="space-y-2 border-b border-blueish-grey/50 dark:border-[#282A3A]/50 pb-4 last:border-0 last:pb-0">
                      <h4 className="text-sm font-bold text-tranquil-velvet dark:text-[#d38bca] flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-cta-orange" />
                        <span>{loc.city} Office</span>
                      </h4>
                      <div className="space-y-1 text-xs text-dark-grey dark:text-white/60 leading-relaxed pl-5 font-medium">
                        <p>{loc.address}</p>
                        <p className="flex items-center gap-1.5 mt-1 text-black dark:text-white">
                          <Phone className="h-3.5 w-3.5 text-tranquil-velvet-dark dark:text-white/40" />
                          <span>{loc.phone}</span>
                        </p>
                        <p className="flex items-center gap-1.5 text-black dark:text-white">
                          <Mail className="h-3.5 w-3.5 text-tranquil-velvet-dark dark:text-white/40" />
                          <span>{loc.email}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
