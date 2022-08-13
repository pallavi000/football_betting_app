import React, { useEffect, useState } from "react";
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import PageLoader from "../../Loader/PageLoader";
import { getActiveCard, getLimitedArchivedCard } from "./Action";
import Desktop from "./Desktop";
import Mobile from "./Mobile";

function Card() {
  const { isMobile } = useDeviceDetect();
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const [archivedCard, setArchivedCard] = useState([]);
  const [activeCard, setActiveCard] = useState([]);
  const [viewAllActive, setViewAllActive] = useState(false);
  const [activeCards, setActiveCards] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const response = await getActiveCard();
    if (response.data) {
      setActiveCard(response.data.slice(0, 1));
      setActiveCards(response.data);
    }
    const result = await getLimitedArchivedCard();
    if (result.data) {
      setArchivedCard(result.data);
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
      activeCard={activeCard}
      archivedCard={archivedCard}
      showResult={showResult}
      viewAllActive={viewAllActive}
      toggleViewAllActiveCard={toggleViewAllActiveCard}
      activeCards={activeCards}
    />
  ) : (
    <Desktop
      activeCard={activeCard}
      archivedCard={archivedCard}
      showResult={showResult}
      viewAllActive={viewAllActive}
      toggleViewAllActiveCard={toggleViewAllActiveCard}
      activeCards={activeCards}
    />
  );
}

export default Card;
