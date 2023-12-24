import React from 'react';
import {Task} from "../../types";
import {SVGComponent} from "../ui/SVG";

interface InputCheckProps {
    task: Task;
    onComplete: (taskId: string) => void;
    type?: "sm" | "md" | "lg";
}

const InputCheck: React.FC<InputCheckProps> = ({ task, onComplete, type }) => {

    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
        e.stopPropagation();
    };

    const handleChange = () => {
        onComplete(task.id);
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
                className={`checkbox ${type}`}
            />
        </div>
    );
};

export default InputCheck;