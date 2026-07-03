import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { API_URL } from "../../config";
import "./EditService.css"
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

            <div className="page-bg">

                <div className="edit-service-page">

                    <div className="edit-service-card">

                        <h2 className="edit-service-title">

                            Edit Service

                        </h2>

                        <form
                            onSubmit={updateService}
                            className="edit-service-form"
                        >

                            <div className="form-group">

                                <label className="form-label">

                                    Service Name

                                </label>

                                <input

                                    className="form-input"

                                    value={serviceName}

                                    onChange={(e) =>
                                        setServiceName(
                                            e.target.value
                                        )
                                    }

                                />

                            </div>

                            <div className="form-group">

                                <label className="form-label">

                                    Description

                                </label>

                                <textarea

                                    className="form-textarea"

                                    value={description}

                                    onChange={(e) =>
                                        setDescription(
                                            e.target.value
                                        )
                                    }

                                />

                            </div>

                            <button
                                className="update-service-button"
                            >

                                Update

                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </>

    );
}

export default EditService;