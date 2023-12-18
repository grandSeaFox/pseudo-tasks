import React from 'react';
import type { Task } from '../types/types';
import {SVGComponent} from "./ui/SVG";

type TaskItemProps = {
    task: Task;
    onComplete: (taskId: string) => void;
    onClick: (taskId: string) => void;
    onDelete: (taskId: string) => void;
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onComplete, onClick, onDelete  }) => {

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
            <button onClick={() => onDelete(task.id)}><SVGComponent icon={'trash'}/></button>
        </div>
    );
};

export default TaskItem;
