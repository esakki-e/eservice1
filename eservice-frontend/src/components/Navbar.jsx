import { Link } from "react-router-dom";
function Navbar() {
    const role = localStorage.getItem("role");
    const logout = () => {

        localStorage.clear();

        window.location.href = "/";
    };
    return (
        <nav
            className="
            sticky
            top-0
            z-50
            bg-slate-900
            border-b
            border-slate-800
            shadow-lg
        "
        >
            <div
                className="
                max-w-7xl
                mx-auto
                px-6
                h-16
                flex
                items-center
                justify-between
            "
            >

                {/* Logo */}

                <div className="
                flex
                items-center
                gap-3
            ">
                    <div
                        className="
                        w-10
                        h-10
                        rounded-xl
                        bg-indigo-600
                        text-white
                        flex
                        items-center
                        justify-center
                        font-bold
                    "
                    >
                        V
                    </div>

                    <div>
                        <h1
                            className="
                            text-lg
                            font-bold
                            text-white
                        "
                        >
                            Vinayaga Portal
                        </h1>
                    </div>
                </div>

                {/* Links */}

                <div
                    className="
                    flex
                    items-center
                    gap-2
                "
                >

                    {role === "OWNER" && (
                        <Link
                            to="/dashboard"
                            className="
                            px-4
                            py-2
                            rounded-xl
                            text-slate-300
                            hover:bg-slate-800
                            hover:text-white
                            transition
                        "
                        >
                            Dashboard
                        </Link>
                    )}

                    {(role === "OWNER" || role === "CUSTOMER") && (
                        <Link
                            to="/services"
                            className="
                            px-4
                            py-2
                            rounded-xl
                            text-slate-300
                            hover:bg-slate-800
                            hover:text-white
                            transition
                        "
                        >
                            Services
                        </Link>
                    )}

                    {role === "EMPLOYEE" && (
                        <Link
                            to="/employee-dashboard"
                            className="
                            px-4
                            py-2
                            rounded-xl
                            text-slate-300
                            hover:bg-slate-800
                            hover:text-white
                            transition
                        "
                        >
                            Dashboard
                        </Link>
                    )}

                    {role === "EMPLOYEE" && (
                        <Link
                            to="/employee-requests"
                            className="
                            px-4
                            py-2
                            rounded-xl
                            text-slate-300
                            hover:bg-slate-800
                            hover:text-white
                            transition
                        "
                        >
                            Requests
                        </Link>
                    )}

                    {role === "CUSTOMER" && (
                        <Link
                            to="/my-requests"
                            className="
                            px-4
                            py-2
                            rounded-xl
                            text-slate-300
                            hover:bg-slate-800
                            hover:text-white
                            transition
                        "
                        >
                            My Requests
                        </Link>
                    )}

                    <button
                        onClick={logout}
                        className="
                        ml-3
                        px-4
                        py-2
                        rounded-xl
                        bg-red-500
                        text-white
                        font-medium
                        hover:bg-red-600
                        transition
                    "
                    >
                        Logout
                    </button>

                </div>

            </div>
        </nav>
    );
}

export default Navbar;