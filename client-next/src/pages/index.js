import { useState, useEffect } from "react";
import Head from "next/head";
import Signup from "./signup";
import Dashboard from "@/components/Dashboard";
import Header from "@/components/Header";

export default function Home() {
  const [token, setToken] = useState();
  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
  }, []);
  if (!token) {
    return <Signup />;
  } else {
    return (
      <>
        <Head>
          <title>Notes App</title>
        </Head>
        <div className="min-h-screen  bg-slate-100">
          <div>
            <Header />
            <Dashboard />
          </div>
        </div>
      </>
    );
  }
}
