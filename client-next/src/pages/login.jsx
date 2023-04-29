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
    <div className="row justify-content-md-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header d-flex justify-content-between">
            <div>Sign in</div>
          </div>
          <div className="card-body">
            <form onSubmit={submitHandler}>
              <div className="form-group row justify-content-md-center">
                <label className="col-md-2 col-form-label">Email</label>
                <div class="col-md-8">
                  <input className="form-control" type="email" name="email" placeholder="Your Email" value={inputValue.email} onChange={inputHandler} />
                </div>
              </div>
              <div className="form-group row justify-content-md-center">
                <label className="col-md-2 col-form-label">Password</label>
                <div class="col-md-8">
                  <input className="form-control" type="password" name="password" placeholder="password" value={inputValue.password} onChange={inputHandler} />
                </div>
              </div>
              <div className="form-group row justify-content-md-center mt-5">
                <Link href="/signup" className="col-md-3">
                  <p className="flex justify-center mt-10 underline cursor-pointer">
                    Create an account
                  </p>
                </Link>
                <button className="btn btn-primary ml-2 col-md-2">Sign in</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
