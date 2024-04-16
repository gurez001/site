import React from "react";
import { FaPhone } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
const CallAction = () => {
  return (
    <>
      <div className="c-action">
        <div className="c-action-row">
          <NavLink to={"tel:1234567890"}>
            <div className="c-act-icon">
              <FaPhone />
            </div>
            <div className="c-act-content">
              <p>Call Us Now:</p>
              <p>
                <b>1234567890</b>
              </p>
            </div>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default CallAction;
