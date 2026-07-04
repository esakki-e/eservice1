import { Link } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css"
function Navbar() {

    const role = localStorage.getItem("role");

    const [open, setOpen] = useState(false);

    const logout = () => {

        localStorage.clear();

        window.location.href = "/";
    };
    return (

        <>

            <nav className="portal-navbar">

                <div className="portal-navbar-container">

                    {/* Left */}

                    <div className="portal-navbar-left">

                        {(role === "CUSTOMER" || role === "EMPLOYEE") && (

                            <button
                                onClick={() => setOpen(!open)}
                                className="portal-menu-button"
                            >
                                ☰
                            </button>

                        )}

                        <div className="portal-logo">

                            V

                        </div>

                        <h1 className="portal-title">

                            Vinayaga Portal

                        </h1>

                    </div>

                    {/* Right */}

                    <div className="portal-navbar-right">

                        {role === "OWNER" && (

                            <>

                                <Link
                                    to="/dashboard"
                                    className="portal-nav-link"
                                >
                                    Dashboard
                                </Link>

                                <button
                                    onClick={logout}
                                    className="portal-logout-button"
                                >
                                    Logout
                                </button>

                            </>

                        )}

                        {role === "CUSTOMER" && (

                            <>

                                <Link
                                    to="/customer-services"
                                    className="portal-nav-link"
                                >
                                    Services
                                </Link>

                                <Link
                                    to="/my-requests"
                                    className="portal-nav-link"
                                >
                                    My Requests
                                </Link>

                            </>

                        )}

                        {role === "EMPLOYEE" && (

                            <>

                                <Link
                                    to="/employee-dashboard"
                                    className="portal-nav-link"
                                >
                                    Dashboard
                                </Link>

                                <Link
                                    to="/employee-requests"
                                    className="portal-nav-link"
                                >
                                    Requests
                                </Link>

                            </>

                        )}

                    </div>

                </div>

            </nav>

            {/* Side Menu */}

            {open && (role === "CUSTOMER" || role === "EMPLOYEE") && (

                <div className="portal-side-menu">

                    {role === "CUSTOMER" && (

                        <>

                            <Link
                                to="/customer-profile-view"
                                onClick={() => setOpen(false)}
                                className="portal-side-link"
                            >
                                Profile
                            </Link>

                            <Link
                                to="/customer-profile-edit"
                                onClick={() => setOpen(false)}
                                className="portal-side-link"
                            >
                                Edit Profile
                            </Link>

                        </>

                    )}

                    {role === "EMPLOYEE" && (

                        <>

                            <Link
                                to="/employee/profile"
                                onClick={() => setOpen(false)}
                                className="portal-side-link"
                            >
                                Profile
                            </Link>

                            <Link
                                to="/employee/profile/edit"
                                onClick={() => setOpen(false)}
                                className="portal-side-link"
                            >
                                Edit Profile
                            </Link>

                        </>

                    )}

                    <hr className="portal-side-divider" />

                    <button
                        onClick={logout}
                        className="portal-side-logout"
                    >
                        Logout
                    </button>

                </div>

            )}

        </>

    );
}

export default Navbar;