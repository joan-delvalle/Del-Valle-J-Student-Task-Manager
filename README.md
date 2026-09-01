# Student Task Manager

## Activity 4 - Building Your First Full-Stack App

Student Task Manager is a simple full-stack web application created for Integrative Programming II Activity 4.

The application allows students to add, view, complete, and delete their school tasks.

## Technologies Used

* React
* Vite
* JavaScript
* React Router
* Node.js
* Express.js
* CORS
* PostgreSQL
* Node-postgres (`pg`)

## Project Structure

```text
Del Valle_J
├── README.md
├── .gitignore
├── backend
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   └── db.js
└── frontend
    ├── package.json
    ├── package-lock.json
    └── src
        ├── components
        │   ├── Navbar.jsx
        │   └── TaskCard.jsx
        ├── pages
        │   ├── Home.jsx
        │   ├── Dashboard.jsx
        │   └── About.jsx
        ├── App.jsx
        ├── main.jsx
        └── index.css
```

## Database

This project uses PostgreSQL to permanently store tasks.

The database contains a `tasks` table with the following fields:

* `id`
* `title`
* `description`
* `completed`
* `created_at`

## Backend Setup

Open PowerShell and go to the backend folder:

```powershell
cd "C:\Users\ALL AtoZ\Del Valle_J\backend"
```

Install the dependencies:

```powershell
npm install
```

Create a `.env` file inside the `backend` folder.

Example:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=student_tasks
DB_PASSWORD=YOUR_POSTGRES_PASSWORD
DB_PORT=5432
PORT=5000
```

Replace `YOUR_POSTGRES_PASSWORD` with your PostgreSQL password.

Start the backend server:

```powershell
npm run dev
```

The backend runs on:

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

The frontend normally runs on:

```text
http://localhost:5173
```

## Application Features

The Student Task Manager allows users to:

* Add tasks
* View tasks
* Mark tasks as completed
* Mark tasks as pending
* Delete tasks
* Navigate between Home, Dashboard, and About pages

## REST API

### Get All Tasks

```text
GET /api/tasks
```

Returns all tasks from PostgreSQL.

### Add Task

```text
POST /api/tasks
```

Creates and saves a new task.

### Update Task

```text
PUT /api/tasks/:id
```

Updates the completion status of a task.

### Delete Task

```text
DELETE /api/tasks/:id
```

Deletes a task.

## Frontend and Backend Communication

The React frontend communicates with the Express backend using HTTP requests.

```text
React Frontend
      |
      | HTTP Request
      v
Express Backend
      |
      | SQL Query
      v
PostgreSQL
      |
      | Database Response
      v
Express Backend
      |
      | JSON Response
      v
React Frontend
```

## React Concepts Used

This project demonstrates:

* Components
* Props
* `useState`
* `useEffect`
* React Router
* Forms
* Event handling
* Conditional rendering
* Fetch API

## GitHub Submission

This project is organized as a mono-repository containing both the frontend and backend.

```text
Del Valle_J
├── frontend
├── backend
└── README.md
```

## Author

Del Valle J.

## Course

Integrative Programming II

## Activity

Activity 4 - Building Your First Full-Stack App
