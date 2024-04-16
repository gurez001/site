import React, { useEffect, useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";

import { BsCartDash } from "react-icons/bs";
import "./BottomNav.css";
import { useNavigate } from "react-router-dom";
import { MobNav } from "../header/assets/MobNav";

function BottomNav() {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const nav = [
    { link: "/", icon: <IoHomeOutline /> },
    { link: "/user-dashboard", icon: <FaRegUser /> },
    { link: "/cart", icon: <BsCartDash /> },
  ];
  const navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const pageHabdler = (i) => {
    switch (i) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/user-dashboard");
        break;
      case 2:
        navigate("/cart");
        break;
      default:
        break;
    }
    setIsContentVisible(false);
    setActiveTab(activeTab);
  };

  const toggleContentRemove = () => {
    setIsContentVisible(false);
  };
  const toggleContentadd = () => {
    setIsContentVisible(!isContentVisible);
  };
  return (
    <>
      <div className="mob-navigate">
        <div className="mob-icon">
          {nav.map((item, i) => (
            <span key={i} onClick={() => pageHabdler(i)}>
              {item.icon}
            </span>
          ))}

          <RxHamburgerMenu onClick={toggleContentadd} />
        </div>
        {windowWidth < 767 && (
          <MobNav
            toggleContentRemove={toggleContentRemove}
            isContentVisible={isContentVisible}
          />
        )}
      </div>
    </>
  );
}

export default BottomNav;
