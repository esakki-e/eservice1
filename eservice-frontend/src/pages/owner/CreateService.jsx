import { useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
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
            "http://localhost:8080/admin/services",
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
        <>
            <Navbar />

            <div className="container mt-4">

                <h2>Create Service</h2>

                <form onSubmit={saveService}>

                    <div className="mb-3">
                        <label>Service Name</label>

                        <input
                            className="form-control"
                            value={serviceName}
                            onChange={(e) =>
                                setServiceName(e.target.value)
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <label>Description</label>

                        <textarea
                            className="form-control"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                        />
                    </div>

                    <h5 className="mt-4">
                        Required Documents
                    </h5>

                    {
                        documents.map(
                            (doc, index) => (

                                <div
                                    key={index}
                                    className="
                    d-flex
                    gap-2
                    mb-2
                "
                                >

                                    <input
                                        className="form-control"
                                        placeholder="Document Name"
                                        value={doc}
                                        onChange={(e) =>
                                            updateDocument(
                                                index,
                                                e.target.value
                                            )
                                        }
                                    />

                                    <button
                                        type="button"
                                        className="
                        btn
                        btn-danger
                    "
                                        onClick={() =>
                                            deleteDocument(
                                                index
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            )
                        )
                    }

                    <button
                        type="button"
                        className="
        btn
        btn-primary
        mb-3
    "
                        onClick={addDocument}
                    >
                        + Add Document
                    </button>

                    <button
                        className="btn btn-primary"
                    >
                        Save
                    </button>

                </form>

            </div>
        </>
    );
}

export default CreateService;