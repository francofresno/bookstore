import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { BOOKS_DATA_MAPPER, BOOKS_URL } from "../../utils/constants";
import styles from "./Search.module.css";

const Search = ({ fetchBooks }) => {
  const [userInputValue, setUserInputValue] = useState("");

  const handleSearch = () => {
    if (userInputValue?.length <= 3) return;
    const fetchUrl = `${BOOKS_URL}/search.json?q=${userInputValue.replace(/ /g, "+")}`;
    fetchBooks(fetchUrl, BOOKS_DATA_MAPPER);
  };

  const handleInputChange = ({ target: { value } }) => {
    setUserInputValue(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          className={styles.inputSearch}
          placeholder="Search Books Now!"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          data-testid="search-input"
        />
        <div className={styles.searchIconContainer} onClick={handleSearch} data-testid="search-btn">
          <FaSearch />
        </div>
      </div>
    </div>
  );
};

export default Search;
