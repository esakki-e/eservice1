import { useEffect, useState } from "react";
import axios from "axios";
import CustomerNavbar from "../../components/CustomerNavbar.jsx";
import {Link} from "react-router-dom";

function MyRequests() {

    const [requests, setRequests] = useState([]);
    const [documents,
        setDocuments] =
        useState({});

    const [showRating,
        setShowRating] =
        useState(false);

    const [rating,
        setRating] =
        useState(5);

    const [feedback,
        setFeedback] =
        useState("");
    useEffect(() => {

        const token = localStorage.getItem("token");
        const phoneNumber =
            localStorage.getItem("customerPhone");

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
    const downloadResult = (id) => {

        window.open(
            `http://localhost:8080/documents/download/${id}`,
            "_blank"
        );

        setShowRating(true);
    };
    return (
        <>
            <CustomerNavbar />
            <div className="max-w-7xl mx-auto px-4 md:px-6">

                <div className="max-w-5xl mx-auto px-6 py-8">

                    {/* Header */}

                    <div
                        className="
    flex
    flex-col
    sm:flex-row
    gap-4
    sm:items-center
    sm:justify-between
    mb-6
"
                    >

                        <div>
                            <h1 className="
                            text-4xl
                            font-bold
                            text-slate-800
                            mb-1
                        ">
                                My Requests
                            </h1>

                            <p className="
                            text-slate-500
                        ">
                                Track the status of your applications.
                            </p>
                        </div>

                        <Link
                            to="/customer-services"
                            className="
    inline-flex
    items-center
    px-6
    py-3
    rounded-2xl
    bg-slate-800
    text-white
    font-semibold
    hover:bg-slate-700
    transition
    no-underline
"
                        >
                            New Application
                        </Link>

                    </div>

                    <div className="space-y-4">

                        {requests.map(request => (

                            <div
                                key={request.id}
                                className="
                                bg-white
                                border
                                border-slate-200
                                rounded-2xl
                                shadow-sm
                                p-5
                            "
                            >

                                {/* Top Row */}

                                <div className="
    flex
    flex-col
    sm:flex-row
    sm:justify-between
    sm:items-start
    gap-3
">

                                    <div>
                                        <div
                                            className="
    flex
    flex-col
    sm:flex-row
    gap-2
    mb-2
"
                                        >
                                        <span className="
                                            px-3
                                            py-1
                                            rounded-xl
                                            bg-slate-100
                                            text-slate-700
                                            text-sm
                                            font-semibold
                                        ">
                                            #{request.id}
                                        </span>

                                            <h3 className="
                                            text-lg
                                            font-bold
                                            text-slate-800
                                        ">
                                                {request.service?.serviceName}
                                            </h3>
                                        </div>

                                        <p className="
                                        text-slate-500
                                        text-sm
                                    ">
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
                                        </p>

                                    </div>

                                    <div
                                        className="
    flex
    flex-col
    sm:flex-row
    gap-2
    mt-3
    sm:mt-0
"
                                    >

                                        {request.status === "PENDING" && (
                                            <span className="
                                            px-3
                                            py-1.5
                                            rounded-full
                                            bg-slate-100
                                            text-slate-700
                                            text-sm
                                            font-semibold
                                        ">
                                            📝 Submitted
                                        </span>
                                        )}

                                        {request.status === "IN_PROGRESS" && (
                                            <span className="
                                            px-3
                                            py-1.5
                                            rounded-full
                                            bg-yellow-100
                                            text-yellow-800
                                            text-sm
                                            font-semibold
                                        ">
                                            ✅ Accepted
                                        </span>
                                        )}

                                        {request.status === "COMPLETED" && (
                                            <span className="
                                            px-3
                                            py-1.5
                                            rounded-full
                                            bg-emerald-100
                                            text-emerald-700
                                            text-sm
                                            font-semibold
                                        ">
                                            🎉 Completed
                                        </span>
                                        )}

                                        {request.status === "REJECTED" && (
                                            <span className="
                                            px-3
                                            py-1.5
                                            rounded-full
                                            bg-red-100
                                            text-red-700
                                            text-sm
                                            font-semibold
                                        ">
                                            ❌ Rejected
                                        </span>
                                        )}

                                        <Link
                                            to={`/request-details/${request.id}`}
                                            className="
                                            px-3
                                            py-1.5
                                            rounded-xl
                                            bg-slate-800
                                            text-white
                                            text-sm
                                            font-medium
                                            hover:bg-slate-900
                                            transition
                                        "
                                        >
                                            Details →
                                        </Link>

                                    </div>

                                </div>

                                {/* Documents */}

                                <div className="mt-3">

                                    <button
                                        onClick={() =>
                                            loadDocuments(request.id)
                                        }
                                        className="
                                        px-3
                                        py-1.5
                                        rounded-xl
                                        border
                                        border-slate-300
                                        text-slate-700
                                        text-sm
                                        hover:bg-slate-100
                                        transition
                                    "
                                    >
                                        View Documents
                                    </button>

                                    {documents[request.id] && (

                                        <div className="
                                        flex
                                        flex-wrap
                                        gap-2
                                        mt-3
                                    ">

                                            {documents[
                                                request.id
                                                ].map(doc => (

                                                <a
                                                    key={doc.id}
                                                    href={`http://localhost:8080/documents/download/${doc.id}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="
                                                    px-3
                                                    py-1.5
                                                    rounded-xl
                                                    bg-slate-100
                                                    text-slate-700
                                                    text-sm
                                                    hover:bg-slate-200
                                                    transition
                                                "
                                                >
                                                    📄 {doc.documentName}
                                                </a>


                                            ))}

                                        </div>

                                    )}

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </>
    );
}

export default MyRequests;