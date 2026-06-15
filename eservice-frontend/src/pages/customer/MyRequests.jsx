import { useEffect, useState } from "react";
import axios from "axios";
import CustomerNavbar from "../../components/CustomerNavbar.jsx";

function MyRequests() {

    const [requests, setRequests] = useState([]);
    const [documents,
        setDocuments] =
        useState({});

    useEffect(() => {

        const token = localStorage.getItem("token");
        const phoneNumber =
            localStorage.getItem("phoneNumber");

        console.log("Phone:", phoneNumber);
        axios.get(
            `http://localhost:8080/requests/phone/${phoneNumber}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
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
                );            })
            .catch(console.error);

    }, []);
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

        setDocuments({
            ...documents,
            [requestId]: res.data
        });
    };
    return (
        <>
            <CustomerNavbar/>

            <div className="container mt-4">

                <h2>My Requests</h2>

                <table className="table table-bordered">

                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Service</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Documents</th>
                    </tr>
                    </thead>

                    <tbody>

                    {requests.map(request => (

                        <tr key={request.id}>
                            <td>{request.id}</td>

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

    </span>

                                <div className="mt-2">

                                    <td>

                                        {request.status === "PENDING" && (
                                            <span className="badge text-bg-secondary">
            📝 Submitted
        </span>
                                        )}

                                        {request.status === "IN_PROGRESS" && (
                                            <span className="badge text-bg-warning">
            ✅ Accepted
        </span>
                                        )}

                                        {request.status === "COMPLETED" && (
                                            <span className="badge text-bg-success">
            🎉 Completed
        </span>
                                        )}

                                        {request.status === "REJECTED" && (
                                            <span className="badge text-bg-danger">
            ❌ Rejected
        </span>
                                        )}

                                    </td>
                                </div>
                            </td>

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

                                <button
                                    className="btn btn-info btn-sm"
                                    onClick={() =>
                                        loadDocuments(
                                            request.id
                                        )
                                    }
                                >
                                    View Documents
                                </button>

                                {
                                    documents[
                                        request.id
                                        ] && (

                                        <ul className="mt-2">

                                            {
                                                documents[
                                                    request.id
                                                    ].map(doc => (

                                                    <li key={doc.id}>

                                                        <a
                                                            href={
                                                                `http://localhost:8080/documents/download/${doc.id}`
                                                            }
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
                        </tr>

                    ))}

                    </tbody>

                </table>

            </div>
        </>
    );
}

export default MyRequests;