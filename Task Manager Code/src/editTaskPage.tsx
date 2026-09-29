import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import TaskList from "./taskList";
import type { StatusType } from "./taskItem";

/**
 * Allows the user to edit the description and/or status of an existing task.
 * @returns HTML that allows the user to declare the new description and status of an existing task.
 */
function EditTaskPage() {
  const { selectedID } = useParams<{ selectedID: string }>();
  const taskID = Number(selectedID);
  const navigate = useNavigate();

  const model = TaskList.instance;
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<StatusType>();

  const statusOp: StatusType[] = ["not started", "in progress", "completed"];

  const handleUpdate = () => {
    const taskToChange = model.list.find((item) => item.taskID === taskID);
    console.log("Found:", taskToChange);

    // Since the user is selecting the taskID, this should never trigger
    if (taskToChange === undefined) {
      navigate("/");
      return;
    }

    taskToChange.contents = description;
    taskToChange.status = status as StatusType;
    navigate("/");
  };

  return (
    <div>
      <h1>Edit Task</h1>
      <div>
        <label>New Task Description:</label>
        <input
          type="text"
          value={description}
          onChange={(input) => {
            setDescription(input.target.value);
          }}
        ></input>
      </div>

      <div>
        <label>New Task Status:</label>
        <select
          value={status}
          onChange={(input) => {
            setStatus(input.target.value as StatusType);
          }}
        >
          {statusOp.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <button type="button" onClick={handleUpdate}>
        Update Task
      </button>
      <button type="button" onClick={() => navigate("/")}>
        Cancel
      </button>
    </div>
  );
}

export default EditTaskPage;
