import React from "react";
import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
const AdminHeader = () => {
  return (
    <>
      <div className="wpadminbar">
        <div className="quicklinks">
          <ul style={{padding:'5px 20px'}} className="row">
            <li >
              <NavLink className="row" to={"/admin/dashboard"}>
                {" "}
                <span>
                  <MdDashboard />
                </span>{" "}
                <span>Dashboard</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
