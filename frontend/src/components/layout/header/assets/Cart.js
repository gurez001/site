import React, { useEffect, useState } from "react";
import { FaCartFlatbed } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Cart = () => {
  const { cartItem } = useSelector((state) => state.cart);
  const [cartValue, setCartValue] = useState(0);

  useEffect(() => {
    setCartValue(cartItem.length);
  }, [cartItem]);

  return (
    <div className="cart-row">
      <div className="cart-col">
        <NavLink to={"/cart"}>
          <FaCartFlatbed />
          <span className="cart-no">{cartValue}</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Cart;
