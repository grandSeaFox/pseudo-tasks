export type Repeat =  'daily' | 'weekly' | 'monthly' | 'yearly';

export type Project = {
    id: string;
    title: string;
    date?: string;
    archived?: boolean
}

export type Task = {
    id: string;
    title: string;
    completed: boolean;
    favorite?: boolean
    date?: string;
    repeat?: Repeat;
    note?: string;
    archived?: boolean;
};

export type TaskCategories = {
    todo: Task[];
    completed: Task[];
};