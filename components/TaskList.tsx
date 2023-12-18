import React from 'react';
import TaskItem from './TaskItem';
import type { TaskCategories } from '../types/types';

type TaskListProps = {
    tasks: TaskCategories;
    setTasks: (tasks: TaskCategories) => void;
    onTaskClick: (taskId: string) => void;
    onTaskDelete : (taskId: string) => void;
};

const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks, onTaskClick, onTaskDelete }) => {

    const handleComplete = (taskId: string) => {
        const updatedTasks = { ...tasks };

        (Object.keys(updatedTasks) as Array<keyof TaskCategories>).forEach(category => {
            updatedTasks[category] = updatedTasks[category].map(task => {
                if (task.id === taskId) {
                    return { ...task, completed: !task.completed };
                }
                return task;
            });
        });

        setTasks(updatedTasks);
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, taskId: string) => {
        e.dataTransfer.setData("text/plain", taskId);
        e.dataTransfer.effectAllowed = 'copyMove'
    };


    const handleDrop = (e: React.DragEvent<HTMLDivElement>, category: keyof TaskCategories) => {
        e.preventDefault();
        e.currentTarget.classList.remove("dragOver");
        const taskId = e.dataTransfer.getData("text");
        const taskToMove = Object.values(tasks)
            .flat()
            .find(task => task.id === taskId);

        if (taskToMove) {
            const newTasks = { ...tasks };
            Object.keys(newTasks).forEach(key => {
                newTasks[key as keyof TaskCategories] = newTasks[key as keyof TaskCategories].filter(task => task.id !== taskId);
            });
            newTasks[category] = [...newTasks[category], taskToMove];
            setTasks(newTasks);
        }
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.classList.remove("dragOver");
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.currentTarget.classList.add("dragOver");
    };

    const renderCategorySection = (category: keyof TaskCategories, title: string) => (
        <div
            className={"category"}
            onDrop={e => handleDrop(e, category)}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >
            <h2>{title}</h2>
            {tasks[category].map(task => (
                <div
                    key={task.id}
                    draggable
                    onDragStart={e => handleDragStart(e, task.id)}
                    className={"taskItem"}
                >
                    <TaskItem
                        task={task}
                        onClick={() => onTaskClick(task.id)}
                        onDelete={() => onTaskDelete(task.id)}
                        onComplete={handleComplete}
                    />
                </div>
            ))}
        </div>
    );

    return (
        <div className={"taskList"}>
            {renderCategorySection('today', 'Today')}
            {renderCategorySection('tomorrow', 'Tomorrow')}
            {renderCategorySection('upcoming', 'Upcoming')}
            {renderCategorySection('toAssign', 'To Assign')}
        </div>
    );
};

export default TaskList;
