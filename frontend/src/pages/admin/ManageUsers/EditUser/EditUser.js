import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useDeviceDetect from "../../../../hooks/useDeviceDetect";
import { PasswordChange } from "../../../auth/ChangePassword/Action";
import PageLoader from "../../../Loader/PageLoader";
import { getUserById } from "../../../user/user_add_card/Action";
import { PasswordUpdateByAdmin, UpdateProfileByAdmin } from "../Action";
import Desktop from "./Desktop";
import Mobile from "./Mobile";

function EditUser() {
  const { isMobile } = useDeviceDetect();
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const response = await getUserById(params.id);
    setIsPageLoaded(true);
    if (response.data) {
      setUser(response.data);
    } else {
      navigate("/404");
    }
  }

  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const response = await UpdateProfileByAdmin(params.id, user);
    if (response.data) {
      setIsLoading(false);
    }
  }

  async function handleSubmitPassword(e) {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      newpassword: newPassword,
      confirmpassword: confirmPassword,
    };
    const response = await PasswordUpdateByAdmin(params.id, data);
    if (response.data) {
      setIsLoading(false);
    }
  }

  return !isPageLoaded ? (
    <PageLoader />
  ) : isMobile ? (
    <Mobile
      user={user}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleSubmitPassword={handleSubmitPassword}
      isLoading={isLoading}
      setNewPassword={setNewPassword}
      setConfirmPassword={setConfirmPassword}
      newPassword={newPassword}
      confirmPassword={confirmPassword}
    />
  ) : (
    <Desktop
      user={user}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleSubmitPassword={handleSubmitPassword}
      isLoading={isLoading}
      setNewPassword={setNewPassword}
      setConfirmPassword={setConfirmPassword}
      newPassword={newPassword}
      confirmPassword={confirmPassword}
    />
  );
}

export default EditUser;
