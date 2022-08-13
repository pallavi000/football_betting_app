import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserById } from "../../pages/user/user_add_card/Action";
import { globalContext } from "../GlobalContext";

const hideNavBarPages = ["/", "/login", "/register"];

function Desktop(props) {
  const { user, isAdmin } = useContext(globalContext);

  const [pathName, setPathName] = useState(window.location.pathname);

  const navigate = useNavigate();

  useEffect(() => {
    setPathName(window.location.pathname);
  }, [navigate]);

  function logout() {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      localStorage.removeItem("");
      window.location.href = "/login";
    }
  }

  return !hideNavBarPages.includes(pathName) && user ? (
    <nav className="card-nav navbar navbar-expand-lg ">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Company Name
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {isAdmin ? (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    pathName === "/dashboard" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    pathName === "/admin/teams" ? "active" : ""
                  }`}
                  to="/admin/teams"
                >
                  Teams
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    pathName === "/admin/card" ? "active" : ""
                  }`}
                  to="/admin/card"
                >
                  Cards
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    pathName === "/admin/archived-card" ? "active" : ""
                  }`}
                  to="/admin/archived-card"
                >
                  Archive Cards
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    pathName === "/admin/users" ? "active" : ""
                  }`}
                  to="/admin/users"
                >
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    pathName === "/transaction" ? "active" : ""
                  }`}
                  to="/transaction"
                >
                  Transactions
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${pathName === "/card" ? "active" : ""}`}
                  to="/card"
                >
                  Cards
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    pathName === "/archived-card" ? "active" : ""
                  }`}
                  to="/archived-card"
                >
                  Archive Cards
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    pathName === "/winner-card" ? "active" : ""
                  }`}
                  to="/winner-card"
                >
                  Winner Cards
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    pathName === "/transaction" ? "active" : ""
                  }`}
                  to="/transaction"
                >
                  Transactions
                </Link>
              </li>
            </ul>
          )}

          <div className="d-flex gap-4 align-items-center">
            {!isAdmin && (
              <Link className="user-balance-section" to="/add-balance">
                <i className="fa-solid fa-user"></i>
                <div className="user-balance">US${user.balance}</div>
              </Link>
            )}

            <div className="d-flex align-items-center gap-3 text-secondary">
              <Link to={"/profile"} className="text-secondary">
                <i className="fa fa-user"></i>
              </Link>

              <i className="fa fa-bell" role={"button"}></i>

              <i
                className="fa fa-sign-out-alt"
                onClick={() => logout()}
                role={"button"}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </nav>
  ) : (
    <nav className="navbar navbar-expand-lg navbar-light desktop-nav">
      <Link className="navbar-brand" to="/">
        Company Name
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse navbar-right logout-navbar"
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link signin-nav" to="/login">
              Sign In
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link  signin-nav" to="/register">
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Desktop;
