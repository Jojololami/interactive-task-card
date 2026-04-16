import { Pencil, Trash2 } from "lucide-react";
import type { Task } from "../types/task";
import { formatDueDate, getTimeRemaining } from '../utils/dateHelpers';
import { useEffect, useState } from "react";
import "../styles/taskcard.css"

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

const statusLabelMap = {
  todo: "Pending",
  "in-progress": "In Progress",
  done: "Done",
} as const;


type TaskCardProps = {
  task: Task;
  onDelete: () => void;
  onUpdate: (task: Task) => void;
};


const TaskCard = ({ task, onDelete,  onUpdate,  }: TaskCardProps) => {

  const [timeRemaining, setTimeRemaining] = useState(
  getTimeRemaining(task.dueDate)
);

const [isEditing, setIsEditing] = useState(false);
 const [formData, setFormData] = useState(task);
 const [isExpanded, setIsExpanded] = useState(false);

{/*  Derived variables */}
 const isLongDescription = task.description.length > 120;
 


const isOverdue =
  task.status !== "done" &&
  new Date(task.dueDate).getTime() < Date.now();

useEffect(() => {
  if (task.status === "done") return;

  const interval = setInterval(() => {
    setTimeRemaining(getTimeRemaining(task.dueDate));
  }, 45000);

  return () => clearInterval(interval);
}, [task.dueDate, task.status]);

if (isEditing) {
  return (
    <form
      data-testid="test-todo-edit-form"
      className="task-card"
    >
      {/* TITLE */}
      <input
        data-testid="test-todo-edit-title-input"
         className="edit-input"
        value={formData.title}
        onChange={(e) =>
    setFormData({ ...formData, title: e.target.value })
  }
      />

      {/* DESCRIPTION */}
      <textarea
        data-testid="test-todo-edit-description-input"
         className="edit-input"
        value={formData.description}
  onChange={(e) =>
    setFormData({
      ...formData,
      description: e.target.value,
    })
  }
       
      />

      {/* PRIORITY */}
      <select
        data-testid="test-todo-edit-priority-select"
        className="edit-input"
         value={formData.priority}
  onChange={(e) =>
    setFormData({
      ...formData,
      priority: e.target.value,
    })
  }
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      {/* DUE DATE */}
      <input
        type="date"
        data-testid="test-todo-edit-due-date-input"
        className="edit-input"
        value={formData.dueDate}
  onChange={(e) =>
    setFormData({
      ...formData,
      dueDate: e.target.value,
    })
  } 
      />
      {/* STATUS */}
      <select
  data-testid="test-todo-status-control"
  className="edit-input"
  value={formData.status}
  onChange={(e) =>
    setFormData({
      ...formData,
      status: e.target.value as Task["status"],
    })
  }
>
  <option value="todo">Todo</option>
  <option value="in-progress">In Progress</option>
  <option value="done">Done</option>
</select>

      {/* ACTIONS */}
      <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
        <button
          type="button"
          data-testid="test-todo-save-button"
          className="action-btn"
           onClick={() => {
    onUpdate(formData);
    setIsEditing(false);
  }}
        >
          Save
        </button>

        <button
          type="button"
          data-testid="test-todo-cancel-button"
          className="action-btn"
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
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
        opacity: task.status === "done" ? 0.6 : 1,
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
    checked={task.status === "done"}
onChange={() => {
  const newStatus = task.status === "done" ? "todo" : "done";

  onUpdate({
    ...task,
    status: newStatus,
  });
}}
  />
</label>

          <h2
            data-testid="test-todo-title"
            style={{
              fontSize: "16px",
              margin: 0,
              textDecoration: task.status === "done" ? "line-through" : "none",
opacity: task.status === "done" ? 0.7 : 1,
              
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
        <span
  data-testid="test-todo-priority-indicator"
  style={{
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    display: "inline-block",
    marginLeft: "8px",
    background:
      task.priority === "high"
        ? "#ef4444"
        : task.priority === "medium"
        ? "#f59e0b"
        : "#22c55e",
  }}
/>
      </header>

      {/* DESCRIPTION */}
     <div data-testid="test-todo-collapsible-section">
  <p style={{ marginTop: "10px", color: "#6b7280", fontSize: "14px" }}>
    {isExpanded || !isLongDescription
      ? task.description
      : task.description.slice(0, 120) + "..."}
  </p>

  {isLongDescription && (
    <button
      data-testid="test-todo-expand-toggle"
      onClick={() => setIsExpanded((prev) => !prev)}
      style={{
        marginTop: "6px",
        fontSize: "12px",
        background: "none",
        border: "none",
        color: "#2563eb",
        cursor: "pointer",
      }}
    >
      {isExpanded ? "Collapse" : "Expand"}
    </button>
  )}
</div>

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
  {statusLabelMap[task.status]}
</span>

     <time
  data-testid="test-todo-due-date"
  dateTime={task.dueDate}
>
  Due {formatDueDate(task.dueDate)}
</time>

<div data-testid="test-todo-time-remaining">
  {task.status === "done"
    ? "Completed"
    : isOverdue
    ? ` ${timeRemaining}`
    : timeRemaining}
</div>

{isOverdue && task.status !== "done" && (
  <span
    data-testid="test-todo-overdue-indicator"
    style={{
      marginLeft: "8px",
      color: "#dc2626",
      fontSize: "12px",
      fontWeight: "600",
    }}
  >
 
  </span>
)}
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
        {/* EDIT BUTTON */}
        <button
          className="action-btn"
          data-testid="test-todo-edit-button"
          aria-label="Edit task"
            onClick={() => setIsEditing(true)}
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