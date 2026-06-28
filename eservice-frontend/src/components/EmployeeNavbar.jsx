import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function EmployeeNavbar() {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const logout = () => {

        localStorage.clear();

        navigate("/login");
    };

    return (

        <>

            <div className="
                bg-slate-900
                h-20
                flex
                items-center
                justify-between
                px-6
                text-white
                shadow-lg
            ">

                <div className="flex items-center gap-4">

                    <button
                        onClick={() => setOpen(!open)}
                        className="
                            text-3xl
                            hover:text-blue-400
                        "
                    >
                        ☰
                    </button>

                    <h1 className="text-3xl font-bold">

                        Employee Portal

                    </h1>

                </div>

            </div>

            {

                open && (

                    <div
                        className="
                            absolute
                            top-20
                            left-6
                            w-72
                            bg-white
                            rounded-3xl
                            shadow-2xl
                            z-50
                            overflow-hidden
                        "
                    >

                        <div className="p-8 text-center">

                            <div
                                className="
                                    w-24
                                    h-24
                                    rounded-full
                                    bg-blue-100
                                    mx-auto
                                    flex
                                    items-center
                                    justify-center
                                    text-4xl
                                "
                            >
                                👤
                            </div>

                            <h2 className="mt-4 text-xl font-bold">

                                Employee

                            </h2>

                        </div>

                        <hr />

                        <Link
                            to="/employee/profile"
                            className="
                                block
                                px-8
                                py-4
                                hover:bg-slate-100
                            "
                            onClick={() => setOpen(false)}
                        >
                            👤 Profile
                        </Link>

                        <Link
                            to="/employee/profile?edit=true"
                            className="
                                block
                                px-8
                                py-4
                                hover:bg-slate-100
                            "
                            onClick={() => setOpen(false)}
                        >
                            ✏️ Edit Profile
                        </Link>

                        <hr />

                        <button

                            onClick={logout}

                            className="
                                w-full
                                bg-red-500
                                hover:bg-red-600
                                text-white
                                py-4
                                font-bold
                            "
                        >

                            Logout

                        </button>

                    </div>

                )

            }

        </>

    );

}

export default EmployeeNavbar;