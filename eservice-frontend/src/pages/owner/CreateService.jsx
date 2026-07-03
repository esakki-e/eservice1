import { useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import DashboardLayout
    from "../../layouts/DashboardLayout";
import "./CreateService.css"
function CreateService() {

    const [serviceName, setServiceName] = useState("");
    const [description, setDescription] = useState("");
    const [documents, setDocuments] =
        useState([]);

    const navigate = useNavigate();
    const addDocument = () => {

        setDocuments(
            [...documents, ""]
        );
    };

    const updateDocument = (
        index,
        value
    ) => {

        const updated =
            [...documents];

        updated[index] = value;

        setDocuments(updated);
    };

    const deleteDocument = (
        index
    ) => {

        setDocuments(
            documents.filter(
                (_, i) =>
                    i !== index
            )
        );
    };

    const saveService = async (e) => {

        e.preventDefault();

        const token = localStorage.getItem("token");
        console.log({
            serviceName,
            description,
            active: true,
            documents
        });
        await axios.post(
            (`${API_URL}/admin/services`),
            {
                serviceName,
                description,
                active: true,
                documents
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        alert("Service Created");
        navigate("/services");

        setServiceName("");
        setDescription("");
    };
    return (
        <DashboardLayout>

            <div className="page-bg">

                <div className="create-service-page">

                    <div className="create-service-container">

                        <h1 className="create-service-title">

                            Create Service

                        </h1>

                        {/* Service Details */}

                        <div className="service-card">

                            <h3 className="section-title">

                                Service Details

                            </h3>

                            <div className="service-form">

                                <div className="form-group">

                                    <label className="form-label">

                                        Service Name

                                    </label>

                                    <input
                                        value={serviceName}
                                        onChange={(e) =>
                                            setServiceName(
                                                e.target.value
                                            )
                                        }
                                        placeholder="e.g. Community Certificate"
                                        className="form-input"
                                    />

                                </div>

                                <div className="form-group">

                                    <label className="form-label">

                                        Description

                                    </label>

                                    <textarea
                                        rows="4"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Briefly describe this service"
                                        className="form-textarea"
                                    />

                                </div>

                            </div>

                        </div>

                        {/* Documents */}

                        <div className="service-card">

                            <h3 className="section-title">

                                Required Documents

                            </h3>

                            <div className="documents-list">

                                {

                                    documents.map(

                                        (doc, index) => (

                                            <div
                                                key={index}
                                                className="document-row"
                                            >

                                                <input
                                                    placeholder="Document Name"
                                                    value={doc}
                                                    onChange={(e) =>
                                                        updateDocument(
                                                            index,
                                                            e.target.value
                                                        )
                                                    }
                                                    className="document-input"
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        deleteDocument(
                                                            index
                                                        )
                                                    }
                                                    className="delete-document-button"
                                                >

                                                    Delete

                                                </button>

                                            </div>

                                        )

                                    )

                                }

                                <button
                                    type="button"
                                    onClick={addDocument}
                                    className="add-document-button"
                                >

                                    + Add Document

                                </button>

                            </div>

                        </div>

                        {/* Actions */}

                        <div className="service-actions">

                            <button
                                onClick={saveService}
                                className="save-service-button"
                            >

                                Save Service

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </DashboardLayout>
    );
}

export default CreateService;