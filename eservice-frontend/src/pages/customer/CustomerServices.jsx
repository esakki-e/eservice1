import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

function CustomerServices() {

    const [services, setServices] =
        useState([]);

    const navigate =
        useNavigate();

    useEffect(() => {

        axios.get(
            "http://localhost:8080/services"
        )
            .then(res => {
                setServices(res.data);
            })
            .catch(console.error);

    }, []);

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <h2 className="mb-4">
                    Available Services
                </h2>

                <div className="row">

                    {services.map(service => (

                        <div
                            key={service.id}
                            className="col-md-4 mb-4"
                        >

                            <div className="card shadow h-100">

                                <div className="card-body">

                                    <h4>
                                        {service.serviceName}
                                    </h4>

                                    <p>
                                        {service.description}
                                    </p>

                                    <button
                                        className="btn btn-primary"
                                        onClick={() =>
                                            navigate(
                                                `/service-documents/${service.id}`
                                            )
                                        }
                                    >
                                        Apply Now
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>
        </>
    );
}

export default CustomerServices;