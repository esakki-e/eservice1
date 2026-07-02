import { useState } from "react";import { useNavigate } from "react-router-dom";

import { login } from "../../services/authService";
import "./Logincss.css";

import { API_URL } from "../../config";
function Login() {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try {

            const response =
                await login(
                    phoneNumber,
                    password
                );
            localStorage.clear();
            localStorage.setItem(
                "token",
                response.token
            );

            localStorage.setItem(
                "role",
                response.role
            );
            localStorage.setItem(
                "phoneNumber",
                phoneNumber
            );
            if (response.employeeId) {

                localStorage.setItem(
                    "employeeId",
                    response.employeeId
                );
            }
            if (response.role === "OWNER") {

                navigate("/dashboard");

            }
            else if (
                response.role === "EMPLOYEE"
            ) {

                navigate("/employee-dashboard");


            }
            else {

                navigate("/customer-services");

            }

        } catch (error) {

            alert("Login Failed");
        }
    };

    return (

        <div className="page-bg">

            <div className="login-page">

                <div className="login-container">

                    <div className="login-card">

                        {/* Icon */}

                        <div className="login-icon-wrapper">

                            <div className="login-icon">

                                🛡️

                            </div>

                        </div>

                        {/* Heading */}

                        <h1 className="login-title">

                            Staff Login

                        </h1>

                        <p className="login-subtitle">

                            Employee & Administrator Access

                        </p>

                        {/* Phone */}

                        <div className="login-input-group phone-group">

                            <input
                                type="text"
                                value={phoneNumber}
                                onChange={(e) =>
                                    setPhoneNumber(e.target.value)
                                }
                                placeholder="Enter Phone Number"
                                className="login-input"
                            />

                        </div>

                        {/* Password */}
                        <div className="login-input-group password-group">

                            <input
                                type="password"

                        value={password}
                        onChange={(e) =>
                        setPassword(e.target.value)
                    }
                        placeholder="Enter Password"
                        className="login-input"
                        />

                    </div>

                    {/* Login Button */}

                    <button
                        onClick={handleLogin}
                        className="login-button"
                    >

                        Login →

                    </button>

                    <div className="login-footer">

                        🔒 Secure Staff Authentication

                    </div>

                </div>

            </div>

        </div>

</div>

)
    ;
}

export default Login;