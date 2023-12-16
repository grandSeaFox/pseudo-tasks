import React from 'react';
import type { Task } from '../types'; // Assuming you have a types file where Task type is defined
import styles from '../styles/TaskItem.module.scss'; // Assuming you have some CSS module for styling

type TaskItemProps = {
    task: Task;
    onComplete: (taskId: string) => void; // Handler for when a task's checkbox is clicked
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onComplete }) => {
    return (
        <div className={styles.taskItem}>

            <label htmlFor={`task-${task.id}`} className={task.completed ? styles.completed : ''}>
                <input
                    id={`task-${task.id}`}
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onComplete(task.id)}
                    className={styles.checkbox}
                />
                {task.title}
            </label>
        </div>
    );
};

export default TaskItem;
