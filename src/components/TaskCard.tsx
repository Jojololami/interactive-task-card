import { Pencil, Trash2 } from "lucide-react";
import type { Task } from "../types/task";
import { formatDueDate, getTimeRemaining } from '../utils/dateHelpers';
import { useEffect, useState } from "react";
import "../styles/taskcard.css"


type TaskCardProps = {
  task: Task;
  isCompleted: boolean;
  onToggle: () => void;
  onDelete: () => void; 
};

const statusStyles = {
  todo: {
    background: "#f3f4f6",
    color: "#374151",
  },
  "in-progress": {
    background: "#dbeafe",
    color: "#1d4ed8",
  },
  done: {
    background: "#d1fae5",
    color: "#065f46",
  },
};


const TaskCard = ({ task, isCompleted, onToggle, onDelete }: TaskCardProps) => {

  const [timeRemaining, setTimeRemaining] = useState(
  getTimeRemaining(task.dueDate)
);

useEffect(() => {
  const interval = setInterval(() => {
    setTimeRemaining(getTimeRemaining(task.dueDate));
  }, 45000); // 45 seconds

  return () => clearInterval(interval);
}, [task.dueDate]);

  return (
    <article
    className="task-card"
      data-testid="test-todo-card"
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "16px",
        maxWidth: "420px",
        background: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
        opacity: isCompleted ? 0.6 : 1,
      }}
    >
      {/* HEADER */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
         <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
  <input
    type="checkbox"
    data-testid="test-todo-complete-toggle"
    checked={isCompleted}
    onChange={onToggle}
  />
</label>

          <h2
            data-testid="test-todo-title"
            style={{
              fontSize: "16px",
              margin: 0,
              textDecoration: isCompleted ? "line-through" : "none",
              opacity: isCompleted ? 0.7 : 1,
  transition: "all 0.2s ease",
            }}
          >
            {task.title}
          </h2>
        </div>

        <span
          data-testid="test-todo-priority"
          style={{
            fontSize: "12px",
            padding: "4px 8px",
            borderRadius: "999px",
            transition: "all 0.2s ease",
            background:
              task.priority === "high"
                ? "#fee2e2"
                : task.priority === "medium"
                ? "#fef3c7"
                : "#d1fae5",
            color:
              task.priority === "high"
                ? "#991b1b"
                : task.priority === "medium"
                ? "#92400e"
                : "#065f46",
          }}
        >
          {task.priority}
        </span>
      </header>

      {/* DESCRIPTION */}
      <p
        data-testid="test-todo-description"
        style={{
          marginTop: "10px",
          color: "#6b7280",
          fontSize: "14px",
        }}
      >
        {task.description}
      </p>

      {/* META INFO */}
      <div style={{ marginTop: "12px", fontSize: "13px", color: "#374151" }}>
        
          <span
  data-testid="test-todo-status"
  style={{
    display: "inline-block",
    marginTop: "6px",
    padding: "4px 8px",
    borderRadius: "999px",
    fontSize: "12px",
    ...statusStyles[task.status],
  }}
>
  {task.status === "in-progress" ? "In Progress" : task.status}
</span>


     <time
  data-testid="test-todo-due-date"
  dateTime={task.dueDate}
>
  Due {formatDueDate(task.dueDate)}
</time>

        <div data-testid="test-todo-time-remaining">
  {timeRemaining}
</div>
      </div>

      {/* TAGS */}
      <ul
        data-testid="test-todo-tags"
        style={{
          display: "flex",
          gap: "6px",
          padding: 0,
          listStyle: "none",
          marginTop: "12px",
        }}
      >
        {task.tags.map((tag) => (
          <li
            key={tag}
            data-testid={`test-todo-tag-${tag}`}
            style={{
              fontSize: "12px",
              padding: "4px 8px",
              borderRadius: "999px",
              background: "#f3f4f6",
            }}
          >
            {tag}
          </li>
        ))}
      </ul>

      {/* ACTIONS */}
      <footer
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "8px",
          marginTop: "14px",
        }}
      >
        <button
          className="action-btn"
          data-testid="test-todo-edit-button"
          aria-label="Edit task"
          style={{
            padding: "6px 10px",
            borderRadius: "6px",
            border: "1px solid #d1d5db",
            background: "#fff",
            cursor: "pointer",
          }}
        >
          <Pencil size={16} />
        </button>

       <button
      className="action-btn delete-btn"
  data-testid="test-todo-delete-button"
  aria-label="Delete task"
 onClick={() => {
  console.log("DELETE CLICKED");
  onDelete();
}} //  delete handler
  style={{
    padding: "6px 10px",
    borderRadius: "6px",
    border: "1px solid #fecaca",
    background: "#fff",
    color: "#b91c1c",
    cursor: "pointer",
  }}
>
  <Trash2 size={16} />
</button>
      </footer>
    </article>
  );
};

export default TaskCard;