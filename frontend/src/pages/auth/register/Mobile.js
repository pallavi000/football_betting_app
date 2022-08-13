import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RegisterApi } from "./Action";
import * as Toastr from "toastr";
import "../../../../node_modules/toastr/build/toastr.css";
import $ from "jquery";

function Mobile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loader, setLoader] = useState(false);

  async function register(e) {
    e.preventDefault();
    if (password.trim() != confirm.trim()) {
      return Toastr.error("Password and Confirm password did not match");
    }
    setLoader(true);
    await RegisterApi(name, email, password);
    setLoader(false);
  }

  useEffect(() => {
    $(".mobile-header").hide();
    return () => {
      $(".mobile-header").css("display", "fixed");
    };
  }, []);

  return (
    <div className="mobile-register-section h-100">
      <div className="login-card-title">Welcome</div>
      <form onSubmit={(e) => register(e)}>
        <div className="mobile-form-group">
          <input
            type="text"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
            required
          ></input>
        </div>
        <div className="mobile-form-group">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
        </div>
        <div className="mobile-form-group">
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
        </div>
        <div className="mobile-form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirm(e.target.value)}
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
            <label className="form-check-label" for="flexCheckDefault">
              Reminder me
            </label>
          </div>
          <div className="mobile-forgot-password">Forgot Password</div>
        </div>
        {loader ? (
          <button className="mobile-submit-btn" disabled>
            Processing
          </button>
        ) : (
          <button className="mobile-submit-btn">Register</button>
        )}
      </form>
      <div className="mobile-new-account">
        Already have an account?{" "}
        <Link to="/login">
          <span>Sign In</span>
        </Link>
      </div>
    </div>
  );
}

export default Mobile;
