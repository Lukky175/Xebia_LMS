import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Search, ChevronDown } from 'lucide-react';
import HeaderNav from '../components/HeaderNav.jsx';
import Footer from '../components/Footer.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

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
    answer: "Submit a request form on our Contact Page, and one of our enterprise curriculum consultants will connect with you to review your team size and coordinate setup configurations."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  }
};

export default function FAQ() {
  const [faqSearchQuery, setFaqSearchQuery] = useState('');
  const [activeFaqCategory, setActiveFaqCategory] = useState('all');
  const [expandedFaqId, setExpandedFaqId] = useState(null);
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Filtered FAQs
  const filteredFaqs = faqData.filter(faq => {
    const matchesCategory = activeFaqCategory === 'all' || faq.category === activeFaqCategory;
    const matchesSearch = faq.question.toLowerCase().includes(faqSearchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(faqSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-blueish-grey dark:bg-[#0F1015] transition-colors duration-250">
      <HeaderNav />
      
      <motion.main 
        className="max-w-4xl mx-auto px-8 py-16 w-full flex-1 space-y-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* FAQ Header block */}
        <motion.div className="text-center space-y-4" variants={itemVariants}>
          <div className="inline-flex items-center gap-2 bg-tranquil-velvet/10 border border-tranquil-velvet/20 px-3.5 py-1.5 rounded-full text-tranquil-velvet dark:text-[#d38bca] font-bold text-xs select-none">
            <HelpCircle className="h-4 w-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h1 className="text-4xl font-extrabold text-black dark:text-white tracking-tight">Got Questions? We’ve Got Answers</h1>
          <p className="text-dark-grey dark:text-white/60 text-sm max-w-xl mx-auto">
            Search our knowledge base or select a category below to quickly resolve your doubts about modules, tracks, and certifications.
          </p>
        </motion.div>

        {/* Search FAQ Bar */}
        <motion.div 
          className="bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] p-4 rounded-2xl shadow-sm flex items-center gap-3 transition-colors duration-250"
          variants={itemVariants}
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
          <motion.div className="space-y-1 md:col-span-1" variants={itemVariants}>
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
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-bold transition duration-200 cursor-pointer relative focus:outline-none ${isActive ? 'text-white font-bold font-extrabold' : 'text-dark-grey dark:text-white/60 hover:bg-white dark:hover:bg-white/5 border border-transparent'}`}
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
          <motion.div className="md:col-span-3 space-y-4" variants={itemVariants}>
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
                          <div className="px-6 pb-5 text-xs text-dark-grey dark:text-white/70 leading-relaxed border-t border-blueish-grey dark:border-[#282A3A] pt-4 bg-blueish-grey/20 dark:bg-[#121319]/40">
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
      </motion.main>
      
      <Footer />
    </div>
  );
}
