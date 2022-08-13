import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import DesktopEle from "../../admin/update_card/DesktopEle";
import { globalContext } from "../../../global/GlobalContext";
import FileSubmitLoader from "../../Loader/FileSubmitLoader";

function Desktop({
  card,
  results,
  setResults,
  isLoading,
  isAllFilled,
  handleSubmit,
}) {
  const { currentUser } = useContext(globalContext);

  return (
    <>
      {isLoading && <FileSubmitLoader />}
      <div className="update-card-section">
        <div className="update-card-title">Add Card</div>

        {currentUser && currentUser.balance < card.balance && (
          <div className="alert alert-danger">
            You do not have enough balance to add card. please add balance
            first. <Link to="/add-balance">Go Here</Link>
          </div>
        )}
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
            Paying<i className="fa-solid fa-arrow-right"></i>
          </button>
        ) : currentUser && currentUser.balance < card.balance ? (
          <button className="btn-add-card" disabled>
            Not Enough Balance<i className="fa-solid fa-arrow-right"></i>
          </button>
        ) : !isAllFilled ? (
          <button className="btn-add-card" disabled>
            Fill Out Form<i className="fa-solid fa-arrow-right"></i>
          </button>
        ) : (
          <button className="btn-add-card" onClick={() => handleSubmit()}>
            Pay ({card.balance})<i className="fa-solid fa-arrow-right"></i>
          </button>
        )}
      </div>
    </>
  );
}

export default Desktop;
