import React from "react";
import styles from "./Grid.module.css";

const GridHeader = ({ colHeaders }) => {
  return (
    <div className={`${styles.row} ${styles.header}`}>
      {colHeaders.map(({ headerName, width }) => (
        <div className={styles.cell} key={headerName} style={{ width }}>
          {headerName}
        </div>
      ))}
    </div>
  );
};

export default GridHeader;
