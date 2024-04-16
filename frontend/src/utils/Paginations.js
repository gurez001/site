import React from 'react'
import Pagination from "react-js-pagination";

export const Paginations = ({totalItemsCount,activePage,itemsCountPerPage,handlePageChange}) => {
  return (
    <div className="pagination-box">
    <Pagination
      totalItemsCount={totalItemsCount}
      activePage={activePage}
      itemsCountPerPage={itemsCountPerPage}
      onChange={handlePageChange}
      nextPageText="Next"
      prevPageText="Prev"
      firstPageText="1st"
      lastPageText="Last"
      itemClass="page-items"
      linkClass="page-link"
      activeClass="pageItemActive"
      activeLinkClass="pageLinkActive"
    />
  </div>
  )
}
