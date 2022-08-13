import React, { useEffect, useState } from "react";
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import PageLoader from "../../Loader/PageLoader";
import { getAllUsers } from "./Action";
import Desktop from "./Desktop";
import Mobile from "./Mobile";

function ManageUsers() {
  const { isMobile } = useDeviceDetect();
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const response = await getAllUsers();
    if (response.data) {
      setUsers(response.data);
    }
    setIsPageLoaded(true);
  }

  return !isPageLoaded ? (
    <PageLoader />
  ) : isMobile ? (
    <Mobile users={users} />
  ) : (
    <Desktop users={users} />
  );
}

export default ManageUsers;
