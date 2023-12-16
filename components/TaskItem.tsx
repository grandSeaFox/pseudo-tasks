import React from 'react';
import type { Task } from '../types/types'; // Assuming you have a types file where Task type is defined
import styles from '../styles/TaskItem.module.scss'; // Assuming you have some CSS module for styling

type TaskItemProps = {
    task: Task;
    onComplete: (taskId: string) => void; // Handler for when a task's checkbox is clicked
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onComplete }) => {
    return (
        <div className={styles.taskItem}>
            <input
                id={`task-${task.id}`}
                type="checkbox"
                checked={task.completed}
                onChange={() => onComplete(task.id)}
                className={styles.checkbox}
            />
            <p className={task.completed ? styles.completed : ''}>
                {task.title}
            </p>
        </div>
    );
};

export default TaskItem;
