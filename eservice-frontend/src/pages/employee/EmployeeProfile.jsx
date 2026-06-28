import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getMyProfile } from "../../services/employeeProfileService";
import EmployeeLayout from "../../layouts/EmployeeLayout";
import { API_URL } from "../../config";

export default function EmployeeProfile() {

    const navigate = useNavigate();

    const [employee, setEmployee] = useState(null);

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        const data = await getMyProfile();

        setEmployee(data);

    };

    if (!employee) {

        return (
            <EmployeeLayout>
                <div className="text-center mt-20 text-xl">
                    Loading...
                </div>
            </EmployeeLayout>
        );

    }

    return (

        <EmployeeLayout>

            <div className="max-w-6xl mx-auto py-10 px-6">
                <div className="
                    bg-white
rounded-[32px]
shadow-2xl
overflow-hidden
relative
                ">

                    {/* Banner */}

                    <div className="h-40 bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-500"></div>

                    {/* Profile Image */}

                    <div className="
absolute
left-8
top-24
w-32
h-32
bg-white
rounded-3xl
shadow-2xl
overflow-hidden
">


                    <img
                            src={
                                employee.profileImage
                                    ? `${API_URL}/uploads/employees/${employee.profileImage}`
                                    : "/default-avatar.png"
                            }
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />

                    </div>

                    {/* Edit Button */}

                    <button
                        onClick={() => navigate("/employee/profile/edit")}
                        className="
                        absolute
                        right-10
                        top-32
                        bg-slate-900
                        text-white
                        px-10
                        py-5
                        font-semibold
                        hover:bg-slate-800
                        ">
                        ✏️ Edit Profile
                    </button>

                    {/* Name */}

                    <div className="ml-52 mt-8">

                        <h1 className="text-5xl font-bold">
                            {employee.name}
                        </h1>

                        <p className="text-slate-500 text-xl mt-2">
                            Employee Profile
                        </p>

                        <div className="mt-5">

        <span className="
        px-6
        py-2
        rounded-full
        bg-green-100
        text-green-700
        font-medium
        ">

            ✓ Active Employee

        </span>

                        </div>

                    </div>

                    {/* Details */}

                    <div className="grid grid-cols-2 gap-6 p-10">

                        <div className="border rounded-3xl p-8">

                            <p className="text-slate-500">

                                Phone Number

                            </p>

                            <h3 className="text-3xl font-semibold mt-3">

                                {employee.phoneNumber}

                            </h3>

                        </div>

                        <div className="border rounded-3xl p-8">

                            <p className="text-slate-500">

                                Email

                            </p>

                            <h3 className="text-3xl font-semibold mt-3">

                                {employee.email || "-"}

                            </h3>

                        </div>

                        <div className="border rounded-3xl p-8">

                            <p className="text-slate-500">

                                Date Of Birth

                            </p>

                            <h3 className="text-3xl font-semibold mt-3">

                                {employee.dob || "-"}

                            </h3>

                        </div>

                        <div className="border rounded-3xl p-8">

                            <p className="text-slate-500">

                                Gender

                            </p>

                            <h3 className="text-3xl font-semibold mt-3">

                                {employee.gender || "-"}

                            </h3>

                        </div>

                    </div>

                </div>

                {/* Additional Information */}

                <div
                    className="
                        bg-white
                        rounded-[30px]
                        shadow-xl
                        mt-8
                        p-10
                    "
                >

                    <h2 className="text-4xl font-bold mb-8">

                        Additional Information

                    </h2>

                    <div className="space-y-6">

                        <div className="flex justify-between border-b pb-4">

                            <span className="text-slate-500">

                                Address

                            </span>

                            <span className="font-semibold">

                                {employee.address || "-"}

                            </span>

                        </div>

                        <div className="flex justify-between border-b pb-4">

                            <span className="text-slate-500">

                                Joined Date

                            </span>

                            <span className="font-semibold">

                                {employee.joinedDate || "-"}

                            </span>

                        </div>

                        <div className="flex justify-between border-b pb-4">

                            <span className="text-slate-500">

                                Employee ID

                            </span>

                            <span className="font-semibold">

                                #{employee.id}

                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span className="text-slate-500">

                                Status

                            </span>

                            <span className="text-green-600 font-semibold">

                                Active

                            </span>

                        </div>

                    </div>

                </div>

            </div>

        </EmployeeLayout>

    );

}