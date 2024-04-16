import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import { LogoutUser } from "../../../actions/UserAction";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {
  FaGauge,
  FaUser,
  FaBagShopping,
  FaArrowRightFromBracket,
} from "react-icons/fa6";
import { server_url } from "../../../utils/Url";

const Profile = ({ isAuthenticated, user }) => {
  const Navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const alert = useAlert();

  const options = [
    {
      icon: <FaBagShopping />,
      name: "Oredrs",
      func: Order,
    },
    {
      icon: <FaUser />,
      name: "my account",
      func: myAccount,
    },
    {
      icon: <FaArrowRightFromBracket />,
      name: "Logout",
      func: Logout,
    },
  ];

  if (user && user.role === "admin") {
    options.unshift({
      icon: <FaGauge />,
      name: "Dashboard",
      func: Dashboard,
    });
  }
  // All dir function--------------
  function Dashboard() {
    return Navigate("/admin/dashboard");
  }

  function Order() {
    return Navigate("/order/me");
  }
  function myAccount() {
    return Navigate("/account");
  }
  function Logout() {
    dispatch(LogoutUser());
    alert.success("User logout succesfully");
  }

  return (
    <>
      <Backdrop style={{ zIndex: "10" }} open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        style={{ zIndex: "100", position: "relative" }}
        direction="down"
        icon={
          <img
            className="speedDial icon"
            src={
              user && user.avatar && user.avatar.url
                ? `${server_url()}/${user.avatar.url}`
                : "/icon.png"
            }
            alt="Profile"
          />
        }
      >
        {options &&
          options.map((item, i) => {
            return (
              <SpeedDialAction
                key={i}
                icon={item.icon}
                tooltipTitle={item.name}
                onClick={item.func}
                tooltipOpen={window.innerWidth <= 600 ? true : false}
              />
            );
          })}
      </SpeedDial>
    </>
  );
};

export default Profile;
