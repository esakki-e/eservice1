import  { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import { API_URL } from "../../config";
import DashboardLayout
    from "../../layouts/DashboardLayout";
import Pagination from "../../components/Pagination";
function Requests() {

    const [requests, setRequests] =
        useState(
            /** @type {any[]} */ ([])
        );
    const [employees, setEmployees] = useState([]);
    const [formResponses,
        setFormResponses] =
        useState({});
    const [selectedEmployees, setSelectedEmployees] = useState({});
    const [acceptedRequests,
        setAcceptedRequests] =
        useState([]);
    const role = localStorage.getItem("role");
    const [searchName,
        setSearchName] =
        useState("");

    const [searchPhone,
        setSearchPhone] =
        useState("");
    const [debouncedSearchName, setDebouncedSearchName] =
        useState("");

    const [debouncedSearchPhone, setDebouncedSearchPhone] =
        useState("");

    const [statusFilter,
        setStatusFilter] =
        useState("ALL");
    const [dateFilter,
        setDateFilter] =
        useState("");
    const [page, setPage] = useState(0);

    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const [totalElements, setTotalElements] = useState(0);
    const [stats, setStats] = useState({
        totalRequests: 0,
        pendingRequests: 0,
        assignedRequests: 0,
        inProgressRequests: 0,
        completedRequests: 0
    });
    const [loading, setLoading] = useState(false);
            const loadFormResponses = async (
                requestId
            ) => {

                const token =
                    localStorage.getItem("token");

                const res = await axios.get(
                    `${API_URL}/service-form-responses/request/${requestId}`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                setFormResponses(prev => ({
                    ...prev,
                    [requestId]: res.data
                }));
            };
    const loadRequests = () => {

        const token =
            localStorage.getItem("token");

        const params = new URLSearchParams();

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

        if (dateFilter) {

            params.append(
                "date",
                dateFilter
            );

        }

        setLoading(true);

        axios.get(

            `${API_URL}/admin/requests?${params.toString()}`,

            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }

        )

            .then(res => {

                setRequests(res.data.content);

                setTotalPages(res.data.totalPages);

                setTotalElements(res.data.totalElements);

            })

            .finally(() => {

                setLoading(false);

            });

    };
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
    const assignEmployee = async (requestId) => {

        const employeeId =
            selectedEmployees[requestId];

        if (!employeeId) {
            alert("Select an employee");
            return;
        }

        const token =
            localStorage.getItem("token");


        await axios.post(
            `${API_URL}/employee/tasks/${requestId}/assign/${employeeId}`,
            {},
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        alert("Assigned Successfully");
        loadRequests();

    };
    useEffect(() => {
        const token =
            localStorage.getItem("token");
        loadRequests();
        axios.get(

            `${API_URL}/admin/dashboard/stats`,

            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

        )
            .then(res => {

                setStats(res.data);

            });
        axios.get(
            (`${API_URL}/employees`),
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        )
            .then(res => {
                setEmployees(res.data);
            });

    }, [

        page,

        size,

        debouncedSearchName,

        debouncedSearchPhone,

        statusFilter,

        dateFilter

    ]);

    const acceptRequest = async (requestId) => {

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

        setAcceptedRequests([
            ...acceptedRequests,
            requestId
        ]);

        alert("Request Accepted");
        loadRequests();
    };

    const totalRequests = stats.totalRequests;

    const pendingCount = stats.pendingRequests;

    const assignedCount = stats.assignedRequests;

    const inProgressCount = stats.inProgressRequests;

    const completedCount = stats.completedRequests;
    useEffect(() => {

        setPage(0);

    }, [

        searchName,

        searchPhone,

        statusFilter,

        dateFilter

    ]);
    return (<DashboardLayout>
        <>


            <div className="w-full">
                <div className="grid grid-cols-5 gap-6 mb-8">
                    <div className="bg-white rounded-3xl p-6 shadow-sm border">
                        <p className="text-slate-500">Total Requests</p>
                        <h2 className="text-3xl font-bold">{totalRequests}</h2>                    </div>

                    <div className="bg-amber-50 rounded-3xl p-6 border border-amber-200">
                        <p className="text-amber-700">Pending</p>
                        <h2 className="text-3xl font-bold">{pendingCount}</h2>
                    </div>
                    <div className="bg-purple-50 rounded-3xl p-6 border border-purple-200">
                        <p className="text-purple-700">
                            Assigned
                        </p>

                        <h2 className="text-3xl font-bold">
                            {assignedCount}
                        </h2>
                    </div>

                    <div className="bg-blue-50 rounded-3xl p-6 border border-blue-200">
                        <p className="text-blue-700">In Progress</p>
                        <h2 className="text-3xl font-bold">{inProgressCount}</h2>                    </div>

                    <div className="bg-green-50 rounded-3xl p-6 border border-green-200">
                        <p className="text-green-700">Completed</p>
                        <h2 className="text-3xl font-bold">{completedCount}</h2>                    </div>
                </div>

                <div className="mb-6">
                    <h1 className="text-4xl font-bold text-slate-800">
                        Customer Requests
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Manage and track service requests from citizens.
                    </p>
                </div>
                <div className="
bg-white
rounded-3xl
shadow-sm
border
p-6
mb-6
">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                            <input
                                className="
                w-full
                rounded-2xl
                border
                border-slate-200
                px-4
                py-3
                focus:ring-2
                focus:ring-indigo-500
                outline-none
            "
                                placeholder="Search Customer"
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                            />

                            <input
                                className="
                w-full
                rounded-2xl
                border
                border-slate-200
                px-4
                py-3
                focus:ring-2
                focus:ring-indigo-500
                outline-none
            "
                                placeholder="Search Phone"
                                value={searchPhone}
                                onChange={(e) => setSearchPhone(e.target.value)}
                            />

                            <input
                                type="date"
                                className="
                w-full
                rounded-2xl
                border
                border-slate-200
                px-4
                py-3
                focus:ring-2
                focus:ring-indigo-500
                outline-none
            "
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                            />

                            <select
                                className="
                w-full
                rounded-2xl
                border
                border-slate-200
                px-4
                py-3
                focus:ring-2
                focus:ring-indigo-500
                outline-none
            "
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="ALL">All Status</option>
                                <option value="PENDING">Pending</option>
                                <option value="ASSIGNED">Assigned</option>
                                <option value="IN_PROGRESS">In Progress</option>
                                <option value="COMPLETED">Completed</option>
                            </select>

                    </div>


                </div>
                <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
                <table className="table">

                    <thead className="bg-slate-50">
                    <tr className="text-slate-700">
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Phone</th>
                        <th>Date</th>
                        <th>Service</th>
                        <th>Status</th>

                        {role === "OWNER" && (
                            <th>Assignment</th>                        )}

                        {role === "EMPLOYEE" && (
                            <th>Action</th>
                        )}
                    </tr>
                </thead>

                    <tbody>

                    {

                        loading ?

                            <tr>

                                <td
                                    colSpan="10"
                                    className="text-center py-12"
                                >

                                    Loading Requests...

                                </td>

                            </tr>

                            :

                            requests.length===0 ?

                                <tr>

                                    <td
                                        colSpan="10"
                                        className="text-center py-12 text-slate-500"
                                    >

                                        No requests found

                                    </td>

                                </tr>

                                :

                                requests.map(request=>(

                        <tr
                            key={request.id}
                            className="
    hover:bg-slate-50
    transition-colors
    duration-200
    "
                        >
                            <td>
                                <Link
                                    to={`/request-details/${request.id}`}
                                >
                                    #{request.id}
                                </Link>
                            </td>
                            <td>{request.customerName}</td>

                            <td>{request.phoneNumber}</td>

                            <td>
                                {
                                    new Date(
                                        request.createdAt
                                    ).toLocaleString(
                                        "en-IN",
                                        {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                            hour: "numeric",
                                            minute: "2-digit",
                                            hour12: true
                                        }
                                    )
                                }                            </td>

                            <td>
                                {request.serviceName}
                            </td>
                            <td>
                                {request.status === "PENDING" && (
                                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
            Pending
        </span>
                                )}
                                {request.status === "ASSIGNED" && (
                                    <span className="
        px-3
        py-1
        rounded-full
        bg-purple-100
        text-purple-700
        text-xs
        font-semibold
    ">
        Assigned
    </span>
                                )}

                                {request.status === "IN_PROGRESS" && (
                                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
            In Progress
        </span>
                                )}

                                {request.status === "COMPLETED" && (
                                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
            Completed
        </span>
                                )}
                            </td>

                            <td>
                                {role === "OWNER" && (
                                    request.assignedEmployeeId ? (

                                            <div
                                                className="
    w-[252px]
    h-[50px]
    rounded-xl
    bg-gradient-to-r
    from-indigo-600
    to-violet-600
    shadow-sm
    flex
    items-center
    justify-center
    text-white
    font-medium
    "
                                            >
                                                👤 {request.assignedEmployeeName}
                                            </div>

                                        )


                                     : (

                                        <div className="flex items-center gap-2">

                                            <select
                                                className="
                rounded-xl
                border
                border-slate-200
                px-3
                py-2
                text-sm
                "
                                                value={
                                                    selectedEmployees[
                                                        request.id
                                                        ] || ""
                                                }
                                                onChange={(e) =>
                                                    setSelectedEmployees({
                                                        ...selectedEmployees,
                                                        [request.id]:
                                                        e.target.value
                                                    })
                                                }
                                            >
                                                <option value="">
                                                    Select
                                                </option>

                                                {employees.map(
                                                    employee => (
                                                        <option
                                                            key={employee.id}
                                                            value={employee.id}
                                                        >
                                                            {employee.name}
                                                        </option>
                                                    )
                                                )}
                                            </select>

                                            <button
                                                className="
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                px-4
                py-2
                rounded-xl
                text-sm
                font-medium
                "
                                                onClick={() =>
                                                    assignEmployee(
                                                        request.id
                                                    )
                                                }
                                            >
                                                Assign
                                            </button>

                                        </div>

                                    )
                                )}

                                {role === "EMPLOYEE" &&
                                    request.status === "ASSIGNED" && (
                                        <button
                                            className="btn btn-secondary btn-sm"
                                            disabled={
                                                acceptedRequests.includes(
                                                    request.id
                                                )
                                            }
                                            onClick={() =>
                                                acceptRequest(request.id)
                                            }
                                        >
                                            {
                                                acceptedRequests.includes(
                                                    request.id
                                                )
                                                    ? "Accepted"
                                                    : "Accept"
                                            }
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

                        onPageSizeChange={setSize}

                    />
                </div>

            </div>
        </></DashboardLayout>
    );
}

export default Requests;