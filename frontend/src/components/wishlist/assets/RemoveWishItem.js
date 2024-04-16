import React from "react";
import { useDispatch } from "react-redux";

import { FaXmark } from "react-icons/fa6";
import { removeWishItem } from "../../../actions/wishListAction";
const RemoveWishItem = ({ item }) => {
  const dispatch = useDispatch();

  const removeEventListener = (id) => {
    dispatch(removeWishItem(id));
  };
  return (
    <>
      <div style={{marginBottom:'10px',opacity:'0.5'}} className="wish-item-remove">
        <FaXmark style={{fontSize:30}}
          onClick={() => {
            removeEventListener(item.productId);
          }}
        />
      </div>
    </>
  );
};

export default RemoveWishItem;
