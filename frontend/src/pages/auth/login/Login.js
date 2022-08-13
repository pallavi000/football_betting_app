import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import { LoginApi } from "./Action";
import Desktop from "./Desktop";
import Mobile from "./Mobile";

function Login() {
  const { isMobile } = useDeviceDetect();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        navigate("/dashboard");
      } catch (error) {}
    }
  }, []);

  async function login(e) {
    e.preventDefault();
    setIsLoading(true);
    const response = await LoginApi(email, password);
    setIsLoading(false);
    console.log(response.data);
    if (response.status == "success") {
      if (response.data?.user?.role === "admin") {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/card";
      }
    }
  }

  return isMobile ? (
    <Mobile
      isLoading={isLoading}
      setEmail={setEmail}
      setPassword={setPassword}
      login={login}
    />
  ) : (
    <Desktop
      isLoading={isLoading}
      setEmail={setEmail}
      setPassword={setPassword}
      login={login}
    />
  );
}

export default Login;
