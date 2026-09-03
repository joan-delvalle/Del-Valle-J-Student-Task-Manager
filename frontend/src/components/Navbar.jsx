import { NavLink } from "react-router-dom";

function Navbar() {

    return (
        <aside className="sidebar">

            <div className="sidebar-brand">
                <div className="brand-icon">
                    🎓
                </div>

                <div>
                    <h2>Student</h2>
                    <span>Task Manager</span>
                </div>
            </div>

            <nav className="sidebar-nav">

                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "nav-item active" : "nav-item"
                    }
                >
                    <span>🏠</span>
                    Home
                </NavLink>

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        isActive ? "nav-item active" : "nav-item"
                    }
                >
                    <span>📋</span>
                    My Tasks
                </NavLink>

                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        isActive ? "nav-item active" : "nav-item"
                    }
                >
                    <span>ℹ️</span>
                    About
                </NavLink>

            </nav>

            <div className="sidebar-footer">

                <div className="student-avatar">
                    JD
                </div>

                <div>
                    <strong>Joan Del Valle</strong>
                    <small>Student</small>
                </div>

            </div>

        </aside>
    );
}

export default Navbar;

