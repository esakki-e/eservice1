import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";

function Dashboard() {

    const [dashboard, setDashboard] =
        useState({});

    useEffect(() => {

        const token =
            localStorage.getItem("token");

        axios.get(
            "http://localhost:8080/dashboard",
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        ).then(res => {
            console.log(res.data);
            setDashboard(res.data);
        })
            .catch(err => {
                console.log(err);
            });

    }, []);

    return (
        <>
            <Navbar/>

            <div className="container mt-5">

                <h2 className="mb-4">
                    Owner Dashboard
                </h2>

                <div className="row">

                    <div className="col-md-3">
                        <div className="card shadow-sm text-center p-4">                            <h5>Total Services</h5>
                            <h1 className="display-5">
                                {dashboard.totalServices}
                            </h1>                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card shadow-sm text-center p-4">                            <h5>Total Requests</h5>
                            <h1 className="display-5">
                                {dashboard.totalRequests}
                            </h1>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card shadow-sm text-center p-4">
                            <h5>Total Employees</h5>
                            <h1 className="display-5">
                                {dashboard.totalEmployees}
                            </h1>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card shadow-sm text-center p-4">                            <h5>Pending Tasks</h5>
                            <h1 className="display-5">
                                {dashboard.pendingTasks}
                            </h1>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
}
export default Dashboard;