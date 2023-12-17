import React from 'react';
import type { Task } from '../types/types';
import classnames from "classnames";

type TaskDrawerProps = {
    task: Task | null;
    isOpen: boolean;
    onClose: () => void;
};

const TaskDrawer: React.FC<TaskDrawerProps> = ({ task, isOpen, onClose }) => {
    if (!isOpen || !task) return null;


    return (
        <div className="taskDrawer" data-drawer-collapse={!isOpen}>
            <p>{task.title}</p>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default TaskDrawer;
