import { Link, useNavigate } from "react-router-dom";
import "./CustomerNavbar.css";
import { useState, useRef, useEffect } from "react";
function CustomerNavbar() {

    const [showMenu,
        setShowMenu] =
        useState(false);
    const menuRef = useRef(null);
    const navigate =
        useNavigate();

    const logout = () => {

        localStorage.clear();
        setShowMenu(false);


        navigate("/");
    };
    useEffect(() => {

        function handleClickOutside(event){

            if(

                menuRef.current &&

                !menuRef.current.contains(event.target)

            ){

                setShowMenu(false);

            }

        }

        document.addEventListener(

            "pointerdown",

            handleClickOutside

        );

        return()=>{

            document.removeEventListener(

                "pointerdown",

                handleClickOutside

            );

        };

    },[]);
    return (

        <nav className="customer-navbar">

            <div className="navbar-container"
                ref={menuRef}
>
                <div className="navbar-left">

                    <button

                        onClick={() =>
                            setShowMenu(!showMenu)
                        }

                        className="menu-toggle"

                    >

                        ☰

                    </button>

                    <div className="navbar-brand">

                        <div className="brand-logo">

                            V

                        </div>

                        <h5 className="brand-title">

                            E-Service Portal

                        </h5>

                    </div>

                </div>

                {/* Desktop Navigation */}

                <div className="navbar-links">

                    <Link

                        to="/customer-services"

                        className="navbar-link"

                    >

                        Services

                    </Link>

                    <Link

                        to="/my-requests"

                        className="navbar-link"

                    >

                        My Requests

                    </Link>

                </div>

                {

                    showMenu && (

                        <div className="navbar-menu">

                            {/* Mobile Links */}

                            <div className="mobile-links">

                                <Link
                                    to="/customer-services"
                                    className="menu-link menu-services"
                                    onClick={() => setShowMenu(false)}
                                >
                                    Services
                                </Link>

                                <Link
                                    to="/my-requests"
                                    className="menu-link menu-requests"
                                    onClick={() => setShowMenu(false)}
                                >
                                    My Requests
                                </Link>

                                <hr className="menu-divider" />

                            </div>

                            <Link
                                to="/customer-profile-view"
                                className="menu-link menu-profile"
                                onClick={() => setShowMenu(false)}
                            >
                                Profile
                            </Link>
                            <Link
                                to="/customer-profile-edit"
                                className="menu-link menu-edit"
                                onClick={() => setShowMenu(false)}
                            >
                                Edit Profile
                            </Link>

                            <hr className="menu-divider" />

                            <button

                                onClick={logout}

                                className="logout-button"

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