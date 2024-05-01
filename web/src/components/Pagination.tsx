import styles from "@/styles/Pagination.module.css";
import React, { useState, useEffect } from "react";

type PaginationType = {
  items: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

function Pagination({ items, pageSize, currentPage, onPageChange }: PaginationType) {
  const pagesCount = Math.ceil(items / pageSize);
  const pagesToShow = 10;

  const [pages, setPages] = useState<number[]>([]);
  
  useEffect(() => {
    const middlePage = Math.ceil(pagesToShow / 2);
    let startPage = currentPage - middlePage + 1;
    startPage = Math.max(startPage, 1);
    startPage = Math.min(startPage, pagesCount - pagesToShow + 1);

    const newPages = Array.from({ length: pagesToShow }, (_, index) => startPage + index);
    setPages(newPages);
  }, [currentPage, pagesCount, pagesToShow]);

  if (pagesCount <= 1) return null;

  return (
    <div>
      <ul className={styles.pagination}>
        {pages.map((page) => (
          <li key={page} className={page === currentPage ? styles.pageItemActive : styles.pageItem}>
            <button className={styles.pageLink} onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
      </ul>
      <div>
        <button disabled={currentPage === 1} onClick={() => onPageChange(1)}>
          First
        </button>
        <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
          Prev
        </button>
        <button disabled={currentPage === pagesCount} onClick={() => onPageChange(currentPage + 1)}>
          Next
        </button>
        <button disabled={currentPage === pagesCount} onClick={() => onPageChange(pagesCount)}>
          Last
        </button>
      </div>
    </div>
  );
}

export default Pagination;