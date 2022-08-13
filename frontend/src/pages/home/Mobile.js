import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Mobile() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login");
  }, []);
  return <div></div>;
}

export default Mobile;
