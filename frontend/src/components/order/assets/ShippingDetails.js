import React, { useEffect, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { useSelector } from "react-redux";

const ShippingDetails = ({ orders, shiping_info }) => {
  console.log();
  const [editToggle, setEditToggel] = useState(false);
  const [inputValue, setInputValue] = useState({
    status: "",
    name: "",
    address: "",
    city: "",
    pinCode: "",
    country: "",
    state: "",
    email: "",
    phoneNo: "",
    billingname: "",
    billingemail: "",
    billingcontact: "",
    orderid: "",
    billingorderstatus: "",
  });

  const inputChangeEventHandle = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };
  console.log(inputValue);
  const orderStatusSubmitHandle = (e) => {
    const {
      status,
      name,
      address,
      city,
      pinCode,
      country,
      state,
      email,
      phoneNo,
    } = inputValue;
    e.preventDefault();
  };
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
    <div className="order-details">
      <div className="billing-details">
        <div className="form-fields-area">
          <h4 className="xsm-font-size">Billing</h4>
          <span className="edit-order-form">
            <FaPencil onClick={() => setEditToggel(!editToggle)} />
          </span>
          <div
            className={
              editToggle
                ? "form-input-area-text form-hide"
                : "form-input-area-text"
            }
          >
            <div className="order-float-span">
              <p className="xsm-font-size">
                <span>Name:-</span>
                <span>{shiping_info && shiping_info.fullName}</span>
              </p>
            </div>
            <div className="order-float-span">
              <p className="xsm-font-size">
                <span>Address:-</span>
                <span>{shiping_info && shiping_info.address}</span>
              </p>
            </div>
            <div className="order-float-span">
              <p className="xsm-font-size">
                <span>PinCode:-</span>
                <span>{shiping_info && shiping_info.pinCode}</span>
              </p>
            </div>
            <div className="order-float-span">
              <p className="xsm-font-size">
                <span>State:-</span>
                <span>{shiping_info && shiping_info.state}</span>
              </p>
            </div>
            <div className="order-float-span">
              <p className="xsm-font-size">
                <span>Country:-</span>
                <span>{shiping_info && shiping_info.country}</span>
              </p>
            </div>
            <div className="order-float-span">
              <p className="xsm-font-size">
                <span>PhoneNo:-</span>
                <span>{shiping_info && shiping_info.phoneNo}</span>
              </p>
            </div>

            <div className="order-float-span">
              <p className="xsm-font-size">
                <span>Email:-</span>
                <span>{shiping_info && shiping_info.email}</span>
              </p>
            </div>
          </div>
          <div
            className={
              !editToggle
                ? "row col-md-12 flex-warp form-hide"
                : "row col-md-12 flex-warp"
            }
          >
            <form>
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
              <div className="col-md-6">
                <label className="block-p xsm-font-size" htmlFor="email">
                  Email:
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={inputValue.email}
                  onChange={inputChangeEventHandle}
                />
              </div>
              <div className="col-md-6">
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
                  htmlFor="Payment method"
                >
                  Payment method:
                </label>
                <input
                  type="text"
                  name="Payment_method"
                  id="Payment method"
                  value={inputValue.Payment_method}
                  onChange={inputChangeEventHandle}
                />
              </div>
              <div className="col-md-12">
                <label
                  className="block-p xsm-font-size"
                  htmlFor="Transaction ID"
                >
                  Transaction ID:
                </label>
                <input
                  type="text"
                  name="Transaction_ID"
                  id="Transaction ID"
                  value={inputValue.Transaction_ID}
                  onChange={inputChangeEventHandle}
                />
              </div>
              <button>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingDetails;
