import React, { useEffect, useState } from "react";
import Logo from "./assets/Logo";
import { Search } from "./assets/Search";
import { Wishlist } from "./assets/Wishlist";
import Cart from "./assets/Cart";
import "./style.css";
import { BottomHeader } from "./assets/BottomHeader";
import CallAction from "./assets/CallAction";
import AdminHeader from "./AdminHeader";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { MobNav } from "./assets/MobNav";

export const Header = () => {
  //this state for mob nav togle
  const [isContentVisible, setIsContentVisible] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [isSticky, setIsSticky] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleContentadd = () => {
    setIsContentVisible(!isContentVisible);
  };
  const toggleContentRemove = () => {
    setIsContentVisible(false);
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 5) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <header className={`header sticky ${isSticky ? "sticky" : ""}`}>
        {user && user.role === "admin" ? <AdminHeader /> : null}

        <>
          <div
            className={
              user && user.role === "admin"
                ? "containor admin-header"
                : "containor"
            }
          >
            <div className="nav-area">
              {windowWidth < 767 && (
                <>
                  <div className="hamb-t">
                    <RxHamburgerMenu onClick={toggleContentadd} />

                    <MobNav
                      toggleContentRemove={toggleContentRemove}
                      isContentVisible={isContentVisible}
                    />
                  </div>
                </>
              )}
              <div className="h-left-col nav-mon-cont">
                <Logo />

                <Search />
              </div>
              <div className="h-right-col">
                <CallAction />
                <Wishlist />
                <Cart />
                <div className="header-login">
                  {user && user.verified ? (
                    <NavLink to={"/user-dashboard"}>
                      <FaUser />
                    </NavLink>
                  ) : (
                    <NavLink to={"/sign-in"}>
                      <FaUser />
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
          </div>

          <BottomHeader />
        </>
      </header>
    </>
  );
};
