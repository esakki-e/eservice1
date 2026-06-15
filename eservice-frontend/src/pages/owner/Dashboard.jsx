import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import "./Dashboard.css";

function Dashboard() {

    const [dashboard, setDashboard] =
        useState({});
    const [analytics,
        setAnalytics] =
        useState([]);
    const [showAnalytics,
        setShowAnalytics] =
        useState(false);

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
        axios.get(
            "http://localhost:8080/dashboard/service-analytics",
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        )
            .then(res => {
                setAnalytics(
                    res.data
                );
            })
            .catch(err => {
                console.log(err);
            });

    }, []);

    return (
        <>
            <Navbar/>

            <div className="container mt-4">
                <div className="mb-4">
                    <h2 className="dashboard-title">
                        Owner Dashboard
                    </h2>

                    <p className="dashboard-subtitle">
                        Monitor services, requests,
                        employees and analytics.
                    </p>
                </div>


                <div className="row">

                    <div className="col-md-4 mb-3">
                        <div
                            className="card shadow-sm text-center p-4 dashboard-card"
                        >
                            <div className="display-6 mb-2">
                                🛠
                            </div>

                            <h5>Total Services</h5>                            <h1 className="display-5">
                                {dashboard.totalServices}
                            </h1>
                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                        <div
                            className="card shadow-sm text-center p-4 dashboard-card"
                        >
                            <div className="display-6 mb-2">
                                📄
                            </div>

                            <h5>Total Requests</h5>                            <h1 className="display-5">
                                {dashboard.totalRequests}
                            </h1>
                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                        <div
                            className="card shadow-sm text-center p-4 dashboard-card"
                        >
                            <div className="display-6 mb-2">
                                👨‍💼
                            </div>

                            <h5>Total Employees</h5>                            <h1 className="display-5">
                                {dashboard.totalEmployees}
                            </h1>
                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                        <div
                            className="card shadow-sm text-center p-4 dashboard-card"
                        >
                            <div className="display-6 mb-2">
                                ⏳
                            </div>

                            <h5>Pending Tasks</h5>                            <h1 className="display-5">
                                {dashboard.pendingTasks}
                            </h1>
                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                        <div
                            className="card shadow-sm text-center p-4 dashboard-card"
                        >
                            <div className="display-6 mb-2">
                                ✅
                            </div>

                            <h5>Completed Tasks</h5>                            <h1 className="display-5">
                                {dashboard.completedTasks}
                            </h1>
                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                        <div
                            className="card shadow-sm text-center p-4 dashboard-card"
                        >
                            <div className="display-6 mb-2">
                                📅
                            </div>

                            <h5>Today Requests</h5>                            <h1 className="display-5">
                                {dashboard.todayRequests}
                            </h1>
                        </div>
                    </div>

                </div>
                <div
                    className="
        card
        shadow-sm
        mt-4
        analytics-card
    "
                    onClick={() =>
                        setShowAnalytics(
                            !showAnalytics
                        )
                    }
                >

                    <div className="card-body">

                        <div
                            className="
    analytics-item
    d-flex
    justify-content-between
    align-items-center
"
                        >

                            <div>

                                <h4>
                                    Service Analytics
                                </h4>

                                <p className="text-muted">

                                    {
                                        analytics.length
                                    } Services

                                </p>

                            </div>

                            <h3>

                                {
                                    showAnalytics
                                        ? "▲"
                                        : "▼"
                                }

                            </h3>

                        </div>

                        {
                            showAnalytics
                            &&
                            (
                                <div
                                    className="mt-3"
                                >
                                    {
                                        analytics.map(
                                            (item, index) => (

                                                <div
                                                    key={
                                                        item.serviceName
                                                    }
                                                    className="
                    border-bottom
                    py-3
                "
                                                >

                                                    <div
                                                        className="
                        d-flex
                        justify-content-between
                        align-items-center
                    "
                                                    >

                                                        <strong>

                                                            {
                                                                index === 0
                                                                    ? "🥇 "
                                                                    : index === 1
                                                                        ? "🥈 "
                                                                        : "🥉 "
                                                            }

                                                            {
                                                                item.serviceName
                                                            }

                                                        </strong>

                                                        <div
                                                            className="
                            analytics-count
                        "
                                                        >
                                                            {
                                                                item.requestCount
                                                            }
                                                        </div>

                                                    </div>

                                                    <div
                                                        className="progress mt-2"
                                                        style={{
                                                            height: "8px"
                                                        }}
                                                    >

                                                        <div
                                                            className="progress-bar"
                                                            style={{
                                                                width:
                                                                    `${
                                                                        (
                                                                            item.requestCount
                                                                            /
                                                                            analytics[0].requestCount
                                                                        ) * 100
                                                                    }%`
                                                            }}
                                                        />

                                                    </div>

                                                </div>

                                            )
                                        )
                                    }




                                </div>
                            )
                        }

                    </div>

                </div>




            </div>
        </>
    );
}
export default Dashboard;