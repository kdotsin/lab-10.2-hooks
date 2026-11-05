import { useState } from "react";
import { usePagination } from "../hooks/usePagination";

const items: string[] = [];
for (let i = 1; i <= 123; i++) {
  items.push(`Item ${i}`);
}

export function PaginationDemo() {
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    itemsOnCurrentPage,
    setPage,
    nextPage,
    prevPage,
    canNextPage,
    canPrevPage,
  } = usePagination({ totalItems: items.length, itemsPerPage });

  // endIndex is inclusive, so slice needs +1
  const pageItems = items.slice(startIndex, endIndex + 1);

  const pageNumbers: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <section>
      <h2>Pagination Demo</h2>

      <label>
        Items per page:{" "}
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setPage(1);
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </label>

      <p>Total items: {items.length}</p>

      <ul>
        {pageItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <button onClick={prevPage} disabled={!canPrevPage}>
        Previous
      </button>
      <span>
        {" "}Page {currentPage} of {totalPages}{" "}
      </span>
      <button onClick={nextPage} disabled={!canNextPage}>
        Next
      </button>

      <p>
        Showing items {startIndex + 1} - {endIndex + 1} (on this page: {itemsOnCurrentPage})
      </p>

      <div>
        {pageNumbers.map((p) => (
          <button key={p} onClick={() => setPage(p)} disabled={p === currentPage}>
            {p}
          </button>
        ))}
      </div>
    </section>
  );
}