import { useState } from "react";
import { login } from "../../services/authService";
import { API_URL } from "../../config";
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
        <div
            className="
        min-h-screen
        bg-gradient-to-br
        from-slate-50
        via-white
        to-blue-100
        flex
        items-center
        justify-center
        px-4
    "
        >
            <div className="w-full max-w-md">

                <div
                    className="
                bg-white/95
                backdrop-blur-md
                rounded-[32px]
                border
                border-slate-100
                p-10
                shadow-[0_20px_60px_rgba(59,130,246,0.15)]
            "
                >

                    {/* Icon */}

                    <div className="flex justify-center mb-6">

                        <div
                            className="
                        w-20
                        h-20
                        rounded-3xl
                        bg-gradient-to-br
                        from-blue-100
                        to-indigo-100
                        flex
                        items-center
                        justify-center
                        text-4xl
                        shadow-lg
                    "
                        >
                            🛡️
                        </div>

                    </div>

                    {/* Heading */}

                    <h1
                        className="
                    text-5xl
                    font-extrabold
                    text-center
                    text-slate-900
                    mb-3
                "
                    >
                        Staff Login
                    </h1>

                    <p
                        className="
                    text-center
                    text-slate-500
                    text-lg
                    mb-8
                "
                    >
                        Employee & Administrator Access
                    </p>

                    {/* Phone */}

                    <div className="mb-4">

                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) =>
                                setPhoneNumber(
                                    e.target.value
                                )
                            }
                            placeholder="Enter Phone Number"
                            className="
                            w-full
                            h-14
                            px-5
                            rounded-2xl
                            border
                            border-slate-200
                            bg-white
                            text-slate-800
                            placeholder-slate-400
                            focus:outline-none
                            focus:ring-4
                            focus:ring-blue-100
                        "
                        />

                    </div>

                    {/* Password */}

                    <div className="mb-6">

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            placeholder="Enter Password"
                            className="
                            w-full
                            h-14
                            px-5
                            rounded-2xl
                            border
                            border-slate-200
                            bg-white
                            text-slate-800
                            placeholder-slate-400
                            focus:outline-none
                            focus:ring-4
                            focus:ring-blue-100
                        "
                        />

                    </div>

                    {/* Login Button */}

                    <button
                        onClick={handleLogin}
                        className="
                        w-full
                        h-14
                        rounded-2xl
                        text-lg
                        font-semibold
                        text-white
                        bg-gradient-to-r
                        from-blue-600
                        via-blue-500
                        to-indigo-600
                        shadow-lg
                        hover:shadow-xl
                        hover:scale-[1.02]
                        transition-all
                        duration-300
                    "
                    >
                        Login →
                    </button>

                    <div
                        className="
                    text-center
                    text-slate-500
                    mt-6
                "
                    >
                        🔒 Secure Staff Authentication
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;