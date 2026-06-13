import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";

function MyRequests() {

    const [requests, setRequests] = useState([]);

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
                setRequests(res.data);
            })
            .catch(console.error);

    }, []);

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <h2>My Requests</h2>

                <table className="table table-bordered">

                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Service</th>
                        <th>Status</th>
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
                {request.status}
            </span>
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