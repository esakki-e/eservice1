import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { API_URL } from "../../config";
function EmployeeRequests() {

    const [requests, setRequests] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchPhone, setSearchPhone] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    useEffect(() => {
        loadRequests();
    }, []);

    const loadRequests = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await axios.get(
                    (`${API_URL}/admin/requests`),
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            setRequests(
                [...response.data].sort(
                    (a, b) => b.id - a.id
                )
            );
        } catch (error) {

            console.error(error);
        }
    };

    const selfAssign = async (requestId) => {

        try {

            const token =
                localStorage.getItem("token");

            await axios.post(
                `${API_URL}/employee/tasks/${requestId}/self-assign`,
                {},
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            loadRequests();

        } catch (error) {

            console.error(error);
            alert("Unable to self assign");
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-slate-50 p-8">
                <div className="grid grid-cols-4 gap-6 mb-8">

                    <div className="
        bg-gradient-to-r
        from-amber-500
        to-yellow-400
        text-white
        rounded-3xl
        p-6
        shadow-lg
    ">
                        <p className="text-sm opacity-90">
                            Pending Requests
                        </p>

                        <h3 className="text-4xl font-bold mt-2">
                            {
                                requests.filter(
                                    r => r.status === "PENDING"
                                ).length
                            }
                        </h3>
                    </div>

                    <div className="
        bg-gradient-to-r
        from-sky-500
        to-blue-600
        text-white
        rounded-3xl
        p-6
        shadow-lg
    ">
                        <p className="text-sm opacity-90">
                            Assigned
                        </p>

                        <h3 className="text-4xl font-bold mt-2">
                            {
                                requests.filter(
                                    r => r.status === "ASSIGNED"
                                ).length
                            }
                        </h3>
                    </div>

                    <div className="
        bg-gradient-to-r
        from-violet-500
        to-purple-600
        text-white
        rounded-3xl
        p-6
        shadow-lg
    ">
                        <p className="text-sm opacity-90">
                            In Progress
                        </p>

                        <h3 className="text-4xl font-bold mt-2">
                            {
                                requests.filter(
                                    r => r.status === "IN_PROGRESS"
                                ).length
                            }
                        </h3>
                    </div>

                    <div className="
        bg-gradient-to-r
        from-emerald-500
        to-green-600
        text-white
        rounded-3xl
        p-6
        shadow-lg
    ">
                        <p className="text-sm opacity-90">
                            Completed
                        </p>

                        <h3 className="text-4xl font-bold mt-2">
                            {
                                requests.filter(
                                    r => r.status === "COMPLETED"
                                ).length
                            }
                        </h3>
                    </div>

                </div>

                <div className="mb-6">
                    <h1 className="text-4xl font-bold text-slate-800">
                        Available Requests
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Browse pending requests and assign them to yourself.
                    </p>
                </div>

            <div className="table-responsive">
                <div className="flex gap-4 mb-6">

                    <input
                        type="text"
                        placeholder="Search Customer"
                        value={searchName}
                        onChange={(e)=>
                            setSearchName(e.target.value)
                        }
                        className="
            flex-1
            bg-white
            border
            rounded-xl
            px-4
            py-3
            shadow-sm
        "
                    />

                    <input
                        type="text"
                        placeholder="Search Phone"
                        value={searchPhone}
                        onChange={(e)=>
                            setSearchPhone(e.target.value)
                        }
                        className="
            flex-1
            bg-white
            border
            rounded-xl
            px-4
            py-3
            shadow-sm
        "
                    />

                    <select
                        value={statusFilter}
                        onChange={(e)=>
                            setStatusFilter(e.target.value)
                        }
                        className="
            bg-white
            border
            rounded-xl
            px-4
            py-3
            shadow-sm
            min-w-[180px]
        "
                    >
                        <option value="ALL">All Status</option>
                        <option value="PENDING">Pending</option>
                        <option value="ASSIGNED">Assigned</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                    </select>

                </div>
                <div
                    className="
        bg-white
        rounded-2xl
        shadow-sm
        border
        overflow-hidden
    "
                >
                <table className="table table-hover align-middle">

                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Phone</th>
                        <th>Service</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>

                    <tbody>

                    {  requests
                    .filter(request => {

                        const nameMatch =
                        request.customerName
                        ?.toLowerCase()
                        .includes(
                        searchName.toLowerCase()
                        );

                        const phoneMatch =
                        request.phoneNumber
                        ?.includes(
                        searchPhone
                        );

                        const statusMatch =
                        statusFilter === "ALL"
                        ||
                        request.status ===
                        statusFilter;

                        return (
                        nameMatch &&
                        phoneMatch &&
                        statusMatch
                        );

                    })
                    .map(request => (
                        <tr key={request.id}>

                            <td>
                                #{request.id}
                            </td>

                            <td>
                                {request.customerName}
                            </td>

                            <td>
                                {request.phoneNumber}
                            </td>

                            <td>
                                {request.serviceName}
                            </td>


                            <td>
    <span
        className={`
            inline-flex
            items-center
            px-3
            py-1
            rounded-full
            text-xs
            font-bold

            ${
            request.status === "PENDING"
                ? "bg-yellow-100 text-yellow-800"
                : request.status === "ASSIGNED"
                    ? "bg-sky-100 text-sky-700"
                    : request.status === "IN_PROGRESS"
                        ? "bg-violet-100 text-violet-700"
                        : request.status === "COMPLETED"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-gray-100 text-gray-700"
        }
        `}
    >
        {request.status.replace("_", " ")}
    </span>
                            </td>

                            <td style={{ width: "220px" }}>

                                {request.status === "PENDING" ? (

                                    <button
                                        className="
    w-full
    bg-indigo-600
    hover:bg-indigo-700
    text-white
    font-semibold
    py-2
    rounded-xl
    transition-all
"                                        onClick={() =>
                                            selfAssign(request.id)
                                        }
                                    >
                                        Self Assign
                                    </button>

                                ) : (

                                    <button
                                        className="
    w-full
    bg-slate-700
    text-white
    font-semibold
    py-2
    rounded-xl
"
                                        disabled
                                    >
                                        Assigned To:
                                        {" "}
                                        {request.assignedEmployeeName}
                                    </button>

                                )}

                            </td>

                        </tr>

                    ))}

                    </tbody>

                </table>
                </div>

            </div>

        </div>
            </>
    );
}

export default EmployeeRequests;