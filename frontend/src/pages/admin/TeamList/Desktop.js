import React, { useEffect, useState } from "react";
import { getTeam } from "./Action";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

function Desktop({ teams }) {
  const columns = [
    {
      name: "Image",
      cell: (item) => (
        <>
          <img src={item.image} className="py-2" width={36} />
        </>
      ),
      cellExport: (item) => item.image,
    },
    {
      name: "Name",
      cell: (item) => item.name,
      sortable: true,
    },
    {
      name: "Short Name",
      cell: (item) => item.nickname,
      sortable: true,
    },

    {
      name: "Date",
      cell: (item) => format(item.createdAt),
      sortable: true,
    },
  ];

  return (
    <div className="week-card-section">
      <div className="active-card-section w-100">
        <div className="active-card-title">Team lists</div>
        <Link
          className="btn btn-primary mb-2 float-end"
          to="/admin/teams/create"
        >
          Add Team
        </Link>
        <DataTableExtensions
          columns={columns}
          data={teams}
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
