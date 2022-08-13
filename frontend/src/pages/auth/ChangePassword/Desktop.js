import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileSubmitLoader from "../../Loader/FileSubmitLoader";
import { PasswordChange } from "./Action";

function Desktop() {
  const [isLoading, setIsLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    setIsLoading(true);
    e.preventDefault();
    const data = {
      newpassword: newPassword,
      confirmpassword: confirmPassword,
    };
    var response = await PasswordChange(data);
    setIsLoading(false);
    navigate(-1);
  }
  return (
    <>
      {isLoading && <FileSubmitLoader />}
      <div className="add-card-section">
        <div className="add-card-title">Change Password</div>
        <div className="">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group">
              <label>New Password</label>
              <input
                className="form-control"
                type="password"
                onChange={(e) => setNewPassword(e.target.value)}
                required
              ></input>
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                className="form-control"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              ></input>
            </div>
            {isLoading ? (
              <button className="btn-add-card">
                Updating... <i className="fa-solid fa-arrow-right"></i>
              </button>
            ) : (
              <button className="btn-add-card">
                Update<i className="fa-solid fa-arrow-right"></i>
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default Desktop;
