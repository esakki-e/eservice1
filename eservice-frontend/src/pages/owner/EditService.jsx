import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { API_URL } from "../../config";

function EditService() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [serviceName, setServiceName] =
        useState("");

    const [description, setDescription] =
        useState("");

    useEffect(() => {

        const token =
            localStorage.getItem("token");

        axios.get(
            (`${API_URL}/admin/services`),
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        )
            .then(res => {

                const service =
                    res.data.find(
                        s => s.id === Number(id)
                    );

                if (service) {

                    setServiceName(
                        service.serviceName
                    );

                    setDescription(
                        service.description
                    );
                }
            });

    }, [id]);

    const updateService = async (e) => {

        e.preventDefault();

        const token =
            localStorage.getItem("token");

        await axios.put(
            `${API_URL}/admin/services/${id}`,
            {
                serviceName,
                description,
                active: true
            },
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        alert("Service Updated");

        navigate("/services");
    };

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <h2>Edit Service</h2>

                <form onSubmit={updateService}>

                    <input
                        className="form-control mb-3"
                        value={serviceName}
                        onChange={(e) =>
                            setServiceName(
                                e.target.value
                            )
                        }
                    />

                    <textarea
                        className="form-control mb-3"
                        value={description}
                        onChange={(e) =>
                            setDescription(
                                e.target.value
                            )
                        }
                    />

                    <button
                        className="btn btn-warning"
                    >
                        Update
                    </button>

                </form>

            </div>
        </>
    );
}

export default EditService;