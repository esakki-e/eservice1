import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import EmployeeLayout from "../../layouts/EmployeeLayout";

import {
    getMyProfile,
    updateMyProfile,
    uploadProfileImage
} from "../../services/employeeProfileService";

import { API_URL } from "../../config";

function EmployeeProfileEdit() {

    const navigate = useNavigate();

    const [employee, setEmployee] = useState(null);

    const [selectedImage, setSelectedImage] = useState(null);

    const [preview, setPreview] = useState("");
    const [saving, setSaving] = useState(false);
    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        const data = await getMyProfile();

        setEmployee(data);

    };

    const handleChange = (e) => {

        setEmployee({

            ...employee,

            [e.target.name]: e.target.value

        });

    };

    const handleSave = async () => {

        setSaving(true);

        try {

            await updateMyProfile(employee);

            if (selectedImage) {

                await uploadProfileImage(selectedImage);

            }

            navigate("/employee/profile");

        }

        finally {

            setSaving(false);

        }

    };

    if (!employee)
        return <div>Loading...</div>;

    return (

        <EmployeeLayout>

            <div className="max-w-7xl mx-auto py-10 px-6">

                <div
                    className="
                    bg-white
                    rounded-[32px]
                    shadow-2xl
                    overflow-hidden
                    relative
                "
                >

                    {/* Banner */}

                    <div
                        className="
                        h-40
                        bg-gradient-to-r
                        from-indigo-600
                        via-blue-500
                        to-cyan-500
                    "
                    />

                    {/* Header */}

                    <div
                        className="
                        flex
                        justify-between
                        items-start
                        px-10
                        -mt-16
                    "
                    >

                        <div className="flex gap-8">

                            <div className="relative">

                                <img
                                    src={
                                        preview
                                            ? preview
                                            : employee.profileImage
                                                ? `${API_URL}/uploads/employees/${employee.profileImage}`
                                                : "/default-avatar.png"
                                    }
                                    alt="Profile"
                                    className="
                                        w-40
                                        h-40
                                        rounded-3xl
                                        object-cover
                                        border-4
                                        border-white
                                        shadow-2xl
                                        bg-white
                                    "
                                />

                                <label
                                    htmlFor="profileImage"
                                    className="
                                        absolute
                                        bottom-2
                                        right-2
                                        w-11
                                        h-11
                                        rounded-full
                                        bg-white
                                        shadow-lg
                                        flex
                                        items-center
                                        justify-center
                                        cursor-pointer
                                        hover:scale-110
                                        transition
                                    "
                                >
                                    📷
                                </label>

                                <input
                                    id="profileImage"
                                    type="file"
                                    hidden
                                    onChange={(e) => {

                                        const file = e.target.files[0];

                                        if (!file) return;

                                        setSelectedImage(file);

                                        setPreview(
                                            URL.createObjectURL(file)
                                        );

                                    }
                                    }
                                />

                            </div>

                            <div className="pt-20">

                                <h1
                                    className="
                                    text-5xl
                                    font-bold
                                    text-slate-900
                                "
                                >
                                    Edit Profile
                                </h1>

                                <p
                                    className="
                                    text-slate-500
                                    text-xl
                                    mt-2
                                "
                                >
                                    Update your information
                                </p>

                            </div>

                        </div>

                        <button
                            onClick={() =>
                                navigate("/employee/profile")
                            }
                            className="
                                mt-20
                                h-14
                                px-8
                                rounded-2xl
                                bg-slate-900
                                text-white
                                font-semibold
                                hover:bg-slate-800
                                transition
                            "
                        >
                            ← Back
                        </button>

                    </div>

                    <div className="grid grid-cols-2 gap-8 px-10 py-10">

                        {/* Name */}

                        <div>

                            <label className="block mb-2 font-semibold">
                                Name
                            </label>

                            <input
                                name="name"
                                value={employee.name || ""}
                                onChange={handleChange}
                                className="
                                    w-full
                                    h-14
                                    px-5
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    focus:outline-none
                                    focus:ring-4
                                    focus:ring-blue-100
                                "
                            />

                        </div>

                        {/* Email */}

                        <div>

                            <label className="block mb-2 font-semibold">
                                Email
                            </label>

                            <input
                                name="email"
                                value={employee.email || ""}
                                onChange={handleChange}
                                className="
                                    w-full
                                    h-14
                                    px-5
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    focus:outline-none
                                    focus:ring-4
                                    focus:ring-blue-100
                                "
                            />

                        </div>

                        {/* Phone */}

                        <div>

                            <label className="block mb-2 font-semibold">
                                Phone Number
                            </label>

                            <input
                                value={employee.phoneNumber || ""}
                                disabled
                                className="
                                    w-full
                                    h-14
                                    px-5
                                    rounded-2xl
                                    border
                                    bg-slate-100
                                    text-slate-500
                                "
                            />

                        </div>
                        {/* Date Of Birth */}

                        <div>

                            <label className="block mb-2 font-semibold">
                                Date of Birth
                            </label>

                            <input
                                type="date"
                                name="dob"
                                value={employee.dob || ""}
                                onChange={handleChange}
                                className="
                                    w-full
                                    h-14
                                    px-5
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    focus:outline-none
                                    focus:ring-4
                                    focus:ring-blue-100
                                "
                            />

                        </div>

                        {/* Gender */}

                        <div>

                            <label className="block mb-2 font-semibold">
                                Gender
                            </label>

                            <select
                                name="gender"
                                value={employee.gender || ""}
                                onChange={handleChange}
                                className="
                                    w-full
                                    h-14
                                    px-5
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    focus:outline-none
                                    focus:ring-4
                                    focus:ring-blue-100
                                "
                            >

                                <option value="">
                                    Select Gender
                                </option>

                                <option value="Male">
                                    Male
                                </option>

                                <option value="Female">
                                    Female
                                </option>

                                <option value="Other">
                                    Other
                                </option>

                            </select>

                        </div>

                        {/* Joining Date */}

                        <div>

                            <label className="block mb-2 font-semibold">
                                Date of Joining
                            </label>

                            <input
                                type="date"
                                value={employee.joinedDate || ""}
                                disabled
                                className="
                                    w-full
                                    h-14
                                    px-5
                                    rounded-2xl
                                    border
                                    bg-slate-100
                                    text-slate-500
                                    cursor-not-allowed
                                "
                            />

                        </div>

                        {/* Address */}

                        <div className="col-span-2">

                            <label className="block mb-2 font-semibold">
                                Address
                            </label>

                            <textarea
                                rows={5}
                                name="address"
                                value={employee.address || ""}
                                onChange={handleChange}
                                className="
                                    w-full
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    p-5
                                    resize-none
                                    focus:outline-none
                                    focus:ring-4
                                    focus:ring-blue-100
                                "
                            />

                        </div>

                    </div>

                    {/* Footer */}

                    <div
                        className="
                            flex
                            justify-end
                            gap-4
                            px-10
                            pb-10
                        "
                    >

                        <button
                            onClick={() =>
                                navigate("/employee/profile")
                            }
                            className="
                                h-14
                                px-8
                                rounded-2xl
                                border
                                border-slate-300
                                font-semibold
                                hover:bg-slate-100
                                transition
                            "
                        >
                            ✕ Cancel
                        </button>

                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="
        bg-blue-600
        hover:bg-blue-700
        disabled:bg-blue-400
        text-white
        px-8
        py-3
        rounded-xl
        font-semibold
        transition
    "
                        >
                            {saving ? "Saving..." : "✔ Save Changes"}
                        </button>

                    </div>

                </div>

            </div>

        </EmployeeLayout>

    );

}

export default EmployeeProfileEdit;