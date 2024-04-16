import React from "react";
import { useDispatch } from "react-redux";
import { addItemsToCart } from "../../../actions/cartAction";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
const QunContBtn = ({ item }) => {
  console.log(item);
  const dispatch = useDispatch();
  //------increase Quantity
  const increaseQuantity = (id, quantity, price,stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) return;
    dispatch(addItemsToCart(id, newQty,price));
  };
  //---Decrease Quantity
  const decreaseQuantity = (id, quantity, price,stock) => {
    const newQty = quantity - 1;
    if (1 >= quantity) return;
    dispatch(addItemsToCart(id, newQty,price));
  };

  return (
    <>
      <div className="row qun-cont">
        <button style={{cursor:'pointer'}}  onClick={() => decreaseQuantity(item.link, item.quantity,item.price)}>
          <FaMinus />
        </button>
        <input readOnly type="number" value={item.quantity} />
        <button style={{cursor:'pointer'}}
          onClick={() =>
            increaseQuantity(item.link, item.quantity, item.price, item.stock)
          }
        >
          <FaPlus />
        </button>
      </div>
    </>
  );
};

export default QunContBtn;
