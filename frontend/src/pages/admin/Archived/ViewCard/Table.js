import React from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

function Table({ columns, data }) {
  return (
    <DataTableExtensions
      columns={columns}
      data={data}
      print={true}
      export={true}
      exportHeaders={true}
    >
      <DataTable pagination />
    </DataTableExtensions>
  );
}

export default Table;
