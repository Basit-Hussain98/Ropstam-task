import { useState, useEffect } from "react";
import Head from "next/head";
import Signup from "./signup";
import AddNote from "@/components/AddNote";
import NotesList from "@/components/NotesList";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  const [token, setToken] = useState();
  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
  }, []);
  if (!token) {
    return <Signup />;
  }
  return (
    <>
      <Head>
        <title>Notes App</title>
        {/* <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      {/* <Header /> */}
      <div className="min-h-screen  bg-slate-100">
        <div>
          {/* <AddNote />
          <NotesList /> */}
          <Dashboard />
        </div>
      </div>
    </>
  );
}
