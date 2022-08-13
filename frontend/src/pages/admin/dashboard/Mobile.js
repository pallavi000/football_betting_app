import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Mobile({
  totalBalance,
  thisMonthBalance,
  previousMonthBalance,
  yesterdayBalance,
  everyHourData,
}) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/admin/card");
  }, []);
  return <div></div>;
}

export default Mobile;
