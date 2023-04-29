import React, { useState } from "react";
import Person3Icon from "@mui/icons-material/Person3";
import PeopleIcon from "@mui/icons-material/People";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Link from "next/link";
import Router from "next/router";
const Signup = () => {
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const inputHandler = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(inputValue);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputValue),
    };
    const res = await fetch(
      "http://localhost:3001/api/v1/users/signup",
      requestOptions
    );
    if (!res.data) {
      setLoading(true);
    }
    setLoading(false);
    if (res.status === 201) Router.push("/login");

    // console.log("form submited");
  };
  return (
    <div className="row justify-content-md-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header d-flex justify-content-between">
            <div>Sign up</div>
          </div>
          <div className="card-body">
            <form onSubmit={submitHandler}>
              <div className="form-group row justify-content-md-center">
                <label className="col-md-2 col-form-label">Name</label>
                <div class="col-md-8">
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={inputValue.name}
                    onChange={inputHandler}
                  />
                </div>
              </div>
              <div className="form-group row justify-content-md-center">
                <label className="col-md-2 col-form-label">Email</label>
                <div class="col-md-8">
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={inputValue.email}
                    onChange={inputHandler}
                  />
                </div>
              </div>
              <div className="form-group row justify-content-md-center">
                <label className="col-md-2 col-form-label">Password</label>
                <div class="col-md-8">
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    placeholder="password"
                    value={inputValue.password}
                    onChange={inputHandler}
                  />
                </div>
              </div>
              <div className="form-group row justify-content-md-center mt-5">
                <Link href="/login" className="col-md-3">
                  <p className="flex justify-center mt-10 underline cursor-pointer">
                    Already have an account
                  </p>
                </Link>
                <button className="btn btn-primary ml-2 col-md-2">
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    // <div className="flex justify-center items-center h-screen  ">
    //   <div className=" rounded shadow-xl py-16 px-16 w-3/5 ">
    //     <h1 className="font-bold text-2xl mb-8 ">Sign up </h1>
    //     <div className="flex  justify-between ">
    //       {/* Left */}
    //       <div className="w-full">
    //         <form action="" onSubmit={submitHandler}>
    //           <div className="border-b-2 border-black w-4/5 mb-7 py-1">
    //             <PeopleIcon />
    //             <input
    //               className="outline-none ml-2 "
    //               type="text"
    //               name="name"
    //               placeholder="Your Name"
    //               value={inputValue.name}
    //               onChange={inputHandler}
    //             />
    //           </div>
    //           <div className="border-b-2 border-black w-4/5 mb-7 py-1">
    //             <EmailIcon />
    //             <input
    //               className="outline-none ml-2 w-4/5 bg-transparent"
    //               type="email"
    //               name="email"
    //               placeholder="Your Email"
    //               value={inputValue.email}
    //               onChange={inputHandler}
    //             />
    //           </div>
    //           <div className="border-b-2 border-black w-4/5 mb-5 py-1">
    //             <LockIcon />
    //             <input
    //               className="outline-none ml-2"
    //               type="password"
    //               name="password"
    //               placeholder="password"
    //               value={inputValue.password}
    //               onChange={inputHandler}
    //             />
    //           </div>
    //           <button
    //             type="submit"
    //             className="bg-[#613BF7] text-white px-8 py-3 rounded mt-8 "
    //           >
    //             Register
    //           </button>
    //         </form>
    //       </div>
    //       {/* Right */}
    //       <div className="w-full">
    //         <div className="flex justify-end  ">
    //           <img
    //             className="w-full rounded h-2/3 object-contain"
    //             src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
    //             alt=""
    //           />
    //         </div>
    //         <Link href="/login">
    //           <p className="flex justify-center mt-10 underline cursor-pointer">
    //             I am already member
    //           </p>
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Signup;
