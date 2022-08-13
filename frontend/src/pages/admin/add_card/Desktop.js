import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AddCardApi, getTeamList } from "./Action";
import Select from "react-select";
import FileSubmitLoader from "../../Loader/FileSubmitLoader";

function Desktop({
  handleChange,
  handleSubmit,
  count,
  teams,
  setAmount,
  setReward,
  isLoading,
  isAllFilled,
}) {
  return (
    <>
      {isLoading && <FileSubmitLoader />}
      <div className="add-card-section">
        <div className="add-card-title">Add Card</div>
        {teams.length === 0 && (
          <div className="alert alert-danger d-flex align-items-center">
            No Teams Added Yet. You should add team first before adding card.{" "}
            <Link to="/admin/teams/create" className="nav-link">
              Add Here
            </Link>
          </div>
        )}
        <div className="">
          <form onSubmit={(e) => handleSubmit(e)}>
            {count.map((team, index) => {
              return (
                <>
                  <div className="form-group row align-items-end">
                    <div className="col">
                      <label>Home Team</label>
                      <Select
                        onChange={(e) => handleChange(e, index, "home_team")}
                        options={teams}
                        name="home_team"
                        className="team-select"
                        placeholder="Home Team"
                        formatOptionLabel={(team) => (
                          <div className="d-flex align-items-center">
                            <img
                              src={team.image}
                              className="bg-transparent shadow-none"
                              height={30}
                            />
                            <span>{team.label}</span>
                          </div>
                        )}
                      />
                    </div>
                    <div className="col-md-1">VS</div>
                    <div className="col">
                      <label>Away Team</label>
                      <Select
                        onChange={(e) => handleChange(e, index, "away_team")}
                        options={teams}
                        name="away_team"
                        className="team-select"
                        placeholder="Away Team"
                        formatOptionLabel={(team) => (
                          <div className="d-flex align-items-center">
                            <img
                              src={team.image}
                              className="bg-transparent shadow-none"
                              height={30}
                            />
                            <span>{team.label}</span>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </>
              );
            })}

            <div className="form-group">
              <label>Amount </label>
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  $
                </span>
                <input
                  className="form-control"
                  name=""
                  type="number"
                  placeholder="Price"
                  onChange={(e) => setAmount(e.target.value)}
                  required
                ></input>
              </div>
            </div>

            <div className="form-group">
              <label>Reward </label>
              <div className="input-group">
                <span className="input-group-text" id="basic-addon2">
                  $
                </span>
                <input
                  className="form-control"
                  name=""
                  type="number"
                  placeholder="Reward for winner"
                  onChange={(e) => setReward(e.target.value)}
                  required
                ></input>
              </div>
            </div>

            {isLoading ? (
              <button className="btn-add-card" disabled>
                Adding.. <i className="fa-solid fa-arrow-right"></i>
              </button>
            ) : !isAllFilled ? (
              <button className="btn-add-card" disabled>
                Fill Out Form <i className="fa-solid fa-arrow-right"></i>
              </button>
            ) : (
              <button className="btn-add-card">
                Add <i className="fa-solid fa-arrow-right"></i>
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default Desktop;
