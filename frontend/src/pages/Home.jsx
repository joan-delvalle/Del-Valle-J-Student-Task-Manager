import { Link } from "react-router-dom";

function Home() {

    return (
        <main className="main-content home-dashboard">

            <section className="hero-card">

                <div className="hero-content">

                    <span className="hero-badge">
                        🎓 STUDENT WORKSPACE
                    </span>

                    <h1>
                        Stay organized.
                        <br />
                        Stay ahead.
                    </h1>

                    <p>
                        Manage your assignments, deadlines,
                        and school activities in one simple
                        workspace.
                    </p>

                    <Link
                        to="/dashboard"
                        className="hero-button"
                    >
                        View My Tasks →
                    </Link>

                </div>

                <div className="hero-illustration">
                    📚
                </div>

            </section>


            <section className="quick-info">

                <div>
                    <span>📋</span>

                    <div>
                        <h3>
                            Organize Tasks
                        </h3>

                        <p>
                            Keep all your school work
                            in one place.
                        </p>
                    </div>
                </div>


                <div>
                    <span>📅</span>

                    <div>
                        <h3>
                            Track Deadlines
                        </h3>

                        <p>
                            Never forget an important
                            submission date.
                        </p>
                    </div>
                </div>


                <div>
                    <span>✅</span>

                    <div>
                        <h3>
                            Track Progress
                        </h3>

                        <p>
                            Mark assignments complete
                            as you finish them.
                        </p>
                    </div>
                </div>

            </section>

        </main>
    );
}

export default Home;

