import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import PageLoader from "../../Loader/PageLoader";
import { addUserCard, CardOfTheWeekById, getUserById } from "./Action";
import Desktop from "./Desktop";
import Mobile from "./Mobile";
import * as Toastr from "toastr";
import "../../../../node_modules/toastr/build/toastr.css";
import { ProfileApi } from "../profile/Action";

function UserAddCard() {
  const { isMobile } = useDeviceDetect();
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const [results, setResults] = useState([]);
  const params = useParams();
  const [card, setCard] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  const [isAllFilled, setIsAllFilled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getData();
    getUser();
  }, []);

  async function getUser() {
    const response = await ProfileApi();
    setUser(response.data);
  }

  async function getData() {
    const response = await CardOfTheWeekById(params.id);
    if (response.data) {
      setCard(response.data);
      var arr = [];
      for (const match of response.data.matches) {
        arr.push({
          _id: match._id,
          result: null,
          home_team: match.home_team,
          away_team: match.away_team,
          home_team_nickname: match.home_team_nickname,
          away_team_nickname: match.away_team_nickname,
          home_team_image: match.home_team_image,
          away_team_image: match.away_team_image,
        });
      }
      setResults(arr);
    } else {
      window.location.href = "/not-found";
    }
    setIsPageLoaded(true);
  }

  async function handleSubmit() {
    if (user.balance >= card.balance) {
      setIsLoading(true);
      const data = {
        results,
        card_id: params.id,
      };
      var res = await addUserCard(data);
      setIsLoading(false);
      console.log(res.data);
      navigate(-1);
    } else {
      Toastr.error("Insufficient Balance");
      navigate("/add-balance");
    }
  }

  useEffect(() => {
    if (results && results.length) {
      var isNotFilled = results.some((result) => result.result === null);
      if (!isNotFilled) {
        setIsAllFilled(true);
      }
    }
  }, [results]);

  return !isPageLoaded ? (
    <PageLoader />
  ) : isMobile ? (
    <Mobile
      card={card}
      results={results}
      setResults={setResults}
      isLoading={isLoading}
      isAllFilled={isAllFilled}
      handleSubmit={handleSubmit}
    />
  ) : (
    <Desktop
      card={card}
      results={results}
      setResults={setResults}
      isLoading={isLoading}
      isAllFilled={isAllFilled}
      handleSubmit={handleSubmit}
    />
  );
}

export default UserAddCard;
