import React, { useEffect, useState } from "react";
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import PageLoader from "../../Loader/PageLoader";
import { getDashboardData } from "./Action";
import Desktop from "./Desktop";
import Mobile from "./Mobile";

function Dashboard() {
  const { isMobile } = useDeviceDetect();
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [totalBalance, setTotalBalance] = useState(0);
  const [previousMonthBalance, setPreviousMonthBalance] = useState(0);
  const [thisMonthBalance, setThisMonthBalance] = useState(0);
  const [yesterdayBalance, setYesterdayBalance] = useState(0);
  const [everyHourData, setEveryHourData] = useState([]);
  const [latestBets, setLatestBets] = useState([]);

  useEffect(() => {
    if (!isMobile) {
      getData();
    } else {
      setIsPageLoaded(true);
    }
  }, [isMobile]);

  const numberWithCommas = React.useCallback((x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  });

  async function getData() {
    const response = await getDashboardData();
    if (response.data) {
      setTotalBalance(numberWithCommas(response.data.totalBalance));
      setPreviousMonthBalance(
        numberWithCommas(response.data.previousMonthBalance)
      );
      setThisMonthBalance(numberWithCommas(response.data.thisMonthBalance));
      setYesterdayBalance(numberWithCommas(response.data.yesterdayBalance));
      setEveryHourData(response.data.everyHourData);
      setLatestBets(response.data.latestBets);
      setIsPageLoaded(true);
    }
  }

  return !isPageLoaded ? (
    <PageLoader />
  ) : isMobile ? (
    <Mobile
      totalBalance={totalBalance}
      thisMonthBalance={thisMonthBalance}
      previousMonthBalance={previousMonthBalance}
      yesterdayBalance={yesterdayBalance}
      everyHourData={everyHourData}
      latestBets={latestBets}
    />
  ) : (
    <Desktop
      totalBalance={totalBalance}
      thisMonthBalance={thisMonthBalance}
      previousMonthBalance={previousMonthBalance}
      yesterdayBalance={yesterdayBalance}
      everyHourData={everyHourData}
      latestBets={latestBets}
    />
  );
}

export default Dashboard;
