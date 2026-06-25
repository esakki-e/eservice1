import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import DashboardLayout
    from "../../layouts/DashboardLayout";
import { API_URL } from "../../config";
function Dashboard() {

    const [dashboard, setDashboard] =
        useState({});
    const [animatedDashboard, setAnimatedDashboard] = useState({
        totalServices: 0,
        totalRequests: 0,
        totalEmployees: 0,
        pendingTasks: 0,
        completedTasks: 0,
        todayRequests: 0
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
                        : prev.todayRequests

            }));

        }, 50);

        return () => clearInterval(interval);

    }, [dashboard]);
    return (<DashboardLayout>
        <>


            <div className="max-w-7xl mx-auto">
                <div className="mb-4">
                    <h2 className="text-5xl font-bold text-slate-900">                        Admin Dashboard
                    </h2>

                    <p className="text-slate-500 mt-2 text-lg">                        Monitor services, requests,
                        employees and analytics.
                    </p>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                    <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all border-t-4 border-blue-500">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-slate-500 text-sm font-medium">
                                    Total Services
                                </p>

                                <h2 className="text-5xl font-bold mt-3 text-slate-900">
                                    {animatedDashboard.totalServices}                                </h2>

                                <p className="text-emerald-600 text-sm mt-2">
                                    Active services
                                </p>
                            </div>

                            <div className="text-5xl">
                                🛠️
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all border-t-4 border-violet-500">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-slate-500 text-sm font-medium">
                                    Total Requests
                                </p>

                                <h2 className="text-5xl font-bold mt-3 text-slate-900">
                                    {animatedDashboard.totalRequests}                                </h2>

                                <p className="text-indigo-600 text-sm mt-2">
                                    Applications received
                                </p>
                            </div>

                            <div className="text-5xl">
                                📄
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all border-t-4 border-cyan-500">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-slate-500 text-sm font-medium">
                                    Employees
                                </p>

                                <h2 className="text-5xl font-bold mt-3 text-slate-900">
                                    {animatedDashboard.totalEmployees}                                </h2>

                                <p className="text-cyan-600 text-sm mt-2">
                                    Active workforce
                                </p>
                            </div>

                            <div className="text-5xl">
                                👨‍💼
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all border-t-4 border-indigo-500">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-slate-500 text-sm font-medium">
                                    Today's Requests
                                </p>

                                <h2 className="text-5xl font-bold mt-3 text-indigo-600">
                                    {animatedDashboard.todayRequests}                                </h2>
                            </div>

                            <div className="text-5xl">
                                📅
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all border-t-4 border-orange-500">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-slate-500 text-sm font-medium">
                                    Pending Tasks
                                </p>

                                <h2 className="text-5xl font-bold mt-3 text-orange-500">
                                    {animatedDashboard.pendingTasks}                                </h2>
                            </div>

                            <div className="text-5xl">
                                ⏳
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all border-t-4 border-emerald-500">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-slate-500 text-sm font-medium">
                                    Completed Tasks
                                </p>

                                <h2 className="text-5xl font-bold mt-3 text-emerald-600">
                                    {animatedDashboard.completedTasks}                                </h2>
                            </div>

                            <div className="text-5xl">
                                ✅
                            </div>
                        </div>
                    </div>



                </div>                <div
                className="
mt-8
rounded-3xl
overflow-hidden
shadow-xl
bg-gradient-to-r
from-blue-600
via-indigo-600
to-violet-600
text-white
cursor-pointer
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
    mt-6
    rounded-3xl
    bg-gradient-to-r
    from-blue-600
    via-indigo-600
    to-purple-600
    p-8
    shadow-xl
    text-white
    flex
    items-center
    justify-between
"
                        >

                            <div>

                                <h3 className="text-3xl font-bold">
                                    Service Analytics
                                </h3>

                                <p className="text-blue-100 mt-2">


                                    {
                                        Math.min(analytics.length, 3)
                                    } Top Services

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

                                            analytics.slice(0, 3).map((item, index) => (

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
        </DashboardLayout>
    );
}
export default Dashboard;