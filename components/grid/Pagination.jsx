import React from "react";
import styles from "./Pagination.module.css";

const Pagination = ({ totalPages, setCurrentPage, currentPage }) => {
  const pageOptions = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageSelection = (event) => {
    const selectedPage = parseInt(event.target.value);
    setCurrentPage(selectedPage);
  };

  return (
    <div className={styles.pagination}>
      <button className={styles.prevButton} onClick={handlePreviousClick} disabled={currentPage === 1}>
        Prev
      </button>
      <select className={styles.pageDropdown} value={currentPage} onChange={handlePageSelection}>
        {pageOptions.map((page) => (
          <option key={page} value={page}>
            {page}
          </option>
        ))}
      </select>
      <button className={styles.nextButton} onClick={handleNextClick} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
