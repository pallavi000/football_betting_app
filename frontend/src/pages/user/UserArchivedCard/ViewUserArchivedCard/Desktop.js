import React from "react";

function Desktop({ card, showResult }) {
  console.log(card);
  return (
    <div className="update-card-section">
      <div className="update-card-title">View Result - #{card.id}</div>

      <table className="text-center">
        <thead>
          <tr>
            <th>Home Team</th>
            <th>Prediction</th>
            <th>Away Team</th>
            <th>Result</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {card.matches?.map((match, index) => {
            return (
              <tr className="tr-border">
                <td className="text-start ps-2">
                  <img src={match.home_team_image} className="img-fluid"></img>{" "}
                  &nbsp;
                  {match.home_team}
                </td>
                <td>{showResult(match.result)}</td>
                <td className="text-end pe-2">
                  {match.away_team}
                  <img src={match.away_team_image} className="img-fluid"></img>
                </td>
                <td>{showResult(match?.match?.result)}</td>
                <td>
                  {match.result === match?.match?.result ? (
                    <i className="fa fa-check-circle text-success"></i>
                  ) : (
                    <i className="fa fa-times-circle text-danger"></i>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Desktop;
