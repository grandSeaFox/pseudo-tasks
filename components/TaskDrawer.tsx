import React from 'react';
import type {Repeat, Task, TaskCategories} from '../types';
import {SVGComponent} from "./ui/SVG";
import RepeatSelect from "./SelectInput";
import {formatDate} from "../utils";

type TaskDrawerProps = {
    task: Task | null;
    isOpen: boolean;
    onClose: () => void;
    onComplete: (task: Task) => void;
    updateTask: (updatedTask: Task, newCategory?: keyof TaskCategories) => void;
};

const TaskDrawer: React.FC<TaskDrawerProps> = ({ task, isOpen, onClose, onComplete, updateTask }) => {
    if (!isOpen || !task) return null;

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateTask({ ...task, title: e.target.value });
    };

    const handleRepeatChange = (newRepeat?: Repeat) => {
        updateTask({ ...task, repeat: newRepeat });
    };

    const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (task) {
            const updatedTask = { ...task, note: e.target.value };
            updateTask(updatedTask);
        }
    };
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (task) {
            const updatedTask = { ...task, date: e.target.value };
            updateTask(updatedTask);
        }
    };

    return (
        <div className="taskDrawer" data-drawer-collapse={!isOpen}>
            <div className="taskHeader">
                <button onClick={onClose}><SVGComponent icon={"arrowSmallLeft"}/></button>
                <h3>Pseudo-tasks</h3>
            </div>

            <div className="taskHeader">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onComplete(task)}
                    className={"checkbox lg"}
                />
                <input
                    type="text"
                    value={task.title}
                    onChange={handleTitleChange}
                />
            </div>
            <div className="taskDetails">
                <RepeatSelect selectedValue={task?.repeat || 'none'} onChange={handleRepeatChange} />
                <input
                    type="date"
                    value={formatDate(task.date)}
                    onChange={handleDateChange}
                />
            </div>
            <div className="taskDetails">
                <textarea value={task.note || ''} onChange={handleNoteChange} />
            </div>
        </div>
    );
};

export default TaskDrawer;
