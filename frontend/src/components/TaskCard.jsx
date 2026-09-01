function TaskCard({ task, onToggle, onDelete }) {

    return (
        <div className="task-card">

            <div className="task-info">

                <h3>
                    {task.title}
                </h3>

                <p>
                    {task.description || "No description"}
                </p>

                <span
                    className={
                        task.completed
                            ? "completed"
                            : "pending"
                    }
                >
                    {task.completed
                        ? "✓ Completed"
                        : "○ Pending"}
                </span>

            </div>


            <div className="task-buttons">

                <button
                    onClick={() => onToggle(task)}
                >
                    {task.completed
                        ? "Mark Pending"
                        : "Complete"}
                </button>


                <button
                    onClick={() => onDelete(task.id)}
                >
                    Delete
                </button>

            </div>

        </div>
    );
}

export default TaskCard;