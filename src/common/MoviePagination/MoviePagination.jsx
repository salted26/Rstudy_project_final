import React from 'react';
import ReactPaginate from "react-paginate";
import './MoviePagination.style.css'

const MoviePagination = ({ data, setPage, page}) => {

    // Invoke when user click to request another page.
    const handlePageClick = ({selected}) => {
        setPage(selected +1)
    };

    return (
        <>
            <div className="desktop">
                <ReactPaginate
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={2}
                    pageCount={data?.total_pages} // totalCount
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextLabel="next >"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={page - 1}
                />
            </div>
            <div className="mobile">
                <ReactPaginate
                    onPageChange={handlePageClick}
                    pageCount={data?.total_pages} // totalCount
                    containerClassName="mobile-pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={page - 1}
                />
            </div>
        </>
    );
};

export default MoviePagination;