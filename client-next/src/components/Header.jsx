import React from "react";
import Link from "next/link";
import Router from "next/router";
function Header() {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    // Perform localStorage action
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [typeof window !== "undefined" && localStorage.getItem("user")]);

  const logoutHandler = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    Router.push("/signup");
  };

  return (
    <div className="   h-20 shadow-2xl bg-white text-black flex items-center justify-between px-20  w-full ">
      <Link href="/">
        <h1 className="text-2xl">ROPSTAM</h1>
      </Link>
      <div>
        <span className="mx-5 font-bold text-lg">{user?.name}</span>
        <Link href="login">
          <button className="bg-[#613BF7] text-white px-8 rounded py-1 mx-2">
            Login
          </button>
        </Link>
        <Link href="signup">
          <button className="bg-[#613BF7] text-white px-8 rounded py-1 mx-2">
            Signup
          </button>
        </Link>
        {user && (
          <Link href="signup">
            <button
              onClick={logoutHandler}
              className="bg-[#613BF7] text-white px-8 rounded py-1 mx-2"
            >
              Log out
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
