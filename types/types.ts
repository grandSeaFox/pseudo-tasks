export type Task = {
    id: string;
    title: string;
    completed: boolean;
};

export type TaskCategories = {
    today: Task[];
    tomorrow: Task[];
    upcoming: Task[];
    toAssign: Task[];
};
