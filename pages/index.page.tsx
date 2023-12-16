import styles from '../styles/ui/Container.module.scss';
import { useState } from 'react';
import type { NextPage } from 'next';
import TaskList from '../components/TaskList';
import type { Task } from '../types/types';
import Container from "../components/ui/Container";

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

    const addTask = (title: string) => {
        const newTask = {
            id: Date.now().toString(),
            title,
            completed: false
        };
        setTasks(prevTasks => ({
            ...prevTasks,
            toAssign: [...prevTasks.toAssign, newTask]
        }));
    };

    const handleComplete = (taskId: string) => {
        const newTasks = {
            ...tasks,
            today: tasks.today.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            ),
            tomorrow: tasks.tomorrow.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            ),
            upcoming: tasks.upcoming.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            ),
        };
        setTasks(newTasks);
    };

    return (
        <div className={styles.mainLayoutContainer}>
            <Container>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <h1>All Tasks</h1>
                </div>
                <TaskList tasks={tasks} setTasks={setTasks} />
            </Container>
        </div>
    );
};

export default Home;
