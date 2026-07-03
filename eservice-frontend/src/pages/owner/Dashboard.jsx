import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import DashboardLayout from "../../layouts/DashboardLayout";
import { API_URL } from "../../config";
function Dashboard() {

    const [dashboard, setDashboard] =
        useState({});
    const [animatedDashboard, setAnimatedDashboard] = useState({
        totalServices: 0,
        totalRequests: 0,
        totalEmployees: 0,
        todayRequests: 0,
        pendingTasks: 0,
        completedTasks: 0,
        totalRevenue: 0,
        paidRequests: 0,
        unpaidRequests: 0
    });
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
            (`${API_URL}/dashboard`),
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
            (`${API_URL}/dashboard/service-analytics`),
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
    useEffect(() => {

        const interval = setInterval(() => {

            setAnimatedDashboard(prev => ({

                totalServices:
                    prev.totalServices < (dashboard.totalServices || 0)
                        ? prev.totalServices + 1
                        : prev.totalServices,

                totalRequests:
                    prev.totalRequests < (dashboard.totalRequests || 0)
                        ? Math.min(
                            prev.totalRequests + 5,
                            dashboard.totalRequests
                        )
                        : prev.totalRequests,

                totalEmployees:
                    prev.totalEmployees < (dashboard.totalEmployees || 0)
                        ? prev.totalEmployees + 1
                        : prev.totalEmployees,

                pendingTasks:
                    prev.pendingTasks < (dashboard.pendingTasks || 0)
                        ? prev.pendingTasks + 1
                        : prev.pendingTasks,

                completedTasks:
                    prev.completedTasks < (dashboard.completedTasks || 0)
                        ? prev.completedTasks + 1
                        : prev.completedTasks,

                todayRequests:
                    prev.todayRequests < (dashboard.todayRequests || 0)
                        ? prev.todayRequests + 1
                        : prev.todayRequests,

                totalRevenue:
                    prev.totalRevenue < (dashboard.totalRevenue || 0)
                        ? Math.min(
                            prev.totalRevenue + 500,
                            dashboard.totalRevenue
                        )
                        : prev.totalRevenue,

                paidRequests:
                    prev.paidRequests < (dashboard.paidRequests || 0)
                        ? prev.paidRequests + 1
                        : prev.paidRequests,

                unpaidRequests:
                    prev.unpaidRequests < (dashboard.unpaidRequests || 0)
                        ? prev.unpaidRequests + 1
                        : prev.unpaidRequests

            }));

        }, 50);

        return () => clearInterval(interval);

    }, [dashboard]);
    return (
        <DashboardLayout>

            <>

                <div className="vm-page-bg">

                    <div className="vm-dashboard-page">

                        <div className="vm-dashboard-container">

                            <div className="vm-dashboard-header">

                                <h2 className="vm-dashboard-title">
                                    Admin Dashboard
                                </h2>

                                <p className="vm-dashboard-subtitle">
                                    Monitor services, requests, employees and analytics.
                                </p>

                            </div>

                            <div className="vm-dashboard-grid">

                                {/* Total Services */}
                                <div className="vm-dashboard-card vm-service-card">

                                    <div className="vm-dashboard-card-content">

                                        <div>

                                            <p className="vm-dashboard-card-label">
                                                Total Services
                                            </p>

                                            <h2 className="vm-dashboard-card-value">
                                                {animatedDashboard.totalServices}
                                            </h2>

                                            <p className="vm-dashboard-card-info">
                                                Active Services
                                            </p>

                                        </div>

                                        <div className="vm-dashboard-card-icon">
                                            🛠️
                                        </div>

                                    </div>

                                </div>

                                {/* Total Requests */}
                                <div className="vm-dashboard-card vm-request-card">

                                    <div className="vm-dashboard-card-content">

                                        <div>

                                            <p className="vm-dashboard-card-label">
                                                Total Requests
                                            </p>

                                            <h2 className="vm-dashboard-card-value">
                                                {animatedDashboard.totalRequests}
                                            </h2>

                                            <p className="vm-dashboard-card-info">
                                                Applications Received
                                            </p>

                                        </div>

                                        <div className="vm-dashboard-card-icon">
                                            📄
                                        </div>

                                    </div>

                                </div>

                                {/* Today's Requests */}
                                <div className="vm-dashboard-card vm-today-card">

                                    <div className="vm-dashboard-card-content">

                                        <div>

                                            <p className="vm-dashboard-card-label">
                                                Today's Requests
                                            </p>

                                            <h2 className="vm-dashboard-card-value">
                                                {animatedDashboard.todayRequests}
                                            </h2>

                                            <p className="vm-dashboard-card-info">
                                                Received Today
                                            </p>

                                        </div>

                                        <div className="vm-dashboard-card-icon">
                                            📅
                                        </div>

                                    </div>

                                </div>

                                {/* Employees */}
                                <div className="vm-dashboard-card vm-employee-card">

                                    <div className="vm-dashboard-card-content">

                                        <div>

                                            <p className="vm-dashboard-card-label">
                                                Employees
                                            </p>

                                            <h2 className="vm-dashboard-card-value">
                                                {animatedDashboard.totalEmployees}
                                            </h2>

                                            <p className="vm-dashboard-card-info">
                                                Active Workforce
                                            </p>

                                        </div>

                                        <div className="vm-dashboard-card-icon">
                                            👨‍💼
                                        </div>

                                    </div>

                                </div>

                                {/* Pending Tasks */}
                                <div className="vm-dashboard-card vm-pending-card">

                                    <div className="vm-dashboard-card-content">

                                        <div>

                                            <p className="vm-dashboard-card-label">
                                                Pending Tasks
                                            </p>

                                            <h2 className="vm-dashboard-card-value">
                                                {animatedDashboard.pendingTasks}
                                            </h2>

                                            <p className="vm-dashboard-card-info">
                                                Awaiting Completion
                                            </p>

                                        </div>

                                        <div className="vm-dashboard-card-icon">
                                            ⏳
                                        </div>

                                    </div>

                                </div>

                                {/* Completed Tasks */}
                                <div className="vm-dashboard-card vm-completed-card">

                                    <div className="vm-dashboard-card-content">

                                        <div>

                                            <p className="vm-dashboard-card-label">
                                                Completed Tasks
                                            </p>

                                            <h2 className="vm-dashboard-card-value">
                                                {animatedDashboard.completedTasks}
                                            </h2>

                                            <p className="vm-dashboard-card-info">
                                                Successfully Finished
                                            </p>

                                        </div>

                                        <div className="vm-dashboard-card-icon">
                                            ✅
                                        </div>

                                    </div>

                                </div>

                                {/* Paid Requests */}
                                <div className="vm-dashboard-card vm-paid-card">

                                    <div className="vm-dashboard-card-content">

                                        <div>

                                            <p className="vm-dashboard-card-label">
                                                Paid Requests
                                            </p>

                                            <h2 className="vm-dashboard-card-value">
                                                {animatedDashboard.paidRequests}
                                            </h2>

                                            <p className="vm-dashboard-card-info">
                                                Payment Received
                                            </p>

                                        </div>

                                        <div className="vm-dashboard-card-icon">
                                            💳
                                        </div>

                                    </div>

                                </div>

                                {/* Pending Payments */}
                                <div className="vm-dashboard-card vm-unpaid-card">

                                    <div className="vm-dashboard-card-content">

                                        <div>

                                            <p className="vm-dashboard-card-label">
                                                Pending Payments
                                            </p>

                                            <h2 className="vm-dashboard-card-value">
                                                {animatedDashboard.unpaidRequests}
                                            </h2>

                                            <p className="vm-dashboard-card-info">
                                                Awaiting Payment
                                            </p>

                                        </div>

                                        <div className="vm-dashboard-card-icon">
                                            💸
                                        </div>

                                    </div>

                                </div>

                                {/* Revenue */}
                                <div className="vm-dashboard-card vm-revenue-card">

                                    <div className="vm-dashboard-card-content">

                                        <div>

                                            <p className="vm-dashboard-card-label">
                                                Revenue
                                            </p>

                                            <h2 className="vm-dashboard-card-value">
                                                ₹{animatedDashboard.totalRevenue}
                                            </h2>

                                            <p className="vm-dashboard-card-info">
                                                Total Collection
                                            </p>

                                        </div>

                                        <div className="vm-dashboard-card-icon">
                                            💰
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div
                            className="vm-analytics-section"
                            onClick={() => setShowAnalytics(!showAnalytics)}
                        >

                            <div className="vm-analytics-card">

                                <div className="vm-analytics-header">

                                    <div>

                                        <h3 className="vm-analytics-title">
                                            Service Analytics
                                        </h3>

                                        <p className="vm-analytics-subtitle">
                                            {Math.min(analytics.length,3)} Top Services
                                        </p>

                                    </div>

                                    <h3 className="vm-analytics-toggle">
                                        {showAnalytics ? "▲" : "▼"}
                                    </h3>

                                </div>

                                {showAnalytics && (

                                    <div className="vm-analytics-list">

                                        {

                                            analytics.slice(0, 3).map((item, index) => (

                                                <div
                                                    key={item.serviceName}
                                                    className="vm-analytics-item"
                                                >

                                                    <div className="vm-analytics-item-header">

                                                        <strong>

                                                            {
                                                                index === 0
                                                                    ? "🥇 "
                                                                    : index === 1
                                                                        ? "🥈 "
                                                                        : "🥉 "
                                                            }

                                                            {item.serviceName}

                                                        </strong>

                                                        <div className="vm-analytics-count">

                                                            {item.requestCount}

                                                        </div>

                                                    </div>

                                                    <div className="vm-analytics-progress">

                                                        <div
                                                            className="vm-analytics-progress-bar"
                                                            style={{
                                                                width: `${
                                                                    (
                                                                        item.requestCount /
                                                                        analytics[0].requestCount
                                                                    ) * 100
                                                                }%`
                                                            }}
                                                        />

                                                    </div>

                                                </div>

                                            ))

                                        }

                                    </div>

                                )}
                            </div>

                        </div>

                    </div>

                </div>

            </>

        </DashboardLayout>
    );
}
export default Dashboard;