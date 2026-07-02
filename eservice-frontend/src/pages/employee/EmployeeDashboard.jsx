import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import {Link} from "react-router-dom";
import Pagination from "../../components/Pagination";
import { useNavigate } from "react-router-dom";import { API_URL } from "../../config";



function EmployeeDashboard() {
    const [tasks, setTasks] = useState([]);
   // const [documents, setDocuments] = useState({});
    const navigate = useNavigate();
    const [selectedTask, setSelectedTask] = useState(null);

    const [resultFile, setResultFile] = useState(null);
    const [paymentTask, setPaymentTask] = useState(null);
    const [paymentAmount, setPaymentAmount] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("UNPAID");

    const [showNotifyModal, setShowNotifyModal] = useState(false);

    const [completedTask, setCompletedTask] = useState(null);
    const [page, setPage] = useState(0);

    const [size, setSize] = useState(10);

    const [totalPages, setTotalPages] = useState(0);

    const [totalElements, setTotalElements] = useState(0);

    const [searchName, setSearchName] = useState("");

    const [searchPhone, setSearchPhone] = useState("");

    const [statusFilter, setStatusFilter] = useState("ALL");

    const [debouncedSearchName, setDebouncedSearchName] = useState("");

    const [debouncedSearchPhone, setDebouncedSearchPhone] = useState("");

    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState({

        pendingTasks: 0,

        assignedTasks: 0,

        inProgressTasks: 0,

        completedTasks: 0

    });
    useEffect(() => {

        const timer = setTimeout(() => {

            setDebouncedSearchName(searchName);

        }, 500);

        return () => clearTimeout(timer);

    }, [searchName]);
    useEffect(() => {

        const timer = setTimeout(() => {

            setDebouncedSearchPhone(searchPhone);

        }, 400);

        return () => clearTimeout(timer);

    }, [searchPhone]);
    const loadTasks = async () => {

        try {

            const token = localStorage.getItem("token");

            const employeeId =

                localStorage.getItem("employeeId");

            const params = new URLSearchParams();

            params.append("page", String(page));
            params.append("size", String(size));

            if (debouncedSearchName.trim()) {

                params.append(

                    "search",

                    debouncedSearchName.trim()

                );

            }

            if (debouncedSearchPhone.trim()) {

                params.append(

                    "phone",

                    debouncedSearchPhone.trim()

                );

            }

            if (statusFilter !== "ALL") {

                params.append(

                    "status",

                    statusFilter

                );

            }

            setLoading(true);

            const response = await axios.get(

                `${API_URL}/employee/tasks/${employeeId}?${params.toString()}`,

                {

                    headers: {

                        Authorization:

                            `Bearer ${token}`

                    }

                }

            );
            setTasks(response.data.content ?? []);
            setTotalPages(response.data.totalPages);

            setTotalElements(response.data.totalElements);

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setLoading(false);

        }

    };
    const loadStats = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response = await axios.get(

                `${API_URL}/employee/tasks/dashboard/stats`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            setStats(response.data);

        }

        catch (err) {

            console.error(err);

        }

    };
    const acceptTask = async (id) => {

        const token = localStorage.getItem("token");
        try {
            await axios.post(
                `${API_URL}/employee/tasks/${id}/accept`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            await loadTasks();

            await loadStats();

        }catch(err){

            console.error(err);

            alert("Unable to accept task.");

        }
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

        formData.append("file",resultFile);

        //formData.append(
          //  "taskId",
            //selectedTask.id
        //);
        formData.append(
            "requestId",
            String(selectedTask.request.id)
        );

        formData.append(
            "isResult",
            "true"
        );
        await axios.post(
            `${API_URL}/documents/upload`,
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

        await axios.post(

            `${API_URL}/employee/tasks/${selectedTask.id}/complete`,

            {},

            {

                headers: {

                    Authorization:
                        `Bearer ${token}`

                }

            }

        );
        await loadTasks();

        await loadStats();
        setCompletedTask(selectedTask);

        setSelectedTask(null);

        setResultFile(null);

        setShowNotifyModal(true);

        console.log(selectedTask);
    };const savePayment = async () => {

        if (
            paymentStatus === "PAID"
            &&
            paymentAmount === ""
        ) {

            alert(
                "Enter amount"
            );

            return;
        }

        const token =
            localStorage.getItem("token");

        await axios.post(

            `${API_URL}/requests/${paymentTask.request.id}/payment`,

            null,

            {

                params: {

                    status:
                    paymentStatus,

                    amount:
                        paymentAmount === ""
                            ? 0
                            : Number(paymentAmount)

                },

                headers: {

                    Authorization:
                        `Bearer ${token}`

                }

            }

        );
        await loadTasks();

        await loadStats();

        alert(
            "Payment Updated"
        );

        setPaymentTask(null);

        loadTasks();
    };
    const getWhatsappMessage = () => {

        return `🎉 Vinayaga E-Service

Dear ${completedTask.request.customerName},

Your request for "${completedTask?.request?.service?.serviceName}" has been completed successfully.

Please login to download your result.

${window.location.origin}/customer-login

Thank you.`;

    };
    const openWhatsApp = () => {

        const phone = completedTask.request.phoneNumber
            .replace(/\D/g, "");

        const fullPhone = phone.startsWith("91")
            ? phone
            : `91${phone}`;

        const message = encodeURIComponent(getWhatsappMessage());

        window.open(
            `https://web.whatsapp.com/send?phone=${fullPhone}&text=${message}`,
            "_blank"
        );
    };

    const copyMessage = async () => {

        await navigator.clipboard.writeText(
            getWhatsappMessage()
        );

        alert("Message copied.");

    };

    const closeNotifyModal = () => {

        setShowNotifyModal(false);

        setCompletedTask(null);

        void loadTasks();
    };
    useEffect(() => {

        void loadTasks();


    }, [

        page,

        size,

        debouncedSearchName,

        debouncedSearchPhone,

        statusFilter

    ]);
    useEffect(() => {

        setPage(0);

    }, [

        debouncedSearchName,

        debouncedSearchPhone,

        statusFilter

    ]);
    useEffect(() => {

        void loadStats();

    }, []);
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
                    md:grid-cols-2
                    xl:grid-cols-4
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
                                {stats.pendingTasks}
                            </div>

                            <div className="text-slate-500 mt-2">
                                Pending Tasks
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

                                    {stats.assignedTasks}

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
                            <div className="text-3xl font-bold text-emerald-600">

                                    {stats.inProgressTasks}

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
                                {stats.completedTasks}
                            </div>

                            <div className="text-slate-500 mt-2">
                                Completed
                            </div>
                        </div>

                    </div>
                    <div className="grid md:grid-cols-3 gap-4 mb-6">

                        <input
                            type="text"
                            placeholder="Search Customer"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                            className="border rounded-xl px-4 py-3"
                        />

                        <input
                            type="text"
                            placeholder="Search Phone"
                            value={searchPhone}
                            onChange={(e) => setSearchPhone(e.target.value)}
                            className="border rounded-xl px-4 py-3"
                        />

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="border rounded-xl px-4 py-3"
                        >

                            <option value="ALL">All Status</option>

                            <option value="PENDING">Pending</option>

                            <option value="ACCEPTED">Accepted</option>

                            <option value="IN_PROGRESS">In Progress</option>

                            <option value="COMPLETED">Completed</option>

                        </select>

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
                                    Amount
                                </th>
                                <th className="p-4 text-left">
                                    Payment
                                </th>

                                <th className="p-4 text-left">
                                    Action
                                </th>

                            </tr>

                            </thead>

                            <tbody>

                            {loading && (
                                <tr>
                                    <td colSpan="9" className="text-center py-8">
                                        Loading...
                                    </td>
                                </tr>
                            )}

                            {!loading && tasks.length === 0 && (
                                <tr>
                                    <td colSpan="9" className="text-center py-8">
                                        No tasks found.
                                    </td>
                                </tr>
                            )}

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

                                        ₹ {(task.request.amount ?? 0).toLocaleString("en-IN")}
                                    </td>

                                    <td className="p-4">

                                        {task.request.paymentStatus === "PAID" ? (

                                            <span className="
            px-3
            py-2
            rounded-full
            bg-emerald-100
            text-emerald-700
            text-xs
            font-semibold
        ">
            PAID
        </span>

                                        ) : (

                                            <span className="
            px-3
            py-2
            rounded-full
            bg-red-100
            text-red-700
            text-xs
            font-semibold
        ">
            UNPAID
        </span>

                                        )}

                                    </td>

                                    <td className="p-4">

                                        <div className="flex gap-2">

                                            {/* STEP 1 : ACCEPT */}

                                            {task.status === "PENDING" && (

                                                <button
                                                    onClick={() => acceptTask(task.id)}
                                                    className="
                    px-5
                    py-2
                    rounded-xl
                    bg-emerald-500
                    text-white
                    hover:bg-emerald-600
                "
                                                >
                                                    Accept
                                                </button>

                                            )}

                                            {/* STEP 2 : PAYMENT */}

                                            {task.status === "ACCEPTED" &&
                                                task.request.paymentStatus !== "PAID" && (

                                                    <button

                                                        onClick={() => {

                                                            setPaymentTask(task);

                                                            setPaymentAmount(
                                                                task.request.amount ?? ""
                                                            );

                                                            setPaymentStatus(
                                                                task.request.paymentStatus ?? "UNPAID"
                                                            );

                                                        }}

                                                        className="
                        px-5
                        py-2
                        rounded-xl
                        bg-amber-500
                        text-white
                        hover:bg-amber-600
                    "
                                                    >

                                                        Payment

                                                    </button>

                                                )}

                                            {/* STEP 3 : COMPLETE */}

                                            {task.status === "ACCEPTED" &&
                                                task.request.paymentStatus === "PAID" && (

                                                    <button

                                                        onClick={() =>
                                                            setSelectedTask(task)
                                                        }

                                                        className="
                        px-5
                        py-2
                        rounded-xl
                        bg-blue-600
                        text-white
                        hover:bg-blue-700
                    "

                                                    >

                                                        Complete

                                                    </button>

                                                )}

                                            {/* COMPLETED */}

                                            {task.status === "COMPLETED" && (

                                                <button

                                                    disabled

                                                    className="
                    px-5
                    py-2
                    rounded-xl
                    bg-emerald-600
                    text-white
                    cursor-default
                "

                                                >

                                                    Completed

                                                </button>

                                            )}

                                        </div>

                                    </td>

                                </tr>

                            ))}

                            </tbody>

                        </table>
                        <Pagination

                            page={page}

                            totalPages={totalPages}

                            size={size}

                            setPage={setPage}

                            setSize={setSize}

                            totalElements={totalElements}

                        />
                    </div>

                </div>

            </div>
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
                            <div
                                className="
        bg-blue-50
        border
        border-blue-200
        rounded-xl
        p-4
        mb-5
    "
                            >

                                <p className="font-semibold text-blue-700">

                                    Customer

                                </p>

                                <p className="text-slate-700">

                                    {selectedTask?.request.customerName}

                                </p>

                                <hr className="my-3"/>

                                <p className="font-semibold text-blue-700">

                                    Service

                                </p>

                                <p className="text-slate-700">

                                    {selectedTask?.request.service?.serviceName}

                                </p>

                            </div>

                            <div className="mb-6">

                                <label
                                    className="
            block
            font-semibold
            text-slate-700
            mb-2
        "
                                >
                                    Result Document
                                </label>

                                <input

                                    type="file"

                                    className="
            w-full
            border
            rounded-xl
            px-4
            py-3
        "

                                    onChange={(e)=>

                                        setResultFile(
                                            e.target.files?.[0] || null
                                        )

                                    }

                                />

                            </div>

                            <div
                                className="
        flex
        justify-end
        gap-3
    "
                            >

                                <button

                                    onClick={()=>{
                                        setSelectedTask(null);
                                        setResultFile(null);
                                    }}

                                    className="
            px-5
            py-3
            rounded-xl
            border
            hover:bg-slate-100
        "

                                >

                                    Cancel

                                </button>

                                <button

                                    onClick={uploadResultAndComplete}

                                    className="
            px-6
            py-3
            rounded-xl
            bg-blue-600
            text-white
            hover:bg-blue-700
        "

                                >

                                    Upload & Complete

                                </button>

                            </div>

                        </div>

                    </div>

                )}{
                paymentTask && (

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
                    shadow-2xl
                    w-full
                    max-w-md
                    p-6
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
                                Update Payment
                            </h2>

                            <div className="mb-4">

                                <label
                                    className="
                            block
                            text-sm
                            font-semibold
                            mb-2
                            text-slate-700
                        "
                                >
                                    Amount (₹)
                                </label>

                                <input
                                    type="number"
                                    className="
        w-full
        border
        rounded-xl
        px-4
        py-3
        focus:ring-2
        focus:ring-blue-500
        outline-none
        disabled:bg-slate-100
    "
                                    placeholder="Enter Amount"
                                    value={paymentAmount}
                                    disabled={paymentStatus === "PAID"}
                                    onChange={(e) =>
                                        setPaymentAmount(e.target.value)
                                    }
                                />

                            </div>

                            <div className="mb-6">

                                <label
                                    className="
                            block
                            text-sm
                            font-semibold
                            mb-2
                            text-slate-700
                        "
                                >
                                    Payment Status
                                </label>

                                <select
                                    className="
        w-full
        border
        rounded-xl
        px-4
        py-3
        focus:ring-2
        focus:ring-blue-500
        outline-none
    "
                                    value={paymentStatus}
                                    disabled={paymentStatus === "PAID"}
                                    onChange={(e) =>
                                        setPaymentStatus(e.target.value)
                                    }
                                >
                                    <option value="UNPAID">Unpaid</option>
                                    <option value="PAID">Paid</option>
                                </select>

                            </div>

                            <div
                                className="
                        flex
                        justify-end
                        gap-3
                    "
                            >

                                <button

                                    onClick={() =>
                                        setPaymentTask(
                                            null
                                        )
                                    }

                                    className="
                            px-5
                            py-3
                            rounded-xl
                            border
                            hover:bg-slate-100
                        "

                                >
                                    Cancel
                                </button>

                                <button

                                    onClick={savePayment}

                                    className="
                            px-6
                            py-3
                            rounded-xl
                            bg-emerald-600
                            text-white
                            hover:bg-emerald-700
                        "

                                >
                                    Save Payment
                                </button>

                            </div>

                        </div>

                    </div>

                )
            }
            {
                showNotifyModal && completedTask && (

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
                    shadow-2xl
                    w-full
                    max-w-lg
                    p-8
                "
                        >

                            <div className="text-center">

                                <div className="text-6xl mb-4">
                                    ✅
                                </div>

                                <h2 className="text-3xl font-bold">

                                    Request Completed

                                </h2>

                                <p className="text-slate-500 mt-3">

                                    The result has been uploaded successfully.

                                </p>

                            </div>

                            <div
                                className="
                        bg-slate-50
                        rounded-2xl
                        p-5
                        mt-8
                        mb-8
                    "
                            >

                                <p>

                        <span className="font-bold">

                            Customer

                        </span>

                                    <br/>

                                    {completedTask.request.customerName}

                                </p>

                                <hr className="my-4"/>

                                <p>

                        <span className="font-bold">

                            Phone

                        </span>

                                    <br/>

                                    {completedTask.request.phoneNumber}

                                </p>

                                <hr className="my-4"/>

                                <p>

                        <span className="font-bold">

                            Service

                        </span>

                                    <br/>

                                    {completedTask?.request?.service?.serviceName}

                                </p>

                            </div>

                            <div className="space-y-3">

                                <button

                                    onClick={openWhatsApp}

                                    className="
                            w-full
                            py-3
                            rounded-2xl
                            bg-green-600
                            hover:bg-green-700
                            text-white
                            font-bold
                        "

                                >

                                    📱 Open WhatsApp

                                </button>

                                <button

                                    onClick={copyMessage}

                                    className="
                            w-full
                            py-3
                            rounded-2xl
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            font-bold
                        "

                                >

                                    📋 Copy Message

                                </button>

                                <button

                                    onClick={closeNotifyModal}

                                    className="
                            w-full
                            py-3
                            rounded-2xl
                            border
                            hover:bg-slate-100
                        "

                                >

                                    Close

                                </button>

                            </div>

                        </div>

                    </div>

                )
            }
        </>
    );
    }

export default EmployeeDashboard;