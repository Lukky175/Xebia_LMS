/* @ author : Yash Pahwa
@email: yashpahwa.work@gmail.com
mobile : +91 8802444447
Thapar Institute of Engineering and Technology
*/

/*
 * Component: AuditCards
 * Purpose: Displays summary statistics cards at the top of the audit log page.
 * Features: Total logs, successful/failed counts, today's activity, and critical events
 * with animated card transitions.
 */
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle2, XCircle, Activity, ShieldAlert } from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
};

const hoverVariant = {
  hover: {
    y: -4,
    transition: { type: 'spring', stiffness: 400, damping: 22 },
  },
};

function AuditStatCard({ title, count, change, icon: Icon, index }) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      whileHover="hover"
      className="group"
    >
      <motion.div
        variants={hoverVariant}
        className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.05)] dark:bg-[#16171F] dark:shadow-[0_1px_3px_rgba(0,0,0,0.25)] border border-transparent hover:border-tranquil-velvet/15 hover:shadow-[0_8px_24px_rgba(108,29,95,0.1)] dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-[border-color,box-shadow] duration-300"
      >
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-dark-grey">{title}</span>
          <p className="text-2xl font-extrabold text-black dark:text-white">{count}</p>
          <p className="text-[10px] font-medium text-dark-grey">{change}</p>
        </div>
        <motion.div
          whileHover={{ scale: 1.12, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-tranquil-velvet/[0.07] text-tranquil-velvet dark:bg-tranquil-velvet/15"
        >
          <Icon className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function AuditCards({ stats }) {
  const cards = useMemo(
    () => [
      {
        title: 'Total Logs',
        count: stats.total,
        change: 'Immutable audit records',
        icon: FileText,
      },
      {
        title: 'Successful Actions',
        count: stats.successful,
        change: 'Completed without errors',
        icon: CheckCircle2,
      },
      {
        title: 'Failed Actions',
        count: stats.failed,
        change: 'Requires investigation',
        icon: XCircle,
      },
      {
        title: "Today's Activity",
        count: stats.todayActivity,
        change: 'Events logged today',
        icon: Activity,
      },
      {
        title: 'Critical Actions',
        count: stats.critical,
        change: 'High-priority security events',
        icon: ShieldAlert,
      },
    ],
    [stats]
  );

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5" role="region" aria-label="Audit log statistics">
      {cards.map((card, index) => (
        <AuditStatCard key={card.title} {...card} index={index} />
      ))}
    </div>
  );
}
