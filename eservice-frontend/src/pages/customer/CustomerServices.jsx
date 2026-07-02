import { useEffect, useState } from "react";
import axios from "axios";
import CustomerNavbar from "../../components/CustomerNavbar";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import {
    getActiveCategories
} from "../../services/serviceCategoryService";
import Pagination from "../../components/Pagination";

function CustomerServices() {

    const [services, setServices] =
        useState([]);
    const [categories, setCategories] = useState([]);

    const [selectedCategory,
        setSelectedCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0);

    const [size, setSize] = useState(9);
    const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [totalElements, setTotalElements] = useState(0);
    const navigate =
        useNavigate();

    useEffect(() => {

        const timer = setTimeout(() => {

            setDebouncedSearch(searchTerm);

            setPage(0);

        }, 400);

        return () => clearTimeout(timer);

    }, [searchTerm]);
    const loadData = async () => {

        try {

            const params = new URLSearchParams();

            params.append("page", page);

            params.append("size", size);

            if (debouncedSearch.trim()) {

                params.append(

                    "search",

                    debouncedSearch.trim()

                );

            }

            const serviceResponse =

                await axios.get(

                    `${API_URL}/services?${params.toString()}`

                );
            console.log(serviceResponse.data);
            setServices(serviceResponse.data.content);

            setTotalPages(serviceResponse.data.totalPages);

            setTotalElements(serviceResponse.data.totalElements);            const categoryResponse =
                await getActiveCategories();

            setCategories(categoryResponse.data);

        }

        catch (e) {

            console.error(e);

        }

    };
    useEffect(() => {

        loadData();

    }, [

        page,

        size,

        debouncedSearch

    ]);
    if (loading) {

        return (
            <>
                <CustomerNavbar />
                <div className="flex justify-center items-center h-96">
                    Loading...
                </div>
            </>
        );

    }

    return (
        <>
            <CustomerNavbar />

            <div className="min-h-screen bg-slate-50">

                <div className="max-w-7xl mx-auto px-6 py-10">

                    {/* Header */}

                    <div className="mb-10">
                        <div className="relative mb-8 max-w-md">

    <span
        className="
        absolute
        left-4
        top-1/2
        -translate-y-1/2
        text-slate-400
    "
    >
        🔍
    </span>

                            <input
                                type="text"
                                placeholder="Search certificates and services..."
                                value={searchTerm}
                                onChange={(e) =>
                                    setSearchTerm(e.target.value)
                                }
                                className="
            w-full
            h-12
            pl-12
            pr-4
            rounded-2xl
            border
            border-slate-300
            bg-white
            shadow-sm
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
        "
                            />

                        </div>
                        <h1 className="
                        text-5xl
                        font-bold
                        text-slate-800
                        mb-2
                    ">
                            Available Services
                        </h1>

                        <p className="
                        text-slate-500
                        text-lg
                    ">
                            Choose a service and begin your application process.
                        </p>
                        <div
                            className="
        flex
        flex-wrap
        gap-3
        mt-8
        mb-10
    "
                        >

                            <button

                                onClick={() =>
                                    setSelectedCategory(null)
                                }

                                className={`
            px-5
            py-2
            rounded-full
            transition

            ${selectedCategory == null

                                    ?

                                    "bg-indigo-600 text-white"

                                    :

                                    "bg-white border"

                                }

        `}
                            >

                                All

                            </button>

                            {

                                categories.map(category => (

                                    <button

                                        key={category.id}

                                        onClick={() =>
                                            setSelectedCategory(category)
                                        }

                                        className={`
                    px-5
                    py-2
                    rounded-full
                    transition

                    ${selectedCategory?.id === category.id

                                            ?

                                            "bg-indigo-600 text-white"

                                            :

                                            "bg-white border"

                                        }

                `}
                                    >

                                        {category.name}

                                    </button>

                                ))

                            }

                        </div>

                    </div>

                    {/* Services Grid */}

                    <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    xl:grid-cols-3
                    gap-6
                ">

                        {services
                            .filter(service => {

                                if (selectedCategory == null) {

                                    return true;

                                }

                                return selectedCategory.serviceIds?.includes(service.id) || false;

                            })
                            .map(service => (
                            <div
                                key={service.id}
                                className="
                                bg-white
                                border
                                border-slate-200
                                rounded-3xl
                                shadow-sm
                                p-6
                                hover:shadow-lg
                                hover:-translate-y-1
                                transition-all
                            "
                            >

                                <div className="
                                flex
                                items-center
                                justify-between
                                mb-5
                            ">

                                    <div className="
                                    w-12
                                    h-12
                                    rounded-2xl
                                    bg-slate-100
                                    flex
                                    items-center
                                    justify-center
                                    text-xl
                                ">
                                        📄
                                    </div>

                                    <span className="
                                    px-3
                                    py-1
                                    rounded-full
                                    text-xs
                                    font-semibold
                                    bg-emerald-100
                                    text-emerald-700
                                ">
                                    Active
                                </span>

                                </div>

                                <h3 className="
                                text-xl
                                font-bold
                                text-slate-800
                                mb-2
                            ">
                                    {service.serviceName}
                                </h3>

                                <p className="
                                text-slate-500
                                mb-6
                                min-h-[48px]
                            ">
                                    {service.description}
                                </p>

                                <button
                                    onClick={() =>
                                        navigate(
                                            `/service-documents/${service.id}`
                                        )
                                    }
                                    className="
                                    w-full
                                    py-3
                                    rounded-2xl
                                    bg-slate-800
                                    text-white
                                    font-semibold
                                    hover:bg-slate-900
                                    transition-all
                                "
                                >
                                    Apply Now →
                                </button>

                            </div>

                        ))}

                    </div>

                </div>
                <Pagination

                    page={page}

                    totalPages={totalPages}

                    totalElements={totalElements}

                    pageSize={size}

                    onPageChange={setPage}

                    onPageSizeChange={(newSize)=>{

                        setSize(newSize);

                        setPage(0);

                    }}

                />
            </div>


        </>
    );
}

export default CustomerServices;