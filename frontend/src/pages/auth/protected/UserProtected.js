import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import $ from "jquery";
import { globalContext } from "../../../global/GlobalContext";
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import AppLoader from "../../../global/AppLoader";
import PageLoader from "../../Loader/PageLoader";

function UserProtected(props) {
  const navigate = useNavigate();
  const { user, appLoading } = useContext(globalContext);
  const { isMobile } = useDeviceDetect();

  useEffect(() => {
    $(".content-section").css("max-width", "900px");
  }, []);

  useEffect(() => {
    if (!user && appLoading && isMobile) {
      return navigate("/login");
    }
    if (!user && appLoading && !isMobile) {
      return navigate("/");
    }
  }, [appLoading, user]);

  return <Outlet />;
}

export default UserProtected;
