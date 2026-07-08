import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import "./CreateEmployee.css";

function CreateEmployee() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        phoneNumber: "",
        password: "",
        email: "",
        gender: "",
        address: "",
        dob: ""
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token =
                localStorage.getItem("token");

            await axios.post(

                `${API_URL}/employees`,

                form,

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            alert("Employee created successfully.");

            navigate("/employees");

        }

        catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to create employee."
            );

        }

    };

    return (

        <DashboardLayout>

            <div className="create-employee-container">

                <div className="employee-card">

                    <h2>Create Employee</h2>

                    <form onSubmit={handleSubmit}>

                        <input
                            name="name"
                            placeholder="Employee Name"
                            onChange={handleChange}
                            required
                        />

                        <input
                            name="phoneNumber"
                            placeholder="Phone Number"
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            required
                        />

                        <input
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                        />

                        <input
                            name="gender"
                            placeholder="Gender"
                            onChange={handleChange}
                        />

                        <input
                            type="date"
                            name="dob"
                            onChange={handleChange}
                        />

                        <textarea
                            name="address"
                            placeholder="Address"
                            onChange={handleChange}
                        />

                        <button type="submit">

                            Create Employee

                        </button>

                    </form>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default CreateEmployee;