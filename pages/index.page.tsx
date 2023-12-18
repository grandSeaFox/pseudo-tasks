import {useMemo, useState} from 'react';
import type { NextPage } from 'next';
import TaskList from '../components/TaskList';
import type { Task } from '../types/types';
import Container from "../components/ui/Container";
import AddTask from "../components/AddTask";
import TaskDrawer from "../components/TaskDrawer";
import {objectKeys} from "../utils";

const Home: NextPage = () => {
    const [tasks, setTasks] = useState<{
        today: Task[],
        tomorrow: Task[],
        upcoming: Task[],
        toAssign: Task[],
    }>({
        today: [
            { id: '1', title: 'Call dad at 20:00 PM', completed: false },
            { id: '2', title: 'Buy Groceries', completed: false },
        ],
        tomorrow: [
            { id: '3', title: 'Buy Groceries', completed: false },
        ],
        upcoming: [
            { id: '4', title: 'Buy Groceries', completed: false },
        ],
        toAssign: [],
    });
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

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

    const addTask = (title: string) => {
        if (!title.trim()) return;

        const newTask = {
            id: Date.now().toString(),
            title: title.trim(),
            completed: false
        };

        setTasks(prevTasks => ({
            ...prevTasks,
            toAssign: [...prevTasks.toAssign, newTask]
        }));
    };
    const deleteTask = (taskId: string) => {
        setTasks(prevTasks => {
            const newTasks = { ...prevTasks };


           objectKeys(newTasks).forEach((key) => {
                newTasks[key as keyof typeof newTasks] = newTasks[key as keyof typeof newTasks].filter(task => task.id !== taskId);
            });

            return newTasks;
        });
    };

    return (
        <div className="mainLayoutContainer">
            <Container>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <h1>All Tasks</h1>
                </div>
                <div className="taskListAndAddTaskContainer">
                    <TaskList
                        tasks={tasks}
                        setTasks={setTasks}
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
            </Container>
        </div>
    );
};

export default Home;
