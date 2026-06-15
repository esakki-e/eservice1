import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CustomerProfile() {

    const [customerName,
        setCustomerName] =
        useState("");

    const [dob,
        setDob] =
        useState("");

    const navigate =
        useNavigate();

    const saveProfile = async () => {

        const phoneNumber =
            localStorage.getItem(
                "customerPhone"
            );

        await axios.post(
            "http://localhost:8080/customer/profile",
            {
                phoneNumber,
                customerName,
                dob
            }
        );

        localStorage.setItem(
            "customerName",
            customerName
        );

        localStorage.setItem(
            "customerDob",
            dob
        );

        navigate(
            "/customer-services"
        );
    };

    return (

        <div className="container mt-5">
            <div className="row justify-content-center">

                <div className="col-lg-6">

                    <div className="profile-card">
            <h2>
                Complete Profile
            </h2>

            <input
                className="form-control mb-3"
                placeholder="Full Name"
                value={customerName}
                onChange={(e) =>
                    setCustomerName(
                        e.target.value
                    )
                }
            />

            <input
                type="date"
                className="form-control mb-3"
                value={dob}
                onChange={(e) =>
                    setDob(
                        e.target.value
                    )
                }
            />

            <button
                className="btn btn-success"
                onClick={saveProfile}
            >
                Save Profile
            </button>

        </div>
                </div></div></div>
    );
}

export default CustomerProfile;