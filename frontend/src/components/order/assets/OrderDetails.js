import React, { useEffect, useMemo } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../layout/loader/Loader";
// import { clearErrors, getOrderDetails } from "../../../actions/OrderAction";
import { NavLink, useParams } from "react-router-dom";
import TimeAndDate from "../../layout/time/TimeAndDate";
import MetaData from "../../layout/metaData/MetaData";
// import { getPaymentData } from "../../../actions/Paymentaction";
import { FaRegCheckCircle } from "react-icons/fa";
import Currency from "../../layout/currency/Currency";
import {
  getOrderDetails,
  order_details_info,
  order_shipping_info,
} from "../../../actions/OrderAction";
import { get_payment_info } from "../../../actions/Paymentaction";

export const OrderDetails = () => {
  const alert = useAlert();
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    loading,
    orders,
    shiping_info,
    order_details_info: order_details,
    error,
  } = useSelector((state) => state.orderDetails);
  const { payment_info } = useSelector((state) => state.payment);

  useMemo(() => {
    dispatch(getOrderDetails(id));
  }, []);

  useEffect(() => {
    if (error) {
      alert.error(error);
      // dispatch(clearErrors());
    }

    dispatch(order_shipping_info(orders && orders.order_info_uuid));
    dispatch(order_details_info(orders && orders.order_info_uuid));
    dispatch(get_payment_info(orders && orders.order_info_uuid));
  }, [dispatch, error, alert, id, orders]);

  return (
    <>
      <MetaData
        title={"My Order Details"}
        content={"My Order Details"}
        keywords={"My Order Details"}
      />
      <section className="section-cont">
        <div id="order-details" className="cont-area-h">
          {loading ? (
            <Loader />
          ) : orders && orders ? (
            <>
              <div className="order-d-page">
                <h1>Order's Details</h1>
                <div className="order-thank">
                  <span>
                    <FaRegCheckCircle />
                  </span>
                  <p className="xsm-font-size">
                    <strong>THANK YOU!</strong>
                    Thank you for shopping with us. Your account has been
                    charged and your transaction is successful. We will be
                    processing your order soon.
                  </p>
                </div>

                <div className="order-containor">
                  <div className="order-header">
                    <ul className="overview-ul">
                      <li className="overview-item">
                        <span>Order ID:</span>
                        <span className="xsm-font-size">
                          <strong> #{orders._id}</strong>
                        </span>
                      </li>
                      <li className="overview-item">
                        <span>Status:</span>
                        <span className="xsm-font-size">
                          <strong>{orders.order_info_status}</strong>
                        </span>
                      </li>
                      <li className="overview-item">
                        <span>Date:</span>
                        <span className="xsm-font-size">
                          <strong>
                            <TimeAndDate
                              time={orders.order_info_created_date}
                            />
                          </strong>
                        </span>
                      </li>
                      <li className="overview-item">
                        <span>Email: </span>
                        <span className="xsm-font-size">
                          <strong>{orders.user && orders.user.email}</strong>
                        </span>
                      </li>
                      <li className="overview-item">
                        <span>Total:</span>
                        <span className="xsm-font-size">
                          <strong>
                            <Currency price={orders.order_info_total_price} />{" "}
                          </strong>
                        </span>
                      </li>
                      <li className="overview-item">
                        <span>Payment Method: </span>
                        <span className="xsm-font-size">
                          <strong>
                            {orders.order_info_mode && orders.order_info_mode}
                          </strong>
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="orders">
                    <h2>ORDER DETAILS</h2>
                    <div className="order-li">
                      <h3>Products</h3>

                      {order_details &&
                        order_details.map((item, i) => {
                          return (
                            <div key={i} className="order-item">
                              <div className="order-li-item-price row space-between-center">
                                <div className="col-md-8">
                                  <p
                                    className="xsm-font-size"
                                    style={{ color: "#3d3d3d" }}
                                  >
                                    <span>
                                      <strong id="order-span">
                                        {item &&
                                          item.product_Item &&
                                          item.product_Item.product_name}
                                      </strong>
                                    </span>
                                    <span>{item.product_label}</span>
                                  </p>
                                </div>
                                <div className="col-md-2">
                                  <span className="xsm-font-size">
                                    <Currency
                                      price={item.order_info_detail_price}
                                    />
                                  </span>
                                </div>
                              </div>
                              <div className="order-li-item-price row spacer space-between-center">
                                <div className="col-md-8">
                                  <span className="xsm-font-size">
                                    <strong>Quantity:</strong>
                                  </span>
                                </div>
                                <div className="col-md-2">
                                  <span className="xsm-font-size">
                                    <Currency
                                      price={item.order_info_detail_price}
                                    />
                                    x{item.order_detail_quantity}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      <div className="order-li-item-price row spacer space-between-center">
                        <span className="col-md-8 xsm-font-size">
                          <strong>GST:</strong>
                        </span>
                        <span className="col-md-2 xsm-font-size">
                          <Currency
                            price={Math.ceil(orders && orders.order_info_gst)}
                          />
                        </span>
                      </div>
                      <div className="order-li-item-price row spacer space-between-center">
                        <span className="col-md-8 xsm-font-size">
                          <strong>Shipping Price:</strong>
                        </span>
                        <span className="col-md-2 xsm-font-size">
                          {orders && orders.order_info_shipping_charges}
                        </span>
                      </div>
                      <div className="order-li-item-price row spacer space-between-center">
                        <span className="col-md-8 xsm-font-size">
                          <strong>Payment method:</strong>
                        </span>
                        <span className="col-md-2 xsm-font-size">
                          {orders.order_info_mode && orders.order_info_mode}
                        </span>
                      </div>
                      <div className="order-li-item-price row spacer space-between-center">
                        <span className="col-md-8 xsm-font-size">
                          <strong>Total:</strong>
                        </span>
                        <span className="col-md-2 xsm-font-size">
                          <Currency
                            price={orders && orders.order_info_total_price}
                          />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* <div className="order-details">
                    <div className="billing-details">
                      <h2>Billing details</h2>
                      <div className="Billing-details-area">
                        {shiping_info && shiping_info ? (
                          <>
                            <div className="order-item">
                              <div className="order-li-item-price row spacer space-between-center">
                                <span className="col-md-2 xsm-font-size">
                                  <strong>Name:-</strong>
                                </span>

                                <span className="col-md-8 xsm-font-size">
                                  {shiping_info.fullName}
                                </span>
                              </div>
                              <div className="order-li-item-price row spacer space-between-center">
                                <span className="col-md-2 xsm-font-size">
                                  <strong>Phone No.:-</strong>
                                </span>

                                <span className="col-md-8 xsm-font-size">
                                  {shiping_info.phoneNo}
                                </span>
                              </div>
                              <div className="order-li-item-price row spacer space-between-center">
                                <span className="col-md-2 xsm-font-size">
                                  <strong>Address:-</strong>
                                </span>

                                <span className="col-md-8 xsm-font-size">
                                  {shiping_info.address}
                                </span>
                              </div>
                              <div className="order-li-item-price row spacer space-between-center">
                                <span className="col-md-2 xsm-font-size">
                                  <strong>City:-</strong>
                                </span>
                                <span className="col-md-8 xsm-font-size">
                                  {shiping_info.city}
                                </span>
                              </div>
                              <div className="order-li-item-price row spacer space-between-center">
                                <span className="col-md-2 xsm-font-size">
                                  <strong>Pincode:-</strong>
                                </span>
                                <span className="col-md-8 xsm-font-size">
                                  <span>{shiping_info.pinCode}</span>
                                </span>
                              </div>
                              <div className="order-li-item-price row spacer space-between-center">
                                <span className="col-md-2 xsm-font-size">
                                  <strong>State:-</strong>
                                </span>

                                <span className="col-md-8 xsm-font-size">
                                  {shiping_info.state}
                                </span>
                              </div>
                              <div className="order-li-item-price row spacer space-between-center">
                                <span className="col-md-2 xsm-font-size">
                                  <strong>country:-</strong>
                                </span>

                                <span className="col-md-8 xsm-font-size">
                                  {shiping_info.country}
                                </span>
                              </div>
                              <div className="order-li-item-price row spacer space-between-center">
                                <span className="col-md-2 xsm-font-size">
                                  <strong>State:-</strong>
                                </span>
                                <span className="col-md-8 xsm-font-size">
                                  {shiping_info.state}
                                </span>
                              </div>
                            </div>
                          </>
                        ) : (
                          <p>Shipping details not found</p>
                        )}
                      </div>
                    </div>

                    <div className="pay-mode">
                      <h2>Payment via:-</h2>

                      <div className="pay-mod-details">
                        {payment_info && payment_info ? (
                          <>
                            <div className="order-item">
                              <div className="order-li-item-price">
                                <p>
                                  <strong>Mode:-</strong>
                                  <span>{payment_info.payment_type}</span>
                                </p>
                              </div>
                              <div className="order-li-item-price">
                                <p>
                                  <strong>Transiction Id:-</strong>
                                  <span>
                                    {payment_info &&
                                      payment_info.paynent_response &&
                                      payment_info.paynent_response[0].id}
                                  </span>
                                </p>
                              </div>
                              <div className="order-li-item-price">
                                <p>
                                  <strong>Payment status:-</strong>
                                  <span>
                                    {payment_info.payment_info_status}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </>
                        ) : (
                          <p>Cash on delivery</p>
                        )}
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </>
          ) : (
            <p>Order not fond</p>
          )}
        </div>
      </section>
    </>
  );
};
