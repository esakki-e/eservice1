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

        <div>
            <Link
                to="/services"
                className="btn btn-secondary mb-3"
            >
                ← Back to Services
            </Link>
            <h2>
                Manage Service Fields
            </h2>

            <input
                placeholder="Field Name"
                value={fieldName}
                onChange={(e) =>
                    setFieldName(
                        e.target.value
                    )
                }
            />

            <select
                value={fieldType}
                onChange={(e) =>
                    setFieldType(
                        e.target.value
                    )
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

            <label>

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


            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "10px"
                }}
            >

                <button
                    onClick={saveField}
                >
                    {
                        editingId
                            ? "Update Field"
                            : "Add Field"
                    }
                </button>

                {
                    editingId && (

                        <button
                            onClick={() => {

                                setEditingId(null);
                                setFieldName("");
                                setFieldType("TEXT");
                                setRequiredField(true);

                            }}
                        >
                            Cancel
                        </button>

                    )
                }

            </div>

            <hr />
            {
                fields.map(field => (

                    <div
                        key={field.id}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "10px"
                        }}
                    >

                        <div>

                            <strong>
                                {field.fieldName}
                            </strong>

                            {" "}
                            ({field.fieldType})

                        </div>

                        <div>

                            <button
                                onClick={() =>
                                    startEdit(field)
                                }
                            >
                                Edit
                            </button>

                            <button
                                onClick={() =>
                                    deleteField(
                                        field.id
                                    )
                                }
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                ))
            }

        </div>

    );
}

export default ServiceFieldManager;