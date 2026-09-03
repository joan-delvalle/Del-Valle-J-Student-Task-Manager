
import { useMemo, useState } from "react";
import TaskCard from "../components/TaskCard";

function Dashboard() {

    const [tasks, setTasks] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    const [loading, setLoading] = useState(true);


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

        } finally {

            setLoading(false);
        }
    };


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
                        title,
                        description,
                        deadline: deadline || null
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Failed to add task");
            }

            setTitle("");
            setDescription("");
            setDeadline("");

            fetchTasks();

        } catch (error) {

            console.error(
                "Error adding task:",
                error
            );

            alert("Unable to add task.");
        }
    };

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


    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        task => task.completed
    ).length;

    const pendingTasks = tasks.filter(
        task => !task.completed
    ).length;

    const dueSoonTasks = tasks.filter(task => {

        if (task.completed || !task.deadline) {
            return false;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const deadlineDate = new Date(
            `${task.deadline}T00:00:00`
        );

        const threeDays = new Date(
            today.getTime() +
            3 * 24 * 60 * 60 * 1000
        );

        return (
            deadlineDate >= today &&
            deadlineDate <= threeDays
        );

    }).length;

    const filteredTasks = useMemo(() => {

        return tasks.filter(task => {

            const matchesSearch =
                task.title
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                (task.description || "")
                    .toLowerCase()
                    .includes(search.toLowerCase());

            let matchesFilter = true;

            if (filter === "pending") {
                matchesFilter = !task.completed;
            }

            if (filter === "completed") {
                matchesFilter = task.completed;
            }

            if (filter === "due") {

                if (!task.deadline || task.completed) {
                    matchesFilter = false;
                } else {

                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    const deadlineDate = new Date(
                        `${task.deadline}T00:00:00`
                    );

                    matchesFilter =
                        deadlineDate >= today &&
                        deadlineDate <=
                            new Date(
                                today.getTime() +
                                3 * 24 * 60 * 60 * 1000
                            );
                }
            }

            return matchesSearch && matchesFilter;

        });

    }, [tasks, search, filter]);


    return (
        <main className="main-content">

            {/* HEADER */}

            <header className="dashboard-header">

                <div>

                    <p className="eyebrow">
                        MY CLASSROOM
                    </p>

                    <h1>
                        Good morning, Joan! 👋
                    </h1>

                    <p>
                        Keep track of your school work
                        and stay on top of your deadlines.
                    </p>

                </div>

                <div className="profile-circle">
                    JD
                </div>

            </header>


            {/* STATISTICS */}

            <section className="stats-grid">

                <div className="stat-card">

                    <div className="stat-icon blue">
                        📋
                    </div>

                    <div>
                        <span>Total Tasks</span>
                        <strong>{totalTasks}</strong>
                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-icon orange">
                        ⏳
                    </div>

                    <div>
                        <span>Pending</span>
                        <strong>{pendingTasks}</strong>
                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-icon green">
                        ✓
                    </div>

                    <div>
                        <span>Completed</span>
                        <strong>{completedTasks}</strong>
                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-icon red">
                        📅
                    </div>

                    <div>
                        <span>Due Soon</span>
                        <strong>{dueSoonTasks}</strong>
                    </div>

                </div>

            </section>


            {/* ADD TASK */}

            <section className="add-task-section">

                <div className="section-heading">

                    <div>

                        <span className="section-label">
                            CREATE
                        </span>

                        <h2>
                            Add a New Task
                        </h2>

                    </div>

                </div>


                <form
                    className="task-form"
                    onSubmit={addTask}
                >

                    <div className="form-row">

                        <div className="form-group">

                            <label>
                                Task Title
                            </label>

                            <input
                                type="text"
                                placeholder="e.g. Database Assignment"
                                value={title}
                                onChange={(event) =>
                                    setTitle(event.target.value)
                                }
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Deadline
                            </label>

                            <input
                                type="date"
                                value={deadline}
                                onChange={(event) =>
                                    setDeadline(event.target.value)
                                }
                            />

                        </div>

                    </div>


                    <div className="form-group">

                        <label>
                            Description
                        </label>

                        <textarea
                            placeholder="Describe what you need to accomplish..."
                            value={description}
                            onChange={(event) =>
                                setDescription(event.target.value)
                            }
                        />

                    </div>


                    <button
                        className="add-button"
                        type="submit"
                    >
                        + Add Task
                    </button>

                </form>

            </section>


            {/* TASKS */}

            <section className="tasks-section">

                <div className="tasks-header">

                    <div>

                        <span className="section-label">
                            ASSIGNMENTS
                        </span>

                        <h2>
                            My Tasks
                        </h2>

                    </div>


                    <div className="task-controls">

                        <div className="search-box">

                            🔍

                            <input
                                type="text"
                                placeholder="Search tasks..."
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                            />

                        </div>


                        <select
                            value={filter}
                            onChange={(event) =>
                                setFilter(event.target.value)
                            }
                        >
                            <option value="all">
                                All Tasks
                            </option>

                            <option value="pending">
                                Pending
                            </option>

                            <option value="completed">
                                Completed
                            </option>

                            <option value="due">
                                Due Soon
                            </option>

                        </select>

                    </div>

                </div>


                {loading ? (

                    <div className="empty">
                        Loading tasks...
                    </div>

                ) : filteredTasks.length === 0 ? (

                    <div className="empty">

                        <div className="empty-icon">
                            📚
                        </div>

                        <h3>
                            No tasks found
                        </h3>

                        <p>
                            Add a task or change your search filter.
                        </p>

                    </div>

                ) : (

                    <div className="task-list">

                        {filteredTasks.map(task => (

                            <TaskCard
                                key={task.id}
                                task={task}
                                onToggle={toggleTask}
                                onDelete={deleteTask}
                            />

                        ))}

                    </div>

                )}

            </section>

        </main>
    );
}

export default Dashboard;
