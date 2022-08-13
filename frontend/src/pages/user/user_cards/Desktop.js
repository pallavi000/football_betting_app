import React, { useEffect, useState } from "react";
import card from "../../../images/card.png";
import team1 from "../../../images/team1.png";
import team2 from "../../../images/team2.png";
import { cardOfTheWeek, getActiveCard, getArchivedCard } from "./Action";
import { Link } from "react-router-dom";
import Marquee from "react-easy-marquee";
import CardBody from "./CardBody";

function Desktop({
  weekCard,
  activeCard,
  archivedCard,
  showResult,
  viewAllActive,
  activeCards,
  toggleViewAllActiveCard,
  winnerCard,
}) {
  return (
    <div>
      <div className="week-card-section">
        <div className="week-card-top">
          <img src={card} className="img-fluid" />

          <div className="week-card-title">Card of the week</div>
          {weekCard && weekCard._id ? (
            <Link
              className="new-week-card"
              to={`/user-add-card/${weekCard._id}`}
            >
              Add New{" "}
            </Link>
          ) : (
            <button className="new-week-card bg-danger text-white border-0">
              No Card
            </button>
          )}
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
            <div className="active-card d-block">
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

      {/* Winner Card */}
      <CardBody
        title="Winner Card"
        card={winnerCard}
        showResult={showResult}
        viewAllLink="/winner-card"
      />

      {/* Archived Card */}
      <CardBody
        title="Archived Card"
        card={archivedCard}
        showResult={showResult}
        viewAllLink="/archived-card"
      />
    </div>
  );
}

export default Desktop;
