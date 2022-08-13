import React, { useEffect, useState } from "react";
import cardImage from "../../../images/cw.png";
import team1 from "../../../images/team1.png";
import team2 from "../../../images/team2.png";
import card from "../../../images/card.png";
import { getActiveCard, getArchivedCard } from "./Action";
import { Link } from "react-router-dom";
import Marquee from "react-easy-marquee";

function Mobile({
  activeCard,
  archivedCard,
  showResult,
  viewAllActive,
  toggleViewAllActiveCard,
  activeCards,
}) {
  return (
    <div className="mobile-card-section">
      <div className="mobile-card-top">
        <div className="week-card-top">
          <img src={card} className="img-fluid" />
          <div className="week-card-title">Card of the week</div>
          <Link className="new-week-card" to="/admin/add-card">
            Add New{" "}
          </Link>
          <div className="card-round"></div>
        </div>
        {/* <img src={cardImage} className="img-fluid"/> */}
      </div>
      <div className="mobile-card">
        <div className="d-flex align-items-center justify-content-between">
          <div className="mobile-card-active">
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
              className="active-card-section d-block"
              to={`/admin/update-card/${active._id}`}
            >
              <div className="d-flex align-items-center justify-content-between pb-3">
                <div className="fw-bold text-white">#{active.id}</div>
                <div className="active-card-action text-capitalize">
                  {active.status}
                </div>
              </div>
              <Marquee
                duration={30000}
                width="100%"
                height="150px"
                axis="Y"
                pauseOnHover={true}
                reverse={true}
              >
                {active.matches?.map((match) => {
                  return (
                    <div className="d-flex justify-content-between align-items-center mt-4 w-100">
                      <div className="card-image-logo d-flex align-items-center">
                        <div className="team1-img">
                          <img
                            src={match.home_team_image}
                            className="img-fluid"
                          />
                        </div>
                        <div className="team1-img">
                          <img
                            src={match.away_team_image}
                            className="img-fluid"
                          />
                        </div>
                      </div>
                      <div className="card-team-name">
                        {match.home_team_nickname} VS {match.away_team_nickname}{" "}
                      </div>
                    </div>
                  );
                })}
              </Marquee>
            </Link>
          );
        })}
      </div>

      {archivedCard.map((archived) => {
        return (
          <div className="mobile-card">
            <div className="d-flex align-items-center justify-content-between">
              <div className="mobile-card-active">Archived Card</div>
              <Link className="mobile-view-all" to="/admin/archived-card">
                View All
              </Link>
            </div>
            <div className="active-card-section">
              <div className="d-flex align-items-center justify-content-between pb-3">
                <div className="fw-bold text-white">#{archived.id}</div>
                <div className="active-card-action">{archived.status}</div>
              </div>
              <Marquee
                duration={30000}
                width="100%"
                height="300px"
                axis="Y"
                pauseOnHover={true}
                reverse={true}
              >
                {archived.matches?.map((arch) => {
                  return (
                    <div className="d-flex justify-content-between align-items-center mt-4 w-100">
                      <div className="card-image-logo d-flex align-items-center">
                        <div className="team1-img">
                          <img
                            src={arch.home_team_image}
                            className="img-fluid"
                          />
                        </div>
                        <div className="team1-img">
                          <img
                            src={arch.away_team_image}
                            className="img-fluid"
                          />
                        </div>
                      </div>
                      <div className="card-team-name">
                        {arch.home_team_nickname} {showResult(arch.result)}{" "}
                        {arch.away_team_nickname}{" "}
                      </div>
                    </div>
                  );
                })}
              </Marquee>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Mobile;
