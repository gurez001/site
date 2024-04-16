import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { FaUpRightFromSquare, FaTrash } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const ProductLabelTable = ({ deletehandler, data }) => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      minWidth: 30,
      flex: 0.3,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 0.3,
    },
    {
      field: "slug",
      headerName: "Slug",
      minWidth: 200,
      flex: 0.3,
    },

    {
      field: "description",
      headerName: "Description",
      minWidth: 200,
      flex: 0.3,
    },
    {
      field: "label",
      headerName: "Label",
      minWidth: 200,
      flex: 0.3,
    },
    {
      field: "color",
      headerName: "color",
      minWidth: 200,
      flex: 0.3,
    },
    {
      field: "action",
      headerName: "Action",
      type: "number",
      minWidth: 200,
      flex: 0.3,
      shortable: false,
      renderCell: (params) => {
        const rowStatus = params.row.status;
        return (
          <>
            <NavLink to={`/admin/update-label/${params.row.attributeid}`}>
              <FaUpRightFromSquare />
            </NavLink>

            <span onClick={() => deletehandler(params.row.attributeid)}>
              <FaTrash />
            </span>
          </>
        );
      },
    },
  ];

  const rows = [];

  if (Array.isArray(data)) {
    data &&
      data.forEach((item, i) => {
        if (item.isdelete !== true) {
          rows.push({
            id: i + 1,
            attributeid: item._id,
            name: item.name,
            slug: item.slug,
            description: item.description,
            label: item.SwatchLabel,
            color: item.color,
          });
        }
      });
  }

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

export default ProductLabelTable;
