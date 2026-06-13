import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";

function CreateRequest() {

    const [customerName, setCustomerName] =
        useState("");

    const [phoneNumber, setPhoneNumber] =
        useState("");

    const [serviceId, setServiceId] =
        useState("");

    const [services, setServices] =
        useState([]);

    useEffect(() => {

        const token =
            localStorage.getItem("token");

        axios.get(
            "http://localhost:8080/admin/services",
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        )
            .then(res => {
                setServices(res.data);
            });

    }, []);

    const submitRequest = async (e) => {

        e.preventDefault();

        const token =
            localStorage.getItem("token");

        await axios.post(
            "http://localhost:8080/requests",
            {
                customerName,
                phoneNumber,
                serviceId
            },
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        alert("Request Submitted");
    };

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <h2>Create Request</h2>

                <form onSubmit={submitRequest}>

                    <input
                        className="form-control mb-3"
                        placeholder="Customer Name"
                        value={customerName}
                        onChange={(e) =>
                            setCustomerName(
                                e.target.value
                            )
                        }
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) =>
                            setPhoneNumber(
                                e.target.value
                            )
                        }
                    />

                    <select
                        className="form-control mb-3"
                        value={serviceId}
                        onChange={(e) =>
                            setServiceId(
                                e.target.value
                            )
                        }
                    >

                        <option value="">
                            Select Service
                        </option>

                        {services.map(service => (

                            <option
                                key={service.id}
                                value={service.id}
                            >
                                {service.serviceName}
                            </option>

                        ))}

                    </select>

                    <button
                        className="btn btn-primary"
                    >
                        Submit
                    </button>

                </form>

            </div>
        </>
    );
}

export default CreateRequest;