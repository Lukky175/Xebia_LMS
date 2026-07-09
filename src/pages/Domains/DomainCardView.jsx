import React from 'react';
import { Eye, Edit2, RefreshCw, Trash2 } from 'lucide-react';

// Category → badge colour mapping matching the Figma palette
const CATEGORY_COLOR = {
  Frontend:     '#7C3AED',
  Backend:      '#16A34A',
  DevOps:       '#DC2626',
  'Data Science': '#1D4ED8',
  Monitoring:   '#0891B2',
  Architecture: '#9333EA',
  Security:     '#D97706',
  Design:       '#EC4899',
};

function getBadgeColor(category) {
  return CATEGORY_COLOR[category] || '#6B7280';
}

function getParentName(parentId, allDomains) {
  if (!parentId) return null;
  const p = allDomains.find(d => d.id === parentId);
  return p ? p.name : null;
}

function StatusBadge({ status }) {
  const isActive = status === 'Active';
  return (
    <span
      className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${
        isActive
          ? 'bg-emerald/10 text-emerald border-emerald/20'
          : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
      }`}
    >
      {status}
    </span>
  );
}

function ActionIcon({ onClick, title, children, variant = 'default' }) {
  const colours = {
    default: 'hover:bg-tranquil-velvet/10 hover:text-tranquil-velvet',
    danger:  'hover:bg-red-500/10 hover:text-red-500',
    toggle:  'hover:bg-emerald/10 hover:text-emerald',
  };
  return (
    <button
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded-lg transition cursor-pointer text-dark-grey ${colours[variant]}`}
    >
      {children}
    </button>
  );
}

export default function DomainCardView({ domains, allDomains, onDelete, onToggleStatus, onEdit }) {
  if (domains.length === 0) {
    return (
      <div className="col-span-3 py-16 text-center text-dark-grey font-semibold text-sm">
        No domains match your filters.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {domains.map(domain => {
        const badgeColor = getBadgeColor(domain.category);
        const parentName = getParentName(domain.parentId, allDomains);

        return (
          <div
            key={domain.id}
            className="bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Card Top */}
            <div className="p-4 space-y-3">
              {/* Code badge + Name + Status */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  {/* Coloured code chip */}
                  <div
                    className="h-9 min-w-[56px] px-2 rounded-lg flex items-center justify-center text-white font-extrabold text-[10px] tracking-widest shrink-0 select-none"
                    style={{ backgroundColor: badgeColor }}
                  >
                    {domain.code}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-black dark:text-white leading-tight truncate">
                      {domain.name}
                    </h3>
                    <p className="text-[10px] text-dark-grey font-semibold mt-0.5">
                      Code: {domain.code}
                    </p>
                  </div>
                </div>
                <StatusBadge status={domain.status} />
              </div>

              {/* Parent field */}
              <div className="flex items-center justify-between text-xs pt-1 border-t border-medium-grey/40 dark:border-[#282A3A]/60">
                <span className="text-dark-grey font-semibold">Parent</span>
                <span className={`font-bold ${parentName ? 'text-black dark:text-white' : 'text-dark-grey'}`}>
                  {parentName || '—'}
                </span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="px-4 py-2.5 border-t border-medium-grey/40 dark:border-[#282A3A]/60 bg-bg-page dark:bg-[#0F1015] flex items-center gap-0.5">
              <ActionIcon onClick={() => onEdit(domain)} title="View Details">
                <Eye className="h-3.5 w-3.5" />
              </ActionIcon>
              <ActionIcon onClick={() => onEdit(domain)} title="Edit Domain">
                <Edit2 className="h-3.5 w-3.5" />
              </ActionIcon>
              <ActionIcon
                onClick={() => onToggleStatus(domain)}
                title={domain.status === 'Active' ? 'Deactivate' : 'Activate'}
                variant="toggle"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </ActionIcon>
              <ActionIcon onClick={() => onDelete(domain.id)} title="Delete Domain" variant="danger">
                <Trash2 className="h-3.5 w-3.5" />
              </ActionIcon>
            </div>
          </div>
        );
      })}
    </div>
  );
}
