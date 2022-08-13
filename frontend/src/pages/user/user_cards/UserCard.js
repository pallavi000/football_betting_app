import React, { useEffect, useState } from "react";
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import PageLoader from "../../Loader/PageLoader";
import {
  cardOfTheWeek,
  getActiveCard,
  getArchivedCard,
  getArchivedCardLimited,
  getWinnerCard,
  getWinnerCardLimited,
} from "./Action";
import Desktop from "./Desktop";
import Mobile from "./Mobile";

function UserCard() {
  const { isMobile } = useDeviceDetect();
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const [archivedCard, setArchivedCard] = useState([]);
  const [winnerCard, setWinnerCard] = useState([]);
  const [activeCards, setActiveCards] = useState([]);
  const [activeCard, setActiveCard] = useState([]);
  const [weekCard, setWeekCard] = useState({});
  const [viewAllActive, setViewAllActive] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    var newres = await cardOfTheWeek();
    setWeekCard(newres.data);
    const response = await getActiveCard();
    if (response.data) {
      setActiveCard(response.data.slice(0, 1));
      setActiveCards(response.data);
    }
    const result = await getArchivedCardLimited();
    if (result.data) {
      setArchivedCard(result.data);
    }
    const winner = await getWinnerCardLimited();
    if (winner.data) {
      setWinnerCard(winner.data);
    }
    setIsPageLoaded(true);
  }

  function showResult(result) {
    if (result == "home") {
      return "W-L";
    }
    if (result == "away") {
      return "L-W";
    }
    if (result == "draw") {
      return "D-D";
    }
  }

  function toggleViewAllActiveCard() {
    if (viewAllActive) {
      //close
      setViewAllActive(false);
      setActiveCard(activeCards.slice(0, 1));
    } else {
      //opens
      setViewAllActive(true);
      setActiveCard(activeCards);
    }
  }

  return !isPageLoaded ? (
    <PageLoader />
  ) : isMobile ? (
    <Mobile
      weekCard={weekCard}
      activeCard={activeCard}
      archivedCard={archivedCard}
      showResult={showResult}
      viewAllActive={viewAllActive}
      toggleViewAllActiveCard={toggleViewAllActiveCard}
      activeCards={activeCards}
      winnerCard={winnerCard}
    />
  ) : (
    <Desktop
      weekCard={weekCard}
      activeCard={activeCard}
      archivedCard={archivedCard}
      showResult={showResult}
      viewAllActive={viewAllActive}
      toggleViewAllActiveCard={toggleViewAllActiveCard}
      activeCards={activeCards}
      winnerCard={winnerCard}
    />
  );
}

export default UserCard;
