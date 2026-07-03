import { useEffect, useState } from "react";

import DashboardLayout
    from "../../layouts/DashboardLayout";
import {

    getCategories,

    createCategory,

    updateCategory,

    deleteCategory

}
    from "../../services/serviceCategoryService";

import axios from "axios";
import { API_URL } from "../../config";

import "./ServiceCategories.css"
function ServiceCategories() {

    const [categories,
        setCategories] = useState([]);

    const [services,
        setServices] = useState([]);

    const [name,
        setName] = useState("");

    const [selectedServices,
        setSelectedServices] = useState([]);

    const [editingId,
        setEditingId] = useState(null);

    useEffect(() => {

        void loadData();

    }, []);

    const loadData = async () => {

        try {

            const categoryResponse =
                await getCategories();

            setCategories(categoryResponse.data);

            const token =
                localStorage.getItem("token");

            const serviceResponse =
                await axios.get(
                    `${API_URL}/services`,
                    {
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    }
                );

            setServices(serviceResponse.data.content);
            console.log(serviceResponse.data);

        }

        catch(e){

            console.error(e);

            alert("Unable to load data.");

        }

    };

    const toggleService = (id) => {

        if (
            selectedServices.includes(id)
        ) {

            setSelectedServices(

                selectedServices.filter(

                    serviceId =>

                        serviceId !== id

                )

            );

        }

        else {

            setSelectedServices(

                [

                    ...selectedServices,

                    id

                ]

            );

        }

    };
    const saveCategory = async () => {

        if (name.trim() === "") {

            alert("Enter category name");

            return;

        }

        if (selectedServices.length === 0) {

            alert("Select at least one service");

            return;

        }
        const body = {

            name,

            serviceIds: selectedServices,

            active: true

        };

        if (editingId == null) {

            try {

                await createCategory(body);

            }
            catch (e) {

                alert(e.response?.data || "Unable to create category");

                return;

            }
        }

        else {
try {
    await updateCategory(
        editingId,
        body
    );
}
catch (e) {

    alert(e.response?.data || "Unable to update category");

    return;

}

        }

        setName("");

        setSelectedServices([]);

        setEditingId(null);

        await loadData();

    };
    return (

        <DashboardLayout>

            <>

                <div className="page-bg">

                    <div className="category-page">

                        <h1 className="category-page-title">

                            Service Categories

                        </h1>

                        {/* Create Category */}

                        <div className="category-card">

                            <h2 className="category-card-title">

                                Create Category

                            </h2>

                            <input

                                placeholder="Category Name"

                                value={name}

                                onChange={(e)=>

                                    setName(
                                        e.target.value
                                    )

                                }

                                className="category-input"

                            />

                            <h3 className="category-section-title">

                                Select Services

                            </h3>

                            <div className="services-selection-grid">

                                {

                                    services.map(service => (

                                        <label

                                            key={service.id}

                                            className="service-option"

                                        >

                                            <input

                                                type="checkbox"

                                                checked={
                                                    selectedServices.includes(
                                                        service.id
                                                    )
                                                }

                                                onChange={()=>

                                                    toggleService(
                                                        service.id
                                                    )

                                                }

                                            />

                                            {service.serviceName}

                                        </label>

                                    ))

                                }

                            </div>

                            <div className="category-actions">

                                <p className="selected-count">

                                    Selected Services:

                                    {selectedServices.length}

                                </p>

                                <button

                                    disabled={
                                        name.trim()===""
                                    }

                                    onClick={saveCategory}

                                    className="save-category-button"

                                >

                                    {

                                        editingId == null

                                            ?

                                            "Create Category"

                                            :

                                            "Update Category"

                                    }

                                </button>

                            </div>

                        </div>

                        {/* Existing Categories */}

                        <div className="category-card">

                            <h2 className="category-card-title">

                                Existing Categories

                            </h2>

                            {

                                categories.length === 0

                                    ?

                                    <p className="empty-category">

                                        No categories created.

                                    </p>

                                    :

                                    categories.map(category => (

                                        <div

                                            key={category.id}

                                            className="category-item"

                                        >

                                            <div>

                                                <h3 className="category-name">

                                                    {category.name}

                                                </h3>

                                                <p className="category-service-count">

                                                    {

                                                        category.serviceIds?.length || 0

                                                    }

                                                    {" "}Services

                                                </p>

                                            </div>

                                            <div className="category-buttons">

                                                <button

                                                    onClick={()=>{

                                                        setEditingId(

                                                            category.id

                                                        );

                                                        setName(

                                                            category.name

                                                        );

                                                        setSelectedServices(

                                                            category.serviceIds || []

                                                        );

                                                        window.scrollTo({

                                                            top:0,

                                                            behavior:"smooth"

                                                        });

                                                    }}

                                                    className="edit-category-button"

                                                >

                                                    Edit

                                                </button>

                                                <button

                                                    onClick={async()=>{

                                                        if(

                                                            window.confirm(

                                                                "Delete this category?"

                                                            )

                                                        ){

                                                            try{

                                                                await deleteCategory(category.id);

                                                                await loadData();

                                                            }

                                                            catch(e){

                                                                alert("Unable to delete category");

                                                            }

                                                        }

                                                    }}

                                                    className="delete-category-button"

                                                >

                                                    Delete

                                                </button>

                                            </div>

                                        </div>

                                    ))

                            }

                        </div>

                    </div>

                </div>

            </>

        </DashboardLayout>

    );

}

export default ServiceCategories;