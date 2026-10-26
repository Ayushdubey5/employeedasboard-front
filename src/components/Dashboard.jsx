import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchTasks } from '../utils/api';
import { normalizeTasks } from '../utils/dataNormalizer';
import { sortTasksByPriority, filterTasks } from '../utils/prioritySorter';
import MetricsCards from './MetricsCards';
import FilterBar from './FilterBar';
import TaskCard from './TaskCard';
import TaskTable from './TaskTable';
import LoadingSpinner from './LoadingSpinner';
import ErrorAlert from './ErrorAlert';
import EmptyState from './EmptyState';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [metrics, setMetrics] = useState({
    totalTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0,
    completedTasks: 0,
    highPriorityTasks: 0,
    overdueTasks: 0,
  });
  const [employees, setEmployees] = useState([]);
  const [warnings, setWarnings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'

  const [filters, setFilters] = useState({
    employee: 'All',
    status: 'All',
    source: 'All',
    priority: 'All',
    search: '',
  });

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    setWarnings([]);

    try {
      const data = await fetchTasks();

      if (data.success) {
        const normalized = normalizeTasks(data.tasks);
        const sorted = sortTasksByPriority(normalized);

        setTasks(sorted);
        setMetrics(data.metrics);
        setEmployees(data.employees || []);
        setWarnings(data.warnings || []);
      } else {
        setError(data.error || 'Unknown error occurred');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // Filter and sort tasks
  const filteredTasks = useMemo(() => {
    const filtered = filterTasks(tasks, filters);
    return sortTasksByPriority(filtered);
  }, [tasks, filters]);

  // Recalculate displayed metrics based on filtered tasks
  const displayMetrics = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    return {
      totalTasks: filteredTasks.length,
      pendingTasks: filteredTasks.filter((t) => t.status === 'Pending').length,
      highPriorityTasks: filteredTasks.filter((t) => t.priorityLevel === 'High').length,
      overdueTasks: filteredTasks.filter(
        (t) => new Date(t.dueDate) < now && t.status !== 'Completed'
      ).length,
    };
  }, [filteredTasks]);

  const clearFilters = () => {
    setFilters({
      employee: 'All',
      status: 'All',
      source: 'All',
      priority: 'All',
      search: '',
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert error={error} onRetry={loadTasks} />;
  }

  return (
    <div className="animate-fade-in">
      {/* API Warnings Banner */}
      {warnings.length > 0 && (
        <div className="mb-4 bg-amber-50 border border-amber-200 rounded-xl p-4 animate-slide-up">
          <div className="flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <h4 className="text-sm font-bold text-amber-800">Partial Data Warning</h4>
              {warnings.map((w, i) => (
                <p key={i} className="text-xs text-amber-700 mt-1">{w}</p>
              ))}
              <p className="text-xs text-amber-600 mt-2">
                Some data may be missing. 
                <button
                  onClick={loadTasks}
                  className="ml-1 text-amber-800 underline hover:no-underline font-semibold"
                >
                  Retry loading
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Metrics */}
      <MetricsCards metrics={displayMetrics} />

      {/* Filters */}
      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        employees={employees}
      />

      {/* Results Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          Showing{' '}
          <span className="font-bold text-gray-700">{filteredTasks.length}</span>{' '}
          of{' '}
          <span className="font-bold text-gray-700">{tasks.length}</span> tasks
        </p>

        {/* View Toggle */}
        <div className="hidden lg:flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('cards')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200
              ${viewMode === 'cards'
                ? 'bg-white text-gray-800 card-shadow'
                : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Cards
            </span>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200
              ${viewMode === 'table'
                ? 'bg-white text-gray-800 card-shadow'
                : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Table
            </span>
          </button>
        </div>
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <EmptyState onClearFilters={clearFilters} />
      ) : viewMode === 'table' ? (
        <>
          <TaskTable tasks={filteredTasks} />
          {/* Mobile cards fallback (table is hidden on mobile) */}
          <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}

      {/* Footer info */}
      <div className="mt-6 text-center text-xs text-gray-400">
        Last updated: {new Date().toLocaleString('en-IN')} • 
        Data aggregated from CRM & Helpdesk APIs
      </div>
    </div>
  );
}