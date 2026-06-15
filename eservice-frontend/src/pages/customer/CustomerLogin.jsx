import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomerLogin() {

    const [phoneNumber,
        setPhoneNumber] =
        useState("");

    const [otp,
        setOtp] =
        useState("");

    const [otpSent,
        setOtpSent] =
        useState(false);

    const navigate =
        useNavigate();

    const sendOtp = () => {

        alert(
            "Demo OTP: 123456"
        );

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

        navigate(
            "/customer-profile-check"
        );
    };

    return (
        <div className="container mt-5">

            <h2>
                Customer Login
            </h2>

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

            {
                !otpSent &&
                (
                    <button
                        className="btn btn-primary"
                        onClick={sendOtp}
                    >
                        Send OTP
                    </button>
                )
            }

            {
                otpSent &&
                (
                    <>
                        <input
                            className="form-control mt-3"
                            placeholder="OTP"
                            value={otp}
                            onChange={(e) =>
                                setOtp(
                                    e.target.value
                                )
                            }
                        />

                        <button
                            className="btn btn-success mt-3"
                            onClick={verifyOtp}
                        >
                            Verify OTP
                        </button>
                    </>
                )
            }

        </div>
    );
}

export default CustomerLogin;