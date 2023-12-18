import {useEffect, useMemo, useState} from 'react';
import type { NextPage } from 'next';
import TaskList from '../components/TaskList';
import Container from "../components/ui/Container";
import AddTask from "../components/AddTask";
import TaskDrawer from "../components/TaskDrawer";
import {useTaskManager} from "../hooks/useTaskManager";
import Navigation from "../components/ui/Navigation";

const Home: NextPage = () => {
    const { tasks, addTask, updateTask, deleteTask } = useTaskManager();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const selectedTask = useMemo(() => {
        if (!selectedTaskId) return null;
        return (
            tasks.today.concat(tasks.tomorrow, tasks.upcoming, tasks.toAssign)
                .find(task => task.id === selectedTaskId) || null
        );
    }, [selectedTaskId, tasks]);
    const openDrawer = (taskId: string) => {
        setSelectedTaskId(taskId);
        setDrawerOpen(true);
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
    };

    return (
        <div className="mainLayoutContainer">
            <Container>
                {!isClient && <div>Loading...</div> || <>
                    <Navigation><h1>All Tasks</h1></Navigation>
                    <div className="taskListAndAddTaskContainer">
                        <TaskList
                            tasks={tasks}
                            onUpdateTask={updateTask}
                            onTaskClick={openDrawer}
                            onTaskDelete={deleteTask}
                        />
                        <TaskDrawer
                            task={selectedTask}
                            isOpen={drawerOpen}
                            onClose={closeDrawer}
                        />
                    </div>
                    <AddTask onAddTask={addTask} />
                </>}

            </Container>
        </div>
    );
};

export default Home;
