import { useEffect, useState } from "react";
import "./Pagination.css";

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

        <div className="pagination-container">

            <div className="pagination-header">

                <div className="pagination-info">

                    Showing Results

                    <span className="pagination-highlight">

                    {" "}{start}

                </span>

                    -

                    <span className="pagination-highlight">

                    {" "}{end}

                </span>

                    {" "}of{" "}

                    <span className="pagination-total">

                    {totalElements}

                </span>

                    {" "}requests

                </div>

                {

                    onPageSizeChange && (

                        <div className="page-size-selector">

                        <span className="page-size-label">

                            Rows per Page

                        </span>

                            <select

                                value={pageSize}

                                onChange={(e)=>

                                    onPageSizeChange(

                                        Number(e.target.value)

                                    )

                                }

                                className="page-size-dropdown"

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

            <div className="pagination-controls">

                <button

                    disabled={page===0}

                    onClick={()=>onPageChange(page-1)}

                    className="pagination-arrow"

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

                                    className="pagination-dots"

                                >

                                ...

                            </span>

                            );

                        }

                        return(

                            <button

                                key={p}

                                onClick={()=>onPageChange(p)}

                                className={`pagination-page-button ${
                                    page===p
                                        ? "pagination-page-active"
                                        : ""
                                }`}

                            >

                                {p+1}

                            </button>

                        );

                    })

                }

                <button

                    disabled={page===totalPages-1}

                    onClick={()=>onPageChange(page+1)}

                    className="pagination-arrow"

                >

                    →

                </button>

            </div>

            <div className="pagination-jump">

            <span className="pagination-jump-label">

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

                    className="pagination-input"

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

                    className="pagination-go-button"

                >

                    Go

                </button>

            </div>

        </div>

    );

}

export default Pagination;