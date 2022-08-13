import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileSubmitLoader from "../../Loader/FileSubmitLoader";
import { addTeam } from "./Action";

function Desktop({ handleSubmit, setNickname, setName, setImage, isLoading }) {
  return (
    <>
      {isLoading && <FileSubmitLoader />}
      <div className="add-card-section">
        <div className="add-card-title">Add New Team</div>
        <div className="">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group">
              <label>Team Name</label>
              <input
                className="form-control"
                placeholder="i.e. Chelsea"
                type="text"
                onChange={(e) => setName(e.target.value)}
                required
              ></input>
            </div>
            <div className="form-group">
              <label>Team Short Name</label>
              <input
                className="form-control"
                placeholder="i.e. CHE"
                type="text"
                onChange={(e) => setNickname(e.target.value)}
                required
              ></input>
            </div>

            <div className="form-group">
              <label>Image</label>
              <input
                className="form-control"
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                required
              ></input>
            </div>
            {isLoading ? (
              <button className="btn-add-card">
                Submitting... <i className="fa-solid fa-arrow-right"></i>
              </button>
            ) : (
              <button className="btn-add-card" type="submit">
                Submit<i className="fa-solid fa-arrow-right"></i>
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default Desktop;
