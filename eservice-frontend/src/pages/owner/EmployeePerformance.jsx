import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import DashboardLayout
    from "../../layouts/DashboardLayout";

import { API_URL }
    from "../../config";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";
import "./EmployeePerformance.css"
function EmployeePerformance() {

    const { id } =
        useParams();

    const [employee,
        setEmployee] =
        useState(null);

    const [chartType, setChartType] = useState("revenue");


    useEffect(() => {

        const token =
            localStorage.getItem("token");


        axios.get(
            `${API_URL}/employees/${id}/performance`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        )
            .then(res => {

                setEmployee(
                    res.data
                );

            })
            .catch(err => {

                console.log(err);

            });

    }, [id]);
    if (!employee) {

        return (

            <DashboardLayout>

                <div className="page-bg">

                    <div className="employee-details-loading">

                        Loading Employee...

                    </div>

                </div>

            </DashboardLayout>

        );

    }

    const currentRevenue = employee.monthRevenue || 0;

    const bestRevenue = employee.bestMonthRevenue || 0;

    const revenueProgress =
        bestRevenue > 0
            ? (currentRevenue / bestRevenue) * 100
            : 0;

    return (

        <DashboardLayout>

            <div className="page-bg">

                <div className="employee-details-page">

                    <div className="employee-details-container">

                        {/* Back */}

                        <Link
                            to="/employees"
                            className="back-button"
                        >

                            ← Back to Employees

                        </Link>

                        {/* Header */}

                        <div className="employee-profile-card">

                            <div className="employee-profile-header">

                                <div className="employee-profile-info">

                                    <div className="employee-avatar">

                                        {

                                            employee.name
                                                ?.charAt(0)
                                                ?.toUpperCase()

                                        }

                                    </div>

                                    <div>

                                        <h1 className="employee-profile-name">

                                            {employee.name}

                                        </h1>

                                        <p className="employee-id">

                                            Employee ID : #{employee.id}

                                        </p>

                                        <p className="employee-phone">

                                            {employee.phoneNumber}

                                        </p>

                                    </div>

                                </div>

                                <div className="employee-status-wrapper">

                                <span

                                    className={

                                        employee.active

                                            ?

                                            "employee-status active-status"

                                            :

                                            "employee-status inactive-status"

                                    }

                                >

                                    {

                                        employee.active

                                            ?

                                            "Active"

                                            :

                                            "Inactive"

                                    }

                                </span>

                                </div>

                            </div>

                        </div>
                        {/* Summary Cards */}

                        <div className="employee-summary-grid">

                            {/* Assigned */}

                            <div className="summary-card">

                                <p className="summary-label">

                                    Assigned Tasks

                                </p>

                                <h2 className="summary-value assigned-value">

                                    {employee.assignedTasks}

                                </h2>

                            </div>

                            {/* Completed */}

                            <div className="summary-card">

                                <p className="summary-label">

                                    Completed Tasks

                                </p>

                                <h2 className="summary-value completed-value">

                                    {employee.completedTasks}

                                </h2>

                            </div>

                            {/* Pending */}

                            <div className="summary-card">

                                <p className="summary-label">

                                    Pending Tasks

                                </p>

                                <h2 className="summary-value pending-value">

                                    {employee.pendingTasks}

                                </h2>

                            </div>

                            {/* In Progress */}

                            <div className="summary-card">

                                <p className="summary-label">

                                    In Progress

                                </p>

                                <h2 className="summary-value progress-value">

                                    {employee.inProgressTasks}

                                </h2>

                            </div>

                            {/* This Month */}

                            <div className="summary-card">

                                <p className="summary-label">

                                    This Month

                                </p>

                                <h2 className="summary-value month-value">

                                    {employee.thisMonthRequests}

                                </h2>

                            </div>

                            {/* Completion */}

                            <div className="summary-card">

                                <p className="summary-label">

                                    Completion Rate

                                </p>

                                <h2 className="summary-value success-value">

                                    {employee.completionPercentage}%

                                </h2>

                            </div>

                        </div>

                        {/* Revenue & Performance */}

                        <div className="revenue-grid">

                            {/* Total Revenue */}

                            <div className="revenue-card">

                                <p className="summary-label">

                                    Total Revenue

                                </p>

                                <h2 className="revenue-value total-revenue">

                                    ₹{employee.totalRevenue}

                                </h2>

                                <p className="revenue-note revenue-green">

                                    Revenue generated

                                </p>

                            </div>

                            {/* Paid Requests */}

                            <div className="revenue-card">

                                <p className="summary-label">

                                    Paid Requests

                                </p>

                                <h2 className="revenue-value paid-value">

                                    {employee.paidRequests}

                                </h2>

                                <p className="revenue-note revenue-blue">

                                    Successfully collected

                                </p>

                            </div>

                            {/* Average Revenue */}

                            <div className="revenue-card">

                                <p className="summary-label">

                                    Average Revenue

                                </p>

                                <h2 className="revenue-value average-value">

                                    ₹{Number(employee.averageRevenue || 0).toFixed(2)}

                                </h2>

                                <p className="revenue-note revenue-purple">

                                    Per completed request

                                </p>

                            </div>

                        </div>
                        {/* Performance */}

                        <div className="performance-card">

                            <div className="performance-header">

                                <h2 className="performance-title">

                                    Performance Trend

                                </h2>

                                <div className="chart-toggle">

                                    <button
                                        onClick={() => setChartType("revenue")}
                                        className={`chart-button ${
                                            chartType === "revenue"
                                                ? "chart-button-active revenue-active"
                                                : ""
                                        }`}
                                    >

                                        💰 Revenue

                                    </button>

                                    <button
                                        onClick={() => setChartType("completed")}
                                        className={`chart-button ${
                                            chartType === "completed"
                                                ? "chart-button-active completed-active"
                                                : ""
                                        }`}
                                    >

                                        ✅ Completed

                                    </button>

                                </div>

                            </div>

                            <div className="performance-chart">

                                <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                >

                                    <LineChart
                                        data={
                                            chartType === "revenue"
                                                ? employee.revenueTrend
                                                : employee.completedTrend
                                        }
                                    >

                                        <CartesianGrid strokeDasharray="3 3" />

                                        <XAxis dataKey="month" />

                                        <YAxis />

                                        <Tooltip />

                                        <Line
                                            type="monotone"
                                            dataKey={
                                                chartType === "revenue"
                                                    ? "revenue"
                                                    : "completed"
                                            }
                                            stroke={
                                                chartType === "revenue"
                                                    ? "#2563EB"
                                                    : "#16A34A"
                                            }
                                            strokeWidth={4}
                                        />

                                    </LineChart>

                                </ResponsiveContainer>

                            </div>

                            <div className="performance-metrics">

                                <div className="metric-item">

                                    <div className="metric-header">

                                    <span className="metric-label">

                                        Completion Rate

                                    </span>

                                        <span className="metric-value completion-text">

                                        {employee.completionPercentage}%

                                    </span>

                                    </div>

                                    <div className="progress-track">

                                        <div
                                            className="progress-fill completion-fill"
                                            style={{
                                                width: `${employee.completionPercentage}%`
                                            }}
                                        />

                                    </div>

                                </div>

                                <div className="metric-item">

                                    <div className="metric-header">

                                    <span className="metric-label">

                                        Progress to Best Month

                                    </span>

                                        <span className="metric-value revenue-text">

                                        {revenueProgress.toFixed(0)}%

                                    </span>

                                    </div>

                                    <div className="progress-track">

                                        <div
                                            className="progress-fill revenue-fill"
                                            style={{
                                                width: `${Math.min(revenueProgress,100)}%`
                                            }}
                                        />

                                    </div>

                                    <div className="metric-footer">

                                    <span>

                                        Current : ₹{currentRevenue}

                                    </span>

                                        <span>

                                        Best : ₹{bestRevenue}

                                    </span>

                                    </div>

                                </div>

                            </div>

                        </div>
                        {/* Monthly Statistics */}

                        <div className="monthly-stats-grid">

                            {/* This Month */}

                            <div className="monthly-stat-card">

                                <p className="monthly-stat-label">

                                    This Month

                                </p>

                                <h2 className="monthly-stat-value">

                                    {employee.thisMonthRequests}

                                </h2>

                                <p className="monthly-stat-note">

                                    Requests handled

                                </p>

                            </div>

                            {/* This Month Revenue */}

                            <div className="monthly-stat-card">

                                <p className="monthly-stat-label">

                                    This Month Revenue

                                </p>

                                <h2 className="monthly-stat-value revenue-color">

                                    ₹{employee.monthRevenue}

                                </h2>

                            </div>

                            {/* Best Month */}

                            <div className="monthly-stat-card">

                                <p className="monthly-stat-label">

                                    Best Month

                                </p>

                                <h2 className="monthly-best-month">

                                    {employee.bestMonth}

                                </h2>

                                <p className="monthly-best-revenue">

                                    ₹{bestRevenue}

                                </p>

                            </div>

                            {/* Success Score */}

                            <div className="monthly-stat-card">

                                <p className="monthly-stat-label">

                                    Success Score

                                </p>

                                <h2 className="monthly-stat-value success-color">

                                    {employee.successScore}%

                                </h2>

                            </div>

                        </div>
                        {/* Recent Requests */}

                        <div className="recent-requests-card">

                            <div className="recent-requests-header">

                                <h2 className="recent-requests-title">

                                    Recent Requests

                                </h2>

                                <p className="recent-requests-subtitle">

                                    Latest requests handled by this employee.

                                </p>

                            </div>

                            <table className="recent-requests-table">

                                <thead className="recent-requests-table-header">

                                <tr>

                                    <th className="table-heading">ID</th>

                                    <th className="table-heading">Customer</th>

                                    <th className="table-heading">Service</th>

                                    <th className="table-heading">Amount</th>

                                    <th className="table-heading">Payment</th>

                                    <th className="table-heading">Status</th>

                                </tr>

                                </thead>

                                <tbody>

                                {

                                    employee.recentRequests?.map(request => (

                                        <tr
                                            key={request.id}
                                            className="request-row"
                                        >

                                            <td className="table-cell">

                                                #{request.id}

                                            </td>

                                            <td className="table-cell">

                                                {request.customerName}

                                            </td>

                                            <td className="table-cell">

                                                {request.serviceName}

                                            </td>

                                            <td className="table-cell amount-cell">

                                                {

                                                    request.amount

                                                        ?

                                                        `₹${request.amount}`

                                                        :

                                                        "--"

                                                }

                                            </td>

                                            <td className="table-cell">

                                                {

                                                    request.paymentStatus === "PAID"

                                                        ?

                                                        <span className="payment-badge paid-badge">

                                                            PAID

                                                        </span>

                                                        :

                                                        <span className="payment-badge unpaid-badge">

                                                            UNPAID

                                                        </span>

                                                }

                                            </td>

                                            <td className="table-cell">

                                                <span className="status-badge request-status-badge">

                                                    {request.status}

                                                </span>

                                            </td>

                                        </tr>

                                    ))

                                }

                                </tbody>

                            </table>

                        </div>
                        {/* Performance Insight */}

                        <div className="performance-insight-card">

                            <h2 className="performance-insight-title">

                                Performance Insight

                            </h2>

                            <p className="performance-insight-text">

                                {

                                    revenueProgress >= 100

                                        ?

                                        "🏆 Amazing! You've matched or exceeded your personal best month."

                                        :

                                        revenueProgress >= 80

                                            ?

                                            "🔥 Excellent progress! You're very close to beating your best month."

                                            :

                                            revenueProgress >= 60

                                                ?

                                                "👍 Good performance. Keep pushing toward your personal best."

                                                :

                                                revenueProgress >= 40

                                                    ?

                                                    "📈 You're making steady progress this month. Keep improving."

                                                    :

                                                    "💪 There's plenty of room to improve and surpass your previous best."

                                }

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default EmployeePerformance;