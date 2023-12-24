import React, {useState} from 'react';
import type { Task } from '../types';
import {SVGComponent} from "./ui/SVG";
import {isDateNow} from "../utils";
import InputCheck from "./InputCheck";

type TaskItemProps = {
    task: Task;
    index: number;
    onClick: (taskId: string) => void;
    onComplete: (taskId: string) => void;
    onDragLeft: (taskId: string) => void;
    onDragRight: (taskId: string) => void;
    onDragStart: (index: number) => void;
    onDragEnd: () => void;
};

const TaskItem: React.FC<TaskItemProps> = ({ task, index, onClick, onComplete, onDragLeft, onDragRight, onDragStart, onDragEnd }) => {
    const [initialX, setInitialX] = useState(0);
    const [dragDirection, setDragDirection] = useState('');
    const DRAG_THRESHOLD = 150

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        setInitialX(e.screenX);
        e.currentTarget.classList.add('dragging');
        onDragStart(index);
    };

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        const dragDistance = e.screenX - initialX;
        if (Math.abs(dragDistance) > DRAG_THRESHOLD) {
            const direction = dragDistance < 0 ? 'drag-left' : 'drag-right';
            setDragDirection(direction);
        } else {
            setDragDirection('');
        }
    };

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        onDragEnd();
        e.currentTarget.classList.remove('dragging');
        const dragDistance = e.screenX - initialX;
        if (Math.abs(dragDistance) > DRAG_THRESHOLD) {
            if (dragDistance < 0) {
                onDragLeft(task.id);
            } else {
                onDragRight(task.id);
            }
        }
        setDragDirection('');
    };

    return (
        <div className="taskItemWrapper">
            {dragDirection === 'drag-left' && (
                <div className={`dragIcon ${dragDirection}`}>
                    <SVGComponent icon="archive" className="dragIcon left" />
                </div>
            )}
            <div
                className={`taskItem`}
                draggable
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDrag={handleDrag}
                onClick={() => onClick(task.id)}
            >
                <div className="checkboxWrapper">
                    <InputCheck task={task} onComplete={onComplete} type="md"/>
                </div>

                <div className="taskTitle">
                    <p className={task.completed ? "completed" : ''}>
                        {task.title}
                    </p>
                    {!task.completed && (
                        <div className="taskInfo">
                            {task.repeat && (
                                <div className="taskInfoDetails">
                                    <SVGComponent icon={'repeat'} size={12}/>
                                    <p>{task.repeat}</p>
                                </div>
                            )}
                            {task.date && (
                                <div className="taskInfoDetails">
                                    <SVGComponent icon={'calendar'} size={12}/>
                                    <p style={
                                        {
                                            color: task.date && isDateNow(task.date) ? "#cc2626" : "#c2c2c2",
                                            fontWeight: task.date && isDateNow(task.date) ? "bold" : "normal"
                                        }}
                                    >{task.date && isDateNow(task.date) ? "Today" : task.date}</p>
                                </div>
                            )}
                            {task.note && (
                                <div className="taskInfoDetails">
                                    <SVGComponent icon={'note'} size={12}/>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            {dragDirection === 'drag-right' && (
                <div className={`dragIcon ${dragDirection}`}>
                    <SVGComponent icon="trash" />
                </div>
            )}
        </div>

    );
};

export default TaskItem;
