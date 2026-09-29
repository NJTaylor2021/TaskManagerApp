import TaskItem from "./taskItem"
import type { StatusType } from "./taskItem"
import TaskList from "./taskList"

const taskIDLength = 5
const taskContentsLength = TaskItem.maxContentsLength
const taskStatusLength = 15

/**
 * Uses the information in the TaskList to create a string that shows the user their tasks
 * @returns a string representing the visual representation of the TaskList
 */
function GenerateTaskTable(tasks: TaskList): string
{
    let output = ""
    output += ('ID'.padEnd(taskIDLength) + '|' + 'Name'.padEnd(taskContentsLength) + '|' +
                'Status'.padEnd(taskStatusLength) + '\n')
    output += ('-'.repeat(taskIDLength) + '|' + '-'.repeat(taskContentsLength) + 
                    '|' + '-'.repeat(taskStatusLength) + '\n')

    for(const task of tasks.list)
    {
        const taskIDStr = String(task.taskID)
        const taskContentsStr = task.contents
        const taskStatusStr = String(task.status)

        output += (taskIDStr.padEnd(taskIDLength) + '|' + taskContentsStr.padEnd(taskContentsLength) + '|' +
                    taskStatusStr.padEnd(taskStatusLength) + '\n')
        output += ('-'.repeat(taskIDLength) + '|' + '-'.repeat(taskContentsLength) + 
                    '|' + '-'.repeat(taskStatusLength) + '\n')
    }

    return output
}

/**
 * Parses a txt file into a TaskList. If the txt file is not in the proper format, then it will parse as 
 * much of the list as possible. If nothing can be parsed, then it will fail sliently.
 * @param contents the contents of the txt file
 */
export function ParseTaskFile(contents: string, tasks: TaskList): void
{
    let lines: string[] = contents.split(/\r?\n/);

    // Skip first 2 lines (header + separator)
    // Then every task uses 2 lines:
    //   data line
    //   separator line
    for (let i = 2; i < lines.length; i += 2) 
    {
        const line = lines[i];

        if (!line || line.trim().length === 0)
            continue;

        const trimmed = line.trim();
        if (trimmed.length === 0)
            continue;

        const parts = trimmed.split("|");

        if (parts.length !== 3)
            continue;

        const idStr = parts[0];
        const contentsStr = parts[1];
        const statusStr = parts[2];

        if (!idStr || !contentsStr || !statusStr)
            continue;

        const id = Number(idStr.trim());
        const contents = contentsStr.trim();
        const status = statusStr.trim();

        let curTask = new TaskItem(id, contents, status as StatusType);
        tasks.addItem(curTask);
    }
}

export default GenerateTaskTable;