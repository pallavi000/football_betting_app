import React, { useEffect, useState } from "react";
import { format } from "timeago.js";
import Echart from "./Echart";
import DataTable from "react-data-table-component";
import moment from "moment";

function Desktop({
  totalBalance,
  thisMonthBalance,
  previousMonthBalance,
  yesterdayBalance,
  everyHourData,
  latestBets,
}) {
  const [label, setLabel] = useState([]);
  const [values, setValues] = useState([]);

  function convertNumberToHM(number) {
    const currentHour = new Date().getHours();
    number = number.toString().split("").length > 1 ? number : "0" + number;
    if (number === currentHour) {
      return `Now, ${number}:00`;
    } else {
      return `${number}:00`;
    }
  }

  useEffect(() => {
    var lbl = [];
    var vl = [];
    for (const evd of everyHourData) {
      lbl.push(convertNumberToHM(evd._id));
      vl.push(evd.price);
    }
    setLabel(lbl);
    setValues(vl);
  }, []);

  const options = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: "category",
      data: label,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: values,
        type: "line",
        smooth: true,
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };

  const columns = [
    {
      name: "Amount",
      cell: (item) => (
        <>
          ${item.price}
          {item.status === "winner" ? (
            <div className="badge bg-success text-capitalize ms-2">
              {item.status}
            </div>
          ) : item.status === "active" ? (
            <div className="badge bg-primary text-capitalize ms-2">
              {item.status}
            </div>
          ) : (
            <div className="badge bg-danger text-capitalize ms-2">
              {item.status}
            </div>
          )}
        </>
      ),
      grow: 2,
      sortable: true,
    },
    {
      name: "Card ID",
      selector: (item) => item.id,
      sortable: true,
      cellExport: (item) => item.id,
      grow: 2,
    },
    {
      name: "Customer",
      cell: (item) => `${item.user_id?.name} (${item.user_id?.email})`,
      sortable: true,
      grow: 3,
    },
    {
      name: "Date",
      cell: (item) => moment(item.createdAt).format("lll"),
      sortable: true,
      grow: 2,
    },
  ];

  return (
    <>
      <div className="container-fluid my-5 p-3 shadow">
        <h3 className="header ms-2 mb-3">Stats</h3>
        <div className="row">
          <div className="col-lg-8 col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <div className="balance-container">
                      <span className="text-secondary">This Month</span>
                      <div className="dashboard-balance">
                        ${thisMonthBalance}
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="balance-container">
                      <span className="text-secondary">Yesterday</span>
                      <div className="dashboard-balance">
                        ${yesterdayBalance}
                      </div>
                    </div>
                  </div>
                </div>

                <Echart options={options} />
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="balance-container">
                  <span className="text-secondary">Total Company Balance</span>
                  <div className="dashboard-balance">${totalBalance}</div>
                </div>
                <div className="balance-container">
                  <span className="text-secondary">Previous Month</span>
                  <div className="dashboard-balance">
                    ${previousMonthBalance}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid my-5 p-3 shadow">
        <h3 className="header ms-2 mb-3">Latest Bets</h3>
        <DataTable data={latestBets} columns={columns} />
      </div>
    </>
  );
}

export default Desktop;
