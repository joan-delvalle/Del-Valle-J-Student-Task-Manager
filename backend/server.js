const express = require("express");
const cors = require("cors");
const pool = require("./db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.json({
        message: "Student Task Manager API is running!"
    });
});


app.get("/api/tasks", async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT *
             FROM tasks
             ORDER BY
                CASE
                    WHEN deadline IS NULL THEN 1
                    ELSE 0
                END,
                deadline ASC,
                id DESC`
        );

        res.json(result.rows);

    } catch (error) {
        console.error("Error fetching tasks:", error);

        res.status(500).json({
            error: "Failed to fetch tasks"
        });
    }
});


app.post("/api/tasks", async (req, res) => {
    try {

        const { title, description, deadline } = req.body;

        if (!title || title.trim() === "") {
            return res.status(400).json({
                error: "Task title is required"
            });
        }

        const result = await pool.query(
            `INSERT INTO tasks
                (title, description, deadline, completed)
             VALUES
                ($1, $2, $3, false)
             RETURNING *`,
            [
                title.trim(),
                description || "",
                deadline || null
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {

        console.error("Error adding task:", error);

        res.status(500).json({
            error: "Failed to add task"
        });
    }
});


app.put("/api/tasks/:id", async (req, res) => {

    try {

        const { id } = req.params;
        const { completed } = req.body;

        const result = await pool.query(
            `UPDATE tasks
             SET completed = $1
             WHERE id = $2
             RETURNING *`,
            [completed, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Task not found"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {

        console.error("Error updating task:", error);

        res.status(500).json({
            error: "Failed to update task"
        });
    }
});


app.delete("/api/tasks/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            `DELETE FROM tasks
             WHERE id = $1
             RETURNING *`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Task not found"
            });
        }

        res.json({
            message: "Task deleted successfully",
            task: result.rows[0]
        });

    } catch (error) {

        console.error("Error deleting task:", error);

        res.status(500).json({
            error: "Failed to delete task"
        });
    }
});


app.listen(PORT, () => {

    console.log(
        `Backend server running on http://localhost:${PORT}`
    );

});