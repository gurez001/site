import { DataGrid } from "@material-ui/data-grid";
import React from "react";

const DataGridTable = ({ rows, columns }) => {
  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        // page={10}
        disableSelectionOnClick
        className="product-list-table"
        autoHeight
      />
    </>
  );
};

export default DataGridTable;
