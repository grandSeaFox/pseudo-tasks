import React, { useState } from 'react';
import {SVGComponent} from "./ui/SVG";

type AddTaskProps = {
    onAddTask: (title: string, ) => void;
};

const AddTask: React.FC<AddTaskProps> = ({ onAddTask }) => {
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const handleAddClick = () => {
        if (newTaskTitle.trim() === '') return;
        onAddTask(newTaskTitle);
        setNewTaskTitle('');
    };
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleAddClick();
        }
    };

    return (
        <div className="addTask" style={{ display: "flex" }}>
            <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Enter new task title"
            />
            <button onClick={handleAddClick}><SVGComponent icon={"plus"}/></button>
        </div>
    );
};

export default AddTask;
