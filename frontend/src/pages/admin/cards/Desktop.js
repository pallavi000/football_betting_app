import React, { useEffect, useState } from "react";
import card from "../../../images/card.png";
import { Link } from "react-router-dom";
import Marquee from "react-easy-marquee";

function Desktop({
  activeCard,
  archivedCard,
  showResult,
  viewAllActive,
  toggleViewAllActiveCard,
  activeCards,
}) {
  return (
    <div>
      <div className="week-card-section">
        <div className="week-card-top">
          <img src={card} className="img-fluid" />

          <div className="week-card-title">Card of the week</div>
          <Link className="new-week-card" to="/admin/add-card">
            Add New{" "}
          </Link>
          <div className="card-round"></div>
        </div>
      </div>

      <div className="active-card-section">
        <div className="d-flex align-items-center justify-content-between">
          <div className="active-card-title">
            Active Cards ({activeCards.length})
          </div>
          {viewAllActive ? (
            <div
              className="mobile-view-all d-flex align-items-center"
              role={"button"}
              onClick={toggleViewAllActiveCard}
            >
              <div className="me-2">Close</div>
              <i className="fa fa-chevron-up"></i>
            </div>
          ) : (
            <div
              className="mobile-view-all d-flex align-items-center"
              role={"button"}
              onClick={toggleViewAllActiveCard}
            >
              <div className="me-2">View All</div>
              <i className="fa fa-chevron-down pl-3"></i>
            </div>
          )}
        </div>
        {activeCard.map((active) => {
          return (
            <Link
              key={active._id}
              className="active-card d-block"
              to={`/admin/update-card/${active._id}`}
            >
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <div className="fw-bold">#{active.id}</div>
                  <div className="active-match">Matches</div>
                </div>
                <div className="active-logo">{active.status}</div>
              </div>
              <Marquee
                duration={30000}
                width="100%"
                height="300px"
                axis="Y"
                pauseOnHover={true}
                reverse={true}
              >
                {active.matches?.map((match) => {
                  return (
                    <div
                      key={match.home_team}
                      className="match-card d-flex align-items-center justify-content-between"
                    >
                      <div className="match-team">
                        <div className="team-img">
                          <img
                            src={match.home_team_image}
                            className="img-fluid"
                          />
                        </div>
                        <div className="team-name">{match.home_team}</div>
                      </div>
                      <div className="vs">VS</div>
                      <div className="match-team">
                        <div className="team-img">
                          <img
                            src={match.away_team_image}
                            className="img-fluid"
                          />
                        </div>
                        <div className="team-name">{match.away_team}</div>
                      </div>
                    </div>
                  );
                })}
              </Marquee>
            </Link>
          );
        })}
      </div>

      <div className="active-card-section">
        <div className="d-flex align-items-center justify-content-between">
          <div className="active-card-title">Archived Cards</div>
          <Link className="mobile-view-all" to="/admin/archived-card">
            View All
          </Link>
        </div>
        {archivedCard.map((archived) => {
          return (
            <div className="active-card">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <div className="fw-bold">#{archived.id}</div>
                  <div className="active-match">Matches</div>
                </div>
                <div className="active-logo archived">{archived.status}</div>
              </div>
              <Marquee
                duration={30000}
                width="100%"
                height="300px"
                axis="Y"
                pauseOnHover={true}
                reverse={true}
              >
                {archived.matches?.map((match) => {
                  return (
                    <div className="match-card d-flex align-items-center justify-content-between">
                      <div className="match-team">
                        <div className="team-img">
                          <img
                            src={match.home_team_image}
                            className="img-fluid"
                          />
                        </div>
                        <div className="team-name">{match.home_team}</div>
                      </div>
                      <div className="vs">{showResult(match.result)}</div>
                      <div className="match-team">
                        <div className="team-img">
                          <img
                            src={match.away_team_image}
                            className="img-fluid"
                          />
                        </div>
                        <div className="team-name">{match.away_team}</div>
                      </div>
                    </div>
                  );
                })}
              </Marquee>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Desktop;
