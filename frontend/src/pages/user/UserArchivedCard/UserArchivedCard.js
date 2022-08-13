import React, { useEffect, useState } from "react";
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import PageLoader from "../../Loader/PageLoader";
import { getArchivedCard } from "./Action";
import Desktop from "./Desktop";
import Mobile from "./Mobile";

function UserArchivedCard() {
  const { isMobile } = useDeviceDetect();
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [archived, setArchived] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    var response = await getArchivedCard();
    setArchived(response.data);
    setIsPageLoaded(true);
  }

  return !isPageLoaded ? (
    <PageLoader />
  ) : isMobile ? (
    <Mobile archived={archived} />
  ) : (
    <Desktop archived={archived} />
  );
}

export default UserArchivedCard;
