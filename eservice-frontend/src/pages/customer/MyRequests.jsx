import { useEffect, useState } from "react";
import axios from "axios";
import CustomerNavbar from "../../components/CustomerNavbar";
import {Link} from "react-router-dom";
import { API_URL } from "../../config";
import Pagination from "../../components/Pagination";
function MyRequests() {

    const [requests, setRequests] = useState([]);
    const [documents,
        setDocuments] =
        useState({});
    const [showFeedback, setShowFeedback] = useState(false);

    const [selectedRequest, setSelectedRequest] = useState(null);

    const [rating, setRating] = useState(5);

    const [comment, setComment] = useState("");
    const [page,setPage]=useState(0);

    const [size,setSize]=useState(10);

    const [totalPages,setTotalPages]=useState(0);

    const [totalElements,setTotalElements]=useState(0);

    const [loading,setLoading]=useState(false);
    useEffect(() => {

        const token = localStorage.getItem("token");
        const phoneNumber =
            localStorage.getItem("customerPhone");

        setLoading(true);

        axios.get(

            `${API_URL}/requests/phone/${phoneNumber}?page=${page}&size=${size}`,

            {

                headers:{

                    Authorization:`Bearer ${token}`

                }

            }

        )

            .then(res=>{

                setRequests(

                    res.data.content

                );

                setTotalPages(

                    res.data.totalPages

                );

                setTotalElements(

                    res.data.totalElements

                );

            })


            .catch(console.error)

             .finally(()=>{

            setLoading(false);

        });

    }, [

        page,

        size

    ]);
    const loadDocuments = async (
        requestId
    ) => {

        const token =
            localStorage.getItem("token");

        const res = await axios.get(
            `${API_URL}/documents/request/${requestId}`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        setDocuments(prev => ({

            ...prev,

            [requestId]: res.data

        }));
    };
    const submitFeedback = async () => {

        try {

            await axios.post(
                `${API_URL}/feedback`,
                {
                    requestId: selectedRequest.id,
                    rating,
                    comment
                }
            );

            alert("Feedback submitted!");

            setShowFeedback(false);

            setRating(5);

            setComment("");
            setSelectedRequest(null);

        }

        catch (err) {

            alert(
                err.response?.data ||
                "Unable to submit feedback."
            );

        }

    };
    if (loading) {

        return (

            <>

                <CustomerNavbar/>

                <div className="flex justify-center items-center h-96">

                    Loading...

                </div>

            </>

        );

    }
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

                        {

                            requests.length===0 ?

                                (

                                    <div className="

text-center

py-16

text-slate-500

">

                                        No requests found.

                                    </div>

                                )

                                :

                                requests.map(request => (

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
                                                {request.serviceName}
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

                                            <>

                                                <button
                                                    className="
                mt-4
                px-5
                py-2
                rounded-xl
                bg-yellow-500
                text-white
                font-semibold
                hover:bg-yellow-600
            "
                                                    onClick={() => {

                                                        setSelectedRequest(request);

                                                        setShowFeedback(true);

                                                    }}
                                                >

                                                    ⭐ Rate Service

                                                </button>

                                                <span
                                                    className="
                px-3
                py-1.5
                rounded-full
                bg-emerald-100
                text-emerald-700
                text-sm
                font-semibold
            "
                                                >

            🎉 Completed

        </span>

                                            </>

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
                                                    href={`${API_URL}/documents/download/${doc.id}`}
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
                                                    📄 {doc.name}
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
            {
                showFeedback &&

                <div
                    className="
fixed
inset-0
bg-black/50
flex
items-center
justify-center
z-50
"
                >

                    <div
                        className="
bg-white
rounded-3xl
p-8
w-[500px]
"
                    >

                        <h2
                            className="
text-2xl
font-bold
mb-6
"
                        >

                            Rate Service

                        </h2>

                        <div className="flex gap-3 mb-6">

                            {

                                [1,2,3,4,5].map(star=>

                                    <button

                                        key={star}

                                        onClick={()=>
                                            setRating(star)
                                        }

                                        className="
text-4xl
"

                                    >

                                        {

                                            star<=rating

                                                ?

                                                "⭐"

                                                :

                                                "☆"

                                        }

                                    </button>

                                )

                            }

                        </div>

                        <textarea

                            value={comment}

                            onChange={(e)=>
                                setComment(e.target.value)
                            }

                            rows={5}

                            placeholder="Write your feedback..."

                            className="
w-full
border
rounded-xl
p-4
mb-6
"

                        />

                        <div className="flex justify-end gap-4">

                            <button

                                onClick={() => {

                                    setShowFeedback(false);

                                    setComment("");

                                    setRating(5);

                                    setSelectedRequest(null);

                                }}

                                className="
px-6
py-2
border
rounded-xl
"

                            >

                                Cancel

                            </button>

                            <button

                                disabled={comment.trim() === ""}

                                onClick={submitFeedback}

                                className="
px-6
py-2
bg-blue-600
text-white
rounded-xl
disabled:opacity-50
disabled:cursor-not-allowed
"

                            >

                                Submit

                            </button>

                        </div>

                    </div>


                </div>

            }
            <Pagination

                page={page}

                totalPages={totalPages}

                totalElements={totalElements}

                pageSize={size}

                onPageChange={setPage}

                onPageSizeChange={(newSize)=>{

                    setSize(newSize);

                    setPage(0);

                }}

            />

        </>
    );
}

export default MyRequests;