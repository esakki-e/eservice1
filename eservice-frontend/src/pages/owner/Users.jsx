import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { API_URL } from "../../config";
import DashboardLayout
    from "../../layouts/DashboardLayout";
import "./Users.css"
function Users() {

    const [users, setUsers] =
        useState([]);

    const loadUsers = () => {

        const token =
            localStorage.getItem("token");

        axios.get(
            (`${API_URL}/users`),
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        )
            .then(res => {
                setUsers(res.data);
            });
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const promoteUser = async (
        userId
    ) => {

        const token =
            localStorage.getItem("token");

        await axios.post(
            `${API_URL}/employees/promote/${userId}`,
            {},
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        alert(
            "Promoted Successfully"
        );

        loadUsers();
    };
    return (

        <DashboardLayout>

            <div className="page-bg">

                <div className="users-page">

                    <div className="users-container">

                        {/* Header */}

                        <div className="users-header">

                            <h1 className="users-title">

                                Users

                            </h1>

                            <p className="users-subtitle">

                                Manage roles and access across the portal

                            </p>

                        </div>

                        {/* Users Table */}

                        <div className="users-table-card">

                            <table className="users-table">

                                <thead className="users-table-header">

                                <tr>

                                    <th className="table-heading">

                                        Name

                                    </th>

                                    <th className="table-heading">

                                        Phone

                                    </th>

                                    <th className="table-heading">

                                        Role

                                    </th>

                                    <th className="table-heading table-heading-right">

                                        Action

                                    </th>

                                </tr>

                                </thead>

                                <tbody>

                                {

                                    users.map(user => (

                                        <tr

                                            key={user.id}

                                            className="user-row"

                                        >

                                            <td className="table-cell">

                                                <div className="user-info">

                                                    <div className="user-avatar">

                                                        {

                                                            user.name
                                                                ?.substring(0, 2)
                                                                .toUpperCase()

                                                        }

                                                    </div>

                                                    <span className="user-name">

                                                        {user.name}

                                                    </span>

                                                </div>

                                            </td>

                                            <td className="table-cell user-phone">

                                                {user.phoneNumber}

                                            </td>

                                            <td className="table-cell">

                                                <span

                                                    className={

                                                        user.role === "OWNER"

                                                            ? "role-badge owner-role"

                                                            : user.role === "EMPLOYEE"

                                                                ? "role-badge employee-role"

                                                                : "role-badge customer-role"

                                                    }

                                                >

                                                    {user.role}

                                                </span>

                                            </td>

                                            <td className="table-cell table-cell-right">

                                                {

                                                    user.role === "CUSTOMER"

                                                        ? (

                                                            <button

                                                                onClick={() =>

                                                                    promoteUser(

                                                                        user.id

                                                                    )

                                                                }

                                                                className="promote-button"

                                                            >

                                                                Promote

                                                            </button>

                                                        )

                                                        : (

                                                            <span className="no-action">

                                                                —

                                                            </span>

                                                        )

                                                }

                                            </td>

                                        </tr>

                                    ))

                                }

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );
}

export default Users;