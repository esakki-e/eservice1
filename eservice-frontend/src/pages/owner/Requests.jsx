import  { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import {Link} from "react-router-dom";


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

    const [statusFilter,
        setStatusFilter] =
        useState("ALL");
    const [dateFilter,
        setDateFilter] =
        useState("");
    const loadFormResponses = async (
        requestId
    ) => {

        const token =
            localStorage.getItem("token");

        const res = await axios.get(
            `http://localhost:8080/service-form-responses/request/${requestId}`,
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
            `http://localhost:8080/employee/tasks/${requestId}/assign/${employeeId}`,
            {},
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        alert("Assigned Successfully");
    };
    useEffect(() => {

        const token =
            localStorage.getItem("token");

        axios.get(
            "http://localhost:8080/admin/requests",
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        )
            .then(res => {
                setRequests(
                    res.data.sort(
                        (a, b) =>
                            new Date(b.createdAt)
                            -
                            new Date(a.createdAt)
                    )
                );
            });
        axios.get(
            "http://localhost:8080/employees",
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

    }, []);


    const acceptRequest = async (requestId) => {

        const token =
            localStorage.getItem("token");

        await axios.post(
            `http://localhost:8080/employee/tasks/${requestId}/self-assign`,
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
    };
    const filteredRequests =
        requests.filter(request => {

            const matchesName =
                request.customerName
                    .toLowerCase()
                    .includes(
                        searchName
                            .toLowerCase()
                    );

            const matchesPhone =
                request.phoneNumber
                    .includes(
                        searchPhone
                    );

            const matchesStatus =
                statusFilter === "ALL"
                ||
                request.status ===
                statusFilter;

            const matchesDate =
                !dateFilter
                ||
                request.createdAt
                    ?.substring(0, 10)
                === dateFilter;

            return matchesName
                &&
                matchesPhone
                &&
                matchesStatus
                &&
                matchesDate;
        });

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <h2>Customer Requests</h2>

                <div className="row mb-3">

                    <div className="col-md-3">

                        <input
                            className="form-control"
                            placeholder="Search Customer"
                            value={searchName}
                            onChange={(e) =>
                                setSearchName(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                    <div className="col-md-3">

                        <input
                            className="form-control"
                            placeholder="Search Phone"
                            value={searchPhone}
                            onChange={(e) =>
                                setSearchPhone(
                                    e.target.value
                                )
                            }
                        />

                    </div>
                    <div className="col-md-3">

                        <input
                            type="date"
                            className="form-control"
                            value={dateFilter}
                            onChange={(e) =>
                                setDateFilter(
                                    e.target.value
                                )
                            }
                        />

                    </div>
                    <div className="col-md-3">

                        <select
                            className="form-select"
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(
                                    e.target.value
                                )
                            }
                        >

                            <option value="ALL">
                                All Status
                            </option>

                            <option value="PENDING">
                                Pending
                            </option>

                            <option value="IN_PROGRESS">
                                In Progress
                            </option>

                            <option value="COMPLETED">
                                Completed
                            </option>


                        </select>

                    </div>

                </div>

                <table className="table">

                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Phone</th>
                        <th>Date</th>
                        <th>Service</th>
                        <th>Status</th>

                        {role === "OWNER" && (
                            <th>Assign</th>
                        )}

                        {role === "EMPLOYEE" && (
                            <th>Action</th>
                        )}
                    </tr>
                </thead>

                    <tbody>

                    {filteredRequests.map(request => (
                        <tr key={request.id}>

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
                                {request.service?.serviceName}
                            </td>
                            <td>
                            <span
                                className={
                                    request.status === "COMPLETED"
                                        ? "badge text-bg-success"
                                        : request.status === "IN_PROGRESS"
                                            ? "badge text-bg-warning"
                                            : request.status === "REJECTED"
                                                ? "badge text-bg-danger"
                                                : "badge text-bg-secondary"
                                }
                            >
    {request.status}
</span>
                            </td>

                            <td>

                                {role === "OWNER" && (
                                    <>
                                        <select
                                            value={
                                                selectedEmployees[request.id] || ""
                                            }
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

                                            {employees.map(employee => (
                                                <option
                                                    key={employee.id}
                                                    value={employee.id}
                                                >
                                                    {employee.name}
                                                </option>
                                            ))}
                                        </select>

                                        <button
                                            className="btn btn-primary btn-sm ms-2"
                                            onClick={() =>
                                                assignEmployee(request.id)
                                            }
                                        >
                                            Assign
                                        </button>
                                    </>
                                )}

                                {role === "EMPLOYEE" &&
                                    request.status === "PENDING" && (
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

            </div>
        </>
    );
}

export default Requests;