import React, { useMemo, useState } from 'react';
import { Plus, Clock3, ShieldCheck, History, Gauge } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext.jsx';
import { ProfileActionButton, ProfileCardFrame } from '@/components/profile/ProfileUi.jsx';
import {
  ModuleActionsCell,
  ModuleKeyBadge,
  ModulePagination,
  ModuleStatCard,
  ModuleFormModal,
  ModuleStatusBadge,
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
      <div className="flex flex-col gap-4 rounded-3xl border border-white/60 dark:border-border-card bg-white/80 dark:bg-[#16171F]/90 backdrop-blur-sm p-6 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-tranquil-velvet/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-tranquil-velvet">
              Access Control
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.8px] text-black dark:text-white">
              Modules
            </h1>
            <p className="text-sm text-dark-grey max-w-2xl">
              Configure and manage core system functional modules and access routes using the brand palette and shared dashboard components.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-cta-orange px-4 py-2.5 text-xs font-extrabold text-white shadow-[0_10px_24px_rgba(255,98,0,0.25)] transition hover:brightness-95 self-start sm:self-auto"
          >
            <Plus className="h-4 w-4" />
            New Module
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <ProfileCardFrame theme={theme} className="lg:col-span-12 overflow-hidden p-0">
            <div className="overflow-x-auto sleek-scrollbar">
              <table className="w-full min-w-[920px] text-left text-xs">
                <thead>
                  <tr className="border-b border-medium-grey/50 dark:border-border-card bg-[#F7F8FC]/80 dark:bg-[#18181B] text-dark-grey uppercase tracking-[0.18em]">
                    <th className="p-4">Key</th>
                    <th className="p-4">Title</th>
                    <th className="p-4">Route</th>
                    <th className="p-4">Submodules</th>
                    <th className="p-4">Order</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pageRows.map((row) => (
                    <tr key={row.key} className="border-b border-medium-grey/30 dark:border-border-card/30 hover:bg-tranquil-velvet/5 dark:hover:bg-white/5 transition-colors">
                      <td className="p-4"><ModuleKeyBadge value={row.key} /></td>
                      <td className="p-4 font-bold text-black dark:text-white">{row.title}</td>
                      <td className="p-4 font-medium text-tranquil-velvet dark:text-[#D3CCEC]">{row.route}</td>
                      <td className="p-4 text-dark-grey">{row.submodules}</td>
                      <td className="p-4 font-semibold text-black dark:text-white">{row.order}</td>
                      <td className="p-4"><ModuleStatusBadge active={row.active} /></td>
                      <td className="p-4"><ModuleActionsCell onView={() => handleOpenEdit(row)} onEdit={() => handleOpenEdit(row)} onToggle={() => handleToggleModule(row)} onDelete={() => handleDeleteModule(row.key)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
      </div>

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