import { useEffect, useState } from "react";
import axios from "axios";
import CustomerNavbar from "../../components/CustomerNavbar";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
function CustomerServices() {

    const [services, setServices] =
        useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const navigate =
        useNavigate();

    useEffect(() => {

        axios.get(
            (`${API_URL}/services`)
        )
            .then(res => {
                setServices(res.data);
            })
            .catch(console.error);

    }, []);

    return (
        <>
            <CustomerNavbar />

            <div className="min-h-screen bg-slate-50">

                <div className="max-w-7xl mx-auto px-6 py-10">

                    {/* Header */}

                    <div className="mb-10">
                        <div className="relative mb-8 max-w-md">

    <span
        className="
        absolute
        left-4
        top-1/2
        -translate-y-1/2
        text-slate-400
    "
    >
        🔍
    </span>

                            <input
                                type="text"
                                placeholder="Search certificates and services..."
                                value={searchTerm}
                                onChange={(e) =>
                                    setSearchTerm(e.target.value)
                                }
                                className="
            w-full
            h-12
            pl-12
            pr-4
            rounded-2xl
            border
            border-slate-300
            bg-white
            shadow-sm
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
        "
                            />

                        </div>
                        <h1 className="
                        text-5xl
                        font-bold
                        text-slate-800
                        mb-2
                    ">
                            Available Services
                        </h1>

                        <p className="
                        text-slate-500
                        text-lg
                    ">
                            Choose a service and begin your application process.
                        </p>

                    </div>

                    {/* Services Grid */}

                    <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    xl:grid-cols-3
                    gap-6
                ">

                        {services
                            .filter(service =>
                                service.serviceName
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase())
                            )
                            .map(service => (
                            <div
                                key={service.id}
                                className="
                                bg-white
                                border
                                border-slate-200
                                rounded-3xl
                                shadow-sm
                                p-6
                                hover:shadow-lg
                                hover:-translate-y-1
                                transition-all
                            "
                            >

                                <div className="
                                flex
                                items-center
                                justify-between
                                mb-5
                            ">

                                    <div className="
                                    w-12
                                    h-12
                                    rounded-2xl
                                    bg-slate-100
                                    flex
                                    items-center
                                    justify-center
                                    text-xl
                                ">
                                        📄
                                    </div>

                                    <span className="
                                    px-3
                                    py-1
                                    rounded-full
                                    text-xs
                                    font-semibold
                                    bg-emerald-100
                                    text-emerald-700
                                ">
                                    Active
                                </span>

                                </div>

                                <h3 className="
                                text-xl
                                font-bold
                                text-slate-800
                                mb-2
                            ">
                                    {service.serviceName}
                                </h3>

                                <p className="
                                text-slate-500
                                mb-6
                                min-h-[48px]
                            ">
                                    {service.description}
                                </p>

                                <button
                                    onClick={() =>
                                        navigate(
                                            `/service-documents/${service.id}`
                                        )
                                    }
                                    className="
                                    w-full
                                    py-3
                                    rounded-2xl
                                    bg-slate-800
                                    text-white
                                    font-semibold
                                    hover:bg-slate-900
                                    transition-all
                                "
                                >
                                    Apply Now →
                                </button>

                            </div>

                        ))}

                    </div>

                </div>

            </div>
        </>
    );
}

export default CustomerServices;