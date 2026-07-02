import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "../../components/PageTransition";
import { motion } from "framer-motion";
import "./CustomerLogin.css";

function CustomerLogin() {

    const [phoneNumber, setPhoneNumber] =
        useState("");

    const [otp, setOtp] =
        useState("");

    const [otpSent, setOtpSent] =
        useState(false);

    const navigate =
        useNavigate();

    const sendOtp = () => {

        alert("Demo OTP: 123456");

        setOtpSent(true);
    };

    const verifyOtp = () => {

        if (otp !== "123456") {

            alert("Invalid OTP");
            return;
        }

        localStorage.setItem(
            "customerPhone",
            phoneNumber
        );

        localStorage.setItem(
            "phoneNumber",
            phoneNumber
        );

        navigate(
            "/customer-profile-check"
        );
    };

    return (

        <PageTransition>
            <div className="page-bg">

            <div className="customer-login-page">

                <motion.div
                    className="login-card"
                    initial={{
                        opacity: 0,
                        y: 40
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        duration: 0.6
                    }}
                >

                    <div className="login-icon">
                        🏛️
                    </div>

                    <h1 className="login-title">
                        Citizen Login
                    </h1>

                    <p className="login-subtitle">
                        Access certificates, track requests
                        and manage documents securely.
                    </p>

                    <input
                        className="phone-input"
                        placeholder="Enter Mobile Number"
                        value={phoneNumber}
                        onChange={(e) =>
                            setPhoneNumber(
                                e.target.value
                            )
                        }
                    />

                    {
                        otpSent && (

                            <input
                                className="phone-input otp-input"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) =>
                                    setOtp(
                                        e.target.value
                                    )
                                }
                            />

                        )
                    }

                    {
                        !otpSent ? (

                            <button
                                className="continue-btn"
                                onClick={sendOtp}
                            >
                                Send OTP →
                            </button>

                        ) : (

                            <button
                                className="continue-btn"
                                onClick={verifyOtp}
                            >
                                Verify OTP →
                            </button>

                        )
                    }

                    <div className="login-footer">
                        🔒 Secure OTP Authentication
                    </div>

                </motion.div>

            </div>
            </div>
        </PageTransition>
    );
}

export default CustomerLogin;