import React from 'react';
import {Task} from "../../types";
import {SVGComponent} from "../ui/SVG";

interface InputCheckProps {
    task: Task;
    onComplete: (value: Task) => void;
}

const InputCheck: React.FC<InputCheckProps> = ({ task, onComplete }) => {

    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
        e.stopPropagation();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onComplete({ ...task, completed: e.target.checked });
    };

    return (
        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}} className="inputCheckbox">
            {task.completed && <SVGComponent icon={"check"} style={{position: "absolute"}} size={16}/>}
            <input
                id={`task-${task.id}`}
                type="checkbox"
                checked={task.completed}
                onChange={handleChange}
                onClick={handleClick}
                className="checkbox md"
            />
        </div>
    );
};

export default InputCheck;