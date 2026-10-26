import React from 'react';

const priorityConfig = {
  High: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-200',
    dot: 'bg-red-500',
  },
  Medium: {
    bg: 'bg-amber-100',
    text: 'text-amber-800',
    border: 'border-amber-200',
    dot: 'bg-amber-500',
  },
  Low: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-200',
    dot: 'bg-green-500',
  },
};

const statusConfig = {
  Pending: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  'In Progress': { bg: 'bg-blue-100', text: 'text-blue-800' },
  Completed: { bg: 'bg-green-100', text: 'text-green-800' },
};

const sourceConfig = {
  CRM: { bg: 'bg-indigo-600', text: 'text-white', icon: '🏢' },
  Helpdesk: { bg: 'bg-purple-600', text: 'text-white', icon: '🎧' },
};

export default function TaskCard({ task }) {
  const priority = priorityConfig[task.priorityLevel] || priorityConfig.Low;
  const status = statusConfig[task.status] || statusConfig.Pending;
  const source = sourceConfig[task.source] || sourceConfig.CRM;

  return (
    <div
      className={`bg-white rounded-xl card-shadow p-4 sm:p-5 
        transition-all duration-300 hover:card-shadow-hover hover:translate-y-[-2px]
        animate-slide-up border-l-4
        ${task.isOverdue ? 'border-l-red-500 bg-red-50/30' : 'border-l-transparent'}
      `}
    >
      {/* Header Row */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-mono font-bold text-gray-400">{task.id}</span>
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${source.bg} ${source.text}`}>
            {source.icon} {task.source}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${priority.bg} ${priority.text} ${priority.border} border`}>
            <span className={`w-1.5 h-1.5 rounded-full ${priority.dot}`}></span>
            {task.priorityLevel}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-3 leading-snug">
        {task.title}
      </h3>

      {/* Details Row */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 mb-4">
        <div className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="font-medium text-gray-700">{task.employeeName}</span>
        </div>
        <div className={`flex items-center gap-1 ${task.isOverdue ? 'text-red-600 font-bold' : ''}`}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>
            {task.dueDateFormatted}
            {task.isOverdue && (
              <span className="ml-1 text-red-600 font-bold">
                ({Math.abs(task.daysUntilDue)}d overdue)
              </span>
            )}
            {!task.isOverdue && task.daysUntilDue <= 3 && task.daysUntilDue >= 0 && task.status !== 'Completed' && (
              <span className="ml-1 text-amber-600 font-semibold">
                ({task.daysUntilDue === 0 ? 'Due today' : `${task.daysUntilDue}d left`})
              </span>
            )}
          </span>
        </div>
      </div>

      {/* Footer Row */}
      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${status.bg} ${status.text}`}>
          {task.status}
        </span>
        <a
          href={task.redirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 
            rounded-lg text-xs font-semibold hover:bg-blue-100 
            transition-all duration-200 group"
        >
          Open in {task.source}
          <svg
            className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}