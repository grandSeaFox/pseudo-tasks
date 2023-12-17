import React from 'react';
import type { Task } from '../types/types';

type TaskItemProps = {
    task: Task;
    onComplete: (taskId: string) => void;
    onClick: (taskId: string) => void;
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onComplete, onClick  }) => {
    return (
        <div className="taskItem" onClick={() => onClick(task.id)}>
            <input
                id={`task-${task.id}`}
                type="checkbox"
                checked={task.completed}
                onChange={() => onComplete(task.id)}
                className={"checkbox"}
            />
            <p className={task.completed ? "completed" : ''}>
                {task.title}
            </p>
        </div>
    );
};

export default TaskItem;
