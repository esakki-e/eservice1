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

            <div className="p-8">

                <h1
                    className="
                        text-4xl
                        font-bold
                        mb-8
                    "
                >

                    Service Categories

                </h1>

                <div
                    className="
                        bg-white
                        rounded-3xl
                        shadow
                        p-8
                        mb-8
                    "
                >

                    <h2
                        className="
                            text-2xl
                            font-semibold
                            mb-6
                        "
                    >

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

                        className="
                            w-full
                            border
                            rounded-xl
                            p-3
                            mb-6
                        "

                    />

                    <h3
                        className="
                            font-semibold
                            mb-4
                        "
                    >

                        Select Services

                    </h3>

                    <div
                        className="
                            grid
                            grid-cols-2
                            gap-3
                        "
                    >

                        {

                            services.map(service=>(

                                <label

                                    key={service.id}

                                    className="
                                        flex
                                        gap-3
                                        border
                                        rounded-xl
                                        p-3
                                    "

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
                    <div className="mt-8">
                        <p className="text-sm text-slate-500 mb-4">

                            Selected Services:

                            {selectedServices.length}

                        </p>
                        <button
                            disabled={
                                name.trim()===""
                            }
                            onClick={saveCategory}

                            className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-8
            py-3
            rounded-xl
            disabled:opacity-50
disabled:cursor-not-allowed
        "

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

                <div
                    className="
                        bg-white
                        rounded-3xl
                        shadow
                        p-8
                    "
                >

                    <h2
                        className="
                            text-2xl
                            font-semibold
                            mb-6
                        "
                    >

                        Existing Categories

                    </h2>



                        {

                            categories.length === 0

                                ?

                                <p className="text-slate-500">

                                    No categories created.

                                </p>

                                :

                                categories.map(category=>(

                            <div

                                key={category.id}

                                className="
                                    border-b
                                    py-5
                                    flex
                                    justify-between
                                "

                            >

                                <div>

                                    <h3
                                        className="
                                            text-xl
                                            font-semibold
                                        "
                                    >

                                        {category.name}

                                    </h3>

                                    <p>

                                        {

                                            category.serviceIds?.length || 0

                                        }

                                        {" "}Services

                                    </p>

                                </div>

                                <div
                                    className="
                                        flex
                                        gap-3
                                    "
                                >

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

                                        className="
bg-blue-500
text-white
px-4
rounded-lg
"

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

                                        className="
bg-red-500
text-white
px-4
rounded-lg
"

                                    >

                                        Delete

                                    </button>

                                </div>

                            </div>

                        ))

                    }

                </div>

            </div>

            </>

        </DashboardLayout>

    );

}

export default ServiceCategories;