export const formatDueDate = (dateString: string) => {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const getTimeRemaining = (dateString: string) => {
  const now = new Date();
  const due = new Date(dateString);

  const diffMs = due.getTime() - now.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMs < 0) {
    const overdueHours = Math.abs(diffHours);
    return `Overdue by ${overdueHours} hour${overdueHours !== 1 ? "s" : ""}`;
  }

  if (diffDays > 0) {
    return `Due in ${diffDays} day${diffDays !== 1 ? "s" : ""}`;
  }

  if (diffHours > 0) {
    return `Due in ${diffHours} hour${diffHours !== 1 ? "s" : ""}`;
  }

  return `Due in ${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""}`;
};