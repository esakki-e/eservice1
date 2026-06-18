import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function RequestDetails() {

    const { id } = useParams();

    const [request,
        setRequest] =
        useState(null);


    const [documents, setDocuments] =
        useState([]);

    const [formResponses,
        setFormResponses] =
        useState([]);
    useEffect(() => {

        const token =
            localStorage.getItem("token");

        axios.get(
            `http://localhost:8080/requests/${id}`,
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
            `http://localhost:8080/service-form-responses/request/${id}`
        )
            .then(res => {
                setFormResponses(res.data);
            });

        axios.get(
            `http://localhost:8080/documents/request/${id}`
        )
            .then(res => {
                setDocuments(res.data);
            });

    }, [id]);

    if (!request) {

        return <h3>Loading...</h3>;
    }

    return (

        <div className="container mt-4">

            <h2>
                Request Details
            </h2>

            <hr />

            <h5>
                Request ID:
                {" "}
                {request.id}
            </h5>

            <h5>
                Customer:
                {" "}
                {request.customerName}
            </h5>

            <h5>
                Phone:
                {" "}
                {request.phoneNumber}
            </h5>

            <h5>
                Service:
                {" "}
                {request.service?.serviceName}
            </h5>

            <h5>
                Status:
                {" "}
                {request.status}
            </h5>
            <hr />

            <h4>
                Application Details
            </h4>

            <ul>

                {
                    formResponses.map(
                        response => (

                            <li
                                key={
                                    response.fieldName
                                }
                            >

                                <strong>
                                    {
                                        response.fieldName
                                    }
                                </strong>

                                {" : "}

                                {
                                    response.value
                                }

                            </li>

                        )
                    )
                }

            </ul>
            <hr />

            <h4>
                Uploaded Documents
            </h4>

            <ul>

                {
                    documents.map(doc => (

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

        </div>

    );
}

export default RequestDetails;