import { useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
function CreateService() {

    const [serviceName, setServiceName] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    const saveService = async (e) => {

        e.preventDefault();

        const token = localStorage.getItem("token");

        await axios.post(
            "http://localhost:8080/admin/services",
            {
                serviceName,
                description,
                active: true
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