import { useState, useEffect } from 'react';
import { Task, TaskCategories } from '../types';

const getTasksFromLocalStorage = (): TaskCategories => {
    if (typeof window !== 'undefined') { // Check if running on client side
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : { today: [], tomorrow: [], upcoming: [], toAssign: [] };
    }
    return { today: [], tomorrow: [], upcoming: [], toAssign: [] }; // Default state if on server side
};

export const useTaskManager = () => {
    const [tasks, setTasks] = useState<TaskCategories>(getTasksFromLocalStorage());

    useEffect(() => {
        if (typeof window !== 'undefined') localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (title: string, category: keyof TaskCategories = 'toAssign') => {
        if (!title.trim()) return;

        const newTask: Task = {
            id: Date.now().toString(),
            title: title.trim(),
            completed: false
        };

        setTasks(prevTasks => ({
            ...prevTasks,
            [category]: [...prevTasks[category], newTask]
        }));
    };
    const updateTask = (updatedTask: Task, newCategory?: keyof TaskCategories) => {
        setTasks(prevTasks => {
            const newTasks: TaskCategories = { ...prevTasks };
            Object.keys(newTasks).forEach(category => {
                newTasks[category as keyof TaskCategories] = newTasks[category as keyof TaskCategories].filter(task => task.id !== updatedTask.id);
            });

            if (newCategory) {
                newTasks[newCategory] = [...newTasks[newCategory], updatedTask];
            } else {
                const originalCategory = Object.keys(prevTasks).find(category => prevTasks[category as keyof TaskCategories].some(task => task.id === updatedTask.id)) as keyof TaskCategories;
                newTasks[originalCategory] = [...newTasks[originalCategory], updatedTask];
            }

            return newTasks;
        });
    };

    const deleteTask = (taskId: string) => {
        setTasks(prevTasks => {
            const newTasks = { ...prevTasks };
            (Object.keys(newTasks) as Array<keyof TaskCategories>).forEach(key => {
                newTasks[key] = newTasks[key].filter(task => task.id !== taskId);
            });
            return newTasks;
        });
    };

    return {
        tasks,
        addTask,
        updateTask,
        deleteTask
    };
};
