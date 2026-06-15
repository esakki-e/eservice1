import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

                if (res.data) {

                    localStorage.setItem(
                        "customerName",
                        res.data.customerName
                    );

                    localStorage.setItem(
                        "customerDob",
                        res.data.dob
                    );

                    navigate(
                        "/customer-services"
                    );
                }

            })
            .catch(() => {

                navigate(
                    "/customer-profile"
                );

            });

    }, []);

    return <h3>Loading...</h3>;
}

export default CustomerProfileCheck;