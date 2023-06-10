import React from "react";
import styles from "./GridStatus.module.css";
import Spinner from "../shared/Spinner";

const GridStatus = ({ isFetching }) => {
  return <div className={styles.container}>{isFetching ? <Spinner /> : <div className={styles.noRows}>No Books to show</div>}</div>;
};

export default GridStatus;
