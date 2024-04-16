import React from "react";
import { NavList } from "./NavList";
import { Search } from "./Search";
import { FaXmark } from "react-icons/fa6";

export const MobNav = ({ isContentVisible, toggleContentRemove }) => {
  return (
    <>
      <div
        id={isContentVisible === true ? "nav-trans" : "no-trans"}
        className="mob-nav"
      >
        <div className="mob-call">
          <div className="side-top-bar row space-between-center">
            <div className="col-md-10">
            <Search />
            </div>
            <div className="hab-remove col-md-3">
              <FaXmark onClick={toggleContentRemove} />
            </div>
          </div>
          <NavList toggleContentRemove={toggleContentRemove} />
        </div>
      </div>
    </>
  );
};
