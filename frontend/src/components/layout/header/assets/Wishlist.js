import React from "react";
import { FaHeart } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
export const Wishlist = () => {
  const { wishL } = useSelector((state) => state.wishList);

  return (
    <div className="wishlist-row">
      <div className="wislisht-col">
        <NavLink to={"/wishlist"}>
          <FaHeart />
          <span className="wish-no">{wishL.length}</span>
        </NavLink>
      </div>
    </div>
  );
};
