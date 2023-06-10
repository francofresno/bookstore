import React, { useState } from "react";
import Search from "../components/search/Search";
import Grid from "../components/grid/Grid";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const [books, isFetchingBooks, fetchBooks] = useFetch();

  return (
    <>
      <Search fetchBooks={fetchBooks} />
      <Grid books={books} isFetching={isFetchingBooks} />
    </>
  );
};

export default Home;
