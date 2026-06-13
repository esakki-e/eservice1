import { useState } from "react";
import { login } from "../../services/authService";

function Login() {

    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try {

            const response =
                await login(
                    phoneNumber,
                    password
                );
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

                window.location.href =
                    "/dashboard";

            }
            else if (
                response.role === "EMPLOYEE"
            ) {

                window.location.href =
                    "/employee-dashboard";

            }
            else {

                window.location.href =
                    "/customer-services";

            }

        } catch (error) {

            alert("Login Failed");
        }
    };

    return (
        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-4">

                    <div className="card p-4">

                        <h3 className="text-center mb-4">
                            E-Service Portal Login
                        </h3>

                        <input
                            className="form-control mb-3"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={(e) =>
                                setPhoneNumber(
                                    e.target.value
                                )
                            }
                        />

                        <input
                            type="password"
                            className="form-control mb-3"
                            placeholder="Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                        />

                        <button
                            className="btn btn-primary w-100"
                            onClick={handleLogin}
                        >
                            Login
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;