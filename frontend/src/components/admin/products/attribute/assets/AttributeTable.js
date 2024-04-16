import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  ClearError,
  GetProductAttributeAction,
  StatusProductAttributeAction,
} from "../../../../../actions/ProductAction";
import { FaUpRightFromSquare, FaTrash } from "react-icons/fa6";
import { NavLink, useParams } from "react-router-dom";
import Loader from "../../../../layout/loader/Loader";

const AttributeTable = ({deletehandler}) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  const { loading, success, data, error } = useSelector(
    (state) => state.adminCreateProductAttribute
  );

  

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
      minWidth: 50,
      flex: 0.3,
      renderCell: (params) => {
        return (
          <>
            <NavLink
              to={`/admin/product-label/${params.row.slug}/${params.row.attributeid}`}
            >
              {params.row.name}
            </NavLink>
          </>
        );
      },
    },
    {
      field: "slug",
      headerName: "Slug",
      minWidth: 200,
      flex: 0.3,
    },

    {
      field: "type",
      headerName: "Type",
      minWidth: 200,
      flex: 0.3,
    },
    {
      field: "order",
      headerName: "Order by",
      minWidth: 200,
      flex: 0.3,
    },
    {
      field: "terms",
      headerName: "Terms",
      minWidth: 200,
      flex: 0.3,
      renderCell: (params) => {
        const rowStatus = params.row.status;
        return (
          <>
            {params.value.map((item, index) => (
              <p key={index}>{item.name}, </p>
            ))}
          </>
        );
      },
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
            <NavLink to={`/admin/update-attribute/${params.row.attributeid}`}>
              <FaUpRightFromSquare />
            </NavLink>

            <span onClick={(e) => deletehandler(params.row.attributeid)}>
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
            type: item.typevalue,
            order: item.orderValue,
            terms: item.labelid,
          });
        }
      });
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          // page={10}
          disableSelectionOnClick
          className="product-list-table"
          autoHeight
        />
      )}
    </>
  );
};

export default AttributeTable;
