import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TimeAndDate from "../../../../layout/time/TimeAndDate";
import "./updateorder.css";
import { FaPencil } from "react-icons/fa6";
import OrderProductList from "./OrderProductList";
const UpdateOrderForm = ({
  orders,
  inputValue,
  inputChangeEventHandle,
  setInputValue,
}) => {
  const { loading, shiping_info, error } = useSelector(
    (state) => state.orderDetails
  );
  const [editToggle, setEditToggel] = useState(false);
  const [editToggle2, setEditToggel2] = useState(false);
  const statusArr = [
    "Proccessing",
    "Shipped",
    "Delivered",
    "Return",
    "Cancle",
    "Failed",
  ];

  useEffect(() => {
    if (shiping_info) {
      setInputValue({
        status: orders && orders.order_info_status,
        name: shiping_info && shiping_info.fullName,
        address: shiping_info && shiping_info.address,
        city: shiping_info && shiping_info.city,
        pinCode: shiping_info && shiping_info.pinCode,
        state: shiping_info && shiping_info.state,
        country: shiping_info && shiping_info.country,
        email: shiping_info && shiping_info.email,
        phoneNo: shiping_info && shiping_info.phoneNo,
      });
    }
  }, [shiping_info]);

  return (
    <>
      <div className="order-form-area form">
        <h2 className="sm-font-size">Order #{orders && orders._id} details</h2>
        {orders && orders.order_info_mode === "COD" ? (
          <p>Payment via Cash on delivery</p>
        ) : (
          <p>Payment via Card</p>
        )}
        <div className="form-flex">
          <div className="form-fields-area">
            <h3 className="xsm-font-size">General</h3>
            <div className="form-text-gen-info">
              <p>Date created:</p>
              <p>
                {
                  <TimeAndDate
                    time={orders && orders.order_info_created_date}
                  />
                }
              </p>
            </div>

            <div className="form-text-gen-info-input from-space">
              <label className="block-p xsm-font-size" htmlFor="status">
                Status:
              </label>
              <select
                id="status"
                name="status"
                value={inputValue.status}
                onChange={inputChangeEventHandle}
              >
                <option value="">Select status </option>
                {statusArr.map((item, i) => (
                  <option key={i} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* <div>Customer: Profile → View other orders →</div> */}
          </div>
          
          <div className="form-fields-area">
            <h4 className="xsm-font-size">Shipping</h4>
            <span className="edit-order-form">
              <FaPencil onClick={() => setEditToggel2(!editToggle2)} />
            </span>
            <div
              className={
                editToggle2
                  ? "form-input-area-text form-hide"
                  : "form-input-area-text"
              }
            >
              <p className="xsm-font-size">
                <span>Name: </span>
                {inputValue.name}
              </p>
              <p className="xsm-font-size">
                <span>Addreess: </span>
                {inputValue.address}
              </p>
              <p className="xsm-font-size">
                <span>Pin Code: </span>
                {inputValue.pinCode}
              </p>
              <p className="xsm-font-size">
                <span>State: </span>
                {inputValue.state}
              </p>
              <p className="xsm-font-size">
                <span>Country: </span>
                {inputValue.country}
              </p>
              <p className="xsm-font-size">
                <span>Phone no: </span>
                {inputValue.phoneNo}
              </p>
              <p className="xsm-font-size">
                <span>Email: </span>
                {inputValue.email}
              </p>
            </div>
            <div
              className={
                !editToggle2
                  ? "row col-md-12 flex-warp form-hide"
                  : "row col-md-12 flex-warp"
              }
            >
              <div className="col-md-12">
                <label className="block-p xsm-font-size" htmlFor="name">
                  name:
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={inputValue.name}
                  onChange={inputChangeEventHandle}
                />
              </div>
              <div className="col-md-12">
                <label className="block-p xsm-font-size" htmlFor="Company">
                  Company:
                </label>
                <input
                  type="text"
                  name="Company"
                  id="Company"
                  value={inputValue.Company}
                  onChange={inputChangeEventHandle}
                />
              </div>
              <div className="col-md-12">
                <label className="block-p xsm-font-size" htmlFor="address">
                  Address:
                </label>
                <textarea
                  type="text"
                  name="address"
                  id="address"
                  value={inputValue.address}
                  onChange={inputChangeEventHandle}
                ></textarea>
              </div>
              <div className="col-md-6">
                <label className="block-p xsm-font-size" htmlFor="city">
                  City:
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={inputValue.city}
                  onChange={inputChangeEventHandle}
                />
              </div>
              <div className="col-md-6">
                <label className="block-p xsm-font-size" htmlFor="pinCode">
                  Pin code:
                </label>
                <input
                  type="number"
                  name="pinCode"
                  id="pinCode"
                  value={inputValue.pinCode}
                  onChange={inputChangeEventHandle}
                />
              </div>
              <div className="col-md-6">
                <label className="block-p xsm-font-size" htmlFor="state">
                  State:
                </label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  value={inputValue.state}
                  onChange={inputChangeEventHandle}
                />
              </div>
              <div className="col-md-6">
                <label className="block-p xsm-font-size" htmlFor="country">
                  country:
                </label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  value={inputValue.country}
                  onChange={inputChangeEventHandle}
                />
              </div>

              <div className="col-md-12">
                <label className="block-p xsm-font-size" htmlFor="phoneNo">
                  Phone no:
                </label>
                <input
                  type="number"
                  name="phoneNo"
                  id="phoneNo"
                  value={inputValue.phoneNo}
                  onChange={inputChangeEventHandle}
                />
              </div>
              <div className="col-md-12">
                <label
                  className="block-p xsm-font-size"
                  htmlFor="Customer provided note"
                >
                  Customer provided note:
                </label>
                <textarea
                  type="text"
                  name="Customer_provided_note"
                  id="Customer_provided_note"
                  value={inputValue.Customer_provided_note}
                  onChange={inputChangeEventHandle}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      <OrderProductList orders={orders.orderItem} />
    </>
  );
};

export default UpdateOrderForm;
