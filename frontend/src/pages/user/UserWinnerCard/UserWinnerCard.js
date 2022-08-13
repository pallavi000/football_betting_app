import React, { useEffect, useState } from "react";
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import PageLoader from "../../Loader/PageLoader";
import { getWinnerCard } from "../user_cards/Action";
import Desktop from "../UserArchivedCard/Desktop";
import Mobile from "../UserArchivedCard/Mobile";

function UserWinnerCard() {
  const { isMobile } = useDeviceDetect();
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [archived, setArchived] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    var response = await getWinnerCard();
    setArchived(response.data);
    setIsPageLoaded(true);
  }

  return !isPageLoaded ? (
    <PageLoader />
  ) : isMobile ? (
    <Mobile archived={archived} viewLink="/winner-card" />
  ) : (
    <Desktop archived={archived} viewLink="/winner-card" />
  );
}

export default UserWinnerCard;
