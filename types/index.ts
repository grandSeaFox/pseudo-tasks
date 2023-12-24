export type Repeat =  'daily' | 'weekly' | 'monthly' | 'yearly';

export type Project = {
    id: string;
    title: string;
}

export type Task = {
    id: string;
    title: string;
    completed: boolean;
    originalProjectId: string;
    projectId: string;
    favorite?: boolean
    date?: string;
    repeat?: Repeat;
    note?: string;
    archived?: boolean;
};