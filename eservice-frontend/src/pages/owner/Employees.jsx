import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";

function Employees() {

    const [employees, setEmployees] =
        useState([]);
    const [searchName,
        setSearchName] =
        useState("");

    const [searchPhone,
        setSearchPhone] =
        useState("");
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
    const filteredEmployees =
        employees.filter(employee => {

            const matchesName =
                employee.name
                    .toLowerCase()
                    .includes(
                        searchName
                            .toLowerCase()
                    );

            const matchesPhone =
                employee.phoneNumber
                    .includes(
                        searchPhone
                    );

            return matchesName
                &&
                matchesPhone;
        });
    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <h2 className="mb-4">
                    Employees
                </h2>
                <div className="row mb-3">

                    <div className="col-md-6">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by Name"
                            value={searchName}
                            onChange={(e) =>
                                setSearchName(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                    <div className="col-md-6">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by Phone"
                            value={searchPhone}
                            onChange={(e) =>
                                setSearchPhone(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                </div>
                <table className="table table-bordered table-hover">

                    <thead className="table-dark">

                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Tasks</th>
                        <th>Completed</th>
                        <th>Status</th>
                    </tr>

                    </thead>

                    <tbody>

                    {filteredEmployees.map(employee => (
                        <tr key={employee.id}>

                            <td>{employee.id}</td>

                            <td>{employee.name}</td>

                            <td>
                                {employee.phoneNumber}
                            </td>
                            <td>{employee.taskCount}</td>
                            <td>
                                {employee.completedTasks}
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