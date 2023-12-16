import React from 'react';
import TaskItem from './TaskItem';
import type { TaskCategories } from '../types';
import styles from '../styles/TaskList.module.scss';

type TaskListProps = {
    tasks: TaskCategories;
    setTasks: (tasks: TaskCategories) => void;
};

const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks }) => {

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
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, category: keyof TaskCategories) => {
        e.preventDefault();
        e.currentTarget.classList.remove(styles.dragOver);
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
        // Remove 'dragOver' class when the dragged item leaves the category element
        e.currentTarget.classList.remove(styles.dragOver);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.currentTarget.classList.add(styles.dragOver);
    };

    const renderCategorySection = (category: keyof TaskCategories, title: string) => (
        <div
            className={styles.category}
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
                    className={styles.taskItem}
                >
                    <TaskItem task={task} onComplete={handleComplete} />
                </div>
            ))}
        </div>
    );

    return (
        <div className={styles.taskList}>
            {renderCategorySection('today', 'Today')}
            {renderCategorySection('tomorrow', 'Tomorrow')}
            {renderCategorySection('upcoming', 'Upcoming')}
            {renderCategorySection('toAssign', 'To Assign')}
        </div>
    );
};

export default TaskList;
