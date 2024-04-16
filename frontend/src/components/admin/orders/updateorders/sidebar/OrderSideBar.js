import React from "react";
import CustomerHistory from "./CustomerHistory";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
const OrderSideBar = ({ update_loading, orderStatusSubmitHandle }) => {
  const { loading, Total_revenue, Total_orders, error } = useSelector(
    (state) => state.orderDetails
  );
  return (
    <>
      <Button
        disabled={update_loading}
        onClick={(e) => orderStatusSubmitHandle(e)}
        className="button-success"
      >
        Update order
      </Button>
      <CustomerHistory
        Total_revenue={Total_revenue}
        Total_orders={Total_orders}
      />
    </>
  );
};

export default OrderSideBar;
