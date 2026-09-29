/**
 * Describes all of the values that the status value of an Item can have
 */
export type StatusType = 'not started' | 'in progress' | 'completed'

/**
 * This interface describes what values a TaskItem needs to consist of
 */
export interface Item
{
    taskID: number,
    contents: string,
    status: StatusType
}

export default class TaskItem implements Item
{
    static readonly maxContentsLength: number = 30
    private _taskID: number;
    private _contents: string;
    private _status: StatusType;

    /**
     * Creates a new TaskItem using any parameters handed in and the default values
     * @param _taskID the ID of the task, by default it is 0
     * @param _contents the contents of the task, by default it is empty
     * @param _status the status of the task (see StatusType for possible values), by default it is 'not started'
     */
    constructor(taskID: number = 0, 
                contents: string = '', 
                status: StatusType = 'not started')
                {
                    this._taskID = taskID
                    this._contents = contents
                    this._status = status
                }

    /**
     * Retrieves the taskID property
     */
    public get taskID(): number
    {
        return this._taskID
    }

    /**
     * Sets the taskID property
     * @param id the value to set taskID to
     */
    public set taskID(id: number)
    {
        this._taskID = id
    }

    /**
     * Retrieves the contents property
     */
    public get contents(): string
    {
        return this._contents
    }

    /**
     * Sets the contents property
     * @param contents the value to set contents to
     */
    public set contents(contents: string)
    {
        this._contents = contents.substring(0, TaskItem.maxContentsLength)
    }

    /**
     * Retrieves the status property
     */
    public get status(): StatusType
    {
        return this._status
    }

    /**
     * Sets the status property
     * @param status the value to set status to
     */
    public set status(status: StatusType)
    {
        this._status = status
    }

    public isIDDefault(id :number): boolean
    {
        return id === 0;
    }
}