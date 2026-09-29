import TaskItem from "./taskItem";
import "./taskListView.css";

/**
 * Defines the properties necessary to make the task list page function properly.
 * The TaskItem[] is necessary so that the page can display all tasks.
 * The selectedID is necessary so that the user can see which task they have selected.
 * The onSelect function is necessary, so that the selectedID can be set once the user has clicked on a task
 */
interface TaskListProps {
  tasks: TaskItem[];
  selectedID: number | null;
  onSelect: (id: number) => void;
}

/**
 * Allows the user to see all tasks they have, as well as selecting tasks,
 * and seeing the task they have selected
 * @param param0 The TaskList properties defined above
 * @returns Returns html that displays all tasks currently in the task list
 */
function TaskListView({ tasks, selectedID, onSelect }: TaskListProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Description</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr
            key={task.taskID}
            onClick={() => onSelect(task.taskID)}
            style={{
              background: task.taskID === selectedID ? "#0051ff" : undefined,
            }}
          >
            <td>{task.taskID}</td>
            <td>{task.contents}</td>
            <td>{task.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TaskListView;
