import React, { useState } from "react";
import team1 from "../../../images/team1.png";
import team2 from "../../../images/team2.png";

function DesktopEle({ match, index, results, setResults }) {
  const [selected, setSelected] = useState("");

  function handleClick(result, index) {
    var newResult = [...results];
    newResult[index].result = result;
    setResults(newResult);
    setSelected(result);
  }

  return (
    <tr className="tr-border">
      <td className="text-start ps-2">
        <img src={match.home_team_image} className="img-fluid"></img> &nbsp;
        {match.home_team}
      </td>
      <td>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name={`flexRadioDefault${index}`}
            onChange={(e) => handleClick("home", index)}
            id="flexRadioDefault1"
          />
          <label className="form-check-label" for="flexRadioDefault1"></label>
        </div>
      </td>
      <td>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name={`flexRadioDefault${index}`}
            id="flexRadioDefault1"
            onChange={(e) => handleClick("draw", index)}
          />
          <label className="form-check-label" for="flexRadioDefault1"></label>
        </div>
      </td>
      <td>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name={`flexRadioDefault${index}`}
            id="flexRadioDefault1"
            onChange={(e) => handleClick("away", index)}
          />
          <label className="form-check-label" for="flexRadioDefault1"></label>
        </div>
      </td>
      <td className="text-end pe-2">
        {match.away_team}
        <img src={match.away_team_image} className="img-fluid"></img>
      </td>
    </tr>
  );
}

export default DesktopEle;
