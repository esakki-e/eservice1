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

            <div className="
            min-h-screen
            bg-gradient-to-b
            from-blue-400/70
            via-slate-50
            to-white
            py-10
            px-4
        ">

                <div className="
                max-w-4xl
                mx-auto
                space-y-6
            ">

                    {/* Profile Card */}

                    <div className="
                    bg-white
                    rounded-3xl
                    shadow-xl
                    overflow-hidden
                ">

                        <div className="
                        h-36
                        bg-gradient-to-r
                        from-indigo-600
                        via-blue-500
                        to-cyan-500
                    ">
                        </div>

                        <div className="
                        px-8
                        pb-8
                        -mt-14
                    ">

                            <div className="
                            flex
                            flex-col
                            md:flex-row
                            md:items-center
                            md:justify-between
                            gap-4
                        ">

                                <div className="
                                flex
                                items-center
                                gap-5
                            ">

                                    <div className="
                                    w-28
                                    h-28
                                    rounded-3xl
                                    bg-white
                                    shadow-lg
                                    flex
                                    items-center
                                    justify-center
                                    text-5xl
                                    border-4
                                    border-white
                                ">
                                        👤
                                    </div>

                                    <div><p></p>

                                        <h2 className="
                                        text-4xl
                                        font-bold
                                        text-slate-800
                                    ">
                                            {
                                                localStorage.getItem(
                                                    "customerName"
                                                )
                                            }
                                        </h2>

                                        <p className="
                                        text-slate-500
                                        mt-1
                                    ">
                                            Citizen Profile
                                        </p>

                                        <span className="
                                        inline-block
                                        mt-2
                                        px-3
                                        py-1
                                        rounded-full
                                        bg-green-100
                                        text-green-700
                                        text-sm
                                        font-medium
                                    ">
                                        ✓ Verified Citizen
                                    </span>

                                    </div>

                                </div>

                                <button
                                    onClick={() =>
                                        navigate(
                                            "/customer-profile-edit"
                                        )
                                    }
                                    className="
                                    px-5
                                    py-3
                                    rounded-xl
                                    bg-slate-900
                                    text-white
                                    font-medium
                                    hover:bg-slate-800
                                    transition
                                "
                                >
                                    ✏️ Edit Profile
                                </button>

                            </div>

                            <div className="
                            grid
                            md:grid-cols-2
                            gap-4
                            mt-8
                        ">

                                <div className="
                                bg-slate-50
                                border
                                rounded-2xl
                                p-5
                            ">
                                    <p className="
                                    text-sm
                                    text-slate-500
                                ">
                                        Phone Number
                                    </p>

                                    <p className="
                                    text-xl
                                    font-semibold
                                    text-slate-800
                                ">
                                        {
                                            localStorage.getItem(
                                                "customerPhone"
                                            )
                                        }
                                    </p>
                                </div>

                                <div className="
                                bg-slate-50
                                border
                                rounded-2xl
                                p-5
                            ">
                                    <p className="
                                    text-sm
                                    text-slate-500
                                ">
                                        Date Of Birth
                                    </p>

                                    <p className="
                                    text-xl
                                    font-semibold
                                    text-slate-800
                                ">
                                        {
                                            localStorage.getItem(
                                                "customerDob"
                                            )
                                        }
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Additional Information */}

                    <div className="
                    bg-white
                    rounded-3xl
                    shadow-lg
                    p-8
                ">

                        <h3 className="
                        text-2xl
                        font-bold
                        text-slate-800
                        mb-6
                    ">
                            Additional Information
                        </h3>

                        {
                            details.length === 0 && (

                                <div className="
                                text-center
                                py-8
                                text-slate-500
                            ">
                                    No additional details added yet.
                                </div>

                            )
                        }

                        <div className="space-y-4">

                            {
                                details.map(detail => (

                                    <div
                                        key={detail.id}
                                        className="
                                        flex
                                        justify-between
                                        items-center
                                        border-b
                                        border-slate-100
                                        pb-4
                                    "
                                    >

                                    <span className="
                                        text-slate-500
                                        font-medium
                                    ">
                                        {
                                            detail.field.fieldName
                                        }
                                    </span>

                                        <span className="
                                        text-slate-800
                                        font-semibold
                                    ">
                                        {
                                            detail.value
                                        }
                                    </span>

                                    </div>

                                ))
                            }

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default CustomerProfileView;