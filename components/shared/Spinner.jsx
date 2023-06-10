import React from "react";
import styles from "./Spinner.module.css";

const Spinner = ({ classes = "" }) => {
  return <div className={`${styles.ldsDualRing} ${classes}`}></div>;
};

export default Spinner;
