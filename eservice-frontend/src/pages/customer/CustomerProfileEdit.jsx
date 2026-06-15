import {
    useState
} from "react";

import axios from "axios";

import {
    useNavigate
} from "react-router-dom";

import CustomerNavbar
    from "../../components/CustomerNavbar";

function CustomerProfileEdit() {

    const navigate =
        useNavigate();

    const [customerName,
        setCustomerName] =
        useState(
            localStorage.getItem(
                "customerName"
            )
        );

    const [dob,
        setDob] =
        useState(
            localStorage.getItem(
                "customerDob"
            )
        );

    const updateProfile =
        async () => {

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

            alert(
                "Profile Updated"
            );

            navigate(
                "/customer-profile-view"
            );
        };

    return (
        <>
            <CustomerNavbar />

            <div className="container mt-4">

                <div className="card p-4">

                    <h3>
                        Edit Profile
                    </h3>

                    <input
                        className="
                        form-control
                        mb-3
                    "
                        value={
                            customerName
                        }
                        onChange={(e) =>
                            setCustomerName(
                                e.target.value
                            )
                        }
                    />

                    <input
                        type="date"
                        className="
                        form-control
                        mb-3
                    "
                        value={dob}
                        onChange={(e) =>
                            setDob(
                                e.target.value
                            )
                        }
                    />

                    <button
                        className="
                        btn
                        btn-success
                    "
                        onClick={
                            updateProfile
                        }
                    >
                        Save
                    </button>

                </div>

            </div>
        </>
    );
}

export default CustomerProfileEdit;