import  { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import { API_URL } from "../../config";
import DashboardLayout
    from "../../layouts/DashboardLayout";
import Pagination from "../../components/Pagination";
import "./Requests.css";

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
    return (

        <DashboardLayout>

            <>

                <div className="page-bg">

                    <div className="requests-page">
                        {/* Header */}

                        <div className="requests-header">

                            <div>

                                <h1 className="requests-title">
                                    Admin Dashboard
                                </h1>

                                <p className="requests-subtitle">
                                    Monitor services, requests, employees and analytics.
                                </p>

                            </div>

                        </div>
                        {/* Statistics */}

                        <div className="request-stats-grid">

                            <div className="stats-card total-card">

                                <p className="stats-label">

                                    Total Requests

                                </p>

                                <h2 className="stats-value">

                                    {totalRequests}

                                </h2>

                            </div>

                            <div className="stats-card pending-card">

                                <p className="stats-label">

                                    Pending

                                </p>

                                <h2 className="stats-value">

                                    {pendingCount}

                                </h2>

                            </div>

                            <div className="stats-card assigned-card">

                                <p className="stats-label">

                                    Assigned

                                </p>

                                <h2 className="stats-value">

                                    {assignedCount}

                                </h2>

                            </div>

                            <div className="stats-card progress-card">

                                <p className="stats-label">

                                    In Progress

                                </p>

                                <h2 className="stats-value">

                                    {inProgressCount}

                                </h2>

                            </div>

                            <div className="stats-card completed-card">

                                <p className="stats-label">

                                    Completed

                                </p>

                                <h2 className="stats-value">

                                    {completedCount}

                                </h2>

                            </div>

                        </div>

                        {/* Header */}



                        {/* Filters */}

                        <div className="filter-card">

                            <div className="filter-grid">

                                <input

                                    className="filter-input"

                                    placeholder="Search Customer"

                                    value={searchName}

                                    onChange={(e) =>
                                        setSearchName(e.target.value)
                                    }

                                />

                                <input

                                    className="filter-input"

                                    placeholder="Search Phone"

                                    value={searchPhone}

                                    onChange={(e) =>
                                        setSearchPhone(e.target.value)
                                    }

                                />

                                <input

                                    type="date"

                                    className="filter-input"

                                    value={dateFilter}

                                    onChange={(e) =>
                                        setDateFilter(e.target.value)
                                    }

                                />

                                <select

                                    className="filter-select"

                                    value={statusFilter}

                                    onChange={(e) =>
                                        setStatusFilter(e.target.value)
                                    }

                                >

                                    <option value="ALL">All Status</option>

                                    <option value="PENDING">Pending</option>

                                    <option value="ASSIGNED">Assigned</option>

                                    <option value="IN_PROGRESS">In Progress</option>

                                    <option value="COMPLETED">Completed</option>

                                </select>

                            </div>

                        </div>

                        {/* Table */}

                        <div className="table-card">

                            <table className="requests-table">

                                <thead className="table-header">

                                <tr>

                                    <th>ID</th>

                                    <th>Customer</th>

                                    <th>Phone</th>

                                    <th>Date</th>

                                    <th>Service</th>

                                    <th>Status</th>

                                    {role === "OWNER" && <th>Assignment</th>}

                                    {role === "EMPLOYEE" && <th>Action</th>}

                                </tr>

                                </thead>

                                <tbody>

                                {

                                    loading ?

                                        <tr>

                                            <td colSpan="10" className="loading-row">

                                                Loading Requests...

                                            </td>

                                        </tr>

                                        :

                                        requests.length === 0 ?

                                            <tr>

                                                <td colSpan="10" className="empty-row">

                                                    No requests found

                                                </td>

                                            </tr>

                                            :

                                            requests.map(request => (

                                                <tr

                                                    key={request.id}

                                                    className="table-row"

                                                >

                                                    <td>

                                                        <Link

                                                            to={`/request-details/${request.id}`}

                                                            className="request-link"

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

                                                        }

                                                    </td>

                                                    <td>{request.serviceName}</td>

                                                    <td>

                                                        {request.status === "PENDING" && (

                                                            <span className="status-badge pending-status">

                                                                Pending

                                                            </span>

                                                        )}

                                                        {request.status === "ASSIGNED" && (

                                                            <span className="status-badge assigned-status">

                                                                Assigned

                                                            </span>

                                                        )}

                                                        {request.status === "IN_PROGRESS" && (

                                                            <span className="status-badge progress-status">

                                                                In Progress

                                                            </span>

                                                        )}

                                                        {request.status === "COMPLETED" && (

                                                            <span className="status-badge completed-status">

                                                                Completed

                                                            </span>

                                                        )}

                                                    </td>

                                                    <td>

                                                        {role === "OWNER" && (

                                                            request.assignedEmployeeId ?

                                                                <div className="assigned-employee-card">

                                                                    👤 {request.assignedEmployeeName}

                                                                </div>

                                                                :

                                                                <div className="assignment-actions">

                                                                    <select

                                                                        className="employee-select"

                                                                        value={selectedEmployees[request.id] || ""}

                                                                        onChange={(e) =>

                                                                            setSelectedEmployees({

                                                                                ...selectedEmployees,

                                                                                [request.id]: e.target.value

                                                                            })

                                                                        }

                                                                    >

                                                                        <option value="">

                                                                            Select

                                                                        </option>

                                                                        {

                                                                            employees.map(employee => (

                                                                                <option

                                                                                    key={employee.id}

                                                                                    value={employee.id}

                                                                                >

                                                                                    {employee.name}

                                                                                </option>

                                                                            ))

                                                                        }

                                                                    </select>

                                                                    <button

                                                                        className="assign-button"

                                                                        onClick={() =>

                                                                            assignEmployee(request.id)

                                                                        }

                                                                    >

                                                                        Assign

                                                                    </button>

                                                                </div>

                                                        )}

                                                        {role === "EMPLOYEE" &&
                                                            request.status === "ASSIGNED" && (

                                                                <button

                                                                    className="accept-button"

                                                                    disabled={
                                                                        acceptedRequests.includes(request.id)
                                                                    }

                                                                    onClick={() =>
                                                                        acceptRequest(request.id)
                                                                    }

                                                                >

                                                                    {

                                                                        acceptedRequests.includes(request.id)

                                                                            ? "Accepted"

                                                                            : "Accept"

                                                                    }

                                                                </button>

                                                            )}

                                                    </td>

                                                </tr>

                                            ))

                                }

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

                </div>

            </>

        </DashboardLayout>

    );
}

export default Requests;