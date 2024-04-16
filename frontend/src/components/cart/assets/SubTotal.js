import React from "react";
import Currency from "../../layout/currency/Currency";

export const SubTotal = ({ item, quantity }) => {
  return (
    <>
      <div className="sub-total">
        <Currency price={item * quantity} />
      </div>
    </>
  );
};
