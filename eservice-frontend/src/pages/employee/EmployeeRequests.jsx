import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { API_URL } from "../../config";
import Pagination from "../../components/Pagination";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
function EmployeeRequests() {

    const [requests, setRequests] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchPhone, setSearchPhone] = useState("");
    const [debouncedSearchName, setDebouncedSearchName] =

        useState("");

    const [debouncedSearchPhone, setDebouncedSearchPhone] =

        useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [page, setPage] = useState(0);

    const [size, setSize] = useState(10);

    const [totalPages, setTotalPages] = useState(0);

    const [totalElements, setTotalElements] = useState(0);

    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState({

        totalRequests: 0,

        pendingRequests: 0,

        assignedRequests: 0,

        inProgressRequests: 0,

        completedRequests: 0

    });
    useEffect(() => {
        loadRequests();
        const token =
            localStorage.getItem("token");

        axios.get(

            `${API_URL}/admin/dashboard/stats`,

            {

                headers: {

                    Authorization:
                        `Bearer ${token}`

                }

            }

        )

            .then(res => {

                setStats(res.data);

            });
    }, [

        page,

        size,

        debouncedSearchName,

        debouncedSearchPhone,

        statusFilter

    ]);
    useEffect(() => {

        const timer = setTimeout(() => {

            setDebouncedSearchName(searchName);

            setDebouncedSearchPhone(searchPhone);

        }, 400);

        return () => clearTimeout(timer);

    }, [

        searchName,

        searchPhone

    ]);
    const loadRequests = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const params =
                new URLSearchParams();

            params.append("page", page);

            params.append("size", size);

            if (debouncedSearchName.trim()) {

                params.append(
                    "search",
                    debouncedSearchName.trim()
                );

            }

            if (debouncedSearchPhone.trim()) {

                params.append(
                    "phone",
                    debouncedSearchPhone.trim()
                );

            }

            if (statusFilter !== "ALL") {

                params.append(
                    "status",
                    statusFilter
                );

            }

            setLoading(true);

            const response =

                await axios.get(

                    `${API_URL}/admin/requests?${params.toString()}`,

                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }

                );

            setRequests(
                response.data.content
            );

            setTotalPages(
                response.data.totalPages
            );

            setTotalElements(
                response.data.totalElements
            );

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

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
            alert("Request assigned successfully");
        } catch (error) {

            alert(

                error.response?.data

                ||

                "Unable to self assign"

            );
            loadRequests();
        }
    };
    useEffect(() => {

        setPage(0);

    }, [

        searchName,

        searchPhone,

        statusFilter

    ]);
    if (loading) {

        return (
            <DashboardLayout>

                <div className="flex justify-center items-center h-96">

                    <div className="animate-spin
                    rounded-full
                    h-12
                    w-12
                    border-4
                    border-indigo-500
                    border-t-transparent">
                    </div>

                </div>
            </DashboardLayout>
        );

    }

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
                                stats.pendingRequests
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
                                stats.assignedRequests
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
                                stats.inProgressRequests
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
                                stats.completedRequests
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

                    {

                        requests.length === 0 ?

                            (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="text-center py-10 text-slate-500"
                                    >

                                        No requests found.

                                    </td>

                                </tr>

                            )

                            :
                    requests.map(request => (
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
{request.status
    ? request.status.replaceAll("_", " ")
    : "-"
}    </span>
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
                    <Pagination

                        page={page}

                        totalPages={totalPages}

                        totalElements={totalElements}

                        pageSize={size}

                        onPageChange={setPage}

                        onPageSizeChange={(newSize) => {

                            setSize(newSize);

                            setPage(0);

                        }}

                    />
                </div>

            </div>

        </div>
            </>
    );
}

export default EmployeeRequests;