import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import DashboardLayout
    from "../../layouts/DashboardLayout";

import { API_URL }
    from "../../config";

function EmployeePerformance() {

    const { id } =
        useParams();

    const [employee,
        setEmployee] =
        useState(null);


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

                <div className="
                    min-h-screen
                    flex
                    items-center
                    justify-center
                    text-xl
                    text-slate-500
                ">

                    Loading Employee...

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

            <div className="
                min-h-screen
                bg-slate-50
                p-8
            ">

                <div className="
                    max-w-7xl
                    mx-auto
                ">

                    {/* Back */}

                    <Link
                        to="/employees"
                        className="
                            inline-flex
                            items-center
                            gap-2
                            text-blue-600
                            font-medium
                            hover:text-blue-800
                            mb-6
                        "
                    >
                        ← Back to Employees
                    </Link>

                    {/* Header */}

                    <div
                        className="
                            bg-white
                            rounded-3xl
                            shadow-sm
                            border
                            p-8
                            mb-8
                        "
                    >

                        <div
                            className="
                                flex
                                flex-col
                                md:flex-row
                                justify-between
                                items-start
                            "
                        >

                            <div
                                className="
                                    flex
                                    gap-6
                                    items-center
                                "
                            >

                                <div
                                    className="
                                        w-24
                                        h-24
                                        rounded-full
                                        bg-blue-600
                                        text-white
                                        flex
                                        items-center
                                        justify-center
                                        text-4xl
                                        font-bold
                                    "
                                >

                                    {
                                        employee.name
                                            ?.charAt(0)
                                            ?.toUpperCase()
                                    }

                                </div>

                                <div>

                                    <h1
                                        className="
                                            text-4xl
                                            font-bold
                                            text-slate-800
                                        "
                                    >
                                        {employee.name}
                                    </h1>

                                    <p
                                        className="
                                            text-slate-500
                                            mt-2
                                        "
                                    >
                                        Employee ID :
                                        {" "}
                                        #{employee.id}
                                    </p>

                                    <p
                                        className="
                                            text-slate-500
                                        "
                                    >
                                        {employee.phoneNumber}
                                    </p>

                                </div>

                            </div>

                            <div
                                className="
                                    mt-6
                                    md:mt-0
                                "
                            >

                                <span
                                    className={
                                        employee.active
                                            ?
                                            `
                                            px-5
                                            py-2
                                            rounded-full
                                            bg-emerald-100
                                            text-emerald-700
                                            font-semibold
                                            `
                                            :
                                            `
                                            px-5
                                            py-2
                                            rounded-full
                                            bg-red-100
                                            text-red-700
                                            font-semibold
                                            `
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

                    <div
                        className="
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            xl:grid-cols-3
                            gap-6
                            mb-8
                        "
                    >

                        {/* Assigned */}

                        <div
                            className="
                                bg-white
                                rounded-3xl
                                shadow-sm
                                border
                                p-6
                            "
                        >

                            <p
                                className="
                                    text-slate-500
                                    text-sm
                                "
                            >
                                Assigned Tasks
                            </p>

                            <h2
                                className="
                                    text-5xl
                                    font-bold
                                    text-blue-600
                                    mt-3
                                "
                            >
                                {
                                    employee.assignedTasks
                                }
                            </h2>

                        </div>

                        {/* Completed */}

                        <div
                            className="
                                bg-white
                                rounded-3xl
                                shadow-sm
                                border
                                p-6
                            "
                        >

                            <p
                                className="
                                    text-slate-500
                                    text-sm
                                "
                            >
                                Completed Tasks
                            </p>

                            <h2
                                className="
                                    text-5xl
                                    font-bold
                                    text-emerald-600
                                    mt-3
                                "
                            >
                                {
                                    employee.completedTasks
                                }
                            </h2>

                        </div>

                        {/* Pending */}

                        <div
                            className="
                                bg-white
                                rounded-3xl
                                shadow-sm
                                border
                                p-6
                            "
                        >

                            <p
                                className="
                                    text-slate-500
                                    text-sm
                                "
                            >
                                Pending Tasks
                            </p>

                            <h2
                                className="
                                    text-5xl
                                    font-bold
                                    text-orange-500
                                    mt-3
                                "
                            >
                                {
                                    employee.pendingTasks
                                }
                            </h2>

                        </div>

                        {/* In Progress */}

                        <div
                            className="
                                bg-white
                                rounded-3xl
                                shadow-sm
                                border
                                p-6
                            "
                        >

                            <p
                                className="
                                    text-slate-500
                                    text-sm
                                "
                            >
                                In Progress
                            </p>

                            <h2
                                className="
                                    text-5xl
                                    font-bold
                                    text-violet-600
                                    mt-3
                                "
                            >
                                {
                                    employee.inProgressTasks
                                }
                            </h2>

                        </div>

                        {/* This Month */}

                        <div
                            className="
                                bg-white
                                rounded-3xl
                                shadow-sm
                                border
                                p-6
                            "
                        >

                            <p
                                className="
                                    text-slate-500
                                    text-sm
                                "
                            >
                                This Month
                            </p>

                            <h2
                                className="
                                    text-5xl
                                    font-bold
                                    text-cyan-600
                                    mt-3
                                "
                            >
                                {
                                    employee.thisMonthRequests
                                }
                            </h2>

                        </div>

                        {/* Completion */}

                        <div
                            className="
                                bg-white
                                rounded-3xl
                                shadow-sm
                                border
                                p-6
                            "
                        >

                            <p
                                className="
                                    text-slate-500
                                    text-sm
                                "
                            >
                                Completion Rate
                            </p>

                            <h2
                                className="
                                    text-5xl
                                    font-bold
                                    text-green-600
                                    mt-3
                                "
                            >
                                {
                                    employee.completionPercentage
                                }%
                            </h2>

                        </div>

                    </div>
                    {/* Revenue & Performance */}

                    <div
                        className="
                            grid
                            grid-cols-1
                            lg:grid-cols-3
                            gap-6
                            mb-8
                        "
                    >

                        {/* Total Revenue */}

                        <div
                            className="
                                bg-white
                                rounded-3xl
                                border
                                shadow-sm
                                p-6
                            "
                        >

                            <p
                                className="
                                    text-slate-500
                                    text-sm
                                "
                            >
                                Total Revenue
                            </p>

                            <h2
                                className="
                                    text-4xl
                                    font-bold
                                    text-green-600
                                    mt-3
                                "
                            >
                                ₹
                                {
                                    employee.totalRevenue
                                }
                            </h2>

                            <p
                                className="
                                    text-green-600
                                    mt-3
                                    text-sm
                                "
                            >
                                Revenue generated
                            </p>

                        </div>

                        {/* Paid Requests */}

                        <div
                            className="
                                bg-white
                                rounded-3xl
                                border
                                shadow-sm
                                p-6
                            "
                        >

                            <p
                                className="
                                    text-slate-500
                                    text-sm
                                "
                            >
                                Paid Requests
                            </p>

                            <h2
                                className="
                                    text-4xl
                                    font-bold
                                    text-blue-600
                                    mt-3
                                "
                            >
                                {
                                    employee.paidRequests
                                }
                            </h2>

                            <p
                                className="
                                    text-blue-600
                                    mt-3
                                    text-sm
                                "
                            >
                                Successfully collected
                            </p>

                        </div>

                        {/* Avg Revenue */}

                        <div
                            className="
                                bg-white
                                rounded-3xl
                                border
                                shadow-sm
                                p-6
                            "
                        >

                            <p
                                className="
                                    text-slate-500
                                    text-sm
                                "
                            >
                                Average Revenue
                            </p>

                            <h2
                                className="
                                    text-4xl
                                    font-bold
                                    text-violet-600
                                    mt-3
                                "
                            >
                                ₹
                                {
                                    Number(employee.averageRevenue || 0).toFixed(2)
                                }
                            </h2>

                            <p
                                className="
                                    text-violet-600
                                    mt-3
                                    text-sm
                                "
                            >
                                Per completed request
                            </p>

                        </div>

                    </div>

                    {/* Performance */}

                    <div
                        className="
                            bg-white
                            rounded-3xl
                            border
                            shadow-sm
                            p-8
                            mb-8
                        "
                    >

                        <h2
                            className="
                                text-2xl
                                font-bold
                                text-slate-800
                                mb-6
                            "
                        >
                            Performance Overview
                        </h2>

                        <div
                            className="
                                space-y-6
                            "
                        >

                            {/* Completion */}

                            <div>

                                <div
                                    className="
                                        flex
                                        justify-between
                                        mb-2
                                    "
                                >

                                    <span
                                        className="
                                            font-medium
                                        "
                                    >
                                        Completion Rate
                                    </span>

                                    <span
                                        className="
                                            text-green-600
                                            font-semibold
                                        "
                                    >
                                        {
                                            employee.completionPercentage
                                        }%
                                    </span>

                                </div>

                                <div
                                    className="
                                        h-3
                                        rounded-full
                                        bg-slate-200
                                    "
                                >

                                    <div
                                        className="
                                            h-3
                                            rounded-full
                                            bg-green-500
                                        "
                                        style={{
                                            width:
                                                `${employee.completionPercentage}%`
                                        }}
                                    />

                                </div>

                            </div>

                            {/* Progress to Best Month */}

                            <div>

                                <div
                                    className="
            flex
            justify-between
            mb-2
        "
                                >

        <span className="font-medium">
            Progress to Best Month
        </span>

                                    <span
                                        className="
                text-blue-600
                font-semibold
            "
                                    >
            {revenueProgress.toFixed(0)}%
        </span>

                                </div>

                                <div
                                    className="
            h-3
            rounded-full
            bg-slate-200
        "
                                >

                                    <div
                                        className="
                h-3
                rounded-full
                bg-blue-500
                transition-all
            "
                                        style={{
                                            width: `${Math.min(revenueProgress, 100)}%`
                                        }}
                                    />

                                </div>

                                <div
                                    className="
            flex
            justify-between
            mt-3
            text-sm
            text-slate-500
        "
                                >

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

                    <div
                        className="
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            xl:grid-cols-4
                            gap-6
                            mb-8
                        "
                    >

                        <div
                            className="
                                bg-white
                                rounded-3xl
                                shadow-sm
                                border
                                p-6
                            "
                        >

                            <p className="text-slate-500">
                                This Month
                            </p>

                            <h2
                                className="
                                    text-4xl
                                    font-bold
                                    mt-2
                                "
                            >
                                {
                                    employee.thisMonthRequests
                                }
                            </h2>

                            <p
                                className="
                                    text-sm
                                    text-slate-500
                                    mt-2
                                "
                            >
                                Requests handled
                            </p>

                        </div>

                        <div
                            className="
                                bg-white
                                rounded-3xl
                                shadow-sm
                                border
                                p-6
                            "
                        >

                            <p className="text-slate-500">
                                This Month Revenue
                            </p>

                            <h2
                                className="
                                    text-4xl
                                    font-bold
                                    text-green-600
                                    mt-2
                                "
                            >
                                ₹
                                {
                                    employee.monthRevenue
                                }
                            </h2>

                        </div>

                        <div
                            className="
                                bg-white
                                rounded-3xl
                                shadow-sm
                                border
                                p-6
                            "
                        >

                            <p className="text-slate-500">
                                Best Month
                            </p>

                            <h2
                                className="
        text-3xl
        font-bold
        text-indigo-600
        mt-2
    "
                            >
                                {employee.bestMonth}
                            </h2>

                            <p
                                className="
        text-green-600
        font-semibold
        mt-3
    "
                            >
                                ₹{bestRevenue}
                            </p>

                        </div>

                        <div
                            className="
                                bg-white
                                rounded-3xl
                                shadow-sm
                                border
                                p-6
                                "
                        >

                            <p className="text-slate-500">
                                Success Score
                            </p>

                            <h2
                                className="
                                text-4xl
                                font-bold
                                text-emerald-600
                                mt-2
                                "
                            >
                                {
                                    employee.successScore
                                }
                                %
                            </h2>

                        </div>

                    </div>
                    {/* Recent Requests */}

                    <div
                        className="
                            bg-white
                            rounded-3xl
                            shadow-sm
                            border
                            overflow-hidden
                            mb-8
                        "
                    >

                        <div
                            className="
                                p-6
                                border-b
                            "
                        >

                            <h2
                                className="
                                    text-2xl
                                    font-bold
                                    text-slate-800
                                "
                            >
                                Recent Requests
                            </h2>

                            <p
                                className="
                                    text-slate-500
                                    mt-1
                                "
                            >
                                Latest requests handled by this employee.
                            </p>

                        </div>

                        <table
                            className="w-full"
                        >

                            <thead
                                className="bg-slate-50"
                            >

                            <tr>

                                <th className="text-left p-4">
                                    ID
                                </th>

                                <th className="text-left p-4">
                                    Customer
                                </th>

                                <th className="text-left p-4">
                                    Service
                                </th>

                                <th className="text-left p-4">
                                    Amount
                                </th>

                                <th className="text-left p-4">
                                    Payment
                                </th>

                                <th className="text-left p-4">
                                    Status
                                </th>

                            </tr>

                            </thead>

                            <tbody>

                            {
                                employee.recentRequests?.map(request => (

                                    <tr
                                        key={request.id}
                                        className="
                                            border-t
                                            hover:bg-slate-50
                                        "
                                    >

                                        <td className="p-4">
                                            #{request.id}
                                        </td>

                                        <td className="p-4">
                                            {request.customerName}
                                        </td>

                                        <td className="p-4">
                                            {request.serviceName}
                                        </td>

                                        <td className="p-4 font-semibold text-green-600">
                                            {request.amount ? `₹${request.amount}` : "--"}                                        </td>

                                        <td className="p-4">

                                            {
                                                request.paymentStatus === "PAID"

                                                    ?

                                                    <span
                                                        className="
                                                            px-3
                                                            py-1
                                                            rounded-full
                                                            bg-green-100
                                                            text-green-700
                                                            text-sm
                                                            font-semibold
                                                        "
                                                    >
                                                        PAID
                                                    </span>

                                                    :

                                                    <span
                                                        className="
                                                            px-3
                                                            py-1
                                                            rounded-full
                                                            bg-red-100
                                                            text-red-700
                                                            text-sm
                                                            font-semibold
                                                        "
                                                    >
                                                        UNPAID
                                                    </span>

                                            }

                                        </td>

                                        <td className="p-4">

                                            <span
                                                className="
                                                    px-3
                                                    py-1
                                                    rounded-full
                                                    bg-blue-100
                                                    text-blue-700
                                                    text-sm
                                                    font-semibold
                                                "
                                            >

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

                    <div
                        className="
                            bg-gradient-to-r
                            from-blue-600
                            to-indigo-600
                            rounded-3xl
                            p-8
                            text-white
                            shadow-xl
                            mb-8
                        "
                    >

                        <h2
                            className="
                                text-2xl
                                font-bold
                            "
                        >
                            Performance Insight
                        </h2>

                        <p
                            className="
                                mt-3
                                text-blue-100
                                leading-7
                            "
                        >

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

        </DashboardLayout>

    );

}

export default EmployeePerformance;