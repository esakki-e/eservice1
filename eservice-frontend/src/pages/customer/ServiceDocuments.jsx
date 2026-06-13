import {
    useParams,
    useNavigate
} from "react-router-dom";
import Navbar from "../../components/Navbar";
//import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


function ServiceDocuments() {

    const { id } = useParams();
    const [aadhaarFile, setAadhaarFile] =
        useState(null);

    const [photoFile, setPhotoFile] =
        useState(null);

    const [rationFile, setRationFile] =
        useState(null);
    const navigate =
        useNavigate();
    const [customerName, setCustomerName] =
        useState("");

    const [phoneNumber, setPhoneNumber] =
        useState(
            localStorage.getItem("phoneNumber")
            || ""
        );
    const requiredDocuments = [
        "Aadhaar Card",
        "Passport Size Photo",
        "Ration Card"
    ];
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

            await uploadFile(aadhaarFile);
            await uploadFile(photoFile);
            await uploadFile(rationFile);

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

    return (
        <>
            <Navbar />

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
                        placeholder="Customer Name"
                        value={customerName}
                        onChange={(e) =>
                            setCustomerName(e.target.value)
                        }
                    />

                    <input
                        className="form-control mb-3"
                        value={phoneNumber}
                        readOnly
                    />
                    <h4>
                        Required Documents
                    </h4>

                    <ul className="list-group mb-4">

                        {requiredDocuments.map(
                            (document, index) => (

                                <li
                                    key={index}
                                    className="list-group-item"
                                >
                                    {document}
                                </li>

                            )
                        )}

                    </ul>

                    <div className="mb-3">

                        <label className="form-label">
                            Aadhaar Card
                        </label>


                        <input
                            type="file"
                            className="form-control"
                            onChange={(e) =>
                                setAadhaarFile(e.target.files[0])
                            }
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Passport Size Photo
                        </label>


                        <input
                            type="file"
                            className="form-control"
                            onChange={(e) =>
                                setPhotoFile(e.target.files[0])
                            }
                        />
                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Ration Card
                        </label>


                        <input
                            type="file"
                            className="form-control"
                            onChange={(e) =>
                                setRationFile(e.target.files[0])
                            }
                        />
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