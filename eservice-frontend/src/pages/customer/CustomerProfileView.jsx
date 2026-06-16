import CustomerNavbar
    from "../../components/CustomerNavbar";
import "./CustomerProfileView.css";

import { useEffect, useState }
    from "react";

import axios
    from "axios";

import {
    useNavigate
} from "react-router-dom";
function CustomerProfileView() {
    const [details,
        setDetails] =
        useState([]);

    const navigate =
        useNavigate();
    useEffect(() => {

        const phoneNumber =
            localStorage.getItem(
                "customerPhone"
            );

        axios.get(
            `http://localhost:8080/customer-form-responses/${phoneNumber}`
        )
            .then(res => {

                setDetails(
                    res.data
                );

            })
            .catch(
                console.error
            );

    }, []);
    return (
        <>
            <CustomerNavbar />

            <div className="profile-view-page">

                <div className="profile-view-card">

                    <div className="profile-header">

                        <div className="profile-avatar">
                            👤
                        </div>

                        <h2>

                            {
                                localStorage.getItem(
                                    "customerName"
                                )
                            }

                        </h2>

                        <p>
                            Citizen Profile
                        </p>

                    </div>

                    <div className="profile-section">

                        <div className="info-row">

                <span>
                    📱 Phone
                </span>

                            <span>
                    {
                        localStorage.getItem(
                            "customerPhone"
                        )
                    }
                </span>

                        </div>

                        <div className="info-row">

                <span>
                    🎂 DOB
                </span>

                            <span>
                    {
                        localStorage.getItem(
                            "customerDob"
                        )
                    }
                </span>

                        </div>

                    </div>

                    <div className="profile-section">

                        <h4>
                            Additional Information
                        </h4>

                        {
                            details.length === 0
                            &&

                            <p>
                                No additional details added yet.
                            </p>
                        }

                        {
                            details.map(
                                detail => (

                                    <div
                                        key={detail.id}
                                        className="info-row"
                                    >

                            <span>

                                {
                                    detail.field.fieldName
                                }

                            </span>

                                        <span>

                                {
                                    detail.value
                                }

                            </span>

                                    </div>

                                )
                            )
                        }

                    </div>

                    <button
                        className="edit-profile-btn"
                        onClick={() =>
                            navigate(
                                "/customer-profile-edit"
                            )
                        }
                    >
                        Edit Profile
                    </button>

                </div>

            </div>
        </>
    );
}

export default CustomerProfileView;