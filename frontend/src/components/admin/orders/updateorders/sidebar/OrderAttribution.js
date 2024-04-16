import React from "react";
import CustomerHistory from "./CustomerHistory";

const OrderAttribution = () => {
  return (
    <>
      <div className="order-attribution">
        <h3>Order Attribution</h3>
        <div className="order-attribution-div">
          <p>Origin</p>
          <div className="order-attribution-dataset">
            <h4>Origin:Goggle</h4>
            <details>
              <summary>show details</summary>
              <h4>source type</h4>
              <p>organic</p>
            </details>
          </div>
        </div>
      </div>
      <CustomerHistory />
    </>
  );
};

export default OrderAttribution;
