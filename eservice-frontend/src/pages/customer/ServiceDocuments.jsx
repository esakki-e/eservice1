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
            localStorage.getItem("phoneNumber")
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
    const submitRequest = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await axios.post(
                    "http://localhost:8080/requests",
                    {
                        customerName,
                        phoneNumber:localStorage.getItem("phoneNumber"),
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