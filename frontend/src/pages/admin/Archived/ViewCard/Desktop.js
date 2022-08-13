import React from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import Table from "./Table";

function Desktop({ card, showResult }) {
  const columns = [
    {
      name: "ID",
      selector: (item) => item.id,
      sortable: true,
      cellExport: (item) => item.id,
    },
    {
      name: "User Name",
      cell: (item) => item.user_id?.name,
      sortable: true,
    },
    {
      name: "User Email",
      cell: (item) => item.user_id?.email,
      sortable: true,
    },
    {
      name: "Date",
      cell: (item) => format(item.createdAt),
      sortable: true,
    },
    {
      name: "View",
      cell: (item) => (
        <Link
          to={`${
            item.reward
              ? "/winner-card/" + item.user_card_id
              : "/archived-card/" + item._id
          }`}
          className="btn btn-primary btn-sm"
        >
          View
        </Link>
      ),
      cellExport: (item) => "View",
    },
  ];

  return (
    <div className="update-card-section">
      <div className="update-card-title">View Result - #{card.id}</div>
      <div className="update-card-title">Bets - {card.userCards?.length}</div>
      <div className="update-card-title">
        Winners - {card.winnersUsers?.length}
      </div>
      <table className="text-center">
        <thead>
          <tr>
            <th className="text-start">Home Team</th>
            <th>Result</th>
            <th className="text-end">Away Team</th>
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
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="update-card-title mt-5">Winners</div>
      <Table columns={columns} data={card.winnersUsers} />

      <div className="update-card-title mt-5">Betting</div>
      <Table columns={columns} data={card.userCards} />
    </div>
  );
}

export default Desktop;
