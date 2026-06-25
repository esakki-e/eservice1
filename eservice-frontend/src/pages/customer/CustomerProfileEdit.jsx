
import { useEffect, useState } from "react";
import { API_URL } from "../../config";

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
            (`${API_URL}/customer-form-fields`)
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
                (`${API_URL}/customer/profile`),
                {
                    phoneNumber,
                    customerName,
                    dob
                }
            );
            for (const fieldId in values) {

                await axios.post(
                    (`${API_URL}/customer-form-responses`),
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
            `${API_URL}/customer/profile/${phoneNumber}`
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
            `${API_URL}/customer-form-responses/${phoneNumber}`
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

            <div className="
            min-h-screen
            bg-gradient-to-b
            from-blue-300
            via-slate-50
            to-blue-100
            py-10
            px-4
        ">

                <div className="
                max-w-4xl
                mx-auto
            ">

                    {/* Header */}

                    <div className="mb-6">

                        <h2 className="
                        text-4xl
                        font-bold
                        text-slate-800
                    ">
                            Edit Profile
                        </h2>

                        <p className="
                        text-slate-600
                        mt-2
                    ">
                            Keep your details up to date before applying for services.
                        </p>

                    </div>

                    {/* Mobile Verified */}

                    <div className="
                    bg-green-50
                    border
                    border-green-200
                    rounded-3xl
                    p-5
                    mb-6
                    shadow-sm
                ">

                        <div className="
                        flex
                        items-center
                        gap-3
                    ">

                            <div className="
                            w-10
                            h-10
                            rounded-full
                            bg-green-100
                            flex
                            items-center
                            justify-center
                            text-green-600
                            font-bold
                        ">
                                ✓
                            </div>

                            <div>

                                <p className="
                                text-green-700
                                font-semibold
                            ">
                                    Mobile Verified
                                </p>

                                <p className="
                                text-slate-800
                                font-medium
                            ">
                                    {
                                        localStorage.getItem(
                                            "customerPhone"
                                        )
                                    }
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* Basic Details */}

                    <div className="
                    bg-white
                    rounded-3xl
                    border
                    shadow-sm
                    p-6
                    mb-6
                ">

                        <h3 className="
                        text-xl
                        font-bold
                        text-slate-800
                        mb-6
                    ">
                            Basic Details
                        </h3>

                        <div className="
                        grid
                        md:grid-cols-2
                        gap-5
                    ">

                            <div>

                                <label className="
                                block
                                mb-2
                                text-slate-700
                                font-medium
                            ">
                                    Full Name
                                </label>

                                <input
                                    className="
                                    w-full
                                    px-4
                                    py-3
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-slate-50
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                "
                                    value={customerName}
                                    onChange={(e) =>
                                        setCustomerName(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                            <div>

                                <label className="
                                block
                                mb-2
                                text-slate-700
                                font-medium
                            ">
                                    Date of Birth
                                </label>

                                <input
                                    type="date"
                                    className="
                                    w-full
                                    px-4
                                    py-3
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-slate-50
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                "
                                    value={dob}
                                    onChange={(e) =>
                                        setDob(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                        </div>

                    </div>

                    {/* Additional Information */}

                    <div className="
                    bg-white
                    rounded-3xl
                    border
                    shadow-sm
                    p-6
                    mb-6
                ">

                        <h3 className="
                        text-xl
                        font-bold
                        text-slate-800
                        mb-6
                    ">
                            Additional Information
                        </h3>

                        <div className="
                        grid
                        md:grid-cols-2
                        gap-5
                    ">

                            {fields.map(field => (

                                <div key={field.id}>

                                    <label className="
                                    block
                                    mb-2
                                    text-slate-700
                                    font-medium
                                ">
                                        {field.fieldName}
                                    </label>

                                    <input
                                        type={
                                            field.fieldType === "NUMBER"
                                                ? "number"
                                                : "text"
                                        }
                                        className="
                                        w-full
                                        px-4
                                        py-3
                                        rounded-2xl
                                        border
                                        border-slate-200
                                        bg-slate-50
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-blue-500
                                    "
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

                            ))}

                        </div>

                    </div>

                    {/* Save Button */}

                    <button
                        onClick={updateProfile}
                        className="
                        w-full
                        py-4
                        rounded-3xl
                        font-semibold
                        text-white
                        bg-gradient-to-r
                        from-blue-600
                        to-indigo-600
                        shadow-lg
                        hover:from-blue-700
                        hover:to-indigo-700
                        transition
                    "
                    >
                        💾 Save Changes
                    </button>

                </div>

            </div>
        </>
    );
}

export default CustomerProfileEdit;