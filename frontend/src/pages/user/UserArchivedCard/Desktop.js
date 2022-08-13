import React from "react";
import DataTable from "react-data-table-component";
import { format } from "timeago.js";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { Link } from "react-router-dom";

function Desktop({ archived, viewLink = "/archived-card" }) {
  const columns = [
    {
      name: "Card ID",
      selector: (item) => item.id,
      sortable: true,
      cellExport: (item) => item.id,
    },
    {
      name: "Status",
      cell: (item) => item.status,
      sortable: true,
    },
    {
      name: "Date",
      cell: (item) => format(item.createdAt),
      sortable: true,
    },
    {
      name: "Action",
      cell: (item) => (
        <Link to={`${viewLink}/${item._id}`} className="btn btn-primary btn-sm">
          View
        </Link>
      ),
      cellExport: (item) => "/archived-card/" + item._id,
    },
  ];

  return (
    <div className="week-card-section">
      <div className="active-card-section w-100">
        <div className="active-card-title">Archived Cards</div>
        <DataTableExtensions
          columns={columns}
          data={archived}
          print={true}
          export={true}
          exportHeaders={true}
        >
          <DataTable pagination />
        </DataTableExtensions>
      </div>
    </div>
  );
}

export default Desktop;
