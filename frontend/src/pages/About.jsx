function About() {

    return (
        <main className="main-content">

            <section className="about-card">

                <span className="section-label">
                    ABOUT THE PROJECT
                </span>

                <h1>
                    Student Task Manager
                </h1>

                <p className="about-intro">
                    Student Task Manager is a full-stack
                    web application developed for
                    Integrative Programming II.
                </p>


                <div className="about-grid">

                    <div>

                        <h2>
                            🎯 Purpose
                        </h2>

                        <p>
                            The application helps students
                            organize school assignments,
                            monitor deadlines, and track
                            completed activities.
                        </p>

                    </div>


                    <div>

                        <h2>
                            💻 Technologies
                        </h2>

                        <ul>
                            <li>React</li>
                            <li>Vite</li>
                            <li>React Router</li>
                            <li>Node.js</li>
                            <li>Express.js</li>
                            <li>PostgreSQL</li>
                        </ul>

                    </div>


                    <div>

                        <h2>
                            ✨ Features
                        </h2>

                        <ul>
                            <li>Add tasks</li>
                            <li>Set deadlines</li>
                            <li>Complete tasks</li>
                            <li>Delete tasks</li>
                            <li>Search tasks</li>
                            <li>Filter tasks</li>
                        </ul>

                    </div>

                </div>

            </section>

        </main>
    );
}

export default About;

