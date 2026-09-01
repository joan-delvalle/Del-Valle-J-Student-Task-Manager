# Student Task Manager

## Activity 4 - Building Your First Full-Stack App

Student Task Manager is a simple full-stack web application created for Integrative Programming II Activity 4.

The application allows students to add, view, complete, and delete their school tasks.

## Technologies Used

### Frontend

* React
* Vite
* JavaScript
* React Router
* HTML
* CSS

### Backend

* Node.js
* Express.js
* CORS

### Database

* PostgreSQL
* pg (node-postgres)

## Project Structure

```text
Del Valle_J
│
├── README.md
├── .gitignore
│
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── Navbar.jsx
│   │   │   └── TaskCard.jsx
│   │   │
│   │   ├── pages
│   │   │   ├── Home.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── About.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   └── package.json
│
└── backend
    ├── server.js
    ├── db.js
    ├── package.json
    └── .env
```

## Database Setup

1. Open PostgreSQL or pgAdmin.
2. Create a database named:

```text
student_tasks
```

3. Open the Query Tool.
4. Create the `tasks` table:

```sql
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Backend Setup

Open PowerShell and go to the backend folder:

```powershell
cd "C:\Users\ALL AtoZ\Del Valle_J\backend"
```

Install the required packages:

```powershell
npm install
```

Create a `.env` file inside the backend folder:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=student_tasks
DB_PASSWORD=YOUR_POSTGRES_PASSWORD
DB_PORT=5432
PORT=5000
```

Replace `YOUR_POSTGRES_PASSWORD` with your PostgreSQL password.

Start the backend:

```powershell
npm run dev
```

The backend server will run at:

```text
http://localhost:5000
```

## Frontend Setup

Open another PowerShell terminal.

Go to the frontend folder:

```powershell
cd "C:\Users\ALL AtoZ\Del Valle_J\frontend"
```

Install the dependencies:

```powershell
npm install
```

Install React Router:

```powershell
npm install react-router-dom
```

Start the frontend:

```powershell
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173
```

## Application Pages

### Home

The Home page introduces the Student Task Manager application.

### Dashboard

The Dashboard allows the user to:

* Add a new task
* View saved tasks
* Mark a task as completed
* Mark a task as pending
* Delete a task

### About

The About page provides information about the application and the technologies used.

## REST API

### GET Tasks

```text
GET /api/tasks
```

Retrieves all tasks from PostgreSQL.

### GET One Task

```text
GET /api/tasks/:id
```

Retrieves a specific task.

### POST Task

```text
POST /api/tasks
```

Creates a new task and saves it to PostgreSQL.

### PUT Task

```text
PUT /api/tasks/:id
```

Updates the completion status of a task.

### DELETE Task

```text
DELETE /api/tasks/:id
```

Deletes a task from PostgreSQL.

## How Frontend and Backend Communicate

The React frontend sends HTTP requests to the Express backend.

The Express backend processes the requests and communicates with PostgreSQL.

The database stores the task information permanently.

```text
React Frontend
      │
      │ HTTP Requests
      ▼
Express Backend
      │
      │ SQL Queries
      ▼
PostgreSQL Database
      │
      │ Database Response
      ▼
Express Backend
      │
      │ JSON Response
      ▼
React Frontend
```

## React Concepts Demonstrated

This project demonstrates:

* React Components
* Props
* `useState`
* `useEffect`
* React Router
* Forms
* Event Handling
* Conditional Rendering
* API Requests using `fetch`

## GitHub Submission

This project is organized as a mono-repository containing both the frontend and backend applications.

```text
Del Valle_J
├── frontend
├── backend
└── README.md
```

## Author

Del Valle_J

## Course

Integrative Programming II

## Activity

Activity 4 - Building Your First Full-Stack App
