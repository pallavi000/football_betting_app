import React from "react";
import Marquee from "react-easy-marquee";
import { Link } from "react-router-dom";

function CardBody({ title, card, showResult, viewAllLink }) {
  return (
    <div className="active-card-section">
      <div className="d-flex align-items-center justify-content-between">
        <div className="active-card-title">
          {title} ({card.length})
        </div>
        <Link className="mobile-view-all" to={viewAllLink}>
          View All
        </Link>
      </div>
      {card.map((archived) => {
        return (
          <div className="active-card">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                <div className="fw-bold">#{archived.id}</div>
                <div className="active-match">Matches</div>
              </div>
              <div className={`active-logo ${archived.status}`}>
                {archived.status}
              </div>
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
  );
}

export default CardBody;
