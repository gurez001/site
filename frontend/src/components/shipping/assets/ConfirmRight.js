import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApplyCoupen from "./ApplyCoupen";
import Currency from "../../layout/currency/Currency";
import { useSelector, useDispatch } from "react-redux";
import {
  coupon_clear_error,
  verifyMasterCoupon,
} from "../../../actions/MasterCouponAction";
import { v4 as uu } from "uuid";
import {
  ALL_MASTER_COUPON_CLEAR,
  VERIFY_MASTER_COUPON_RESET,
} from "../../../constants/MasterCouponConstant";
import { server_url } from "../../../utils/Url";
export const ConfirmRight = ({ cartItem, shippingInfo }) => {
  // const [coupon, setCoupon] = useState("");
  const uuid = uu().slice(0, 12);

  const dispatch = useDispatch();
  const [discountedprice, setDiscountedprice] = useState("");
  const [CouponinputValue, setCouponinputValue] = useState("");
  const [shoeMsg, setShoeMsg] = useState("");

  const {
    loading,
    coupon_data,
    success,
    error: couponError,
  } = useSelector((state) => state.mastercoupon);

  const ids = cartItem && cartItem.map((item) => item.productId);

  const Navigate = useNavigate();
  const subtotal = cartItem.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const totalQuantity = cartItem.reduce((acc, item) => acc + item.quantity, 0);

  const shippingChargs = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const totalPrice = shippingChargs + tax + subtotal;

  //-------------- remove coupon

  const removeCoupon = () => {
    setDiscountedprice(0);
    setCouponinputValue("");
    dispatch({ type: VERIFY_MASTER_COUPON_RESET });
    dispatch({ type: ALL_MASTER_COUPON_CLEAR });
  };

  const inputData = () => {
    dispatch(
      verifyMasterCoupon(
        CouponinputValue ? CouponinputValue : {},
        ids ? ids : [],
        subtotal
      )
    );
    setShoeMsg(false);
  };

  const proccessPayment = () => {
    const data = {
      subtotal,
      shippingChargs,
      tax,
      totalPrice: discountedprice === 0 ? totalPrice : discountedprice,
      coupon: coupon_data && coupon_data.name,
      coupon_uuid: coupon_data && coupon_data.uuid,
      discountamount:
        coupon_data && coupon_data.type === "percentage"
          ? `${coupon_data.disscount}%`
          : null,
      discounttype: coupon_data && coupon_data.type,
      coupon_discount: Math.abs(
        discountedprice === 0 ? 0 : totalPrice - discountedprice
      ),
      uuid,
      totalQuantity,
    };
    console.log(data);
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    Navigate("/shipping/proccess/payment");
  };

  useEffect(() => {
    if (couponError) {
      setDiscountedprice(0);
      setShoeMsg(couponError);
    }
    if (coupon_data) {
      if (coupon_data.type === "percentage") {
        const discount = totalPrice * (coupon_data.disscount / 100);
        const data = totalPrice - discount;
        setDiscountedprice(data);
      } else if (coupon_data.type === "fix items") {
        const data = totalPrice - coupon_data.disscount;
        setDiscountedprice(data);
      } else {
        setDiscountedprice(0);
      }
    }
    if (success) {
    }
  }, [coupon_data, dispatch, success, totalPrice, couponError]);

  return (
    <>
      <div className="conf-prod-det">
        <div className="shiping-coupon">
          <ApplyCoupen
            inputData={inputData}
            setCouponinputValue={setCouponinputValue}
            CouponinputValue={CouponinputValue}
          />
        </div>

        {success ? (
          <p style={{ color: "green", fontWeight: 600 }}>
            {coupon_data && coupon_data.message}
          </p>
        ) : couponError ? (
          <p style={{ color: "red", fontWeight: 600 }}>{couponError}</p>
        ) : null}

        {cartItem &&
          cartItem.map((item, i) => (
            <div className="conf-prod-area" key={i}>
              {/* <div className="conf-ing">
                <img src={`${server_url()}${item.path}`} alt={"image"} />
              </div> */}
              <p className="xsm-font-size">{item.name}</p>
              <span>
                {/* <Currency price={item.quantity} /> X{" "} */}
                {/* <Currency price={item.price} /> = */}
                <Currency price={item.price * item.quantity} />
              </span>
            </div>
          ))}
        <div className="order-summery-conf">
          <div className="order-summery-conf-area">
            <p>
              <span> Sub total:</span>
              <span>
                <Currency price={subtotal} />{" "}
              </span>
            </p>

            <p>
              <span>Shipping Charges:</span>
              <span>
                <Currency price={shippingChargs} />{" "}
              </span>
            </p>
            <p>
              <span>GST:</span>
              <span>
                <Currency price={tax} />
              </span>
            </p>

            <p>
              <span>
                <b>Total:</b>
              </span>
              <span>
                <Currency
                  price={discountedprice === 0 ? totalPrice : discountedprice}
                />
              </span>
            </p>
            {discountedprice > 0 ? (
              <p>
                <span>
                  coupon:
                  <span>{coupon_data && coupon_data.name}</span>
                </span>

                <span>
                  RS -
                  {discountedprice ? (
                    <Currency price={totalPrice - discountedprice} />
                  ) : null}
                  <span onClick={removeCoupon}>Remove</span>
                </span>
              </p>
            ) : null}
          </div>

          <Button className="button-success" onClick={proccessPayment}>
            Proccess to Payment
          </Button>
        </div>
      </div>
    </>
  );
};
