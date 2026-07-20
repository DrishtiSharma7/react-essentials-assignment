import { useState } from "react";
import { useTaskContext } from "../context/useTaskContext";

export default function TaskInput() {
  const { addTask } = useTaskContext();

  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [error, setError] = useState("");
  function handleSubmit() {
    if (!text.trim()) {
      setError("Task title is required.");
      return;
    }

    addTask(text.trim(), description.trim(), priority);

    setText("");
    setDescription("");
    setPriority("Medium");
    setError("");
  }

  return (
    <div className="task-input">
      <div className="input-label">Title</div>
      <input
        id="task-title"
        className="input-bar"
        value={text}
        placeholder="Add new task"
        onChange={(e) => {
          const value = e.target.value;

          if (value.length > 100) {
            setError("Task title cannot exceed 100 characters.");
            return; // State update nahi hogi, extra character input me nahi dikhega
          }

          setText(value);

          if (!value.trim()) {
            setError("Task title is required.");
          } else {
            setError("");
          }
        }}
      />
      {error && <p className="error-message">{error}</p>}

      <label htmlFor="task-description" className="input-label">
        Description
      </label>
      <textarea
        id="task-description"
        className="input-bar"
        value={description}
        placeholder="Add task description"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />

      <label htmlFor="task-priority" className="input-label">
        Priority
      </label>
      <select
        id="task-priority"
        className="priority-select"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <button className="add-btn" onClick={handleSubmit}>
        Add Task
      </button>
    </div>
  );
}
