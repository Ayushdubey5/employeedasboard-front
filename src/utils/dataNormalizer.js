/**
 * Ensures all tasks conform to the unified schema.
 * Adds computed fields like isOverdue.
 */
export function normalizeTasks(tasks) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  return tasks.map((task) => {
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    const isOverdue = dueDate < now && task.status !== 'Completed';
    const daysUntilDue = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));

    return {
      ...task,
      isOverdue,
      daysUntilDue,
      dueDateFormatted: formatDate(task.dueDate),
      priorityWeight: getPriorityWeight(task.priorityLevel),
    };
  });
}

/**
 * Formats an ISO date string to a human-readable format.
 */
export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Returns a numeric weight for priority levels.
 */
export function getPriorityWeight(priority) {
  const weights = {
    High: 3,
    Critical: 3,
    Medium: 2,
    Moderate: 2,
    Low: 1,
  };
  return weights[priority] || 0;
}

/**
 * Extracts unique employee names from tasks.
 */
export function getUniqueEmployees(tasks) {
  return [...new Set(tasks.map((t) => t.employeeName))].sort();
}

/**
 * Extracts unique statuses from tasks.
 */
export function getUniqueStatuses(tasks) {
  return [...new Set(tasks.map((t) => t.status))].sort();
}