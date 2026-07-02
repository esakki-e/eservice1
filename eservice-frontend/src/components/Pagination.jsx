import { useEffect, useState } from "react";

function Pagination({

                        page,

                        totalPages,

                        totalElements,

                        pageSize,

                        onPageChange,

                        onPageSizeChange

                    }) {

    const [jumpPage, setJumpPage] = useState(page + 1);

    useEffect(() => {

        setJumpPage(page + 1);

    }, [page]);

    if (totalPages <= 1) return null;

    const start = page * pageSize + 1;

    const end = Math.min(

        (page + 1) * pageSize,

        totalElements

    );

    const visiblePages = [];

    if (totalPages <= 7) {

        for (let i = 0; i < totalPages; i++) {

            visiblePages.push(i);

        }

    }

    else {

        visiblePages.push(0);

        if (page > 2) {

            visiblePages.push("left");

        }

        for (

            let i = Math.max(1, page - 1);

            i <= Math.min(totalPages - 2, page + 1);

            i++

        ) {

            visiblePages.push(i);

        }

        if (page < totalPages - 3) {

            visiblePages.push("right");

        }

        visiblePages.push(totalPages - 1);

    }

    return (

        <div className="

    mt-10

    bg-slate-50

    rounded-2xl

    border

    border-slate-200

    p-6

    shadow-sm

    flex

    flex-col

    gap-6

">

            <div className="

                flex

                flex-wrap

                items-center

                justify-between
                md:items-center
                gap-4

            ">

                <div className="

                    text-slate-600

                    font-medium

                ">

                    Showing Results
                    <span className="font-bold text-slate-800">

                        {" "}{start}

                    </span>

                    -

                    <span className="font-bold text-slate-800">

                        {" "}{end}

                    </span>

                    {" "}of{" "}

                    <span className="font-bold text-indigo-600">

                        {totalElements}

                    </span>

                    {" "}requests

                </div>

                {

                    onPageSizeChange && (

                        <div className="

                            flex

                            items-center

                            gap-3

                        ">

                            <span className="text-slate-500">

                                Rows per Page

                            </span>

                            <select

                                value={pageSize}

                                onChange={(e)=>

                                    onPageSizeChange(

                                        Number(e.target.value)

                                    )

                                }

                                className="

h-11

px-4

rounded-xl

border

bg-white

hover:border-indigo-500

focus:ring-2

focus:ring-indigo-500

outline-none

transition

"

                            >

                                <option value={10}>10</option>

                                <option value={25}>25</option>

                                <option value={50}>50</option>

                                <option value={100}>100</option>

                            </select>

                        </div>

                    )

                }

            </div>

            <div className="

                flex

                flex-wrap

                justify-center

                items-center

                gap-2

            ">

                <button

                    disabled={page===0}

                    onClick={()=>onPageChange(page-1)}

                    className="

                        w-12

                        h-12

                        rounded-xl

                        border

                        bg-white

                        hover:bg-slate-100

                        disabled:opacity-40

                        transition
transition-all

duration-200

ease-in-out
                         active:scale-95

                    "

                >

                    ←

                </button>

                {

                    visiblePages.map((p,index)=>{

                        if(

                            p==="left"

                            ||

                            p==="right"

                        ){

                            return(

                                <span

                                    key={index}

                                    className="

w-12

text-center

text-slate-400

font-bold

"

                                >

                                    ...

                                </span>

                            );

                        }

                        return(

                            <button

                                key={p}

                                onClick={()=>onPageChange(p)}

                                className={`

                                    h-12

                                    w-12

                                    rounded-xl

                                    transition-all

                                    duration-300

                                    font-semibold
transition-all

duration-200

ease-in-out
                                    active:scale-95

                                    ${

                                    page===p

                                        ?

                                        "border bg-white hover:bg-indigo-50 hover:border-indigo-400"

                                        :

                                        "border bg-white hover:bg-slate-100"

                                }

                                `}

                            >

                                {p+1}

                            </button>

                        );

                    })

                }

                <button

                    disabled={page===totalPages-1}

                    onClick={()=>onPageChange(page+1)}

                    className="

                        w-12

                        h-12

                        rounded-xl

                        border

                        bg-white

                        hover:bg-slate-100

                        disabled:opacity-40

                        transition
                        hover:scale-105

active:scale-95

                    "

                >

                     →

                </button>

            </div>

            <div className="

flex

flex-wrap

justify-center

items-center

gap-3

">

                <span className="text-slate-500">

                    Go to page

                </span>

                <input

                    type="number"

                    min={1}

                    max={totalPages}

                    value={jumpPage}

                    onChange={(e)=>

                        setJumpPage(

                            e.target.value

                        )

                    }

                    className="
w-20

h-11

text-center

border

rounded-xl

focus:ring-2

focus:ring-indigo-500

outline-none

                    "

                />

                <button

                    onClick={()=>{

                        const target=

                            Number(jumpPage)-1;

                        if(

                            target>=0

                            &&

                            target<totalPages

                        ){

                            onPageChange(target);

                        }

                    }}

                    className="

                        px-6

                        h-11

                        rounded-xl

                        bg-indigo-600

                        text-white

                        hover:bg-indigo-700

                    "

                >

                    Go

                </button>

            </div>

        </div>

    );

}

export default Pagination;