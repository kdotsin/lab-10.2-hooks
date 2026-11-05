import { useState } from "react";
import { usePagination } from "../hooks/usePagination";

const items: string[] = [];
for (let i = 1; i <= 123; i++) {
  items.push(`Item ${i}`);
}

const navButton =
  "rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 " +
  "hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white";

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

  const pageItems = items.slice(startIndex, endIndex + 1);

  const pageNumbers: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Pagination Demo</h2>

      <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
        <label className="flex items-center gap-2">
          Items per page:
          <select
            className="rounded-md border border-slate-300 bg-white px-2 py-1"
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
        <span>Total items: {items.length}</span>
      </div>

      <ul className="my-4 divide-y divide-slate-100 rounded-md border border-slate-200">
        {pageItems.map((item) => (
          <li key={item} className="px-3 py-2 text-sm text-slate-700">
            {item}
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between">
        <button className={navButton} onClick={prevPage} disabled={!canPrevPage}>
          Previous
        </button>
        <span className="text-sm font-medium text-slate-700">
          Page {currentPage} of {totalPages}
        </span>
        <button className={navButton} onClick={nextPage} disabled={!canNextPage}>
          Next
        </button>
      </div>

      <p className="mt-3 text-center text-xs text-slate-500">
        Showing items {startIndex + 1} - {endIndex + 1} (on this page: {itemsOnCurrentPage})
      </p>

      <div className="mt-4 flex flex-wrap justify-center gap-1">
        {pageNumbers.map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            aria-current={p === currentPage ? "page" : undefined}
            className={
              "rounded-md px-3 py-1 text-sm " +
              (p === currentPage
                ? "bg-blue-600 font-semibold text-white"
                : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100")
            }
          >
            {p}
          </button>
        ))}
      </div>
    </section>
  );
}