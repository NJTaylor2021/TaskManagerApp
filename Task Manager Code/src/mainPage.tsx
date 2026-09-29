import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskList from "./taskList";
import TaskItem from "./taskItem";
import TaskListView from "./taskListView";
import GenerateTaskTable from "./Utilities";
import "./mainPage.css";

/**
 * This functions defines helpers that allows the user to initiate adding a task, removing the
 * selected task, clearing the task list, editing the selected task, opening an existing
 * task list from a file, and saving their task list to a .txt.
 * @returns HTML that allows the user to see their tasks and initiate adding a task, removing the selected
 * task, clearing the task list, editing the selected task, and saving their task list.
 */
function MainPage() {
  const model = TaskList.instance;
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<TaskItem[]>(model.list);
  const [selectedID, setSelectedID] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sync = () => {
    setTasks([...model.list]);
  };

  const goToAdd = () => {
    navigate("/add");
  };

  const goToEdit = () => {
    if (selectedID === null) {
      setError(
        "No task selected to edit. Please select a task before trying to edit.",
      );
      return;
    }
    navigate(`/edit/${selectedID}`);
  };

  const removeItem = () => {
    if (selectedID === null) {
      setError(
        "No task selected to remove. Please select a task before trying to remove.",
      );
      return;
    }

    model.removeItem(selectedID);
    setSelectedID(null);
    setError(null);
    sync();
  };

  const clearList = () => {
    model.clear();
    setSelectedID(null);
    setError(null);
    sync();
  };

  const saveList = () => {
    const tableText = GenerateTaskTable(model);
    const blob = new Blob([tableText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const atr = document.createElement("a");
    atr.href = url;
    atr.download = "tasks.txt";

    atr.click();
    URL.revokeObjectURL(url);
  };

  const goToOpen = () => {
    navigate("/open");
  };

  return (
    <div>
      <h1>Your Task Manager</h1>

      <TaskListView
        tasks={tasks}
        selectedID={selectedID}
        onSelect={setSelectedID}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <button type="button" onClick={goToAdd}>
          Add Task
        </button>
        <button type="button" onClick={goToEdit}>
          Edit Task
        </button>
        <button type="button" onClick={removeItem}>
          Remove Task
        </button>
        <button type="button" onClick={clearList}>
          Clear List
        </button>
        <button type="button" onClick={saveList}>
          Save List
        </button>
        <button type="button" onClick={goToOpen}>
          Open List
        </button>
      </div>
    </div>
  );
}

export default MainPage;
