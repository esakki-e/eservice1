import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { API_URL } from "../../config";
import DashboardLayout
    from "../../layouts/DashboardLayout";
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

            <div className="min-h-screen bg-slate-50 p-8">

                <div className="max-w-7xl mx-auto">

                    {/* Header */}

                    <div className="mb-8">

                        <h1 className="
                        text-4xl
                        font-bold
                        text-slate-800
                    ">
                            Users
                        </h1>

                        <p className="
                        text-slate-500
                        mt-2
                    ">
                            Manage roles and access across the portal
                        </p>

                    </div>

                    {/* Users Table */}

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

                                <th className="
                                p-4
                                text-left
                            ">
                                    Name
                                </th>

                                <th className="
                                p-4
                                text-left
                            ">
                                    Phone
                                </th>

                                <th className="
                                p-4
                                text-left
                            ">
                                    Role
                                </th>

                                <th className="
                                p-4
                                text-right
                            ">
                                    Action
                                </th>

                            </tr>

                            </thead>

                            <tbody>

                            {users.map(user => (

                                <tr
                                    key={user.id}
                                    className="
                                    border-t
                                    hover:bg-slate-50
                                    transition
                                "
                                >

                                    <td className="p-4">

                                        <div className="
                                        flex
                                        items-center
                                        gap-3
                                    ">

                                            <div className="
                                            w-10
                                            h-10
                                            rounded-full
                                            bg-slate-200
                                            flex
                                            items-center
                                            justify-center
                                            font-semibold
                                            text-slate-700
                                        ">
                                                {
                                                    user.name
                                                        ?.substring(0, 2)
                                                        .toUpperCase()
                                                }
                                            </div>

                                            <span className="
                                            font-medium
                                            text-slate-800
                                        ">
                                            {user.name}
                                        </span>

                                        </div>

                                    </td>

                                    <td className="p-4 text-slate-600">
                                        {user.phoneNumber}
                                    </td>

                                    <td className="p-4">

                                    <span
                                        className={
                                            user.role === "OWNER"
                                                ? `
                                                px-3
                                                py-1
                                                rounded-full
                                                text-xs
                                                font-semibold
                                                bg-purple-100
                                                text-purple-700
                                                `
                                                : user.role === "EMPLOYEE"
                                                    ? `
                                                    px-3
                                                    py-1
                                                    rounded-full
                                                    text-xs
                                                    font-semibold
                                                    bg-blue-100
                                                    text-blue-700
                                                    `
                                                    : `
                                                    px-3
                                                    py-1
                                                    rounded-full
                                                    text-xs
                                                    font-semibold
                                                    bg-emerald-100
                                                    text-emerald-700
                                                    `
                                        }
                                    >
                                        {user.role}
                                    </span>

                                    </td>

                                    <td className="
                                    p-4
                                    text-right
                                ">

                                        {user.role === "CUSTOMER" ? (

                                            <button
                                                onClick={() =>
                                                    promoteUser(
                                                        user.id
                                                    )
                                                }
                                                className="
                                                px-4
                                                py-2
                                                rounded-xl
                                                bg-emerald-600
                                                text-white
                                                text-sm
                                                font-medium
                                                hover:bg-emerald-700
                                                transition
                                            "
                                            >
                                                Promote
                                            </button>

                                        ) : (

                                            <span className="
                                            text-slate-400
                                            font-medium
                                        ">
                                            —
                                        </span>

                                        )}

                                    </td>

                                </tr>

                            ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </DashboardLayout>
    );
}

export default Users;