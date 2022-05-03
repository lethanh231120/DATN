import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const Paginate = (props) => {
  const { currentPage, handleChangePage, pages } = props
  return (
    <div className="pagination-wrapper">
      <Pagination aria-label="Page navigation example">
        <PaginationItem disabled={currentPage <= 0}>
          <PaginationLink
            onClick={e => handleChangePage(e, currentPage - 1)}
            previous
            href="#"
          />
        </PaginationItem>
          {[...Array(pages).keys()].map((page, i) => (
            <PaginationItem active={i === currentPage} key={i}>
              <PaginationLink onClick={(e) => handleChangePage(e, i)} href="#">
                {i + 1}
              </PaginationLink>
            </PaginationItem>
        ))}
        <PaginationItem disabled={currentPage >= pages - 1}>
          <PaginationLink
            onClick={e => handleChangePage(e, currentPage + 1)}
            next
            href="#"
          />
        </PaginationItem>
      </Pagination>
    </div>
  )
}
export default Paginate
