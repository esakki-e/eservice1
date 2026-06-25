import { useEffect, useState } from "react";
import axios from "axios";
//import { useParams } from "react-router-dom";
import {
    useParams,
    useNavigate,Link
} from "react-router-dom";

function ServiceFieldManager() {

    const { serviceId } = useParams();

    const [fields, setFields] =
        useState([]);

    const [fieldName, setFieldName] =
        useState("");

    const [fieldType, setFieldType] =
        useState("TEXT");

    const [requiredField,
        setRequiredField] =
        useState(true);

    const [editingId,
        setEditingId] =
        useState(null);
    const navigate =
        useNavigate();

    useEffect(() => {

        loadFields();

    }, []);

    const loadFields = async () => {

        const response =
            await axios.get(
                `http://localhost:8080/service-form-fields/service/${serviceId}`
            );

        setFields(
            response.data
        );
    };

    const saveField = async () => {

        if (editingId) {

            await axios.put(
                `http://localhost:8080/service-form-fields/${editingId}`,
                {
                    serviceId,
                    fieldName,
                    fieldType,
                    requiredField
                }
            );

        } else {

            await axios.post(
                "http://localhost:8080/service-form-fields",
                {
                    serviceId,
                    fieldName,
                    fieldType,
                    requiredField
                }
            );
        }

        setFieldName("");
        setFieldType("TEXT");
        setRequiredField(true);
        setEditingId(null);

        loadFields();
    };
    const startEdit = (field) => {

        setEditingId(
            field.id
        );

        setFieldName(
            field.fieldName
        );

        setFieldType(
            field.fieldType
        );

        setRequiredField(
            field.requiredField
        );
    };
    const deleteField = async (id) => {

        if (
            !window.confirm(
                "Delete this field?"
            )
        ) {
            return;
        }

        await axios.delete(
            `http://localhost:8080/service-form-fields/${id}`
        );

        loadFields();
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-8">

            <button
                onClick={() => navigate("/services")}
                className="
                mb-6
                px-4
                py-2
                rounded-xl
                bg-slate-700
                text-white
                hover:bg-slate-800
                transition
            "
            >
                ← Back to Services
            </button>

            <div
                className="
                bg-white
                rounded-3xl
                border
                shadow-sm
                p-8
                mb-6
            "
            >
                <h1
                    className="
                    text-3xl
                    font-bold
                    text-slate-800
                    mb-6
                "
                >
                    Manage Service Fields
                </h1>

                <div className="grid md:grid-cols-4 gap-4">

                    <input
                        className="
                        border
                        rounded-xl
                        px-4
                        py-3
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                    "
                        placeholder="Field Name"
                        value={fieldName}
                        onChange={(e) =>
                            setFieldName(e.target.value)
                        }
                    />

                    <select
                        className="
                        border
                        rounded-xl
                        px-4
                        py-3
                    "
                        value={fieldType}
                        onChange={(e) =>
                            setFieldType(e.target.value)
                        }
                    >
                        <option value="TEXT">
                            Text
                        </option>

                        <option value="NUMBER">
                            Number
                        </option>

                        <option value="DATE">
                            Date
                        </option>
                    </select>

                    <label
                        className="
                        flex
                        items-center
                        gap-2
                        px-4
                        py-3
                        border
                        rounded-xl
                    "
                    >
                        <input
                            type="checkbox"
                            checked={requiredField}
                            onChange={(e) =>
                                setRequiredField(
                                    e.target.checked
                                )
                            }
                        />

                        Required
                    </label>

                    <div className="flex gap-2">

                        <button
                            onClick={saveField}
                            className="
                            flex-1
                            bg-blue-600
                            text-white
                            rounded-xl
                            px-4
                            py-3
                            hover:bg-blue-700
                        "
                        >
                            {editingId
                                ? "Update Field"
                                : "Add Field"}
                        </button>

                        {editingId && (
                            <button
                                onClick={() => {
                                    setEditingId(null);
                                    setFieldName("");
                                    setFieldType("TEXT");
                                    setRequiredField(true);
                                }}
                                className="
                                bg-slate-500
                                text-white
                                rounded-xl
                                px-4
                                py-3
                            "
                            >
                                Cancel
                            </button>
                        )}

                    </div>

                </div>
            </div>

            <div
                className="
                bg-white
                rounded-3xl
                border
                shadow-sm
                overflow-hidden
            "
            >

                <div className="p-6 border-b">
                    <h2
                        className="
                        text-xl
                        font-bold
                        text-slate-800
                    "
                    >
                        Configured Fields
                    </h2>
                </div>

                {fields.length === 0 ? (

                    <div className="p-10 text-center text-slate-500">
                        No fields configured yet
                    </div>

                ) : (

                    fields.map(field => (

                        <div
                            key={field.id}
                            className="
                            flex
                            justify-between
                            items-center
                            p-5
                            border-b
                            last:border-b-0
                        "
                        >

                            <div>

                                <h4
                                    className="
                                    font-semibold
                                    text-slate-800
                                "
                                >
                                    {field.fieldName}
                                </h4>

                                <p
                                    className="
                                    text-sm
                                    text-slate-500
                                "
                                >
                                    {field.fieldType}
                                    {" • "}
                                    {field.requiredField
                                        ? "Required"
                                        : "Optional"}
                                </p>

                            </div>

                            <div className="flex gap-2">

                                <button
                                    onClick={() =>
                                        startEdit(field)
                                    }
                                    className="
                                    px-4
                                    py-2
                                    rounded-xl
                                    bg-amber-500
                                    text-white
                                "
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        deleteField(field.id)
                                    }
                                    className="
                                    px-4
                                    py-2
                                    rounded-xl
                                    bg-red-500
                                    text-white
                                "
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>
    );
}

export default ServiceFieldManager;