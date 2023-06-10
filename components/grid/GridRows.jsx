import React from "react";
import styles from "./Grid.module.css";

const GridRows = ({ rowData, colHeaders, handleRowClick }) => {
  return rowData.map((item, index) => {
    const isEmpty = Object.keys(item).length === 0;
    return (
      <div className={`${styles.row} ${isEmpty ? styles.emptyRow : ""}`} key={item.key || index}>
        {colHeaders.map(({ field, mapper, width }, index) => (
          <div className={styles.cell} key={`${item.key}${index}`} style={{ width }} onClick={() => handleRowClick(item, isEmpty)}>
            {mapper(item[field])}
          </div>
        ))}
      </div>
    );
  });
};

export default GridRows;
