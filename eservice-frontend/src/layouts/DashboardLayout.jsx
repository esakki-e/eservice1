import { Link } from "react-router-dom";
import "./DashboardLayout.css";

function DashboardLayout({ children }) {

    return (

        <div className="dashboard-layout">

            {/* Sidebar */}

            <aside className="dashboard-sidebar">

                <div>

                    <h2 className="sidebar-logo">

                        Vinayaga

                        <span className="sidebar-logo-highlight">

                            Portal

                        </span>

                    </h2>

                    <nav className="sidebar-nav">

                        <Link

                            to="/dashboard"

                            className="sidebar-link"

                        >

                            Dashboard

                        </Link>

                        <Link

                            to="/requests"

                            className="sidebar-link"

                        >

                            Requests

                        </Link>

                        <Link

                            to="/services"

                            className="sidebar-link"

                        >

                            Services

                        </Link>

                        <Link

                            to="/services/create"

                            className="sidebar-link"

                        >

                            Create Service

                        </Link>

                        <Link

                            to="/service-categories"

                            className="sidebar-link"

                        >

                            Service Categories

                        </Link>

                        <Link

                            to="/employees"

                            className="sidebar-link"

                        >

                            Employees

                        </Link>

                        <Link

                            to="/users"

                            className="sidebar-link"

                        >

                            Users

                        </Link>

                    </nav>

                </div>

                <div className="sidebar-footer">

                    <button

                        className="sidebar-logout-button"

                        onClick={() => {

                            localStorage.clear();

                            window.location.href = "/";

                        }}

                    >

                        Logout

                    </button>

                </div>

            </aside>

            {/* Main Content */}

            <main className="dashboard-content">

                {children}

            </main>

        </div>

    );

}

export default DashboardLayout;