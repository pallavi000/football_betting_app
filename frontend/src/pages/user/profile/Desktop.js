import React, { useEffect, useState } from "react";
import { ProfileApi } from "./Action";
import { Link } from "react-router-dom";

function Desktop({ user }) {
  return (
    <div className="week-card-section">
      <div className="add-card-section">
        <div className="active-card-title">Profile</div>
        <div className="d-block">
          <div className="mx-auto">
            <div className="profile-row">
              <div className="profile-name">Name:</div>
              <div className="profile-value">{user.name}</div>
            </div>

            <div className="profile-row">
              <div className="profile-name">Email:</div>
              <div className="profile-value">{user.email}</div>
            </div>

            <div className="profile-row">
              <div className="profile-name">Phone:</div>
              <div className="profile-value">{user.phone}</div>
            </div>

            <div className="profile-row">
              <div className="profile-name">Address:</div>
              <div className="profile-value">{user.address}</div>
            </div>

            <div className="profile-row ">
              <div className="profile-name">Balance:</div>
              <div className="profile-value">${user.balance}</div>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="col me-4">
              <Link
                className="btn-add-card profile-btn"
                to={`/edit-profile/${user._id}`}
              >
                Edit Profile
              </Link>
            </div>

            <div className="col me-4">
              <Link className="btn-add-card profile-btn" to="/change-password">
                Change Password
              </Link>
            </div>

            <div className="col">
              <Link className="btn-add-card profile-btn" to="/add-balance">
                Add Balance
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Desktop;
