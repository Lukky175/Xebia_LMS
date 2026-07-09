/**
 * Author: Abhishek Dixit
 * Institution: Lovely Professional University
 * Develop the modules management page for the platform, 
 * including module cards, tables, pagination, 
 * and modals for creating and editing modules.
 */

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Clock3, ShieldCheck, History, Gauge, LayoutGrid, List, Sparkles } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext.jsx';
import { ProfileCardFrame } from '@/components/profile/ProfileUi.jsx';
import {
  ModuleActionsCell,
  ModuleKeyBadge,
  ModulePagination,
  ModuleStatCard,
  ModuleFormModal,
  ModuleStatusBadge,
  ModuleCardsGrid,
} from '@/components/modules/ModuleUi.jsx';

const initialModules = [
  { key: 'ADM', title: 'Administration', route: '/admin', submodules: '—', order: 1, active: true },
  { key: 'SCHEDULING', title: 'Scheduling', route: '/scheduling', submodules: '—', order: 2, active: true },
  { key: 'ASSESSMENT', title: 'Assessment', route: '/assessment', submodules: '—', order: 3, active: true },
  { key: 'ORG', title: 'Organisations', route: '/organisations', submodules: '—', order: 4, active: true },
  { key: 'DOMAIN', title: 'Domains', route: '/domains', submodules: '—', order: 5, active: true },
  { key: 'LEARNERS', title: 'Learners', route: '/learners', submodules: '—', order: 6, active: false },
  { key: 'PARENTS', title: 'Parents', route: '/parents', submodules: '—', order: 7, active: false },
  { key: 'USERS', title: 'Users', route: '/users', submodules: '—', order: 8, active: true },
  { key: 'COURSES', title: 'Courses', route: '/courses', submodules: '—', order: 9, active: true },
  { key: 'REPORTS', title: 'Reports', route: '/reports', submodules: '—', order: 10, active: true },
  { key: 'TUTORS', title: 'Tutors', route: '/trainer', submodules: '—', order: 11, active: true },
];

export default function ModulesPage() {
  const { theme } = useTheme();
  const [modules, setModules] = useState(initialModules);
  const [page, setPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingModuleKey, setEditingModuleKey] = useState(null);
  const [viewMode, setViewMode] = useState(() => {
    if (typeof window === 'undefined') return 'table';
    try {
      const saved = window.localStorage.getItem('modules_view');
      return saved === 'cards' ? 'cards' : 'table';
    } catch {
      return 'table';
    }
  });
  const [newModule, setNewModule] = useState({
    key: '',
    title: '',
    route: '',
    submodules: '—',
    order: '',
    active: true,
  });
  const pageSize = 10;

  const totalPages = Math.max(1, Math.ceil(modules.length / pageSize));
  const pageRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return modules.slice(start, start + pageSize);
  }, [modules, page]);

  const rangeStart = modules.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, modules.length);

  const resetForm = () => {
    setNewModule({ key: '', title: '', route: '', submodules: '—', order: '', active: true });
    setEditingModuleKey(null);
  };

  const handleOpenCreate = () => {
    resetForm();
    setShowCreateModal(true);
  };

  const handleOpenEdit = (module) => {
    setEditingModuleKey(module.key);
    setNewModule({
      key: module.key,
      title: module.title,
      route: module.route,
      submodules: module.submodules,
      order: module.order,
      active: module.active,
    });
    setShowCreateModal(true);
  };

  const handleSetView = (mode) => {
    setViewMode(mode);
    try { window.localStorage.setItem('modules_view', mode); } catch (e) {}
  };

  const handleChange = (field, value) => {
    setNewModule((current) => ({ ...current, [field]: value }));
  };

  const generateKey = (title, route) => {
    const raw = title.trim() || route.trim();
    return raw
      .replace(/^\//, '')
      .split(/[^a-zA-Z0-9]+/)
      .filter(Boolean)
      .map((part) => part[0])
      .join('')
      .slice(0, 8)
      .toUpperCase();
  };

  const handleCreateModule = (event) => {
    event.preventDefault();

    const key = (newModule.key.trim() || generateKey(newModule.title, newModule.route) || 'MOD').toUpperCase();
    const nextModule = {
      key,
      title: newModule.title.trim(),
      route: newModule.route.trim().startsWith('/') ? newModule.route.trim() : `/${newModule.route.trim()}`,
      submodules: newModule.submodules.trim() || '—',
      order: Number(newModule.order),
      active: newModule.active,
    };

    const nextModules = editingModuleKey
      ? modules.map((module) => module.key === editingModuleKey ? nextModule : module)
      : [...modules, nextModule];

    const sortedModules = [...nextModules].sort((left, right) => left.order - right.order);
    setModules(sortedModules);
    setShowCreateModal(false);
    resetForm();

    const nextPage = Math.max(1, Math.ceil(sortedModules.length / pageSize));
    setPage(nextPage);
  };

  const handleToggleModule = (module) => {
    setModules((current) => current.map((item) => item.key === module.key ? { ...item, active: !item.active } : item));
  };

  const handleDeleteModule = (moduleKey) => {
    setModules((current) => current.filter((module) => module.key !== moduleKey));
  };

  const activeModules = modules.filter((module) => module.active).length;
  const lastChangeMinutes = Math.max(1, modules.length + 3);
  const averageLatency = Math.max(18, Math.round(180 / modules.length));

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-xl border border-white/60 dark:border-border-card bg-gradient-to-br from-[#fef7f2] via-white to-[#f5f0ff] dark:from-[#16171F] dark:via-[#1a1b24] dark:to-[#181524] p-6 shadow-[0_20px_60px_rgba(132,17,124,0.12)]"
      >
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,_rgba(255,98,0,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(132,17,124,0.16),_transparent_35%)]" />
        <div className="rounded-xl border border-white/60 bg-white/80 dark:border-border-card dark:bg-[#16171F]/90 p-6 shadow-sm backdrop-blur-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 rounded-full bg-tranquil-velvet/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-tranquil-velvet">
                Modules
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.8px] text-black dark:text-white">
                Module registry
              </h1>
              <p className="text-sm text-dark-grey max-w-2xl">
                Manage modules, routes and availability with the same polished workflow as learner creation.
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-2 rounded-xl bg-cta-orange px-4 py-2.5 text-xs font-extrabold text-white shadow-[0_10px_24px_rgba(255,98,0,0.25)] transition hover:brightness-95 self-start sm:self-auto"
            >
              <Plus className="h-4 w-4" />
              New module
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <ProfileCardFrame theme={theme} className="lg:col-span-12 overflow-hidden p-0">
            <div className="overflow-x-auto sleek-scrollbar">
              <div className="p-4">
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-xs text-dark-grey">Showing {rangeStart}-{rangeEnd} of {modules.length} modules</div>
                    <div className="inline-flex items-center gap-2 rounded-l border border-medium-grey/30 bg-white/80 p-1 shadow-sm dark:bg-[#18181B]/80">
                      <button
                        type="button"
                        onClick={() => handleSetView('table')}
                        className={`inline-flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition ${viewMode === 'table' ? 'bg-tranquil-velvet text-white shadow-sm' : 'text-dark-grey hover:bg-tranquil-velvet/5'}`}
                      >
                        <List className="h-4 w-4" /> Table
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSetView('cards')}
                        className={`inline-flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition ${viewMode === 'cards' ? 'bg-tranquil-velvet text-white shadow-sm' : 'text-dark-grey hover:bg-tranquil-velvet/5'}`}
                      >
                        <LayoutGrid className="h-4 w-4" /> Cards
                      </button>
                    </div>
                  </div>

                  {viewMode === 'table' ? (
                    <div className="relative z-10 min-h-[320px] rounded-xl border border-medium-grey/40 bg-[#fcfdff] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:border-border-card dark:bg-[#12131a]">
                      <table className="w-full min-w-[920px] text-left text-xs">
                        <thead>
                          <tr className="bg-gradient-to-r from-[#f7f3ff] to-[#fff7ef] text-dark-grey uppercase tracking-[0.2em] dark:from-[#201d2b] dark:to-[#1d161d]">
                            <th className="rounded-l-2xl p-4 font-bold">Key</th>
                            <th className="p-4 font-bold">Title</th>
                            <th className="p-4 font-bold">Route</th>
                            <th className="p-4 font-bold">Submodules</th>
                            <th className="p-4 font-bold">Order</th>
                            <th className="p-4 font-bold">Status</th>
                            <th className="rounded-r-2xl p-4 text-center font-bold">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pageRows.map((row, index) => (
                            <motion.tr
                              key={row.key}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.04 }}
                              className="border-b border-medium-grey/20 text-sm last:border-b-0 hover:bg-tranquil-velvet/5 dark:border-border-card/30 dark:hover:bg-white/5"
                            >
                              <td className="p-4"><ModuleKeyBadge value={row.key} /></td>
                              <td className="p-4 font-bold text-black dark:text-white">{row.title}</td>
                              <td className="p-4 font-semibold text-tranquil-velvet dark:text-[#D3CCEC]">{row.route}</td>
                              <td className="p-4 text-dark-grey">{row.submodules}</td>
                              <td className="p-4 font-semibold text-black dark:text-white">{row.order}</td>
                              <td className="p-4"><ModuleStatusBadge active={row.active} /></td>
                              <td className="p-4"><ModuleActionsCell onView={() => handleOpenEdit(row)} onEdit={() => handleOpenEdit(row)} onToggle={() => handleToggleModule(row)} onDelete={() => handleDeleteModule(row.key)} /></td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="py-2">
                      <ModuleCardsGrid
                        items={pageRows}
                        onView={(m) => handleOpenEdit(m)}
                        onEdit={(m) => handleOpenEdit(m)}
                        onToggle={(m) => handleToggleModule(m)}
                        onDelete={(key) => handleDeleteModule(key)}
                      />
                    </div>
                  )}
                </div>
            </div>

            <div className="p-4 sm:p-5">
              <ModulePagination
                page={page}
                totalPages={totalPages}
                onPrev={() => setPage((value) => Math.max(1, value - 1))}
                onNext={() => setPage((value) => Math.min(totalPages, value + 1))}
                totalItems={modules.length}
                onPageSelect={(item) => setPage(item)}
                rangeStart={rangeStart}
                rangeEnd={rangeEnd}
              />
            </div>
          </ProfileCardFrame>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:col-span-12">
            <ModuleStatCard title="Registered Routes" count={modules.length} change="All active routes tracked" icon={ShieldCheck} glowColor="108 29 95" theme={theme} />
            <ModuleStatCard title="Active Modules" count={activeModules} change={`${modules.length - activeModules} disabled for review`} icon={Clock3} glowColor="1 172 159" theme={theme} />
            <ModuleStatCard title="Last Change" count={lastChangeMinutes} change="minutes ago" icon={History} glowColor="255 98 0" theme={theme} suffix="m" />
            <ModuleStatCard title="Avg Latency" count={averageLatency} change="Fast route resolution" icon={Gauge} glowColor="132 17 124" theme={theme} suffix="ms" />
          </div>
        </div>
      </motion.div>

      <ModuleFormModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateModule}
        value={newModule}
        onChange={handleChange}
        title={editingModuleKey ? 'Edit Module' : 'Create Module'}
        description={editingModuleKey ? 'Update the selected module entry.' : 'Add a reusable module entry to the manager.'}
      />
    </div>
  );
}