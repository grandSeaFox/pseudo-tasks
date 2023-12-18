import React from 'react';
import TaskItem from './TaskItem';
import type {Task, TaskCategories} from '../types';

type TaskListProps = {
    tasks: TaskCategories;
    onTaskClick: (taskId: string) => void;
    onUpdateTask: (task: Task, newCategory? : keyof TaskCategories) => void;
    onTaskDelete : (taskId: string) => void;
};

const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdateTask, onTaskClick, onTaskDelete }) => {

    const handleComplete = (taskId: string) => {
        const allTasks = tasks.today.concat(tasks.tomorrow, tasks.upcoming, tasks.toAssign);
        const taskToComplete = allTasks.find(task => task.id === taskId);

        if (taskToComplete) {
            const updatedTask = { ...taskToComplete, completed: !taskToComplete.completed };
            onUpdateTask(updatedTask);
        }
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, taskId: string) => {
        e.dataTransfer.setData("text/plain", taskId);
        e.dataTransfer.effectAllowed = 'copyMove'
    };


    const handleDrop = (e: React.DragEvent<HTMLDivElement>, newCategory: keyof TaskCategories) => {
        e.preventDefault();
        e.currentTarget.classList.remove("dragOver");
        const taskId = e.dataTransfer.getData("text");

        const taskToMove = Object.values(tasks)
            .flat()
            .find(task => task.id === taskId);

        if (taskToMove) {
            onUpdateTask({ ...taskToMove }, newCategory);
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
