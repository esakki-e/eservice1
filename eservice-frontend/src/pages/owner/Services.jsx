import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { API_URL } from "../../config";
import { Link } from "react-router-dom";
import DashboardLayout
    from "../../layouts/DashboardLayout";

function Services() {

    const [services, setServices] = useState([]);

    useEffect(() => {

        const token = localStorage.getItem("token");

        axios.get(
            (`${API_URL}/services`),
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then(res => {
                setServices(res.data);
            })
            .catch(console.error);

    }, []);
    const deleteService = async (id) => {
        try {
            const token = localStorage.getItem("token");

            await axios.delete(
                `${API_URL}/admin/services/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setServices(
                services.filter(
                    service => service.id !== id
                )
            );

        } catch (error) {
            alert(
                "Cannot delete service because documents are attached."
            );
        }
    };
    return (
        <DashboardLayout>

            <div className="max-w-7xl mx-auto p-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-8">

                    <div>
                        <h1 className="text-4xl font-bold text-slate-800">
                            Services
                        </h1>

                        <p className="text-slate-500 mt-1">
                            Manage the services available in the portal
                        </p>
                    </div>

                    <Link
                        to="/services/create"
                        className="
                        px-5
                        py-3
                        rounded-xl
                        bg-indigo-600
                        text-white
                        font-medium
                        shadow-md
                        hover:bg-indigo-700
                        transition
                    "
                    >
                        + Create Service
                    </Link>

                </div>

                {/* Services Table */}
                <div
                    className="
                    bg-white
                    rounded-3xl
                    shadow-lg
                    border
                    border-slate-200
                    overflow-hidden
                "
                >

                    <table className="w-full">

                        <thead>

                        <tr
                            className="
                            bg-slate-50
                            text-slate-600
                            text-sm
                            uppercase
                        "
                        >
                            <th className="text-left p-4">ID</th>
                            <th className="text-left p-4">Service</th>
                            <th className="text-left p-4">Description</th>
                            <th className="text-left p-4">Status</th>
                            <th className="text-right p-4">Actions</th>
                        </tr>

                        </thead>

                        <tbody>

                        {services.map(service => (

                            <tr
                                key={service.id}
                                className="
                                border-b
                                border-slate-100
                                hover:bg-slate-50
                                transition
                            "
                            >

                                <td className="p-4 font-semibold text-slate-700">
                                    {service.id}
                                </td>

                                <td className="p-4">

                                    <div className="flex items-center gap-3">

                                        <div
                                            className="
                                            w-10
                                            h-10
                                            rounded-xl
                                            bg-indigo-100
                                            text-indigo-600
                                            flex
                                            items-center
                                            justify-center
                                        "
                                        >
                                            📄
                                        </div>

                                        <div>
                                            <p className="text-slate-800 font-semibold">
                                                {service.serviceName}
                                            </p>
                                        </div>

                                    </div>

                                </td>

                                <td className="p-4 text-slate-500">
                                    {service.description}
                                </td>

                                <td className="p-4">

                                    {service.active ? (

                                        <span
                                            className="
                                            px-3
                                            py-1
                                            rounded-full
                                            bg-green-100
                                            text-green-700
                                            text-sm
                                            font-medium
                                        "
                                        >
                                        ● Active
                                    </span>

                                    ) : (

                                        <span
                                            className="
                                            px-3
                                            py-1
                                            rounded-full
                                            bg-red-100
                                            text-red-700
                                            text-sm
                                            font-medium
                                        "
                                        >
                                        ● Inactive
                                    </span>

                                    )}

                                </td>

                                <td className="p-4">

                                    <div
                                        className="
                                        flex
                                        justify-end
                                        gap-2
                                    "
                                    >

                                        <Link
                                            to={`/services/edit/${service.id}`}
                                            className="
                                            w-10
                                            h-10
                                            rounded-xl
                                            bg-amber-100
                                            text-amber-700
                                            flex
                                            items-center
                                            justify-center
                                            hover:bg-amber-200
                                            transition
                                        "
                                            title="Edit"
                                        >
                                            ✏️
                                        </Link>

                                        <Link
                                            to={`/service-fields/${service.id}`}
                                            className="
                                            w-10
                                            h-10
                                            rounded-xl
                                            bg-emerald-100
                                            text-emerald-700
                                            flex
                                            items-center
                                            justify-center
                                            hover:bg-emerald-200
                                            transition
                                        "
                                            title="Manage Fields"
                                        >
                                            ⚙️
                                        </Link>

                                        <Link
                                            to={`/service-documents/${service.id}`}
                                            className="
                                            w-10
                                            h-10
                                            rounded-xl
                                            bg-blue-100
                                            text-blue-700
                                            flex
                                            items-center
                                            justify-center
                                            hover:bg-blue-200
                                            transition
                                        "
                                            title="Apply"
                                        >
                                            ↗
                                        </Link>

                                        <button
                                            onClick={() =>
                                                deleteService(service.id)
                                            }
                                            className="
                                            w-10
                                            h-10
                                            rounded-xl
                                            bg-red-100
                                            text-red-700
                                            flex
                                            items-center
                                            justify-center
                                            hover:bg-red-200
                                            transition
                                        "
                                            title="Delete"
                                        >
                                            🗑️
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </DashboardLayout>
    );
}

export default Services;