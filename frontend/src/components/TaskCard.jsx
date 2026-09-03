
function TaskCard({ task, onToggle, onDelete }) {

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const deadlineDate = task.deadline
        ? new Date(`${task.deadline}T00:00:00`)
        : null;

    const isOverdue =
        deadlineDate &&
        deadlineDate < today &&
        !task.completed;

    const isDueSoon =
        deadlineDate &&
        deadlineDate >= today &&
        deadlineDate <=
            new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000) &&
        !task.completed;

    const formatDate = (date) => {

        if (!date) {
            return "No deadline";
        }

        return new Date(`${date}T00:00:00`).toLocaleDateString(
            "en-US",
            {
                month: "long",
                day: "numeric",
                year: "numeric"
            }
        );
    };

    return (
        <div
            className={`task-card ${
                task.completed ? "task-completed" : ""
            }`}
        >

            <div className="task-card-main">

                <div className="task-icon">
                    {task.completed ? "✓" : "📝"}
                </div>

                <div className="task-content">

                    <div className="task-title-row">

                        <h3>
                            {task.title}
                        </h3>

                        {task.completed ? (
                            <span className="status completed">
                                ✓ Completed
                            </span>
                        ) : isOverdue ? (
                            <span className="status overdue">
                                ⚠ Overdue
                            </span>
                        ) : isDueSoon ? (
                            <span className="status due-soon">
                                ⏰ Due Soon
                            </span>
                        ) : (
                            <span className="status pending">
                                ● Pending
                            </span>
                        )}

                    </div>

                    <p className="task-description">
                        {task.description || "No description provided."}
                    </p>

                    <div className="task-meta">

                        <span>
                            📅
                            {task.deadline
                                ? ` Due ${formatDate(task.deadline)}`
                                : " No deadline"}
                        </span>

                        {task.created_at && (
                            <span>
                                • Created{" "}
                                {new Date(
                                    task.created_at
                                ).toLocaleDateString()}
                            </span>
                        )}

                    </div>

                </div>

            </div>

            <div className="task-actions">

                <button
                    className={
                        task.completed
                            ? "pending-button"
                            : "complete-button"
                    }
                    onClick={() => onToggle(task)}
                >
                    {task.completed
                        ? "↩ Mark Pending"
                        : "✓ Complete"}
                </button>

                <button
                    className="delete-button"
                    onClick={() => onDelete(task.id)}
                >
                    🗑 Delete
                </button>

            </div>

        </div>
    );
}

export default TaskCard;

