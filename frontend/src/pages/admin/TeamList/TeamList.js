import React, { useEffect, useState } from "react";
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import PageLoader from "../../Loader/PageLoader";
import { getTeam } from "./Action";
import Desktop from "./Desktop";
import Mobile from "./Mobile";

function TeamList() {
  const { isMobile } = useDeviceDetect();
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const [teams, setTeams] = useState([]);

  async function getData() {
    const response = await getTeam();
    setTeams(response.data);
    setIsPageLoaded(true);
  }

  useEffect(() => {
    getData();
  }, []);

  return !isPageLoaded ? (
    <PageLoader />
  ) : isMobile ? (
    <Mobile teams={teams} />
  ) : (
    <Desktop teams={teams} />
  );
}

export default TeamList;
