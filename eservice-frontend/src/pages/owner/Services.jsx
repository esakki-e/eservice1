import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

function Services() {

    const [services, setServices] = useState([]);

    useEffect(() => {

        const token = localStorage.getItem("token");

        axios.get(
            "http://localhost:8080/services",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then(res => {
                setServices(res.data);
            })
            .catch(console.error);

    }, []);
    const deleteService = async (id) => {
        try {
            const token = localStorage.getItem("token");

            await axios.delete(
                `http://localhost:8080/admin/services/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setServices(
                services.filter(
                    service => service.id !== id
                )
            );

        } catch (error) {
            alert(
                "Cannot delete service because documents are attached."
            );
        }
    };
    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <h2>Services</h2>

                <table className="table table-bordered">

                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Service Name</th>
                        <th>Description</th>
                        <th>Active</th>
                        <th>Action</th>                    </tr>
                    </thead>

                    <tbody>
                    {services.map(service => (
                        <tr key={service.id}>
                            <td>{service.id}</td>
                            <td>{service.serviceName}</td>
                            <td>{service.description}</td>
                            <td>
                                {service.active ? "Yes" : "No"}
                            </td>

                            <td>

                                <Link
                                    to={`/services/edit/${service.id}`}
                                    className="btn btn-warning btn-sm me-2"
                                >
                                    Edit
                                </Link>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() =>
                                        deleteService(service.id)
                                    }
                                >
                                    Delete
                                </button>

                                <Link
                                    to={`/service-documents/${service.id}`}
                                    className="btn btn-primary btn-sm ms-2"
                                >
                                    Apply
                                </Link>
                                <Link
                                    to={`/service-fields/${service.id}`}
                                    className="btn btn-success btn-sm ms-2"
                                >
                                    Manage Fields
                                </Link>

                            </td>
                        </tr>
                    ))}
                    </tbody>

                </table>

            </div>
        </>
    );
}

export default Services;