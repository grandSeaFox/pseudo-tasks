import {useEffect, useMemo, useState} from 'react';
import type { NextPage } from 'next';
import TaskList from '../components/TaskList';
import Container from "../components/ui/Container";
import AddTask from "../components/AddTask";
import TaskDrawer from "../components/TaskDrawer";
import {useTaskManager} from "../hooks/useTaskManager";
import Navigation from "../components/ui/Navigation";
import {Project} from "../types";

const Home: NextPage = () => {
    const [isClient, setIsClient] = useState(false);
    const { tasks, addTask, updateTask, deleteTask, handleComplete, handleArchiving } = useTaskManager();
    const [showArchived, setShowArchived] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const selectedProject: Project = useMemo(() => {
        return {
            id: 'project-1',
            title: 'Pseudo Tasks',
        }
    }, [])

    const filteredTasks = useMemo(() => {
        if (showArchived) {
            return tasks.filter(task => task.projectId === 'archived');
        } else {
            return tasks.filter(task => task.projectId === selectedProject.id);
        }
    }, [tasks, selectedProject, showArchived]);

    const selectedTask = useMemo(() => {
        if (!selectedTaskId) return null;
        return (
            tasks.find(task => task.id === selectedTaskId) || null
        );
    }, [selectedTaskId, tasks]);

    const openDrawer = (taskId: string) => {
        setSelectedTaskId(taskId);
        setDrawerOpen(true);
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
    };

    const toggleArchivedView = () => {
        setShowArchived(!showArchived);
        closeDrawer();
    };

    return (
        <div className="mainLayoutContainer">
            <Container>
                {!isClient && <div>Loading...</div> || <>
                    <Navigation toggleArchived={toggleArchivedView}><h1>{selectedProject.title}</h1></Navigation>
                    <div className="taskListAndAddTaskContainer">
                        <TaskList
                            tasks={filteredTasks}
                            onTaskClick={openDrawer}
                            onComplete={handleComplete}
                            onDelete={deleteTask}
                            onArchive={handleArchiving}
                            isArchivedView={showArchived}
                        />
                        <TaskDrawer
                            task={selectedTask}
                            isOpen={drawerOpen}
                            onClose={closeDrawer}
                            updateTask={updateTask}
                            onDelete={deleteTask}
                            onComplete={handleComplete}
                            onArchive={handleArchiving}
                        />
                    </div>
                    <AddTask projectId={selectedProject.id} onAddTask={addTask} />
                </>}

            </Container>
        </div>
    );
};

export default Home;
