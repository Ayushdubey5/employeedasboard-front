import React from 'react';

const MetricCard = ({ title, value, icon, bgColor, textColor, borderColor }) => (
  <div
    className={`${bgColor} ${borderColor} border rounded-xl p-4 sm:p-5 card-shadow 
    transition-all duration-300 hover:card-shadow-hover hover:scale-[1.02] animate-fade-in`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">
          {title}
        </p>
        <p className={`text-2xl sm:text-3xl font-bold mt-1 ${textColor}`}>
          {value}
        </p>
      </div>
      <div className="text-3xl sm:text-4xl opacity-80">{icon}</div>
    </div>
  </div>
);

export default function MetricsCards({ metrics }) {
  const cards = [
    {
      title: 'Total Tasks',
      value: metrics.totalTasks,
      icon: '📋',
      bgColor: 'bg-white',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-200',
    },
    {
      title: 'Pending',
      value: metrics.pendingTasks,
      icon: '⏳',
      bgColor: 'bg-white',
      textColor: 'text-amber-600',
      borderColor: 'border-amber-200',
    },
    {
      title: 'High Priority',
      value: metrics.highPriorityTasks,
      icon: '🔥',
      bgColor: 'bg-white',
      textColor: 'text-red-600',
      borderColor: 'border-red-200',
    },
    {
      title: 'Overdue',
      value: metrics.overdueTasks,
      icon: '🚨',
      bgColor: metrics.overdueTasks > 0 ? 'bg-red-50' : 'bg-white',
      textColor: metrics.overdueTasks > 0 ? 'text-red-700' : 'text-gray-600',
      borderColor: metrics.overdueTasks > 0 ? 'border-red-300' : 'border-gray-200',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
      {cards.map((card) => (
        <MetricCard key={card.title} {...card} />
      ))}
    </div>
  );
}