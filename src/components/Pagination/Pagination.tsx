import css from "./Pagination.module.css";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalPages?: number;
}

export default function Pagination({
  page,
  setPage,
  totalPages,
}: PaginationProps) {
  const handlePageClick = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1);
  };

  return (
    <ReactPaginate
      pageCount={totalPages ?? 0}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      forcePage={page - 1}
      onPageChange={handlePageClick}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}
