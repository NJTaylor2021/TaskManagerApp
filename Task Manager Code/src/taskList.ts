import TaskItem from './taskItem'

/**
 * Defines what values and functions a TaskList needs to have
 */
export interface List
{
    list: TaskItem[],
    addItem(item: TaskItem): void,
    removeItem(id: number): void,
    clear(): void
}

export default class TaskList implements List
{
    // Since only one instance of the application can run on 1 command line, 
    // then only one TaskList needs to exist at a time
    static instance: TaskList = new TaskList()
    private _list: TaskItem[];

    /**
     * Creates a new TaskList, by default the list will be empty, but it can be created with any number
     * of TaskItems
     * @param _list the array of TaskItems that represents the tasks to be managed
     */
    constructor(list: TaskItem[] = [])
    {
        this._list = list
    }

    /**
     * Retrieves the list property
     */
    public get list(): TaskItem[]
    {
        return this._list
    }

    /**
     * Sets the list property
     * @param list the value to set list to
     */
    public set list(list: TaskItem[])
    {
        this._list = list
    }

    /**
     * Adds an item to the list property
     * @param item the TaskItem to add to list
     */
    public addItem(item: TaskItem): void
    {
        if (item.isIDDefault(item.taskID))
            item.taskID = this._list.length + 1;
        this._list.push(item)
    }

    /**
     * Removes an item from the list property. All items with taskID > id have their ids set to id - 1
     * @param id the item with taskID == id gets removed
     */
    public removeItem(id: number): void
    {
        this._list = this._list.filter(item => item.taskID != id)
        for(const task of this._list)
        {
            if (task.taskID > id)
                task.taskID = task.taskID - 1
        }
    }

    /**
     * Clears list of all values
     */
    public clear(): void
    {
        this._list = []
    }
}