import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";


function Requests() {

    const [requests, setRequests] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState({});
    const [acceptedRequests,
        setAcceptedRequests] =
        useState([]);
    const role = localStorage.getItem("role");
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
                setRequests(res.data);
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
    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <h2>Customer Requests</h2>

                <table className="table">

                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Phone</th>
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

                    {requests.map(request => (

                        <tr key={request.id}>

                            <td>{request.id}</td>

                            <td>{request.customerName}</td>

                            <td>{request.phoneNumber}</td>

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