import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import {Link} from "react-router-dom";

function EmployeeDashboard() {

    const [tasks, setTasks] = useState([]);
    const [documents, setDocuments] =
        useState({});
    useEffect(() => {

        const token = localStorage.getItem("token");

        const employeeId =
            localStorage.getItem(
                "employeeId"
            );

        axios.get(
            `http://localhost:8080/employee/tasks/${employeeId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then(res => {
                console.log(
                    "TASKS FROM API:",
                    res.data
                );

                setTasks(res.data);
            })
            .catch(console.error);

    }, []);

    const acceptTask = async (id) => {

        const token = localStorage.getItem("token");

        await axios.post(
            `http://localhost:8080/employee/tasks/${id}/accept`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setTasks(
            tasks.map(task =>
                task.id === id
                    ? {
                        ...task,
                        status: "ACCEPTED"
                    }
                    : task
            )
        );
    };
        const completeTask = async (id) => {

            const token = localStorage.getItem("token");

            await axios.post(
                `http://localhost:8080/employee/tasks/${id}/complete`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            window.location.reload();
        };

        const loadDocuments = async (
            requestId
        ) => {

            const token =
                localStorage.getItem("token");

            const res = await axios.get(
                `http://localhost:8080/documents/request/${requestId}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setDocuments(prev=>({
                ...prev,
                [requestId]: res.data
            }));
        };

        return (
            <>
                <Navbar/>

                <div className="container mt-4">

                    <h2>My Tasks</h2>

                    <table className="table table-bordered">

                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Customer</th>
                            <th>Service</th>
                            <th>Status</th>
                            <th>Documents</th>
                            <th>Action</th>
                        </tr>
                        </thead>

                        <tbody>

                        {tasks.map(task => (

                            <tr key={task.id}>

                                <td>
                                    <Link
                                        to={`/request-details/${task.request.id}`}
                                    >
                                        #{task.request.id}
                                    </Link>
                                </td>
                                <td>
                                    {
                                        new Date(
                                            task.request.createdAt
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
                                    }                                </td>

                                <td>
                                    {task.request.customerName}
                                </td>

                                <td>
                                    {task.request?.service?.serviceName}                            </td>
                                <td>

                                    <button
                                        className="btn btn-info btn-sm"
                                        onClick={() =>
                                            loadDocuments(
                                                task.request.id
                                            )
                                        }
                                    >
                                        View Documents
                                    </button>

                                    {
                                        documents[
                                            task.request.id
                                            ] && (

                                            <ul
                                                className="mt-2"
                                            >

                                                {
                                                    documents[
                                                        task.request.id
                                                        ].map(doc => (

                                                        <li key={doc.id}>
                                                            <a
                                                                href={`http://localhost:8080/documents/download/${doc.id}`}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                            >
                                                                {doc.documentName}
                                                            </a>
                                                        </li>

                                                    ))
                                                }

                                            </ul>

                                        )
                                    }

                                </td>
                                <td>
    <span
        className={
            task.status === "COMPLETED"
                ? "badge text-bg-success"
                : task.status === "ACCEPTED"
                    ? "badge text-bg-warning"
                    : "badge text-bg-secondary"
        }
    >
        {task.status}
    </span>
                                </td>

                                <td>
                                    <button
                                        className={
                                            task.status === "ACCEPTED"
                                                ? "btn btn-secondary btn-sm me-2"
                                                : "btn btn-success btn-sm me-2"
                                        }
                                        disabled={
                                            task.status !== "PENDING"
                                        }
                                        onClick={() =>
                                            acceptTask(task.id)
                                        }
                                    >
                                        {
                                            task.status === "ACCEPTED"
                                                ? "Accepted"
                                                : "Accept"
                                        }
                                    </button>

                                    <button
                                        className="btn btn-primary btn-sm"
                                        disabled={task.status === "COMPLETED"}
                                        onClick={() =>
                                            completeTask(task.id)
                                        }
                                    >
                                        Complete
                                    </button>

                                </td>

                            </tr>

                        ))}

                        </tbody>

                    </table>

                </div>
            </>
        );
    }

export default EmployeeDashboard;