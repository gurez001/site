import { DialogActions, Button } from "@material-ui/core";
import React, { memo } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";

const AddQuantitBtns = ({ quentity, setQuentity }) => {
  const { product } = useSelector((state) => state.productDetails);
  const increaseQuantity = () => {
    if (product.stock <= quentity) return;
    const quty = quentity + 1;
    setQuentity(quty);
  };

  //-----decrease quentity

  const decreaseQuantity = () => {
    if (1 >= quentity) return;
    const quty = quentity - 1;
    setQuentity(quty);
  };

  return (
    <>
      <div className="product-divider">
        <div className="stock-cont">
          <DialogActions>
            <Button onClick={decreaseQuantity}>
              <FaMinus />
            </Button>
          </DialogActions>
          <input value={quentity} readOnly type="number" />
          <DialogActions>
            <Button onClick={increaseQuantity}>
              <FaPlus />
            </Button>
          </DialogActions>
        </div>
      </div>
    </>
  );
};

export default memo(AddQuantitBtns);
