import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";

function Employees() {

    const [employees, setEmployees] =
        useState([]);

    useEffect(() => {

        const token =
            localStorage.getItem("token");

        axios.get(
            "http://localhost:8080/employees",
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        )
            .then(res => {
                setEmployees(res.data);
            })
            .catch(err => {
                console.log(err);
            });

    }, []);

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <h2 className="mb-4">
                    Employees
                </h2>

                <table className="table table-bordered table-hover">

                    <thead className="table-dark">

                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Status</th>
                    </tr>

                    </thead>

                    <tbody>

                    {employees.map(employee => (

                        <tr key={employee.id}>

                            <td>{employee.id}</td>

                            <td>{employee.name}</td>

                            <td>
                                {employee.phoneNumber}
                            </td>

                            <td>
                                <span
                                    className={
                                        employee.active
                                            ? "badge text-bg-success"
                                            : "badge text-bg-danger"
                                    }
                                >
                                    {employee.active
                                        ? "Active"
                                        : "Inactive"}
                                </span>
                            </td>

                        </tr>

                    ))}

                    </tbody>

                </table>

            </div>
        </>
    );
}

export default Employees;