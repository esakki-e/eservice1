import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";

function Users() {

    const [users, setUsers] =
        useState([]);

    const loadUsers = () => {

        const token =
            localStorage.getItem("token");

        axios.get(
            "http://localhost:8080/users",
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
            `http://localhost:8080/employees/promote/${userId}`,
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
        <>
            <Navbar />

            <div className="container mt-4">

                <h2>Users</h2>

                <table className="table">

                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                    </thead>

                    <tbody>

                    {users.map(user => (

                        <tr key={user.id}>

                            <td>
                                {user.name}
                            </td>

                            <td>
                                {user.phoneNumber}
                            </td>

                            <td>
                                {user.role}
                            </td>

                            <td>

                                {user.role ===
                                "CUSTOMER" ? (

                                    <button
                                        className="btn btn-success btn-sm"
                                        onClick={() =>
                                            promoteUser(
                                                user.id
                                            )
                                        }
                                    >
                                        Promote
                                    </button>

                                ) : (

                                    <span>
                                        Employee
                                    </span>

                                )}

                            </td>

                        </tr>

                    ))}

                    </tbody>

                </table>

            </div>
        </>
    );
}

export default Users;