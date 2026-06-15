import { Link } from "react-router-dom";
import  "./Navbar.css";
function Navbar() {
    const role = localStorage.getItem("role");
    const logout = () => {

        localStorage.clear();

        window.location.href = "/";
    };

    return (

        <nav
            className="
        navbar
        navbar-dark
        navbar-custom
    "
        >            <div className="container-fluid">

                <div>
                    {role === "OWNER" && (

                    <Link
                        className="navbar-brand"
                        to="/dashboard"
                    >
                        Dashboard
                    </Link>)}
                    {(role === "OWNER"||role === "CUSTOMER"  )&& (

                    <Link
                        className="navbar-brand"
                        to="/services"
                    >
                        Services
                    </Link>
                        )}
                    {role === "OWNER" && (

                        <Link
                        className="navbar-brand"
                        to="/services/create"
                    >
                        Create Service
                    </Link>
                        )}
                    {(role === "OWNER" || role === "EMPLOYEE" )&& (

                        <Link
                        className="navbar-brand"
                        to="/requests"
                    >
                        Requests
                    </Link>)}
                    {role === "EMPLOYEE" && (

                    <Link
                        className="navbar-brand"
                        to="/requests/create"
                    >
                        New Request
                    </Link>
                        )}
                    {role === "OWNER" && (

                        <Link
                        className="navbar-brand"
                        to="/employees"
                    >
                        Employees
                    </Link>)}
                    {role === "OWNER" && (

                        <Link
                            className="navbar-brand"
                            to="/users"
                        >
                            Users
                        </Link>

                    )}

                    {role === "EMPLOYEE" && (

                    <Link
                        className="navbar-brand"
                        to="/employee-dashboard"
                    >
                        Employee Dashboard
                    </Link>
                        )}
                    {role === "CUSTOMER" && (

                    <Link
                        className="navbar-brand"
                        to="/my-requests"
                    >
                        My Requests
                    </Link>
                    )}
                </div>

                <button
                    className="btn btn-danger"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>
        </nav>
    );
}

export default Navbar;