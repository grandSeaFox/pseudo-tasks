import React from 'react';
import type {Repeat, Task, TaskCategories} from '../types';
import {SVGComponent} from "./ui/SVG";
import RepeatSelect from "./InputSelect";
import {formatDate} from "../utils";
import InputCheck from "./InputCheck";

type TaskDrawerProps = {
    task: Task | null;
    isOpen: boolean;
    onClose: () => void;
    onComplete: (task: Task) => void;
    updateTask: (updatedTask: Task, newCategory?: keyof TaskCategories) => void;
    onDelete: (taskId: string) => void;
};

const TaskDrawer: React.FC<TaskDrawerProps> = ({ task, isOpen, onClose, onComplete, updateTask, onDelete }) => {
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
                <button onClick={() => onDelete(task.id)} style={{marginLeft: "auto"}}><SVGComponent icon={'trash'}/></button>
            </div>

            <div className="taskHeader">
                <InputCheck task={task} onComplete={onComplete} type="lg"/>
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
