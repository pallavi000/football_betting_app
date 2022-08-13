import React, { createContext, useContext, useEffect, useState } from "react";
import useDeviceDetect from "../hooks/useDeviceDetect";
import PageLoader from "../pages/Loader/PageLoader";
import { ProfileApi } from "../pages/user/profile/Action";

export const globalContext = createContext({});
function GlobalContext({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [appLoading, setAppLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getData();
    } else {
      setAppLoading(true);
    }
  }, []);

  const { isMobile } = useDeviceDetect();

  async function getData() {
    var response = await ProfileApi();
    setAppLoading(true);
    if (response.data) {
      setCurrentUser(response.data);
      if (response.data.role === "admin") {
        setIsAdmin(true);
      }
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("company_token");
      window.location.href = "/";
    }
  }
  if (!appLoading) return <PageLoader />;

  return (
    <>
      <link
        rel="stylesheet"
        type="text/css"
        href={isMobile ? "/mobile.css" : "/style.css"}
      />

      <globalContext.Provider
        value={{ user: currentUser, isAdmin, appLoading }}
      >
        {children}
      </globalContext.Provider>
    </>
  );
}

export default GlobalContext;
