import React from "react";
import { FaBookReader } from "react-icons/fa";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.container}>
      <FaBookReader />
      <span className={styles.textContainer}>Mendel Bookstore</span>
    </div>
  );
};

export default Header;
