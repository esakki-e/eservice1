import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
function RequestDetails() {

    const { id } = useParams();

    const [request,
        setRequest] =
        useState(null);


    const [documents, setDocuments] =
        useState([]);
    const customerDocuments = documents.filter(
        doc => !doc.documentName.startsWith("RESULT_")
    );

    const resultDocuments = documents.filter(
        doc => doc.documentName.startsWith("RESULT_")
    );

    const [formResponses,
        setFormResponses] =
        useState([]);
    useEffect(() => {

        const token =
            localStorage.getItem("token");

        axios.get(
            `${API_URL}/requests/${id}`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        )
            .then(res => {
                setRequest(res.data);
            });

        axios.get(
            `${API_URL}/service-form-responses/request/${id}`
        )
            .then(res => {
                setFormResponses(res.data);
            });

        axios.get(
            `${API_URL}/documents/request/${id}`
        )
            .then(res => {
                setDocuments(res.data);
            });

    }, [id]);

    if (!request) {

        return <h3>Loading...</h3>;
    }
    return ( <div className="min-h-screen bg-slate-100 py-8 px-6">


        <div className="max-w-7xl mx-auto">

            {/* Header */}
            <div className="
            bg-white
            rounded-3xl
            border
            shadow-sm
            p-6
            mb-6
            flex
            justify-between
            items-center
        ">
                <div>
                    <p className="text-slate-500 text-sm">
                        Request #{request.id}
                    </p>

                    <h1 className="
                    text-3xl
                    font-bold
                    text-slate-800
                ">
                        {request.service?.serviceName}
                    </h1>
                </div>

                <span
                    className={`
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    font-semibold
                    ${
                        request.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-700"
                            : request.status === "ASSIGNED"
                                ? "bg-sky-100 text-sky-700"
                                : request.status === "IN_PROGRESS"
                                    ? "bg-violet-100 text-violet-700"
                                    : "bg-emerald-100 text-emerald-700"
                    }
                `}
                >
                {request.status?.replace("_", " ")}
            </span>
            </div>

            {/* Main Layout */}
            <div className="grid lg:grid-cols-3 gap-6">

                {/* Left Section */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Applicant */}
                    <div className="
                    bg-white
                    rounded-3xl
                    border
                    shadow-sm
                    p-6
                ">
                        <h3 className="
                        text-xl
                        font-bold
                        text-slate-800
                        mb-6
                    ">
                            Applicant
                        </h3>

                        <div className="
                        grid
                        md:grid-cols-2
                        gap-4
                        mb-6
                    ">
                            <div className="
                            bg-slate-50
                            border
                            rounded-2xl
                            p-4
                        ">
                                <p className="text-xs text-slate-500">
                                    Customer
                                </p>

                                <p className="font-semibold text-lg">
                                    {request.customerName}
                                </p>
                            </div>

                            <div className="
                            bg-slate-50
                            border
                            rounded-2xl
                            p-4
                        ">
                                <p className="text-xs text-slate-500">
                                    Phone
                                </p>

                                <p className="font-semibold text-lg">
                                    {request.phoneNumber}
                                </p>
                            </div>
                        </div>

                        <h4 className="
                        font-semibold
                        text-slate-800
                        mb-4
                    ">
                            Application Details
                        </h4>

                        <div className="space-y-3">

                            {formResponses.map(response => (

                                <div
                                    key={response.fieldName}
                                    className="
                                    flex
                                    justify-between
                                    border-b
                                    pb-3
                                "
                                >
                                <span className="text-slate-500">
                                    {response.fieldName}
                                </span>

                                    <span className="
                                    font-semibold
                                    text-slate-800
                                ">
                                    {response.value || "-"}
                                </span>
                                </div>

                            ))}

                        </div>
                    </div>

                    {/* Documents */}
                    <div className="
                    bg-white
                    rounded-3xl
                    border
                    shadow-sm
                    p-6
                ">
                        <h3 className="
                        text-xl
                        font-bold
                        text-slate-800
                        mb-6
                    ">
                            Uploaded Documents
                        </h3>

                        <div className="
                        grid
                        md:grid-cols-2
                        gap-4
                    ">

                            {customerDocuments.map(doc => (
                                <a
                                    key={doc.id}
                                    href={`http://localhost:8080/documents/download/${doc.id}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="
                                    flex
                                    items-center
                                    justify-between
                                    border
                                    rounded-2xl
                                    p-4
                                    hover:bg-slate-50
                                    transition
                                "
                                >
                                    <div className="
                                    flex
                                    items-center
                                    gap-3
                                ">
                                    <span className="text-xl">
                                        📄
                                    </span>

                                        <span className="
                                        font-medium
                                        text-slate-700
                                        truncate
                                    ">
{
    doc.documentName.length > 25
        ? doc.documentName.substring(0, 25) + "..."
        : doc.documentName
}                                    </span>
                                    </div>

                                    <span>
                                    ⬇
                                </span>
                                </a>


                            ))}

                        </div>
                    </div>
                    {/* Result Documents */}

                    {resultDocuments.length > 0 && (

                        <div className="
        bg-white
        rounded-3xl
        border
        shadow-sm
        p-6
    ">

                            <h3 className="
            text-xl
            font-bold
            text-slate-800
            mb-6
        ">
                                Result Documents
                            </h3>

                            <div className="
            grid
            md:grid-cols-2
            gap-4
        ">

                                {resultDocuments.map(doc => (

                                    <a
                                        key={doc.id}
                                        href={`http://localhost:8080/documents/download/${doc.id}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="
                        flex
                        items-center
                        justify-between
                        border
                        border-emerald-200
                        bg-emerald-50
                        rounded-2xl
                        p-4
                        hover:bg-emerald-100
                        transition
                    "
                                    >

                                        <div className="
                        flex
                        items-center
                        gap-3
                    ">
                        <span className="text-xl">
                            📜
                        </span>

                                            <span className="
                            font-medium
                            text-slate-700
                        ">
                            {doc.documentName}
                        </span>
                                        </div>

                                        <span>
                        ⬇
                    </span>

                                    </a>

                                ))}

                            </div>

                        </div>

                    )}
                </div>


                {/* Right Timeline */}
                <div className="
                bg-white
                rounded-3xl
                border
                shadow-sm
                p-6
                h-fit
            ">
                    <h3 className="
                    text-xl
                    font-bold
                    text-slate-800
                    mb-6
                ">
                        Status Timeline
                    </h3>

                    <div className="space-y-6">

                        <div className="flex gap-3">
                            <div className="
                            h-4
                            w-4
                            rounded-full
                            bg-green-500
                            mt-1
                        "></div>

                            <div>
                                <p className="font-semibold">
                                    Submitted
                                </p>

                                <p className="
                                text-sm
                                text-slate-500
                            ">
                                    Request Created
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div className="
                            h-4
                            w-4
                            rounded-full
                            bg-blue-500
                            mt-1
                        "></div>

                            <div>
                                <p className="font-semibold">
                                    Assigned
                                </p>

                                <p className="
                                text-sm
                                text-slate-500
                            ">
                                    Employee Assigned
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div className="
                            h-4
                            w-4
                            rounded-full
                            bg-violet-500
                            mt-1
                        "></div>

                            <div>
                                <p className="font-semibold">
                                    In Progress
                                </p>

                                <p className="
                                text-sm
                                text-slate-500
                            ">
                                    Processing Request
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div className="
                            h-4
                            w-4
                            rounded-full
                            bg-slate-300
                            mt-1
                        "></div>

                            <div>
                                <p className="font-semibold">
                                    Completed
                                </p>

                                <p className="
                                text-sm
                                text-slate-500
                            ">
                                    Final Status
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </div>

    </div>


);

}

export default RequestDetails;