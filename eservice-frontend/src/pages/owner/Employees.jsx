import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import DashboardLayout
    from "../../layouts/DashboardLayout";
import { Link } from "react-router-dom";
import { API_URL } from "../../config";
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
            (`${API_URL}/employees`),
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
        <DashboardLayout>

            <div className="min-h-screen bg-slate-50 p-8">

                <div className="max-w-7xl mx-auto">

                    {/* Header */}

                    <div className="mb-8">

                        <h1 className="
                        text-4xl
                        font-bold
                        text-slate-800
                    ">
                            Employees
                        </h1>

                        <p className="
                        text-slate-500
                        mt-2
                    ">
                            Track workload and performance across your team
                        </p>

                    </div>

                    {/* Employee Summary Cards */}

                    <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    xl:grid-cols-3
                    gap-6
                    mb-8
                ">

                        {filteredEmployees.map(employee => {

                            const completion =
                                employee.taskCount > 0
                                    ? Math.round(
                                        (
                                            employee.completedTasks /
                                            employee.taskCount
                                        ) * 100
                                    )
                                    : 0;

                            return (

                                <Link
                                    key={employee.id}
                                    to={`/employees/${employee.id}`}
                                    className="
        block
        bg-white
        rounded-3xl
        border
        shadow-sm
        p-6
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
        cursor-pointer
    "
                                >

                                    <div className="
                                    flex
                                    justify-between
                                    items-start
                                    mb-4
                                ">

                                        <div>

                                            <h3 className="
                                            font-bold
                                            text-lg
                                            text-slate-800
                                        ">
                                                {employee.name}
                                            </h3>

                                            <p className="
                                            text-sm
                                            text-slate-500
                                        ">
                                                {employee.phoneNumber}
                                            </p>

                                        </div>

                                        <span
                                            className={
                                                employee.active
                                                    ? `
                                                px-3
                                                py-1
                                                rounded-full
                                                text-xs
                                                font-semibold
                                                bg-emerald-100
                                                text-emerald-700
                                                `
                                                    : `
                                                px-3
                                                py-1
                                                rounded-full
                                                text-xs
                                                font-semibold
                                                bg-red-100
                                                text-red-700
                                                `
                                            }
                                        >
                                        {employee.active
                                            ? "Active"
                                            : "Inactive"}
                                    </span>

                                    </div>

                                    <div className="
                                    flex
                                    justify-between
                                    text-sm
                                    mb-2
                                ">
                                    <span>
                                        {employee.completedTasks}
                                        /
                                        {employee.taskCount}
                                        {" "}
                                        completed
                                    </span>

                                        <span className="font-semibold">
                                        {completion}%
                                    </span>
                                    </div>

                                    <div className="
                                    w-full
                                    bg-slate-200
                                    rounded-full
                                    h-2
                                ">
                                        <div
                                            className="
                                            bg-emerald-500
                                            h-2
                                            rounded-full
                                        "
                                            style={{
                                                width:
                                                    `${completion}%`
                                            }}
                                        />
                                    </div>

                                </Link>
                            );
                        })}

                    </div>

                    {/* Search */}

                    <div className="
                    grid
                    md:grid-cols-2
                    gap-4
                    mb-6
                ">

                        <input
                            type="text"
                            placeholder="Search by Name"
                            value={searchName}
                            onChange={(e) =>
                                setSearchName(
                                    e.target.value
                                )
                            }
                            className="
                            h-14
                            px-4
                            rounded-2xl
                            border
                            border-slate-200
                            bg-white
                        "
                        />

                        <input
                            type="text"
                            placeholder="Search by Phone"
                            value={searchPhone}
                            onChange={(e) =>
                                setSearchPhone(
                                    e.target.value
                                )
                            }
                            className="
                            h-14
                            px-4
                            rounded-2xl
                            border
                            border-slate-200
                            bg-white
                        "
                        />

                    </div>

                    {/* Table */}

                    <div className="
                    bg-white
                    rounded-3xl
                    border
                    shadow-sm
                    overflow-hidden
                ">

                        <table className="w-full">

                            <thead className="bg-slate-50">

                            <tr>

                                <th className="p-4 text-left">
                                    ID
                                </th>

                                <th className="p-4 text-left">
                                    Name
                                </th>

                                <th className="p-4 text-left">
                                    Phone
                                </th>

                                <th className="p-4 text-left">
                                    Tasks
                                </th>

                                <th className="p-4 text-left">
                                    Completed
                                </th>

                                <th className="p-4 text-left">
                                    Status
                                </th>

                            </tr>

                            </thead>

                            <tbody>

                            {filteredEmployees.map(
                                employee => (

                                    <tr
                                        key={employee.id}
                                        className="
                                        border-t
                                        hover:bg-slate-50
                                    "
                                    >

                                        <td className="p-4">
                                            {employee.id}
                                        </td>

                                        <td className="
                                        p-4
                                        font-medium
                                    ">
                                            {employee.name}
                                        </td>

                                        <td className="p-4">
                                            {employee.phoneNumber}
                                        </td>

                                        <td className="p-4">
                                            {employee.taskCount}
                                        </td>

                                        <td className="p-4">
                                            {employee.completedTasks}
                                        </td>

                                        <td className="p-4">

                                        <span
                                            className={
                                                employee.active
                                                    ? `
                                                    px-3
                                                    py-1
                                                    rounded-full
                                                    text-xs
                                                    font-semibold
                                                    bg-emerald-100
                                                    text-emerald-700
                                                    `
                                                    : `
                                                    px-3
                                                    py-1
                                                    rounded-full
                                                    text-xs
                                                    font-semibold
                                                    bg-red-100
                                                    text-red-700
                                                    `
                                            }
                                        >
                                            {employee.active
                                                ? "Active"
                                                : "Inactive"}
                                        </span>

                                        </td>

                                    </tr>

                                )
                            )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </DashboardLayout>
    );
}

export default Employees;