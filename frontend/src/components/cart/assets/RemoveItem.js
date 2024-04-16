import React from "react";
import { useDispatch } from "react-redux";
import { removeCartItem } from "../../../actions/cartAction";
import { FaXmark } from "react-icons/fa6";

const RemoveItem = ({ item }) => {
  const dispatch = useDispatch();

  const removeEventListener = (id) => {
    dispatch(removeCartItem(id));
  };

  return (
    <>
      <div style={{marginBottom:'10px',opacity:'0.5'}} className="cart-item-remove">
        <p style={{cursor:'pointer'}}
          onClick={() => {
            removeEventListener(item.productId);
          }}
        >
          <FaXmark style={{fontSize:30}} />
        </p>
      </div>
    </>
  );
};

export default RemoveItem;
