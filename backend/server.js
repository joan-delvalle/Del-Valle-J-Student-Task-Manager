const express = require("express");
const cors = require("cors");
const pool = require("./db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// HOME / TEST ROUTE
app.get("/", (req, res) => {
    res.json({
        message: "Student Task Manager API is running!"
    });
});


// GET ALL TASKS
app.get("/api/tasks", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM tasks ORDER BY id DESC"
        );

        res.json(result.rows);

    } catch (error) {
        console.error("Error fetching tasks:", error);

        res.status(500).json({
            error: "Failed to fetch tasks"
        });
    }
});


// POST / ADD A TASK
app.post("/api/tasks", async (req, res) => {
    try {

        const { title, description } = req.body;

        if (!title || title.trim() === "") {
            return res.status(400).json({
                error: "Task title is required"
            });
        }

        const result = await pool.query(
            `INSERT INTO tasks (title, description)
             VALUES ($1, $2)
             RETURNING *`,
            [title, description]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error("Error adding task:", error);

        res.status(500).json({
            error: "Failed to add task"
        });
    }
});


// START SERVER
app.listen(PORT, () => {
    console.log(
        `Backend server running on http://localhost:${PORT}`
    );
});