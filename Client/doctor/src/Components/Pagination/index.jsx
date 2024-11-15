import React from "react";
import styles from "./styles.module.css";

const Pagination = ({ page, total, limit, setPage }) => {
  const totalPages = Math.ceil(total / limit);

  const onClick = (newPage) => {
    setPage(newPage);
  };

  const renderPageButtons = () => {
    const currentPage = page;
    const pageButtons = [];

    // Previous Button
    if (currentPage > 1) {
      pageButtons.push(
        <button
          onClick={() => onClick(currentPage - 1)}
          className={styles.page_btn}
          key={"prev"}
        >
          Prev
        </button>
      );
    }

    // Page Buttons
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          onClick={() => onClick(i)}
          className={
            page === i ? `${styles.page_btn} ${styles.active}` : styles.page_btn
          }
          key={i}
        >
          {i}
        </button>
      );
    }

    // Next Button
    if (currentPage < totalPages) {
      pageButtons.push(
        <button
          onClick={() => onClick(currentPage + 1)}
          className={styles.page_btn}
          key={"next"}
        >
          Next
        </button>
      );
    }

    return pageButtons;
  };

  return <div className={styles.container}>{renderPageButtons()}</div>;
};

export default Pagination;
