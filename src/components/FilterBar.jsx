import React from 'react';

export default function FilterBar({ filters, onFilterChange, employees }) {
  const handleChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value });
  };

  const activeFilterCount = [
    filters.employee !== 'All',
    filters.status !== 'All',
    filters.source !== 'All',
    filters.priority !== 'All',
    filters.search?.trim(),
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    onFilterChange({
      employee: 'All',
      status: 'All',
      source: 'All',
      priority: 'All',
      search: '',
    });
  };

  const selectClass =
    'w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-sm ' +
    'focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ' +
    'transition-all duration-200 cursor-pointer appearance-none ' +
    'bg-[url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20fill%3D%27none%27%20viewBox%3D%270%200%2024%2024%27%20stroke%3D%27%236b7280%27%3E%3Cpath%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27%20stroke-width%3D%272%27%20d%3D%27M19%209l-7%207-7-7%27/%3E%3C/svg%3E")] ' +
    'bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat pr-10';

  return (
    <div className="bg-white rounded-xl card-shadow p-4 sm:p-5 mb-6 animate-fade-in">
      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search by task title, ID, or employee name..."
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none 
              transition-all duration-200 placeholder-gray-400"
          />
          {filters.search && (
            <button
              onClick={() => handleChange('search', '')}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 
                hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Filter Dropdowns */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Employee Filter */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Employee
          </label>
          <select
            value={filters.employee}
            onChange={(e) => handleChange('employee', e.target.value)}
            className={selectClass}
          >
            <option value="All">All Employees</option>
            {employees.map((emp) => (
              <option key={emp} value={emp}>{emp}</option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className={selectClass}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Source Filter */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Source
          </label>
          <select
            value={filters.source}
            onChange={(e) => handleChange('source', e.target.value)}
            className={selectClass}
          >
            <option value="All">All Sources</option>
            <option value="CRM">CRM</option>
            <option value="Helpdesk">Helpdesk</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Priority
          </label>
          <select
            value={filters.priority}
            onChange={(e) => handleChange('priority', e.target.value)}
            className={selectClass}
          >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Active Filters Badge & Clear */}
      {activeFilterCount > 0 && (
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-1">
              {activeFilterCount}
            </span>
            active filter{activeFilterCount !== 1 ? 's' : ''}
          </span>
          <button
            onClick={clearAllFilters}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium 
              transition-colors duration-200 flex items-center gap-1"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}