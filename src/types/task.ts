export type Status = "todo" | "in-progress" | "done";

export type Task = {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: Status;
  dueDate: string;
  timeRemaining: string;
  tags: string[];
};