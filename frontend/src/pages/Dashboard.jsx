import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";

function Dashboard() {

    const [tasks, setTasks] = useState([]);

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    // ==========================
    // GET TASKS
    // ==========================

    const fetchTasks = async () => {

        try {

            const response = await fetch(
                "http://localhost:5000/api/tasks"
            );

            if (!response.ok) {
                throw new Error("Failed to fetch tasks");
            }

            const data = await response.json();

            setTasks(data);

        } catch (error) {

            console.error(
                "Error fetching tasks:",
                error
            );
        }
    };


    // ==========================
    // RUN WHEN PAGE LOADS
    // ==========================

    useEffect(() => {

        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchTasks();

    }, []);


    // ==========================
    // ADD TASK
    // ==========================

    const addTask = async (event) => {

        event.preventDefault();

        if (!title.trim()) {

            alert("Please enter a task title.");

            return;
        }

        try {

            const response = await fetch(
                "http://localhost:5000/api/tasks",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        title: title,
                        description: description
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Failed to add task");
            }

            setTitle("");

            setDescription("");

            fetchTasks();

        } catch (error) {

            console.error(
                "Error adding task:",
                error
            );
        }
    };


    // ==========================
    // COMPLETE / PENDING
    // ==========================

    const toggleTask = async (task) => {

        try {

            const response = await fetch(
                `http://localhost:5000/api/tasks/${task.id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        completed: !task.completed
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update task");
            }

            fetchTasks();

        } catch (error) {

            console.error(
                "Error updating task:",
                error
            );
        }
    };


    // ==========================
    // DELETE TASK
    // ==========================

    const deleteTask = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const response = await fetch(
                `http://localhost:5000/api/tasks/${id}`,
                {
                    method: "DELETE"
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete task");
            }

            fetchTasks();

        } catch (error) {

            console.error(
                "Error deleting task:",
                error
            );
        }
    };


    // ==========================
    // DISPLAY
    // ==========================

    return (
        <div className="page dashboard">

            <h1>
                My Tasks 📝
            </h1>

            <form
                className="task-form"
                onSubmit={addTask}
            >

                <input
                    type="text"
                    placeholder="Enter task title"
                    value={title}
                    onChange={(event) =>
                        setTitle(event.target.value)
                    }
                />

                <textarea
                    placeholder="Enter task description"
                    value={description}
                    onChange={(event) =>
                        setDescription(event.target.value)
                    }
                />

                <button type="submit">
                    + Add Task
                </button>

            </form>


            <div className="task-list">

                {tasks.length === 0 ? (

                    <div className="empty">
                        No tasks yet. Add your first task! 🎯
                    </div>

                ) : (

                    tasks.map((task) => (

                        <TaskCard
                            key={task.id}
                            task={task}
                            onToggle={toggleTask}
                            onDelete={deleteTask}
                        />

                    ))

                )}

            </div>

        </div>
    );
}

export default Dashboard;