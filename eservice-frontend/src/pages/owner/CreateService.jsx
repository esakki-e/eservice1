import { useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import DashboardLayout
    from "../../layouts/DashboardLayout";
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

            <div className="
            min-h-screen
            bg-slate-50
            p-8
        ">

                <div className="
                max-w-5xl
                mx-auto
            ">

                    <h1 className="
                    text-4xl
                    font-bold
                    text-slate-800
                    mb-8
                ">
                        Create Service
                    </h1>

                    {/* Service Details */}

                    <div className="
                    bg-white
                    rounded-3xl
                    border
                    shadow-sm
                    p-8
                    mb-8
                ">

                        <h3 className="
                        text-xl
                        font-semibold
                        mb-6
                    ">
                            Service Details
                        </h3>

                        <div className="space-y-6">

                            <div>

                                <label className="
                                block
                                text-sm
                                font-medium
                                text-slate-700
                                mb-2
                            ">
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
                                    className="
                                    w-full
                                    h-14
                                    px-4
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-indigo-500
                                "
                                />

                            </div>

                            <div>

                                <label className="
                                block
                                text-sm
                                font-medium
                                text-slate-700
                                mb-2
                            ">
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
                                    className="
                                    w-full
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    px-4
                                    py-3
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-indigo-500
                                "
                                />

                            </div>

                        </div>

                    </div>

                    {/* Documents */}

                    <div className="
                    bg-white
                    rounded-3xl
                    border
                    shadow-sm
                    p-8
                ">

                        <h3 className="
                        text-xl
                        font-semibold
                        mb-6
                    ">
                            Required Documents
                        </h3>

                        <div className="space-y-4">

                            {documents.map(
                                (doc, index) => (

                                    <div
                                        key={index}
                                        className="
                                        flex
                                        gap-3
                                    "
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
                                            className="
                                            flex-1
                                            h-12
                                            px-4
                                            rounded-xl
                                            border
                                            border-slate-200
                                        "
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                deleteDocument(
                                                    index
                                                )
                                            }
                                            className="
                                            px-4
                                            rounded-xl
                                            bg-red-50
                                            text-red-600
                                            hover:bg-red-100
                                            transition
                                        "
                                        >
                                            Delete
                                        </button>

                                    </div>

                                )
                            )}

                            <button
                                type="button"
                                onClick={addDocument}
                                className="
                                px-5
                                py-3
                                rounded-xl
                                border
                                border-slate-300
                                hover:bg-slate-50
                                transition
                            "
                            >
                                + Add Document
                            </button>

                        </div>

                    </div>

                    {/* Actions */}

                    <div className="
                    flex
                    justify-end
                    mt-8
                ">

                        <button
                            onClick={saveService}
                            className="
                            px-8
                            py-3
                            rounded-xl
                            bg-indigo-600
                            text-white
                            font-medium
                            hover:bg-indigo-700
                            transition
                        "
                        >
                            Save Service
                        </button>

                    </div>

                </div>

            </div>

        </DashboardLayout>
    );
}

export default CreateService;