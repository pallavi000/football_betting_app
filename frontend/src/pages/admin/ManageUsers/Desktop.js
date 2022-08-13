import React from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

function Desktop({ users }) {
  const columns = [
    {
      name: "Name",
      cell: (item) => item.name,
    },
    {
      name: "Email",
      cell: (item) => item.email,
      sortable: true,
    },
    {
      name: "Phone",
      cell: (item) => item.phone,
      sortable: true,
    },
    {
      name: "Address",
      selector: (item) => item.address,
      sortable: true,
      cellExport: (item) => item.address,
    },
    {
      name: "Balance",
      cell: (item) => "$" + item.balance,
      sortable: true,
    },
    {
      name: "Joined At",
      cell: (item) => format(item.createdAt),
      sortable: true,
    },
    {
      name: "Manage",
      cell: (item) => (
        <Link
          className="btn btn-primary btn-sm"
          to={`/admin/users/${item._id}/edit`}
        >
          <i className="fa fa-pencil-alt"></i>
        </Link>
      ),
      sortable: true,
      cellExport: (item) => "Edit",
    },
  ];

  return (
    <div className="week-card-section">
      <div className="active-card-section w-100">
        <div className="active-card-title">Users</div>
        <DataTableExtensions
          columns={columns}
          data={users}
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
