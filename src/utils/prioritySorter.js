/**
 * Sorts tasks using a multi-factor priority algorithm.
 * 
 * Primary Factor: Due date (ascending) — tasks due soonest appear first.
 *                 Overdue tasks always appear at the very top.
 * Secondary Factor: Priority weight (descending) — breaks ties for same-date tasks.
 */
export function sortTasksByPriority(tasks) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  return [...tasks].sort((a, b) => {
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);
    dateA.setHours(0, 0, 0, 0);
    dateB.setHours(0, 0, 0, 0);

    const aOverdue = dateA < now && a.status !== 'Completed';
    const bOverdue = dateB < now && b.status !== 'Completed';

    // Overdue tasks always come first
    if (aOverdue && !bOverdue) return -1;
    if (!aOverdue && bOverdue) return 1;

    // Among overdue or among non-overdue, sort by date ascending
    if (dateA.getTime() !== dateB.getTime()) {
      return dateA - dateB;
    }

    // Same date: higher priority first
    const weightA = a.priorityWeight || getPriorityWeightFallback(a.priorityLevel);
    const weightB = b.priorityWeight || getPriorityWeightFallback(b.priorityLevel);
    return weightB - weightA;
  });
}

function getPriorityWeightFallback(priority) {
  const weights = { High: 3, Critical: 3, Medium: 2, Moderate: 2, Low: 1 };
  return weights[priority] || 0;
}

/**
 * Applies all active filters and search to the task list.
 */
export function filterTasks(tasks, filters) {
  let filtered = [...tasks];

  // Employee filter
  if (filters.employee && filters.employee !== 'All') {
    filtered = filtered.filter((t) => t.employeeName === filters.employee);
  }

  // Status filter
  if (filters.status && filters.status !== 'All') {
    filtered = filtered.filter((t) => t.status === filters.status);
  }

  // Source filter
  if (filters.source && filters.source !== 'All') {
    filtered = filtered.filter((t) => t.source === filters.source);
  }

  // Priority filter
  if (filters.priority && filters.priority !== 'All') {
    filtered = filtered.filter((t) => t.priorityLevel === filters.priority);
  }

  // Search filter
  if (filters.search && filters.search.trim()) {
    const searchTerm = filters.search.toLowerCase().trim();
    filtered = filtered.filter(
      (t) =>
        t.title.toLowerCase().includes(searchTerm) ||
        t.id.toLowerCase().includes(searchTerm) ||
        t.employeeName.toLowerCase().includes(searchTerm)
    );
  }

  return filtered;
}