import React from "react";
import Link from "next/link";
import Router from "next/router";
import Dropdown from "react-bootstrap/Dropdown";

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
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" href="/">
        ROPSTAM
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {user && (
            <>
              <li className="nav-item">
                <Link className="nav-link" href="/">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/categories">
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/cars">
                  Cars
                </Link>
              </li>
            </>
          )}
        </ul>
        <form className="form-inline my-2 my-lg-0">
          {!user && (
            <>
              <Link href="login">
                <button className="btn btn-muted">Login</button>
              </Link>
              <Link href="signup">
                <button className="btn btn-muted">Signup</button>
              </Link>
            </>
          )}
          {user && (
            <Dropdown>
              <Dropdown.Toggle variant="scandary" id="dropdown-basic">
                {user?.name}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item className="btn" onClick={logoutHandler}>
                  Log out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </form>
      </div>
    </nav>
  );
}

export default Header;
