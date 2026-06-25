import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { API_URL } from "../../config";
function CreateRequest() {

    const [customerName, setCustomerName] =
        useState("");

    const [phoneNumber, setPhoneNumber] =
        useState("");

    const [serviceId, setServiceId] =
        useState("");

    const [services, setServices] =
        useState([]);

    useEffect(() => {

        const token =
            localStorage.getItem("token");

        axios.get(
            (`${API_URL}/admin/services`),
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        )
            .then(res => {
                setServices(res.data);
            });

    }, []);

    const submitRequest = async (e) => {

        e.preventDefault();

        const token =
            localStorage.getItem("token");

        await axios.post(
            (`${API_URL}/requests`),
            {
                customerName,
                phoneNumber,
                serviceId
            },
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        alert("Request Submitted");
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-slate-50">

                <div className="max-w-5xl mx-auto p-8">

                    {/* Header */}

                    <div className="mb-8">

                        <h1 className="
                        text-5xl
                        font-bold
                        text-slate-800
                        mb-2
                    ">
                            Create Request
                        </h1>

                        <p className="
                        text-slate-500
                        text-lg
                    ">
                            Submit a new citizen service request
                        </p>

                    </div>

                    {/* Form Card */}

                    <div className="
                    bg-white
                    rounded-3xl
                    border
                    border-slate-200
                    shadow-sm
                    p-8
                ">

                        <form
                            onSubmit={submitRequest}
                            className="space-y-6"
                        >

                            {/* Customer Name */}

                            <div>

                                <label className="
                                block
                                text-sm
                                font-semibold
                                text-slate-700
                                mb-2
                            ">
                                    Customer Name
                                </label>

                                <input
                                    value={customerName}
                                    onChange={(e) =>
                                        setCustomerName(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter customer name"
                                    className="
                                    w-full
                                    h-14
                                    px-5
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-slate-50
                                    focus:outline-none
                                    focus:ring-4
                                    focus:ring-blue-100
                                    focus:border-blue-500
                                    transition
                                "
                                />

                            </div>

                            {/* Phone */}

                            <div>

                                <label className="
                                block
                                text-sm
                                font-semibold
                                text-slate-700
                                mb-2
                            ">
                                    Phone Number
                                </label>

                                <input
                                    value={phoneNumber}
                                    onChange={(e) =>
                                        setPhoneNumber(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter phone number"
                                    className="
                                    w-full
                                    h-14
                                    px-5
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-slate-50
                                    focus:outline-none
                                    focus:ring-4
                                    focus:ring-blue-100
                                    focus:border-blue-500
                                    transition
                                "
                                />

                            </div>

                            {/* Service */}

                            <div>

                                <label className="
                                block
                                text-sm
                                font-semibold
                                text-slate-700
                                mb-2
                            ">
                                    Service
                                </label>

                                <select
                                    value={serviceId}
                                    onChange={(e) =>
                                        setServiceId(
                                            e.target.value
                                        )
                                    }
                                    className="
                                    w-full
                                    h-14
                                    px-5
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-slate-50
                                    focus:outline-none
                                    focus:ring-4
                                    focus:ring-blue-100
                                    focus:border-blue-500
                                    transition
                                "
                                >

                                    <option value="">
                                        Select Service
                                    </option>

                                    {services.map(service => (

                                        <option
                                            key={service.id}
                                            value={service.id}
                                        >
                                            {service.serviceName}
                                        </option>

                                    ))}

                                </select>

                            </div>

                            {/* Submit */}

                            <div className="pt-4">

                                <button
                                    type="submit"
                                    className="
                                    px-8
                                    h-14
                                    rounded-2xl
                                    bg-gradient-to-r
                                    from-blue-600
                                    to-indigo-600
                                    text-white
                                    font-semibold
                                    shadow-lg
                                    hover:shadow-xl
                                    hover:scale-[1.02]
                                    transition-all
                                "
                                >
                                    Submit Request →
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </div>
        </>
    );
}

export default CreateRequest;