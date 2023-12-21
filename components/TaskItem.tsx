import React from 'react';
import type { Task } from '../types';
import {SVGComponent} from "./ui/SVG";

type TaskItemProps = {
    task: Task;
    onComplete: (task: Task) => void;
    onClick: (taskId: string) => void;
    onDelete: (taskId: string) => void;
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onComplete, onClick, onDelete  }) => {

    return (
        <div className="taskItem" onClick={() => onClick(task.id)}>
            <div className="checkboxWrapper">
                <input
                    id={`task-${task.id}`}
                    type="checkbox"
                    checked={task.completed}
                    onChange={(e) => {
                        e.preventDefault()
                        onComplete(task)
                    }}
                    className={"checkbox md"}
                />
            </div>

            <div className="taskTitle">
                <p className={task.completed ? "completed" : ''}>
                    {task.title}
                </p>
                {!task.completed && (
                    <div className="taskInfo">
                        {task.repeat && (
                            <div className="taskInfoDetails">
                                <SVGComponent icon={'creditCard'} size={12}/>
                                {task.repeat}
                            </div>
                        )}
                        {task.date && (
                            <div className="taskInfoDetails">
                                <SVGComponent icon={'chart'} size={12}/>
                                {task.date}
                            </div>
                        )}
                        {task.note && (
                            <div className="taskInfoDetails">
                                <SVGComponent icon={'person'} size={12}/>
                            </div>
                        )}
                    </div>
                )}


            </div>
        </div>
    );
};

export default TaskItem;
