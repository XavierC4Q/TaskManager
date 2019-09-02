export interface IUser {
    id: number;
    username: string;
    email: string;
    createdTasks: Omit<ITask, 'createdBy'>[];
    assignedTasks: Omit<ITask, 'assignedTo'>[];
}

export type TPriority = 'high' | 'medium' | 'low';

export interface ITask {
    id: number;
    title: string;
    description: string;
    priority: TPriority;
    createdBy: IUser;
    assignedTo: IUser;
    completed: boolean;
    createdOn: string;
    modified: null | string;
}