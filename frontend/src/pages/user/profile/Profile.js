import React, { useEffect, useState } from "react";
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import PageLoader from "../../Loader/PageLoader";
import { ProfileApi } from "./Action";
import Desktop from "./Desktop";
import Mobile from "./Mobile";

function Profile() {
  const { isMobile } = useDeviceDetect();
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const [user, setUser] = useState({});
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getData();
    }
  }, []);

  async function getData() {
    const response = await ProfileApi();
    if (response.data) {
      setUser(response.data);
    }
    setIsPageLoaded(true);
  }

  function logout() {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      localStorage.removeItem("");
      window.location.href = "/login";
    }
  }

  return !isPageLoaded ? (
    <PageLoader />
  ) : isMobile ? (
    <Mobile user={user} logout={logout} />
  ) : (
    <Desktop user={user} logout={logout} />
  );
}

export default Profile;
