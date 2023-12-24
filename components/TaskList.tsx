import React, {useMemo, useState} from 'react';
import TaskItem from './TaskItem';
import type {Task} from '../types';
import {SVGComponent} from "./ui/SVG";

type TaskListProps = {
    tasks: Task[];
    onTaskClick: (taskId: string) => void;
    onComplete: (taskId: string) => void;
    onArchive: (taskId: string) => void;
    onDelete: (taskId: string) => void;
    onUpdateTasksOrder: (tasks: Task[]) => void;
    isArchivedView?: boolean;
};

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskClick, onComplete, onArchive, onDelete, onUpdateTasksOrder, isArchivedView }) => {
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

    const uncompletedTasks = useMemo(() => tasks.filter(task => !task.completed), [tasks]);
    const completedTasks = useMemo(() => tasks.filter(task => task.completed), [tasks]);

    const handleDragLeft = (taskId: string) => {
        onArchive(taskId);
    };

    const handleDragRight = (taskId: string) => {
        onDelete(taskId);
    };

    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (index: number) => {
        if (index !== dragOverIndex) {
            setDragOverIndex(index);
        }
    };

    const handleDragEnd = () => {
        setDragOverIndex(null);
    };

    const handleDrop = (targetIndex: number) => {
        setDragOverIndex(null);
        if (draggedIndex === null) return;

        const newTasks = [...tasks];
        const [draggedTask] = newTasks.splice(draggedIndex, 1);
        newTasks.splice(targetIndex, 0, draggedTask);

        onUpdateTasksOrder(newTasks);
        setDraggedIndex(null);
    };

    const renderCategorySection = (title: string, tasks: Task[], isArchivedView: boolean = false) => (
        <div className={"category"}>
            {!isArchivedView && <h2>{title}</h2>}
            {tasks.map((task, index) => (
                <div
                    key={task.id}
                    className={`${dragOverIndex === index ? 'drag-over' : ''}`}
                    onDrop={() => handleDrop(index)}
                    onDragOver={(e) => {
                        e.preventDefault();
                        handleDragOver(index);
                    }}
                >
                    <TaskItem
                        task={task}
                        index={index}
                        onClick={() => onTaskClick(task.id)}
                        onComplete={() => onComplete(task.id)}
                        onDragLeft={handleDragLeft}
                        onDragRight={handleDragRight}
                        onDragStart={() => handleDragStart(index)}
                        onDragEnd={handleDragEnd}
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
