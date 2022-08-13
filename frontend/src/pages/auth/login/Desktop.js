import axios from "axios";
import React, { useEffect, useState } from "react";
import image from "../../../images/signup.png";
import { LoginApi } from "./Action";
import $ from "jquery";
import FileSubmitLoader from "../../Loader/FileSubmitLoader";
import { Link } from "react-router-dom";

function Desktop({ login, isLoading, setEmail, setPassword }) {
  useEffect(() => {
    $(".content-section").css("max-width", "100%");
  }, []);

  return (
    <>
      {isLoading && <FileSubmitLoader />}
      <div className="login-section">
        <div className="row">
          <div className="col-md-6 login-image-section">
            <div className="login-image">
              <img src={image} className="img-fluid" />
              <div className="welcome">
                Welcome Back
                <span>Just a couple of clicks and we start</span>
              </div>
            </div>
          </div>
          <div className="col-md-6 login-form-section">
            <form onSubmit={(e) => login(e)}>
              <div className="login-title">Sign In</div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
              {isLoading ? (
                <button className="login-btn">Submitting</button>
              ) : (
                <button className="login-btn">Submit</button>
              )}
              <div className="new-account">
                Don't have an account?{" "}
                <Link to="/register">
                  <span>Sign Up</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Desktop;
