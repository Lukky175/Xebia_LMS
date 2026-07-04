/**
 * Author: Abhishek Dixit
 * Institution: Lovely Professional University
 * Developed the batches page of the application. 
 * This file contains the main batches page component, which
 * renders the batches dashboard, including batch requests, batch list, and batch creation modal.
 */

import React, { useEffect, useMemo, useState } from 'react';
import { Building2, CircleCheckBig, Eye, GraduationCap, PencilLine, Plus, Trash2, Users, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout.jsx';
import { useTheme } from '@/context/ThemeContext.jsx';
import { ProfileActionButton, ProfileActionModal, ProfileBadge, ProfileCardFrame } from '@/components/profile/ProfileUi.jsx';

const initialBatches = [
  {
    id: 1,
    name: 'Agentic AI vs Generative AI',
    organisation: 'State Technical University',
    learners: 0,
    status: 'Pending Approval',
    createdBy: 'race7290@gmail.com',
    duration: '3 Months (12 Weeks)',
  },
  {
    id: 2,
    name: 'Bennett Batch DevOps',
    organisation: 'State Technical University',
    learners: 0,
    status: 'Approved',
    createdBy: 'race7290@gmail.com',
    duration: '6 Months',
  },
];

const initialRequests = [
  {
    id: 1,
    batchName: 'Agentic AI vs Generative AI',
    createdBy: 'race7290@gmail.com',
  },
];

export default function BatchesPage() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [page, setPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [batches, setBatches] = useState(initialBatches);
  const [requests, setRequests] = useState(initialRequests);
  const [draftBatch, setDraftBatch] = useState({
    name: '',
    organisation: '',
    learners: '0',
    status: 'Pending Approval',
    duration: '3 Months (12 Weeks)',
  });

  const tabs = ['All', 'Pending', 'Approved', 'Rejected'];
  const pageSize = 5;

  const filteredBatches = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return batches.filter((batch) => {
      const matchesTab = activeTab === 'All' || batch.status.toLowerCase().includes(activeTab.toLowerCase());
      const matchesQuery = !query || [batch.name, batch.organisation, batch.createdBy, batch.duration, batch.status]
        .join(' ')
        .toLowerCase()
        .includes(query);
      return matchesTab && matchesQuery;
    });
  }, [activeTab, batches, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredBatches.length / pageSize));
  const pageRows = filteredBatches.slice((page - 1) * pageSize, page * pageSize);
  const rangeStart = filteredBatches.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, filteredBatches.length);

  useEffect(() => {
    setPage(1);
  }, [activeTab, searchQuery]);

  useEffect(() => {
    setPage((current) => Math.min(current, totalPages));
  }, [totalPages]);

  const resetForm = () => {
    setDraftBatch({
      name: '',
      organisation: '',
      learners: '0',
      status: 'Pending Approval',
      duration: '3 Months (12 Weeks)',
    });
  };

  const openCreateModal = () => {
    resetForm();
    setShowCreateModal(true);
  };

  const handleCreateBatch = (event) => {
    event.preventDefault();

    const nextBatch = {
      id: Date.now(),
      name: draftBatch.name.trim(),
      organisation: draftBatch.organisation.trim(),
      learners: Number(draftBatch.learners) || 0,
      status: draftBatch.status,
      createdBy: 'race7290@gmail.com',
      duration: draftBatch.duration,
    };

    setBatches((current) => [nextBatch, ...current]);
    if (nextBatch.status === 'Pending Approval') {
      setRequests((current) => [{ id: Date.now() + 1, batchName: nextBatch.name, createdBy: nextBatch.createdBy }, ...current]);
    }
    setShowCreateModal(false);
    resetForm();
    setPage(1);
  };

  const updateBatchStatus = (batchName, nextStatus) => {
    setBatches((current) => current.map((batch) => (
      batch.name === batchName ? { ...batch, status: nextStatus } : batch
    )));
  };

  const approveRequest = (request) => {
    updateBatchStatus(request.batchName, 'Approved');
    setRequests((current) => current.filter((item) => item.id !== request.id));
  };

  const rejectRequest = (request) => {
    updateBatchStatus(request.batchName, 'Rejected');
    setRequests((current) => current.filter((item) => item.id !== request.id));
  };

  const deleteBatch = (batchId) => {
    setBatches((current) => current.filter((batch) => batch.id !== batchId));
  };

  const statusTone = (status) => {
    if (status === 'Approved') return 'success';
    if (status === 'Pending Approval') return 'warning';
    if (status === 'Rejected') return 'accent';
    return 'secondary';
  };

  return (
    <DashboardLayout onSearchChange={(event) => setSearchQuery(event.target.value)} searchValue={searchQuery}>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 rounded-3xl border border-white/60 dark:border-border-card bg-white/80 dark:bg-[#16171F]/90 backdrop-blur-sm p-6 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 rounded-full bg-tranquil-velvet/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-tranquil-velvet">
                Cohorts
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.8px] text-black dark:text-white">
                Batches
              </h1>
              <p className="text-sm text-dark-grey max-w-2xl">
                Cohorts of learners, with approval and per-batch membership.
              </p>
            </div>

            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 rounded-xl bg-cta-orange px-4 py-2.5 text-xs font-extrabold text-white shadow-[0_10px_24px_rgba(255,98,0,0.25)] transition hover:brightness-95 self-start sm:self-auto"
            >
              <Plus className="h-4 w-4" />
              New batch
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition ${activeTab === tab ? 'bg-tranquil-velvet text-white shadow-sm' : 'bg-white/80 dark:bg-[#0F1015] text-dark-grey border border-medium-grey/40 dark:border-border-card hover:text-black dark:hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <ProfileCardFrame theme={theme} className="p-5 md:p-6">
            <div className="flex flex-col gap-4 border-b border-medium-grey/40 dark:border-border-card pb-4 mb-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-black dark:text-white">
                <GraduationCap className="h-4 w-4 text-tranquil-velvet dark:text-amber-400" />
                <div>
                  <h2 className="text-sm font-extrabold">Requests to approve ({requests.length})</h2>
                  <p className="text-[10px] text-dark-grey">Review new batch requests before they are published.</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {requests.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-medium-grey/40 dark:border-border-card bg-[#FBFBFE] dark:bg-[#0F1015] px-4 py-6 text-sm text-dark-grey text-center">
                  No requests waiting for approval.
                </div>
              ) : requests.map((request) => (
                <div key={request.id} className="flex flex-col gap-4 rounded-2xl border border-medium-grey/30 dark:border-border-card bg-[#FBFBFE] dark:bg-[#0F1015] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-tranquil-velvet/10 text-tranquil-velvet">
                      <GraduationCap className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-black dark:text-white">{request.batchName}</p>
                      <p className="text-xs text-dark-grey">by {request.createdBy}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <button
                      type="button"
                      onClick={() => approveRequest(request)}
                      className="inline-flex items-center gap-2 rounded-xl bg-tranquil-velvet px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-bright-velvet"
                    >
                      <CircleCheckBig className="h-3.5 w-3.5" />
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => rejectRequest(request)}
                      className="inline-flex items-center gap-2 rounded-xl border border-medium-grey/50 dark:border-border-card bg-white dark:bg-[#16171F] px-4 py-2 text-xs font-bold text-dark-grey transition hover:text-cta-orange hover:border-cta-orange/30"
                    >
                      <XCircle className="h-3.5 w-3.5" />
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </ProfileCardFrame>

          <ProfileCardFrame theme={theme} className="p-5 md:p-6">
            <div className="overflow-x-auto sleek-scrollbar">
              <table className="w-full min-w-[920px] text-left text-xs">
                <thead>
                  <tr className="border-b border-medium-grey/50 dark:border-border-card bg-[#F7F8FC]/80 dark:bg-[#18181B] text-dark-grey uppercase tracking-[0.18em]">
                    <th className="p-4">Batch</th>
                    <th className="p-4">Organisation</th>
                    <th className="p-4">Learners</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Created By</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pageRows.map((batch) => (
                    <tr key={batch.id} className="border-b border-medium-grey/30 dark:border-border-card/30 hover:bg-tranquil-velvet/5 dark:hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <div className="space-y-1">
                          <p className="font-bold text-black dark:text-white">{batch.name}</p>
                          <p className="text-[10px] text-dark-grey">{batch.duration}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-start gap-2 text-dark-grey">
                          <Building2 className="mt-0.5 h-3.5 w-3.5 text-tranquil-velvet" />
                          <span>{batch.organisation}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-2 rounded-full bg-[#EEF0FF] px-3 py-1 text-[10px] font-bold text-tranquil-velvet">
                          <Users className="h-3.5 w-3.5" />
                          {batch.learners}
                        </span>
                      </td>
                      <td className="p-4">
                        <ProfileBadge tone={statusTone(batch.status)}>{batch.status}</ProfileBadge>
                      </td>
                      <td className="p-4 font-medium text-dark-grey">{batch.createdBy}</td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <button type="button" className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-medium-grey/40 dark:border-border-card bg-white dark:bg-[#16171F] text-dark-grey hover:text-tranquil-velvet hover:bg-tranquil-velvet/5 transition" title="View">
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button type="button" className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-medium-grey/40 dark:border-border-card bg-white dark:bg-[#16171F] text-dark-grey hover:text-tranquil-velvet hover:bg-tranquil-velvet/5 transition" title="Edit">
                            <PencilLine className="h-3.5 w-3.5" />
                          </button>
                          <button type="button" onClick={() => deleteBatch(batch.id)} className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-cta-orange/20 bg-white dark:bg-[#16171F] text-cta-orange hover:bg-cta-orange/10 transition" title="Delete">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-3 border-t border-medium-grey/40 dark:border-border-card pt-4 mt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-dark-grey">Showing {rangeStart} to {rangeEnd} of {filteredBatches.length}</p>
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1} className="inline-flex items-center gap-1 rounded-lg border border-medium-grey/40 dark:border-border-card bg-white dark:bg-[#16171F] px-3 py-2 text-xs font-bold text-dark-grey disabled:opacity-40 disabled:cursor-not-allowed">
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setPage(item)}
                    className={`h-8 min-w-8 rounded-lg px-2 text-xs font-bold transition ${item === page ? 'bg-tranquil-velvet text-white' : 'bg-white dark:bg-[#16171F] text-dark-grey border border-medium-grey/40 dark:border-border-card'}`}
                  >
                    {item}
                  </button>
                ))}
                <button type="button" onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={page === totalPages} className="inline-flex items-center gap-1 rounded-lg border border-medium-grey/40 dark:border-border-card bg-white dark:bg-[#16171F] px-3 py-2 text-xs font-bold text-dark-grey disabled:opacity-40 disabled:cursor-not-allowed">
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </ProfileCardFrame>
        </div>
      </div>

      <ProfileActionModal
        open={showCreateModal}
        title="Create Batch"
        description="Add a new cohort and choose whether it starts as pending approval."
        onClose={() => setShowCreateModal(false)}
      >
        <form onSubmit={handleCreateBatch} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-dark-grey">Batch name</label>
              <input
                value={draftBatch.name}
                onChange={(event) => setDraftBatch((current) => ({ ...current, name: event.target.value }))}
                className="w-full rounded-xl border border-medium-grey/40 dark:border-border-card bg-white dark:bg-[#0F1015] px-3.5 py-2.5 text-xs font-semibold text-black dark:text-white focus:outline-none"
                placeholder="New cohort name"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-dark-grey">Organisation</label>
              <input
                value={draftBatch.organisation}
                onChange={(event) => setDraftBatch((current) => ({ ...current, organisation: event.target.value }))}
                className="w-full rounded-xl border border-medium-grey/40 dark:border-border-card bg-white dark:bg-[#0F1015] px-3.5 py-2.5 text-xs font-semibold text-black dark:text-white focus:outline-none"
                placeholder="Organisation name"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-dark-grey">Learners</label>
              <input
                type="number"
                min="0"
                value={draftBatch.learners}
                onChange={(event) => setDraftBatch((current) => ({ ...current, learners: event.target.value }))}
                className="w-full rounded-xl border border-medium-grey/40 dark:border-border-card bg-white dark:bg-[#0F1015] px-3.5 py-2.5 text-xs font-semibold text-black dark:text-white focus:outline-none"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-dark-grey">Duration</label>
              <select
                value={draftBatch.duration}
                onChange={(event) => setDraftBatch((current) => ({ ...current, duration: event.target.value }))}
                className="w-full rounded-xl border border-medium-grey/40 dark:border-border-card bg-white dark:bg-[#0F1015] px-3.5 py-2.5 text-xs font-semibold text-black dark:text-white focus:outline-none"
              >
                <option>3 Months (12 Weeks)</option>
                <option>6 Months</option>
                <option>9 Months</option>
                <option>1 Year</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-dark-grey">Initial status</label>
              <select
                value={draftBatch.status}
                onChange={(event) => setDraftBatch((current) => ({ ...current, status: event.target.value }))}
                className="w-full rounded-xl border border-medium-grey/40 dark:border-border-card bg-white dark:bg-[#0F1015] px-3.5 py-2.5 text-xs font-semibold text-black dark:text-white focus:outline-none"
              >
                <option>Pending Approval</option>
                <option>Approved</option>
                <option>Rejected</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-dark-grey">Created by</label>
              <input
                value="race7290@gmail.com"
                disabled
                className="w-full rounded-xl border border-medium-grey/40 dark:border-border-card bg-[#F7F8FC] dark:bg-[#0F1015] px-3.5 py-2.5 text-xs font-semibold text-dark-grey focus:outline-none"
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 pt-2">
            <ProfileActionButton tone="secondary" onClick={() => setShowCreateModal(false)}>Cancel</ProfileActionButton>
            <ProfileActionButton type="submit">Save Batch</ProfileActionButton>
          </div>
        </form>
      </ProfileActionModal>
    </DashboardLayout>
  );
}
