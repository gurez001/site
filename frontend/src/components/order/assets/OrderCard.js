import React from "react";
import { FaCartArrowDown } from "react-icons/fa6";
import TimeAndDate from "../../layout/time/TimeAndDate";
import { NavLink } from "react-router-dom";
import Currency from "../../layout/currency/Currency";
export const OrderCard = ({ orders }) => {
  console.log(orders);
  return (
    <>
      <div className="order-card-containor">
        <div className="order-card-row">
          {orders &&
            orders.map((item, i) => (
              <div key={i} className="order-card">
                <NavLink to={`/order/${item._id}`}>
                  <div className="order-card-inner-row">
                    <div className="order-id">
                      <p
                        style={{
                          background: "#000",
                          color: "#fff",
                          fontSize: 16,
                          padding: 10,
                        }}
                      >
                        <span>Order No- #{item._id}</span>
                      </p>
                    </div>
                    <div className="order-card-status">
                      <p className="row">
                        <span className="col-md-6">Status</span>
                        <span style={{textAlign:'center'}} className="col-md-6">
                          {item.order_info_status}
                        </span>
                      </p>
                      <p className="row">
                      <span className="col-md-6">Price</span>
                      <span style={{textAlign:'center'}} className="col-md-6">
                          <Currency price={item.order_info_total_price} />{" "}
                        </span>
                      </p>
                      <p style={{textAlign:'center',width:'100%',justifyContent:'center'}} className="row">
                       See More..
                      </p>
                    </div>
                  </div>
                </NavLink>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
