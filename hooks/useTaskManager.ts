import { useState, useEffect } from 'react';
import {Repeat, Task, TaskCategories} from '../types';
import {objectKeys} from "../utils";

export const useTaskManager = () => {
    const createDefaultTaskCategories = <T extends TaskCategories>(): T => {
    const keys = objectKeys({ todo: [], completed: [] }) as Array<keyof T>;
    const defaultObject = {} as T;
    keys.forEach((key) => {
        defaultObject[key] = [] as T[keyof T];
    });
    return defaultObject;
};

    const getTasksFromLocalStorage = (): TaskCategories => {
        if (typeof window !== 'undefined') {
            const savedTasks = localStorage.getItem('tasks');
            return savedTasks ? JSON.parse(savedTasks) : createDefaultTaskCategories();
        }
        return createDefaultTaskCategories();
    };

    const [tasks, setTasks] = useState<TaskCategories>(getTasksFromLocalStorage());

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }, [tasks]);

    const addTask = (title: string, repeat?: Repeat, date?: string, note?: string) => {
        if (!title.trim()) return;

        const newTask: Task = {
            id: Date.now().toString(),
            title: title.trim(),
            completed: false,
            repeat,
            date,
            note
        };

        setTasks(prevTasks => {
            const categoryTasks = prevTasks['todo'] ?? [];
            const updatedCategoryTasks = [...categoryTasks, newTask];
            return { ...prevTasks, ['todo']: updatedCategoryTasks };
        });
    };
    const updateTask = (updatedTask: Task, newCategory?: keyof TaskCategories) => {
        setTasks(prevTasks => {
            const newTasks: TaskCategories = { ...prevTasks };
            objectKeys(newTasks).forEach(category => {
                newTasks[category as keyof TaskCategories] = newTasks[category as keyof TaskCategories].filter(task => task.id !== updatedTask.id);
            });

            if (newCategory) {
                newTasks[newCategory] = [...newTasks[newCategory], updatedTask];
            } else {
                const originalCategory = objectKeys(prevTasks).find(category => prevTasks[category as keyof TaskCategories].some(task => task.id === updatedTask.id)) as keyof TaskCategories;
                newTasks[originalCategory] = [...newTasks[originalCategory], updatedTask];
            }

            return newTasks;
        });
    };

    const deleteTask = (taskId: string) => {
        setTasks(prevTasks => {
            const newTasks = { ...prevTasks };
            (objectKeys(newTasks) as Array<keyof TaskCategories>).forEach(key => {
                newTasks[key] = newTasks[key].filter(task => task.id !== taskId);
            });
            return newTasks;
        });
    };

    return {
        tasks,
        addTask,
        updateTask,
        deleteTask,
    };
};
