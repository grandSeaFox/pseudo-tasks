import React from 'react';
import type { Task } from '../types';
import {SVGComponent} from "./ui/SVG";
import {formatDate, isDateNow} from "../utils";

type TaskItemProps = {
    task: Task;
    onComplete: (task: Task) => void;
    onClick: (taskId: string) => void;
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onComplete, onClick  }) => {
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
                                >{task.date}</p>
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
    );
};

export default TaskItem;
