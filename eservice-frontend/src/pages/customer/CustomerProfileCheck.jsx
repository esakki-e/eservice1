import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CustomerProfile.css";


function CustomerProfileCheck() {

    const navigate =
        useNavigate();

    useEffect(() => {

        const phoneNumber =
            localStorage.getItem(
                "customerPhone"
            );

        axios.get(
            `http://localhost:8080/customer/profile/${phoneNumber}`
        )
            .then(res => {

                if (res.data && res.data.customerName) {

                    localStorage.setItem(
                        "customerName",
                        res.data.customerName
                    );

                    localStorage.setItem(
                        "customerDob",
                        res.data.dob
                    );

                    navigate("/customer-services");

                } else {

                    navigate("/customer-profile");
                }

            })
            .catch(() => {

                navigate(
                    "/customer-profile"
                );

            });

    }, []);
    return (

        <div className="profile-check-loading">

            <div className="loader"></div>

            <h2>
                Verifying Profile...
            </h2>

            <p>
                Please wait while we load your account.
            </p>

        </div>

    );}

export default CustomerProfileCheck;