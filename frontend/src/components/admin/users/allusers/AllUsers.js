import { Aside } from "../../aside/Aside";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import { NavLink, useNavigate } from "react-router-dom";
import "./allusers.css";
import { FaUpRightFromSquare, FaTrash } from "react-icons/fa6";

import {
  getAllUsers,
  ClearError,
  deleteuser,
} from "../../../../actions/UserAction";
import { DELETE_USER_RESET } from "../../../../constants/UserConstants";
import { Helmet } from "react-helmet";
import MetaData from "../../../layout/metaData/MetaData";

export const AllUsers = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const Navigate = useNavigate();
  const { error, users, loading } = useSelector((state) => state.adminUsers);
  const {
    error: deletError,
    isDeleted,
    message,
  } = useSelector((state) => state.adminProfile);

  const deletehandler = (id) => {
    dispatch(deleteuser(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }
    if (deletError) {
      alert.error(deletError);
      dispatch(ClearError());
    }
    if (isDeleted) {
      alert.success(message);
      // Navigate("/admin/dashboard");
      dispatch({
        type: DELETE_USER_RESET,
      });
    }
    dispatch(getAllUsers());
  }, [alert, dispatch, error, Navigate, deletError, isDeleted, message]);

  const columns = [
    {
      field: "id",
      headerName: "User id",
      minWidth: 200,
      flex: 0.3,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 0.3,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 0.3,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 100,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "colorYellow"
          : "colorRed";
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
        return (
          <>
            <MetaData
              title={"Admin all users"}
              content={"Admin all users"}
              keywords={"Admin all users"}
            />
            <NavLink
              to={`/admin/user-update/${params.getValue(params.id, "id")}`}
            >
              <FaUpRightFromSquare />
            </NavLink>
            <span
              onClick={() => deletehandler(params.getValue(params.id, "id"))}
            >
              <FaTrash />
            </span>
          </>
        );
      },
    },
  ];

  const rows = [];
  users &&
    users.forEach((item, i) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <>
      <Helmet>
        <title itemProp="name" lang="en">
          Admin All Users
        </title>
        <meta name="keywords" content="Admin All Users" />
      </Helmet>
      <div className="admin-page">
        <div className="admin-page-area">
          <Aside />
          <div id="ad-body">
            <div className="ad-cont">
              <section className="page-section">
                <div className="all-user-cont">
                  <div className="all-user-content-area">
                    <div className="all-user-title">
                      <h1>All Users</h1>
                    </div>
                    <div className="userdata">
                      <DataGrid
                        rows={rows}
                        columns={columns}
                        // page={10}
                        disableSelectionOnClick
                        className="user-list-table"
                        autoHeight
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
