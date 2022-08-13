import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import image from "../../../images/card.png";
import { LoginApi } from "./Action";
import $ from "jquery";

function Mobile({ login, isLoading, setEmail, setPassword }) {
  useEffect(() => {
    $(".mobile-header").hide();
    return () => {
      $(".mobile-header").css("display", "fixed");
    };
  }, []);

  return (
    <div className="mobile-login-section">
      <div className="mobile-image">
        <img src={image} className="img-fluid"></img>
      </div>
      <div className="login-card">
        <form onSubmit={(e) => login(e)}>
          <div className="login-card-title">Welcome</div>
          <div className="mobile-form-group">
            <input
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
          </div>
          <div className="mobile-form-group">
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Reminder me
              </label>
            </div>
            <div className="mobile-forgot-password">Forgot Password</div>
          </div>
          {isLoading ? (
            <button type="submit" className="mobile-submit-btn" disabled>
              Signing
            </button>
          ) : (
            <button type="submit" className="mobile-submit-btn">
              Sign In
            </button>
          )}
        </form>
        <div className="mobile-new-account">
          Don't have account?{" "}
          <Link to="/register">
            <span>Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Mobile;
