import React from "react";
import Currency from "../../../../layout/currency/Currency";

const CustomerHistory = ({Total_revenue, Total_orders}) => {
  return (
    <>
      <div className="postbox order-form-area ">
        <div style={{padding:'10px 25px'}} className="postbox-header order-totals-items">
          <h2 className="sm-font-size">Customer history</h2>
        </div>
        <div className="postbox-inner">
          <div className="from-space">
            <p className="xsm-font-size">Total orders</p>
            <p className="xsm-font-size">{Total_orders&& Total_orders}</p>
          </div>
          <div className="from-space">
            <p className="xsm-font-size">Total revenue</p>
            <p className="xsm-font-size">
                <Currency price={Total_revenue} />
            </p>
          </div>
          <div className="from-space">
            <p className="xsm-font-size">Average order value</p>
            <p className="xsm-font-size"><Currency price={Total_revenue/Total_orders } /></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerHistory;
