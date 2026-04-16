import TaskCard from "../components/TaskCard.tsx";
import { useState } from "react";
import type { Task } from "../types/task";

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Grocery shopping for the week",
    description: "Buy essentials for the week including fruits, vegetables, rice, and household items. Make sure to check what’s already available at home before going.",
    priority: "high",
    status: "done",
    dueDate: "2026-04-15",
    timeRemaining: "0 days",
    tags: ["Personal", "Errands"],
  },
  {
    id: "2",
    title: "Reply to important emails",
    description: "Go through unread emails and respond to urgent messages from work, school, or services. Prioritize anything marked “urgent” or waiting more than 2 days.",
    priority: "medium",
    status: "todo",
    dueDate: "2026-04-20",
    timeRemaining: "Due in 5 days",
    tags: ["Work", "Communication"],
  },
  {
    id: "3",
    title: " Pay electricity and internet bills",
    description: "Settle utility bills before the due date to avoid service interruption. Confirm payment receipts are saved for records.",
    priority: "low",
    status: "in-progress",
    dueDate: "2026-04-25",
    timeRemaining: "Due in 10 days",
    tags: ["Finance", "Bills"],
  },
];

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks); 
  

  // UPDATE FUNCTION 
const updateTask = (updatedTask: Task) => {
  setTasks((prev) =>
    prev.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    )
  );
};

  // toggle checkbox
 

  // DELETE FUNCTION
  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
      }; 

 

  const totalTasks = tasks.length;

const completedCount = tasks.filter((t) => t.status === "done").length;

const overdueCount = tasks.filter((t) => {
  const due = new Date(t.dueDate);
  const now = new Date();

  return t.status !== "done" && due < now;
}).length;

  return (
    <main style={{ padding: "20px" }}>
      <h1>My Interactive To-Do List</h1>

      <div
  style={{
    marginTop: "6px",
    fontSize: "14px",
    color: "#6b7280",
    display: "flex",
    gap: "8px",
  }}
>
  <span>{totalTasks} tasks</span>
  <span>·</span>
  <span>{overdueCount} overdue</span>
  <span>·</span>
  <span>{completedCount} completed</span>
</div>

      <div style={{ display: "grid", gap: "16px", marginTop: "16px" }}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={() => deleteTask(task.id)} 
            onUpdate={updateTask}
          />
        ))}
      </div>
    </main>
  );
}; 

export default Index; 