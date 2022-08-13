import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useDeviceDetect from "../../../../hooks/useDeviceDetect";
import PageLoader from "../../../Loader/PageLoader";
import { getArchivedCardById } from "./Action";
import Desktop from "./Desktop";
import Mobile from "./Mobile";

function ViewUserArchivedCard() {
  const { isMobile } = useDeviceDetect();
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [archived, setArchived] = useState();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const response = await getArchivedCardById(params.id);
    if (response.data) {
      setArchived(response.data);
      setIsPageLoaded(true);
    } else {
      navigate("/not-found");
    }
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

  return !isPageLoaded ? (
    <PageLoader />
  ) : isMobile ? (
    <Mobile card={archived} showResult={showResult} />
  ) : (
    <Desktop card={archived} showResult={showResult} />
  );
}

export default ViewUserArchivedCard;
