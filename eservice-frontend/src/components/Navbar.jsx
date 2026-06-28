import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {

    const role = localStorage.getItem("role");

    const [open, setOpen] = useState(false);

    const logout = () => {

        localStorage.clear();

        window.location.href = "/";
    };

    return (

        <>

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
                        h-16
                        px-6
                        flex
                        items-center
                        justify-between
                    "
                >

                    {/* Left */}

                    <div className="flex items-center gap-3">

                        {(role === "CUSTOMER" || role === "EMPLOYEE") && (

                            <button
                                onClick={() => setOpen(!open)}
                                className="
                                    w-10
                                    h-10
                                    rounded-lg
                                    bg-slate-800
                                    text-white
                                    text-2xl
                                    hover:bg-slate-700
                                "
                            >
                                ☰
                            </button>

                        )}

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

                        <h1 className="text-white text-2xl font-bold">

                            Vinayaga Portal

                        </h1>

                    </div>

                    {/* Right */}

                    <div className="flex items-center gap-6">

                        {role === "OWNER" && (

                            <>
                                <Link
                                    to="/dashboard"
                                    className="text-blue-500 hover:text-white"
                                >
                                    Dashboard
                                </Link>

                                <button
                                    onClick={logout}
                                    className="
                                        bg-red-500
                                        text-white
                                        px-6
                                        py-2
                                    "
                                >
                                    Logout
                                </button>
                            </>

                        )}

                        {role === "CUSTOMER" && (

                            <>

                                <Link
                                    to="/customer-services"
                                    className="text-blue-500 hover:text-white"
                                >
                                    Services
                                </Link>

                                <Link
                                    to="/my-requests"
                                    className="text-blue-500 hover:text-white"
                                >
                                    My Requests
                                </Link>

                            </>

                        )}

                        {role === "EMPLOYEE" && (

                            <>

                                <Link
                                    to="/employee-dashboard"
                                    className="text-blue-500 hover:text-white"
                                >
                                    Dashboard
                                </Link>

                                <Link
                                    to="/employee-requests"
                                    className="text-blue-500 hover:text-white"
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

                <div
                    className="
        absolute
        top-20
        left-8
        w-64
        bg-white
        rounded-3xl
        shadow-2xl
        z-50
        p-5
    "
                >

                    {role === "CUSTOMER" && (

                        <>

                            <Link
                                to="/customer-profile-view"
                                onClick={() => setOpen(false)}
                                className="
    block
    py-3
    text-blue-600
    text-lg
"
                            >
                                Profile
                            </Link>

                            <Link
                                to="/customer-profile-edit"
                                onClick={() => setOpen(false)}
                                className="
                                    block
                                    py-3
                                    text-blue-600
                                    text-lg
                                "
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
                                className="
                                    block
                                    py-3
                                    text-blue-600
                                    text-lg
                                "
                            >
                                Profile
                            </Link>

                            <Link
                                to="/employee/profile?edit=true"
                                onClick={() => setOpen(false)}
                                className="
                                    block
                                    py-3
                                    text-blue-600
                                    text-lg
                                "
                            >
                                Edit Profile
                            </Link>

                        </>

                    )}

                    <hr className="my-4" />

                    <button
                        onClick={logout}
                        className="
                            w-full
                            bg-red-500
                            hover:bg-red-600
                            text-white
                            rounded-xl
                            py-3
                            text-lg
                            font-semibold
                        "
                    >
                        Logout
                    </button>

                </div>

            )}

        </>

    );

}

export default Navbar;