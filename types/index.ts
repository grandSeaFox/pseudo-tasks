export type Repeat =  'daily' | 'weekly' | 'monthly' | 'yearly';

export type Task = {
    id: string;
    title: string;
    completed: boolean;
    date?: string;
    repeat?: Repeat;
    note?: string;
};

export type TaskCategories = {
    todo: Task[];
    completed: Task[];
};