import {
    useParams,
    useNavigate
} from "react-router-dom";
import CustomerNavbar from "../../components/CustomerNavbar";
//import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


function ServiceDocuments() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [customerName, setCustomerName] =
        useState("");

    const [phoneNumber, setPhoneNumber] =
        useState(
            localStorage.getItem("customerPhone")
            || ""
        );
    const [dob,
        setDob] =
        useState("");

    const [requiredDocuments,
        setRequiredDocuments] =
        useState([]);

    const [uploadedFiles,
        setUploadedFiles] =
        useState({});

    const [fields, setFields] =
        useState([]);

    const [fieldValues, setFieldValues] =
        useState({});

    const [autoFillData,
        setAutoFillData] =
        useState({});

    const submitRequest = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await axios.post(
                    "http://localhost:8080/requests",
                    {
                        customerName,
                        phoneNumber:localStorage.getItem("customerPhone"),
                        serviceId: id
                    },
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );
            const requestId =
                response.data.id;

            const formResponses =
                fields.map(field => ({

                    requestId,

                    fieldId: field.id,

                    value:
                        fieldValues[field.id] || ""

                }));
            await axios.post(
                "http://localhost:8080/service-form-responses",
                formResponses
            );
           // console.log(response.data);
            const uploadFile = async (file) => {

                if (!file) return;

                const formData = new FormData();

                formData.append(
                    "file",
                    file
                );

                formData.append(
                    "requestId",
                    requestId
                );

                await axios.post(
                    "http://localhost:8080/documents/upload",
                    formData,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                            "Content-Type":
                                "multipart/form-data"
                        }
                    }
                );
            };

            for (
                const file
                of Object.values(
                uploadedFiles
            )
                ) {

                await uploadFile(file);

            }

            alert(
                "Application Submitted Successfully"
            );

            navigate(
                "/my-requests"
            );
        } catch (error) {

            console.error(error);

            alert(
                "Request Submission Failed"
            );
        }
    };
    useEffect(() => {

        const token =
            localStorage.getItem("token");

        axios.get(
            `http://localhost:8080/services/${id}/documents`,

            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        )
            .then(res => {

                setRequiredDocuments(
                    res.data
                );

            })
            .catch(console.error);

    }, [id]);
    useEffect(() => {

        axios.get(
            `http://localhost:8080/service-form-fields/service/${id}/active`
        )
            .then(res => {

                setFields(
                    res.data
                );

            })
            .catch(console.error);

    }, [id]);
    useEffect(() => {

        setCustomerName(
            localStorage.getItem(
                "customerName"
            ) || ""
        );

        setDob(
            localStorage.getItem(
                "customerDob"
            ) || ""
        );

    }, []);
    useEffect(() => {

        const phoneNumber =
            localStorage.getItem(
                "customerPhone"
            );

        axios.get(
            `http://localhost:8080/customer-form-responses/autofill/${phoneNumber}`
        )
            .then(res => {

                setAutoFillData(
                    res.data
                );

            });

    }, []);
    return (
        <>
            <CustomerNavbar/>
            <div className="container mt-4">

                <div className="card p-4 shadow">

                    <h2 className="mb-3">
                        Service Application
                    </h2>

                    <h5 className="mb-4">
                        Service ID: {id}
                    </h5>
                    <input
                        className="form-control mb-3"
                        value={customerName}
                        readOnly
                    />

                    <input
                        className="form-control mb-3"
                        value={dob}
                        readOnly
                    />

                    <input
                        className="form-control mb-3"
                        value={phoneNumber}
                        readOnly
                    />
                    <h4 className="mt-4">
                        Application Details
                    </h4>

                    {
                        fields.map(field => (

                            <div
                                key={field.id}
                                className="mb-3"
                            >

                                <label
                                    className="form-label"
                                >
                                    {field.fieldName}
                                </label>

                                <input
                                    className="form-control"
                                    type={
                                        field.fieldType === "NUMBER"
                                            ? "number"
                                            : field.fieldType === "DATE"
                                                ? "date"
                                                : "text"
                                    }
                                    value={
                                        fieldValues[field.id]
                                        ??
                                        autoFillData[
                                            field.fieldName
                                            ]
                                        ??
                                        ""

                                    }
                                    onChange={(e) =>

                                        setFieldValues({

                                            ...fieldValues,

                                            [field.id]:
                                            e.target.value
                                        })

                                    }
                                />

                            </div>

                        ))
                    }
                    <h4>
                        Required Documents
                    </h4>

                    <div className="mb-4">

                        {
                            requiredDocuments.map(
                                document => (

                                    <div
                                        key={document.id}
                                        className="mb-3"
                                    >

                                        <label
                                            className="form-label"
                                        >
                                            {
                                                document.documentName
                                            }
                                        </label>

                                        <input
                                            type="file"
                                            className="form-control"
                                            onChange={(e) =>

                                                setUploadedFiles(
                                                    {
                                                        ...uploadedFiles,

                                                        [
                                                            document.documentName
                                                            ]:
                                                            e.target.files[0]
                                                    }
                                                )

                                            }
                                        />

                                    </div>

                                )
                            )
                        }

                    </div>

                    <div className="d-flex gap-2">



                        <button
                            className="btn btn-success"
                            onClick={submitRequest}
                        >
                            Submit Request
                        </button>

                    </div>

                </div>

            </div>
        </>
    );
}

export default ServiceDocuments;