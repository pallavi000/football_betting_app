import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import PageLoader from "../../Loader/PageLoader";
import { AddCardApi, getTeamList } from "./Action";
import Desktop from "./Desktop";
import Mobile from "./Mobile";

function AddCard() {
  const { isMobile } = useDeviceDetect();
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const [count, setCount] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [reward, setReward] = useState(0);
  const [teams, setTeams] = useState([]);
  const [isAllFilled, setIsAllFilled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const team = [];
    for (var i = 0; i < 2; i++) {
      team.push({
        home_team: undefined,
        away_team: undefined,
      });
    }
    setCount(team);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const response = await getTeamList();
    var arr = [];
    for (const team of response.data) {
      arr.push({
        value: team._id,
        label: team.name,
        image: team.image,
      });
    }
    setTeams(arr);
    setIsPageLoaded(true);
  }

  function handleChange(e, index, name) {
    var newcount = [...count];
    if (name == "home_team") {
      newcount[index].home_team = e.value;
    } else {
      newcount[index].away_team = e.value;
    }
    setCount(newcount);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      counts: count,
      balance: amount,
      reward,
    };
    setIsLoading(true);
    await AddCardApi(data);
    setIsLoading(false);
    navigate(-1);
  }

  useEffect(() => {
    if (count && count.length) {
      var isNotFilled = count.some(
        (result) =>
          result.home_team === undefined || result.away_team === undefined
      );
      if (!isNotFilled) {
        setIsAllFilled(true);
      }
    }
  }, [count]);

  return !isPageLoaded ? (
    <PageLoader />
  ) : isMobile ? (
    <Mobile
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      count={count}
      teams={teams}
      setAmount={setAmount}
      setReward={setReward}
      isLoading={isLoading}
      isAllFilled={isAllFilled}
    />
  ) : (
    <Desktop
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      count={count}
      teams={teams}
      setAmount={setAmount}
      setReward={setReward}
      isLoading={isLoading}
      isAllFilled={isAllFilled}
    />
  );
}

export default AddCard;
