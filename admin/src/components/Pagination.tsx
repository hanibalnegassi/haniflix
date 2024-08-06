import * as React from "react";

import ReactPaginate from "react-paginate";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const Pagination = (props) => {
    const { pageCount, pageRangeDisplayed, onPageChange, itemsPerPage } = props;

    return (
        <div className="my-4">
            <ReactPaginate
                breakLabel="..."
                nextLabel={
                    <div className="flex gap-2 items-center">
                        <span>Next</span>
                        <MdOutlineArrowForwardIos />
                    </div>
                }
                onPageChange={onPageChange}
                pageRangeDisplayed={pageRangeDisplayed ? pageRangeDisplayed : 4}
                pageCount={pageCount}
                previousLabel={
                    <div className="flex gap-2 items-center">
                        <MdOutlineArrowBackIos />
                        <span>Previous</span>
                    </div>
                }
                renderOnZeroPageCount={null}
                containerClassName="flex flex-wrap sm:flex-nowrap gap-y-1"
                pageClassName="h-[36px] w-[36px] shadow-sm mx-[1px] rounded-sm flex bg-[#F1F1F1] "
                activeClassName="!bg-[#5569ff] text-white"
                nextClassName="ml-[3px] shadow-sm rounded-[3px] flex items-center justify-center px-3 bg-[#F1F1F1]"
                previousClassName="mr-[3px] shadow-sm rounded-[3px] flex items-center justify-center px-3 bg-[#F1F1F1]"
                pageLinkClassName="w-full h-full flex items-center justify-center"
            />
        </div>
    );
};

export default Pagination;
