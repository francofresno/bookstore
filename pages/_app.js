import React from "react";
import "../styles/globals.css";
import Header from "../components/shared/Header";
import Layout from "../components/shared/Layout";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Header />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default App;
