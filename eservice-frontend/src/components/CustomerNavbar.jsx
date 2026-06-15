import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CustomerNavbar() {

    const [showMenu,
        setShowMenu] =
        useState(false);

    const navigate =
        useNavigate();

    const logout = () => {

        localStorage.removeItem(
            "customerPhone"
        );

        localStorage.removeItem(
            "customerName"
        );

        localStorage.removeItem(
            "customerDob"
        );

        navigate(
            "/customer-login"
        );
    };

    return (

        <nav
            className="
            navbar
            navbar-dark
            bg-primary
            px-3
        "
        >

            <div
                className="
                d-flex
                align-items-center
            "
            >

                <button
                    className="
                    btn
                    btn-light
                    me-3
                    "
                    onClick={() =>
                        setShowMenu(
                            !showMenu
                        )
                    }
                >
                    ☰
                </button>

                <h5
                    className="text-white m-0"
                >
                    E-Service Portal
                </h5>

            </div>

            <div>

                <Link
                    to="/customer-services"
                    className="
                    text-white
                    me-3
                    text-decoration-none
                "
                >
                    Services
                </Link>

                <Link
                    to="/my-requests"
                    className="
                    text-white
                    text-decoration-none
                "
                >
                    My Requests
                </Link>

            </div>

            {
                showMenu &&
                (
                    <div
                        className="
                        position-absolute
                        bg-white
                        shadow
                        p-3
                        rounded
                    "
                        style={{
                            top: "60px",
                            left: "10px",
                            zIndex: 1000
                        }}
                    >

                        <Link
                            to="/customer-profile-view"
                            className="
                            d-block
                            mb-2
                            text-decoration-none
                        "
                        >
                            Profile
                        </Link>

                        <Link
                            to="/customer-profile-edit"
                            className="
                            d-block
                            mb-2
                            text-decoration-none
                        "
                        >
                            Edit Profile
                        </Link>

                        <button
                            className="
                            btn
                            btn-danger
                            btn-sm
                        "
                            onClick={logout}
                        >
                            Logout
                        </button>

                    </div>
                )
            }

        </nav>

    );
}

export default CustomerNavbar;