import { useTaskContext } from "../context/useTaskContext";
import { useState } from "react";
export default function TaskItem({ task }) {
  const {
    toggleTask,
    editTask,
    editingTaskId,
    editedTask,
    handleSaveEdit,
    handleCancelEdit,
    deleteTask,
    handleEditChange,
  } = useTaskContext();

  const [error, setError] = useState("");
  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <div className={`task-item ${task.completed ? "completed-task" : ""}`}>
      <div className="task-header">
        <div className="task-information">
          {editingTaskId === task.id ? (
            <div className="task-content">
              <input
                className="edit-title"
                type="text"
                value={editedTask.task}
                onChange={(e) => {
                  const value = e.target.value;

                  if (value.length > 100) {
                    setError("Task title cannot exceed 100 characters.");
                    return;
                  }

                  handleEditChange("task", value);

                  if (!value.trim()) {
                    setError("Task title is required.");
                  } else {
                    setError("");
                  }
                }}
              />
              {error && <p className="error-message">{error}</p>}
              <textarea
                className="edit-description"
                value={editedTask.description}
                onChange={(e) =>
                  handleEditChange("description", e.target.value)
                }
              />
            </div>
          ) : (
            <div className="task-content">
              <span
                className={`task-title ${task.completed ? "completed" : ""}`}
              >
                {task.task}
              </span>
              <p
                className={`task-description ${task.completed ? "completed" : ""}`}
              >
                {showFullDescription
                  ? task.description
                  : task.description.length > 180
                    ? task.description.slice(0, 180) + "..."
                    : task.description}
              </p>
            </div>
          )}
          {editingTaskId === task.id ? (
            <select
              className="edit-priority"
              value={editedTask.priority}
              onChange={(e) => handleEditChange("priority", e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          ) : (
            <p className={`priority ${task.priority?.toLowerCase()}`}>
              {task.priority}
            </p>
          )}
        </div>
      </div>

      <div className="task-divider" />

      {editingTaskId === task.id ? (
        <div className="edit-btns">
          <button
            className="save-edit-btn"
            onClick={() => {
              if (!editedTask.task.trim()) {
                setError("Task title is required.");
                return;
              }

              setError("");
              handleSaveEdit(task.id);
            }}
          >
            Save
          </button>
          <button
            className="cancel-edit-btn"
            onClick={() => handleCancelEdit(task.id)}
          >
            cancel
          </button>
        </div>
      ) : (
        <>
          <p className="task-created">Created: {task.createdAt}</p>

          <div className="btns">
            <button
              className={`task-status ${task.completed ? "completed-task" : "pending-task"}`}
              onClick={() => toggleTask(task.id)}
            >
              {task.completed ? "Pending" : "Completed"}
            </button>

            <button className="edit-btn" onClick={() => editTask(task)}>
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => {
                const confirmDelete = window.confirm(
                  "Do you really want to delete this task?",
                );

                if (confirmDelete) {
                  deleteTask(task.id);
                }
              }}
            >
              Delete
            </button>
            <button
              className="view-btn"
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {showFullDescription ? "Show Less" : "View Task"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
