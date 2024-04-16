import React from "react";
import { NavLink } from "react-router-dom";

export const FootRight = () => {
  return (
    <>
      <div className="foot-right-row foot">
        <div className="foot-right-col">
          <h3>Quick Links</h3>
          <ul className="foot-list">
          <li>
              <NavLink to={"/registration"}>Login/Signup</NavLink>
            </li>
            <li>
              <NavLink to={"/user-dashboard"}>Dashboard</NavLink>
            </li>
            <li>
              <NavLink to={"/shop"}>Shop</NavLink>
            </li>
            <li>
              <NavLink to={"/wishlist"}>Wishlist</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
