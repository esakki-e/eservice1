
import { useEffect, useState } from "react";


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
    const [fields, setFields] = useState([]);

    const [values, setValues] = useState({});
    useEffect(() => {

        axios.get(
            "http://localhost:8080/customer-form-fields"
        )
            .then(res => {

                setFields(res.data);

            })
            .catch(console.error);

    }, []);
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
            for (const fieldId in values) {

                await axios.post(
                    "http://localhost:8080/customer-form-responses",
                    {
                        fieldId,
                        phoneNumber,
                        value: values[fieldId]
                    }
                );
            }

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
    const handleChange = (
        fieldId,
        value
    ) => {

        setValues(prev => ({
            ...prev,
            [fieldId]: value
        }));

    };
    useEffect(() => {

        const phoneNumber =
            localStorage.getItem(
                "customerPhone"
            );

        axios.get(
            `http://localhost:8080/customer/profile/${phoneNumber}`
        )
            .then(res => {

                setCustomerName(
                    res.data.customerName
                );

                setDob(
                    res.data.dob
                );

            });

    }, []);
    useEffect(() => {

        const phoneNumber =
            localStorage.getItem(
                "customerPhone"
            );

        axios.get(
            `http://localhost:8080/customer-form-responses/${phoneNumber}`
        )
            .then(res => {

                const map = {};

                res.data.forEach(
                    item => {

                        map[
                            item.field.id
                            ] =
                            item.value;

                    }
                );

                setValues(
                    map
                );

            });

    }, []);
    return (
        <>
            <CustomerNavbar />

            <div className="container mt-4">

                <div className="card p-4">

                    <h3>
                        Edit Profile
                    </h3>

                    <div className="profile-label">
                        Full Name
                    </div>

                    <input
                        className="profile-input"
                        value={customerName}
                        onChange={(e) =>
                            setCustomerName(
                                e.target.value
                            )
                        }
                    />

                    <div className="profile-label">
                        Date of Birth
                    </div>

                    <input
                        type="date"
                        className="profile-input"
                        value={dob}
                        onChange={(e) =>
                            setDob(
                                e.target.value
                            )
                        }
                    />
                    <hr className="my-4" />

                    <h4>
                        Additional Information
                    </h4>

                    {
                        fields.map(field => (

                            <div
                                key={field.id}
                                className="mb-3"
                            >

                                <label
                                    className="profile-label"
                                >
                                    {field.fieldName}
                                </label>

                                <input
                                    type={
                                        field.fieldType === "NUMBER"
                                            ? "number"
                                            : "text"
                                    }
                                    className="profile-input"
                                    value={
                                        values[field.id]
                                        || ""
                                    }
                                    onChange={(e) =>
                                        setValues({
                                            ...values,
                                            [field.id]:
                                            e.target.value
                                        })
                                    }
                                />

                            </div>

                        ))
                    }




                    <button
                        className="save-profile-btn"
                        onClick={
                            updateProfile
                        }
                    >
                        Save Changes
                    </button>


                </div>

            </div>
        </>
    );
}

export default CustomerProfileEdit;