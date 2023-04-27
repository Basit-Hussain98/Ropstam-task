import React, { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Link from "next/link";
import Router from "next/router";
import swal from "sweetalert";

const Login = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const inputHandler = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3001/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputValue),
    });
    const response = await res.json();
    if ("token" in response) {
      // swal("Success", response.message, "success");

      localStorage.setItem("accessToken", response["token"]);
      localStorage.setItem("user", JSON.stringify(response["user"]));
      Router.push("/");
    } else {
      swal("Failed", response.message, "error");
    }

    // console.log(inputValue);
  };

  return (
    <div className="flex justify-center items-center h-screen  ">
      <div className=" rounded shadow-xl py-16 px-16 w-3/5 ">
        <div className="flex  justify-between ">
          {/* Left */}
          <div className="w-full">
            <h1 className="font-bold text-2xl mb-8 ">Sign in </h1>

            <form action="" onSubmit={submitHandler}>
              <div className="border-b-2 border-black w-4/5 mb-7 py-1">
                <EmailIcon />
                <input
                  className="outline-none ml-2"
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={inputValue.email}
                  onChange={inputHandler}
                />
              </div>
              <div className="border-b-2 border-black w-4/5 mb-5 py-1">
                <LockIcon />
                <input
                  className="outline-none ml-2"
                  type="password"
                  name="password"
                  placeholder="password"
                  value={inputValue.password}
                  onChange={inputHandler}
                />
              </div>

              <button
                type="submit"
                className="bg-[#613BF7] text-white px-8 py-3 rounded mt-8 "
              >
                Log in
              </button>
            </form>
          </div>
          {/* Right */}
          <div className="w-full">
            <div className="flex justify-end  ">
              <img
                className="w-full rounded h-2/3 object-contain"
                src="https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt=""
              />
            </div>
            <Link href="/signup">
              <p className="flex justify-center mt-10 underline cursor-pointer">
                Create an account
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
