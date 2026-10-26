import React from 'react';

const priorityConfig = {
  High: { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500' },
  Medium: { bg: 'bg-amber-100', text: 'text-amber-800', dot: 'bg-amber-500' },
  Low: { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' },
};

const statusConfig = {
  Pending: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  'In Progress': { bg: 'bg-blue-100', text: 'text-blue-800' },
  Completed: { bg: 'bg-green-100', text: 'text-green-800' },
};

const sourceConfig = {
  CRM: { bg: 'bg-indigo-100', text: 'text-indigo-800', icon: '🏢' },
  Helpdesk: { bg: 'bg-purple-100', text: 'text-purple-800', icon: '🎧' },
};

export default function TaskTable({ tasks }) {
  return (
    <div className="hidden lg:block bg-white rounded-xl card-shadow overflow-hidden animate-fade-in">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Task
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Source
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tasks.map((task, index) => {
              const priority = priorityConfig[task.priorityLevel] || priorityConfig.Low;
              const status = statusConfig[task.status] || statusConfig.Pending;
              const source = sourceConfig[task.source] || sourceConfig.CRM;

              return (
                <tr
                  key={task.id}
                  className={`transition-colors duration-150 hover:bg-gray-50
                    ${task.isOverdue ? 'bg-red-50/50' : ''}
                  `}
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <td className="px-4 py-3">
                    <span className="text-xs font-mono font-bold text-gray-400">
                      {task.id}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-gray-800 line-clamp-1">
                      {task.title}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-700">{task.employeeName}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${status.bg} ${status.text}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${priority.bg} ${priority.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${priority.dot}`}></span>
                      {task.priorityLevel}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-sm ${task.isOverdue ? 'text-red-600 font-bold' : 'text-gray-600'}`}>
                      {task.dueDateFormatted}
                      {task.isOverdue && (
                        <span className="block text-xs text-red-500">
                          {Math.abs(task.daysUntilDue)}d overdue
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold ${source.bg} ${source.text}`}>
                      {source.icon} {task.source}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={task.redirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 
                        rounded-lg text-xs font-semibold hover:bg-blue-100 transition-all duration-200 group"
                    >
                      Open
                      <svg
                        className="w-3 h-3 transition-transform group-hover:translate-x-0.5"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}