import { useState, useEffect } from 'react';
import { Repeat, Task } from '../types';

export const useTaskManager = () => {
    const createDefaultTaskCategories = (): Array<Task> => {
        return [];
    };

    const getTasksFromLocalStorage = (): Array<Task> => {
        if (typeof window !== 'undefined') {
            const savedTasks = localStorage.getItem('tasks');
            return savedTasks ? JSON.parse(savedTasks) : createDefaultTaskCategories();
        }
        return createDefaultTaskCategories();
    };

    const [tasks, setTasks] = useState<Array<Task>>(getTasksFromLocalStorage());

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }, [tasks]);

    const addTask = (title: string, projectId: string, repeat?: Repeat, date?: string, note?: string) => {
        if (!title.trim()) return;

        const newTask: Task = {
            id: Date.now().toString(),
            title: title.trim(),
            originalProjectId: projectId,
            projectId,
            repeat,
            completed: false,
            date,
            note
        };

        setTasks(prevTasks => [...prevTasks, newTask]);
    };

    const updateTask = (updatedTask: Task) => {
        setTasks(prevTasks => prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    };

    const deleteTask = (taskId: string) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    };
    const handleComplete = (taskId: string) => {
        setTasks(prevTasks => prevTasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };
    const handleArchiving = (taskId: string) => {
        setTasks(prevTasks => prevTasks.map(task => {
            if (task.id === taskId) {
                if (task.archived) {
                    return { ...task, archived: false, projectId: task.originalProjectId };
                } else {
                    return { ...task, archived: true, originalProjectId: task.projectId, projectId: 'archived' };
                }
            }
            return task;
        }));
    };

    return {
        tasks,
        addTask,
        updateTask,
        deleteTask,
        handleComplete,
        handleArchiving
    };
};
