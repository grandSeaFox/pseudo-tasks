import React, {useMemo} from 'react';
import TaskItem from './TaskItem';
import type {Task} from '../types';
import {SVGComponent} from "./ui/SVG";

type TaskListProps = {
    tasks: Task[];
    onTaskClick: (taskId: string) => void;
    onComplete: (taskId: string) => void;
    onArchive: (taskId: string) => void;
    onDelete: (taskId: string) => void;
    isArchivedView?: boolean;
};

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskClick, onComplete, onArchive, onDelete, isArchivedView }) => {
    const uncompletedTasks = useMemo(() => tasks.filter(task => !task.completed), [tasks]);
    const completedTasks = useMemo(() => tasks.filter(task => task.completed), [tasks]);

    const handleDragLeft = (taskId: string) => {
        onArchive(taskId);
    };

    const handleDragRight = (taskId: string) => {
        onDelete(taskId);
    };

    const renderCategorySection = (title: string, tasks: Task[], isArchivedView: boolean = false) => (
        <div className={"category"}>
            {!isArchivedView && <h2>{title}</h2>}
            {tasks.map(task => (
                <div key={task.id} className="taskItemWrapper">
                    <TaskItem
                        task={task}
                        onClick={() => onTaskClick(task.id)}
                        onComplete={() => onComplete(task.id)}
                        onDragLeft={handleDragLeft}
                        onDragRight={handleDragRight}
                    />
                </div>
            ))}
        </div>
    );

    return (
        <div className={"taskList"}>
            {(uncompletedTasks.length > 0 || completedTasks.length > 0) || <div className="noTasks">
                {!isArchivedView && (
                    <>
                        <SVGComponent icon={"addTask"} size={48}/>
                        <h4 style={{marginLeft: "1rem"}}>Add a task to start your journey</h4>
                    </>
                )}
                {isArchivedView && (
                    <>
                        <SVGComponent icon={"archive"} size={48}/>
                        <h4 style={{marginLeft: "1rem"}}>No Archived tasks</h4>
                    </>
                )}
            </div>}
            {(uncompletedTasks.length > 0 || completedTasks.length > 0) && renderCategorySection('To-do', uncompletedTasks, !!isArchivedView)}
            {completedTasks.length > 0 && renderCategorySection('Completed Tasks', completedTasks, !!isArchivedView)}
        </div>
    );
};

export default TaskList;
