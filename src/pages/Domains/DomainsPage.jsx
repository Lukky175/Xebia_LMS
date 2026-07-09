import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe, CheckCircle, AlertTriangle, Tag,
  Plus, LayoutGrid, AlignJustify, CheckCircle2
} from 'lucide-react';
import CountUp from '@/components/ui/CountUp.jsx';
import { api } from '@/services/api.js';
import AddDomainModal from './AddDomainModal.jsx';
import DomainCardView from './DomainCardView.jsx';
import DomainTableView from './DomainTableView.jsx';

const PAGE_SIZE = 6;

export default function DomainsPage() {
  // ── Data state ───────────────────────────────────────────────────────────────
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);

  // ── UI state ─────────────────────────────────────────────────────────────────
  const [view, setView] = useState('card');           // 'card' | 'table'
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Active' | 'Inactive'
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [toasts, setToasts] = useState([]);

  // ── Load ─────────────────────────────────────────────────────────────────────
  useEffect(() => {
    api.getDomains()
      .then(setDomains)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // ── Toast helper ─────────────────────────────────────────────────────────────
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  // ── Stats (derived from ALL domains, not just filtered) ───────────────────────
  const stats = useMemo(() => {
    const total = domains.length;
    const active = domains.filter(d => d.status === 'Active').length;
    const inactive = domains.filter(d => d.status === 'Inactive').length;
    const categories = new Set(domains.map(d => d.category)).size;
    const activePct = total > 0 ? ((active / total) * 100).toFixed(1) : '0.0';
    return { total, active, inactive, categories, activePct };
  }, [domains]);

  // ── Filter + Paginate ─────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    if (statusFilter === 'All') return domains;
    return domains.filter(d => d.status === statusFilter);
  }, [domains, statusFilter]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  // Reset to page 1 when filter changes
  useEffect(() => { setCurrentPage(1); }, [statusFilter]);

  // ── Handlers ──────────────────────────────────────────────────────────────────
  const handleAdd = async (data) => {
    const updated = await api.addDomain(data);
    setDomains(updated);
    addToast(`Domain "${data.name}" added successfully!`);
  };

  const handleDelete = async (id) => {
    const domain = domains.find(d => d.id === id);
    const updated = await api.deleteDomain(id);
    setDomains(updated);
    addToast(`Domain "${domain?.name}" removed.`, 'info');
  };

  const handleToggleStatus = async (domain) => {
    const newStatus = domain.status === 'Active' ? 'Inactive' : 'Active';
    const updated = await api.updateDomain(domain.id, { status: newStatus });
    setDomains(updated);
    addToast(`"${domain.name}" marked as ${newStatus}.`);
  };

  const handleEdit = (domain) => {
    addToast(`Editing "${domain.name}" — coming soon.`, 'info');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="h-10 w-10 border-4 border-tranquil-velvet border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* ── Toast Notifications ─────────────────────────────────────────────── */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map(t => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-xs font-bold max-w-sm pointer-events-auto ${
                t.type === 'info'
                  ? 'bg-tranquil-velvet/10 border-tranquil-velvet/30 text-tranquil-velvet dark:text-purple-300'
                  : 'bg-emerald/10 border-emerald/30 text-emerald dark:text-[#5ce7d4]'
              }`}
            >
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>{t.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ── Page Header ─────────────────────────────────────────────────────── */}
      <div>
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[10px] font-semibold text-dark-grey mb-2 select-none">
          <span className="hover:text-text-primary cursor-pointer transition">Home</span>
          <span>/</span>
          <span className="hover:text-text-primary cursor-pointer transition">Directory</span>
          <span>/</span>
          <span className="text-tranquil-velvet font-bold">Domains</span>
        </nav>
        <h1 className="text-2xl font-extrabold text-black dark:text-white leading-tight">Domains</h1>
        <p className="text-xs text-dark-grey mt-1">Course / subject taxonomy used across batches and learning paths.</p>
      </div>

      {/* ── Stats Cards ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Total Domains',
            value: stats.total,
            sub: `Across ${stats.categories} categories`,
            icon: Globe,
            iconColor: 'text-tranquil-velvet',
            iconBg: 'bg-tranquil-velvet/10 dark:bg-tranquil-velvet/20',
          },
          {
            label: 'Active',
            value: stats.active,
            sub: `${stats.activePct}% of total`,
            icon: CheckCircle,
            iconColor: 'text-emerald',
            iconBg: 'bg-emerald/10',
          },
          {
            label: 'Inactive',
            value: stats.inactive,
            sub: 'Under review',
            icon: AlertTriangle,
            iconColor: 'text-amber-500',
            iconBg: 'bg-amber-500/10',
          },
          {
            label: 'Categories',
            value: stats.categories,
            sub: 'Domain groupings',
            icon: Tag,
            iconColor: 'text-blue-500',
            iconBg: 'bg-blue-500/10',
          },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl p-5 shadow-sm flex justify-between items-start"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-dark-grey uppercase tracking-wider block">
                  {stat.label}
                </span>
                <p className="text-2xl font-extrabold text-black dark:text-white">
                  <CountUp to={stat.value} />
                </p>
                <span className="text-[10px] text-dark-grey font-semibold block">{stat.sub}</span>
              </div>
              <div className={`p-2.5 rounded-xl ${stat.iconBg} ${stat.iconColor}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Controls Bar ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 bg-bg-hover dark:bg-[#282A3A] p-1 rounded-xl">
          {['All', 'Active', 'Inactive'].map(tab => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                statusFilter === tab
                  ? 'bg-white dark:bg-[#16171F] text-black dark:text-white shadow-sm'
                  : 'text-dark-grey hover:text-text-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Right side: view toggle + add button */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Card / Table View Toggle */}
          <div className="flex items-center gap-1 bg-bg-hover dark:bg-[#282A3A] p-1 rounded-xl">
            <button
              onClick={() => setView('card')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                view === 'card'
                  ? 'bg-white dark:bg-[#16171F] text-black dark:text-white shadow-sm'
                  : 'text-dark-grey hover:text-text-primary'
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              Card View
            </button>
            <button
              onClick={() => setView('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                view === 'table'
                  ? 'bg-white dark:bg-[#16171F] text-black dark:text-white shadow-sm'
                  : 'text-dark-grey hover:text-text-primary'
              }`}
            >
              <AlignJustify className="h-3.5 w-3.5" />
              Table View
            </button>
          </div>

          {/* Add Domain CTA */}
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-cta-orange hover:bg-[#e05600] text-white text-xs font-bold rounded-xl shadow-md shadow-cta-orange/20 transition cursor-pointer border border-transparent"
          >
            <Plus className="h-4 w-4" />
            Add Domain
          </button>
        </div>
      </div>

      {/* ── View Section ─────────────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl p-5 shadow-sm space-y-4">
        {/* Section header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-black dark:text-white uppercase tracking-wider">
            {view === 'card' ? 'Card View' : 'Table View'}
          </h2>
          <span className="text-[10px] font-bold text-dark-grey">
            {Math.min((currentPage - 1) * PAGE_SIZE + 1, filtered.length || 0)}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length} domains
          </span>
        </div>

        {/* Card View */}
        {view === 'card' && (
          <>
            <DomainCardView
              domains={paginated}
              allDomains={domains}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
              onEdit={handleEdit}
            />
            {/* Card view pagination */}
            {filtered.length > PAGE_SIZE && (
              <div className="flex justify-between items-center pt-2 border-t border-medium-grey/40 dark:border-[#282A3A]/60">
                <span className="text-[10px] font-bold text-dark-grey uppercase tracking-wider">
                  Showing {Math.min((currentPage - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length} domains
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 text-[10px] font-bold border border-medium-grey dark:border-[#282A3A] bg-white dark:bg-[#16171F] text-dark-grey hover:bg-bg-hover rounded-lg transition disabled:opacity-40 cursor-pointer"
                  >Prev</button>
                  {Array.from({ length: Math.ceil(filtered.length / PAGE_SIZE) }, (_, i) => i + 1).map(p => (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p)}
                      className={`w-7 h-7 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                        p === currentPage
                          ? 'bg-tranquil-velvet text-white'
                          : 'border border-medium-grey dark:border-[#282A3A] text-dark-grey hover:bg-bg-hover dark:bg-[#16171F]'
                      }`}
                    >{p}</button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(p => Math.min(Math.ceil(filtered.length / PAGE_SIZE), p + 1))}
                    disabled={currentPage >= Math.ceil(filtered.length / PAGE_SIZE)}
                    className="px-3 py-1.5 text-[10px] font-bold border border-medium-grey dark:border-[#282A3A] bg-white dark:bg-[#16171F] text-dark-grey hover:bg-bg-hover rounded-lg transition disabled:opacity-40 cursor-pointer"
                  >Next</button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Table View */}
        {view === 'table' && (
          <DomainTableView
            domains={paginated}
            allDomains={domains}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalCount={filtered.length}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
            onEdit={handleEdit}
          />
        )}
      </div>

      {/* ── Add Domain Modal ─────────────────────────────────────────────────── */}
      <AddDomainModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onAdd={handleAdd}
        domains={domains}
      />
    </div>
  );
}
