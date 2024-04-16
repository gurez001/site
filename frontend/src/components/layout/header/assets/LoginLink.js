import { NavLink } from "react-router-dom";
import React from "react";
import { FaUserLarge } from "react-icons/fa6";
import Profile from "../../profile/Profile";
import { useSelector } from "react-redux";
import { LoadUser } from "../../../../actions/UserAction";
import Loader from "../../loader/Loader";

// export const LoginLink = ({ event, isContentVisible }) => {
export const LoginLink = ({ event, isContentVisible }) => {
  const { loading, isAuthenticated, user } = useSelector(
    (state) => state.user || {}
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="log-anc">
            {!isAuthenticated ? (
              <div className="log-act-l">
                <NavLink to={"/registration"}>
                  <span>
                    <FaUserLarge />
                  </span>
                  <span>Login/SingUp</span>
                </NavLink>
              </div>
            ) : (
              <div>
                <Profile user={user} isAuthenticated={isAuthenticated} />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};
