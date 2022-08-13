import React, { useContext, useEffect, useState } from "react";
import chart from "../../images/Chart.png";
import profile from "../../images/Profile.png";
import dis from "../../images/Discovery.png";
import home from "../../images/home1.png";
import { Link } from "react-router-dom";
import { getUserById } from "../../pages/user/user_add_card/Action";
import { globalContext } from "../GlobalContext";

function Mobile() {
  const { user, isAdmin } = useContext(globalContext);

  function logout() {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      localStorage.removeItem("");
    }
  }

  return (
    <div className="mobile-header">
      {isAdmin ? (
        <>
          <Link className="home-icom" to="/admin/card">
            <img src={home} />
          </Link>
          <Link className="home-icom" to="/admin/teams">
            <img src={dis} />
          </Link>
          <Link className="home-icom" to="/admin/archived-card">
            <img src={chart} />
          </Link>
          <Link className="home-icom" to="/profile">
            <img src={profile} />
          </Link>
        </>
      ) : (
        <>
          <Link className="home-icom" to="/card">
            <img src={home} />
          </Link>
          <Link className="home-icom" to="/archived-card">
            <img src={dis} />
          </Link>
          <Link className="home-icom" to="/transaction">
            <img src={chart} />
          </Link>
          <Link className="home-icom" to="/profile">
            <img src={profile} />
          </Link>
        </>
      )}
    </div>
  );
}
export default Mobile;
