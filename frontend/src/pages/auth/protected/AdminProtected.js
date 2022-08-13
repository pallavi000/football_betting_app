import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import $ from "jquery";
import { globalContext } from "../../../global/GlobalContext";
import AppLoader from "../../../global/AppLoader";
import PageLoader from "../../Loader/PageLoader";

function AdminProtected(props) {
  const navigate = useNavigate();
  const { isAdmin, user, appLoading } = useContext(globalContext);

  useEffect(() => {
    $(".content-section").css("max-width", "900px");
  }, []);

  useEffect(() => {
    if (!user && appLoading && !isAdmin) {
      return navigate("/login");
    }
    if (user && appLoading && !isAdmin) {
      return navigate("/");
    }
  }, [appLoading, user, isAdmin]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default AdminProtected;
