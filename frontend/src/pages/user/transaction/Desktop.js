import React, { useEffect, useState } from "react";
import { getTransactionById } from "./Action";
import DataTable from "react-data-table-component";
import { format } from "timeago.js";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

function Desktop({ transactions, getPaymentMethod }) {
  const columns = [
    {
      name: "Transaction Id",
      selector: (item) => item._id,
      sortable: true,
      cellExport: (item) => item._id,
    },
    {
      name: "Amount",
      cell: (item) => "$" + item.amount,
      sortable: true,
    },
    {
      name: "Payment Method",
      cell: (item) => (
        <div className="text-capitalize">{getPaymentMethod(item)}</div>
      ),
      sortable: true,
    },
    {
      name: "Created At",
      cell: (item) => format(item.createdAt),
      sortable: true,
    },
  ];

  return (
    <div className="content-wrapper">
      <div className="container-fluid px-5 mt-5 ">
        <div className="active-card-title">Transaction List</div>
        <DataTableExtensions
          columns={columns}
          data={transactions}
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
