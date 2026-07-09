import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, UserCheck, UserPlus, GraduationCap, Search, 
  Filter, ChevronLeft, ChevronRight, Download, Trash, Edit 
} from 'lucide-react';
import CountUp from '@/components/ui/CountUp.jsx';
import BorderGlow from '@/components/ui/BorderGlow.jsx';
import { useTheme } from '@/context/ThemeContext.jsx';
import { api } from '@/services/api.js';

export default function UsersPage({ searchQuery }) {
  const { theme } = useTheme();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [localSearch, setLocalSearch] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await api.getUsers();
        setUsers(data);
      } catch (err) {
        console.error("Failed to load users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);


  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const usersPerPage = 5;

  const activeSearch = searchQuery || localSearch;

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(activeSearch.toLowerCase()) || 
                          user.email.toLowerCase().includes(activeSearch.toLowerCase()) ||
                          user.role.toLowerCase().includes(activeSearch.toLowerCase());
    const matchesRole = roleFilter === 'All' || user.role.includes(roleFilter);
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(currentUsers.map(u => u.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (id) => {
    setSelectedUsers(prev => 
      prev.includes(id) ? prev.filter(uId => uId !== id) : [...prev, id]
    );
  };

  const handleDeleteUser = async (id) => {
    try {
      const updated = await api.deleteUser(id);
      setUsers(updated);
      setSelectedUsers(prev => prev.filter(uId => uId !== id));
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  const handleBulkDelete = async () => {
    try {
      const updated = await api.deleteUsersBulk(selectedUsers);
      setUsers(updated);
      setSelectedUsers([]);
    } catch (err) {
      console.error("Failed to bulk delete users:", err);
    }
  };

  const exportToCSV = () => {
    const headers = ['Name,Email,Role,Enrollments,Progress,Last Login,Status\n'];
    const rows = filteredUsers.map(u => `${u.name},${u.email},${u.role},${u.enrollments},${u.progress}%,${u.lastLogin},${u.status}\n`);
    const blob = new Blob([...headers, ...rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'lms_users_export.csv');
    a.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="h-10 w-10 border-4 border-tranquil-velvet border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total Users', count: users.length, change: 'From mock database', icon: Users, color: '304 76 30' },
          { title: 'Active Users', count: users.filter(u => u.status === 'active').length, change: `${users.filter(u => u.status === 'active').length} active records`, icon: UserCheck, color: '176 99 34' },
          { title: 'Total Enrollments', count: users.reduce((acc, u) => acc + u.enrollments, 0), change: 'Across all modules', icon: UserPlus, color: '304 76 30' },
          { title: 'Avg Progress', count: users.length ? Math.round(users.reduce((acc, u) => acc + u.progress, 0) / users.length) : 0, change: 'Syllabus completion', icon: GraduationCap, color: '176 99 34', suffix: '%' }
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <BorderGlow
              key={idx}
              edgeSensitivity={20}
              glowColor={stat.color}
              backgroundColor={theme === 'dark' ? '#16171F' : '#FFFFFF'}
              borderRadius={16}
              glowRadius={30}
              glowIntensity={1.2}
            >
              <div className="p-5 flex justify-between items-center bg-white dark:bg-[#16171F] rounded-2xl">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-dark-grey uppercase tracking-wider">{stat.title}</span>
                  <p className="text-2xl font-extrabold text-black dark:text-white">
                    <CountUp from={0} to={stat.count} duration={1.2} separator="," />{stat.suffix}
                  </p>
                  <p className="text-[10px] text-emerald font-semibold">{stat.change}</p>
                </div>
                <div className="h-10 w-10 bg-tranquil-velvet/10 dark:bg-tranquil-velvet-dark/30 rounded-xl flex items-center justify-center text-tranquil-velvet dark:text-amber-400">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </BorderGlow>
          );
        })}
      </div>

      {/* Main Table Panel */}
      <div className="bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl shadow-sm p-6 space-y-6">
        
        {/* Controls, Filters, Search */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {!searchQuery && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-blueish-grey dark:bg-bg-page border border-medium-grey dark:border-border-card rounded-xl w-60">
                <Search className="h-4 w-4 text-dark-grey" />
                <input 
                  type="text" 
                  placeholder="Filter by name, email..." 
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="bg-transparent text-xs text-black dark:text-white focus:outline-none w-full font-medium"
                />
              </div>
            )}

            {/* Role Filter */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blueish-grey dark:bg-bg-page border border-medium-grey dark:border-border-card rounded-xl">
              <Filter className="h-4 w-4 text-dark-grey" />
              <select 
                value={roleFilter} 
                onChange={(e) => setRoleFilter(e.target.value)}
                className="bg-transparent text-xs text-black dark:text-white focus:outline-none font-bold cursor-pointer"
              >
                <option value="All">All Roles</option>
                {Array.from(new Set(users.map(u => u.role))).filter(Boolean).map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blueish-grey dark:bg-bg-page border border-medium-grey dark:border-border-card rounded-xl">
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-xs text-black dark:text-white focus:outline-none font-bold cursor-pointer"
              >
                <option value="All">All Status</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {selectedUsers.length > 0 && (
              <button 
                onClick={handleBulkDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer border border-transparent"
              >
                <Trash className="h-4 w-4" />
                <span>Delete ({selectedUsers.length})</span>
              </button>
            )}

            <button 
              onClick={exportToCSV}
              className="px-4 py-2 bg-blueish-grey hover:bg-medium-grey/40 dark:bg-bg-page dark:hover:bg-[#1E1F29] border border-medium-grey dark:border-border-card text-black dark:text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Datatable */}
        <div className="overflow-x-auto sleek-scrollbar">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-medium-grey/50 dark:border-border-card text-dark-grey uppercase font-bold tracking-wider bg-blueish-grey/50 dark:bg-bg-page/50">
                <th className="p-4 w-12 text-center">
                  <input 
                    type="checkbox" 
                    onChange={handleSelectAll}
                    checked={currentUsers.length > 0 && selectedUsers.length === currentUsers.length}
                    className="cursor-pointer"
                  />
                </th>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Enrollments</th>
                <th className="p-4 w-44">Syllabus Progress</th>
                <th className="p-4">Last Login</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map(user => {
                const isSelected = selectedUsers.includes(user.id);
                return (
                  <tr 
                    key={user.id} 
                    className={`border-b border-medium-grey/30 dark:border-border-card/30 hover:bg-blueish-grey/30 dark:hover:bg-bg-page/20 transition ${isSelected ? 'bg-tranquil-velvet/5 dark:bg-tranquil-velvet-dark/10' : ''}`}
                  >
                    <td className="p-4 text-center">
                      <input 
                        type="checkbox" 
                        checked={isSelected}
                        onChange={() => handleSelectUser(user.id)}
                        className="cursor-pointer"
                      />
                    </td>
                    <td className="p-4 font-bold text-black dark:text-white">{user.name}</td>
                    <td className="p-4 font-medium text-dark-grey">{user.email}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-blueish-grey dark:bg-bg-page text-black dark:text-white rounded border border-medium-grey/40 font-semibold">{user.role}</span>
                    </td>
                    <td className="p-4 font-semibold text-center">{user.enrollments}</td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold text-black dark:text-white">
                          <span>Progress</span>
                          <span>{user.progress}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-light-grey dark:bg-bg-page rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${user.progress === 100 ? 'bg-emerald' : 'bg-tranquil-velvet'}`} style={{ width: `${user.progress}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-medium text-dark-grey">{user.lastLogin}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${user.status === 'active' ? 'bg-emerald/10 text-emerald' : 'bg-dark-grey/10 text-dark-grey'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => alert(`Editing user: ${user.name}`)}
                          className="p-1 hover:text-tranquil-velvet hover:bg-tranquil-velvet/10 rounded transition cursor-pointer text-dark-grey"
                          title="Edit User"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-1 hover:text-red-500 hover:bg-red-500/10 rounded transition cursor-pointer text-dark-grey"
                          title="Delete User"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {currentUsers.length === 0 && (
                <tr>
                  <td colSpan="9" className="p-12 text-center text-dark-grey font-semibold">
                    No users match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center border-t border-medium-grey/40 dark:border-border-card/40 pt-4">
            <span className="text-[10px] font-bold text-dark-grey uppercase tracking-wider">
              Showing {indexOfFirstUser + 1} - {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
            </span>
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-medium-grey dark:border-border-card bg-blueish-grey dark:bg-bg-page hover:bg-medium-grey/30 rounded-lg transition disabled:opacity-50 cursor-pointer text-dark-grey"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-xs font-bold text-black dark:text-white px-3">Page {currentPage} of {totalPages}</span>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 border border-medium-grey dark:border-border-card bg-blueish-grey dark:bg-bg-page hover:bg-medium-grey/30 rounded-lg transition disabled:opacity-50 cursor-pointer text-dark-grey"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
