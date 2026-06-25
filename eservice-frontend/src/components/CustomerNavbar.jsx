import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CustomerNavbar() {

    const [showMenu,
        setShowMenu] =
        useState(false);

    const navigate =
        useNavigate();

    const logout = () => {

        localStorage.clear();

        navigate("/");
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
        px-3
        sm:px-6
        h-16
        flex
        items-center
        justify-between
    "
    >

        <div
            className="
            flex
            items-center
            gap-2
            sm:gap-4
        "
        >

            <button
                onClick={() =>
                    setShowMenu(!showMenu)
                }
                className="
                w-10
                h-10
                rounded-xl
                bg-slate-800
                text-white
                hover:bg-slate-700
                transition
            "
            >
                ☰
            </button>

            <div
                className="
                flex
                items-center
                gap-2
                sm:gap-3
            "
            >

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
                    shrink-0
                "
                >
                    V
                </div>

                <h5
                    className="
                    text-white
                    font-bold
                    m-0
                    text-sm
                    sm:text-lg
                    leading-tight
                "
                >
                    E-Service Portal
                </h5>

            </div>

        </div>

        {/* Desktop Links */}

        <div
            className="
            hidden
            md:flex
            items-center
            gap-2
        "
        >

            <Link
                to="/customer-services"
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

        </div>

        {
            showMenu && (

                <div
                    className="
                    absolute
                    top-20
                    left-3
                    sm:left-6
                    w-60
                    bg-white
                    rounded-2xl
                    shadow-xl
                    border
                    border-slate-200
                    p-3
                "
                >

                    {/* Mobile Navigation */}

                    <div className="md:hidden">

                        <Link
                            to="/customer-services"
                            className="
                            block
                            px-4
                            py-3
                            rounded-xl
                            text-slate-700
                            hover:bg-slate-100
                        "
                        >
                            Services
                        </Link>

                        <Link
                            to="/my-requests"
                            className="
                            block
                            px-4
                            py-3
                            rounded-xl
                            text-slate-700
                            hover:bg-slate-100
                        "
                        >
                            My Requests
                        </Link>

                        <hr className="my-2" />

                    </div>

                    <Link
                        to="/customer-profile-view"
                        className="
                        block
                        px-4
                        py-3
                        rounded-xl
                        text-slate-700
                        hover:bg-slate-100
                        transition
                    "
                    >
                        Profile
                    </Link>

                    <Link
                        to="/customer-profile-edit"
                        className="
                        block
                        px-4
                        py-3
                        rounded-xl
                        text-slate-700
                        hover:bg-slate-100
                        transition
                    "
                    >
                        Edit Profile
                    </Link>

                    <hr className="my-2" />

                    <button
                        onClick={logout}
                        className="
                        w-full
                        px-4
                        py-3
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

            )
        }

    </div>

</nav>


    );

}

export default CustomerNavbar;