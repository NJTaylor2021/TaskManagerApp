import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskList from "./taskList";
import TaskItem from "./taskItem";
import type { StatusType } from "./taskItem";
import "./addTaskPage.css";

/**
 * Allows the user to create a new task.
 * @returns HTML that allows the user to input information to create a new task.
 */
function AddTaskPage() {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<StatusType>();

  const statusOp: StatusType[] = ["not started", "in progress", "completed"];

  const handleSubmit = () => {
    const newTask = new TaskItem(undefined, description.trim(), status);
    TaskList.instance.addItem(newTask);
    navigate("/");
  };

  return (
    <div>
      <h1>Add New Task</h1>
      <div>
        <label>Task Description:</label>
        <input
          type="text"
          value={description}
          onChange={(input) => setDescription(input.target.value)}
        />
      </div>

      <div>
        <label>Task Status:</label>
        <select
          value={status}
          onChange={(input) => setStatus(input.target.value as StatusType)}
        >
          {statusOp.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <button type="button" onClick={handleSubmit}>
        Create Task
      </button>
      <button type="button" onClick={() => navigate("/")}>
        Cancel
      </button>
    </div>
  );
}

export default AddTaskPage;
