import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FileSubmitLoader from "../../Loader/FileSubmitLoader";
import { getCardById, updateResultById } from "./Action";
import DesktopEle from "./DesktopEle";

function Desktop({
  card,
  results,
  setResults,
  isLoading,
  isAllFilled,
  updateResult,
}) {
  return (
    <>
      {isLoading && <FileSubmitLoader />}
      <div className="update-card-section">
        <div className="update-card-title">Update Result</div>
        <table className="text-center">
          <thead>
            <tr>
              <th>Home Team</th>
              <th>Win</th>
              <th>Draw</th>
              <th>Win</th>
              <th>Away Team</th>
            </tr>
          </thead>
          <tbody>
            {card.matches?.map((match, index) => {
              return (
                <DesktopEle
                  match={match}
                  index={index}
                  results={results}
                  setResults={setResults}
                />
              );
            })}
          </tbody>
        </table>
        {isLoading ? (
          <button className="btn-add-card" disabled>
            Updating<i className="fa-solid fa-arrow-right"></i>
          </button>
        ) : !isAllFilled ? (
          <button className="btn-add-card" disabled>
            Fill Out Form<i className="fa-solid fa-arrow-right"></i>
          </button>
        ) : (
          <button className="btn-add-card" onClick={() => updateResult()}>
            Update Result<i className="fa-solid fa-arrow-right"></i>
          </button>
        )}
      </div>
    </>
  );
}

export default Desktop;
