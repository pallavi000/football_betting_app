import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import PageLoader from "../../Loader/PageLoader";
import { getCardById, updateResultById } from "./Action";
import Desktop from "./Desktop";
import Mobile from "./Mobile";

function Update_Card() {
  const { isMobile } = useDeviceDetect();
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const params = useParams();
  const [card, setCard] = useState({});
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isAllFilled, setIsAllFilled] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const response = await getCardById(params.id);
    console.log(response.data);
    if (response.data) {
      setCard(response.data);
      var arr = [];
      for (const match of response.data.matches) {
        arr.push({
          _id: match._id,
          result: null,
        });
      }
      setResults(arr);
      setIsPageLoaded(true);
    }
  }

  async function updateResult() {
    const data = {
      results,
    };
    setIsLoading(true);
    const response = await updateResultById(params.id, data);
    setIsLoading(false);
    if (response.data) {
      navigate(-1);
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
      updateResult={updateResult}
    />
  ) : (
    <Desktop
      card={card}
      results={results}
      setResults={setResults}
      isLoading={isLoading}
      isAllFilled={isAllFilled}
      updateResult={updateResult}
    />
  );
}

export default Update_Card;
