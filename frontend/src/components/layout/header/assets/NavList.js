import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  nav_main_list,
  nav_sub_list,
} from "../../../../actions/CategoreAction";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export const NavList = ({ toggleContentRemove }) => {
  const [visible, setVisible] = useState(null);

  const handleClick = (i) => {
    setVisible((prevVisible) => (prevVisible === i ? null : i));
  };
  const dispatch = useDispatch();

  const { loading: catLoading, nav_categores } = useSelector(
    (state) => state.nav_parent_category
  );
  const { nav_sub_categores } = useSelector((state) => state.nav_sub_category);

  useEffect(() => {
    dispatch(nav_main_list());
    dispatch(nav_sub_list());
  }, [dispatch]);

  return (
    <>
      {!catLoading ? (
        <div className="nav-col nav-li-list">
          <ul className="nav-list parent-navlist">
            <li>
              <NavLink to={"/shop"} onClick={toggleContentRemove}>
                Shop
              </NavLink>
            </li>
            {nav_categores &&
              nav_categores
                .filter((item) => item.category_status === "Active")
                .map((item, i) => (
                  <li key={i}>
                    <div className="mob-list">
                      <span onClick={toggleContentRemove}>
                        <NavLink to={`/product-category/${item.slug}`}>
                          {item.name}
                        </NavLink>
                      </span>
                      <span onClick={() => handleClick(i)}>
                        {visible === i ? <IoIosArrowUp /> : <IoIosArrowDown />}
                      </span>
                    </div>
                    <ul
                      className={
                        visible === i
                          ? "child-navlist list-active"
                          : "child-navlist "
                      }
                    >
                      {nav_sub_categores &&
                        nav_sub_categores
                          .filter(
                            (sub) =>
                              item.uuid === sub.Parent_category &&
                              sub.category_status === "Active"
                          )
                          .map((subItem, i) => (
                            <li key={i}>
                              <span onClick={toggleContentRemove}>
                                <NavLink
                                  to={`/product-category/${item.slug}/${subItem.slug}`}
                                >
                                  {subItem.name}
                                </NavLink>
                              </span>
                            </li>
                          ))}
                    </ul>
                  </li>
                ))}

            <li onClick={toggleContentRemove}>
              <NavLink to={"/contact-us"}>Contact Us</NavLink>
            </li>
            <li onClick={toggleContentRemove}>
              <NavLink to={"/blog"}>Blog</NavLink>
            </li>
          </ul>
        </div>
      ) : (
        <div className="nav-col nav-li-list">
          <div
            style={{ maxWidth: "65%", margin: "0px auto", padding: "17px 0" }}
            className="nav-list parent-navlist"
          >
            {/* <div style={{margin:'5px 0'}} className="animated-background col3" />{" "}
            <div style={{margin:'5px 0'}} className="animated-background col3" />{" "}
            <div style={{margin:'5px 0'}} className="animated-background col3" />{" "}
            <div style={{margin:'5px 0'}} className="animated-background col3" />{" "}
            <div style={{margin:'5px 0'}} className="animated-background col3" />{" "}
            <div style={{margin:'5px 0'}} className="animated-background col3" /> */}
          </div>
        </div>
      )}
    </>
  );
};
