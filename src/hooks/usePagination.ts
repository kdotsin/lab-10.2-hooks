import { useCallback, useState } from "react";

export interface UsePaginationOptions {
  totalItems: number;
  itemsPerPage?: number; // default 10
  initialPage?: number;  // default 1
}

export interface UsePaginationResult {
  currentPage: number;
  totalPages: number;
  startIndex: number;        // 0-based, inclusive
  endIndex: number;          // 0-based, inclusive (-1 when there are no items)
  itemsOnCurrentPage: number;
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  canNextPage: boolean;
  canPrevPage: boolean;
}

export function usePagination({
  totalItems,
  itemsPerPage = 10,
  initialPage = 1,
}: UsePaginationOptions): UsePaginationResult {
  const safeTotal = Math.max(0, Math.floor(totalItems) || 0);
  const safePerPage = Math.max(1, Math.floor(itemsPerPage) || 1);
  const totalPages = Math.max(1, Math.ceil(safeTotal / safePerPage));

  const [rawPage, setRawPage] = useState(initialPage);
  // Derived + clamped: always valid even if inputs shrink after render
  const currentPage = Math.min(Math.max(rawPage, 1), totalPages);

  const startIndex = (currentPage - 1) * safePerPage;
  const itemsOnCurrentPage = Math.max(0, Math.min(safePerPage, safeTotal - startIndex));
  const endIndex = startIndex + itemsOnCurrentPage - 1;

  const setPage = useCallback(
    (page: number) => {
      if (!Number.isFinite(page)) return;
      setRawPage(Math.min(Math.max(Math.trunc(page), 1), totalPages));
    },
    [totalPages]
  );
  const nextPage = useCallback(() => setPage(currentPage + 1), [setPage, currentPage]);
  const prevPage = useCallback(() => setPage(currentPage - 1), [setPage, currentPage]);

  return {
    currentPage, totalPages, startIndex, endIndex, itemsOnCurrentPage,
    setPage, nextPage, prevPage,
    canNextPage: currentPage < totalPages,
    canPrevPage: currentPage > 1,
  };
}