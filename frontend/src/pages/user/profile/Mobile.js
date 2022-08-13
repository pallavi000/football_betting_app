import React, { useEffect, useState } from "react";
import profile from "../../../images/login.png";
import { ProfileApi } from "./Action";
import { Link } from "react-router-dom";

function Mobile({ user, logout }) {
  return (
    <div className="profile-section">
      <div className="profile-image">
        <img src={profile} className="img-fluid" />
        <div className="profile-edit-icon" onClick={logout}>
          <i className="fa-solid fa-sign-out" role={"button"}></i>
        </div>
      </div>
      <div className="profile-name">{user.name}</div>
      <div className="profile-card-detail d-flex align-items-center">
        <div className="profile-card-icon">
          <i className="fa-regular fa-user"></i>
        </div>
        <div className="profile-card-name">
          <div className="user-name">Name</div>
          <div className="profile-value">{user.name}</div>
        </div>
      </div>

      <div className="profile-card-detail d-flex align-items-center">
        <div className="profile-card-icon">
          <i className="fa-solid fa-envelope"></i>
        </div>
        <div className="profile-card-name">
          <div className="user-name">Email</div>
          <div className="profile-value">{user.email}</div>
        </div>
      </div>

      <div className="profile-card-detail d-flex align-items-center">
        <div className="profile-card-icon">
          <i className="fa-solid fa-phone"></i>
        </div>
        <div className="profile-card-name">
          <div className="user-name">Phone</div>
          <div className="profile-value">{user.phone}</div>
        </div>
      </div>

      <div className="profile-card-detail d-flex align-items-center">
        <div className="profile-card-icon">
          <i className="fa-solid fa-address-book"></i>
        </div>
        <div className="profile-card-name">
          <div className="user-name">Address</div>
          <div className="profile-value">{user.address}</div>
        </div>
      </div>

      <div className="profile-card-detail d-flex align-items-center">
        <div className="profile-card-icon">
          <i className="fa-solid fa-money-bill"></i>
        </div>
        <div className="profile-card-name">
          <div className="user-name">My Balance</div>
          <div className="profile-value d-flex align-items-center justify-content-between">
            ${user.balance}{" "}
            <Link className="text-white position-relative" to="/add-balance">
              <i className="fa-solid fa-pencil position-relative text-white"></i>
            </Link>
          </div>
        </div>
      </div>
      <div className="row gap-2">
        <Link
          to={`/edit-profile/${user?._id}`}
          className="mobile-submit-btn col"
        >
          Edit Profile
        </Link>
        <Link to="/change-password" className="mobile-submit-btn col">
          Change Password
        </Link>
      </div>
    </div>
  );
}

export default Mobile;
