import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import type { Task } from '../../types';

const TaskDetailPage: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [task, setTask] = useState<Task | null>(null);

    useEffect(() => {
        setTask({
            id: id as string,
            title: 'Placeholder Task Title',
            completed: false,
        });
    }, [id]);

    if (!task) return <p>Loading...</p>;

    return (
        <div>
            <h1>Task Detail: {task.title}</h1>
            {/* Add more task details here */}
        </div>
    );
};

export default TaskDetailPage;
