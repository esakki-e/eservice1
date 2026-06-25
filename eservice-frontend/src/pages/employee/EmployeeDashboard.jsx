import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
function EmployeeDashboard() {

    const [tasks, setTasks] = useState([]);
    const [documents, setDocuments] = useState({});
    const navigate = useNavigate();
    const [selectedTask, setSelectedTask] = useState(null);

    const [resultFile, setResultFile] = useState(null);
    useEffect(() => {

        const token = localStorage.getItem("token");

        const employeeId =
            localStorage.getItem(
                "employeeId"
            );

        axios.get(
            `http://localhost:8080/employee/tasks/${employeeId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then(res => {
                console.log(
                    "TASKS FROM API:",
                    res.data
                );

                setTasks(res.data);
            })
            .catch(console.error);

    }, []);

    const acceptTask = async (id) => {

        const token = localStorage.getItem("token");

        await axios.post(
            `http://localhost:8080/employee/tasks/${id}/accept`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setTasks(
            tasks.map(task =>
                task.id === id
                    ? {
                        ...task,
                        status: "ACCEPTED"
                    }
                    : task
            )
        );
    };
        const completeTask = async (id) => {

            const token = localStorage.getItem("token");

            await axios.post(
                `http://localhost:8080/employee/tasks/${id}/complete`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            window.location.reload();
        };

        const loadDocuments = async (
            requestId
        ) => {

            const token =
                localStorage.getItem("token");

            const res = await axios.get(
                `http://localhost:8080/documents/request/${requestId}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setDocuments(prev=>({
                ...prev,
                [requestId]: res.data
            }));
        };
    const uploadResultAndComplete = async () => {

        if (!resultFile) {

            alert(
                "Please select a document"
            );

            return;
        }

        const token =
            localStorage.getItem("token");

        const formData =
            new FormData();

        formData.append(
            "file",
            resultFile
        );

        formData.append(
            "taskId",
            selectedTask.id
        );

        await axios.post(
            "http://localhost:8080/employee/tasks/upload-result",
            formData,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`,
                    "Content-Type":
                        "multipart/form-data"
                }
            }
        );

        alert(
            "Request completed"
        );

        setSelectedTask(null);

        window.location.reload();
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-slate-50">

                <div className="max-w-7xl mx-auto p-8">

                    {/* Header */}

                    <div className="mb-8">

                        <h1 className="
                        text-5xl
                        font-bold
                        text-slate-800
                        mb-2
                    ">
                            My Tasks
                        </h1>

                        <p className="
                        text-slate-500
                        text-lg
                    ">
                            Process assigned requests and update their status
                        </p>

                    </div>

                    {/* Stats Cards */}

                    <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-3
                    gap-6
                    mb-8
                ">

                        <div className="
                        bg-white
                        rounded-3xl
                        border
                        border-slate-200
                        p-6
                        shadow-sm
                    ">
                            <div className="text-3xl font-bold text-slate-800">
                                {tasks.length}
                            </div>

                            <div className="text-slate-500 mt-2">
                                Assigned Tasks
                            </div>
                        </div>

                        <div className="
                        bg-white
                        rounded-3xl
                        border
                        border-slate-200
                        p-6
                        shadow-sm
                    ">
                            <div className="text-3xl font-bold text-violet-600">
                                {
                                    tasks.filter(
                                        t => t.status === "ACCEPTED"
                                    ).length
                                }
                            </div>

                            <div className="text-slate-500 mt-2">
                                In Progress
                            </div>
                        </div>

                        <div className="
                        bg-white
                        rounded-3xl
                        border
                        border-slate-200
                        p-6
                        shadow-sm
                    ">
                            <div className="text-3xl font-bold text-emerald-600">
                                {
                                    tasks.filter(
                                        t => t.status === "COMPLETED"
                                    ).length
                                }
                            </div>

                            <div className="text-slate-500 mt-2">
                                Completed
                            </div>
                        </div>

                    </div>

                    {/* Table */}

                    <div className="
                    bg-white
                    rounded-3xl
                    border
                    border-slate-200
                    shadow-sm
                    overflow-hidden
                ">

                        <table className="w-full">

                            <thead className="bg-slate-100">

                            <tr>

                                <th className="p-4 text-left">
                                    ID
                                </th>

                                <th className="p-4 text-left">
                                    Date
                                </th>

                                <th className="p-4 text-left">
                                    Customer
                                </th>

                                <th className="p-4 text-left">
                                    Service
                                </th>

                                <th className="p-4 text-left">
                                    Documents
                                </th>

                                <th className="p-4 text-left">
                                    Status
                                </th>

                                <th className="p-4 text-left">
                                    Action
                                </th>

                            </tr>

                            </thead>

                            <tbody>

                            {tasks.map(task => (

                                <tr
                                    key={task.id}
                                    className="
                                    border-t
                                    border-slate-100
                                    hover:bg-slate-50
                                "
                                >

                                    <td className="p-4 font-semibold">

                                        <Link
                                            to={`/request-details/${task.request.id}`}
                                            className="
                                            text-blue-600
                                            hover:text-blue-800
                                        "
                                        >
                                            #{task.request.id}
                                        </Link>

                                    </td>

                                    <td className="p-4 text-slate-600">

                                        {
                                            new Date(
                                                task.request.createdAt
                                            ).toLocaleString(
                                                "en-IN",
                                                {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                    hour: "numeric",
                                                    minute: "2-digit",
                                                    hour12: true
                                                }
                                            )
                                        }

                                    </td>

                                    <td className="p-4 font-medium">
                                        {task.request.customerName}
                                    </td>

                                    <td className="p-4">
                                        {task.request?.service?.serviceName}
                                    </td>

                                    <td className="p-4">

                                        <button
                                            onClick={() =>
                                                navigate(`/request-details/${task.request.id}`)
                                            }
                                            className="
                                            px-4
                                            py-2
                                            rounded-xl
                                            bg-slate-100
                                            hover:bg-slate-200
                                            text-slate-700
                                            font-medium
                                        "
                                        >
                                            View
                                        </button>

                                    </td>

                                    <td className="p-4">

                                    <span
                                        className={`
                                            px-4
                                            py-2
                                            rounded-full
                                            text-xs
                                            font-semibold
                                            ${
                                            task.status === "COMPLETED"
                                                ? "bg-emerald-100 text-emerald-700"
                                                : task.status === "ACCEPTED"
                                                    ? "bg-violet-100 text-violet-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                        }
                                        `}
                                    >
                                        {task.status}
                                    </span>

                                    </td>

                                    <td className="p-4">

                                        <div className="flex gap-2">

                                            <button
                                                disabled={
                                                    task.status !== "PENDING"
                                                }
                                                onClick={() =>
                                                    acceptTask(task.id)
                                                }
                                                className={`
                                                px-4
                                                py-2
                                                rounded-xl
                                                font-medium
                                                ${
                                                    task.status === "PENDING"
                                                        ? "bg-emerald-500 text-white hover:bg-emerald-600"
                                                        : "bg-slate-200 text-slate-500"
                                                }
                                            `}
                                            >
                                                {task.status === "ACCEPTED"
                                                    ? "Accepted"
                                                    : "Accept"}
                                            </button>

                                            <button
                                                disabled={
                                                    task.status === "COMPLETED"
                                                }
                                                onClick={() =>
                                                    setSelectedTask(task)
                                                }
                                                className="
    px-4
    py-2
    rounded-xl
    bg-blue-600
    text-white
    hover:bg-blue-700
     disabled:bg-slate-300
"
                                            >
                                                Complete
                                            </button>

                                            {
                                                selectedTask && (

                                                    <div
                                                        className="
    fixed
    inset-0
    bg-black/50
    flex
    items-center
    justify-center
    z-50
"
                                                    >

                                                        <div
                                                            className="
        bg-white
        rounded-3xl
        p-6
        w-[450px]
"
                                                        >

                                                            <h3 className="text-xl font-bold mb-4">
                                                                Upload Result Document
                                                            </h3>

                                                            <input
                                                                type="file"
                                                                className="form-control mb-4"
                                                                onChange={(e) =>
                                                                    setResultFile(
                                                                        e.target.files[0]
                                                                    )
                                                                }
                                                            />

                                                            <div className="flex gap-3">

                                                                <button
                                                                    className="
                px-4
                py-2
                rounded-xl
                bg-slate-300
            "
                                                                    onClick={() =>
                                                                        setSelectedTask(null)
                                                                    }
                                                                >
                                                                    Cancel
                                                                </button>

                                                                <button
                                                                    className="
                px-4
                py-2
                rounded-xl
                bg-blue-600
                text-white
            "
                                                                    onClick={() =>
                                                                        uploadResultAndComplete()
                                                                    }
                                                                >
                                                                    Upload & Complete
                                                                </button>

                                                            </div>

                                                        </div>

                                                    </div>

                                                )}
                                        </div>

                                    </td>

                                </tr>

                            ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>
        </>
    );
    }

export default EmployeeDashboard;