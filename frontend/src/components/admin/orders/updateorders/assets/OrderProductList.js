import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Currency from "../../../../layout/currency/Currency";
import { client_url } from "../../../../../utils/Url";
import { CiDeliveryTruck } from "react-icons/ci";
import { Button } from "@material-ui/core";

const OrderProductList = () => {
  const { loading, order_details_info, orders, error } = useSelector(
    (state) => state.orderDetails
  );

  let sub_Total = 0;

  return (
    <>
      <div className="postbox order-form-area">
        <div className="postbox-header row">
          <div className="col-md-8">
            <p className="xsm-font-size">Item</p>
          </div>
          <div className="col-md-2">
            <p className="xsm-font-size">Cost</p>
          </div>
          <div className="col-md-2">
            <p className="xsm-font-size">Qty</p>
          </div>
          <div className="col-md-2">
            <p className="xsm-font-size">Total</p>
          </div>
          {console.log(order_details_info)}
        </div>
        {order_details_info &&
          order_details_info.map((item, i) => {
            sub_Total +=
              item.order_info_detail_price * item.order_detail_quantity;
            return (
              <div className="postbox-inner row" key={i}>
                <div className="col-md-8 row">
                  {/* <div className="thumb col-md-2">
                    <img src={`${client_url()}/${item.path}`} alt="d" />
                  </div> */}
                  <div style={{ padding: "5px" }} className="product-col-md-10">
                    <NavLink
                      className="xsm-font-size"
                      to={`/product/${
                        item && item.product_Item && item.product_Item.slug
                      }`}
                    >
                      {item &&
                        item.product_Item &&
                        item.product_Item.product_name}
                    </NavLink>
                  </div>
                </div>
                <div className="col-md-2">
                  <bdi>
                    <Currency price={item.order_info_detail_price} />
                  </bdi>
                </div>
                <div className="col-md-2">
                  <p>{item.order_detail_quantity}</p>
                </div>
                <div className="col-md-2">
                  <bdi>
                    <bdi>
                      <Currency
                        price={
                          item.order_info_detail_price *
                          item.order_detail_quantity
                        }
                      />
                    </bdi>
                  </bdi>
                </div>
              </div>
            );
          })}
        <div className="postbox-inner row">
          <div className="col-md-3 row ">
            <div className="thumb col-md-4">
              <CiDeliveryTruck />
            </div>
            <div className="product-item col-md-8">
              <p className="xsm-font-size">shipping</p>
            </div>
          </div>
          <div className="col-md-8">
            {order_details_info &&
              order_details_info.product_Items &&
              order_details_info.product_Items.map((item, i) => (
                <div
                  style={{ padding: "3px 15px" }}
                  className="postbox-inner row"
                  key={i}
                >
                  <p className="xsm-font-size">
                    {item.name} - {item.label} x {item.quantity}
                  </p>
                </div>
              ))}
          </div>
          <div className="col-md-3">
            <p className="xsm-font-size">
              <Currency price={orders && orders.order_info_shipping_charges} />
            </p>
          </div>
        </div>

        <div className="postbox-inner row order-totals-items">
          <div className="col-md-6">
            {orders.master_coupon_code && (
              <>
                <p>
                  <strong>Coupon(s)</strong>
                </p>
                <div style={{ marginTop: "10px" }}>
                  <NavLink className="coupon-code" to={"/"}>
                    {orders && orders.master_coupon_code}
                  </NavLink>
                </div>
              </>
            )}
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-6">
                <p className="xsm-font-size">Items Subtotal:</p>
              </div>
              <div className="col-md-6">
                <p className="xsm-font-size">
                  {" "}
                  <Currency price={sub_Total} />
                </p>
              </div>
            </div>
            {orders.master_coupon_code && (
              <div className="row">
                <div className="col-md-6">
                  <p className="xsm-font-size">Coupon(s):</p>{" "}
                </div>
                <div className="col-md-6">
                  <p className="xsm-font-size">
                    -
                    <Currency
                      price={orders && orders.order_info_total_coupon_discount}
                    />
                  </p>
                </div>
              </div>
            )}
            <div className="row">
              <div className="col-md-6">
                <p className="xsm-font-size">Shipping:</p>
              </div>
              <div className="col-md-6">
                <p className="xsm-font-size">
                  {" "}
                  <Currency
                    price={orders && orders.order_info_shipping_charges}
                  />
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <p className="xsm-font-size">GST:</p>
              </div>
              <div className="col-md-6">
                <p className="xsm-font-size">
                  {" "}
                  <Currency price={orders && orders.order_info_gst} />
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <p className="xsm-font-size">Order Total:</p>
              </div>
              <div className="col-md-6">
                <p className="xsm-font-size">
                  <Currency
                    price={Math.abs(
                      sub_Total +
                        (orders && orders.order_info_shipping_charges) +
                        (orders && orders.order_info_gst) -
                        (orders && orders.order_info_total_coupon_discount)
                    )}
                  />
                </p>
              </div>
            </div>
            <hr style={{ margin: "20px 0" }} />
            <div className="row">
              <div className="col-md-6">
                <strong>
                  <p className="xsm-font-size">Paid:</p>
                </strong>
              </div>
              <div className="col-md-6">
                <p className="xsm-font-size">
                  <Currency
                    price={Math.abs(
                      sub_Total +
                        (orders && orders.order_info_shipping_charges) +
                        (orders && orders.order_info_gst) -
                        (orders && orders.order_info_total_coupon_discount)
                    )}
                  />
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                {orders && orders.order_info_mode === "COD" ? (
                  <p className="xsm-font-size">
                    March 4, 2024 via Cash on delivery{" "}
                  </p>
                ) : (
                  <>
                    <p className="xsm-font-size">
                      March 4, 2024 via Credit Card/Debit
                    </p>
                    <p className="xsm-font-size">Card/NetBanking </p>
                  </>
                )}
              </div>
              <div className="col-md-6"></div>
            </div>
          </div>
        </div>
        <div className="postbox-inner row">
          <div className="col-md-6">
            <Button>Refund</Button>
          </div>
          <div style={{ textAlign: "end" }} className="col-md-6">
            <p className="xsm-font-size">This order is no longer editable.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderProductList;
