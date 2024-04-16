import { Button } from "@material-ui/core";
import React from "react";
import { FaOpencart } from "react-icons/fa6";
import { useSelector } from "react-redux";

const AddToCartBtn = ({ addToCartHandler }) => {
  const { product } = useSelector((state) => state.productDetails);

  return (
    <>
      <Button
        className="button-success"
        disabled={product && product.stock < 1 ? true : false}
        onClick={addToCartHandler}
      >
        <FaOpencart className="cart-svg" />
        Add to Cart
      </Button>
    </>
  );
};

export default AddToCartBtn;
