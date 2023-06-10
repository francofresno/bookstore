import React, { useMemo, useRef, useState } from "react";
import styles from "./Grid.module.css";
import GridStatus from "./GridStatus";
import Pagination from "./Pagination";
import BookDetails from "./BookDetails";
import GridHeader from "./GridHeader";
import GridRows from "./GridRows";

const COL_HEADERS = [
  {
    headerName: "Title",
    field: "title",
    width: "25%",
    mapper: (value) => value,
  },
  {
    headerName: "Author Name",
    field: "author_name",
    width: "55%",
    mapper: (value) => value?.join(", ") || "",
  },
  {
    headerName: "First Publish Year",
    field: "first_publish_year",
    width: "20%",
    mapper: (value) => value,
  },
];

const Grid = ({ books, isFetching }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const ref = useRef(null);

  const itemsPerPage = 12;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const totalPages = useMemo(() => Math.ceil(books?.length / itemsPerPage), [books]);
  const currentData = useMemo(() => books?.slice(indexOfFirstItem, indexOfLastItem) || []);

  const rowData = useMemo(() => currentData.concat(Array.from({ length: itemsPerPage - currentData.length }, () => ({}))), [currentData]);

  const handleRowClick = (item, isEmpty) => {
    if (isEmpty) return;
    ref.current.showModal(item);
  };

  return (
    <div className={styles.container}>
      <div className={styles.gridContainer}>
        <div className={styles.grid}>
          <GridHeader colHeaders={COL_HEADERS} />
          {currentData.length && !isFetching ? (
            <GridRows rowData={rowData} colHeaders={COL_HEADERS} handleRowClick={handleRowClick} />
          ) : (
            <GridStatus isFetching={isFetching} />
          )}
        </div>
        {!!books?.length && <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} currentPage={currentPage} />}
      </div>
      <BookDetails ref={ref} />
    </div>
  );
};

export default Grid;
