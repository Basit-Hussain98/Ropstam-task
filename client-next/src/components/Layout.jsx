import Signup from "@/pages/signup";
import Head from "next/head";
import React from "react";
import Header from "./Header";
import { useState, useEffect } from "react";

function Layout({ children, ...pageProps }) {
  const [token, setToken] = useState();
  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
  }, []);
  // if (!token) {
  //   return <Signup />;
  // }
  return (
    <>
      <Head><title>ROPSTAM</title></Head>
      <Header></Header>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-12">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
